import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { verifyGitHubToken } from '../utils/githubUtils';
import { verifyGoogleToken } from '../utils/googleUtils';
import User from '../models/user.model';
import { generateToken } from '../utils/jwt.utils';

export const googleAuth = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        const googleUser = await verifyGoogleToken(token);

        // Find or create user
        let user = await User.findOne({ where: { googleId: googleUser.id } });
        
        if (!user) {
            // Check if user exists with the same email
            user = await User.findOne({ where: { email: googleUser.email } });
            
            if (user) {
                // Update existing user with Google ID
                user.googleId = googleUser.id;
                await user.save();
            } else {
                // Create new user
                user = await User.create({
                    email: googleUser.email,
                    googleId: googleUser.id,
                    isApproved: true
                });
            }
        }

        // Generate JWT token
        const jwtToken = generateToken(user.id);

        res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                isAdmin: user.isAdmin,
                isApproved: user.isApproved
            },
            token: jwtToken
        });
    } catch (error) {
        console.error('Google authentication failed:', error);
        res.status(401).json({ message: 'Authentication failed' });
    }
};

export const githubAuth = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        const githubUser = await verifyGitHubToken(token);

        // Find or create user
        let user = await User.findOne({ where: { githubId: githubUser.id } });
        
        if (!user) {
            // Check if user exists with the same email
            user = await User.findOne({ where: { email: githubUser.email } });
            
            if (user) {
                // Update existing user with GitHub ID
                user.githubId = githubUser.id;
                await user.save();
            } else {
                // Create new user
                user = await User.create({
                    email: githubUser.email,
                    githubId: githubUser.id,
                    isApproved: true
                });
            }
        }

        // Generate JWT token
        const jwtToken = generateToken(user.id);

        res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                isAdmin: user.isAdmin,
                isApproved: user.isApproved
            },
            token: jwtToken
        });
    } catch (error) {
        console.error('GitHub authentication failed:', error);
        res.status(401).json({ message: 'Authentication failed' });
    }
}; 