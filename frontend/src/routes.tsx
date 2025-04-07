import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import IdeaSubmission from './pages/IdeaSubmission';
import LoginPage from './pages/LoginPage';
import OAuthCallback from './pages/OAuthCallback';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/submit-idea" element={<IdeaSubmission />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/google/callback" element={<OAuthCallback />} />
            <Route path="/auth/github/callback" element={<OAuthCallback />} />
        </Routes>
    );
};

export default AppRoutes;