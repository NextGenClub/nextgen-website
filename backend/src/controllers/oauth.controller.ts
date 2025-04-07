import { Request, Response } from 'express';
import { verifyGoogleToken, getGoogleOAuthConfig } from '../utils/googleUtils';
import { verifyGitHubToken, getGitHubOAuthConfig } from '../utils/githubUtils';
import User from '../models/User';
import jwt from 'jsonwebtoken';

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const config = getGoogleOAuthConfig();
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&response_type=code&scope=email profile`;
    res.json({ url: authUrl });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ message: 'Failed to initiate Google authentication' });
  }
};

export const googleCallback = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ message: 'No authorization code received' });
    }

    const config = getGoogleOAuthConfig();
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code: code as string,
        client_id: config.clientId,
        client_secret: config.clientSecret,
        redirect_uri: config.redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) {
      return res.status(400).json({ message: 'Failed to get access token' });
    }

    const userInfo = await verifyGoogleToken(tokenData.access_token);
    if (!userInfo) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    let user = await User.findOne({ email: userInfo.email });
    if (!user) {
      user = new User({
        email: userInfo.email,
        name: userInfo.name,
        password: '', // No password needed for OAuth users
        googleId: userInfo.sub,
      });
      await user.save();
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (error) {
    console.error('Google callback error:', error);
    res.status(500).json({ message: 'Authentication failed' });
  }
};

export const githubAuth = async (req: Request, res: Response) => {
  try {
    const config = getGitHubOAuthConfig();
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=user:email`;
    res.json({ url: authUrl });
  } catch (error) {
    console.error('GitHub auth error:', error);
    res.status(500).json({ message: 'Failed to initiate GitHub authentication' });
  }
};

export const githubCallback = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ message: 'No authorization code received' });
    }

    const config = getGitHubOAuthConfig();
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: new URLSearchParams({
        code: code as string,
        client_id: config.clientId,
        client_secret: config.clientSecret,
        redirect_uri: config.redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) {
      return res.status(400).json({ message: 'Failed to get access token' });
    }

    const userInfo = await verifyGitHubToken(tokenData.access_token);
    if (!userInfo) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    let user = await User.findOne({ email: userInfo.email });
    if (!user) {
      user = new User({
        email: userInfo.email,
        name: userInfo.name,
        password: '', // No password needed for OAuth users
        githubId: userInfo.id,
      });
      await user.save();
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (error) {
    console.error('GitHub callback error:', error);
    res.status(500).json({ message: 'Authentication failed' });
  }
}; 