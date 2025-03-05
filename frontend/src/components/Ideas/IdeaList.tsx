import React from 'react';
import { Idea } from '../../../types/idea.types';
import './IdeaList.css';

interface IdeaListProps {
  ideas: Idea[];
}

const IdeaList: React.FC<IdeaListProps> = ({ ideas }) => {
  return (
    <div className="idea-list">
      <h2>Submitted Ideas</h2>
      {ideas.length === 0 ? (
        <p>No ideas submitted yet.</p>
      ) : (
        <ul>
          {ideas.map((idea) => (
            <li key={idea.id}>
              <h3>{idea.title}</h3>
              <p>{idea.description}</p>
              <p>Submitted by: {idea.submittedBy || 'Anonymous'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IdeaList;