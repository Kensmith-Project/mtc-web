import { Challenge } from "../Challenge";
import { SchoolLevel } from "../SchoolLevel";

export interface CreateQuestionRequest{
    question: string;
    answer : string;
    challenge: Challenge;
    level: SchoolLevel;
}