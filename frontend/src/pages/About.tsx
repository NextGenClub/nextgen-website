import React, { useEffect, useState } from 'react';
import { getTeamMembers } from '../services/api';
import { User } from '../types';
import TeamMember from '../components/TeamMember';
import '../components/TeamMember.css';

const About: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const members = await getTeamMembers();
        setTeamMembers(members);
      } catch (err) {
        setError('Failed to load team members');
        console.error('Error fetching team members:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="about-page container">
      <h1>About NextGen</h1>
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          NextGen is a community-driven platform that enables members to 
          submit project ideas, vote on proposals, and collaborate on 
          ongoing projects.
        </p>
      </section>

      <section className="about-section">
        <h2>How It Works</h2>
        <p>
          1. <strong>Submit an Idea</strong> - Anyone can submit a project idea through our platform.
        </p>
        <p>
          2. <strong>Community Voting</strong> - Club members vote on submitted ideas to determine which projects to pursue.
        </p>
        <p>
          3. <strong>Project Implementation</strong> - Selected ideas are developed into full projects by our community.
        </p>
        <p>
          4. <strong>Task Management</strong> - Club members collaborate on tasks to bring projects to life.
        </p>
      </section>

      <section className="about-section team-section">
        <h2>Our Team</h2>
        {loading ? (
          <p>Loading team members...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : teamMembers.length === 0 ? (
          <p>No team members found.</p>
        ) : (
          <div className="team-grid">
            {teamMembers.map((member) => (
              <TeamMember key={member.id} member={member} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default About;