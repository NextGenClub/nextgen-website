import { Request, Response } from 'express';
import Task from '../models/task.model';
import User from '../models/user.model';
import Project from '../models/project.model';

/**
 * Get all tasks with pagination and filtering
 * @route GET /api/tasks
 */
export const getTasks = async (req: Request, res: Response) => {
  try {
    // Extract query parameters
    const {
      status,
      priority,
      assignedTo,
      projectId,
      sortBy = 'createdAt',
      order = 'DESC',
      page = 1,
      limit = 10
    } = req.query;
    
    // Build where clause
    const where: any = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (assignedTo) where.assignedTo = assignedTo;
    if (projectId) where.projectId = projectId;
    
    // Calculate offset for pagination
    const offset = (Number(page) - 1) * Number(limit);
    
    // Fetch tasks
    const { count, rows: tasks } = await Task.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'assignee',
          attributes: ['id', 'email'],
        },
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'name'],
        }
      ],
      order: [[sortBy.toString(), order.toString()]],
      limit: Number(limit),
      offset,
    });
    
    res.status(200).json({
      tasks,
      totalItems: count,
      totalPages: Math.ceil(count / Number(limit)),
      currentPage: Number(page)
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error fetching tasks' });
  }
};

/**
 * Get a single task by ID
 * @route GET /api/tasks/:id
 */
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findByPk(id, {
      include: [
        {
          model: User,
          as: 'assignee',
          attributes: ['id', 'email'],
        },
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'name'],
        }
      ]
    });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(200).json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Server error fetching task' });
  }
};

/**
 * Create a new task
 * @route POST /api/tasks
 */
export const createTask = async (req: Request, res: Response) => {
  try {
    const { 
      title, 
      description, 
      status = 'not-started', 
      priority = 'medium',
      assignedTo,
      projectId,
      dueDate
    } = req.body;
    
    const newTask = await Task.create({
      title,
      description,
      status,
      priority,
      assignedTo,
      projectId,
      dueDate: dueDate ? new Date(dueDate) : null
    });
    
    // Fetch the task with associations
    const task = await Task.findByPk(newTask.id, {
      include: [
        {
          model: User,
          as: 'assignee',
          attributes: ['id', 'email'],
        },
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'name'],
        }
      ]
    });
    
    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error creating task' });
  }
};

/**
 * Update a task
 * @route PUT /api/tasks/:id
 */
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      description, 
      status, 
      priority,
      assignedTo,
      projectId,
      dueDate
    } = req.body;
    
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // Update task
    await task.update({
      title: title || task.title,
      description: description !== undefined ? description : task.description,
      status: status || task.status,
      priority: priority || task.priority,
      assignedTo: assignedTo !== undefined ? assignedTo : task.assignedTo,
      projectId: projectId !== undefined ? projectId : task.projectId,
      dueDate: dueDate ? new Date(dueDate) : task.dueDate
    });
    
    // Fetch updated task with associations
    const updatedTask = await Task.findByPk(id, {
      include: [
        {
          model: User,
          as: 'assignee',
          attributes: ['id', 'email'],
        },
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'name'],
        }
      ]
    });
    
    res.status(200).json({
      message: 'Task updated successfully',
      task: updatedTask
    });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error updating task' });
  }
};

/**
 * Delete a task
 * @route DELETE /api/tasks/:id
 */
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    await task.destroy();
    
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error deleting task' });
  }
};