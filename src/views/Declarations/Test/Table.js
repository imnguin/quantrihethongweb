import { Button, Empty, Table } from "antd";
import React, { useEffect, useState } from "react";

const Aa = (props) => {
    let {
        pKey,
        dataSource
    } = props;
    
    const data = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe ưdsfdsf' },
        // Thêm dữ liệu khác nếu cần
    ];
    const [dataTable, SetDataTable] = useState([]);
    const [currentPage, SetCurrentPage] = useState(1);
    const [pageSize, SetpageSize] = useState(1);

    useEffect(() => {
        const data = prepareData(dataSource);
        SetDataTable(data);
    }, [dataSource]);

    const prepareData = (data) => {
        const tempData = data?.map((item, index) => {
            return {
                ...item,
                key : `${item[pKey]} -  ${index}`
            }
        });
        return !!tempData ?? [];
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button onClick={() => handleAction(record.id)}>Action</Button>
            ),
        },
    ];

    const handleAction = (id) => {
        // Xử lý logic khi nút Action được nhấp
        console.log(`Action clicked for ID ${id}`);
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

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const onSelectAll = (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
        const selectedKeys = selected
          ? data.map((row) => row.id)
          : [];
        setSelectedRowKeys(selectedKeys);
      };
      const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(selectedRowKeys, selectedRows)
          setSelectedRowKeys(selectedRowKeys);
          setSelectedRows(selectedRows);
        },
        onSelectAll: onSelectAll,
      };      

    return <Table
        rowSelection={rowSelection}
        locale={locale}
        dataSource={dataTable}
        columns={columns}
        size="small"
        bordered="enable"
        showHeader={true}
        pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: dataTable.length,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50', '100'],
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            onChange: (page, pageSize) => handlePageChange(page, pageSize),
            onShowSizeChange: (current, size) => handlePageSizeChange(current, size),
          }}
        scroll={{
            x : 1000
        }}
    />;
}

export default Aa;