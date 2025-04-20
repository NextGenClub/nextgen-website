import React from 'react';
import { User } from '../types';

interface TeamMemberProps {
  member: User;
}

const TeamMember: React.FC<TeamMemberProps> = ({ member }) => {
  return (
    <div className="team-member">
      <div className="member-avatar">
        {member.avatar ? (
          <img src={member.avatar} alt={member.name} />
        ) : (
          <div className="avatar-placeholder">
            {member.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="member-info">
        <h3>{member.name}</h3>
        {member.position && <p className="position">{member.position}</p>}
        {member.bio && <p className="bio">{member.bio}</p>}
        {member.skills && member.skills.length > 0 && (
          <div className="skills">
            {member.skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        )}
        {member.socialLinks && (
          <div className="social-links">
            {member.socialLinks.github && (
              <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
            )}
            {member.socialLinks.linkedin && (
              <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
            )}
            {member.socialLinks.twitter && (
              <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMember; 