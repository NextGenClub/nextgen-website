import React, { useEffect, useState } from 'react';
import { getTopRankedIdeas } from '../../services/ideas';
import { Idea } from '../../types/idea.types';
import TopIdeas from './TopIdeas';

const Dashboard: React.FC = () => {
    const [topIdeas, setTopIdeas] = useState<Idea[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTopIdeas = async () => {
            try {
                const ideas = await getTopRankedIdeas();
                setTopIdeas(ideas);
            } catch (error) {
                console.error('Error fetching top ideas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopIdeas();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <TopIdeas ideas={topIdeas} />
        </div>
    );
};

export default Dashboard;