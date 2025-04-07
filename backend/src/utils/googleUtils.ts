import { OAuth2Client } from 'google-auth-library';

interface GoogleUserData {
    id: string;
    email: string;
    name?: string;
    picture?: string;
}

export const verifyGoogleToken = async (token: string): Promise<GoogleUserData> => {
    try {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        if (!payload || !payload.sub || !payload.email) {
            throw new Error('Invalid user data received from Google');
        }

        return {
            id: payload.sub,
            email: payload.email,
            name: payload.name,
            picture: payload.picture
        };
    } catch (error) {
        console.error('Google token verification failed:', error);
        throw new Error('Failed to verify Google token');
    }
};

export const getGoogleOAuthConfig = () => {
    const config = {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: process.env.GOOGLE_REDIRECT_URI,
        scopes: ['email', 'profile']
    };

    if (!config.clientId || !config.clientSecret || !config.redirectUri) {
        throw new Error('Missing Google OAuth configuration');
    }

    return config;
}; 