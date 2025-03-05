export interface Project {
    id: number;
    title: string;
    description?: string;
    status: 'active' | 'completed' | 'pending';
    createdAt: Date;
    updatedAt: Date;
    assignedTo?: number; // userId of the member responsible for the project
}