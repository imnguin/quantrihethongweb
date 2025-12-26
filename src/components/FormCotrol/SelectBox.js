import { Col, Form, Select } from "antd";
import { useEffect, useState } from "react";
import { HOSTNAME } from "../../utils/constants/systemVars";
import { _fetchData } from "../../utils/CallAPI";
import { useDispatch } from "react-redux";

const SelectBox = (props) => {
    const {
        colSpan,
        label,
        name,
        value,
        disabled,
        labelCol,
        labelAlign,
        index,
        listOptions,
        isCahce,
        url,
        keyCache,
        mode,
        hosName,
        elementName,
        elementValue,
    } = props;

    const [options, setOptions] = useState([]);
    const [values, setValues] = useState([]); // Đồng bộ với giá trị khởi tạo
    const dispatch = useDispatch();

    // Khởi tạo giá trị ban đầu dựa trên props.value
    useEffect(() => {
        // Đồng bộ giá trị khởi tạo
        if (value !== undefined && value !== null) {
            setValues(mode ? (Array.isArray(value) ? value : [value]) : value);
        } else {
            setValues(mode ? [] : -1); // Giá trị mặc định
        }

        // Gọi renderOption để load options
        renderOption();
    }, [value, mode]); // Thêm value vào dependency để cập nhật khi props thay đổi

    const renderOption = async () => {
        let data = [];
        if (isCahce) {
            // Xử lý cache (nếu có)
            setOptions(binData(data));
        } else if (url) {
            const response = await dispatch(_fetchData(hosName || HOSTNAME, url, {}));
            if (!response.iserror && response.resultObject?.length > 0) {
                data = response.resultObject.map((item) => ({
                    value: item[elementValue],
                    label: `${item[elementValue]} - ${item[elementName]}`,
                }));
            }
            setOptions(binData(data));
        } else {
            setOptions(binData(listOptions || []));
        }
    };

    const binData = (data) => {
        const list = [{ value: -1, label: "---vui lòng chọn---" }];
        data?.forEach((element) => {
            if (!list.find((x) => x.value === element.value)) {
                list.push(element);
            }
        });
        return list;
    };

    const selectProps = {
        style: { width: "100%" },
        value: values, // Giá trị của Select đồng bộ với values
        options,
        onChange: (newValue) => {
            setValues(newValue); // Cập nhật values khi người dùng thay đổi
            // Nếu cần cập nhật form field, sử dụng form.setFieldsValue trong context
        },
        placeholder: "Vui lòng chọn...",
        maxTagCount: "responsive",
        disabled,
        showSearch: true,
        allowClear: true,
        filterOption: (input, option) => {
            const label = option?.label?.toString().toLowerCase() ?? "";
            const value = option?.value?.toString().toLowerCase() ?? "";
            const search = input.toLowerCase();
            return label.includes(search) || value.includes(search);
        }
    };

    return (
        <Col key={`${name}-${index}`} xs={24} sm={colSpan || 12}>
            <Form.Item
                label={label}
                name={name}
                initialValue={mode ? (Array.isArray(value) ? value : value ? [value] : []) : value ?? -1} // Đặt initialValue trực tiếp từ props.value
                labelCol={{ span: labelCol || 6 }}
                labelAlign={labelAlign || "left"}
            >
                <Select {...selectProps} mode={mode} />
            </Form.Item>
        </Col>
    );
};

export default SelectBox;