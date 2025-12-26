import { Button, Col, DatePicker, Form, Input, Row, Grid, Space, Select } from 'antd';
import React, { useState } from "react";
import { useEffect } from 'react';
import SelectBox from '../SearchControl/SelectBox';
import TextBox from '../SearchControl/TextBox';
import dayjs from 'dayjs';
const { useBreakpoint } = Grid;
const SearchForm = (props) => {
    let {
        layout,
        listColumn,
        onSubmit
    } = props;

    const [Items, setItems] = useState([]);
    const [form] = Form.useForm();
    const [IsShow, SetIsShow] = useState(false);
    const [cssBtnSubmit, setcssBtnSubmit] = useState({ marginTop: 0, float: 'left' });
    const isMobile = useBreakpoint().xs;

    useEffect(() => {
        const items = elementSearch();
        setItems(items);
        SetIsShow(true);
    }, [listColumn]);

    useEffect(() => {
        if (!!isMobile) {
            setcssBtnSubmit({
                ...cssBtnSubmit,
                marginTop: 0
            });
        }
        else {
            setcssBtnSubmit({
                ...cssBtnSubmit,
                marginTop: layout === 'vertical' ? 30 : 0
            });
        }
    }, [isMobile, layout]);

    const elementSearch = () => {
        const children = listColumn?.map((item, index) => {
            switch (item.type) {
                case 'SelectBox':
                    return <SelectBox {...item} key={index} index={index} />
                case 'TextBox':
                    return <TextBox {...item} key={index} index={index} />
                case 'DatePicker':
                    return <Col xs={24} sm={6} lg={4} key={index}>
                        <Form.Item name={item.name} label={item.label} rules={item.rules} initialValue={dayjs(item.defaultValue).isValid() ? dayjs(item.defaultValue) : dayjs(new Date())}>
                            <DatePicker
                                placement={!!item.placement ? item.placement : 'topLeft'}
                                format={item.format ? item.format : 'DD/MM/YYYY'}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                default:
                    return <>
                    </>
            }
        });

        return children;
    }

    const onFinish = (values) => {
        onSubmit?.(values);
    };

    return (
        IsShow &&
        <Form form={form} layout={layout} name='search_form' onFinish={onFinish}>
            <Row gutter={24}>
                {Items}
                <Col xs={4}>
                    <Form.Item style={cssBtnSubmit}>
                        <Button type="primary" htmlType="submit">Tìm</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
export default SearchForm;