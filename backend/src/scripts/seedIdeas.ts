import sequelize from '../utils/database';
import { Idea } from '../models';
import '../models'; // Import models to initialize associations

interface TestIdea {
  title: string;
  description: string;
  submittedby: number | null;
  documentUrl?: string | null;
}

const testIdeas: TestIdea[] = [
  {
    title: "Community Garden Project",
    description: "Create a community garden in the downtown area to promote sustainable living and community engagement. The garden will include vegetable plots, flower beds, and educational workshops.",
    submittedby: null
  },
  {
    title: "Tech Education Hub",
    description: "Establish a technology education center offering free coding classes, workshops, and mentorship programs for underprivileged youth in our community.",
    submittedby: null
  },
  {
    title: "Recycling Initiative",
    description: "Launch a comprehensive recycling program with convenient drop-off points and educational campaigns to reduce waste and promote environmental awareness.",
    submittedby: null
  },
  {
    title: "Public Art Installation",
    description: "Commission local artists to create interactive public art installations that celebrate our city's cultural diversity and history.",
    submittedby: null
  },
  {
    title: "Youth Sports League",
    description: "Organize a free youth sports league focusing on team sports like soccer and basketball to promote physical activity and teamwork among children.",
    submittedby: null
  }
];

const seedIdeas = async () => {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log('Connected to database successfully.');

    // Sync models (in development only)
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync();
      console.log('Database models synchronized.');
    }

    // Delete existing ideas
    await Idea.destroy({ where: {} });
    console.log('Cleared existing ideas.');

    // Create new ideas
    const createdIdeas = await Promise.all(
      testIdeas.map(idea => Idea.create(idea))
    );
    
    console.log(`Successfully seeded ${createdIdeas.length} ideas:`);
    createdIdeas.forEach(idea => {
      console.log(`- ${idea.title}`);
    });

  } catch (error) {
    console.error('Error seeding database:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
  } finally {
    // Close database connection
    await sequelize.close();
  }
};

// Run the seeding
seedIdeas().catch(console.error); 