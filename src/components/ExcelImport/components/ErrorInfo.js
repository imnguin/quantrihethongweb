import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { listColumn } from "../constants";

const ErrorInfo = (props) => {
    const { columns, data, size } = props;
    const [state, setState] = useState({
        dataSource: []
    });

    useEffect(() => {
        checkData(data);
    }, [data]);

    const checkData = (data) => {
        const dataSource = data.map((item, index) => {
            return {
                ...item,
                error: checkError(item.error),
                key: index
            }
        });
        setState({
            ...state,
            dataSource
        });
    }

    const checkError = (err) => {
        switch (err) {
            case 'required':
                return 'Vui lòng điền dữ liệu!';
            case 'invalid':
                return 'Dữ liệu không đúng!';
            default:
                return err;
        }
    }

    return (
         <Table
            key='ErrorInfo'
            columns={columns || listColumn}
            dataSource={state.dataSource || []}
            pagination={false}
            size={size || 'small'}
            bordered
        />
    );
}
export default ErrorInfo;