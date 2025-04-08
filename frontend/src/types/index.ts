export interface Idea {
  id: number;
  title: string;
  description: string;
  submittedBy: number | null;
  documentUrl: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  voteCount?: number;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  managerId: number | null;
  ideaId: number | null;
  createdAt: Date;
  tasks?: Task[];
}

export interface Task {
  id: number;
  title: string;
  description: string | null;
  isComplete: boolean;
  priority: 'low' | 'medium' | 'high';
  assignedTo: number | null;
  projectId: number | null;
  dueDate: Date | null;
  createdAt: Date;
  project?: Project;
}

export interface User {
  id: number;
  email: string;
  username: string;
  role: 'user' | 'admin' | 'manager';
  createdAt: Date;
  updatedAt: Date;
} 