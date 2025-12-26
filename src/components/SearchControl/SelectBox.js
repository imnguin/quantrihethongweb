import { Col, Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { _fetchData } from "../../utils/CallAPI";
import { HOSTNAME } from "../../utils/constants/systemVars";

const { Option } = Select;

const SelectBox = ({
    name,
    label,
    value,
    listOption = [],
    mode,
    isLoadData,
    index,
    url,
    keyCache,
    maxTagCount,
    hostName = HOSTNAME,
    elementValue,
    elementName,
    form,
}) => {
    const dispatch = useDispatch();
    const [options, setOptions] = useState([
        { value: -1, label: "---Vui lòng chọn---", key: "-1" }, // Key phải là chuỗi hoặc số duy nhất
    ]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (value !== undefined && form) {
            form.setFieldsValue({ [name]: value });
        }
    }, [value, form, name]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const data = await bindData();
            setOptions(data);
            setLoading(false);
        }
        fetchData();
    }, [isLoadData, listOption, keyCache]);

    const bindData = async () => {
        let data = [{ value: -1, label: "---Vui lòng chọn---", key: "-1" }];

        if (isLoadData && url) {
            try {
                const response = await dispatch(_fetchData(hostName, url, {}));
                if (!response.iserror && response.resultObject?.length > 0) {
                    data = response.resultObject.map((item) => ({
                        value: item[elementValue],
                        label: `${item[elementValue]} - ${item[elementName]}`,
                        key: item[elementValue].toString(), // Đảm bảo key là duy nhất
                    }));
                }
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        } else if (listOption?.length > 0) {
            const hasDefault = listOption.some((x) => x.value === -1);
            data = hasDefault
                ? listOption.map((item) => ({
                    ...item,
                    key: item.value.toString(), // Đảm bảo key là duy nhất
                }))
                : [
                    ...data,
                    ...listOption.map((item) => ({
                        ...item,
                        key: item.value.toString(), // Đảm bảo key là duy nhất
                    })),
                ];
        }

        return data;
    };

    return (
        <Col xs={24} sm={6} lg={4} key={index}>
            <Form.Item
                name={name}
                label={label}
                initialValue={mode === "multiple" ? [-1] : -1}
            >
                <Select
                    mode={mode}
                    maxTagCount={maxTagCount}
                    loading={loading}
                    placeholder="Vui lòng chọn"
                >
                    {options.map((item) => (
                        <Option key={item.key} value={item.value}>
                            {item.label}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
        </Col>
    );
};

export default SelectBox;