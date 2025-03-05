export interface Idea {
    id: number;
    title: string;
    description: string;
    document?: Blob | null;
    submittedBy: string | null; // user ID or null for unregistered users
    voteCount?: number; // optional, for displaying vote counts
}