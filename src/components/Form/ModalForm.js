import { Form, Input, Modal, Select } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";

const ModalForm = (props) => {
    let {
        listColumn,
        visible
    } = props;
    const [form] = Form.useForm();
    const [modalState, setModalState] = useState({
        visible: false,
        loading: false,
        title: '',
        initialValues: {},
        apiPath: ''
    });

    useEffect(() => {
        setModalState({
            ...modalState,
            visible: props.visible
        });
    }, [props.visible]);

    const closeModal = () => {
        setModalState({
            ...modalState,
            visible: false,
            loading: false
        });
    };

    const onFinish = (values) => {

    }

    const renderItem = (item) => {
        switch (item.type) {
            case 'input':
                return <Input />
            case 'select':
                let listOption = [];
                if (!!item.options && item.options.length > 0) {
                    listOption = item.options;
                }
                return (
                    <Select
                        showSearch
                        placeholder={item.placeholder}
                        filterOption={true}
                        onChange={(value) => console.log(value)}
                    >
                        {
                            listOption.map((option) => (
                                <Select.Option key={option[item.valueOption]} value={option[item.valueOption]}>
                                    {option[item.valueOption]} - {option[item.labelOption]}
                                </Select.Option>
                            ))
                        }
                    </Select>
                )
            default: <Input />
        }
    }

    return (
        <Modal
            title='Kiểm tra'
            open={modalState.visible}
            onOk={() => form.submit()}
            confirmLoading={modalState.loading}
            onCancel={closeModal}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={modalState.initialValues}
            >
                {
                    listColumn.map((item, index) => {
                        return (
                            <Form.Item
                                label={item.label}
                                name={item.name}
                                rules={item.rules}
                            >
                                {renderItem(item)}
                            </Form.Item>
                        )
                    })
                }
            </Form>

        </Modal>
    );
}

export default ModalForm;