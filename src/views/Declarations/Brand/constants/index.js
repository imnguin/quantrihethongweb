import React from "react";
import { Link } from "react-router-dom";

export const PagePath = [{ href: "/", title: "Trang chủ" }, { title: "Danh sách nhà sản xuất", }];
export const AddPagePath = [{ href: "/", title: "Trang chủ" }, {href: "/Brand", title: "Danh sách nhà sản xuất", }, { title: "Thêm mới", }];
export const EditPagePath = [{ href: "/", title: "Trang chủ" }, {href: "/Brand", title: "Danh sách nhà sản xuất", }, { title: "Chỉnh sửa", }];

export const columns = [
    {
        title: 'Mã nhà sản xuất',
        dataIndex: 'brandid',
        key: 'brandid',
        render: (key, item) => (
            <Link key={key} to={`/detail/${item.brandid}`}>{item.brandid}</Link>
        ),
        fixed: 'left',
        width: 100,
    },
    {
        title : 'Tên nhà sản xuất',
        dataIndex : 'brandname',
        key : 'brandname',
        width: 100,
    },
    {
        title: 'Tác vụ',
        key: 'groupAction',
        dataIndex: 'groupAction',
        align: 'center',
        width: 20,
        link: '/Brand/Edit/',
        keyId: 'brandid',
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
        name : 'brandid',
        label : 'Mã nhà sản xuất',
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
        name : 'brandname',
        label : 'Tên nhà sản xuất',
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