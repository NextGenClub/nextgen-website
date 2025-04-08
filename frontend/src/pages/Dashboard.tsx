import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getDashboardData } from '../services/api';
import { Idea, Project, Task } from '../types';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<{
    topIdea: Idea | null;
    activeProjects: Project[];
    assignedTasks: Task[];
  }>({
    topIdea: null,
    activeProjects: [],
    assignedTasks: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Skip authentication check in development
  if (process.env.NODE_ENV !== 'development' && !user) {
    navigate('/login');
    return null;
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-default';
    }
  };

  const renderTopIdea = () => {
    if (!dashboardData.topIdea) {
      return (
        <p className="empty-message">No ideas have been voted on yet</p>
      );
    }

    return (
      <div className="idea-content">
        <h3 className="idea-title">{dashboardData.topIdea.title}</h3>
        <div className="idea-votes">
          <span className="vote-icon">★</span>
          <span className="vote-count">{dashboardData.topIdea.voteCount || 0} votes</span>
        </div>
        <p className="idea-description">{dashboardData.topIdea.description}</p>
      </div>
    );
  };

  const renderProjects = () => {
    if (dashboardData.activeProjects.length === 0) {
      return (
        <p className="empty-message">No active projects</p>
      );
    }

    return (
      <div className="projects-list">
        {dashboardData.activeProjects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <h4 className="project-title">{project.name}</h4>
              <span className="task-count">{project.tasks?.length || 0} tasks</span>
            </div>
            {project.managerId && (
              <span className="project-badge">Managed</span>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderTasks = () => {
    if (dashboardData.assignedTasks.length === 0) {
      return (
        <p className="empty-message">No tasks assigned</p>
      );
    }

    return (
      <div className="tasks-list">
        {dashboardData.assignedTasks.map((task) => (
          <div key={task.id} className="task-card">
            <div className="task-header">
              <div className="task-title-group">
                <span className={`task-status-icon ${task.isComplete ? 'completed' : 'pending'}`}>
                  {task.isComplete ? '✓' : '⏱'}
                </span>
                <h4 className="task-title">{task.title}</h4>
              </div>
              <span className={`task-priority ${getPriorityClass(task.priority)}`}>
                {task.priority}
              </span>
            </div>
            <p className="task-project">Project: {task.project?.name || 'Unassigned'}</p>
            {task.dueDate && (
              <div className="task-due-date">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name || 'User'}!</h1>
        <p>Here's what's happening in your workspace</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-icon idea-icon">💡</div>
            <div className="card-title">
              <h2>Top Voted Idea</h2>
              <p>Most popular idea in your workspace</p>
            </div>
          </div>
          <div className="card-content">
            {renderTopIdea()}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-icon project-icon">📊</div>
            <div className="card-title">
              <h2>Active Projects</h2>
              <p>Projects you're currently working on</p>
            </div>
          </div>
          <div className="card-content">
            {renderProjects()}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-icon task-icon">✓</div>
            <div className="card-title">
              <h2>Your Tasks</h2>
              <p>Tasks assigned to you</p>
            </div>
          </div>
          <div className="card-content">
            {renderTasks()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 