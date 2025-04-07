import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginWithGoogle, loginWithGitHub } from '../services/auth';
import './OAuthCallback.css';

interface OAuthCallbackProps {}

const OAuthCallback: React.FC<OAuthCallbackProps> = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        const provider = location.pathname.includes('google') ? 'google' : 'github';

        if (!code) {
          throw new Error('No authorization code found in the URL');
        }

        if (provider === 'google') {
          await loginWithGoogle(code);
        } else {
          await loginWithGitHub(code);
        }

        // Redirect to home page after successful login
        navigate('/');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Authentication failed');
      } finally {
        setLoading(false);
      }
    };

    handleOAuthCallback();
  }, [navigate, location]);

  if (loading) {
    return (
      <div className="callback-container">
        <div className="loading-spinner"></div>
        <p>Authenticating...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="callback-container">
        <div className="error-message">
          <h3>Authentication Error</h3>
          <p>{error}</p>
          <button onClick={() => navigate('/login')}>
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default OAuthCallback; 