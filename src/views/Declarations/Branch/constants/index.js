import React from "react";
import { Link } from "react-router-dom";

export const PagePath = [{ href: "/", title: "Trang chủ" }, { title: "Danh sách thương hiệu", }];
export const AddPagePath = [{ href: "/", title: "Trang chủ" }, {href: "/Branch", title: "Danh sách thương hiệu", }, { title: "Thêm mới", }];
export const EditPagePath = [{ href: "/", title: "Trang chủ" }, {href: "/Branch", title: "Danh sách thương hiệu", }, { title: "Chỉnh sửa", }];

export const columns = [
    {
        title: 'Mã thương hiệu',
        dataIndex: 'branchid',
        key: 'branchid',
        render: (key, item) => (
            <Link key={key} to={`/detail/${item.branchid}`}>{item.branchid}</Link>
        ),
        fixed: 'left',
        width: 100,
    },
    {
        title : 'Tên thương hiệu',
        dataIndex : 'branchname',
        key : 'branchname',
        width: 100,
    },
    {
        title: 'Tác vụ',
        key: 'groupAction',
        dataIndex: 'groupAction',
        align: 'center',
        width: 20,
        link: '/Branch/Edit/',
        keyId: 'branchid',
    },
];

export const SearchElement = [
    {
        type: 'TextBox',
        label : 'Tìm kiếm',
        name : 'keyword',
        placeholder : 'Nhập từ khóa tìm kiếm'
    },
];

export const ElementList = [
    {
        type : 'textbox',
        name : 'branchid',
        label : 'Mã thương hiệu',
        labelCol : 24,
        rules :[
            {
              required: true,
              message: 'không được để trống!',
            },
        ]
    },
    {
        type : 'textbox',
        name : 'branchname',
        label : 'Tên thương hiệu',
        labelCol : 24
    },
    {
        type : 'checkbox',
        name : 'isactivate',
        label : 'Kích hoạt',
        value: true
    },
    {
        type : 'checkbox',
        name : 'issystem',
        label : 'Hệ thống',
    },
]