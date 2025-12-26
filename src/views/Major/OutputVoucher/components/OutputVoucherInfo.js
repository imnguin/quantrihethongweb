import React from 'react';
import { Col, Row, Typography } from 'antd';
import { formatDate } from '../../../../utils';

const OutputVoucherInfo = (props) => {
    let {
        dataSource
    } = props;
    return (
        <>
            <Row
                gutter={[16, 16]}
                style={{
                    marginBottom: 16,
                    marginTop: 16,
                }}
            >
                <Col
                    xs={24}
                    md={12}
                    lg={8}
                    xl={6}
                    style={{
                        textAlign: 'left'
                    }}
                >
                    <Typography.Text strong>Mã HĐ: </Typography.Text>
                    <Typography.Text>{dataSource?.outputvoucherid}</Typography.Text>
                </Col>
                <Col
                    xs={24}
                    md={12}
                    lg={8}
                    xl={6}
                    style={{
                        textAlign: 'left'
                    }}>
                    <Typography.Text strong>Ngày tạo: </Typography.Text>
                    <Typography.Text>
                        {formatDate(dataSource?.createdat)}
                    </Typography.Text>
                </Col>
                <Col
                    xs={24}
                    md={12}
                    lg={8}
                    xl={6}
                    style={{
                        textAlign: 'left'
                    }}
                >
                    <Typography.Text strong>Tiền thu: </Typography.Text>
                    <Typography.Text>{dataSource?.totalamount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography.Text>
                </Col>
                <Col
                    xs={24}
                    md={12}
                    lg={8}
                    xl={6}
                    style={{
                        textAlign: 'left'
                    }}
                >
                    <Typography.Text strong>Giảm giá: </Typography.Text>
                    <Typography.Text>{dataSource?.promotion.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography.Text>
                </Col>

                {/* Hàng mới, nhưng vẫn giữ xl=6 để nó canh trái đúng như cột đầu tiên */}
                <Col
                    xs={24}
                    md={12}
                    lg={8}
                    xl={6}
                    style={{
                        textAlign: 'left'
                    }}
                >
                    <Typography.Text strong>Thanh toán: </Typography.Text>
                    <Typography.Text>{dataSource?.outputvoucherdetail[0]?.paymentmethod == 1 ? 'Tiền mặt' : 'Chuyển khoản'}</Typography.Text>
                </Col>
                <Col
                    xs={24}
                    md={12}
                    lg={8}
                    xl={6}
                    style={{
                        textAlign: 'left'
                    }}
                >
                    <Typography.Text strong>Giảm giá: </Typography.Text>
                    <Typography.Text>{dataSource?.outputvoucherdetail[0]?.discounttype == 1 ? 'Theo tiền' : 'Theo phần trăm'}</Typography.Text>
                </Col>
                <Col
                    xs={24}
                    md={12}
                    lg={8}
                    xl={6}
                    style={{
                        textAlign: 'left'
                    }}
                >
                    <Typography.Text strong>Người tạo: </Typography.Text>
                    <Typography.Text>{dataSource?.createduser}</Typography.Text>
                </Col>
            </Row>

        </>
    );
};
export default OutputVoucherInfo;