import React from "react";
import { CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
export const PagePath = [{ href: "/", title: "Trang chủ" }, { title: "Danh sách barcode", }];
export const AddPagePath = [{ href: "/", title: "Trang chủ" }, { href: "/price", title: "Danh sách barcode", }, { title: "Thêm mới", }];
export const EditPagePath = [{ href: "/", title: "Trang chủ" }, { href: "/price", title: "Danh sách barcode", }, { title: "Chỉnh sửa", }];

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
        title: 'Barcode',
        dataIndex: 'barcode',
        key: 'barcode',
        width: 100,
    },
    {
        title: 'Tác vụ',
        key: 'delete',
        dataIndex: 'delete',
        align: 'center',
        width: 20,
        icon: <DeleteOutlined />,
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
        type: 'textbox',
        name: 'barcode',
        label: 'Barcode',
        labelCol: 24
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
        ['Mã sản phẩm', 'Barcode', 'Kích hoạt', 'Hệ thống'],
        ['1012835000561', 'aaaaaa', true, false],
    ],
};

export const schema = {
    "Mã sản phẩm": {
        prop: 'productid',
        type: String,
        required: true
    },
    "Barcode": {
        prop: 'barcode',
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