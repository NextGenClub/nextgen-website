import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import Joi from 'joi';

export const validateIdeaSubmission = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('document').optional().custom((value, { req }) => {
        if (!req.file) return true;
        if (req.file.mimetype !== 'application/pdf') {
            throw new Error('File must be a PDF');
        }
        return true;
    }),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const validateTaskCreation = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').optional(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/**
 * Middleware to validate request data against a Joi schema
 * @param schema - Joi validation schema
 * @param property - Request property to validate (body, params, query)
 */
export const validate = (schema: Joi.ObjectSchema, property: 'body' | 'params' | 'query' = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property], { abortEarly: false });
    
    if (!error) {
      next();
    } else {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      res.status(400).json({
        message: 'Validation error',
        errors
      });
    }
  };
};