import axios, { AxiosError, AxiosResponse } from "axios";
import { LoginRequest } from "../types/requests/LoginRequest";
import { GeneralResponse } from "../types/responses/GeneralResponse";
import { LoginResponse } from "../types/responses/LoginResponse";

const baseUrl = process.env.BASE_URL || 'http://localhost:3007';
export function authenticateUser(username: string, password: string) {
    const apiUrl = `${baseUrl}/api/v1/auth/login`;
    let request: LoginRequest = { username, password };

    const willAuthenticateUser: Promise<GeneralResponse<LoginResponse>> = new Promise((resolve)=>{
        axios.post(apiUrl, request).then((response: AxiosResponse<LoginResponse>)=>{
            console.log(response.data);
            resolve({ data: response.data })
            
        }).catch((err: AxiosError<LoginResponse>)=>{
            console.log(JSON.stringify(err));
            resolve({ error: err })
        })
    })

    return willAuthenticateUser;
}