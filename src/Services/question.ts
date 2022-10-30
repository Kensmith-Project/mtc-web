import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios';
import useSwr from 'swr';
import { Challenge } from '../types/Challenge';
import { Question } from '../types/Question';
import { UploadQuestionRequest } from '../types/requests/UploadQuestionRequest';
import { GeneralResponse } from '../types/responses/GeneralResponse';
import { UploadQuestionResponse } from '../types/responses/UploadQuestionResponse';
import { SchoolLevel } from '../types/SchoolLevel';

//const baseUrl = 'https://mtcgameshow.com/wp-json/wp/v2';
const baseUrl = process.env.BASE_URL || 'http://localhost:3007';

export const useQuestions = (level?: SchoolLevel) =>{
    const fetcher = (url: string) => 
    axios.get(baseUrl + url).then((response: AxiosResponse<Question[]>)=> response.data);
    let param = level ? `/${level}` : ''
    const { data, error, mutate } = useSwr(`/api/v1/question${param}`, fetcher);
    //console.log(data);
    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
        mutate
    }
}

export const useCategories = (level?: SchoolLevel) =>{
    const fetcher = (url: string) => 
    axios.get(baseUrl + url).then((response: AxiosResponse<Challenge[]>)=> response.data);
    let param = level ? `/${level}` : ''
    const { data, error, mutate } = useSwr(`/api/v1/challenge${param}`, fetcher);
    //console.log(data);
    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
        mutate
    }
}

export const useCategory = (id: number) =>{
    const fetcher = (url: string) => 
    axios.get(baseUrl + url).then((response: AxiosResponse<Challenge>)=> response.data);
    const { data, error, mutate } = useSwr(`/categories/${id}`, fetcher);
    console.log(data);
    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
        mutate
    }
}

export function uploadQuestions(request: UploadQuestionRequest, file?: File) {
    const apiUrl = `${baseUrl}/api/v1/question/upload`;

    const requestConfig: AxiosRequestHeaders = {
        'Content-Type': 'multipart/form-data'
    }
    
    let fdata = new FormData();
    fdata.append('file', file || '');
    fdata.append('level', request.level);

    const willUploadQuestions: Promise<GeneralResponse<UploadQuestionResponse>> = new Promise((resolve)=>{
        axios.post(apiUrl, fdata, requestConfig).then((response: AxiosResponse<UploadQuestionResponse>)=>{
            console.log(response.data);
            resolve({ data: response.data })
            
        }).catch((err: AxiosError<UploadQuestionResponse>)=>{
            console.log(JSON.stringify(err));
            resolve({ error: err })
        })
    })

    return willUploadQuestions;
}

export function deleteQuestions(ids: number[]) {
    const apiUrl = `${baseUrl}/api/v1/question/delete`;

    let payload = { ids };

    const willDeleteQuestions: Promise<GeneralResponse<UploadQuestionResponse>> = new Promise((resolve)=>{
        axios.post(apiUrl, payload).then((response: AxiosResponse<UploadQuestionResponse>)=>{
            console.log(response.data);
            resolve({ data: response.data })
            
        }).catch((err: AxiosError<UploadQuestionResponse>)=>{
            console.log(JSON.stringify(err));
            resolve({ error: err })
        })
    })

    return willDeleteQuestions;
}

export function updateQuestion(request: Question) {
    const apiUrl = `${baseUrl}/api/v1/question`;

    const willUpdateQuestion: Promise<GeneralResponse<UploadQuestionResponse>> = new Promise((resolve)=>{
        axios.put(apiUrl, request).then((response: AxiosResponse<UploadQuestionResponse>)=>{
            console.log(response.data);
            resolve({ data: response.data })
            
        }).catch((err: AxiosError<UploadQuestionResponse>)=>{
            console.log(JSON.stringify(err));
            resolve({ error: err })
        })
    })

    return willUpdateQuestion;
}