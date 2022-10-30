import React from 'react';
import { Route, RouteProps } from 'react-router';
import { Redirect } from 'react-router-dom';
import { useJwt } from 'react-jwt';
import { deleteToken, getToken } from '../../utils/tokenUtils';

export interface ProtectedRouteProps extends RouteProps{
    redirectPath?: string;
    privileges?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
    redirectPath = '/admin/login', privileges, ...props 
})=>{

    const token = getToken();
    let { isExpired } = useJwt(token || '');

    if (!token) {
        console.log("NO TOKEN!!!!")
        return <Redirect to={redirectPath} />
    }

    if (token) {
        // Check if token has expired, redirect to signin and remove the token
        if (isExpired) {
            deleteToken();
            return <Redirect to={redirectPath} />
        }
    }

    return(
        <Route {...props} />
    )
}

export default ProtectedRoute;