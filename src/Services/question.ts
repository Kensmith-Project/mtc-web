import Axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios';
import useSwr from 'swr';
import { Challenge } from '../types/Challenge';
import { Question } from '../types/Question';
import { CategoryResponse, QuestionsResponse } from '../types/response';
import { SchoolLevel } from '../types/SchoolLevel';

//const baseUrl = 'https://mtcgameshow.com/wp-json/wp/v2';
const baseUrl = 'http://localhost:3007';

export const useQuestions = (level?: SchoolLevel) =>{
    const fetcher = (url: string) => 
    Axios.get(baseUrl + url).then((response: AxiosResponse<Question[]>)=> response.data);
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
    Axios.get(baseUrl + url).then((response: AxiosResponse<Challenge[]>)=> response.data);
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
    Axios.get(baseUrl + url).then((response: AxiosResponse<Challenge>)=> response.data);
    const { data, error, mutate } = useSwr(`/categories/${id}`, fetcher);
    console.log(data);
    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
        mutate
    }
}