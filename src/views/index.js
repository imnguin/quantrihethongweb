import {
    HomeOutlined,
    OrderedListOutlined,
    SettingOutlined,
    VerticalAlignBottomOutlined
} from '@ant-design/icons';

const AppMenu = [
    {
        name: 'Home',
        icon: HomeOutlined,
        label: 'Trang chủ',
        path: '/'
    },
    {
        name: 'Declaration',
        icon: SettingOutlined,
        label: 'Khai báo',
        path: '',
        subItem: [
            {
                name: 'Customer',
                label: 'Khách hàng',
                path: '/Customer',
                subItem: []
            },
            {
                name: 'QuantityUnit',
                label: 'Đơn vị tính',
                path: '/QuantityUnit',
                subItem: []
            },
            {
                name: 'Product_sub',
                label: 'Nhóm sản phẩm',
                path: '/Product_sub',
                subItem: []
            },
            {
                name: 'Item',
                label: 'Item',
                path: '/Item',
                subItem: []
            },
            {
                name: 'ItemExchange',
                label: 'Sản phẩm quy đổi',
                path: '/ItemExchange',
                subItem: []
            },
            {
                name: 'Product',
                label: 'Sản phẩm',
                path: '/Product',
                subItem: []
            },
            {
                name: 'Price',
                label: 'Giá sản phẩm',
                path: '/Price',
                subItem: []
            },
            {
                name: 'Barcode',
                label: 'Barcode',
                path: '/Barcode',
                subItem: []
            },
            {
                name: 'Promotion',
                label: 'Khuyến mãi',
                path: '/Promotion',
                subItem: []
            },
            {
                name: 'Orther',
                label: 'Khác',
                path: '',
                subItem: [
                    {
                        name: 'User',
                        label: 'Nhân viên',
                        path: '/User',
                        subItem: []
                    },
                    {
                        name: 'Area',
                        label: 'Khu vực',
                        path: '/Area',
                        subItem: []
                    },
                    {
                        name: 'Brand',
                        label: 'Nhà sản xuất',
                        path: '/Brand',
                        subItem: []
                    },
                    {
                        name: 'Branch',
                        label: 'Thương hiệu',
                        path: '/Branch',
                        subItem: []
                    },
                ]
            },
        ]
    },
    {
        name: 'InputVoucher',
        label: 'Phiếu nhập',
        icon: VerticalAlignBottomOutlined,
        path: '',
        subItem: [
            {
                name: '/InputVoucher',
                label: 'Tạo mới',
                path: '/InputVoucher',
                subItem: []
            },
            {
                name: 'InputVoucherHistory',
                label: 'Lịch sử',
                path: '/InputVoucherHistory',
                subItem: []
            },
            {
                name: 'ReportInputVoucherDetail',
                label: 'Báo cáo',
                path: '/ReportInputVoucherDetail',
                subItem: []
            },
        ]
    },
    {
        name: 'Invoice',
        icon: OrderedListOutlined,
        label: 'Phiếu xuất',
        path: '',
        subItem: [
            {
                name: 'OutputVoucher',
                label: 'Tạo mới',
                path: '/OutputVoucher',
                subItem: []
            },
            {
                name: 'History',
                label: 'Lịch sử',
                path: '/History',
                subItem: []
            },
            {
                name: 'ReportOutputVoucherDetail',
                label: 'Thống kê',
                path: '/ReportOutputVoucherDetail',
                subItem: []
            },
        ]
    },
];

export default AppMenu;