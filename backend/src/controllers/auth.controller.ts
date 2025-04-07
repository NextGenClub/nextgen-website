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
    console.log('Full request body:', req.body);
    const { email, password, name, username } = req.body;
    console.log('Received registration request:', { email, name, username });

    // Validate required fields
    if (!email || !password || !name || !username) {
      console.log('Missing required fields:', {
        email: !email,
        password: !password,
        name: !name,
        username: !username
      });
      return res.status(400).json({ 
        message: 'All fields are required',
        missingFields: {
          email: !email,
          password: !password,
          name: !name,
          username: !username
        }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email);
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate username format
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      console.log('Invalid username format:', username);
      return res.status(400).json({ message: 'Username must be 3-20 characters long and can only contain letters, numbers, and underscores' });
    }

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        console.log('User already exists with email:', email);
        return res.status(400).json({ message: 'User already exists with this email' });
      }

      // Check if username is taken
      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) {
        console.log('Username already taken:', username);
        return res.status(400).json({ message: 'Username is already taken' });
      }

      // Create new user
      const newUser = await User.create({
        email,
        password,
        name,
        username,
        isAdmin: false,
        isApproved: false
      });
      console.log('User created successfully:', { id: newUser.id, email, username });

      // Generate token
      const token = generateToken(newUser.id);

      // Return user info (without password) and token
      res.status(201).json({
        message: 'User registered successfully. Awaiting approval.',
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          username: newUser.username,
          isAdmin: newUser.isAdmin,
          isApproved: newUser.isApproved
        },
        token
      });
    } catch (dbError: any) {
      console.error('Database error during registration:', dbError);
      return res.status(500).json({ 
        message: 'Database error during registration',
        error: dbError?.message || 'Unknown database error'
      });
    }
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Server error during registration',
      error: error?.message || 'Unknown error'
    });
  }
};

/**
 * Login user
 * @route POST /api/auth/login
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required',
        missingFields: {
          email: !email,
          password: !password
        }
      });
    }

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
        name: user.name,
        username: user.username,
        isAdmin: user.isAdmin,
        isApproved: user.isApproved
      },
      token
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Server error during login',
      error: error?.message || 'Unknown error'
    });
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
      name: user.name,
      username: user.username,
      isAdmin: user.isAdmin,
      isApproved: user.isApproved,
      createdAt: user.createdAt
    });
  } catch (error: any) {
    console.error('Profile error:', error);
    res.status(500).json({ 
      message: 'Server error fetching profile',
      error: error?.message || 'Unknown error'
    });
  }
};

/**
 * Admin: Approve a user
 * @route PUT /api/auth/approve/:id
 */
export const approveUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Check if the requesting user is an admin
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to approve users' });
    }
    
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
        name: user.name,
        username: user.username,
        isAdmin: user.isAdmin,
        isApproved: user.isApproved
      }
    });
  } catch (error: any) {
    console.error('User approval error:', error);
    res.status(500).json({ 
      message: 'Server error during user approval',
      error: error?.message || 'Unknown error'
    });
  }
};