import axios from 'axios';

interface Idea {
  id?: number;
  title: string;
  description: string;
  votes?: number;
  submittedBy?: string | null;
  createdAt?: Date;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Request:', {
      method: config.method,
      url: config.url,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response:', {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('Response error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

// Data transformation functions
const transformIdea = (idea: any) => ({
  id: idea.id,
  title: idea.title,
  description: idea.description,
  submittedBy: idea.submittedby,
  documentUrl: idea.documenturl,
  status: idea.status,
  createdAt: new Date(idea.createdat),
  updatedAt: new Date(idea.updatedat),
  voteCount: idea.votecount
});

const transformProject = (project: any) => ({
  id: project.id,
  name: project.name,
  description: project.description,
  managerId: project.managerid,
  ideaId: project.ideaid,
  createdAt: new Date(project.createdat),
  tasks: project.tasks?.map(transformTask) || []
});

const transformTask = (task: any) => ({
  id: task.id,
  title: task.title,
  description: task.description,
  isComplete: task.iscomplete,
  priority: task.priority,
  assignedTo: task.assignedto,
  projectId: task.projectid,
  dueDate: task.duedate ? new Date(task.duedate) : null,
  createdAt: new Date(task.createdat),
  project: task.project ? transformProject(task.project) : null
});

// Get ideas
export const getIdeas = async (): Promise<Idea[]> => {
  const response = await api.get('/api/ideas');
  return response.data;
};

// Submit an idea
export const submitIdea = async (idea: Idea): Promise<Idea> => {
  const response = await api.post('/api/ideas', idea);
  return response.data;
};

// Vote on an idea
export const voteOnIdea = async (ideaId: number): Promise<Idea> => {
  const response = await api.post(`/api/ideas/${ideaId}/vote`);
  return response.data;
};

// Get dashboard data
export const getDashboardData = async () => {
  try {
    const response = await api.get('/api/dashboard');
    const data = response.data;
    
    return {
      topIdea: data.topIdea ? transformIdea(data.topIdea) : null,
      activeProjects: data.activeProjects?.map(transformProject) || [],
      assignedTasks: data.assignedTasks?.map(transformTask) || []
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};