import { Request, Response } from 'express';
import Idea from '../models/idea.model';
import Vote from '../models/vote.model';
import { sequelize } from '../utils/database';
import { validateIdeaSubmission } from '../utils/validators';

/**
 * Get all ideas with vote counts
 * @route GET /api/ideas
 */
export const getIdeas = async (req: Request, res: Response) => {
  try {
    // Get query parameters for filtering and pagination
    const { status, sortBy, order, page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    
    // Prepare filter conditions
    const where: any = {};
    if (status) {
      where.status = status;
    }
    
    // Prepare order options
    const orderOptions: any = [];
    if (sortBy) {
      orderOptions.push([sortBy.toString(), order?.toString()?.toUpperCase() || 'DESC']);
    } else {
      orderOptions.push(['createdAt', 'DESC']); // Default sorting
    }
    
    // Query ideas with votes count
    const { count, rows: ideas } = await Idea.findAndCountAll({
      where,
      order: orderOptions,
      limit: Number(limit),
      offset,
      attributes: {
        include: [
          [
            sequelize.literal('(SELECT COUNT(*) FROM votes WHERE votes.ideaid = "Idea"."id")'),
            'voteCount'
          ]
        ]
      },
      distinct: true
    });
    
    res.status(200).json({
      ideas,
      totalItems: count,
      totalPages: Math.ceil(count / Number(limit)),
      currentPage: Number(page)
    });
  } catch (error) {
    console.error('Error fetching ideas:', error);
    res.status(500).json({ message: 'Server error fetching ideas' });
  }
};

/**
 * Get a single idea by ID
 * @route GET /api/ideas/:id
 */
export const getIdeaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const idea = await Idea.findByPk(id, {
      attributes: {
        include: [
          [
            sequelize.literal('(SELECT COUNT(*) FROM votes WHERE votes.ideaid = "Idea"."id")'),
            'voteCount'
          ]
        ]
      }
    });
    
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    
    res.status(200).json(idea);
  } catch (error) {
    console.error('Error fetching idea:', error);
    res.status(500).json({ message: 'Server error fetching idea' });
  }
};

/**
 * Create a new idea
 * @route POST /api/ideas
 */
export const createIdea = async (req: Request, res: Response) => {
  try {
    const { title, description, documentUrl } = req.body;
    
    // Set submittedBy to authenticated user's id if available
    const submittedBy = req.user ? req.user.id : null;
    
    const newIdea = await Idea.create({
      title,
      description,
      documentUrl,
      submittedby: submittedBy,
      status: 'pending'
    });
    
    res.status(201).json({
      message: 'Idea submitted successfully',
      idea: newIdea
    });
  } catch (error) {
    console.error('Error creating idea:', error);
    res.status(500).json({ message: 'Server error creating idea' });
  }
};

/**
 * Update an idea
 * @route PUT /api/ideas/:id
 */
export const updateIdea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status, documentUrl } = req.body;
    
    const idea = await Idea.findByPk(id);
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    
    // Check if user is authorized to update this idea
    // Only admins or the original submitter can update
    if (
      !req.user.isAdmin && 
      idea.submittedby !== null && 
      idea.submittedby !== req.user.id
    ) {
      return res.status(403).json({ message: 'Not authorized to update this idea' });
    }
    
    // Update idea
    await idea.update({
      title: title || idea.title,
      description: description || idea.description,
      status: status || idea.status,
      documentUrl: documentUrl || idea.documentUrl
    });
    
    res.status(200).json({
      message: 'Idea updated successfully',
      idea
    });
  } catch (error) {
    console.error('Error updating idea:', error);
    res.status(500).json({ message: 'Server error updating idea' });
  }
};

/**
 * Delete an idea
 * @route DELETE /api/ideas/:id
 */
export const deleteIdea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const idea = await Idea.findByPk(id);
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    
    // Check if user is authorized to delete this idea
    // Only admins or the original submitter can delete
    if (
      !req.user.isAdmin && 
      idea.submittedby !== null && 
      idea.submittedby !== req.user.id
    ) {
      return res.status(403).json({ message: 'Not authorized to delete this idea' });
    }
    
    // Delete idea
    await idea.destroy();
    
    res.status(200).json({ message: 'Idea deleted successfully' });
  } catch (error) {
    console.error('Error deleting idea:', error);
    res.status(500).json({ message: 'Server error deleting idea' });
  }
};

/**
 * Vote for an idea
 * @route POST /api/ideas/:id/vote
 */
export const voteForIdea = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id: ideaId } = req.params;
    const userId = req.user.id;
    
    // Check if idea exists
    const idea = await Idea.findByPk(ideaId);
    if (!idea) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Idea not found' });
    }
    
    // Check if user already voted for this idea
    const existingVote = await Vote.findOne({
      where: { userid: userId, ideaid: ideaId },
      transaction
    });
    
    if (existingVote) {
      await transaction.rollback();
      return res.status(400).json({ message: 'You have already voted for this idea' });
    }
    
    // Create new vote
    await Vote.create({
      userid: userId,
      ideaid: ideaId
    }, { transaction });
    
    await transaction.commit();
    
    // Return the updated idea with vote count
    const updatedIdea = await Idea.findByPk(ideaId, {
      include: [
        {
          model: Vote,
          as: 'votes',
          attributes: [],
        }
      ],
      attributes: {
        include: [
          [sequelize.fn('COUNT', sequelize.col('votes.ideaid')), 'voteCount']
        ]
      },
      group: ['Idea.id', 'Idea.title', 'Idea.description', 'Idea.submittedby', 'Idea.documentUrl', 'Idea.status', 'Idea.createdAt', 'Idea.updatedAt']
    });
    
    res.status(200).json({
      message: 'Vote recorded successfully',
      idea: updatedIdea
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error voting for idea:', error);
    res.status(500).json({ message: 'Server error recording vote' });
  }
};

/**
 * Remove vote from an idea
 * @route DELETE /api/ideas/:id/vote
 */
export const removeVote = async (req: Request, res: Response) => {
  try {
    const { id: ideaId } = req.params;
    const userId = req.user.id;
    
    // Check if vote exists
    const vote = await Vote.findOne({
      where: { userid: userId, ideaid: ideaId }
    });
    
    if (!vote) {
      return res.status(404).json({ message: 'Vote not found' });
    }
    
    // Delete vote
    await vote.destroy();
    
    // Return the updated idea with vote count
    const updatedIdea = await Idea.findByPk(ideaId, {
      include: [
        {
          model: Vote,
          as: 'votes',
          attributes: [],
        }
      ],
      attributes: {
        include: [
          [sequelize.fn('COUNT', sequelize.col('votes.ideaid')), 'voteCount']
        ]
      },
      group: ['Idea.id', 'Idea.title', 'Idea.description', 'Idea.submittedby', 'Idea.documentUrl', 'Idea.status', 'Idea.createdAt', 'Idea.updatedAt']
    });
    
    res.status(200).json({
      message: 'Vote removed successfully',
      idea: updatedIdea
    });
  } catch (error) {
    console.error('Error removing vote:', error);
    res.status(500).json({ message: 'Server error removing vote' });
  }
};