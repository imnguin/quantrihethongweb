import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumb } from '../../../../components/Redux/Reducers';
import { PagePath, addProductColunms, columns } from '../constants';
import { _fetchData } from '../../../../utils/CallAPI';
import { HOSTNAME } from '../../../../utils/constants/systemVars';
import { Notification } from '../../../../utils/Notification';
import { Row, Col, Card, Table, Button, Input, Form, Typography, Modal, Select, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FormContainer from '../../../../components/FormContainer';
import ColumnGroup from 'antd/es/table/ColumnGroup';
import ThermalBill from '../components/ThermalBill';
import initScaleSocket from '../../../../utils/initScaleSocket';
import '../../../../asset/css/select.css'

const { Option } = Select;
const { Text } = Typography;

const Search = () => {
    const user = JSON.parse(localStorage.getItem('logininfo'))
    const [modal, contextHolder] = Modal.useModal();
    let objjd = null;
    const onCloseModal = () => {
        objjd.destroy();
    };

    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [cart, setCart] = useState([]);
    const [discountCode, setDiscountCode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('1');
    const [barcode, setBarcode] = useState('');
    const [loading, setLoading] = useState(false);
    const [weight, setWeight] = useState('0.00');
    const [status, setStatus] = useState('Ngắt kết nối');
    const [outputVoucherID, setOutputVoucherID] = useState('');
    const [customItems, setCustomItems] = useState([]);
    const [productItems, setProductItem] = useState([]);

    useEffect(() => {
        dispatch(setBreadcrumb(PagePath));
        init();
    }, []);

    useEffect(() => {
        if (!!outputVoucherID) {
            handlePrint();
        }
    }, [outputVoucherID]);

    // useEffect(() => {
    //     const cleanup = initScaleSocket(setWeight, setStatus);
    //     return () => {
    //         if (typeof cleanup === 'function') cleanup();
    //     };
    // }, []);

    const init = async () => {
        const response = await dispatch(_fetchData(HOSTNAME, 'api/product/getCache', {}));
        if (!response.iserror && response.resultObject) {
            setProductItem(response.resultObject);
        }
    }

    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPriceBeforeDiscount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.totalamount, 0);
    const promotionDefault = (item) => {
        if (item.quantity >= item.salequantity && !item.inputpromotion && item.applydatefrom != null && item.applydateto != null) {
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            const startDate = new Date(item.applydatefrom);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(item.applydateto);
            endDate.setHours(0, 0, 0, 0);
            if (currentDate >= startDate && currentDate <= endDate) {
                return parseFloat(item.promotionquantity) * Math.floor(parseFloat(item.quantity) / (item.salequantity)) * parseFloat(item.price);
            }
        }
        return 0;
    }

    const loadData = async (postData) => {
        setLoading(true);
        const response = await dispatch(_fetchData(HOSTNAME, 'api/product/load', postData));
        if (!response.iserror) {
            if (!response.resultObject) {
                Notification('Thông báo', 'Không tìm thấy sản phẩm!', 'error');
                setLoading(false);
                return;
            }
            setCart((prev) => {
                let promotionValue = 0;
                const index = prev.findIndex((item) => item.productid === response.resultObject.productid);
                if (index !== -1) {
                    const updatedCart = [...prev];
                    let itemUpdate = {
                        ...response.resultObject,
                        quantity: updatedCart[index].quantity + 1,
                        inputpromotion: updatedCart[index].inputpromotion,
                    };

                    itemUpdate.promotion = promotionDefault(itemUpdate);
                    itemUpdate.totalamount = discountValue(itemUpdate);
                    updatedCart[index] = itemUpdate;
                    return updatedCart;
                }

                let itemUpdate = { ...response.resultObject, quantity: 1, promotion: promotionValue, inputpromotion: false };
                itemUpdate.promotion = promotionDefault(itemUpdate);
                itemUpdate.totalamount = discountValue(itemUpdate);
                return [...prev, itemUpdate];
            });
        } else {
            Notification('Thông báo', response.message, 'error');
        }
        setLoading(false);
    };

    useEffect(() => {
        let buffer = '';
        let lastKeyTime = Date.now();

        const handleKeyDown = (event) => {
            if (loading) return;
            const currentTime = Date.now();
            if (currentTime - lastKeyTime > 50) {
                buffer = '';
            }
            lastKeyTime = currentTime;

            if (event.key?.length === 1) {
                buffer += event.key;
            }

            if (event.key === 'Enter' && buffer) {
                setBarcode(buffer);
                buffer = '';
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [loading]);

    useEffect(() => {
        if (barcode) {
            loadData({ barcode });
            setBarcode('');
        }
    }, [barcode]);

    const isValidValue = (input) => {
        if (typeof input !== 'string') return false;
        if (input.endsWith('%')) {
            const numberPart = input.slice(0, -1);
            return /^\d*\.?\d*$/.test(numberPart) && numberPart !== '' && !isNaN(Number(numberPart));
        }

        return /^\d*\.?\d*$/.test(input) && input !== '' && !isNaN(Number(input));
    };

    const getNumberFromPercent = (input) => {
        if (typeof input !== 'string' || !input.endsWith('%')) return null;
        const numberPart = input.slice(0, -1);
        return /^\d*\.?\d*$/.test(numberPart) ? Number(numberPart) : null;
    };

    const discountValue = (record) => {
        let totalamount = record.price * record.quantity;
        if (typeof record.promotion === 'string' && record.promotion.endsWith('%')) {
            const percent = getNumberFromPercent(record.promotion);
            if (percent !== null) {
                totalamount = totalamount - (percent / 100) * totalamount;
            }
        } else if (!isNaN(Number(record.promotion))) {
            totalamount = totalamount - Number(record.promotion);
        }
        return totalamount;
    }

    const handleApplyDiscount = (productid, value) => {
        console.log(productid, value)
        if (isValidValue(value) || !value) {
            if (!!productid) {
                const data = cart.map((item, index) => {
                    if (item.productid === productid) {
                        item.inputpromotion = (!value || value == 0) ? false : true;
                        item.promotion = value;
                        item.totalamount = discountValue(item);
                    }
                    return item;
                })
                setCart(data);
                return
            }
            const data = cart.map((item, index) => {
                item.promotion = value;
                item.totalamount = discountValue(item);
                return item;
            })
            setCart(data);
            Notification('Thông báo', `Áp dụng mã ${discountCode} thành công!`, 'success');
            return
        }
        Notification('Thông báo', 'Giá trị giảm giá không hợp lệ', 'error');
    }

    const handleQuantityChange = (productid, value) => {
        if (!value) { value = 0; }
        if (value < 0) {
            Notification('Thông báo', 'Số lượng không hợp lệ!', 'error');
            return;
        }
        if (!!productid) {
            const data = cart.map((item, index) => {
                if (item.productid === productid) {
                    item.quantity = value;
                    item.promotion = promotionDefault(item);
                    item.totalamount = discountValue(item);
                }
                return item;
            })
            setCart(data);
            return
        }
    };

    const handleRemoveItem = (productid) => {
        setCart(cart.filter((item) => item.productid !== productid));
        Notification('Thông báo', 'Đã xóa sản phẩm khỏi giỏ hàng', 'success');
    };

    const handleCheckout = async () => {
        setOutputVoucherID('');
        setLoading(true);
        const postData = cart.map((item, index) => {
            return {
                createduser: user?.username,
                productid: item.productid,
                productname: item.productname,
                quantityunitid: item.quantityunitid,
                quantityunitname: item.quantityunitname,
                barcode: item.barcode,
                price: item.price,
                quantity: item.quantity,
                totalamount: item.totalamount,
                paymentmethod: paymentMethod,
                promotion: (item.price * item.quantity) - item.totalamount,
                discounttype: !getNumberFromPercent(item.promotion) ? '1' : '2',
            }
        })
        setCustomItems(postData);

        const response = await dispatch(_fetchData(HOSTNAME, 'api/outputvoucher/add', postData));
        Notification('Thông báo', response.message, response.iserror ? 'error' : 'success');
        setLoading(false);
        if (!response.iserror) {
            setCart([]);
            setDiscountCode('');
            setPaymentMethod('1');
            setOutputVoucherID(response.resultObject.outputvoucherid);
            return
        }
    };

    const handleAddToCart = () => {
        const config = {
            icon: null,
            closable: false,
            className: 'modal-ant-custom',
            width: 300,
            footer: null,
            content: (
                <FormContainer
                    layout="vertical"
                    listColumn={addProductColunms}
                    onCloseModal={onCloseModal}
                    onSubmit={(values) => loadData(values)}
                />
            ),
        };
        objjd = modal.confirm(config);
    };

    const handlePrint = () => {
        const printContent = document.getElementById('printbill');
        if (!printContent) {
            console.error('Phần tử #printbill không tồn tại!');
            return;
        }

        let mywindow = window.open('', '', 'right=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0');
        if (!mywindow) {
            console.error('Không thể mở cửa sổ mới! Vui lòng kiểm tra cài đặt chặn cửa sổ bật lên.');
            return;
        }

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

        mywindow.document.close();
        mywindow.onload = () => {
            mywindow.print();
            mywindow.onafterprint = () => {
                mywindow.close();
            };
        };
    };

    const getWeight = async (productid) => {
        const response = await dispatch(_fetchData(HOSTNAME, 'api/weight', {}));
        let numberPart = 0;
        if (!response.iserror && response.resultObject) {
            const match = response.resultObject.weight.match(/[-+]?\d*\.?\d+/);
            numberPart = match ? parseFloat(match[0]) : 0;
        }
        handleQuantityChange(productid, numberPart);
    }

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'F1') {
            event.preventDefault();
            if (cart.length > 0) {
                getWeight(cart[cart.length - 1].productid);
            }
        }
    }, [cart, getWeight]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={16} xl={18} xxl={19}>
                    <Card
                        title="Danh sách sản phẩm (click vào vùng trống khi quét mã)"
                        style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    >
                        <Row type="flex" justify="end" align="middle" style={{ marginBottom: 5 }}>
                            <Form
                                form={form}
                                name='input-barcode'
                                layout="inline"
                                style={{ marginRight: 10 }}
                                onFinish={(values) => { setBarcode(values.barcode); form.resetFields(); }}
                            >
                                <Form.Item name="productid" style={{ marginBottom: 5 }}>
                                    <Select
                                        allowClear
                                        showSearch
                                        style={{ height: 30, width: "500px" }}
                                        filterOption={(input, option) =>
                                            option.value
                                                .toString()
                                                .toLowerCase()
                                                .includes(input.toLowerCase()) ||
                                            option.label.toLowerCase().includes(input.toLowerCase())
                                        }
                                        placeholder="Nhập tên để tìm kiếm sản phẩm"
                                        onChange={(val) => { if (val) { loadData({ productid: val }) } }}
                                        className="my-custom-select"
                                    >
                                        {
                                            productItems.map((item, key) => {
                                                return (
                                                    <Select.Option value={item.productid} label={item.productname} key={key}>
                                                        {`${item.productname}`}
                                                    </Select.Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item name="barcode" style={{ marginBottom: 5 }}>
                                    <Input
                                        placeholder="Nhập mã barcode"
                                    // value={barcode}
                                    />
                                </Form.Item>
                                <Form.Item style={{ marginBottom: 5 }}>
                                    <Button type="primary" htmlType="submit">Thêm</Button>
                                </Form.Item>
                            </Form>
                        </Row>
                        <Table
                            size="small"
                            columns={columns(handleQuantityChange, handleRemoveItem, handleApplyDiscount, getWeight)}
                            dataSource={cart}
                            rowKey="_id"
                            pagination={false}
                            bordered
                            scroll={{ x: true }}
                        />
                    </Card>
                </Col>

                <Col xs={24} lg={8} xl={6} xxl={5}>
                    <Card
                        title="Thông Tin Thanh Toán"
                        style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    >
                        <Form layout="vertical">
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={24}>
                                    <Form.Item label="Nhập giảm giá" style={{ margin: 0 }}>
                                        <Row gutter={[8, 0]} style={{ width: '100%' }}>
                                            <Col xs={14} sm={14}>
                                                <Input
                                                    value={discountCode}
                                                    onChange={(e) => setDiscountCode(e.target.value)}
                                                    placeholder="Số tiền hoặc phần trăm"
                                                    style={{ width: '100%' }}
                                                />
                                            </Col>
                                            <Col xs={10} sm={10}>
                                                <Button type="primary" onClick={() => handleApplyDiscount(null, discountCode)} block style={{ width: '100%' }}>
                                                    Áp dụng
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24}>
                                    <Form.Item label="Hình Thức Thanh Toán" required>
                                        <Select
                                            value={paymentMethod}
                                            onChange={(value) => setPaymentMethod(value)}
                                            style={{ width: '100%' }}
                                        >
                                            <Option value="1">Tiền mặt</Option>
                                            <Option value="2">Chuyển khoản</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <div >
                                <Text>Tổng tiền: </Text> <Text>{totalPriceBeforeDiscount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                                <br />
                                <Text>Số tiền giảm: </Text>
                                <Text type="success">{(totalPriceBeforeDiscount - totalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                                <br />
                                <Text strong style={{ fontSize: '19px' }}>Khách phải trả: </Text>
                                <Text strong type="danger" style={{ fontSize: '19px' }}>
                                    {totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </Text>
                            </div>
                            <Row gutter={[8, 8]} style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                                <Col xs={24} sm={12}>
                                    <Button
                                        type="primary"
                                        size="medium"
                                        onClick={handleCheckout}
                                        block
                                        style={{ width: '100%', borderRadius: '4px' }}
                                        disabled={loading || !cart || cart.length == 0}
                                    >
                                        Thanh Toán
                                    </Button>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Button
                                        size="medium"
                                        onClick={() => {
                                            setCart([]);
                                            setDiscountCode('');
                                            setPaymentMethod('1');
                                            Notification('Thông báo', 'Đã hủy thanh toán', 'info');
                                        }}
                                        block
                                        style={{ width: '100%', borderRadius: '4px' }}
                                        disabled={loading || !cart || cart.length == 0}
                                    >
                                        Hủy
                                    </Button>
                                </Col>
                            </Row>
                            <Row gutter={[8, 8]} style={{ marginTop: '15px', display: 'flex', justifyContent: 'center' }}>
                                <Col xs={24} sm={12}>
                                    <ThermalBill items={customItems} outputvoucherid={outputVoucherID} />
                                    <Button
                                        type="primary"
                                        size="medium"
                                        onClick={handlePrint}
                                        block
                                        style={{ width: '100%', borderRadius: '4px' }}
                                        disabled={loading || !outputVoucherID}
                                    >
                                        In hóa đơn
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
            </Row>
            {contextHolder}
        </>
    );
};

export default Search;