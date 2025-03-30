import axios from 'axios';

interface MicrosoftUserData {
    id: string;
    email: string;
    displayName?: string;
}

export const verifyMicrosoftToken = async (token: string): Promise<MicrosoftUserData> => {
    try {
        // Microsoft Graph API endpoint for user profile
        const response = await axios.get('https://graph.microsoft.com/v1.0/me', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const userData:any = response.data;

        if (!userData.id || !userData.mail) {
            throw new Error('Invalid user data received from Microsoft');
        }

        return {
            id: userData.id,
            email: userData.mail,
            displayName: userData.displayName
        };
    } catch (error) {
        console.error('Microsoft token verification failed:', error);
        throw new Error('Failed to verify Microsoft token');
    }
};

// Validate Microsoft token format
export const isValidMicrosoftToken = (token: string): boolean => {
    // Basic validation - check if token is in JWT format
    const tokenParts = token.split('.');
    return tokenParts.length === 3 && 
           tokenParts.every(part => typeof part === 'string' && part.length > 0);
};

// Get Microsoft OAuth configuration
export const getMicrosoftOAuthConfig = () => {
    const config = {
        clientId: process.env.MICROSOFT_CLIENT_ID,
        clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
        redirectUri: process.env.MICROSOFT_REDIRECT_URI,
        scopes: ['user.read', 'email']
    };

    if (!config.clientId || !config.clientSecret || !config.redirectUri) {
        throw new Error('Missing Microsoft OAuth configuration');
    }

    return config;
};