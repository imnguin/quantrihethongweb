import React from "react";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const PagePath = [{ href: "/", title: "Trang chủ" }, { title: "Danh sách nhân viên", }];
export const AddPagePath = [{ href: "/", title: "Trang chủ" }, {href: "/User", title: "Danh sách nhân viên", }, { title: "Thêm mới", }];
export const EditPagePath = [{ href: "/", title: "Trang chủ" }, {href: "/User", title: "Danh sách nhân viên", }, { title: "Chỉnh sửa", }];

export const columns = [
    {
        title: 'Mã nhân viên',
        dataIndex: 'username',
        key: 'username',
        render: (key, item) => (
            <Link key={key} to={`/detail/${item.username}`}>{item.username}</Link>
        ),
        fixed: 'left',
        width: 100,
    },
    {
        title : 'Tên nhân viên',
        dataIndex : 'fullname',
        key : 'fullname',
        width: 100,
    },
    {
        title : 'Email',
        dataIndex : 'email',
        key : 'email',
        width: 100,
    },
    {
        title: 'Tác vụ',
        key: 'edit',
        dataIndex: 'edit',
        align: 'center',
        width: 100,
        link: '/User/Edit/',
        icon: <EditOutlined />,
        keyID: 'username',
    },
    {
        title: 'Xóa',
        key: 'delete',
        dataIndex: 'delete',
        align: 'center',
        width: 100,
        icon: <DeleteOutlined />,
    },
];

export const SearchElement = [
    {
        type: 'TextBox',
        label : 'Tìm kiếm',
        name : 'keyword',
        placeholder : 'Nhập từ khóa tìm kiếm'
    },
    // {
    //     type: 'SelectBox',
    //     label : 'Chọn',
    //     name : 'select',
    //     listOption : [
    //         {
    //             label : 'Số 1',
    //             value : 1
    //         },
    //         {
    //             label : 'Số 2',
    //             value : 2
    //         }
    //     ],
    //     mode : 'multiple',
    //     maxTagCount : 'responsive',
    //     isLoadData : true,
    //     url : 'aaa'
    // },
];

export const AddElementList = [
    {
        type : 'textbox',
        name : 'username',
        label : 'Mã nhân viên',
        // labelCol : 24,
        rules :[
            {
              required: true,
              message: 'không được để trống!',
            },
        ]
    },
    {
        type : 'textbox',
        name : 'fullname',
        label : 'Tên nhân viên',
        // labelCol : 24
    },
    {
        type : 'textbox',
        name : 'email',
        label : 'Email',
        rules :[
            {
              required: true,
              message: 'không được để trống!',
            },
        ]
    },
    // {
    //     type : 'select',
    //     name : 'select',
    //     label : 'Chọn',
    //     // isCahce: false,
    //     // url : 'aa',
    //     listOptions : [
    //         {
    //             label : 'Số 1',
    //             value : 1
    //         },
    //         {
    //             label : 'Số 2',
    //             value : 2
    //         }
    //     ],
    //     // mode : 'multiple'
    //     // disabled : true
    // },
    {
        type : 'textarea',
        name : 'description',
        label : 'Mô tả',
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