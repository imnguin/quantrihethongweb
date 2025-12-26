import React, { useEffect, useState } from 'react';
import { Button, Collapse } from 'antd';
import OutputVoucherInfo from '../components/OutputVoucherInfo';
import OutputVoucherDetail from '../components/OutputVoucherDetail';
import { useNavigate, useParams } from 'react-router-dom';
import { HOSTNAME } from '../../../../utils/constants/systemVars';
import { Notification } from '../../../../utils/Notification';
import { useDispatch } from 'react-redux';
import { _fetchData } from '../../../../utils/CallAPI';
import ThermalBill from '../components/ThermalBill';

const Detail = () => {
    const { outputvoucherid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isLoadComplete, setisLoadComplete] = useState(false);
    const onChange = key => {
        console.log(key);
    };

    useEffect(() => {
        loadData({ outputvoucherid });
    }, []);

    const loadData = async (postData) => {
        setisLoadComplete(false)
        const response = await dispatch(_fetchData(HOSTNAME, 'api/outputvoucher/load', postData));
        if (!response.iserror) {
            console.log(response?.resultObject);
            setData(response?.resultObject);
            setisLoadComplete(true)
        } else {
            Notification('Thông báo', response.message, 'error');
            setisLoadComplete(true)
        }
    }

    const items = [
        {
            key: '1',
            label: <span style={{ fontSize: '16px', fontWeight: 400 }}>Thông tin hóa đơn</span>,
            children: <OutputVoucherInfo dataSource={data} />,
        },
        {
            key: '2',
            label: <span style={{ fontSize: '16px', fontWeight: 400 }}>Chi tiết sản phẩm</span>,
            children: <OutputVoucherDetail dataSource={data} />,
        },
    ];

    const handlePrint = () => {
        // Kiểm tra phần tử #printbill
        const printContent = document.getElementById('printbill');
        if (!printContent) {
            console.error('Phần tử #printbill không tồn tại!');
            return;
        }

        // Mở cửa sổ mới
        let mywindow = window.open('', '', 'right=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0');
        if (!mywindow) {
            console.error('Không thể mở cửa sổ mới! Vui lòng kiểm tra cài đặt chặn cửa sổ bật lên.');
            return;
        }

        // 3. Ghi nội dung và CSS loại bỏ lề giấy
        mywindow.document.write(`
        <html>
            <head>
                <title>Hóa đơn</title>
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet"/>
                <style>
                    /* === FIX LỀ GIẤY VÀ LÃNG PHÍ GIẤY (QUAN TRỌNG) === */
                    @page {
                        margin: 0 !important; /* Loại bỏ lề trang in mặc định */
                        padding: 0 !important;
                    }
                    html, body {
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                    /* ==================================== */
                    
                    @media print {
                        .bill {
                            width: 80mm !important; /* Chiều rộng chuẩn hóa đơn nhiệt */
                            font-family: 'monospace' !important; /* Font chữ đơn cách */
                            font-size: 12px !important; /* Kích thước chữ cho in */
                            line-height: 1.2 !important;
                            padding: 0 !important; /* Loại bỏ padding trong chế độ in */
                        }
                        .no-print { display: none !important; }
                    }
                    /* CSS cho pop-up window trước khi in */
                    body {
                        display: flex;
                        justify-content: center;
                    }
                </style>
            </head>
            <body>
                <div class="bill">
                    ${printContent.innerHTML}
                </div>
            </body>
        </html>
    `);

        // Đóng tài liệu để đảm bảo nội dung được render
        mywindow.document.close();

        // Đợi cửa sổ mới tải xong trước khi in
        mywindow.onload = () => {
            mywindow.print();
            // Đóng cửa sổ sau khi in (tùy chọn)
            mywindow.onafterprint = () => {
                mywindow.close();
            };
        };
    };

    return isLoadComplete && <>
        <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
        <ThermalBill items={data.outputvoucherdetail} outputvoucherid={data.outputvoucherid} />
        <div style={{ marginTop: 10, marginBottom: 0, gap: 10, display: 'flex', justifyContent: 'end' }}>
            <Button type='primary' onClick={handlePrint}>In lại hóa đơn</Button>
            <Button type='primary' onClick={() => navigate('/History')}>Trở vè</Button>
        </div>
    </>;
};
export default Detail;