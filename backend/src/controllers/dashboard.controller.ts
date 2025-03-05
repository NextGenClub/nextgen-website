import { Request, Response } from 'express';
import { getTopRankedIdeas, getActiveProjects, getAssignedTasks } from '../services/dashboard.service';

export const getDashboardData = async (req: Request, res: Response) => {
    try {
        const topRankedIdeas = await getTopRankedIdeas();
        const activeProjects = await getActiveProjects();
        const assignedTasks = await getAssignedTasks(req.user.id); // Assuming req.user contains the authenticated user's info

        res.status(200).json({
            topRankedIdeas,
            activeProjects,
            assignedTasks,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving dashboard data', error });
    }
};