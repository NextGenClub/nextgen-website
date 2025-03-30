import { Request, Response } from 'express';
import { sequelize } from '../utils/database';
import Idea from '../models/idea.model';
import Project from '../models/project.model';
import Task from '../models/task.model';
import Vote from '../models/vote.model';
import User from '../models/user.model';

/**
 * Get dashboard data including top ideas, active projects, and tasks
 * @route GET /api/dashboard
 */
export const getDashboard = async (req: Request, res: Response) => {
  try {
    // Get top ideas by votes
    const topIdeas = await Idea.findAll({
      include: [
        {
          model: Vote,
          as: 'votes',
          attributes: [],
        },
        {
          model: User,
          as: 'submitter',
          attributes: ['id', 'email'],
        }
      ],
      attributes: {
        include: [
          [sequelize.fn('COUNT', sequelize.col('votes.ideaid')), 'voteCount']
        ]
      },
      group: ['Idea.id', 'Idea.title', 'Idea.description', 'Idea.submittedby', 'Idea.documentUrl', 'Idea.status', 'Idea.createdAt', 'Idea.updatedAt', 'submitter.id', 'submitter.email'],
      order: [[sequelize.literal('voteCount'), 'DESC']],
      limit: 5,
    });

    // Get active projects
    const activeProjects = await Project.findAll({
      where: {
        status: 'in-progress',
      },
      include: [
        {
          model: User,
          as: 'manager',
          attributes: ['id', 'email'],
        },
        {
          model: Task,
          as: 'tasks',
          attributes: ['id', 'title', 'status'],
        }
      ],
      limit: 5,
    });

    // Get user's assigned tasks if user is authenticated
    let assignedTasks: any[] = [];
    if (req.user) {
      assignedTasks = await Task.findAll({
        where: {
          assignedTo: req.user.id,
          status: ['not-started', 'in-progress'],
        },
        include: [
          {
            model: Project,
            as: 'project',
            attributes: ['id', 'name'],
          }
        ],
        order: [['priority', 'DESC']],
        limit: 10,
      });
    }

    // Get pending ideas awaiting approval (for admins)
    let pendingIdeas: any[] = [];
    if (req.user && req.user.isAdmin) {
      pendingIdeas = await Idea.findAll({
        where: {
          status: 'pending',
        },
        include: [
          {
            model: User,
            as: 'submitter',
            attributes: ['id', 'email'],
          }
        ],
        order: [['createdAt', 'DESC']],
        limit: 5,
      });
    }

    res.status(200).json({
      topIdeas,
      activeProjects,
      assignedTasks,
      pendingIdeas: req.user?.isAdmin ? pendingIdeas : [],
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Server error fetching dashboard data' });
  }
};