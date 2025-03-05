export interface User {
    id: number;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    isAdmin?: boolean; // Optional field to indicate if the user is an admin
}