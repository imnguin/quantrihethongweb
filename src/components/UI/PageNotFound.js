import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = (props) => {
    const navigate = useNavigate();
    return (
        <Result
            status="404"
            title="404"
            subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
            extra={<Button type="primary" onClick={() => navigate('/')}>Trang chủ</Button>}
        />
    );
}
export default PageNotFound;