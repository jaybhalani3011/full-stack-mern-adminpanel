import React from 'react'
import { Layout } from "antd";
const { Header, Footer, Content } = Layout;

export default function FootComponent() {
    return (
        <>
            <Footer style={{ backgroundColor: '#51abff', textAlign: 'center',position: 'sticky', bottom: '0', left:'0' }}>Admin Panel ©2021 Created by Jay Patel</Footer>
        </>
    )
}
