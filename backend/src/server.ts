import express from 'express';
import { json } from 'body-parser';
import { connectToDatabase } from './utils/database';
import { authRoutes } from './routes/auth.routes';
import { dashboardRoutes } from './routes/dashboard.routes';
import { ideasRoutes } from './routes/ideas.routes';
import { tasksRoutes } from './routes/tasks.routes';
import { usersRoutes } from './routes/users.routes';
import { config } from './config';

const app = express();

// Middleware
app.use(json());

// Database connection
connectToDatabase();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/ideas', ideasRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/users', usersRoutes);

// Start the server
const PORT = config.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});