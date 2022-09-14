import { Challenge } from "../types/Challenge";

export function mapCategoriesToRows(category: Challenge[]) {
    
    let rows = category.map((item)=>({
        id: item.id, description: item.description,
        name: item.name, 
    }))

    return rows;
}