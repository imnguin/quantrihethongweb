import React from "react";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { formatDate } from "../../../../utils";

export const PagePath = [{ href: "/", title: "Trang chủ" }, { title: "Danh sách sản phẩm", }];
export const AddPagePath = [{ href: "/", title: "Trang chủ" }, { href: "/User", title: "Danh sách sản phẩm", }, { title: "Thêm mới", }];
export const EditPagePath = [{ href: "/", title: "Trang chủ" }, { href: "/User", title: "Danh sách sản phẩm", }, { title: "Chỉnh sửa", }];

export const columns = [
    {
        title: 'Mã sản phẩm',
        dataIndex: 'productid',
        key: 'productid',
        render: (key, item) => (
            <Link key={key} to={`/detail/${item.productid}`}>{item.productid}</Link>
        ),
        fixed: 'left',
        width: 30,
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'productname',
        key: 'productname',
        width: 30,
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
        link: '/User/Edit/',
        keyId: 'productid',
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
        name: 'productid',
        label: 'Mã sản phẩm',
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
        name: 'productname',
        label: 'Tên sản phẩm',
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
        name: 'brandid',
        label: 'Nhà sản xuất',
        labelCol: 24,
        url: 'api/brand/getCache',
        elementValue: 'brandid',
        elementName: 'brandname',
        value: -1
    },
    {
        type: 'select',
        name: 'branchid',
        label: 'Thương hiệu',
        labelCol: 24,
        url: 'api/branch/getCache',
        elementValue: 'branchid',
        elementName: 'branchname',
        value: -1
    },
    {
        type: 'textarea',
        name: 'description',
        label: 'Mô tả',
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
        ['Mã sản phẩm', 'Tên sản phẩm', 'Đơn vị tính', 'Nhà sản xuất', 'Thương hiệu', 'Mô tả', 'Kích hoạt', 'Hệ thống'],
        ['SP001', 'Sản phẩm 1', 1, 1, 1, 'Mô tả', true, false],
        ['SP002', 'Sản phẩm 2', 1, 2, 2, 'Mô tả', true, false],
        ['SP003', 'Sản phẩm 3', 1, 3, 3, 'Mô tả', true, false],
    ],
};

export const schema = {
    "Mã sản phẩm": {
        prop: 'productid',
        type: String,
        required: true
    },
    "Tên sản phẩm": {
        prop: 'productname',
        type: String,
        required: true
    },
    "Đơn vị tính": {
        prop: 'quantityunitid',
        type: String,
        required: true
    },
    "Nhà sản xuất": {
        prop: 'brandid',
        type: Number,
        required: true
    },
    "Thương hiệu": {
        prop: 'branchid',
        type: Number,
        required: true
    },
    "Mô tả": {
        prop: 'description',
        type: String,
        required: false
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