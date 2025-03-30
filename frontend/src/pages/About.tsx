import React from 'react';

const About: React.FC = () => {
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

      <section className="about-section">
        <h2>Our Team</h2>
        <p>
          NextGen is made up of passionate creators, designers, and developers
          who are committed to bringing innovative ideas to life.
        </p>
      </section>
    </div>
  );
};

export default About;