import React, { useState, useEffect } from 'react'
import {
    Link,
    // withRouter,
} from "react-router-dom";
import {
    Form,
    Input,
    Layout,
    Button,
} from 'antd';
import axios from 'axios';
import Swal from 'sweetalert'
const { Content } = Layout;

function ResetPassword(props) {
    const {history} = props;

    const passwordRegex = RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ig);
    const [componentSize, setComponentSize] = useState('default');

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const [ResetPasswordState, setResetPasswordState] = useState({
        password: '',
        confirmpassword: '',
    })

    const [ResetPasswordErr, setResetPasswordErr] = useState({
        password: '',
        confirmpassword: '',
    })


    const [UserId_Token, setUserId_Token] = useState({
        userId: '',
        token: '',
    })

    useEffect(() => {
        setUserId_Token({ userId: props.match.params.userfoundid, token: props.match.params.token })
        // let {userfoundid} = props.match.params;
        // console.log("id   -->  ",userfoundid,'  and  ',token);

    }, [props.match.params.userfoundid,props.match.params.token])

    const onChangeForPassword = (e) => {
        setResetPasswordState({ ...ResetPasswordState, [e.target.name]: e.target.value });
    }

    const onFormSubmit = (e) => {
        let validationok = onFormSubmitValidation();
        if (validationok) {
            axios.post('http://localhost:3001/reset-password/:userId/:token',
                ResetPasswordState,
                { headers: { "Content-Type": "application/json" }, params: UserId_Token  },
            ).then(response => {
                console.log('response from api ==> ', response.data);
                if (response.data.status === true) {
                    Swal({
                        title: response.data.message,
                        // text: "You clicked the button!",
                        icon: "success",
                        button: "Ok !",
                    });
                    history.push('/');
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
        let validpassword = true, validconfirmpassword = true;
        if (ResetPasswordState.password === '' || ResetPasswordState.password === undefined) {
            setResetPasswordErr((ResetPasswordErr) => ({ ...ResetPasswordErr, password: 'Password is required' }));
            validpassword = false;
        } else if (!(passwordRegex.test(ResetPasswordState.password))) {
            setResetPasswordErr((ResetPasswordErr) => ({ ...ResetPasswordErr, password: 'Password must be eight characters, at least one letter, one number and one special character' }));
            validpassword = false;
        } else {
            setResetPasswordErr((ResetPasswordErr) => ({ ...ResetPasswordErr, password: '' }));
            validpassword = true;
        }

        if (ResetPasswordState.confirmpassword === '' || ResetPasswordState.confirmpassword === undefined) {
            setResetPasswordErr((ResetPasswordErr) => ({ ...ResetPasswordErr, confirmpassword: 'Confirm Password is required' }));
            validconfirmpassword = false;
        } else if (ResetPasswordState.confirmpassword !== ResetPasswordState.password) {
            setResetPasswordErr((ResetPasswordErr) => ({ ...ResetPasswordErr, confirmpassword: 'Confirmpassword must be same as Password' }));
            validconfirmpassword = false;
        } else {
            setResetPasswordErr((ResetPasswordErr) => ({ ...ResetPasswordErr, confirmpassword: '' }));
            validconfirmpassword = true;
        }

        if (validpassword && validconfirmpassword) {
            console.log('Validation ok');
            return true;
        } else {
            console.log('Validation wrong');
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
                    <div className="site-layout-content"><h1>Reset Password :-</h1></div>
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
                        <Form.Item label="Password">
                            <Input
                                name='password'
                                placeholder="Enter password here"
                                onChange={onChangeForPassword}
                            />
                            {ResetPasswordErr.password && <span className='error'>{ResetPasswordErr.password}</span>}
                        </Form.Item>
                        <Form.Item label="Confirm Password">
                            <Input
                                name='confirmpassword'
                                placeholder="Enter confirm password here"
                                onChange={onChangeForPassword}
                            />
                            {ResetPasswordErr.confirmpassword && <span className='error'>{ResetPasswordErr.confirmpassword}</span>}
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 4, span: 16 }} >
                            <Button type="primary" onClick={onFormSubmit}>Click Here</Button>&nbsp;&nbsp;
                            <Link to='/forgotpassword' type="primary"> &#8592; Back to Forgot Password</Link>    
                        </Form.Item>
                    </Form>
                </Content>
            </Layout>
        </>
    )
}

export default ResetPassword;