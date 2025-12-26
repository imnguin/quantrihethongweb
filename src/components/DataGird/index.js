import { Button, Col, Divider, Empty, Input, Modal, Row, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../FormContainer";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Notification } from "../../utils/Notification";
import { useDispatch } from "react-redux";
import { _fetchData } from "../../utils/CallAPI";
import ExcelExport from "../ExcelExport";
import ImportExcel from "../ExcelImport";
import { genFileName } from "../../utils";
import Highlighter from "react-highlight-words";

const DataGird = (props) => {
    let {
        title,
        pKey,
        isDisableRowSelect,
        dataSource,
        listColumn,
        defaultCurrentPage,
        defaultPageSize,
        size,
        bordered,
        showHeader,
        showSizeChanger,
        pageSizeOptions,
        scroll,
        urlAdd,
        isShowHeaderAction,
        isShowButtonAdd,
        onSelectRowItem,
        isShowModalBtn,
        TitleModal,
        modalWidth,
        listColumnModal,
        onSubmitModel,
        columnSelectWidth,
        apiAdd,
        apiUpdate,
        apiDelete,
        hostName,
        isExportTemplate,
        fileTemplateName,
        fileTempalteData,
        isImportExcel,
        onImportExcel,
        apiImportExcel,
        schema,
        checkFile,
        rules,
        isExportExcel,
        excelData,
        fileName,
        buttonItems
    } = props;

    const [modal, contextHolder] = Modal.useModal();
    const navigate = useNavigate();
    let objjd = null;
    const onCloseModal = () => {
        objjd.destroy();
    }
    const dispatch = useDispatch();
    const [columns, Setcolumns] = useState([]);
    const [dataTable, SetDataTable] = useState([]);
    const [currentPage, SetCurrentPage] = useState(!!defaultCurrentPage ? defaultCurrentPage : 1);
    const [pageSize, SetpageSize] = useState(!!defaultPageSize ? defaultPageSize : 1);
    const [loadings, setLoadings] = useState([]);
    const [disBtnDel, setDisBtnDel] = useState(true);

    const locale = {
        emptyText: (
            <Empty
                styles={{ image: { height: 60 } }}
                description={
                    <span>Dữ liệu không tồn tại</span>
                }
            >
            </Empty>
        )
    };

    useEffect(() => {
        const data = prepareData(dataSource);
        SetDataTable(data);
    }, [dataSource]);

    const prepareData = (data) => {
        const tempData = data?.map((item, index) => {
            return {
                ...item,
                key: `${item[pKey]} -  ${index}`
            }
        });
        return !!tempData ? tempData : []
    }

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setDisBtnDel(!!selectedRowKeys && selectedRowKeys.length > 0 ? false : true);
            setSelectedRowKeys(selectedRowKeys);
            setSelectedRows(selectedRows);
        },
        columnWidth: columnSelectWidth ? columnSelectWidth : 20
    };

    useEffect(() => {
        const lst = getListCells();
        Setcolumns(lst);
    }, [listColumn]);

    const getListCells = () => {
        let colums = [];
        listColumn?.map((item, index) => {
            if (item.dataIndex == 'edit') {
                item.render = (_, record) => (
                    <Space size="middle">
                        <Button type='primary' ghost={true} style={{ border: 0 }} onClick={() => handleClickIcon(item, record, 'update')} icon={<EditOutlined />} size={"small"} />
                    </Space>
                )
            }
            if (item.dataIndex == 'delete') {
                item.render = (_, record) => (
                    <Space size="middle">
                        <Button type='primary' ghost={true} style={{ border: 0, color: '#ff1616' }} onClick={() => handleClickIcon(item, record, 'delete')} size={"small"} >
                            {!!item.icon ? item.icon : 'Delete'}
                        </Button>
                    </Space>
                )
            }
            if (item.dataIndex == 'groupAction') {
                item.render = (_, record) => (
                    <Space size="middle">
                        <Button type='primary' ghost={true} style={{ border: 0 }} onClick={() => handleClickIcon(item, record, 'update')} icon={<EditOutlined />} size={"small"} />
                        <Button type='primary' ghost={true} style={{ border: 0, color: '#ff1616' }} onClick={() => handleClickIcon(item, record, 'delete')} icon={<DeleteOutlined />} size={"small"} />
                    </Space>
                )
            }
            if (!!item.isSearch) {
                item = { ...item, ...getColumnSearchProps(item.dataIndex) }
            }
            return colums.push(item)
        })

        return colums
    }

    const handleClickIcon = async (elm, record, action) => {
        console.log('record', record)
        if (action == 'update') {
            if (isShowModalBtn) {
                const config = {
                    title:
                        <Row className="modal-header" type='flex' justify={'space-between'} align='middle'>
                            <h5 className="modal-title">{!!TitleModal ? `Cập nhật ${TitleModal}` : 'Cập nhật'}</h5>
                            <Button
                                onClick={onCloseModal}
                                icon={<CloseOutlined />}
                                type="text"
                                size='middle'
                                style={{ color: '#ff4d4f', padding: 0, width: 25, height: 25 }}
                            ></Button>
                        </Row>
                    ,
                    icon: null,
                    closable: false,
                    className: "modal-ant-custom",
                    width: !!modalWidth ? modalWidth : 800,
                    footer: null,
                    content: (
                        <FormContainer
                            layout='vertical'
                            listColumn={!!listColumnModal ? listColumnModal : []}
                            onCloseModal={onCloseModal}
                            onSubmit={(values) => SubmitModel(values, 'update')}
                            dataSoure={record}
                            PKey={pKey}
                        />
                    )
                };

                objjd = modal.confirm(config);
            }
            else {
                navigate(`${elm.link + record[elm.keyId]}`);
            }
        } else {
            modal.confirm({
                title: 'Cảnh báo',
                icon: <ExclamationCircleOutlined />,
                content: 'Bạn có chắc muốn xóa?',
                okText: 'Đồng ý',
                cancelText: 'Hủy bỏ',
                onOk: () => onDelete(record)
            });
        }
    };

    const onDelete = async (values) => {
        console.log('values', values)
        if (apiDelete && hostName) {
            const response = await dispatch(_fetchData(hostName, apiDelete, values));
            Notification('Thông báo', response.message, response.iserror ? 'error' : 'success');
            if (!response.iserror) {
                onSelectRowItem?.(values);
                return
            }
        }
        onSelectRowItem?.(values);
    }

    const handlePageChange = (current, size) => {
        SetCurrentPage(current);
        SetpageSize(size);
    }

    const handlePageSizeChange = (page, pageSize) => {
        SetpageSize(pageSize);
    }

    const showLoadings = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 600);
    }

    const handleAdd = (index) => {
        showLoadings(index)
        checkNavige()
    }

    const handleSelectRowsDelete = (index) => {
        showLoadings(index)
        onDelete(selectedRows)
    }

    const checkNavige = () => {
        if (isShowModalBtn) {
            const config = {
                title:
                    <Row className="modal-header" type='flex' justify={'space-between'} align='middle'>
                        <h5 className="modal-title">{!!TitleModal ? `Thêm ${TitleModal}` : 'Thêm'}</h5>
                        <Button
                            onClick={onCloseModal}
                            icon={<CloseOutlined />}
                            type="text"
                            size='middle'
                            style={{ color: '#ff4d4f', padding: 0, width: 25, height: 25 }}
                        ></Button>
                    </Row>
                ,
                icon: null,
                closable: false,
                className: "modal-ant-custom",
                width: !!modalWidth ? modalWidth : 800,
                footer: null,
                content: (
                    <FormContainer
                        layout='vertical'
                        listColumn={!!listColumnModal ? listColumnModal : []}
                        onCloseModal={onCloseModal}
                        onSubmit={(values) => SubmitModel(values, 'insert')}
                    />
                )
            };

            objjd = modal.confirm(config);
        }
        else {
            navigate(urlAdd)
        }
    }

    const SubmitModel = async (values, action) => {
        const user = JSON.parse(localStorage.getItem('logininfo'))
        let apiPath = action == 'insert' ? apiAdd : apiUpdate;
        if (apiPath && hostName) {
            const response = await dispatch(_fetchData(hostName, apiPath, { ...values, username: user?.username }));
            Notification('Thông báo', response.message, response.iserror ? 'error' : 'success');
            if (!response.iserror) {
                onSubmitModel?.(values, action)
                onCloseModal();
                return
            }
        }
        onSubmitModel?.(values, action)
    }

    const confirm = (index) => {
        modal.confirm({
            title: 'Cảnh báo',
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn có chắc muốn xóa?',
            okText: 'Đồng ý',
            cancelText: 'Hủy bỏ',
            onOk: () => {
                handleSelectRowsDelete(index)
            }
        });
    };

    const handleImportExcel = async (data) => {
        if (apiImportExcel && hostName) {
            const response = await dispatch(_fetchData(hostName, apiImportExcel, data));
            Notification('Thông báo', response.message, response.iserror ? 'error' : 'success');
            if (!response.iserror) {
                onImportExcel?.(data)
                return
            }
        }
        onImportExcel?.(data)
    }

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    return (
        <>{!!title ? <Divider>{title}</Divider> : ""}
            {
                !!isShowHeaderAction && <Row type='flex' justify={'end'} align='middle' style={{ marginBottom: 5, gap: 5 }}>
                    {buttonItems && buttonItems.map((item, index) => <div key={index}>{item}</div>)}
                    {!!isExportTemplate && <ExcelExport
                        title='Xuất file mẫu'
                        name={fileTemplateName || 'File mẫu'}
                        sheets={[fileTempalteData || []]}
                    />}

                    {!!isExportExcel && <ExcelExport
                        title='Xuất file Excel'
                        name={fileName || `File dữ liệu ${genFileName()}`}
                        sheets={[excelData || []]}
                    />}

                    {!!isImportExcel && <ImportExcel
                        schema={schema}
                        check={checkFile}
                        rules={rules}
                        call={handleImportExcel}
                    />}

                    {!!isShowButtonAdd && <Button
                        onClick={() => handleAdd(2)}
                        size='middle'
                        htmlType='button'
                        loading={loadings[2]}
                    >
                        <PlusOutlined />Thêm
                    </Button>}

                    {!isDisableRowSelect && !!onSelectRowItem && <Button
                        onClick={() => confirm(1)}
                        size='middle'
                        danger
                        type='dashed'
                        htmlType='button'
                        disabled={disBtnDel}
                        loading={loadings[1]}
                    >
                        <DeleteOutlined />Xóa
                    </Button>}
                </Row>
            }
            <Col>
                <Table
                    rowSelection={!isDisableRowSelect ? rowSelection : false}
                    locale={locale}
                    dataSource={dataTable}
                    columns={columns}
                    size={!!size ? size : 'small'}
                    bordered={!!bordered ? bordered : 'enable'}
                    showHeader={!!showHeader ? showHeader : true}
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: dataTable.length,
                        showSizeChanger: !!showSizeChanger ? showSizeChanger : true,
                        pageSizeOptions: !!pageSizeOptions && pageSizeOptions.length > 0 ? pageSizeOptions : ['10', '20', '50', '100'],
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        onChange: (page, pageSize) => handlePageChange(page, pageSize),
                        onShowSizeChange: (current, size) => handlePageSizeChange(current, size),
                    }}
                    scroll={!!scroll ? scroll : {
                        x: 1000
                    }}
                />
            </Col>
            {contextHolder}
        </>
    );
}

export default DataGird;