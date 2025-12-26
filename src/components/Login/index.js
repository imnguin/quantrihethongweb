import React, { useState } from 'react';
import {
    LockOutlined,
    UserOutlined,
    GithubOutlined,
    BulbOutlined,
    BulbFilled,
} from '@ant-design/icons';
import {
    LoginForm,
    ProConfigProvider,
    ProFormCheckbox,
    ProFormText,
    setAlpha,
} from '@ant-design/pro-components';
import { App, Button, ConfigProvider, Space, theme } from 'antd';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { HOSTNAME } from '../../utils/constants/systemVars';
import { _fetchLogin } from '../../utils/CallAPI';

const ThemedLogin = ({ isDark, toggleDark }) => {
    const { token } = theme.useToken();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [loginType, setLoginType] = useState('account');

    const iconStyles = {
        marginInlineStart: '16px',
        color: setAlpha(token.colorTextBase, 0.2),
        fontSize: '24px',
        verticalAlign: 'middle',
        cursor: 'pointer',
    };
    const { notification } = App.useApp();

    const onFinish = async (values) => {
        const response = await dispatch(
            _fetchLogin(HOSTNAME, 'api/authen/login', {
                username: values.username,
                password: values.password,
            })
        );
        if (!response.iserror) {
            notification.success({
                message: 'Thông báo',
                description: response.messagedetail,
                placement: 'bottomRight'
            });
            const pathname = location?.state?.from?.pathname || '/';
            navigate(pathname);
        } else {
            notification.error({
                message: 'Thông báo',
                description: response.messagedetail,
                placement: 'bottomRight'
            });
        }
    };

    return (
        <ProConfigProvider hashed={false}>
            <div
                style={{
                    backgroundColor: token.colorBgLayout,
                    color: token.colorText,
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 16,
                }}
            >
                <LoginForm
                    title={<span style={{ color: '#1677FF', fontWeight: 'bold' }}>HỆ THỐNG QUẢN LÝ</span>}
                    subTitle={
                        <div style={{ color: 'red' }}>
                            Vui lòng đăng nhập để sử dụng hệ thống
                        </div>
                    }
                    onFinish={onFinish}
                    submitter={{
                        searchConfig: {
                            submitText: 'Đăng nhập',
                        },
                    }}
                    contentStyle={{ paddingTop: 0 }}
                >
                    <ProFormText
                        name="username"
                        fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined className={'prefixIcon'} />,
                        }}
                        placeholder="Tên đăng nhập"
                        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                    />

                    <ProFormText.Password
                        name="password"
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={'prefixIcon'} />,
                        }}
                        placeholder="Mật khẩu"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    />

                    <div style={{ marginBottom: 24 }}>
                        <ProFormCheckbox
                            noStyle
                            name="autoLogin"
                            style={{ color: token.colorText }}
                        >
                            Ghi nhớ mật khẩu
                        </ProFormCheckbox>
                        <a style={{ float: 'right', color: token.colorPrimary }}>
                            Quên mật khẩu?
                        </a>
                    </div>
                </LoginForm>
            </div>
        </ProConfigProvider>
    );
};

const Login = () => {
    const [isDark, setIsDark] = useState(false);

    return (
        <ConfigProvider
            theme={{
                algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >
            <App><ThemedLogin isDark={isDark} toggleDark={() => setIsDark(!isDark)} /></App>
        </ConfigProvider>
    );
};

export default Login;
