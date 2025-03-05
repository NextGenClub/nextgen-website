import { Request, Response } from 'express';
import Task from '../models/task.model';

// Get all tasks
export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tasks', error });
    }
};

// Create a new task
export const createTask = async (req: Request, res: Response) => {
    const { title, description, assignedTo, projectId } = req.body;
    try {
        const newTask = await Task.create({ title, description, assignedTo, projectId });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
};

// Update a task
export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;
    try {
        const updatedTask = await Task.update({ title, description, isComplete }, { where: { id } });
        if (updatedTask[0] === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.destroy({ where: { id } });
        if (deletedTask === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};