import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { sequelize } from './models';

// Load environment variables
dotenv.config();

// Import routes
import apiRoutes from './routes';
import oauthRoutes from './routes/oauth.routes';

// Initialize Express app
const app = express();

// Apply middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Connect to database
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
    // Sync models with database in development
    if (process.env.NODE_ENV !== 'production') {
      return sequelize.sync();
    }
  })
  .then(() => {
    console.log('Database models synchronized.');
  })
  .catch((err: Error) => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  });

// API routes
app.use('/api', apiRoutes);
app.use('/api/oauth', oauthRoutes);

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

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;