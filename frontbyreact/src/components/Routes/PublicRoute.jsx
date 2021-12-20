import React from 'react'
import {
    Route,
    Redirect,
    withRouter,
} from "react-router-dom";
import { isLogin } from '../utils/Login_Not';

function PublicRoute({ component: Component, restricted, ...rest }) {
    return (
        <Route {...rest} render={props => (
            isLogin() ?
                <Redirect to="/admin/userdetails" />
            : <Component {...props} />
        )}/>
    )
}

export default PublicRoute
