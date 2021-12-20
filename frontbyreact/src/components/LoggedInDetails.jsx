import React, { useState, useEffect } from 'react'
import '../App.css';
import axios from 'axios';
import Swal from 'sweetalert'
import {
    Link,
    withRouter,
} from "react-router-dom";
import {
    Form,
    Input,
    Button,
    Checkbox,
    Layout,
} from 'antd';
import LazyLoader from './LazyLoader';
const { Header, Content } = Layout;

function LoggedInDetails(props) {

    const [componentSize, setComponentSize] = useState('default');
    const [loading, setLoading] = useState(true);

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    //  eslint-disable-next-line
    const validEmailRegex = RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    //  eslint-disable-next-line
    const mobRegex = RegExp(/^[0-9]{10}$/g);
    //  eslint-disable-next-line
    const passwordRegex = RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ig);

    const [loggedInUser, setLoggedInUser] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        password: '',
    });

    const [UserError, setUserError] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        // effect
        axios.get('http://localhost:3001/logged-in-user-data',
        { params: { userid: props.userid } }
        ).then(response => {
            console.log('response from api ==> ', response.data.loggedinuser);
            let apiresp = response.data.loggedinuser;
            setLoading(false);
            setLoggedInUser({
                firstname: apiresp.firstname,
                lastname: apiresp.lastname,
                phone: apiresp.phone,
                email: apiresp.email,
                password: apiresp.password,
            });
        }).catch((err) => {
            console.log('error in api calling', err);
        });
    }, [])

    const onChangeforall = (e) => {
        const { value } = e.target;
        const { name } = e.target;

        setLoggedInUser({ ...loggedInUser, [name]: value });
    }

    const onFormSubmitForEdit = () => {
        let validationok = onFormSubmitValidation();
        if (validationok) {
            loggedInUser.id = props.userid;
            axios.post('http://localhost:3001/adddata',
                loggedInUser,
                { headers: { "Content-Type": "application/json" } }
            ).then(response => {
                // console.log('response from api ==> ',response);
                if (response.data.status === true) {
                    Swal({
                        title: response.data.message,
                        // text: "You clicked the button!",
                        icon: "success",
                        button: "Ok!",
                    });
                    // history.push('/');
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
            console.log('LoggedIn user Updated 🆗');
        } else {
            console.log('LoggedIn user Not Updated 👎');
        }
    }

    const onFormSubmitValidation = () => {
        let validfname = true, validlname = true, validemail = true, validphone = true, validpassword = true;

        if (loggedInUser.firstname === '' || loggedInUser.firstname === undefined) {
            setUserError((UserError) => ({ ...UserError, firstname: 'First Name is required' }))
            validfname = false;
        } else {
            setUserError((UserError) => ({ ...UserError, firstname: '' }))
            validfname = true;
        }

        if (loggedInUser.lastname === '' || loggedInUser.lastname === undefined) {
            setUserError((UserError) => ({ ...UserError, lastname: 'Last Name is required' }))
            validlname = false;
        } else {
            setUserError((UserError) => ({ ...UserError, lastname: '' }))
            validlname = true;
        }

        if (loggedInUser.phone === '' || loggedInUser.phone === undefined) {
            setUserError((UserError) => ({ ...UserError, phone: 'Phone number is required' }))
            validphone = false;
        } else if (!(mobRegex.test(loggedInUser.phone))) {
            setUserError((UserError) => ({ ...UserError, phone: 'Number must be only 10 digits' }))
            validphone = false;
        } else {
            setUserError((UserError) => ({ ...UserError, phone: '' }))
            validphone = true;
        }

        if (loggedInUser.email === '' || loggedInUser.email === undefined) {
            setUserError((UserError) => ({ ...UserError, email: 'Email is required' }))
            validemail = false;
        } else if (!(validEmailRegex.test(loggedInUser.email))) {
            setUserError((UserError) => ({ ...UserError, email: 'Email is not valid' }))
            validemail = false;
        } else {
            setUserError((UserError) => ({ ...UserError, email: '' }))
            validemail = true;
        }

        if (loggedInUser.password === '' || loggedInUser.password === undefined) {
            setUserError((UserError) => ({ ...UserError, password: 'Password is required' }))
            validpassword = false;
        } else if (!(passwordRegex.test(loggedInUser.password))) {
            setUserError((UserError) => ({ ...UserError, password: 'Password must be eight characters, at least one letter, one number and one special character' }))
            validpassword = false;
        } else {
            setUserError((UserError) => ({ ...UserError, password: '' }))
            validpassword = true;
        }


        if (validfname && validlname && validemail && validphone && validpassword) {
            console.log('Validation ok');
            // console.log('Usererror  -------  ', UserError);
            return true;
        } else {
            console.log('Validation wrong');
            // console.log('Usererror  -------  ', UserError);
            return false;
        }

    }

    if (loading) {
        return <LazyLoader/>
    }

    return (
        <>
            <Content style={{ margin: '24px 16px 0' }}>
                <div className="site-layout-background" style={{ backgroundColor: '#f0ffff', border: '2px solid green', padding: 24, minHeight: 360 }}>
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
                        {/* <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item> */}
                        <Form.Item label="FirstName">
                            <Input
                                name='firstname'
                                value={loggedInUser.firstname}
                                onChange={onChangeforall}
                            />
                            {UserError.firstname && <span className='error'>{UserError.firstname}</span>}
                        </Form.Item>
                        <Form.Item label="LastName">
                            <Input
                                name='lastname'
                                value={loggedInUser.lastname}
                                onChange={onChangeforall}
                            />
                            {UserError.lastname && <span className='error'>{UserError.lastname}</span>}
                        </Form.Item>
                        <Form.Item label="Mobile">
                            <Input
                                name='phone'
                                type='number'
                                value={loggedInUser.phone}
                                // onBlur={this.onBlur}
                                maxLength={25}
                                onChange={onChangeforall}
                            />
                            {UserError.phone && <span className='error'>{UserError.phone}</span>}
                        </Form.Item>

                        <Form.Item label="Email">
                            <Input
                                name='email'
                                value={loggedInUser.email}
                                onChange={onChangeforall}
                            />
                            {UserError.email && <span className='error'>{UserError.email}</span>}
                        </Form.Item>
                        {/* <Form.Item
                            label="Password"
                        // name="password"
                        >
                            <Input
                                name='password'
                                value={loggedInUser.password}
                                onChange={onChangeforall}
                            />
                            {UserError.password && <span className='error'>{UserError.password}</span>}
                        </Form.Item> */}

                        <Form.Item wrapperCol={{ offset: 4, span: 16 }} >
                            <Button type="primary" onClick={onFormSubmitForEdit}>Edit</Button>
                        </Form.Item>
                    </Form>

                </div>
            </Content>
        </>
    )
}

export default LoggedInDetails;