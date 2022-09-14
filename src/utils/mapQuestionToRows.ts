import { Question } from "../types/Question";

function mapQuestionToRows(questions: Question[]) {
    
    let rows = questions.map((item)=>({
        id: item.id, question: item.question,
        answer: item.answer, 
        category: item.category?.name
    }))

    return rows;
}

export default mapQuestionToRows;