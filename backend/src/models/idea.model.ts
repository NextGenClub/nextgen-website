export interface Idea {
    id: number;
    title: string;
    description: string;
    document?: Buffer | null;
    submittedBy: string | null; // User ID or null for unregistered users
}