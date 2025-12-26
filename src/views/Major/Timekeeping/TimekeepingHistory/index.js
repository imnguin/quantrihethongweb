import React, { useEffect, useState } from "react";
import { Card, Col, Row, Typography, Grid, Table } from "antd";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
const { useBreakpoint } = Grid;
const TimekeepingHistory = (props) => {
    const screens = useBreakpoint();
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        if (screens.lg) {
            setIsMobile(true)
        } else {
            setIsMobile(false);
        }
    }, [screens]);

    const generateTimekeepingData = () => {
        const today = new Date(); // Ngày hiện tại
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1); // Ngày đầu tháng

        const data = [];
        const location = "Trụ sở Bizlinks"; // Địa điểm cố định
        const timeCheckIn = "08:00"; // Giờ check-in mặc định
        const timeCheckOut = "16:30"; // Giờ check-out mặc định
        const timekeeping = "7.5"; // Số giờ công mặc định

        for (let d = new Date(firstDay); d <= today; d.setDate(d.getDate() + 1)) {
            const formattedDate = `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
                .toString()
                .padStart(2, "0")}/${d.getFullYear()}`;

            data.push({
                date: formattedDate,
                localtion: location,
                timeCheckIn: timeCheckIn,
                timeCheckOut: timeCheckOut,
                timekeeping: timekeeping,
            });
        }

        return data.reverse();
    }

    const data = generateTimekeepingData();

    const renderDate = (dateString) => {
        const daysOfWeek = [
            "Chủ Nhật",
            "Thứ Hai",
            "Thứ Ba",
            "Thứ Tư",
            "Thứ Năm",
            "Thứ Sáu",
            "Thứ Bảy"
        ];

        // Chuyển đổi chuỗi ngày thành đối tượng Date
        const [day, month, year] = dateString.split("/").map(Number);
        const date = new Date(year, month - 1, day); // `month - 1` vì tháng trong JavaScript bắt đầu từ 0.

        // Lấy chỉ số ngày trong tuần
        const dayIndex = date.getDay(); // 0 là Chủ Nhật, 1 là Thứ Hai, ...

        // return daysOfWeek[dayIndex];
        return <>
            <div style={{
                fontSize: '15px',
                color: 'black',
                fontWeight: '500'
            }}>{daysOfWeek[dayIndex]}</div>
            <div style={{ fontSize: 13 }}>{dateString}</div>
        </>
    }

    const calculateWorkingHours = (timeCheckIn, timeCheckOut) => {
        const [checkInHour, checkInMinute] = timeCheckIn.split(":").map(Number);
        const [checkOutHour, checkOutMinute] = timeCheckOut.split(":").map(Number);

        const checkInTotalMinutes = checkInHour * 60 + checkInMinute;
        const checkOutTotalMinutes = checkOutHour * 60 + checkOutMinute;
        const totalMinutes = checkOutTotalMinutes - checkInTotalMinutes;
        const totalHours = totalMinutes / 60;

        return totalHours - 1;
    }

    return (
        <div>
            <div style={{ padding: "20px" }}>
                <Row
                    gutter={[16, 16]}
                    justify="center"
                >
                    <Col
                        xs={24}
                        sm={16}
                        md={10}
                        lg={24}
                        xl={18}
                        xxl={14}
                    >
                        <Card
                            style={{
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                borderRadius: "10px",
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    gap: 5,
                                }}>
                                <Typography.Text
                                    style={{
                                        color: '#085cbe',
                                        fontWeight: '700',
                                        fontSize: '25px',
                                        textAlign: 'center'
                                    }}
                                >
                                    <DoubleLeftOutlined
                                        onClick={() => { console.log('pre') }}
                                    /> Tháng 11/2024 <DoubleRightOutlined
                                        onClick={() => { console.log('next') }}
                                    />
                                </Typography.Text>
                                <Row
                                    justify="center"
                                >
                                    <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Typography.Text
                                                style={{
                                                    fontSize: '15px',
                                                    fontWeight: '500',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                Giờ công chuẩn linh hoạt
                                            </Typography.Text>
                                            <Typography.Text
                                                style={{
                                                    fontSize: '20px',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                195
                                            </Typography.Text>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Typography.Text
                                                style={{
                                                    fontSize: '15px',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                Giờ công nghỉ phép
                                            </Typography.Text>
                                            <Typography.Text
                                                style={{
                                                    fontSize: '20px',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                7.5
                                            </Typography.Text>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Typography.Text
                                                style={{
                                                    fontSize: '15px',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                Giờ công xác nhận đi làm
                                            </Typography.Text>
                                            <Typography.Text
                                                style={{
                                                    fontSize: '20px',
                                                    fontWeight: 'bold',
                                                    color: '#085cbe'
                                                }}
                                            >
                                                145
                                            </Typography.Text>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Typography.Text
                                                style={{
                                                    fontSize: '15px',
                                                    fontWeight: '500',
                                                    flexWrap: 'nowrap'
                                                }}
                                            >
                                                Giờ công còn thiếu
                                            </Typography.Text>
                                            <Typography.Text
                                                style={{
                                                    fontSize: '20px',
                                                    fontWeight: 'bold',
                                                    color: '#FB9543'
                                                }}
                                            >
                                                7.5
                                            </Typography.Text>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>

            <div
                style={{
                    padding: '20px'
                }}
            >
                <Table
                    dataSource={data}
                    columns={[
                        {
                            title: 'Ngày',
                            dataIndex: 'date',
                            key: 'date',
                            render: (text) => renderDate(text),
                            align: 'center',
                            onHeaderCell: () => ({
                                style: {
                                    fontSize: '16px',
                                    color: '#085cbe',
                                    fontWeight: '700'
                                }
                            })
                        },
                        {
                            title: 'Thông tin chấm công',
                            dataIndex: 'infoTimekeeping',
                            key: 'infoTimekeeping',
                            onHeaderCell: () => ({
                                style: {
                                    fontSize: '16px',
                                    color: '#085cbe',
                                    fontWeight: '700'
                                }
                            }),
                            render: (text, record, index) => (
                                <div style={{ fontSize: 13 }}>
                                    <div>
                                        {`${record.localtion} / Chấm vào: ${record.timeCheckIn} / Chấm ra: ${record.timeCheckOut}`}
                                    </div>
                                    <div>
                                        {`Đã xác nhận / 73309 - Lê Nho Học`}
                                    </div>
                                </div>
                            ),
                            align: 'center'
                        },
                        {
                            title: 'Tổng giờ công',
                            dataIndex: 'timekeeping',
                            key: 'timekeeping',
                            align: 'center',
                            onHeaderCell: () => ({
                                style: {
                                    fontSize: '16px',
                                    color: '#085cbe',
                                    fontWeight: '700'
                                }
                            }),
                            render: (text, record) => <div style={{ fontSize: '15px', fontWeight: 'bold' }}>{calculateWorkingHours(record.timeCheckIn, record.timeCheckOut)}</div>
                        }
                    ]}
                    style={{
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                    bordered
                    pagination={false}
                />
            </div>
        </div>
    );
}
export default TimekeepingHistory;