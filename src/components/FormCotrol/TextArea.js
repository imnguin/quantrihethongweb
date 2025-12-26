import React from "react";
import { Col, Form, Input } from "antd";

const TextArea = (props) => {
    const {
        colSpan,
        label,
        name,
        value,
        disabled,
        labelCol,
        labelAlign,
        index,
        row
    } = props;
    
    const initValue = value === undefined ? '' : value;
    return (
        <Col span={!!colSpan ? colSpan : 24} key={`${name}-${index}`}>
            <Form.Item 
                label={label} 
                name={name} 
                initialValue={initValue} 
                labelCol={{ span: !!labelCol? labelCol : 3 }}
                labelAlign={!!labelAlign ? labelAlign : 'left'}
            >
                <Input.TextArea disabled={!!disabled ? disabled : false} rows={!!row? row : 5} />
            </Form.Item>
        </Col>
    );
}
export default TextArea;