import React from 'react';
import { Route, RouteProps } from 'react-router';
import { Redirect } from 'react-router-dom';
import { getToken } from '../../utils/tokenUtils';

export interface ProtectedRouteProps extends RouteProps{
    redirectPath?: string
}

const ProtectedAuthRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = '/admin', ...props })=>{

    // First check if there is a token in local storage
    const token = getToken();
    if (token) {
        console.log("TOKEN FOUND!!!!")
        return <Redirect to={redirectPath} />
    }

    return(
        <Route {...props} />
    )
}

export default ProtectedAuthRoute;