import React from "react";
export const PagePath = [{ href: "/", title: "Trang chủ" }, { title: "Danh sách giá sản phẩm", }];
export const AddPagePath = [{ href: "/", title: "Trang chủ" }, { href: "/price", title: "Danh sách giá sản phẩm", }, { title: "Thêm mới", }];
export const EditPagePath = [{ href: "/", title: "Trang chủ" }, { href: "/price", title: "Danh sách giá sản phẩm", }, { title: "Chỉnh sửa", }];

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
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
        width: 100,
    },
    {
        title: 'Khu vực',
        dataIndex: 'areaid',
        key: 'areaid',
        width: 100,
    },
    {
        title: 'Tác vụ',
        key: 'groupAction',
        dataIndex: 'groupAction',
        align: 'center',
        width: 20,
        link: '/price/Edit/',
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
        name: 'price',
        label: 'Giá sản phẩm',
        labelCol: 24
    },
    {
        type: 'select',
        name: 'areaid',
        label: 'Khu vực',
        labelCol: 24,
        url: 'api/area/getCache',
        elementValue: 'areaid',
        elementName: 'areaname',
        value: -1
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
        ['Mã sản phẩm', 'Giá sản phẩm', 'Khu vực', 'Kích hoạt', 'Hệ thống'],
        ['1012835000561', 50000, 1, true, false],
    ],
};

export const schema = {
    "Mã sản phẩm": {
        prop: 'productid',
        type: String,
        required: true
    },
    "Giá sản phẩm": {
        prop: 'price',
        type: Number,
        required: true
    },
    "Khu vực": {
        prop: 'areaid',
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