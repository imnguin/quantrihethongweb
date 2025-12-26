import React, { useState } from 'react';
import { Layout as LayoutAntd, Spin, theme } from 'antd';
import Menu from './Menu'
import Header from './Header';
import Breadcrumb from './Breadcrumb';
import { ContentStyle } from '../../asset/css/ContentStyle';
const { Content, Footer } = LayoutAntd;

const Layout = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const {token: { colorBgContainer },} = theme.useToken();
    if (props.layout === 'notUse') {
        return (
            props.children
        );
    }
    else {
        return (
            <LayoutAntd style={{ minHeight: '100vh' }}>
                <Menu collapsed={collapsed} setCollapsed={setCollapsed} />
                <LayoutAntd>
                    <Header setCollapsed={setCollapsed} collapsed={collapsed} />
                    <Content style={ContentStyle}> <Breadcrumb />
                        <div style={{padding: 24, textAlign: 'center', background: colorBgContainer, borderRadius: 7}}>{props.children}</div>
                    </Content>
                    <Footer style={{textAlign: 'center',}}>Ant Design ©2023 Created by Ant UED</Footer>
                </LayoutAntd>
            </LayoutAntd>
        );
    }
}

export default Layout;