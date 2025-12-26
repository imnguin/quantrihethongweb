import { Button, Col, Divider, Empty, Modal, Row, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../FormContainer";

const DataGird2 = (props) => {
    let {
        title,
        pKey,
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
        isShowModalBtnAdd,
        TitleModal,
        modalWidth,
        listColumnModel,
        onSubmitModel,
        onDeleteItem,
    } = props;

    const [modal, contextHolder] = Modal.useModal();
    const navigate = useNavigate();
    let objjd = null;
    const onCloseModal = () => {
        objjd.destroy();
    }

    const [columns, Setcolumns] = useState([]);
    const [dataTable, SetDataTable] = useState([]);
    const [currentPage, SetCurrentPage] = useState(!!defaultCurrentPage ? defaultCurrentPage : 1);
    const [pageSize, SetpageSize] = useState(!!defaultPageSize ? defaultPageSize : 1);
    const [loadings, setLoadings] = useState([]);
    const [disBtnDel, setDisBtnDel] = useState(true);

    const locale = {
        emptyText: (
            <Empty
                imageStyle={{
                    height: 40,
                }}
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
                        <Link to={`${item.link + record[item.name]}`} key={item.key}>{!!item.icon ? item.icon : 'Edit'}</Link>
                    </Space>
                )
            }
            if (item.dataIndex == 'delete') {
                item.render = (_, record) => (
                    <Space size="middle">
                        <Button type='primary' ghost={true} style={{ border: 0, color: '#ff1616' }} onClick={() => handleClickIcon(record, 2)} size={"small"} >
                            {!!item.icon ? item.icon : 'Delete'}
                        </Button>
                    </Space>
                )
            }
            if (item.dataIndex == 'groupAction') {
                item.render = (_, record) => (
                    <Space size="middle">
                        <Link to={`${item.link + record.id}`}><EditOutlined /></Link>
                        <Button type='primary' ghost={true} style={{ border: 0, color: '#ff1616' }} onClick={() => handleClickIcon(record, 2)} icon={<DeleteOutlined />} size={"small"} />
                    </Space>
                )
            }
            return colums.push(item)
        })

        return colums
    }

    const handleClickIcon = (record, type) => {
        if(type == 1)
        {

        }else{
            onDeleteItem?.(record);
        }
    };

    const handlePageChange = (current, size) => {
        console.log('handlePageChange', current, size);
        SetCurrentPage(current);
        SetpageSize(size);
    }

    const handlePageSizeChange = (page, pageSize) => {
        console.log('handlePageChange', page, pageSize);
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
        onSelectRowItem?.(selectedRowKeys, selectedRows)
    }

    const checkNavige = () => {
        if (isShowModalBtnAdd) {
            const config = {
                title:
                    <Row className="modal-header" type='flex' justify={'space-between'} align='middle'>
                        <h5 className="modal-title">{!!TitleModal ? TitleModal : 'Thêm'}</h5>
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
                    <FormContainer layout='vertical' listColumn={!!listColumnModel ? listColumnModel : []} onCloseModal={onCloseModal} onSubmit={SubmitModel}></FormContainer>
                )
            };

            objjd = modal.confirm(config);
        }
        else {
            console.log("onSelectRowItem", urlAdd, isShowModalBtnAdd)

            navigate(urlAdd)
        }
    }

    const SubmitModel = (values) => {
        onSubmitModel?.(values)
    }

    return (
        <>{!!title ? <Divider>{title}</Divider> : ""}
            {
                !!isShowHeaderAction && <Row type='flex' justify={'end'} align='middle' style={{ marginBottom: 5, }}>
                    {!!isShowButtonAdd && <Button
                        onClick={() => handleAdd(2)}
                        size='middle'
                        htmlType='button'
                        loading={loadings[2]}
                    >
                        <PlusOutlined />Thêm
                    </Button>}

                    {!!onSelectRowItem && <Button
                        onClick={() => handleSelectRowsDelete(1)}
                        size='middle'
                        danger
                        type='dashed'
                        htmlType='button'
                        disabled={disBtnDel}
                        loading={loadings[1]}
                        style={{ marginLeft: 5 }}
                    >
                        <DeleteOutlined />Xóa
                    </Button>}
                </Row>
            }
            <Col>
                <Table
                    rowSelection={rowSelection}
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
                />;
            </Col>
            {contextHolder}
        </>
    );
}

export default DataGird2;