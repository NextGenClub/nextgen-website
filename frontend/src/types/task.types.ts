export interface Task {
    id: number;
    title: string;
    description?: string;
    isComplete: boolean;
    assignedTo?: number; // userId referencing the internal member responsible
    projectId?: number; // references the project this task belongs to
}