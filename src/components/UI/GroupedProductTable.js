import React, { useMemo } from 'react';
import { Table } from 'antd';

const processDataWithSubtotalsAndGrouping = (data, dataInputVoucherDetail) => {
    // 1. Gộp dữ liệu theo tên sản phẩm (`productname`) và tính tổng
    console.log(dataInputVoucherDetail);
    const groupedByProduct = data.reduce((acc, item) => {
        const key = item.productname;

        if (!acc[key]) {
            acc[key] = {
                key: item.productid + item.productname,
                nhom: item.productsubgroupname,
                sanPham: item.productname,
                dvt: item.quantityunitname,
                soLuong: 0,
                tongDoanhThu: 0,
                rowSpan: 0, // Khởi tạo rowSpan
                inputquantity: item.inputquantity
            };
        }

        const quantity = parseFloat(item.quantity) || 0;
        const totalamount = parseFloat(item.totalamount) || 0;

        acc[key].soLuong += quantity;
        acc[key].tongDoanhThu += totalamount;
        return acc;
    }, {});

    const processedData = Object.values(groupedByProduct);

    // 2. Sắp xếp dữ liệu theo Nhóm (BẮT BUỘC)
    processedData.sort((a, b) => a.nhom.localeCompare(b.nhom));

    let finalData = [];
    let groupMap = {};

    // 3. Tính toán rowSpan và tạo Dòng Tổng phụ (Subtotals)

    // Bước 3a: Tính tổng và đếm số lượng dòng trong mỗi nhóm
    processedData.forEach(item => {
        const groupName = item.nhom;
        if (!groupMap[groupName]) {
            groupMap[groupName] = {
                count: 0,
                totalQuantity: 0,
                totalRevenue: 0,
                products: [],
                totalInputquantity : 0
            };
        }
        groupMap[groupName].count += 1;
        groupMap[groupName].totalQuantity += item.soLuong;
        groupMap[groupName].totalRevenue += item.tongDoanhThu;
        groupMap[groupName].totalInputquantity += item.inputquantity;
        groupMap[groupName].products.push(item);
    });

    // Bước 3b: Gán rowSpan và chèn Dòng Tổng
    let uniqueKeyCounter = 0;

    Object.keys(groupMap).forEach(groupName => {
        const group = groupMap[groupName];

        group.products.forEach((item, index) => {
            // Chỉ dòng đầu tiên của nhóm mới có rowSpan > 0
            const rowSpanValue = (index === 0) ? group.count : 0;

            console.log(item);
            finalData.push({
                ...item,
                rowSpan: rowSpanValue, // Gán rowSpan cho dòng đầu tiên
            });
        });

        // Chèn dòng Tổng phụ ngay sau các sản phẩm của nhóm
        finalData.push({
            key: `subtotal-${groupName}-${uniqueKeyCounter++}`,
            isSubtotal: true,
            subtotalLabel: `TỔNG CỘNG NHÓM: ${groupName}`,
            soLuong: group.totalQuantity,
            tongDoanhThu: group.totalRevenue,
            // Đặt rowSpan cho dòng tổng phụ là -1 để biết đây là dòng không thuộc nhóm gộp
            rowSpan: -1,
            inputquantity : group.totalInputquantity
        });
    });

    return finalData;
};

const GroupedProductTable = ({ dataSource }) => {
    const dataWithSubtotals = useMemo(() => processDataWithSubtotalsAndGrouping(dataSource), [dataSource]);

    // Định dạng tiền tệ
    const formatCurrency = (amount) => {
        if (isNaN(amount)) return '0 VNĐ';
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(amount);
    };

    // Định dạng số lượng
    const formatQuantity = (qty) => {
        if (isNaN(qty)) return '0';
        return qty.toLocaleString('vi-VN', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 3
        });
    };

    // Style áp dụng cho dòng tổng
    const subtotalRowStyle = {
        backgroundColor: '#e6f7ff',
        fontWeight: 'bold',
        borderTop: '2px solid #91d5ff',
    };

    // Định nghĩa cột
    const columns = [
        {
            title: 'Nhóm',
            dataIndex: 'nhom',
            key: 'nhom',
            width: 200,
            onCell: (record) => {
                // Nếu là dòng tổng phụ, gộp 3 cột (colSpan: 3)
                if (record.isSubtotal) {
                    return {
                        colSpan: 3,
                        style: subtotalRowStyle
                    };
                }
                // Nếu là dòng sản phẩm, áp dụng rowSpan đã tính toán
                return {
                    rowSpan: record.rowSpan,
                };
            },
            render: (text, record) => {
                if (record.isSubtotal) {
                    return <span style={{ color: '#1890ff' }}>{record.subtotalLabel}</span>;
                }
                return text;
            }
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'sanPham',
            key: 'sanPham',
            width: 350,
            onCell: (record) => ({
                // Ẩn cột này nếu là dòng tổng phụ
                colSpan: record.isSubtotal ? 0 : 1,
            }),
        },
        {
            title: 'ĐVT',
            dataIndex: 'dvt',
            key: 'dvt',
            align: 'center',
            width: 80,
            onCell: (record) => ({
                // Ẩn cột này nếu là dòng tổng phụ
                colSpan: record.isSubtotal ? 0 : 1,
            }),
        },
        {
            title: 'T. S lượng',
            dataIndex: 'soLuong',
            key: 'soLuong',
            align: 'right',
            width: 120,
            render: formatQuantity,
        },
        {
            title: 'Tổng D.Thu',
            dataIndex: 'tongDoanhThu',
            key: 'tongDoanhThu',
            align: 'right',
            width: 150,
            render: (text, record) => (
                <span
                    style={{
                        fontWeight: 'bold',
                        color: record.isSubtotal ? '#ff4d4f' : 'inherit'
                    }}>
                    {formatCurrency(text)}
                </span>
            ),
        },
        {
            title: 'SL. Nhập',
            dataIndex: 'inputquantity',
            key: 'inputquantity',
            align: 'right',
            width: 120
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={dataWithSubtotals}
            bordered
            pagination={false}
            rowKey="key"
            scroll={{ x: 800 }}
        />
    );
};

export default GroupedProductTable;