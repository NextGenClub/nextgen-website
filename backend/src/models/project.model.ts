export interface Project {
    id: number;
    title: string;
    description?: string;
    status: 'active' | 'completed' | 'on-hold';
    createdAt: Date;
    updatedAt: Date;
    assignedTo?: number; // userId of the member responsible for the project
}