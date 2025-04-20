import axios, { AxiosError } from 'axios';

interface IdeaInput {
  title: string;
  description: string;
  submittedby: number | null;
  documentUrl?: string | null;
}

const API_BASE_URL = 'http://localhost:3001/api';

const testIdeas: IdeaInput[] = [
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

const submitIdea = async (idea: IdeaInput) => {
  const response = await axios.post(`${API_BASE_URL}/ideas`, idea);
  return response.data;
};

const loadTestData = async () => {
  console.log('Starting to load test data...');
  
  for (const idea of testIdeas) {
    try {
      const response = await submitIdea(idea);
      console.log(`Successfully submitted idea: ${idea.title}`);
      console.log('Response:', response);
    } catch (error) {
      console.error(`Failed to submit idea ${idea.title}:`, error);
      
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error('Response error:', {
            status: axiosError.response.status,
            data: axiosError.response.data,
            message: axiosError.message
          });
        }
      }
    }
  }
  
  console.log('Finished loading test data.');
};

// Run the script
loadTestData().catch(error => {
  console.error('Error in loadTestData:', error);
  process.exit(1);
}); 