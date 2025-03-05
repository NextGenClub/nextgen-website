import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { generateToken } from '../utils/jwt.utils';
import { OAuth2Client } from 'google-auth-library';
import { verifyMicrosoftToken } from '../utils/microsoft.utils';
import { verifyGitHubToken } from '../utils/github.utils';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const loginWithGoogle = async (req: Request, res: Response) => {
    const { idToken } = req.body;
    const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userId = payload?.sub;

    let user = await User.findOne({ where: { googleId: userId } });
    if (!user) {
        user = await User.create({ googleId: userId, email: payload?.email });
    }

    const token = generateToken(user.id);
    res.json({ token, user });
};

export const loginWithMicrosoft = async (req: Request, res: Response) => {
    const { token } = req.body;
    const userData = await verifyMicrosoftToken(token);

    let user = await User.findOne({ where: { microsoftId: userData.id } });
    if (!user) {
        user = await User.create({ microsoftId: userData.id, email: userData.email });
    }

    const jwtToken = generateToken(user.id);
    res.json({ token: jwtToken, user });
};

export const loginWithGitHub = async (req: Request, res: Response) => {
    const { token } = req.body;
    const userData = await verifyGitHubToken(token);

    let user = await User.findOne({ where: { githubId: userData.id } });
    if (!user) {
        user = await User.create({ githubId: userData.id, email: userData.email });
    }

    const jwtToken = generateToken(user.id);
    res.json({ token: jwtToken, user });
};