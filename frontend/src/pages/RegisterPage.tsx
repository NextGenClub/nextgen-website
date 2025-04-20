import React from 'react';
import { Link } from 'react-router-dom';
import Register from '../components/Auth/Register';
import './RegisterPage.css';

const RegisterPage: React.FC = () => {
    return (
        <div className="register-page">
            <div className="register-container">
                <h1>Create an Account</h1>
                <Register />
                <div className="auth-links">
                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage; 