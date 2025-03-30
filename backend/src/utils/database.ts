import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import User from '../models/user.model';
import Idea from '../models/idea.model';
import Task from '../models/task.model';
import Vote from '../models/vote.model';
import Project from '../models/project.model';

// Initialize environment variables
dotenv.config();

// Create Sequelize instance
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'nextgen_website',
    logging: false, // Set to console.log to see SQL queries
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// Function to test database connection
const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        
        // In development, sync models with database
        // NOTE: In production, use migrations instead of sync
        if (process.env.NODE_ENV !== 'production') {
            await sequelize.sync();
            console.log('Database models synchronized.');
        }
        
        return sequelize;
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
};

export { sequelize, connectToDatabase };