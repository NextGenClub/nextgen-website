import { Request, Response } from 'express';
import passport from 'passport';
import User from '../models/user.model';
import { generateToken } from '../utils/jwt.utils';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';

interface GoogleProfile {
    id: string;
    displayName: string;
    emails?: Array<{ value: string }>;
}

interface GitHubProfile {
    id: string;
    displayName: string;
    username: string;
    emails?: Array<{ value: string }>;
}

// Configure Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: `${process.env.API_BASE_URL}/api/oauth/google/callback`,
    scope: ['profile', 'email']
}, async (accessToken: string, refreshToken: string, profile: GoogleProfile, done: (error: any, user?: any) => void) => {
    try {
        // Check if user already exists
        let user = await User.findOne({ where: { googleId: profile.id } });
        
        if (!user) {
            // Check if user exists with the same email
            user = await User.findOne({ where: { email: profile.emails?.[0].value } });
            
            if (user) {
                // Update existing user with Google ID
                user.googleId = profile.id;
                await user.save();
            } else {
                // Create new user
                user = await User.create({
                    email: profile.emails?.[0].value!,
                    name: profile.displayName,
                    username: profile.emails?.[0].value?.split('@')[0] || profile.id,
                    password: '', // No password for OAuth users
                    googleId: profile.id,
                    isAdmin: false,
                    isApproved: false
                });
            }
        }
        
        return done(null, user);
    } catch (error) {
        return done(error as Error);
    }
}));

// Configure GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    callbackURL: `${process.env.API_BASE_URL}/api/oauth/github/callback`,
    scope: ['user:email']
}, async (accessToken: string, refreshToken: string, profile: GitHubProfile, done: (error: any, user?: any) => void) => {
    try {
        // Check if user already exists
        let user = await User.findOne({ where: { githubId: profile.id } });
        
        if (!user) {
            // Check if user exists with the same email
            const email = profile.emails?.[0].value;
            if (email) {
                user = await User.findOne({ where: { email } });
            }
            
            if (user) {
                // Update existing user with GitHub ID
                user.githubId = profile.id;
                await user.save();
            } else {
                // Create new user
                user = await User.create({
                    email: profile.emails?.[0].value || `${profile.id}@github.com`,
                    name: profile.displayName || profile.username,
                    username: profile.username || profile.id,
                    password: '', // No password for OAuth users
                    githubId: profile.id,
                    isAdmin: false,
                    isApproved: false
                });
            }
        }
        
        return done(null, user);
    } catch (error) {
        return done(error as Error);
    }
}));

// Get Google OAuth URL
export const getGoogleAuthUrl = (req: Request, res: Response) => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
        `redirect_uri=${process.env.API_BASE_URL}/api/oauth/google/callback&` +
        `response_type=code&` +
        `scope=profile email`;
    
    res.json({ url });
};

// Get GitHub OAuth URL
export const getGitHubAuthUrl = (req: Request, res: Response) => {
    const url = `https://github.com/login/oauth/authorize?` +
        `client_id=${process.env.GITHUB_CLIENT_ID}&` +
        `redirect_uri=${process.env.API_BASE_URL}/api/oauth/github/callback&` +
        `scope=user:email`;
    
    res.json({ url });
};

// Google OAuth callback
export const googleCallback = (req: Request, res: Response) => {
    passport.authenticate('google', { session: false }, (err: Error, user: User) => {
        if (err || !user) {
            return res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`);
        }
        
        const token = generateToken(user.id.toString());
        res.redirect(`${process.env.FRONTEND_URL}/oauth-callback?token=${token}`);
    })(req, res);
};

// GitHub OAuth callback
export const githubCallback = (req: Request, res: Response) => {
    passport.authenticate('github', { session: false }, (err: Error, user: User) => {
        if (err || !user) {
            return res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`);
        }
        
        const token = generateToken(user.id.toString());
        res.redirect(`${process.env.FRONTEND_URL}/oauth-callback?token=${token}`);
    })(req, res);
}; 