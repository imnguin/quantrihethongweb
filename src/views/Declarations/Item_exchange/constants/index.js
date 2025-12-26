import React from "react";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { formatDate } from "../../../../utils";

export const PagePath = [{ href: "/", title: "Trang chủ" }, { title: "Danh sách sản phẩm quy đổi", }];
export const AddPagePath = [{ href: "/", title: "Trang chủ" }, { href: "/Item", title: "Danh sách sản phẩm quy đổi", }, { title: "Thêm mới", }];
export const EditPagePath = [{ href: "/", title: "Trang chủ" }, { href: "/Item", title: "Danh sách sản phẩm quy đổi", }, { title: "Chỉnh sửa", }];

export const columns = [
    {
        title: 'Mã item',
        dataIndex: 'itemid',
        key: 'itemid',
        render: (key, item) => (
            <Link key={key} to={`/detail/${item.itemid}`}>{item.itemid} - {item.itemname}</Link>
        ),
        fixed: 'left',
        width: 50,
    },
    {
        title: 'Sản phẩm quy đổi',
        dataIndex: 'productid',
        key: 'productid',
        render: (text, item) => (
            <span>{item?.productid} - {item?.productname}</span>
        ),
        width: 50,
    },
    {
        title: 'Số lượng quy đổi',
        dataIndex: 'exchangequantity',
        key: 'exchangequantity',
        width: 20,
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdat',
        key: 'createdat',
        width: 20,
        render: (text) => (formatDate(text))
    },
    {
        title: 'Tác vụ',
        key: 'groupAction',
        dataIndex: 'groupAction',
        align: 'center',
        width: 10,
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
        type: 'select',
        name: 'productid',
        label: 'Sản phẩm quy đổi',
        labelCol: 24,
        url: 'api/product/getCache',
        elementValue: 'productid',
        elementName: 'productname',
        value: -1
    },
    {
        type: 'select',
        name: 'itemid',
        label: 'Item',
        labelCol: 24,
        url: 'api/item/getCache',
        elementValue: 'itemid',
        elementName: 'itemname',
        value: -1
    },
    {
        type: 'textbox',
        name: 'exchangequantity',
        label: 'Số luợng quy đổi',
        labelCol: 24
    },
    {
        type: 'checkbox',
        name: 'isactivate',
        label: 'Kích hoạt',
        value: true,
        span: 24
    },
    {
        type: 'checkbox',
        name: 'issystem',
        label: 'Hệ thống',
        span: 24,
    },
]

export const fileTempalteData = {
    data: [
        ['Mã item', 'Mã sản phẩm quy đổi', 'Số lượng quy đổi', 'Kích hoạt', 'Hệ thống'],
        ['11222', '4241412000844', 10, true, false],
    ],
};

export const schema = {
    "Mã item": {
        prop: 'itemid',
        type: String,
        required: true
    },
    "Mã sản phẩm quy đổi": {
        prop: 'productid',
        type: String,
        required: true
    },
    "Số lượng quy đổi": {
        prop: 'exchangequantity',
        type: Number,
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