import React from "react";
import { Link } from "react-router-dom";

export const PagePath = [{ href: "/", title: "Trang chủ" }, { title: "Danh sách khách hàng", }];
export const AddPagePath = [{ href: "/", title: "Trang chủ" }, { href: "/Customer", title: "Danh sách khách hàng", }, { title: "Thêm mới", }];
export const EditPagePath = [{ href: "/", title: "Trang chủ" }, { href: "/Customer", title: "Danh sách khách hàng", }, { title: "Chỉnh sửa", }];

export const columns = [
    {
        title: 'Mã khách hàng',
        dataIndex: 'customerid',
        key: 'customerid',
        render: (key, item) => (
            <Link key={key} to={`/detail/${item.customerid}`}>{item.customerid}</Link>
        ),
        fixed: 'left',
        width: 100,
    },
    {
        title: 'Tên khách hàng',
        dataIndex: 'customername',
        key: 'customername',
        width: 100,
    },
    {
        title: 'Tác vụ',
        key: 'groupAction',
        dataIndex: 'groupAction',
        align: 'center',
        width: 20,
        link: '/Customer/Edit/',
        keyId: 'customerid',
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
        name: 'customerid',
        label: 'Mã khách hàng',
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
        name: 'customername',
        label: 'Tên khách hàng',
        labelCol: 24
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