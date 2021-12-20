import React, { useState } from 'react'
import {
    Link,
    withRouter,
} from "react-router-dom";
import {
    Form,
    Input,
    Layout,
    Button,
} from 'antd';
import axios from 'axios';
import Swal from 'sweetalert'
import LazyLoader from './LazyLoader';
const { Content } = Layout;

function ForgotPassword() {

    const [componentSize, setComponentSize] = useState('default');
    const [loading, setLoading] = useState(false);

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const validEmailRegex = RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

    const [ForgotPass, setForgotPass] = useState({
        email: '',
    })

    const [LoginError, setLoginError] = useState({
        email: '',
    });


    const onChangeForEmail = (e) => {
        setForgotPass({ ...ForgotPassword, [e.target.name]: e.target.value });
    }

    const onFormSubmit = (e) => {
        let validationok = onFormSubmitValidation();
        setLoading(true);
        if (validationok) {
            axios.post('http://localhost:3001/forgot-password',
                ForgotPass,
                { headers: { "Content-Type": "application/json" } }
                // axios.post('http://localhost:3001/forgot-password',
                //     ForgotPass
            ).then(response => {
                console.log('response from api ==> ', response.data);
                setLoading(false);
                if (response.data.status === true) {
                    Swal({
                        title: response.data.message,
                        // text: "You clicked the button!",
                        icon: "success",
                        button: "Ok !",
                    });
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
        } else {
            console.log('Enter Valid E-mail !!!');
        }
    }

    const onFormSubmitValidation = () => {
        let validemail = true;
        if (ForgotPass.email === '' || ForgotPass.email === undefined) {
            setLoginError((LoginError) => ({ ...LoginError, email: 'Email is required' }))
            validemail = false;
        } else if (!(validEmailRegex.test(ForgotPass.email))) {
            setLoginError((LoginError) => ({ ...LoginError, email: 'Email is not valid' }))
            validemail = false;
        } else {
            setLoginError((LoginError) => ({ ...LoginError, email: '' }))
            validemail = true;
        }

        if (validemail) {
            console.log('Validation ok');
            return true;
        } else {
            console.log('Validation wrong');
            return false;
        }
    }

    if(loading){
        return <LazyLoader/>
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
                    <div className="site-layout-content"><h1>Forgot Password :-</h1></div>
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
                                onChange={onChangeForEmail}
                            />
                            {LoginError.email && <span className='error'>{LoginError.email}</span>}
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 4, span: 16 }} >
                            <Button type="primary" onClick={onFormSubmit}>Click Here</Button>&nbsp;&nbsp;
                            <Link to='/' type="primary"> &#8592; Back to Login</Link>
                            {/* <Link to='/signup' type="primary">Click Here</Link> */}
                        </Form.Item>
                    </Form>
                </Content>
            </Layout>
        </>
    )
}

export default ForgotPassword;