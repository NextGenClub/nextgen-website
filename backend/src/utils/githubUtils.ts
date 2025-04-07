import fetch from 'node-fetch';

export interface GitHubUser {
    id: string;
    email: string;
    name: string;
}

export const getGitHubOAuthConfig = () => {
    return {
        clientId: process.env.GITHUB_CLIENT_ID || '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
        redirectUri: process.env.GITHUB_REDIRECT_URI || 'http://localhost:3000/auth/github/callback'
    };
};

export const verifyGitHubToken = async (accessToken: string): Promise<GitHubUser | null> => {
    try {
        // First, get the user's primary email
        const emailResponse = await fetch('https://api.github.com/user/emails', {
            headers: {
                Authorization: `token ${accessToken}`,
                Accept: 'application/vnd.github.v3+json'
            }
        });

        if (!emailResponse.ok) {
            console.error('Failed to fetch GitHub emails:', await emailResponse.text());
            return null;
        }

        const emails = await emailResponse.json();
        const primaryEmail = emails.find((email: any) => email.primary)?.email;

        if (!primaryEmail) {
            console.error('No primary email found for GitHub user');
            return null;
        }

        // Then, get the user's profile information
        const userResponse = await fetch('https://api.github.com/user', {
            headers: {
                Authorization: `token ${accessToken}`,
                Accept: 'application/vnd.github.v3+json'
            }
        });

        if (!userResponse.ok) {
            console.error('Failed to fetch GitHub user:', await userResponse.text());
            return null;
        }

        const userData = await userResponse.json();

        return {
            id: userData.id.toString(),
            email: primaryEmail,
            name: userData.name || userData.login
        };
    } catch (error) {
        console.error('Error verifying GitHub token:', error);
        return null;
    }
};

// Validate GitHub token format
export const isValidGitHubToken = (token: string): boolean => {
    // Basic validation for GitHub token format
    return /^gh[p|u]_[A-Za-z0-9_]{36,251}$/.test(token);
};