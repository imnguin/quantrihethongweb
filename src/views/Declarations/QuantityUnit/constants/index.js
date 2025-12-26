import React from "react";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const PagePath = [{ href: "/", title: "Trang chủ" }, { title: "Danh sách đơn vị tính", }];
export const AddPagePath = [{ href: "/", title: "Trang chủ" }, {href: "/User", title: "Danh sách đơn vị tính", }, { title: "Thêm mới", }];
export const EditPagePath = [{ href: "/", title: "Trang chủ" }, {href: "/User", title: "Danh sách đơn vị tính", }, { title: "Chỉnh sửa", }];

export const columns = [
    {
        title: 'Mã đơn vị tính',
        dataIndex: 'quantityunitid',
        key: 'quantityunitid',
        render: (key, item) => (
            <Link key={key} to={`/detail/${item.quantityunitid}`}>{item.quantityunitid}</Link>
        ),
        fixed: 'left',
        width: 100,
    },
    {
        title : 'Tên đơn vị tính',
        dataIndex : 'quantityunitname',
        key : 'quantityunitname',
        width: 100,
    },
    {
        title: 'Tác vụ',
        key: 'groupAction',
        dataIndex: 'groupAction',
        align: 'center',
        width: 20,
        link: '/User/Edit/',
        keyId: 'quantityunitid',
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
        name : 'quantityunitid',
        label : 'Mã đơn vị tính',
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
        name : 'quantityunitname',
        label : 'Tên đơn vị tính',
        labelCol : 24
    },
    {
        type : 'checkbox',
        name : 'isactivate',
        label : 'Kích hoạt'
    },
    {
        type : 'checkbox',
        name : 'issystem',
        label : 'Hệ thống',
    },
]