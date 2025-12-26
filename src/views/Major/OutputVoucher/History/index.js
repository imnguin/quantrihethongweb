import React, { useEffect, useState } from "react";
import { HOSTNAME } from "../../../../utils/constants/systemVars";
import { _fetchData } from "../../../../utils/CallAPI";
import { setBreadcrumb } from "../../../../components/Redux/Reducers";
import { Notification } from "../../../../utils/Notification";
import { historyColumns, InitParam, PagePath, SearchElement } from "../constants";
import SearchForm from "../../../../components/SearchForm";
import { useDispatch } from "react-redux";
import DataGird from "../../../../components/DataGird";
import { formatDate, toUTCFromLocal } from "../../../../utils";
import dayjs from "dayjs";

const History = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('logininfo'))
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
        const response = await dispatch(_fetchData(HOSTNAME, 'api/outputvoucher/search', postData));
        if (!response.iserror) {
            const excelData = {
                data: [
                    ['Mã hóa đơn', 'Tiền thu của khách', 'Tiền giảm giá', 'Ngày lập hóa đơn'],
                ],
            }
            setData(response?.resultObject);
            response?.resultObject.map((item, index) => {
                const excelItem = [
                    item.outputvoucherid,
                    item.totalamount,
                    item.promotion,
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
                isDisableRowSelect={user?.username != "admin"}
                pKey='outputvoucherid'
                title='Danh sách hóa đơn'
                listColumn={historyColumns(data)}
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
                isShowButtonAdd={true}
                urlAdd='/outputvoucher'
                isExportExcel={true}
                fileName='Báo cáo đơn hàng'
                hostName={HOSTNAME}
                excelData={excelData}
                apiDelete='api/outputvoucher/delete'
                onSelectRowItem={(values) => loadData(InitParam)}
            />
        </>
    )
}
export default History;