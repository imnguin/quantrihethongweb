import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumb } from '../../../../components/Redux/Reducers';
import { ElementList, PagePath, SearchElement, columns, fileTempalteData, schema } from '../constants';
import DataGird from '../../../../components/DataGird';
import { _fetchData } from '../../../../utils/CallAPI';
import { HOSTNAME } from '../../../../utils/constants/systemVars';
import { Notification } from '../../../../utils/Notification';
import SearchForm from '../../../../components/SearchForm';
import { formatDate } from '../../../../utils';

const Search = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [isLoadComplete, setisLoadComplete] = useState(false);
    const [excelData, setExcelData] = useState(null);
    useEffect(() => {
        dispatch(setBreadcrumb(PagePath));
        loadData({});
    }, []);

    const handleSelectRow = (selectedRows) => {
        console.log("selectedRows", selectedRows)
    }

    const loadData = async (postData) => {
        setisLoadComplete(false);
        const response = await dispatch(_fetchData(HOSTNAME, 'api/price/search', postData));
        if (!response.iserror) {
            const excelData = {
                data: [
                    ['Mã sản phẩm', 'Giá', 'Khu vực', 'Ngày tạo', 'Người tạo'],
                ],
            }
            console.log(response?.resultObject);
            setData(response?.resultObject);
            response?.resultObject.map((item, index) => {
                const excelItem = [
                    item.productid,
                    item.price,
                    item.areaid,
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

    const onSubmit = (MLObject) => {
        let postData = {
            $or: [
                {
                    productid: MLObject.keyword
                },
                {
                    areaid: MLObject.keyword
                }
            ]
        }
        loadData(postData);
    }

    return (
        <>
            <SearchForm listColumn={SearchElement} layout='vertical' onSubmit={onSubmit} />
            {
                isLoadComplete &&
                <DataGird
                    pKey='productid'
                    title='Danh sách giá sản phẩm'
                    listColumn={columns}
                    dataSource={data}
                    defaultCurrentPage={1}
                    defaultPageSize={10}
                    size='small'
                    bordered='enable'
                    showHeader={true}
                    showSizeChanger={true}
                    pageSizeOptions={['1', '10', '20', '50', '100']}
                    scroll={{ y: 1000, x: 1000 }}
                    isShowHeaderAction={true}
                    isShowButtonAdd={true}
                    isShowModalBtn={true}
                    TitleModal="giá sản phẩm"
                    listColumnModal={ElementList}
                    onSubmitModel={(values, action) => onSubmit({})}
                    hostName={HOSTNAME}
                    apiAdd='api/price/add'
                    apiUpdate='api/price/update'
                    apiDelete='api/price/delete'
                    onSelectRowItem={(values) => onSubmit({})}
                    isExportTemplate={true}
                    fileTempalteData={fileTempalteData}
                    isImportExcel={true}
                    schema={schema}
                    apiImportExcel='api/price/add'
                    onImportExcel={() => loadData({})}
                    isExportExcel={true}
                    fileName='File giá sản phẩm'
                    excelData={excelData}
                />
            }
        </>
    );
}
export default Search;