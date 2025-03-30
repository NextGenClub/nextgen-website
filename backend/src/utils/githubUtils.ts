import axios from 'axios';

interface GitHubUserData {
    id: string;
    email: string;
    login?: string;
    name?: string;
}

export const verifyGitHubToken = async (token: string): Promise<GitHubUserData> => {
    try {
        // Get user data from GitHub API
        const response = await axios.get('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        const userData:any = response.data;

        // Get user's email (might be private)
        const emailResponse:any = await axios.get('https://api.github.com/user/emails', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        // Find primary email
        const primaryEmail = emailResponse.data.find((email: any) => email.primary)?.email;

        if (!userData.id || !primaryEmail) {
            throw new Error('Invalid user data received from GitHub');
        }

        return {
            id: userData.id.toString(),
            email: primaryEmail,
            login: userData.login,
            name: userData.name
        };
    } catch (error) {
        console.error('GitHub token verification failed:', error);
        throw new Error('Failed to verify GitHub token');
    }
};

// Validate GitHub token format
export const isValidGitHubToken = (token: string): boolean => {
    // Basic validation for GitHub token format
    return /^gh[p|u]_[A-Za-z0-9_]{36,251}$/.test(token);
};

// Get GitHub OAuth configuration
export const getGitHubOAuthConfig = () => {
    const config = {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        redirectUri: process.env.GITHUB_REDIRECT_URI,
        scope: 'user:email'
    };

    if (!config.clientId || !config.clientSecret || !config.redirectUri) {
        throw new Error('Missing GitHub OAuth configuration');
    }

    return config;
};