import { Router } from 'express';
import { authenticate, isApproved } from '../middleware/auth.middleware';

const router = Router();

// GET all projects
router.get('/', async (req, res) => {
  try {
    const Project = require('../models/project.model').default;
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server error fetching projects' });
  }
});

// GET project by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const Project = require('../models/project.model').default;
    const project = await Project.findByPk(id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Server error fetching project' });
  }
});

export default router; 