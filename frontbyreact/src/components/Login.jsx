import React, { useState } from 'react';
import '../App.css';
import axios from 'axios'
import Swal from 'sweetalert'
import {
    Link,
    withRouter,
} from "react-router-dom";
import {
    Form,
    Input,
    Button,
    // Radio,
    // Select,
    // Cascader,
    // DatePicker,
    // InputNumber,
    // TreeSelect,
    // Switch,
    Layout,
    // Space,
} from 'antd';
// import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { LoginAddId } from "./utils/Login_Not";

const { Content } = Layout;

function Login(props) {
    const { history } = props;
    const [componentSize, setComponentSize] = useState('default');

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    //  eslint-disable-next-line
    const validEmailRegex = RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

    const [Logindetails, setLogindetails] = useState({
        email: '',
        password: '',
        // tnccheckbox: false,
    })

    const [LoginError, setLoginError] = useState({
        email: '',
        password: '',
        // tnccheckbox: '',
    })

    const onChangeforall = (e) => {
        const { value } = e.target;
        const { name } = e.target;

        console.log('eeeeeee', name, ' and ', value);
        setLogindetails({ ...Logindetails, [name]: value });

    }

    const onFormSubmit = (e) => {
        let validationok = onFormSubmitValidation();
        if (validationok) {
            axios.post('http://localhost:3001/loginuser',
                Logindetails,
                { headers: { "Content-Type": "application/json" } }
            ).then(response => {
                // console.log('response from api ==> ',response);
                if (response.data.status === true) {
                    console.warn(response.data.userid);
                    // localStorage.setItem('user', JSON.stringify({userid:response.data.userid}));
                    let id = LoginAddId({userid:response.data.userid});
                    console.log('Set id in LS ==> ',id);
                    history.push(`/admin/userdetails`);
                } else {
                    Swal({
                        title: response.data.message,
                        // text: "You clicked the button!",
                        icon: "warning",
                        button: "Oops !",
                    });
                }
            }).catch((err) => {
                console.log('error in api calling', err);
            });
            console.log('Logged IN 🆗');
        } else {
            console.log('Not Logged IN 👎');
        }
    }

    const onFormSubmitValidation = () => {
        let validemail = true, validpassword = true;

        if (Logindetails.email === '' || Logindetails.email === undefined) {
            setLoginError((LoginError) => ({ ...LoginError, email: 'Email is required' }))
            validemail = false;
        } else if (!(validEmailRegex.test(Logindetails.email))) {
            setLoginError((LoginError) => ({ ...LoginError, email: 'Email is not valid' }))
            validemail = false;
        } else {
            setLoginError((LoginError) => ({ ...LoginError, email: '' }))
            validemail = true;
        }

        if (Logindetails.password === '' || Logindetails.password === undefined) {
            setLoginError((LoginError) => ({ ...LoginError, password: 'Password is required' }))
            validpassword = false;
        } else {
            setLoginError((LoginError) => ({ ...LoginError, password: '' }))
            validpassword = true;
        }


        if (validemail && validpassword) {
            console.log('Validation ok');
            console.log('LoginError  -------  ', LoginError);
            return true;
        } else {
            console.log('Validation wrong');
            console.log('LoginError  -------  ', LoginError);
            return false;
        }


    }

    return (
        <>
            <Layout className="layout">
                <Content style={{ padding: '0 50px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <div className="site-layout-content"><h1>Login :-</h1></div>
                    <Form
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                        layout="horizontal"
                        initialValues={{
                            size: componentSize,
                        }}
                        onValuesChange={onFormLayoutChange}
                        size={componentSize}
                    >


                        <Form.Item label="Email">
                            <Input
                                name='email'
                                placeholder="Enter email here"
                                onChange={onChangeforall}
                            />
                            {LoginError.email && <span className='error'>{LoginError.email}</span>}
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                        >
                            <Input.Password
                                name="password"
                                placeholder="Enter password here"
                                onChange={onChangeforall}
                            />
                            {LoginError.password && <span className='error'>{LoginError.password}</span>}
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                            <Button type="primary" onClick={onFormSubmit}>Login</Button>&nbsp;&nbsp;
                            <Link to='/forgotpassword' type="primary">Forgot password ?</Link>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 4, span: 16 }} >
                            Not an account ?&nbsp;&nbsp;
                            <Link to='/signup' type="primary">Create One</Link>
                        </Form.Item>
                    </Form>
                </Content>
            </Layout>
        </>
    )
}

export default withRouter(Login);