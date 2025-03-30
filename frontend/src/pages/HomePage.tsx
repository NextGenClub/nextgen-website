import React, { useState, useEffect } from 'react';
import { getIdeas } from '../services/ideas';
import { Link } from 'react-router-dom';
import { Idea } from '../types/idea.types';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const data = await getIdeas();
        setIdeas(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch ideas');
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">Error: {error}</div>;

  return (
    <div className="home-page container">
      <div className="hero-section">
        <h1>Welcome to NextGen Website</h1>
        <p>A community platform for project ideas, voting, and collaboration</p>
        <div className="cta-buttons">
          <Link to="/submit-idea" className="btn btn-primary">Submit an Idea</Link>
          <Link to="/about" className="btn btn-secondary">Learn More</Link>
        </div>
      </div>

      <div className="featured-ideas">
        <h2>Featured Ideas</h2>
        <div className="ideas-grid">
          {ideas.slice(0, 3).map((idea) => (
            <div key={idea.id} className="idea-card">
              <h3>{idea.title}</h3>
              <p>{idea.description}</p>
              <div className="idea-votes">Votes: {idea.voteCount || 0}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="about-section">
        <h2>About NextGen</h2>
        <p>
          We're a community of creators, builders, and problem solvers. NextGen 
          provides a platform where community members can submit project ideas, 
          vote on proposals, and manage ongoing work.
        </p>
      </div>
    </div>
  );
};

export default HomePage;