import React from 'react';
import './SocialLogin.css';

interface SocialLoginProps {
    onGoogleLogin: () => void;
    onGitHubLogin: () => void;
}

const SocialLogin: React.FC<SocialLoginProps> = ({ onGoogleLogin, onGitHubLogin }) => {
    return (
        <div className="social-login">
            <div className="divider">
                <span>OR</span>
            </div>
            <div className="social-buttons">
                <button 
                    className="social-btn google-btn"
                    onClick={onGoogleLogin}
                >
                    <img src="/google-icon.png" alt="Google" className="social-icon" />
                    Continue with Google
                </button>
                <button 
                    className="social-btn github-btn"
                    onClick={onGitHubLogin}
                >
                    <img src="/github-icon.png" alt="GitHub" className="social-icon" />
                    Continue with GitHub
                </button>
            </div>
        </div>
    );
};

export default SocialLogin; 