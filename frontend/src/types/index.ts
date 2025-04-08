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
  username: string;
  email: string;
  name: string;
  role: string;
  bio: string | null;
  position: string | null;
  avatar: string | null;
  socialLinks: Record<string, string>;
  skills: string[];
  showInTeam: boolean;
  createdAt: Date;
  updatedAt: Date;
} 