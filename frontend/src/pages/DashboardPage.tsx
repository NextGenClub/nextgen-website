import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import TopIdeas from '../components/Dashboard/TopIdeas';

const DashboardPage: React.FC = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <Dashboard />
            <TopIdeas />
        </div>
    );
};

export default DashboardPage;