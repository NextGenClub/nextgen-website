import React from 'react';
import { Idea } from '../../types/idea.types';

interface TopIdeasProps {
    ideas: Idea[];
}

const TopIdeas: React.FC<TopIdeasProps> = ({ ideas }) => {
    if (ideas.length === 0) {
        return <div>No ideas found</div>;
    }

    return (
        <div>
            <h2>Top Ideas</h2>
            <ul>
                {ideas.map((idea) => (
                    <li key={idea.id}>
                        <h3>{idea.title}</h3>
                        <p>{idea.description}</p>
                        <p>Votes: {idea.voteCount || 0}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopIdeas;