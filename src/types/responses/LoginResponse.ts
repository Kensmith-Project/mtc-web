export interface LoginResponse{
    id?: number;
    username?: string;
    access_token?: string;
    refresh_token?: string;
    message?: string;
    status?: boolean;
}