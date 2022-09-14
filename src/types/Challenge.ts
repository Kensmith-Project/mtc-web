import { Question } from "./Question";
import { SchoolLevel } from "./SchoolLevel";

export interface Rule {
    id?: number;
    maxSkip: number;
    maxTime: number;
    plusPoints: number;
    minusPoints: number;
    roundName: string;
    createdAt: string;
    updatedAt: string;
}

export interface Challenge {
    id?: number;
    name: string;
    description: string;
    level: SchoolLevel;
    questions?: Question[];
    rule: Rule;
    createdAt: string;
    updatedAt: string;
}