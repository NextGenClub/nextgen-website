import { Request, Response } from 'express';
import { authenticateUser } from '../../src/services/auth.service';

describe('Authentication Tests', () => {
    it('should authenticate a user with valid credentials', async () => {
        const req = {
            body: {
                username: 'testuser',
                password: 'testpassword'
            }
        } as Request;

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        } as unknown as Response;

        await authenticateUser(req, res);

        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Authentication successful'
        }));
    });

    it('should return an error for invalid credentials', async () => {
        const req = {
            body: {
                username: 'wronguser',
                password: 'wrongpassword'
            }
        } as Request;

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        } as unknown as Response;

        await authenticateUser(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Authentication failed'
        }));
    });
});