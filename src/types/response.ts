export interface LinkRef{
    "href": string;
    "embeddable"?: boolean;
    "taxonomy"?: string;
    "templated"?: boolean;
    "name"?: string;
}
export interface LinkResponse{
    "self": LinkRef[];
    "collection": LinkRef[];
    "about": LinkRef[];
    "wp:post_type": LinkRef[];
    "curies": LinkRef[];
    "wp:attachment"?: LinkRef[];
    "wp:term"?: LinkRef[];
}

export interface CategoryResponse{
    "id": number;
    "count": number;
    "description": string;
    "link": string;
    "name": string
    "slug": string;
    "taxonomy": string;
    "parent": number;
    "meta": any[];
    "acf": any[],
    "_links": LinkResponse;
}

export interface QuestionField{
    "question": string;
    "answer": string;
}

export interface QuestionsResponse{
    "id": number;
    "date": Date;
    "date_gmt": Date;
    "guid": {
      "rendered": string;
    },
    "modified": Date;
    "modified_gmt": Date;
    "slug": string;
    "status": string;
    "type": string;
    "link": string;
    "author": number;
    "template": string;
    "categories": number[];
    "acf": QuestionField;
    "_links": LinkResponse;
}