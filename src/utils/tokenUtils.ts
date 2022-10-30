import { StorageKey } from "../types/enums";

export function storeToken(token: string) {
    localStorage.setItem(StorageKey.TOKEN, token);
}

export function getToken() {
    return localStorage.getItem(StorageKey.TOKEN) || undefined;
}

export function deleteToken() {
    localStorage.removeItem(StorageKey.TOKEN);
}