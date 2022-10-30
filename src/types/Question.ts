import { Challenge } from "./Challenge";
import { SchoolLevel } from "./SchoolLevel";

export interface Question {
    id?: number;
    question: string;
    answer : string;
    level?: SchoolLevel;
    category?: Challenge;
    createdAt?: string;
    updatedAt?: string;
}