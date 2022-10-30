import { UserRole } from "./enums";

export interface User {
    id: number;
    username: string;
    fullName: string;
    role: UserRole;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}