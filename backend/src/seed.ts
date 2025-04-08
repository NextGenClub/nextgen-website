import seedDatabase from './seeders/seed';
import sequelize from './utils/database';

async function runSeed() {
  try {
    // Sync database models
    await sequelize.sync({ force: true });
    
    // Run seed script
    await seedDatabase();
    
    console.log('Database successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

runSeed(); 