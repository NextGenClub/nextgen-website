import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import IdeaSubmission from './pages/IdeaSubmission';

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/about" component={About} />
            <Route path="/submit-idea" component={IdeaSubmission} />
        </Switch>
    );
};

export default Routes;