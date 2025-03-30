import Joi from 'joi';

// User registration validation schema
export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is required',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'string.empty': 'Password is required',
    'any.required': 'Password is required'
  })
});

// User login validation schema
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is required',
    'any.required': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
    'any.required': 'Password is required'
  })
});

// Idea submission validation schema
export const ideaSchema = Joi.object({
  title: Joi.string().required().max(100).messages({
    'string.empty': 'Title is required',
    'string.max': 'Title cannot exceed 100 characters',
    'any.required': 'Title is required'
  }),
  description: Joi.string().required().min(10).max(2000).messages({
    'string.empty': 'Description is required',
    'string.min': 'Description must be at least 10 characters',
    'string.max': 'Description cannot exceed 2000 characters',
    'any.required': 'Description is required'
  })
});

// Task creation validation schema
export const taskSchema = Joi.object({
  title: Joi.string().required().max(100).messages({
    'string.empty': 'Title is required',
    'string.max': 'Title cannot exceed 100 characters',
    'any.required': 'Title is required'
  }),
  description: Joi.string().allow('').max(2000).messages({
    'string.max': 'Description cannot exceed 2000 characters'
  }),
  priority: Joi.string().valid('low', 'medium', 'high').messages({
    'any.only': 'Priority must be low, medium, or high'
  }),
  assignedTo: Joi.string().allow(null),
  projectId: Joi.string().allow(null),
  dueDate: Joi.date().allow(null).greater('now').messages({
    'date.greater': 'Due date must be in the future'
  })
});

// Project creation validation schema
export const projectSchema = Joi.object({
  name: Joi.string().required().max(100).messages({
    'string.empty': 'Project name is required',
    'string.max': 'Project name cannot exceed 100 characters',
    'any.required': 'Project name is required'
  }),
  description: Joi.string().required().min(10).max(2000).messages({
    'string.empty': 'Description is required',
    'string.min': 'Description must be at least 10 characters',
    'string.max': 'Description cannot exceed 2000 characters',
    'any.required': 'Description is required'
  }),
  managerId: Joi.string().allow(null),
  ideaId: Joi.string().allow(null),
  startDate: Joi.date().allow(null),
  endDate: Joi.date().allow(null).min(Joi.ref('startDate')).messages({
    'date.min': 'End date must be after start date'
  })
});

export const validateIdeaSubmission = (data: {
  title?: string;
  description?: string;
  document?: { name: string };
}) => {
    const errors: Record<string, string> = {};
    
    if (!data.title || data.title.trim() === '') {
        errors.title = 'Title is required';
    }

    if (!data.description || data.description.trim() === '') {
        errors.description = 'Description is required';
    }

    if (data.document && !data.document.name.endsWith('.pdf')) {
        errors.document = 'Only PDF files are allowed';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

export const validateVote = (userId: string, ideaId: string) => {
    const errors: Record<string, string> = {};

    if (!userId) {
        errors.userId = 'User must be authenticated to vote';
    }

    if (!ideaId) {
        errors.ideaId = 'Idea ID is required to vote';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};