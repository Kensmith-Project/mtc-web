import Axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios';
import useSwr from 'swr';
import { CategoryResponse, QuestionsResponse } from '../types/response';

const baseUrl = 'https://mtcgameshow.com/wp-json/wp/v2';
//const baseUrl = 'http://localhost:3007';

export const useQuestions = () =>{
    const fetcher = (url: string) => 
    Axios.get(baseUrl + url).then((response: AxiosResponse<QuestionsResponse[]>)=> response.data);
    const { data, error, mutate } = useSwr(`/mtc_question`, fetcher);
    console.log(data);
    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
        mutate
    }
}

export const useCategories = () =>{
    const fetcher = (url: string) => 
    Axios.get(baseUrl + url).then((response: AxiosResponse<CategoryResponse[]>)=> response.data);
    const { data, error, mutate } = useSwr(`/categories`, fetcher);
    console.log(data);
    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
        mutate
    }
}

export const useCategory = (id: number) =>{
    const fetcher = (url: string) => 
    Axios.get(baseUrl + url).then((response: AxiosResponse<CategoryResponse>)=> response.data);
    const { data, error, mutate } = useSwr(`/categories/${id}`, fetcher);
    console.log(data);
    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
        mutate
    }
}