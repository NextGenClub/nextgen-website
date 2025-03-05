import React, { useEffect, useState } from 'react';
import { getTopIdeas } from '../../services/ideas';
import { Idea } from '../../types/idea.types';

const TopIdeas: React.FC = () => {
    const [topIdeas, setTopIdeas] = useState<Idea[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTopIdeas = async () => {
            try {
                const ideas = await getTopIdeas();
                setTopIdeas(ideas);
            } catch (err) {
                setError('Failed to fetch top ideas');
            } finally {
                setLoading(false);
            }
        };

        fetchTopIdeas();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Top Ideas</h2>
            <ul>
                {topIdeas.map((idea) => (
                    <li key={idea.id}>
                        <h3>{idea.title}</h3>
                        <p>{idea.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopIdeas;