import React, { useEffect, useState } from 'react';
import { voteOnIdea, getIdeas } from '../../services/ideas';
import { Idea } from '../../types/idea.types';

const VotingSystem: React.FC = () => {
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadIdeas = async () => {
            try {
                const fetchedIdeas = await getIdeas();
                setIdeas(fetchedIdeas);
            } catch (error) {
                console.error('Error fetching ideas:', error);
            } finally {
                setLoading(false);
            }
        };

        loadIdeas();
    }, []);

    const handleVote = async (ideaId: string | number) => {
        try {
            const updatedIdea = await voteOnIdea(ideaId);
            
            setIdeas(prevIdeas => prevIdeas.map(idea => 
                idea.id === ideaId ? { ...idea, voteCount: (idea.voteCount || 0) + 1 } : idea
            ));
        } catch (error) {
            console.error('Error voting for idea:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Vote for Ideas</h2>
            <ul>
                {ideas.map(idea => (
                    <li key={idea.id}>
                        <h3>{idea.title}</h3>
                        <p>{idea.description}</p>
                        <button onClick={() => handleVote(idea.id)}>Vote</button>
                        <span> Votes: {idea.voteCount || 0}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VotingSystem;