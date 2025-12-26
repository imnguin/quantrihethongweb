import React from "react";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const PagePath = [{ href: "/", title: "Trang chủ" }, { title: "Danh sách nhóm sản phẩm", }];
export const AddPagePath = [{ href: "/", title: "Trang chủ" }, { href: "/Product_sub", title: "Danh sách nhóm sản phẩm", }, { title: "Thêm mới", }];
export const EditPagePath = [{ href: "/", title: "Trang chủ" }, { href: "/Product_sub", title: "Danh sách nhóm sản phẩm", }, { title: "Chỉnh sửa", }];

export const fileTempalteData = {
    data: [
        ['Mã nhóm sản phẩm', 'Tên nhóm sản phẩm', 'Kích hoạt', 'Hệ thống'],
        ['1', 'Nhóm sản phẩm 1', true, false],
    ],
};

export const schema = {
    "Mã nhóm sản phẩm": {
        prop: 'productsubgroupid',
        type: String,
        required: true
    },
    "Tên nhóm sản phẩm": {
        prop: 'productsubgroupname',
        type: String,
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

export const columns = [
    {
        title: 'Mã nhóm sản phẩm',
        dataIndex: 'productsubgroupid',
        key: 'productsubgroupid',
        render: (key, item) => (
            <Link key={key} to={`/detail/${item.productsubgroupid}`}>{item.productsubgroupid}</Link>
        ),
        fixed: 'left',
        width: 100,
    },
    {
        title: 'Tên nhóm sản phẩm',
        dataIndex: 'productsubgroupname',
        key: 'productsubgroupname',
        width: 100,
    },
    {
        title: 'Tác vụ',
        key: 'groupAction',
        dataIndex: 'groupAction',
        align: 'center',
        width: 20,
        link: '/Product_sub/Edit/',
        keyId: 'productsubgroupid',
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
        name: 'productsubgroupid',
        label: 'Mã nhóm sản phẩm',
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
        name: 'productsubgroupname',
        label: 'Tên nhóm sản phẩm',
        labelCol: 24
    },
    {
        type: 'checkbox',
        name: 'isactivate',
        label: 'Kích hoạt'
    },
    {
        type: 'checkbox',
        name: 'issystem',
        label: 'Hệ thống',
    },
]