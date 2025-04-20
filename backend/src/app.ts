import express from 'express';
import cors from 'cors';
import passport from 'passport';
import authRoutes from './routes/auth.routes';
import oauthRoutes from './routes/oauth.routes';
import profileRoutes from './routes/profile.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Debug route
app.get('/api/debug', (req, res) => {
  res.json({
    message: 'Server is running',
    routes: [
      '/api/auth',
      '/api/oauth',
      '/api/profile'
    ],
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/oauth', oauthRoutes);
app.use('/api/profile', profileRoutes);

// Error handling
app.use(errorHandler);

export default app; 