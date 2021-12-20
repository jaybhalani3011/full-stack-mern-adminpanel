import React from 'react'
import {
    Route,
    Redirect,
    withRouter,
} from "react-router-dom";
import { isLogin } from '../utils/Login_Not';

function PrivateRoute({component : Component, ...rest}) {
    return (
        <Route {...rest} render={props => (
            isLogin() ? <Component {...props}/> :  <Redirect to='/'/>
        )} />            
    );
}

export default PrivateRoute;
