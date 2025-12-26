import React from "react";
import { Link } from "react-router-dom";

export const PagePath = [{ href: "/", title: "Trang chủ" }, { title: "Danh sách khu vực", }];
export const AddPagePath = [{ href: "/", title: "Trang chủ" }, { href: "/Area", title: "Danh sách khu vực", }, { title: "Thêm mới", }];
export const EditPagePath = [{ href: "/", title: "Trang chủ" }, { href: "/Area", title: "Danh sách khu vực", }, { title: "Chỉnh sửa", }];

export const columns = [
    {
        title: 'Mã khu vực',
        dataIndex: 'areaid',
        key: 'areaid',
        render: (key, item) => (
            <Link key={key} to={`/detail/${item.areaid}`}>{item.areaid}</Link>
        ),
        fixed: 'left',
        width: 100,
    },
    {
        title: 'Tên khu vực',
        dataIndex: 'areaname',
        key: 'areaname',
        width: 100,
    },
    {
        title: 'Tác vụ',
        key: 'groupAction',
        dataIndex: 'groupAction',
        align: 'center',
        width: 20,
        link: '/Area/Edit/',
        keyId: 'areaid',
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
        name: 'areaid',
        label: 'Mã khu vực',
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
        name: 'areaname',
        label: 'Tên khu vực',
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