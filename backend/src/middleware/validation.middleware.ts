import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateIdeaSubmission = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('document').optional().isPDF().withMessage('File must be a PDF'),
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