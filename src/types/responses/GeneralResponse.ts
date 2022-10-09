import { AxiosError } from 'axios';

export interface GeneralResponse<T, E = T>{
    data?: T;
    error?: AxiosError<E>;
}