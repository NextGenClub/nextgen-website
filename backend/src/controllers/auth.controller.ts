import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import { generateToken } from '../utils/jwt.utils';

/**
 * Register a new user
 * @route POST /api/auth/register
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user
    const newUser = await User.create({
      email,
      password,
      isAdmin: false,
      isApproved: false
    });

    // Generate token
    const token = generateToken(newUser.id);

    // Return user info (without password) and token
    res.status(201).json({
      message: 'User registered successfully. Awaiting approval.',
      user: {
        id: newUser.id,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        isApproved: newUser.isApproved
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

/**
 * Login user
 * @route POST /api/auth/login
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Validate password
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user.id);

    // Return user info and token
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
        isApproved: user.isApproved
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

/**
 * Get current user profile
 * @route GET /api/auth/profile
 */
export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    // Return user info without sensitive data
    res.status(200).json({
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      isApproved: user.isApproved,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
};

/**
 * Admin: Approve a user
 * @route PUT /api/auth/approve/:id
 */
export const approveUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Find the user
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update approval status
    user.isApproved = true;
    await user.save();
    
    res.status(200).json({ 
      message: 'User approved successfully',
      user: {
        id: user.id,
        email: user.email,
        isApproved: user.isApproved
      }
    });
  } catch (error) {
    console.error('User approval error:', error);
    res.status(500).json({ message: 'Server error during user approval' });
  }
};