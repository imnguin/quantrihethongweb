import React from "react";
import DataGird from "../../../../components/DataGird";
import { outputvoucherDetailColumns } from "../constants";
const OutputVoucherDetail = (props) => {
    let {
        dataSource = []
    } = props;
    return (
        <DataGird
            isDisableRowSelect={true}
            listColumn={outputvoucherDetailColumns}
            dataSource={dataSource?.outputvoucherdetail}
            defaultCurrentPage={1}
            defaultPageSize={20}
            showHeader={true}
            showSizeChanger={true}
            pageSizeOptions={['1', '10', '20', '50', '100']}
            scroll={{ y: 1000, x: 1000 }}
            isShowHeaderAction={true}
        />
    );
}
export default OutputVoucherDetail;