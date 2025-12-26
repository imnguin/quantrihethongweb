import React, { useEffect, useState } from "react";
import { InitParam, outputvoucherDetailColumns, PagePath, ReportOutputVoucherDetailColumns, SearchElement } from "../constants";
import { formatDate, toUTCFromLocal } from "../../../../utils";
import { _fetchData } from "../../../../utils/CallAPI";
import { HOSTNAME } from "../../../../utils/constants/systemVars";
import { Notification } from "../../../../utils/Notification";
import SearchForm from "../../../../components/SearchForm";
import DataGird from "../../../../components/DataGird";
import { useDispatch } from "react-redux";
import { setBreadcrumb } from "../../../../components/Redux/Reducers";

const ReportOutputVoucherDetail = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [isLoadComplete, setisLoadComplete] = useState(false);
    const [excelData, setExcelData] = useState(null);

    useEffect(() => {
        dispatch(setBreadcrumb(PagePath));
        loadData(InitParam);
    }, []);
    const onSubmit = (MLObject) => {
        let fromdate = MLObject?.fromdate ? new Date(MLObject?.fromdate) : InitParam.fromdate
        let todate = MLObject?.todate ? new Date(MLObject?.todate) : InitParam.todate;
        let postData = {
            outputvoucherid: MLObject?.keyword,
            fromdate: fromdate.setHours(0, 0, 0, 0),
            todate: todate.setHours(23, 59, 59, 999)
        };
        loadData(postData);
    }

    const loadData = async (postData) => {
        setisLoadComplete(false);
        const response = await dispatch(_fetchData(HOSTNAME, 'api/outputvoucher/loadOutoutVoucherDetail', postData));
        if (!response.iserror) {
            const excelData = {
                data: [
                    ['Mã hóa đơn', 'Mã item', 'Mã nhóm hàng', 'Tên nhóm hàng', 'Số lượng quy đổi', 'Mã sản phẩm', 'Tên sản phẩm', 'Barcode', 'Đơn vị tính', 'Đơn giá', 'Số lượng', 'Giảm giá', 'Thành tiền', 'Ngày tạo'],
                ],
            }
            console.log(response?.resultObject);
            setData(response?.resultObject);
            response?.resultObject.map((item, index) => {
                const excelItem = [
                    item.outputvoucherid,
                    item.itemid,
                    item.productsubgroupid,
                    item.productsubgroupname,
                    item.exchangequantity,
                    item.productid,
                    item.productname,
                    item.barcode,
                    item.quantityunitname,
                    item.price,
                    item.quantity,
                    item.promotion,
                    item.totalamount,
                    formatDate(item.createdat)
                ];
                excelData.data.push(excelItem);
            });
            setExcelData(excelData);
            setisLoadComplete(true)
        } else {
            Notification('Thông báo', response.message, 'error');
            setisLoadComplete(true)
        }
    }

    return (
        <>
            <SearchForm
                listColumn={SearchElement}
                layout='vertical'
                onSubmit={onSubmit}
            />

            <DataGird
                isDisableRowSelect={true}
                pKey='outputvoucherid'
                title='Danh sách báo cáo chi tiết đơn hàng'
                listColumn={ReportOutputVoucherDetailColumns}
                dataSource={data.reverse()}
                defaultCurrentPage={1}
                defaultPageSize={20}
                size='small'
                bordered='enable'
                showHeader={true}
                showSizeChanger={true}
                pageSizeOptions={['1', '10', '20', '50', '100']}
                scroll={{ y: 1000, x: 1000 }}
                isShowHeaderAction={true}
                isExportExcel={true}
                fileName='Báo cáo chi tiết đơn hàng'
                excelData={excelData}
            />
        </>
    )
}
export default ReportOutputVoucherDetail;