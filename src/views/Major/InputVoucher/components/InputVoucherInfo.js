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
                    <Typography.Text strong>Mã phiếu nhập: </Typography.Text>
                    <Typography.Text>{dataSource?.inputvoucherid}</Typography.Text>
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
                    <Typography.Text strong>Tổng tiền: </Typography.Text>
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
                    <Typography.Text strong>Người tạo: </Typography.Text>
                    <Typography.Text>{dataSource?.createduser}</Typography.Text>
                </Col>
            </Row>

        </>
    );
};
export default OutputVoucherInfo;