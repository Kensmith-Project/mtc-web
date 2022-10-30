import axios, { AxiosResponse } from "axios";
import useSwr from "swr";
import { User } from "../types/User";

const baseUrl = process.env.BASE_URL || 'http://localhost:3007';

export const useProfile = (username?: string) =>{
    const fetcher = (url: string) => 
    axios.get(baseUrl + url).then((response: AxiosResponse<User>)=> response.data);
    
    const { data, error, mutate } = useSwr(`/api/v1/user/${username}`, fetcher);
    //console.log(data);
    return {
        user: data,
        isLoading: !error && !data,
        isError: error,
        mutate
    }
}