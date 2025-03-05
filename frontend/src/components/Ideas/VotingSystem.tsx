import React, { useEffect, useState } from 'react';
import { voteOnIdea, fetchIdeas } from '../../services/ideas';
import { Idea } from '../../types/idea.types';

const VotingSystem: React.FC = () => {
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadIdeas = async () => {
            const fetchedIdeas = await fetchIdeas();
            setIdeas(fetchedIdeas);
            setLoading(false);
        };

        loadIdeas();
    }, []);

    const handleVote = async (ideaId: number) => {
        await voteOnIdea(ideaId);
        const updatedIdeas = ideas.map(idea => 
            idea.id === ideaId ? { ...idea, voteCount: idea.voteCount + 1 } : idea
        );
        setIdeas(updatedIdeas);
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
                        <span> Votes: {idea.voteCount}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VotingSystem;