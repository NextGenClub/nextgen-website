import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import IdeaSubmission from './pages/IdeaSubmission';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import IdeaList from './components/Ideas/IdeaList';
import VotingSystem from './components/Ideas/VotingSystem';
import TaskList from './components/Tasks/TaskList';
import TopIdeas from './components/Dashboard/TopIdeas';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/about" component={About} />
                <Route path="/submit-idea" component={IdeaSubmission} />
                <Route path="/dashboard" component={DashboardPage} />
                <Route path="/tasks" component={TasksPage} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/ideas" component={IdeaList} />
                <Route path="/voting" component={VotingSystem} />
                <Route path="/task-list" component={TaskList} />
                <Route path="/top-ideas" component={TopIdeas} />
            </Switch>
        </Router>
    );
};

export default Routes;