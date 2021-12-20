import React from 'react'
import { LogoutRemoveId } from './utils/Login_Not';

import {
  Link,
  withRouter,
} from "react-router-dom";
import { Layout, Menu } from 'antd';
const { Header } = Layout;
class Menucomponent extends React.Component {

  shouldComponentUpdate(nextProps, nextState){
    console.log('nextProps - - -  ',nextProps ,' and nextState - - -   ',nextState);
    return true;
  } 

  render() {
    // let {history} = this.props;
    var userid  = JSON.parse(localStorage.getItem('user'));
    // console.log('pathname in Menu -->  ', userid);
    return (
      <>
        <Layout className="layout">
          {/* <div className="logo" /> */}
          <Header>

            <Menu mode="horizontal" theme='dark' style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
              <Menu.Item key="Home" style={{
                marginRight: 'auto',
                cursor: 'default',
              }}>
                {/* <Link to="/"> */}
                  <i className="fas fa-user-check"></i>&nbsp;&nbsp;Admin Pannel
                {/* </Link> */}
              </Menu.Item>

              {
                userid && <Menu.Item key="Logout">
                  <Link to="/" onClick={()=>{LogoutRemoveId()}}><i className="fas fa-sign-out-alt"></i>&nbsp;&nbsp;Logout</Link>
                </Menu.Item> 
              }
            </Menu>
          </Header>
        </Layout>
      </>
    );
  }
}

export default withRouter(Menucomponent);
