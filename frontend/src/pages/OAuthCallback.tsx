import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginWithGoogle, loginWithGitHub } from '../services/auth';
import './OAuthCallback.css';

const OAuthCallback: React.FC = () => {
  const history = useHistory();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');
        const provider = window.location.pathname.includes('google') ? 'google' : 'github';

        if (error) {
          throw new Error(`Authentication failed: ${error}`);
        }

        if (!code) {
          throw new Error('No authorization code received');
        }

        // Exchange code for token
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/oauth/${provider}/callback?code=${code}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          try {
            const errorJson = JSON.parse(errorText);
            throw new Error(errorJson.message || 'Authentication failed');
          } catch (e) {
            throw new Error('Authentication failed: Server error');
          }
        }

        const data = await response.json();

        if (!data.token) {
          throw new Error('No token received from server');
        }

        // Login with the received token
        if (provider === 'google') {
          await loginWithGoogle(data.token);
        } else {
          await loginWithGitHub(data.token);
        }

        // Redirect to home page
        history.push('/');
      } catch (err) {
        console.error('OAuth callback error:', err);
        setError(err instanceof Error ? err.message : 'Authentication failed');
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, [history]);

  if (loading) {
    return (
      <div className="callback-container">
        <div className="loading-spinner"></div>
        <p>Completing authentication...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="callback-container">
        <div className="error-message">
          <h2>Authentication Error</h2>
          <p>{error}</p>
          <button 
            className="btn btn-primary"
            onClick={() => history.push('/login')}
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default OAuthCallback; 