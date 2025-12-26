import React from "react";
import { Col, Form, Input } from "antd";

const TextBox = (props) => {
    const {
        colSpan,
        label,
        name,
        value,
        disabled,
        labelCol,
        labelAlign,
        index,
        rules,
        placeholder
    } = props;

    let style;
    
    if(!!labelCol)
    {
        style = {
            labelCol : {
                span: labelCol
            }
        }
    }else{
        style = {
            labelCol : {
                xs : 24,
                sm : 24,
                lg : 6
            }
        }
    }
    return (
        <Col key={`${name}-${index}`} xs={24} sm={!!colSpan ? colSpan : 12}>
            <Form.Item 
                label={label} 
                name={name} 
                initialValue={value === undefined ? '' : value} 
                {...style}
                rules={rules}
                labelAlign={!!labelAlign ? labelAlign : 'left'}
            >
                <Input disabled={!!disabled ? disabled : false} placeholder={placeholder} />
            </Form.Item>
        </Col>
    );
}
export default TextBox;