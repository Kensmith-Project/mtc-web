import { AxiosError } from "axios";

export function parseValidationError(validationErrors?: Object) {
    let message = '';
    let count = 0;
    for (const key in validationErrors) {
        if (Object.prototype.hasOwnProperty.call(validationErrors, key)) {
            const errorMessage = validationErrors[key as keyof Object];
            
            if (count === Object.keys(validationErrors).length - 1) {
                message += ` ${errorMessage}`
            }
            else{
                message += ` ${errorMessage},`
            }

            count++;
        }
    }

    return message;
}

export function parseError(e: AxiosError<any>): string {
    let defaultMessage = e.message || "An unknown error occured";
    if (e.response) {
        if (e.response.data && e.response.data.message){
            return e.response.data.message
        }
        else{
            return defaultMessage
        }
    }

    return defaultMessage;
}