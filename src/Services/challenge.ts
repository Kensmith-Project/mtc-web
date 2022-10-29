import axios, { AxiosResponse, AxiosError } from "axios";
import { Challenge } from "../types/Challenge";
import { GeneralResponse } from "../types/responses/GeneralResponse";
import { UploadQuestionResponse } from "../types/responses/UploadQuestionResponse";

const baseUrl = process.env.BASE_URL || 'http://localhost:3007';

export function addChallenge(challenge: Challenge) {
    const apiUrl = `${baseUrl}/api/v1/challenge`;


    const willAddChallenge: Promise<GeneralResponse<UploadQuestionResponse>> = new Promise((resolve)=>{
        axios.post(apiUrl, challenge).then((response: AxiosResponse<UploadQuestionResponse>)=>{
            console.log(response.data);
            resolve({ data: response.data })
            
        }).catch((err: AxiosError<UploadQuestionResponse>)=>{
            console.log(JSON.stringify(err));
            resolve({ error: err })
        })
    })

    return willAddChallenge;
}