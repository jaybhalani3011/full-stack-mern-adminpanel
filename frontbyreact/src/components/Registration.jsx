import React, { useState } from 'react';
import axios from 'axios'
import '../App.css';
import {
    Link,
    withRouter,
} from "react-router-dom";
import Swal from 'sweetalert';
import {
    Form,
    Input,
    Button,
    Checkbox,
    Layout,
    Switch,
    message,
    // Radio,
    // Select,
    // Cascader,
    // DatePicker,
    // InputNumber,
    // TreeSelect,
    // Menu,
    // Space,
} from 'antd';
// import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const { Header, Content } = Layout;

function Registration(props) {
    const { history } = props;
    const [componentSize, setComponentSize] = useState('default');
    //  eslint-disable-next-line
    const validEmailRegex = RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    //  eslint-disable-next-line
    const mobRegex = RegExp(/^[0-9]{10}$/g);
    //  eslint-disable-next-line
    const passwordRegex = RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ig);

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const [Userdetails, setUserdetails] = useState({
        firstname: '',
        lastname: '',
        phone: 0,
        email: '',
        password: '',
        confirmpassword: '',
        tnccheckbox: false,
        adminoruser : false,
    })

    const [UserError, setUserError] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        password: '',
        confirmpassword: '',
        tnccheckbox: '',
    })
    
    const onChangeforall = (e) => {
        const { value } = e.target;
        const { name } = e.target;

        console.log('eeeeeee', name, ' and ', value);
        setUserdetails({ ...Userdetails, [name]: value });

    }

    const onFormSubmit = (e) => {
        let validationok = onFormSubmitValidation();
        if (validationok) {
            delete Userdetails.tnccheckbox;
            // fetch('http://localhost:3000/', {
            //     method: 'POST',
            //     // We convert the React state to JSON and send it as the POST body
            //     body: JSON.stringify(this.state)
            // }).then(function (response) {
            //     console.log(response)
            //     return response.json();
            // });
            axios.post('http://localhost:3001/adddata',
                Userdetails,
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
            console.log('Registered 🆗');
        } else {
            console.log('Not Registered 👎');
        }
    }

    const onFormSubmitValidation = () => {
        let validfname = true, validlname = true, validemail = true, validphone = true, validpassword = true, validconfirmpassword = true,
            validtnc = true;

        if (Userdetails.firstname === '' || Userdetails.firstname === undefined) {
            setUserError((UserError) => ({ ...UserError, firstname: 'First Name is required' }))
            validfname = false;
        } else {
            setUserError((UserError) => ({ ...UserError, firstname: '' }))
            validfname = true;
        }

        if (Userdetails.lastname === '' || Userdetails.lastname === undefined) {
            setUserError((UserError) => ({ ...UserError, lastname: 'Last Name is required' }))
            validlname = false;
        } else {
            setUserError((UserError) => ({ ...UserError, lastname: '' }))
            validlname = true;
        }

        if (Userdetails.phone === '' || Userdetails.phone === undefined) {
            setUserError((UserError) => ({ ...UserError, phone: 'Phone number is required' }))
            validphone = false;
        } else if (!(mobRegex.test(Userdetails.phone))) {
            setUserError((UserError) => ({ ...UserError, phone: 'Number must be only 10 digits' }))
            validphone = false;
        } else {
            setUserError((UserError) => ({ ...UserError, phone: '' }))
            validphone = true;
        }

        if (Userdetails.email === '' || Userdetails.email === undefined) {
            setUserError((UserError) => ({ ...UserError, email: 'Email is required' }))
            validemail = false;
        } else if (!(validEmailRegex.test(Userdetails.email))) {
            setUserError((UserError) => ({ ...UserError, email: 'Email is not valid' }))
            validemail = false;
        } else {
            setUserError((UserError) => ({ ...UserError, email: '' }))
            validemail = true;
        }

        if (Userdetails.password === '' || Userdetails.password === undefined) {
            setUserError((UserError) => ({ ...UserError, password: 'Password is required' }))
            validpassword = false;
        } else if (!(passwordRegex.test(Userdetails.password))) {
            setUserError((UserError) => ({ ...UserError, password: 'Password must be eight characters, at least one letter, one number and one special character' }))
            validpassword = false;

        } else {
            setUserError((UserError) => ({ ...UserError, password: '' }))
            validpassword = true;
        }

        if (Userdetails.confirmpassword === '' || Userdetails.confirmpassword === undefined) {
            setUserError((UserError) => ({ ...UserError, confirmpassword: 'Confirmpassword is required' }))
            validconfirmpassword = false;
        } else if (Userdetails.confirmpassword !== Userdetails.password) {
            setUserError((UserError) => ({ ...UserError, confirmpassword: 'Confirmpassword must be same as Password' }))
            validconfirmpassword = false;

        } else {
            setUserError((UserError) => ({ ...UserError, confirmpassword: '' }))
            validconfirmpassword = true;
        }


        if (Userdetails.tnccheckbox === false) {
            setUserError((UserError) => ({ ...UserError, tnccheckbox: 'Please accept the agreement to continue' }))
            validtnc = false;
        } else {
            setUserError((UserError) => ({ ...UserError, tnccheckbox: '' }))
            validtnc = true;
        }

        if (validfname && validlname && validemail && validphone && validpassword && validconfirmpassword && validtnc) {
            console.log('Validation ok');
            console.log('Usererror  -------  ', UserError);
            return true;
        } else {
            console.log('Validation wrong');
            console.log('Usererror  -------  ', UserError);
            return false;
        }


    }

    const onChangeTNC = (e) => {
        const { name } = e.target;
        const { checked } = e.target;
        setUserdetails({ ...Userdetails, [name]: checked });
    }
    
    const onChangeAdmin = (checked) => {
        checked ? message.info('You Chose to be Admin') : message.info('Now, you are normal user')
        setUserdetails({ ...Userdetails, adminoruser: checked });                
    }

    console.log('UserdetailsUserdetailsUserdetailsUserdetailsUserdetails',Userdetails)
    // const validateMessages = {
    //     types: {
    //         email: 'Email is not valid'
    //     }
    // }
    return (
        <>
            <Layout className="layout">
                <Content style={{ padding: '0 50px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <div className="site-layout-content"><h1>Registration Form :-</h1></div>
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
                                placeholder="Enter Firstname"
                                onChange={onChangeforall}
                            />
                            {UserError.firstname && <span className='error'>{UserError.firstname}</span>}
                        </Form.Item>
                        <Form.Item label="LastName">
                            <Input
                                name='lastname'
                                placeholder="Enter Lastname"
                                onChange={onChangeforall}
                            />
                            {UserError.lastname && <span className='error'>{UserError.lastname}</span>}
                        </Form.Item>
                        <Form.Item label="Mobile">
                            <Input
                                name='phone'
                                type='number'
                                placeholder="Enter mobile number"
                                // onBlur={this.onBlur}
                                maxLength={25}
                                onChange={onChangeforall}
                            />
                            {UserError.phone && <span className='error'>{UserError.phone}</span>}
                        </Form.Item>

                        <Form.Item label="Email">
                            <Input
                                name='email'
                                placeholder="Enter email"
                                onChange={onChangeforall}
                            />
                            {UserError.email && <span className='error'>{UserError.email}</span>}
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                        >
                            <Input.Password
                                name='password'
                                placeholder="Enter password"
                                onChange={onChangeforall}
                            />
                            {UserError.password && <span className='error'>{UserError.password}</span>}
                        </Form.Item>
                        <Form.Item
                            label="Confirm Password"
                            name="confirm"
                        >
                            <Input.Password
                                name='confirmpassword'
                                placeholder="Enter password again"
                                onChange={onChangeforall}
                            />
                            {UserError.confirmpassword && <span className='error'>{UserError.confirmpassword}</span>}
                        </Form.Item>
                        <Form.Item
                            label="Admin or User"
                            name="adminoruser"
                        >
                            User&nbsp;&nbsp;<Switch name="adminoruser" onChange={onChangeAdmin} />&nbsp;&nbsp;Admin
                            {/* {UserError.confirmpassword && <span className='error'>{UserError.confirmpassword}</span>} */}
                        </Form.Item>
                        {/* <Form.Item label="Select">
                            <Select>
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item> */}
                        {/* <Form.Item label="TreeSelect">
                            <TreeSelect
                                treeData={[
                                    {
                                        title: 'Light',
                                        value: 'light',
                                        children: [
                                            {
                                                title: 'Bamboo',
                                                value: 'bamboo',
                                            },
                                        ],
                                    },
                                ]}
                            />
                        </Form.Item> */}
                        {/* <Form.Item label="Cascader">
                            <Cascader
                                options={[
                                    {
                                        value: 'zhejiang',
                                        label: 'Zhejiang',
                                        children: [
                                            {
                                                value: 'hangzhou',
                                                label: 'Hangzhou',
                                            },
                                        ],
                                    },
                                ]}
                            />
                        </Form.Item> */}
                        {/* <Form.Item label="DatePicker">
                            <DatePicker />
                        </Form.Item>
                         */}
                        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                            {/* valuePropName="checked" */}
                            <Checkbox name='tnccheckbox' onClick={onChangeTNC}>I have read the agreement</Checkbox><br />
                            {UserError.tnccheckbox && <span className='error'>{UserError.tnccheckbox}</span>}
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 4, span: 16 }} >
                            <Button type="primary" onClick={onFormSubmit}>Register</Button><br /><br />
                            Already have an account ?&nbsp;&nbsp;
                            <Link to='/' type="primary">Login</Link>
                        </Form.Item>
                    </Form>
                </Content>
            </Layout>
        </>
    )
}

export default withRouter(Registration);
