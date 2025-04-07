import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

// Import database connection
import { connectToDatabase } from './utils/database';

// Import models to initialize associations
import './models/index';

// Import routes
import authRoutes from './routes/auth.routes';
import dashboardRoutes from './routes/dashboard.routes';
import ideasRoutes from './routes/ideas.routes';
import tasksRoutes from './routes/tasks.routes';
import oauthRoutes from './routes/oauth.routes';

// Initialize Express app
const app = express();

// Apply middleware
app.use(cors());
app.use(json());

// Connect to database
connectToDatabase().catch(err => {
  console.error('Failed to connect to database:', err);
  process.exit(1);
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/oauth', oauthRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/ideas', ideasRoutes);
app.use('/api/tasks', tasksRoutes);

// Serve static files if in production
if (process.env.NODE_ENV === 'production') {
  // Serve frontend build
  app.use(express.static(path.join(__dirname, '../../frontend/build')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
  });
}

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;