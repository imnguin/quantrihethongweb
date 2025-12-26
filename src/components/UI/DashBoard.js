import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumb } from '../Redux/Reducers';
import { convertFileToBase64 } from "../../utils/convertFileToBase64";
import { Button, Modal, QRCode } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ExcelExport from "../ExcelExport";
import ImportExcel from "../ExcelImport";
import ModalForm from "../Form/ModalForm";
import ThermalBill from "../../views/Major/OutputVoucher/components/ThermalBill";
import { HOSTNAME } from "../../utils/constants/systemVars";
import { Notification } from "../../utils/Notification";
import { _fetchData } from "../../utils/CallAPI";
import Report from "./Report";
const DashBoard = (props) => {
    const PagePath = [{ href: "/", title: 'Trang chủ' }];
    const [modal, contextHolder] = Modal.useModal();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setBreadcrumb(PagePath));
    }, []);

    const [selectedImages, setSelectedImages] = useState(null);
    const [isDisable, setisDisable] = useState(false);

    const handleImageChange = async (event) => {
        if (event.target.files.length > 0) {
            const images = await convertFileToBase64(event.target.files);
            setSelectedImages(images);
        }
    };


    const handleUpload = async () => {
        console.log(selectedImages);
    };

    const confirm = () => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'Bla bla ...',
            okText: '确认',
            cancelText: '取消',
        });
    };

    const sheet1 = {
        data: [['Name', 'Age', 'City'], ['John Doe', 25, 'New York'], ['Jane Doe', 30, 'San Francisco']],
    };

    const sheet2 = {
        data: [['Country', 'Population'], ['USA', 331000000], ['India', 1380004385]],
    };

    const schema = {
        "Mã nhân viên": {
            prop: 'UserName',
            type: Number,
            // required: true
        },
        "Tên nhân viên": {
            prop: 'FullName',
            type: String
        }
    };

    const checkFile = (data) => {
        let errors = [];
        data.map((item, index) => {
            if (item.UserName < 0) {
                errors.push({
                    error: 'Mã số nhân viên không được phép âm!',
                    row: index + 2,
                    column: 'Mã nhân viên'
                });
            }
        });

        return errors
    }

    const listColumn = [{
        type: 'input',
        name: 'ProductID',
        label: 'Mã sản phẩm',
        rules: []
    }]
    const [visible, setVisible] = useState(false);
    const customItems = [
        { name: "Nước ép cam Mã số nhân viên không được phép âm", qty: 1, price: 35000 },
        { name: "Bánh ngọt", qty: 2, price: 20000 },
        { name: "Trà sữa", qty: 1, price: 40000 }
    ];

    const qrUrl = 'https://img.vietqr.io/image/970422-0332093438-qr_only.png?amount=100000&addInfo=Thanh%20toan%20hoa%20don%20123&accountName=LAM%20XUAN%20NGUYEN'

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

    return (
        <div>
            <Report />
            {/* <Button style={{ marginTop: 50 }} disabled={isDisable} onClick={() => updateItemStock()} type="primary" size="large">Cập nhật từ tồn</Button> */}
            {/* <img src={qrUrl} sizes="200"/>
            <QRCode value={qrUrl} size={200} /> */}
        </div>
    );
}
export default DashBoard;