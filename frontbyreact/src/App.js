import React, { Suspense, lazy } from 'react'
import './App.css';
import Menucomponent from './components/Menu';
import Registration from './components/Registration';
import Login from './components/Login'
import AdminPanel from './components/AdminPanel';

import 'antd/dist/antd.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";  
import PrivateRoute from './components/Routes/PrivateRoute';
import PageNotFound from './components/PageNotFound';
import PublicRoute from './components/Routes/PublicRoute';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
// import FooterComponent from './components/Footer';
// import { ID_FOUND } from "./components/utils/Login_Not";

function App() {

    // console.log('ID_FOUND  -> ',ID_FOUND());

    return (
        // <div className="App">
        <>
            <Router>
                <Menucomponent/>
                <Switch>
                  {/* <Route exact path='/'>
                    <Login/>
                  </Route >
                  <Route path='/signup'>
                    <Registration/>
                  </Route> */}
                  <PublicRoute component={Login} exact path="/"/>
                  <PublicRoute component={Registration} exact path="/signup"/>
                  <PublicRoute component={ForgotPassword} exact path="/forgotpassword"/>
                  <PublicRoute component={ResetPassword} exact path="/resetpassword/:userfoundid/:token" />
                  {/* <Route exact path="/admin/userdetails/:userid?" >
                    <AdminPanel/>
                  </Route> */}
                  <PrivateRoute component={AdminPanel} exact path="/admin/userdetails/:userid?"/>
                  <PrivateRoute component={AdminPanel} exact path="/admin/allusers" />
                  <PrivateRoute component={AdminPanel} exact path="/admin/reset-password-admin" />
                  <Route component={PageNotFound}/>
                </Switch>
                {/* <FooterComponent/> */}
            </Router>
        </>
        // </div>
    );
}

export default App;
