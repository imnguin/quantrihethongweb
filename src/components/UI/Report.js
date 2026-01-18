import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'antd';
import Chart from 'chart.js/auto';
import { GROUPDISPLAY, HOSTNAME } from '../../utils/constants/systemVars';
import { Notification } from '../../utils/Notification';
import { useDispatch } from 'react-redux';
import { _fetchData } from '../../utils/CallAPI';
import DataGird from '../DataGird';
import GroupedProductTable from './GroupedProductTable';
import { InitParam } from '../../views/Major/OutputVoucher/constants';

const Report = () => {
    const chartRef = useRef(null);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('logininfo'))
    const [data, setData] = useState(null);
    const [dataStock, setDataStock] = useState([]);
    const [dataGroupedProduct, setDataGroupedProduct] = useState([]);
    // Giả lập fetch dữ liệu từ API
    useEffect(() => {
        getData();
        getstock();
        loadDataGroupedProduct(InitParam);
    }, []);

    const getData = async () => {
        const response = await dispatch(_fetchData(HOSTNAME, 'api/itemstockbegin/calculate', {}));
        if (!response.iserror) {
            setData(response.resultObject);
            // Notification('Thông báo', response.message, 'success');
        } else {
            Notification('Thông báo', 'Lỗi lấy thông tin dữ liệu thống kê!', 'error');
        }

        console.log(response)
    }

    const getstock = async () => {
        const response = await dispatch(_fetchData(HOSTNAME, 'api/itemstockbegin/getall', {}));
        if (!response.iserror) {
            setDataStock(response.resultObject);
            // Notification('Thông báo', response.message, 'success');
        } else {
            Notification('Thông báo', 'Lỗi lấy thông tin tồn kho!', 'error');
        }
    }

    // Khởi tạo biểu đồ
    useEffect(() => {
        if (!!data && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.monthlyRevenue.map((item) => item.month),
                    datasets: [{
                        label: 'Doanh thu (triệu VNĐ)',
                        data: data.monthlyRevenue.map((item) => item.revenue),
                        borderColor: '#1677ff',
                        backgroundColor: 'rgba(22, 119, 255, 0.2)',
                        fill: true,
                        tension: 0.4,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: { duration: 1000, easing: 'easeOutQuart' },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Doanh thu (triệu VNĐ)', font: { size: 12, family: 'Roboto' } },
                            grid: { color: 'rgba(0, 0, 0, 0.1)' },
                        },
                        x: {
                            title: { display: true, text: 'Tháng', font: { size: 12, family: 'Roboto' } },
                            grid: { display: false },
                        },
                    },
                    plugins: {
                        legend: { display: true, position: 'top', labels: { font: { size: 10, family: 'Roboto' } } },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleFont: { size: 10, family: 'Roboto' },
                            bodyFont: { size: 10, family: 'Roboto' },
                            callbacks: {
                                afterLabel: function (context) {
                                    if (context.dataIndex > 0) {
                                        let prev = context.dataset.data[context.dataIndex - 1];
                                        let curr = context.dataset.data[context.dataIndex];
                                        let change = ((curr - prev) / prev * 100).toFixed(2);
                                        return change > 0 ? '+' + change + '% tăng' : change + '% giảm';
                                    }
                                    return '';
                                },
                            },
                        },
                    },
                },
            });

            // Cleanup khi component unmount
            return () => chart.destroy();
        }
    }, [data]);

    // Cấu hình cột cho Table của Ant Design
    const columns = [
        { title: 'Mã sản phẩm', dataIndex: 'itemid', key: 'itemid', width: 60, align: 'center', isSearch: true },
        { title: 'Tên sản phẩm', dataIndex: 'itemname', key: 'itemname', width: 100, align: 'center', isSearch: true },
        { title: 'Số lượng tồn', dataIndex: 'quantitystock', key: 'quantitystock', width: 60, align: 'center' },
    ];

    const [isDisable, setisDisable] = useState(false);

    const updateItemStock = async () => {
        setisDisable(true);
        const response = await dispatch(_fetchData(HOSTNAME, 'api/itemstockbegin/updateitemstockbegin', {}));
        if (!response.iserror) {
            Notification('Thông báo', response.message, 'success');
            setisDisable(false)
        } else {
            Notification('Thông báo', response.message, 'error');
            setisDisable(false)
        }
    }

    const loadDataGroupedProduct = async (postData) => {
        const response = await dispatch(_fetchData(HOSTNAME, 'api/outputvoucher/loadOutoutVoucherDetail', postData));
        if (!response.iserror) {
            const inputData = await loadDataInputVoucherDetail(InitParam)
            if (!inputData.iserror) {
                const finalData = response?.resultObject?.map(item => {
                    const inputDT = inputData?.resultObject?.find(i => i.productid == item.productid);
                    return {
                        ...item,
                        inputquantity: inputDT?.quantity ?? 0
                    }
                })
                setDataGroupedProduct(finalData);
                return
            }
            setDataGroupedProduct(response?.resultObject);
        }
    }

    const loadDataInputVoucherDetail = async (postData) => {
        const response = await dispatch(_fetchData(HOSTNAME, 'api/inputvoucher/loadInputVoucherDetail', postData));
        return response;
    }

    return (
        !!data && <div style={{ display: 'flex' }}>
            <Row gutter={[8, 8]} style={{ width: '100%' }}>
                <Col xs={24} lg={12}>
                    <Row gutter={[8, 8]}>
                        <Col xs={24} lg={12}>
                            <Card title="Tổng đơn hàng hôm nay">
                                <div>
                                    <div>🛒</div>
                                    <div>
                                        <p style={{ fontSize: 24, margin: 0 }}>{data.totalOrders}</p>
                                        <p style={{ color: data.orderChange >= 0 ? 'green' : 'red', margin: 0 }}>
                                            {data.orderChange >= 0 ? '+' : ''}{data.orderChange}% so với hôm qua
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Card title="Tổng doanh thu hôm nay">
                                <div>
                                    <div>💰</div>
                                    <div>
                                        <p style={{ fontSize: 24, margin: 0 }}>{data.totalRevenue.toLocaleString('vi-VN')}</p>
                                        <p style={{ color: data.revenueChange >= 0 ? 'green' : 'red', margin: 0 }}>
                                            {data.revenueChange >= 0 ? '+' : ''}{data.revenueChange}% so với hôm qua
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card title="Doanh thu theo tháng" style={{ height: '100%' }}>
                                <div style={{ position: 'relative', height: '300px' }}>
                                    <canvas ref={chartRef}></canvas>
                                </div>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card title="Tồn kho">
                                <DataGird
                                    buttonItems={[<Button disabled={user?.username != "admin" || isDisable} onClick={() => updateItemStock()} type="primary" size="small">Cập nhật từ tồn</Button>]}
                                    isDisableRowSelect={true}
                                    pKey='dataStock'
                                    listColumn={columns}
                                    dataSource={dataStock}
                                    defaultCurrentPage={1}
                                    defaultPageSize={10}
                                    size='small'
                                    bordered='enable'
                                    showHeader={true}
                                    showSizeChanger={true}
                                    pageSizeOptions={['1', '10', '20', '50', '100']}
                                    scroll={{ x: 'max-content' }}
                                    isShowHeaderAction={true}
                                    isShowButtonAdd={false}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Col>

                <Col xs={24} lg={12}>
                    <Card title="Thống kê theo nhóm">
                        <GroupedProductTable dataSource={dataGroupedProduct.filter(x => [...GROUPDISPLAY].includes(parseInt(x.productsubgroupid)))} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Report;