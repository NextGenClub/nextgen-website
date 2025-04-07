import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <LoginForm />
      <div className="login-links">
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
        <p>Forgot your password? <Link to="/forgot-password">Reset it</Link></p>
      </div>
    </div>
  );
};

export default LoginPage; 