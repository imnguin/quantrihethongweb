import React from "react";
import { Button, Input, InputNumber, Select, Typography } from "antd";
import { DeleteOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { formatDate } from "../../../../utils";
const now = new Date();

// Tạo fromDate là ngày 1 đầu tháng (giờ 00:00:00)
const fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);

// Tạo toDate là hôm nay (giờ 23:59:59.999)
const toDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
export const PagePath = [{ href: "/", title: "Trang chủ" }, { title: "Nhập hàng", }];

export const columns = (handleChangeValue, handleRemoveItem, getWeight, customers = []) => {
    return [
        {
            title: 'Sản phẩm',
            dataIndex: 'productid',
            key: 'productid',
            align: 'center',
            render: (productid, record) => (
                <Typography.Text>{record?.productname}</Typography.Text>
            ),
        },
        {
            title: 'Barcode',
            dataIndex: 'barcode',
            key: 'barcode',
            align: 'center',
        },
        {
            title: 'ĐVT',
            dataIndex: 'quantityunitname',
            key: 'quantityunitname',
            align: 'center',
            render: (_, record) => {
                let type = record.quantityunitid == 19 ? 'danger' : '';
                return <Typography.Text type={type}>{record.quantityunitname}</Typography.Text>
            }
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            render: (price, record) => (
                <InputNumber
                    value={price}
                    onChange={(value) => handleChangeValue(record.productid, 'price', value)}
                    style={{ width: '80px' }}
                />
            ),
        },
        {
            title: 'SL',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            render: (quantity, record) => (
                <InputNumber
                    min={0}
                    max={record.stock}
                    value={quantity}
                    onChange={(value) => handleChangeValue(record.productid, 'quantity', value)}
                    style={{ width: '90px' }}
                />
            ),
        },
        {
            title: 'Thành tiền',
            key: 'totalprice',
            align: 'center',
            render: (_, record) => (record.quantity * record.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        },
        {
            title: 'Link ảnh',
            key: 'imageurl',
            align: 'center',
            render: (_, record) => (
                <Input
                    value={record.imageurl}
                    onChange={(e) => handleChangeValue(record.productid, 'imageurl', e.target.value)}
                    style={{ width: '80px' }}
                />
            ),
        },
        {
            title: 'Khách hàng',
            dataIndex: 'customerid',
            key: 'customerid',
            align: 'center',
            render: (customerid, record) => (
                <Select
                    defaultValue={customerid}
                    allowClear
                    showSearch
                    style={{ width: '100%' }}
                    onChange={(val) => handleChangeValue(record.productid, 'customerid', val)}
                    filterOption={(input, option) =>
                        option.value
                            .toString()
                            .toLowerCase()
                            .includes(input.toLowerCase()) ||
                        option.label.toLowerCase().includes(input.toLowerCase())
                    }
                >
                    {
                        customers.map((item, index) => {
                            return (<Select.Option value={item.customerid} key={index} label={item.customername}>{`${item.customerid} - ${item.customername}`}</Select.Option>)
                        })
                    }
                </Select>
            ),
            width: 200,
        },
        {
            title: 'Tác vụ',
            key: 'action',
            align: 'center',
            render: (_, record) => {
                return (
                    <div>
                        <Button disabled={record.quantityunitid == 19 ? false : true} type="link" onClick={() => getWeight(record.productid)} >Lấy cân</Button>
                        <Button type="link" danger onClick={() => handleRemoveItem(record.productid)} icon={<DeleteOutlined />} />
                    </div>
                )
            },
            width: 150,
        },
    ]
}

export const SearchElement = [
    {
        type: 'TextBox',
        label: 'Tìm kiếm',
        name: 'keyword',
        placeholder: 'Nhập mã phiếu nhập'
    },
    {
        type: 'DatePicker',
        label: 'Từ ngày',
        name: 'fromdate',
        defaultValue: fromDate
    },
    {
        type: 'DatePicker',
        label: 'Đến ngày',
        name: 'todate',
        defaultValue: toDate
    },
];

export const InitParam = {
    fromdate: fromDate,
    todate: toDate
}

export const historyColumns = [
    {
        title: 'Mã phiếu nhập',
        dataIndex: 'inputvoucherid',
        key: 'inputvoucherid',
        render: (key, item) => (
            <Link key={key} to={`/InputVoucher/Detail/${item.inputvoucherid}`}>{item.inputvoucherid}</Link>
        ),
        fixed: 'left',
        width: 100,
        align: 'center',
    },
    {
        title: 'Tổng tiền',
        dataIndex: 'totalamount',
        key: 'totalamount',
        render: (totalamount) => parseFloat(totalamount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        width: 100,
        align: 'center',
    },
    {
        title: 'Khách hàng',
        dataIndex: 'customerid',
        key: 'customerid',
        render: (_, record) => `${record.customerid} - ${record.customername}`,
        width: 100,
        align: 'center',
    },
    {
        title: 'Ngày lập phiếu nhập',
        dataIndex: 'createdat',
        key: 'createdat',
        render: (text) => (formatDate(text)),
        width: 100,
        align: 'center'
    }
];

export const inputvoucherDetailColumns = [
    {
        title: 'Sản phẩm',
        dataIndex: 'productid',
        key: 'productid',
        render: (key, item) => (
            <>{item.productid} - {item.productname}</>
        ),
        align: 'center',
        width: 150,
    },
    {
        title: 'Barcode',
        dataIndex: 'barcode',
        key: 'barcode',
        align: 'center',
        width: 100,
    },
    {
        title: 'Đơn vị tính',
        dataIndex: 'quantityunitname',
        key: 'quantityunitname',
        width: 100,
        align: 'center',
    },
    {
        title: 'Đơn giá',
        dataIndex: 'price',
        key: 'price',
        render: (price) => parseFloat(price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        width: 100,
        align: 'center',
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
        key: 'quantity',
        width: 50,
        align: 'center',
    },
    {
        title: 'Khách hàng',
        dataIndex: 'customer',
        key: 'customer',
        align: 'center',
        width: 100,
        render: (customer, record) => (`${record.customerid} - ${record.customername}`),
    },
    {
        title: 'Thành tiền',
        key: 'totalamount',
        dataIndex: 'totalamount',
        align: 'center',
        width: 100,
        render: (totalamount, record) => (record.quantity * record.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
    },
    {
        title: 'Ảnh',
        dataIndex: 'imageurl',
        key: 'imageurl',
        render: (key, item) => (
            <Link key={key} to={item.imageurl}>Xem ảnh</Link>
        ),
        fixed: 'left',
        width: 100,
        align: 'center',
    },
];

export const ReportInputVoucherDetailColumns = [
    {
        title: 'Mã phiếu nhập',
        dataIndex: 'inputvoucherid',
        key: 'inputvoucherid',
        render: (key, item) => (
            <Link key={key} to={`/InputVoucher/Detail/${item.inputvoucherid}`}>{item.inputvoucherid}</Link>
        ),
        fixed: 'left',
        width: 100,
        align: 'center',
    },
    {
        title: 'Sản phẩm',
        dataIndex: 'productid',
        key: 'productid',
        render: (key, item) => (
            <>{item.productid} - {item.productname}</>
        ),
        align: 'center',
        width: 150,
    },
    {
        title: 'Barcode',
        dataIndex: 'barcode',
        key: 'barcode',
        align: 'center',
        width: 100,
    },
    {
        title: 'Đơn vị tính',
        dataIndex: 'quantityunitname',
        key: 'quantityunitname',
        width: 100,
        align: 'center',
    },
    {
        title: 'Đơn giá',
        dataIndex: 'price',
        key: 'price',
        render: (price) => parseFloat(price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        width: 100,
        align: 'center',
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
        key: 'quantity',
        width: 50,
        align: 'center',
    },
    {
        title: 'Khách hàng',
        dataIndex: 'customer',
        key: 'customer',
        align: 'center',
        width: 100,
        render: (customer, record) => (`${record.customerid} - ${record.customername}`),
    },
    {
        title: 'Thành tiền',
        key: 'totalamount',
        dataIndex: 'totalamount',
        align: 'center',
        width: 100,
        render: (totalamount, record) => (record.quantity * record.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
    },
    {
        title: 'Ảnh',
        dataIndex: 'imageurl',
        key: 'imageurl',
        render: (key, item) => (
            <Link key={key} to={item.imageurl}>Xem ảnh</Link>
        ),
        fixed: 'left',
        width: 100,
        align: 'center',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdat',
        key: 'createdat',
        render: (text) => (formatDate(text)),
        width: 100,
        align: 'center'
    }
];