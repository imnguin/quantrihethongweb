import React from "react";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { formatDate } from "../../../../utils";

export const PagePath = [{ href: "/", title: "Trang chủ" }, { title: "Danh sách item", }];
export const AddPagePath = [{ href: "/", title: "Trang chủ" }, { href: "/Item", title: "Danh sách item", }, { title: "Thêm mới", }];
export const EditPagePath = [{ href: "/", title: "Trang chủ" }, { href: "/Item", title: "Danh sách item", }, { title: "Chỉnh sửa", }];

export const columns = [
    {
        title: 'Mã item',
        dataIndex: 'itemid',
        key: 'itemid',
        render: (key, item) => (
            <Link key={key} to={`/detail/${item.itemid}`}>{item.itemid}</Link>
        ),
        fixed: 'left',
        width: 30,
    },
    {
        title: 'Tên item',
        dataIndex: 'itemname',
        key: 'itemname',
        width: 30,
    },
    {
        title: 'Đơn vị tính',
        dataIndex: 'quantityunitid',
        key: 'quantityunitid',
        render: (text, item) => (
            <span>{item?.quantityunitid} - {item?.quantityunitname}</span>
        ),
        width: 50,
    },
    {
        title: 'Mã nhóm hàng',
        dataIndex: 'productsubgroupid',
        key: 'productsubgroupid',
        render: (text, item) => (
            <span>{item?.productsubgroupid} - {item?.productsubgroupname}</span>
        ),
        width: 50,
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdat',
        key: 'createdat',
        width: 30,
        render: (text) => (formatDate(text))
    },
    {
        title: 'Tác vụ',
        key: 'groupAction',
        dataIndex: 'groupAction',
        align: 'center',
        width: 20,
        link: '/Item/Edit/',
        keyId: 'itemid',
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
        type: 'textbox',
        name: 'itemid',
        label: 'Mã item',
        labelCol: 24,
        rules: [
            {
                required: true,
                message: 'không được để trống!',
            },
        ]
    },
    {
        type: 'textbox',
        name: 'itemname',
        label: 'Tên item',
        labelCol: 24
    },
    {
        type: 'select',
        name: 'quantityunitid',
        label: 'Đơn vị tính',
        labelCol: 24,
        url: 'api/quantityunit/getCache',
        elementValue: 'quantityunitid',
        elementName: 'quantityunitname',
        value: -1
    },
    {
        type: 'select',
        name: 'productsubgroupid',
        label: 'Mã nhóm hàng',
        labelCol: 24,
        url: 'api/productsubgroup/getCache',
        elementValue: 'productsubgroupid',
        elementName: 'productsubgroupname',
        value: -1
    },
    {
        type: 'checkbox',
        name: 'isactivate',
        label: 'Kích hoạt',
        value: true
    },
    {
        type: 'checkbox',
        name: 'issystem',
        label: 'Hệ thống',
    },
]

export const fileTempalteData = {
    data: [
        ['Mã item', 'Tên item', 'Đơn vị tính', 'Mã nhóm sản phẩm', 'Kích hoạt', 'Hệ thống'],
        ['SP001', 'item 1', 1, 1, true, false],
        ['SP002', 'item 2', 1, 1, true, false],
        ['SP003', 'item 3', 1, 1, true, false],
    ],
};

export const schema = {
    "Mã item": {
        prop: 'itemid',
        type: String,
        required: true
    },
    "Tên item": {
        prop: 'itemname',
        type: String,
        required: true
    },
    "Đơn vị tính": {
        prop: 'quantityunitid',
        type: String,
        required: true
    },
    "Mã nhóm sản phẩm": {
        prop: 'productsubgroupid',
        type: Number,
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