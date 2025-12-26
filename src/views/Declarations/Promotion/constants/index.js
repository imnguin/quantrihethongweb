import React from "react";
import { formatDate } from "../../../../utils";
export const PagePath = [{ href: "/", title: "Trang chủ" }, { title: "Danh sách khuyến mãi", }];
export const AddPagePath = [{ href: "/", title: "Trang chủ" }, { href: "/Promotion", title: "Danh sách khuyến mãi", }, { title: "Thêm mới", }];
export const EditPagePath = [{ href: "/", title: "Trang chủ" }, { href: "/Promotion", title: "Danh sách khuyến mãi", }, { title: "Chỉnh sửa", }];

export const columns = [
    {
        title: 'Mã sản phẩm',
        dataIndex: 'productid',
        key: 'productid',
        render: (key, item) => (
            <>{item.productid}</>
        ),
        fixed: 'left',
        width: 100,
    },
    {
        title: 'Loại khuyến mãi',
        dataIndex: 'promotiontypeid',
        key: 'promotiontypeid',
        width: 100,
    },
    {
        title: 'Số lượng mua',
        dataIndex: 'salequantity',
        key: 'salequantity',
        width: 100,
    },
    {
        title: 'Số lượng khuyến mãi',
        dataIndex: 'promotionquantity',
        key: 'promotionquantity',
        width: 100,
    },
    {
        title: 'Áp dụng từ ngày',
        dataIndex: 'applydatefrom',
        key: 'applydatefrom',
        width: 100,
        render: (text) => (formatDate(text))
    },
    {
        title: 'Áp dụng đến ngày',
        dataIndex: 'applydateto',
        key: 'applydateto',
        width: 100,
        render: (text) => (formatDate(text))
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
        width: 100,
    },
    {
        title: 'Tác vụ',
        key: 'groupAction',
        dataIndex: 'groupAction',
        align: 'center',
        width: 30,
        link: '/price/Edit/',
        keyId: 'prouductid',
    },
];

export const SearchElement = [
    {
        type: 'TextBox',
        label: 'Tìm kiếm',
        name: 'keyword',
        placeholder: 'Nhập từ khóa tìm kiếm'
    },
];

export const ElementList = [
    {
        type: 'select',
        name: 'productid',
        label: 'Sản phẩm',
        labelCol: 24,
        url: 'api/product/getCache',
        elementValue: 'productid',
        elementName: 'productname',
        value: -1
    },
    {
        type: 'select',
        name: 'promotiontypeid',
        label: 'Loại khuyến mãi',
        labelCol: 24,
        value: -1,
        listOptions: [
            { value: 1, label: 'Giảm giá' },
            { value: 2, label: 'Tặng quà' },
            { value: 3, label: 'Mua 1 tặng 1' },
        ]
    },
    {
        type: 'textbox',
        name: 'salequantity',
        label: 'Số lượng mua',
        labelCol: 24
    },
    {
        type: 'textbox',
        name: 'promotionquantity',
        label: 'Số lượng khuyến mãi',
        labelCol: 24
    },
    {
        type: 'datepicker',
        label: 'Áp dụng từ ngày',
        labelCol: 24,
        name: 'applydatefrom',
        defaultValue: new Date(),
    },
    {
        type: 'datepicker',
        label: 'Áp dụng đến ngày',
        labelCol: 24,
        name: 'applydateto',
        defaultValue: new Date(),
    },
    {
        type: 'textarea',
        name: 'description',
        label: 'Mô tả',
        labelCol: 24,
    },
    {
        type: 'checkbox',
        name: 'isactivate',
        label: 'Kích hoạt',
        value: true,
        labelCol: 24,
    },
    {
        type: 'checkbox',
        name: 'issystem',
        label: 'Hệ thống',
        labelCol: 24,
    },
]

export const fileTempalteData = {
    data: [
        ['Mã sản phẩm', 'Loại khuyến mãi', 'Số lượng mua', 'Số lượng khuyến mãi', 'Mô tả', 'Áp dụng từ ngày', 'Áp dụng đến ngày', 'Kích hoạt', 'Hệ thống'],
        ['P001', '1', '2', '1', 'Khuyến mãi đặc biệt', '2023-01-01', '2023-12-31', true, false],
        ['P002', '2', '1', '1', 'Mua 1 tặng 1', '2023-02-01', '2023-11-30', true, false],
    ],
};

export const schema = {
    "Mã sản phẩm": {
        prop: 'productid',
        type: String,
        required: true
    },
    "Loại khuyến mãi": {
        prop: 'promotiontypeid',
        type: Number,
        required: true
    },
    "Số lượng mua": {
        prop: 'salequantity',
        type: Number,
        required: true
    },
    "Số lượng khuyến mãi": {
        prop: 'promotionquantity',
        type: Number,
        required: true
    },
    "Mô tả": {
        prop: 'description',
        type: String,
        required: true
    },
    "Áp dụng từ ngày": {
        prop: 'applydatefrom',
        type: Date,
        required: true
    },
    "Áp dụng đến ngày": {
        prop: 'applydateto',
        type: Date,
        required: true
    },
    "Kích hoạt": {
        prop: 'isactivate',
        type: Boolean,
        required: false
    },
    "Hệ thống": {
        prop: 'issystem',
        type: Boolean,
        required: false
    }
};