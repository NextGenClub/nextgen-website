import express from 'express';
import cors from 'cors';
import User from './models/user.model';
import sequelize from './utils/database';

const app = express();
app.use(cors());
app.use(express.json());

// Test route that doesn't require authentication
app.get('/api/profile/test', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      limit: 5
    });
    
    res.json({
      message: 'Profile test route working',
      users
    });
  } catch (error) {
    console.error('Error in test route:', error);
    res.status(500).json({ 
      message: 'Error in test route',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Team members route without auth
app.get('/api/profile/team-test', async (req, res) => {
  try {
    const teamMembers = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']]
    });

    res.json(teamMembers);
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});

// Function to connect to the database
async function testDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
    
    // Test a simple query
    const userCount = await User.count();
    console.log(`User count: ${userCount}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testDatabase(); 