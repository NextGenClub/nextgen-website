import { Request, Response } from 'express';
import { verifyGoogleToken, getGoogleOAuthConfig } from '../utils/googleUtils';
import { verifyGitHubToken, getGitHubOAuthConfig } from '../utils/githubUtils';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';

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
    const params = new URLSearchParams();
    params.append('code', code as string);
    params.append('client_id', config.clientId || '');
    params.append('client_secret', config.clientSecret || '');
    params.append('redirect_uri', config.redirectUri || '');
    params.append('grant_type', 'authorization_code');

    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) {
      return res.status(400).json({ message: 'Failed to get access token' });
    }

    const userInfo = await verifyGoogleToken(tokenData.access_token);
    if (!userInfo) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    let user = await User.findOne({ where: { email: userInfo.email } });
    if (!user) {
      const username = userInfo.email.split('@')[0];
      user = await User.create({
        email: userInfo.email,
        name: userInfo.name || username,
        username: username,
        password: '', // No password needed for OAuth users
        googleId: userInfo.id,
        isApproved: true,
      });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    res.json({ token, user: { id: user.id, email: user.email, name: user.name, username: user.username } });
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
    const params = new URLSearchParams();
    params.append('code', code as string);
    params.append('client_id', config.clientId || '');
    params.append('client_secret', config.clientSecret || '');
    params.append('redirect_uri', config.redirectUri || '');

    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: params,
    });

    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) {
      return res.status(400).json({ message: 'Failed to get access token' });
    }

    const userInfo = await verifyGitHubToken(tokenData.access_token);
    if (!userInfo) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    let user = await User.findOne({ where: { email: userInfo.email } });
    if (!user) {
      const username = userInfo.email.split('@')[0];
      user = await User.create({
        email: userInfo.email,
        name: userInfo.name || username,
        username: username,
        password: '', // No password needed for OAuth users
        githubId: userInfo.id,
        isApproved: true,
      });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    res.json({ token, user: { id: user.id, email: user.email, name: user.name, username: user.username } });
  } catch (error) {
    console.error('GitHub callback error:', error);
    res.status(500).json({ message: 'Authentication failed' });
  }
}; 