import { api } from './api';

export interface Task {
  id: string;
  title: string;
  description?: string;
  isComplete: boolean;
  assignedTo?: string | null;
  projectId?: string | null;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string | null;
}

export interface TaskCreateData {
  title: string;
  description?: string;
  assignedTo?: string | null;
  projectId?: string | null;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string | null;
}

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get('/api/tasks');
  return response.data.tasks;
};

export const getTaskById = async (id: string): Promise<Task> => {
  const response = await api.get(`/api/tasks/${id}`);
  return response.data;
};

export const createTask = async (taskData: TaskCreateData): Promise<Task> => {
  const response = await api.post('/api/tasks', taskData);
  return response.data.task;
};

export const updateTask = async (id: string, taskData: Partial<TaskCreateData>): Promise<Task> => {
  const response = await api.put(`/api/tasks/${id}`, taskData);
  return response.data.task;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/api/tasks/${id}`);
};

export const toggleTaskCompletion = async (id: string, isComplete: boolean): Promise<Task> => {
  const response = await api.put(`/api/tasks/${id}`, { isComplete });
  return response.data.task;
}; 