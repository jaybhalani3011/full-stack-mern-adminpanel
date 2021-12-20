import React, { useState, useEffect } from 'react'
import { Layout, Table, Tag, Space, Menu } from 'antd';
import axios from 'axios';
import moment from 'moment';
import LazyLoader from './LazyLoader';
const { Content } = Layout;

export default function AllUser() {

    const [apiresp, setapiresp] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // effect
        axios.get('http://localhost:3001/all-user-data').then(response => {
            console.log('response from api ==> ', response.data.alluserfound);
            response.data.alluserfound.map(val => {
                console.log('response of single data ', val);
                val.createdAt = moment(val.createdAt).format('MMMM Do YYYY, h:mm:ss a');
            });
            setLoading(false);
            setapiresp(response.data.alluserfound);
        }).catch((err) => {
            console.log('error in api calling', err);
        });
    }, [])

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstname',
            key: 'firstname',
            // render: text => <a>{text}</a>,
        },
        {
            title: 'Last Name',
            dataIndex: 'lastname',
            key: 'lastname',
        },
        {
            title: 'Phone No.',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Registered At',
            dataIndex: 'createdAt',
            key: 'createdAt',
        }
        // {
        //     title: 'Tags',
        //     key: 'tags',
        //     dataIndex: 'tags',
        //     render: tags => (
        //         <>
        //             {tags.map(tag => {
        //                 let color = tag.length > 5 ? 'geekblue' : 'green';
        //                 if (tag === 'loser') {
        //                     color = 'volcano';
        //                 }
        //                 return (
        //                     <Tag color={color} key={tag}>
        //                         {tag.toUpperCase()}
        //                     </Tag>
        //                 );
        //             })}
        //         </>
        //     ),
        // },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (text, record) => (
        //         <Space size="middle">
        //             <a>Invite {record.name}</a>
        //             <a>Delete</a>
        //         </Space>
        //     ),
        // },
    ];

    const data = [
        {
            key: '1',
            createdAt: '2021-12-07T07:19:51.614+00:00',
            email: 'dflgkdfspgk12123@gmail.com',
            firstname: 'asasda',
            lastname: 'lastname',
            phone: 'phone',
        },
        {
            key: '2',
            firstname: 'asasda',
            lastname: 'lastname',
            phone: 'phone',
            email: 'dflgkdfspgk12123@gmail.com',
            createdAt: '2021-12-07T07:19:51.614+00:00',
        },
        {
            key: '3',
            firstname: 'asasda',
            lastname: 'lastname',
            phone: 'phone',
            email: 'dflgkdfspgk12123@gmail.com',
            createdAt: '2021-12-07T07:19:51.614+00:00',
        },
    ];

    if (loading) {
        return <LazyLoader />
    }
    return (
        <>
            <Content style={{ margin: '24px 16px 0' }}>
                <div className="site-layout-background" style={{ backgroundColor: '#f0ffff', border: '2px solid green', padding: 24, minHeight: 360 }}>
                    <Table columns={columns} dataSource={apiresp} theme='dark' />
                </div>
            </Content>
        </>
    )
}
