import React, { useState, useEffect, Suspense } from 'react'
import axios from 'axios';
// import LoggedInDetails from './LoggedInDetails';
// Lazy Loader
import LazyLoader from './LazyLoader';
import FootComponent from './Footer';
import PassCHGAdmin from './PassCHGAdmin';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    withRouter,
} from "react-router-dom";
import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import {Usericon,Passwordicon} from './Usericon';
const { SubMenu } = Menu;
const { Header, Footer, Content, Sider } = Layout;

// Lazy Component
const LoggedInDetails = React.lazy(() => import('./LoggedInDetails'));
const AllUser = React.lazy(() => import('./AllUser'));


function AdminPanel(props) {
    var { userid } = JSON.parse(localStorage.getItem('user'));

    const [Admin, setAdmin] = useState(false);
    useEffect(() => {
        // effect
        userid && axios.get('http://localhost:3001/logged-in-user-data',
            { params: { userid } }
        ).then(response => {
            let apiresp = response.data.loggedinuser;
            setAdmin(apiresp.admin);
            console.log('admin value -> ', Admin);
        }).catch((err) => {
            console.log('error in api calling', err);
        });
    }, [])


    return (
        <>
            <Router>
                <Layout style={{ minHeight: "89.5vh" }} >
                    <Sider width={200} className="site-layout-background">

                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.Item key="1" icon={<UserOutlined />}>
                                <Link to="/admin/userdetails">
                                    User Details
                                </Link>
                            </Menu.Item>

                            {console.log('admin   ', Admin)}

                            {Admin && <Menu.Item key="2" icon={<Usericon />}>
                                <Link to="/admin/allusers">
                                    All Users
                                </Link>
                            </Menu.Item>}

                            <Menu.Item key="3" icon={<Passwordicon />}>
                                <Link to="/admin/reset-password-admin">
                                    Reset password
                                </Link>
                            </Menu.Item>
                            {/* <Menu.Item key="3" icon={<UserOutlined />}>User Details</Menu.Item>
                        <Menu.Item key="4" icon={<UserOutlined />}>User Details</Menu.Item> */}

                            {/* <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                            <Menu.Item key="9">option9</Menu.Item>
                            <Menu.Item key="10">option10</Menu.Item>
                            <Menu.Item key="11">option11</Menu.Item>
                            <Menu.Item key="12">option12</Menu.Item>
                        </SubMenu> */}
                        </Menu>

                    </Sider>
                    <Layout>
                        <Switch>
                            {/* <Header className="site-layout-sub-header-background" style={{ padding: 0 }} /> */}
                            <Suspense fallback={<LazyLoader />}>
                                <Route path='/admin/userdetails'>
                                    <LoggedInDetails userid={userid} />
                                </Route>

                                {Admin && <Route path='/admin/allusers'>
                                    {/* <Suspense fallback={<LazyLoader />}> */}
                                    <AllUser />
                                    {/* </Suspense> */}
                                </Route>}

                                <Route path='/admin/reset-password-admin'>
                                    <PassCHGAdmin userid={userid} />
                                </Route>
                            </Suspense>
                        </Switch>
                        <FootComponent />
                        {/* <Footer style={{ backgroundColor: '#3498f5', textAlign: 'center' }}>Admin Panel ©2021 Created by Jay Patel</Footer> */}
                    </Layout>
                </Layout>
            </Router>
        </>
    )
}

export default withRouter(AdminPanel);