import { createConnection } from 'typeorm';
import { User } from '../models/user.model';
import { Idea } from '../models/idea.model';
import { Task } from '../models/task.model';
import { Vote } from '../models/vote.model';
import { Project } from '../models/project.model';

const connectDatabase = async () => {
    try {
        const connection = await createConnection({
            type: 'mysql', // or 'postgres'
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '3306'),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            entities: [User, Idea, Task, Vote, Project],
            synchronize: true, // Set to false in production
        });
        console.log('Database connection established successfully.');
        return connection;
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
};

export default connectDatabase;