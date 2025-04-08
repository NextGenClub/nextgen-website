import { Request, Response } from 'express';
import Idea from '../models/idea.model';
import Project from '../models/project.model';
import Task from '../models/task.model';
import Vote from '../models/vote.model';
import sequelize from '../utils/database';

// Data transformation functions
const transformIdea = (idea: any) => ({
  id: idea.id,
  title: idea.title,
  description: idea.description,
  submittedBy: idea.submittedby,
  documentUrl: idea.documentUrl,
  status: idea.status,
  createdAt: new Date(idea.createdAt),
  updatedAt: new Date(idea.updatedAt),
  voteCount: idea.voteCount || 0
});

const transformProject = (project: any) => ({
  id: project.id,
  name: project.name,
  description: project.description,
  managerId: project.managerid,
  ideaId: project.ideaid,
  createdAt: new Date(project.createdAt),
  tasks: project.tasks?.map(transformTask) || []
});

const transformTask = (task: any) => ({
  id: task.id,
  title: task.title,
  description: task.description,
  isComplete: task.iscomplete || false,
  priority: task.priority || 'medium',
  assignedTo: task.assignedto,
  projectId: task.projectid,
  dueDate: task.dueDate ? new Date(task.dueDate) : null,
  createdAt: new Date(task.createdAt),
  project: task.project ? transformProject(task.project) : null
});

/**
 * Get dashboard data including top ideas, active projects, and tasks
 * @route GET /api/dashboard
 */
export const getDashboardData = async (req: Request, res: Response) => {
  try {
    // Get all ideas and sort by vote count
    const ideas = await Idea.findAll({
      raw: true,
      order: [['createdAt', 'DESC']]
    });
    const topIdea = ideas.length > 0 ? transformIdea(ideas[0]) : null;

    // Get all projects
    const projects = await Project.findAll({
      include: [
        {
          model: Task,
          as: 'tasks',
          attributes: ['id']
        }
      ]
    });

    // Get all tasks
    const tasks = await Task.findAll({
      include: [
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'name']
        }
      ]
    });

    // Transform and return the data
    res.status(200).json({
      topIdea,
      activeProjects: projects.map(transformProject),
      assignedTasks: tasks.map(transformTask)
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    // Return empty data structure on error
    res.status(200).json({
      topIdea: null,
      activeProjects: [],
      assignedTasks: []
    });
  }
};