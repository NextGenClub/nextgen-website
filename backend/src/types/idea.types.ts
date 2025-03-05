export interface Idea {
    id: number;
    title: string;
    description: string;
    document?: Buffer | null; // Optional, sanitized before storage
    submittedBy: string | null; // User ID or null for unregistered users
    voteCount?: number; // Optional, to track the number of votes
}