import React from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Avatar, Button, Col, Dropdown, Layout, Row, theme, Grid } from "antd";
import { useNavigate } from 'react-router-dom';
const {useBreakpoint} = Grid;

const Header = (props) => {
    let {
        collapsed,
        setCollapsed
    } = props;
    const { token: { colorBgContainer }, } = theme.useToken();
    const navigate = useNavigate();
    const screens = useBreakpoint()
    const isMobile = screens.xs;
    const user = JSON.parse(localStorage.getItem('logininfo'))

    const items = [
        {
            key: '1',
            label: 'Thông tin nhân viên'
        },
        {
            key: '2',
            label: 'Đổi mật khẩu'
        },
        {
            key: '3',
            label: <span onClick={() => Logout()}>Đăng xuất</span>
        }
    ];

    const Logout = () => {
        localStorage.removeItem('logininfo');
        navigate('/login');
    }
    
    return (
        <Layout.Header style={{
            padding: 0,
            background: colorBgContainer
        }}>
            <Row>
                <Col flex="100px">
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed?.(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Col>
                <Col flex="auto">
                    <Dropdown menu={{ items, }} placement="bottomLeft" arrow>
                        <div style={{
                            float : 'right',
                            marginRight : 10
                        }}>
                            <Avatar size='default' icon={<UserOutlined />}></Avatar>  {!isMobile ? `${user?.username} - ${user?.fullname}` : ''}
                        </div>
                    </Dropdown>
                </Col>
            </Row>

        </Layout.Header>
    );
}
export default Header;