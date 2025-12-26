import React, { useEffect, useState } from 'react';
import { Button, Collapse } from 'antd';
import InputVoucherInfo from '../components/InputVoucherInfo';
import InputVoucherDetail from '../components/InputVoucherDetail';
import { useNavigate, useParams } from 'react-router-dom';
import { HOSTNAME } from '../../../../utils/constants/systemVars';
import { Notification } from '../../../../utils/Notification';
import { useDispatch } from 'react-redux';
import { _fetchData } from '../../../../utils/CallAPI';

const Detail = () => {
    const { inputvoucherid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isLoadComplete, setisLoadComplete] = useState(false);
    const onChange = key => {
        console.log(key);
    };

    useEffect(() => {
        loadData({ inputvoucherid });
    }, []);

    const loadData = async (postData) => {
        setisLoadComplete(false)
        const response = await dispatch(_fetchData(HOSTNAME, 'api/inputvoucher/load', postData));
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
            label: <span style={{ fontSize: '16px', fontWeight: 400 }}>Thông tin phiếu nhập</span>,
            children: <InputVoucherInfo dataSource={data} />,
        },
        {
            key: '2',
            label: <span style={{ fontSize: '16px', fontWeight: 400 }}>Chi tiết sản phẩm</span>,
            children: <InputVoucherDetail dataSource={data} />,
        },
    ];

    return isLoadComplete && <>
        <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
        <div style={{ marginTop: 10, marginBottom: 0, gap: 10, display: 'flex', justifyContent: 'end' }}>
            <Button type='primary' onClick={() => navigate('/InputVoucherHistory')}>Trở vè</Button>
        </div>
    </>;
};
export default Detail;