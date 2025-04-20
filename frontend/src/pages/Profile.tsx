import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile, getTeamMembers } from '../services/api';
import { User } from '../types';
import './Profile.css';

interface ProfileFormData {
  name: string;
  email: string;
  bio: string | null;
  showInTeam: boolean;
  position?: string | null;
  avatar?: string | null;
  socialLinks?: Record<string, string>;
  skills?: string[];
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    email: '',
    bio: '',
    showInTeam: false,
  });
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [profileData, teamData] = await Promise.all([
          getProfile(),
          getTeamMembers(),
        ]);
        setProfile(profileData);
        setTeamMembers(teamData);
        setFormData({
          name: profileData.name,
          email: profileData.email,
          bio: profileData.bio || '',
          showInTeam: profileData.showInTeam,
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setNotification({
          show: true,
          message: 'Failed to load profile',
          type: 'error',
        });
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedProfile = await updateProfile(formData);
      setProfile(updatedProfile);
      setIsEditing(false);
      setNotification({
        show: true,
        message: 'Profile updated successfully',
        type: 'success',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      setNotification({
        show: true,
        message: 'Failed to update profile',
        type: 'error',
      });
    }
  };

  if (!profile) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-main">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {profile.avatar ? (
                <img src={profile.avatar} alt={profile.name} />
              ) : (
                <span>{profile.name.charAt(0)}</span>
              )}
            </div>
            <div className="profile-info">
              <h1 className="profile-name">{profile.name}</h1>
              <p className="profile-position">{profile.position || 'No position set'}</p>
              <p className="profile-bio">{profile.bio || 'No bio available'}</p>
              {profile.socialLinks && Object.keys(profile.socialLinks).length > 0 && (
                <div className="social-links">
                  {Object.entries(profile.socialLinks).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <button
              className="edit-button"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>

          {isEditing && (
            <form onSubmit={handleSubmit} className="form-fields">
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-field">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio || ''}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
              <div className="form-field">
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-field checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="showInTeam"
                    checked={formData.showInTeam}
                    onChange={handleInputChange}
                  />
                  Show in team members list
                </label>
              </div>
              <button type="submit" className="save-button">
                Save Changes
              </button>
            </form>
          )}

          {profile.skills && profile.skills.length > 0 && (
            <div className="skills-container">
              {profile.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="team-sidebar">
        <div className="team-card">
          <h2>Team Members</h2>
          <div className="team-members-list">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-member">
                <div className="team-member-avatar">
                  {member.avatar ? (
                    <img src={member.avatar} alt={member.name} />
                  ) : (
                    <span>{member.name.charAt(0)}</span>
                  )}
                </div>
                <div className="team-member-info">
                  <h3 className="team-member-name">{member.name}</h3>
                  <p className="team-member-position">
                    {member.position || 'No position set'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
          <button
            className="close-notification"
            onClick={() => setNotification({ ...notification, show: false })}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile; 