import { Col, Form, Input, Select, Space } from "antd";
import React from "react";

const TextBox = (props) => {
    let {
        index,
        name,
        label,
        rules,
        placeholder
    } = props;

    return <Col xs={24} sm={6} lg={4} key={index}>
        <Form.Item name={name} label={label} rules={rules}>
            <Input placeholder={placeholder} />
        </Form.Item>
    </Col>
}
export default TextBox;