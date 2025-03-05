import { Request, Response } from 'express';
import { authService } from '../services/auth.service';

// Handle user login
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await authService.login(email, password);
        if (user) {
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Handle user registration
export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const newUser = await authService.register(email, password);
        res.status(201).json({ message: 'User registered successfully', newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Handle user logout
export const logout = (req: Request, res: Response) => {
    // Logic for logging out the user (e.g., clearing session or token)
    res.status(200).json({ message: 'Logout successful' });
};