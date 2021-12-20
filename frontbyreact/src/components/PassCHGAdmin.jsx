import React, { useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert'
// import {
//     Link,
//     // withRouter,
// } from "react-router-dom";
import {
    Form,
    Input,
    Layout,
    Button,
} from 'antd';
// import axios from 'axios';
// import Swal from 'sweetalert'
const { Content } = Layout;

function PassCHGAdmin(props) {

    const { history } = props;
    var { userid } = JSON.parse(localStorage.getItem('user'));


    const passwordRegex = RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ig);
    const [componentSize, setComponentSize] = useState('default');

    const [passwordManage, setPasswordManage] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const [errPasswordManage, setErrPasswordManage] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const onChangeForPassword = (e) => {
        const { value } = e.target;
        const { name } = e.target;
        setPasswordManage({ ...passwordManage, [name]: value });
    }

    console.log('passwordManage -=-=-> ', passwordManage);

    const onFormSubmit = () => {
        let validationok = onFormSubmitValidation();
        if (validationok) {
            passwordManage.userId = userid;
            axios.post('http://localhost:3001/reset-password-admin',
                passwordManage,
                { headers: { "Content-Type": "application/json" } },
            ).then(response => {
                console.log('response from api ==> ', response.data);
                if (response.data.status === true) {
                    Swal({
                        title: response.data.message,
                        // text: "You clicked the button!",
                        icon: "success",
                        button: "Ok !",
                    });
                    setPasswordManage({
                        currentPassword: '',
                        newPassword: '',
                        confirmNewPassword: '',
                    })
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
        let validcurrentpassword = true, validnewpassword = true, validconfirmnewPassword = true;

        if (passwordManage.currentPassword === '' || passwordManage.currentPassword === undefined) {
            setErrPasswordManage((errPasswordManage) => ({ ...errPasswordManage, currentPassword: 'Current Password is required' }))
            validcurrentpassword = false;
        } else {
            setErrPasswordManage((errPasswordManage) => ({ ...errPasswordManage, currentPassword: '' }))
            validcurrentpassword = true;
        }

        if (passwordManage.newPassword === '' || passwordManage.newPassword === undefined) {
            setErrPasswordManage((errPasswordManage) => ({ ...errPasswordManage, newPassword: 'New Password is required' }))
            validnewpassword = false;
        } else if (!(passwordRegex.test(passwordManage.newPassword))) {
            setErrPasswordManage((errPasswordManage) => ({ ...errPasswordManage, newPassword: 'New Password must be eight characters, at least one letter, one number and one special character' }))
            validnewpassword = false;
        } else {
            setErrPasswordManage((errPasswordManage) => ({ ...errPasswordManage, newPassword: '' }))
            validnewpassword = true;
        }

        if (passwordManage.confirmNewPassword === '' || passwordManage.confirmNewPassword === undefined) {
            setErrPasswordManage((errPasswordManage) => ({ ...errPasswordManage, confirmNewPassword: 'Confirm New Password is required' }))
            validconfirmnewPassword = false;
        } else if (passwordManage.newPassword !== passwordManage.confirmNewPassword) {
            setErrPasswordManage((errPasswordManage) => ({ ...errPasswordManage, confirmNewPassword: 'Confirm New Password must be same as New Password' }))
            validconfirmnewPassword = false;
        } else {
            setErrPasswordManage((errPasswordManage) => ({ ...errPasswordManage, confirmNewPassword: '' }))
            validconfirmnewPassword = true;
        }

        if (validcurrentpassword && validnewpassword && validconfirmnewPassword) {
            console.log('Validation ok');
            // console.log('Usererror  -------  ', UserError);
            return true;
        } else {
            console.log('Validation wrong');
            // console.log('Usererror  -------  ', UserError);
            return false;
        }
    }


    return (
        <>
            <Content style={{ margin: '24px 16px 0' }}>
                <div className="site-layout-background" style={{ backgroundColor: '#f0ffff', border: '2px solid green', padding: 24, minHeight: 360 }}>

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
                        <Form.Item label="Current Password">
                            <Input.Password
                                name='currentPassword'
                                placeholder="Enter password here"
                                onChange={onChangeForPassword}
                                value={passwordManage.currentPassword}
                            />
                            {errPasswordManage.currentPassword && <span className='error'>{errPasswordManage.currentPassword}</span>}
                        </Form.Item>
                        <Form.Item label="New Password">
                            <Input.Password
                                name='newPassword'
                                placeholder="Enter password here"
                                onChange={onChangeForPassword}
                                value={passwordManage.newPassword}
                            />
                            {errPasswordManage.newPassword && <span className='error'>{errPasswordManage.newPassword}</span>}
                        </Form.Item>
                        <Form.Item label="Confirm New Password">
                            <Input.Password
                                name='confirmNewPassword'
                                placeholder="Enter confirm password here"
                                onChange={onChangeForPassword}
                                value={passwordManage.confirmNewPassword}
                            />
                            {errPasswordManage.confirmNewPassword && <span className='error'>{errPasswordManage.confirmNewPassword}</span>}
                        </Form.Item>


                        <Form.Item wrapperCol={{ offset: 4, span: 16 }} >
                            <Button type="primary" onClick={onFormSubmit}>Change the Password</Button>
                            {/* &nbsp;&nbsp;
                        <Link to='/forgotpassword' type="primary"> &#8592; Back to Forgot Password</Link> */}
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </>
    )
}

export default PassCHGAdmin;
