import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginWithGoogle, loginWithGitHub } from '../../services/auth';
import './Register.css';

interface FormData {
    email: string;
    name: string;
    username: string;
    password: string;
    confirmPassword: string;
}

interface ValidationErrors {
    email?: string;
    name?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
}

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        email: '',
        name: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateUsername = (username: string): boolean => {
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        return usernameRegex.test(username);
    };

    const calculatePasswordStrength = (password: string): number => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {};
        let isValid = true;

        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        if (!formData.name) {
            newErrors.name = 'Name is required';
            isValid = false;
        } else if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters long';
            isValid = false;
        }

        if (!formData.username) {
            newErrors.username = 'Username is required';
            isValid = false;
        } else if (!validateUsername(formData.username)) {
            newErrors.username = 'Username must be 3-20 characters long and can only contain letters, numbers, and underscores';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
            isValid = false;
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'password') {
            setPasswordStrength(calculatePasswordStrength(value));
        }
    };

    const getPasswordStrengthText = (): string => {
        if (passwordStrength === 0) return 'Very Weak';
        if (passwordStrength === 1) return 'Weak';
        if (passwordStrength === 2) return 'Fair';
        if (passwordStrength === 3) return 'Good';
        if (passwordStrength === 4) return 'Strong';
        return 'Very Strong';
    };

    const getPasswordStrengthColor = (): string => {
        if (passwordStrength <= 1) return '#ff4444';
        if (passwordStrength === 2) return '#ffbb33';
        if (passwordStrength === 3) return '#00C851';
        return '#007E33';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            console.log('Sending registration data:', {
                email: formData.email,
                name: formData.name,
                username: formData.username,
                password: formData.password
            });
            
            await registerUser({
                email: formData.email,
                name: formData.name,
                username: formData.username,
                password: formData.password
            });
            navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
        } catch (err: any) {
            console.error('Registration error:', err.response?.data || err);
            
            // Clear previous errors
            setErrors({});
            
            // Handle different types of errors
            if (err.response?.data?.errors) {
                // Handle validation errors array from backend
                const validationErrors = err.response.data.errors;
                const newErrors: ValidationErrors = {};
                
                validationErrors.forEach((error: any) => {
                    // Map backend field names to frontend field names
                    const fieldMap: { [key: string]: keyof ValidationErrors } = {
                        'email': 'email',
                        'name': 'name',
                        'username': 'username',
                        'password': 'password'
                    };
                    
                    const field = fieldMap[error.path] || 'email';
                    newErrors[field] = error.message;
                });
                
                setErrors(newErrors);
            } else if (err.response?.data?.missingFields) {
                // Handle missing fields error
                const missingFields = err.response.data.missingFields;
                setErrors(prev => ({
                    ...prev,
                    email: missingFields.email ? 'Email is required' : undefined,
                    name: missingFields.name ? 'Name is required' : undefined,
                    username: missingFields.username ? 'Username is required' : undefined,
                    password: missingFields.password ? 'Password is required' : undefined
                }));
            } else {
                // Handle other errors (e.g., email already exists, username taken)
                const errorMessage = err.response?.data?.message || 'Registration failed';
                let fieldName: keyof ValidationErrors | undefined;
                
                // Map error messages to specific fields
                if (errorMessage.toLowerCase().includes('email')) {
                    fieldName = 'email';
                } else if (errorMessage.toLowerCase().includes('username')) {
                    fieldName = 'username';
                } else if (errorMessage.toLowerCase().includes('password')) {
                    fieldName = 'password';
                } else if (errorMessage.toLowerCase().includes('name')) {
                    fieldName = 'name';
                }
                
                setErrors(prev => ({
                    ...prev,
                    [fieldName || 'email']: errorMessage
                }));
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            // Open Google OAuth popup
            const googleAuthUrl = `${process.env.REACT_APP_API_BASE_URL}/api/oauth/google/url`;
            const response = await fetch(googleAuthUrl);
            const { url } = await response.json();
            
            // Open popup window
            const width = 600;
            const height = 600;
            const left = window.screen.width / 2 - width / 2;
            const top = window.screen.height / 2 - height / 2;
            
            const popup = window.open(
                url,
                'Google OAuth',
                `width=${width},height=${height},left=${left},top=${top}`
            );

            // Listen for message from popup
            window.addEventListener('message', async (event) => {
                if (event.origin !== window.location.origin) return;
                
                if (event.data.type === 'oauth-success') {
                    try {
                        await loginWithGoogle(event.data.token);
                        navigate('/dashboard');
                    } catch (error) {
                        console.error('Google login error:', error);
                        setErrors(prev => ({
                            ...prev,
                            email: 'Failed to login with Google'
                        }));
                    }
                }
            });
        } catch (error) {
            console.error('Google OAuth error:', error);
            setErrors(prev => ({
                ...prev,
                email: 'Failed to start Google login'
            }));
        }
    };

    const handleGitHubLogin = async () => {
        try {
            // Open GitHub OAuth popup
            const githubAuthUrl = `${process.env.REACT_APP_API_BASE_URL}/api/oauth/github/url`;
            const response = await fetch(githubAuthUrl);
            const { url } = await response.json();
            
            // Open popup window
            const width = 600;
            const height = 600;
            const left = window.screen.width / 2 - width / 2;
            const top = window.screen.height / 2 - height / 2;
            
            const popup = window.open(
                url,
                'GitHub OAuth',
                `width=${width},height=${height},left=${left},top=${top}`
            );

            // Listen for message from popup
            window.addEventListener('message', async (event) => {
                if (event.origin !== window.location.origin) return;
                
                if (event.data.type === 'oauth-success') {
                    try {
                        await loginWithGitHub(event.data.token);
                        navigate('/dashboard');
                    } catch (error) {
                        console.error('GitHub login error:', error);
                        setErrors(prev => ({
                            ...prev,
                            email: 'Failed to login with GitHub'
                        }));
                    }
                }
            });
        } catch (error) {
            console.error('GitHub OAuth error:', error);
            setErrors(prev => ({
                ...prev,
                email: 'Failed to start GitHub login'
            }));
        }
    };

    return (
        <div className="register-form-container">
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? 'error' : ''}
                        disabled={loading}
                        placeholder="Enter your full name"
                    />
                    {errors.name && <div className="error-message">{errors.name}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={errors.username ? 'error' : ''}
                        disabled={loading}
                        placeholder="Choose a username"
                    />
                    {errors.username && <div className="error-message">{errors.username}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                        disabled={loading}
                        placeholder="Enter your email"
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? 'error' : ''}
                        disabled={loading}
                        placeholder="Create a password"
                    />
                    {errors.password && <div className="error-message">{errors.password}</div>}
                    {formData.password && (
                        <div className="password-strength">
                            <div className="strength-bar">
                                <div
                                    className="strength-fill"
                                    style={{
                                        width: `${(passwordStrength / 5) * 100}%`,
                                        backgroundColor: getPasswordStrengthColor()
                                    }}
                                />
                            </div>
                            <span style={{ color: getPasswordStrengthColor() }}>
                                {getPasswordStrengthText()}
                            </span>
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={errors.confirmPassword ? 'error' : ''}
                        disabled={loading}
                        placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && (
                        <div className="error-message">{errors.confirmPassword}</div>
                    )}
                </div>

                <div className="oauth-buttons">
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="oauth-button google-button"
                        disabled={loading}
                    >
                        <img src="/google-icon.png" alt="Google" className="oauth-icon" />
                        Continue with Google
                    </button>
                    
                    <button
                        type="button"
                        onClick={handleGitHubLogin}
                        className="oauth-button github-button"
                        disabled={loading}
                    >
                        <img src="/github-icon.png" alt="GitHub" className="oauth-icon" />
                        Continue with GitHub
                    </button>
                </div>

                <div className="divider">
                    <span>or</span>
                </div>

                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={loading}
                >
                    {loading ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>
        </div>
    );
};

export default Register;