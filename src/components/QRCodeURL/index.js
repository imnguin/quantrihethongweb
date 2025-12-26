import React from 'react';
import { Input, QRCode, Space } from 'antd';
const QRCodeURL = (props) => {
    let {
        code
    } = props
    return (
        <Space direction="vertical" align="center">
            <QRCode value={code} style={{height : 100, width: 100}}/>
        </Space>
    );
};
export default QRCodeURL;