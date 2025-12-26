import React from "react";
import { Badge, Button, Input, InputNumber, Typography } from "antd";
import { DeleteOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { formatDate } from "../../../../utils";
const now = new Date();

// Tạo fromDate là ngày 1 đầu tháng (giờ 00:00:00)
const fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);

// Tạo toDate là hôm nay (giờ 23:59:59.999)
const toDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
export const PagePath = [{ href: "/", title: "Trang chủ" }, { title: "Hóa đơn bán hàng", }];

export const addProductColunms = [
    {
        type: 'textbox',
        name: 'barcode',
        rules: [
            {
                required: true,
                message: 'không được để trống!',
            },
        ],
        label: 'Barcode',
        placeholder: 'Nhập barcode',
        labelCol: 24, colSpan: 24
    }
];

export const columns = (handleQuantityChange, handleRemoveItem, handleApplyDiscount, getWeight) => {
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
            render: (price) => parseFloat(price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
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
                    onChange={(value) => handleQuantityChange(record.productid, value)}
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
            title: 'Giảm giá',
            dataIndex: 'promotion',
            key: 'promotion',
            align: 'center',
            render: (promotion, record) => (
                <Input
                    value={promotion}
                    onChange={(e) => handleApplyDiscount(record.productid, e.target.value)}
                    style={{ width: '80px' }}
                />
            ),
        },
        {
            title: 'Khách phải trả',
            dataIndex: 'totalamount',
            key: 'totalamount',
            align: 'center',
            render: (_, record) => parseFloat(record.totalamount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
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
        placeholder: 'Nhập mã hóa đơn'
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

export const historyColumns = (data) => {
    return [
        {
            title: (<span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span>Mã hóa đơn</span>
                <Badge
                    count={data.length || 0}
                    overflowCount={999}
                    style={{ backgroundColor: '#1677FF', marginLeft: 8 }}
                />
            </span>),
            dataIndex: 'outputvoucherid',
            key: 'outputvoucherid',
            render: (key, item) => (
                <Link key={key} to={`/OutputVoucher/Detail/${item.outputvoucherid}`}>{item.outputvoucherid}</Link>
            ),
            fixed: 'left',
            width: 100,
            align: 'center',
        },
        {
            title: (<span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span>Tiền thu của khách</span>
                <Badge
                    count={data.reduce((sum, order) => sum + order.totalamount, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    overflowCount={999}
                    style={{ backgroundColor: '#1677FF', marginLeft: 8 }}
                />
            </span>),
            dataIndex: 'totalamount',
            key: 'totalamount',
            render: (totalamount) => {
                return parseFloat(totalamount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            },
            width: 100,
            align: 'center',
        },
        {
            title: (<span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span>Tiền giảm giá</span>
                <Badge
                    count={data.reduce((sum, order) => sum + order.promotion, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    overflowCount={999}
                    style={{ backgroundColor: '#1677FF', marginLeft: 8 }}
                />
            </span>),
            dataIndex: 'promotion',
            key: 'promotion',
            render: (promotion) => {
                return parseFloat(promotion).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            },
            width: 100,
            align: 'center',
        },
        {
            title: 'Ngày lập hóa đơn',
            dataIndex: 'createdat',
            key: 'createdat',
            render: (text) => (formatDate(text)),
            width: 100,
            align: 'center'
        }
    ]
};

export const outputvoucherDetailColumns = [
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
        title: 'Giảm giá',
        dataIndex: 'promotion',
        key: 'promotion',
        align: 'center',
        width: 100,
        render: (promotion) => parseFloat(promotion).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
    },
    {
        title: 'Thành tiền',
        key: 'totalamount',
        dataIndex: 'totalamount',
        align: 'center',
        width: 100,
        render: (totalamount) => parseFloat(totalamount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
    },
]

export const ReportOutputVoucherDetailColumns = [
    {
        title: 'Mã hóa đơn',
        dataIndex: 'outputvoucherid',
        key: 'outputvoucherid',
        render: (key, item) => (
            <Link key={key} to={`/OutputVoucher/Detail/${item.outputvoucherid}`}>{item.outputvoucherid}</Link>
        ),
        fixed: 'left',
        width: 100,
        align: 'center',
        isSearch: true
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
        title: 'Giảm giá',
        dataIndex: 'promotion',
        key: 'promotion',
        align: 'center',
        width: 100,
        render: (promotion) => parseFloat(promotion).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
    },
    {
        title: 'Thành tiền',
        key: 'totalamount',
        dataIndex: 'totalamount',
        align: 'center',
        width: 100,
        render: (totalamount) => parseFloat(totalamount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
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