import { Request, Response } from 'express';
import User from '../models/user.model';

// Get user's own profile
export const getProfile = async (req: Request, res: Response) => {
    try {
        // For development - return first user if not authenticated
        if (!req.user?.id) {
            const users = await User.findAll({
                attributes: { exclude: ['password'] },
                limit: 1
            });
            
            if (users.length > 0) {
                return res.json(users[0]);
            } else {
                return res.status(404).json({ message: 'No users found in database' });
            }
        }

        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ 
            message: 'Internal server error',
            error: error instanceof Error ? error.message : String(error)
        });
    }
};

// Update user's profile
export const updateProfile = async (req: Request, res: Response) => {
    try {
        // For development - update first user if not authenticated
        if (!req.user?.id) {
            const users = await User.findAll({
                limit: 1
            });
            
            if (users.length === 0) {
                return res.status(404).json({ message: 'No users found in database' });
            }
            
            const userId = users[0].id;
            const { name, bio, position, avatar, socialLinks, skills, showInTeam } = req.body;

            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update only the provided fields
            if (name !== undefined) user.name = name;
            if (bio !== undefined) user.bio = bio;
            if (position !== undefined) user.position = position;
            if (avatar !== undefined) user.avatar = avatar;
            if (socialLinks !== undefined) user.socialLinks = socialLinks;
            if (skills !== undefined) user.skills = skills;
            if (showInTeam !== undefined) user.showInTeam = showInTeam;

            await user.save();

            // Return updated user without password
            const updatedUser = await User.findByPk(userId, {
                attributes: { exclude: ['password'] }
            });

            return res.json(updatedUser);
        }

        const userId = req.user.id;
        const { name, bio, position, avatar, socialLinks, skills, showInTeam } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update only the provided fields
        if (name !== undefined) user.name = name;
        if (bio !== undefined) user.bio = bio;
        if (position !== undefined) user.position = position;
        if (avatar !== undefined) user.avatar = avatar;
        if (socialLinks !== undefined) user.socialLinks = socialLinks;
        if (skills !== undefined) user.skills = skills;
        if (showInTeam !== undefined) user.showInTeam = showInTeam;

        await user.save();

        // Return updated user without password
        const updatedUser = await User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });

        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ 
            message: 'Internal server error',
            error: error instanceof Error ? error.message : String(error)
        });
    }
};

// Get team members
export const getTeamMembers = async (req: Request, res: Response) => {
    try {
        const teamMembers = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['name', 'ASC']]
        });

        res.json(teamMembers);
    } catch (error) {
        console.error('Error fetching team members:', error);
        res.status(500).json({ 
            message: 'Internal server error',
            error: error instanceof Error ? error.message : String(error)
        });
    }
}; 