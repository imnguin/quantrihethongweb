import { Button, Checkbox, Col, DatePicker, Divider, Form, Grid, Row, Space } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextBox from '../FormCotrol/TextBox';
import SelectBox from "../FormCotrol/SelectBox";
import TextArea from "../FormCotrol/TextArea";
import StyleDefault from "../FormCotrol/StyleDefault";
import dayjs from "dayjs";
const { useBreakpoint } = Grid;

const FormContainer = (props) => {
    let {
        title,
        listColumn,
        layout,
        onCloseModal,
        backLink,
        onSubmit,
        dataSoure,
        PKey
    } = props;

    const navigate = useNavigate();
    const [Items, setItems] = useState([]);
    const screen = useBreakpoint();
    const islg = screen.lg;
    const [form] = Form.useForm();
    const [formLayout, SetLayout] = useState(!!layout ? layout : 'vertical');

    useEffect(() => { if (islg) { if (!!layout) { SetLayout(layout); } else { SetLayout('vertical'); } } else { SetLayout('vertical'); } }, [islg]);

    useEffect(() => {
        const items = renderControl();
        setItems(items);
    }, [listColumn]);

    const renderControl = () => {
        const children = listColumn?.map((elm, index) => {
            let value = dataSoure?.[elm.name];
            if (!!PKey && PKey == elm.name && !!value) { elm.disabled = true; elm.value = value } else { elm.disabled = false }
            switch (elm.type) {
                case 'textbox':
                    return (
                        <TextBox
                            {...elm}
                            index={index}
                            key={index}
                            value={value}
                        />
                    );
                case 'select':
                    return (
                        <SelectBox
                            {...elm}
                            key={index}
                            index={index}
                            value={value}
                            mode={elm.mode}
                        />
                    );
                case 'textarea':
                    return (
                        <TextArea
                            {...elm}
                            key={index}
                            index={index}
                            value={value}
                        />
                    );
                case 'checkbox':
                    return <Col xs={24} sm={!!elm.span ? elm.span : 12} key={index}>
                        <Form.Item name={elm.name} valuePropName="checked" initialValue={value !== undefined ? value : elm.value}>
                            <Checkbox>{elm.label}</Checkbox>
                        </Form.Item>
                    </Col>
                case 'datepicker':
                    return <Col xs={24} sm={!!elm.span ? elm.span : 12} key={index}>
                        <Form.Item name={elm.name} label={elm.label} rules={elm.rules} initialValue={dayjs(elm.defaultValue).isValid() ? dayjs(elm.defaultValue) : dayjs(new Date())}>
                            <DatePicker
                                placement={!!elm.placement ? elm.placement : 'topLeft'}
                                showTime={!!elm.showTime ? elm.showTime : false}
                                disabled={!!elm.disabled ? elm.disabled : false}
                                format={elm.format ? elm.format : 'DD/MM/YYYY'}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                default: return ""
            }
        });
        return children;
    }
    const eventBackLink = () => {
        if (!!onCloseModal) {
            onCloseModal?.();
        }
        else {
            navigate(backLink);
        }
    }

    const onFinish = (values) => {
        onSubmit?.(values);
    }

    return (
        <>
            {!!title && <Divider style={{ marginBottom: 40 }}>{title}</Divider>}
            <Form form={form} layout={formLayout} onFinish={onFinish} name='s_form' >
                <Row gutter={24}>{Items}</Row>
            </Form>{props.children}
            <div style={{ textAlign: 'right', marginTop: 10 }}>
                <Space size="small">
                    <Button type="primary" onClick={form.submit}>Cập nhật</Button>
                    <Button onClick={() => { eventBackLink() }}>Quay lại</Button>
                </Space>
            </div>
        </>
    );
}
export default FormContainer;