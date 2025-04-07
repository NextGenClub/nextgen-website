import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import IdeaSubmission from './pages/IdeaSubmission';
import LoginPage from './pages/LoginPage';
import OAuthCallback from './pages/OAuthCallback';

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/about" component={About} />
            <Route path="/submit-idea" component={IdeaSubmission} />
            <Route path="/login" component={LoginPage} />
            <Route path="/auth/google/callback" component={OAuthCallback} />
            <Route path="/auth/github/callback" component={OAuthCallback} />
        </Switch>
    );
};

export default Routes;