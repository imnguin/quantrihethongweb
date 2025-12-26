import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumb } from '../../../../components/Redux/Reducers';
import { PagePath, columns } from '../constants';
import { _fetchData } from '../../../../utils/CallAPI';
import { HOSTNAME } from '../../../../utils/constants/systemVars';
import { Notification } from '../../../../utils/Notification';
import { Row, Col, Card, Table, Button, Input, Form, Typography, Modal, Select, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ExcelExport from '../../../../components/ExcelExport';
import ImportExcel from '../../../../components/ExcelImport';

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
    const [barcode, setBarcode] = useState('');
    const [loading, setLoading] = useState(false);
    const [weight, setWeight] = useState('0.00');
    const [customers, setCustomers] = useState([]);
    const [productItems, setProductItem] = useState([]);

    const [defaultCustomerId, setDefaultCustomerId] = useState(null);

    useEffect(() => {
        dispatch(setBreadcrumb(PagePath));
        initCustomer();
        init();
    }, []);
    const init = async () => {
        const response = await dispatch(_fetchData(HOSTNAME, 'api/product/getCache', {}));
        if (!response.iserror && response.resultObject) {
            setProductItem(response.resultObject);
        }
    }

    const initCustomer = async () => {
        const response = await dispatch(_fetchData(HOSTNAME, 'api/customer/getCache', {}));
        if (!!response.resultObject && response.resultObject.length > 0) {
            setCustomers(response.resultObject);
        }
    };

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');

        ws.onopen = () => {
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.error) {
                    Notification('Lỗi', data.error, 'error');
                } else if (data.weight !== undefined) {
                    const weightText = data.unit ? `${data.weight} ${data.unit}` : data.weight;
                    console.log(weightText)
                    setWeight(weightText);
                }
            } catch (e) {
                console.error('Lỗi parse dữ liệu WebSocket:', e);
            }
        };

        ws.onclose = () => {
        };

        ws.onerror = () => {
        };

        return () => {
            ws.close();
        };
    }, []);

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
                const index = prev.findIndex((item) => item.productid === response.resultObject.productid);
                if (index !== -1) {
                    const updatedCart = [...prev];
                    let itemUpdate = {
                        ...response.resultObject,
                        quantity: updatedCart[index].quantity + 1,
                        customerid: updatedCart[index].customerid,
                        price: updatedCart[index].price,
                        imageurl: updatedCart[index].imageurl,
                    };
                    updatedCart[index] = itemUpdate;
                    return updatedCart;
                }

                let itemUpdate = { ...response.resultObject, quantity: 1, imageurl: '', customerid: defaultCustomerId };
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

    const handleChangeValue = (productid, key, value) => {
        // if (!value) { value = 0; }
        if (value < 0 && ['quantity', 'price'].includes(key)) {
            Notification('Thông báo', 'Giá trị không hợp lệ!', 'error');
            return;
        }
        if (!!productid) {
            const data = cart.map((item, index) => {
                if (item.productid === productid) {
                    item[key] = value;
                }
                return item;
            })
            setCart(data);
            return
        }
    };

    const handleRemoveItem = (productid) => {
        setCart(cart.filter((item) => item.productid !== productid));
        Notification('Thông báo', 'Đã xóa sản phẩm khỏi danh sách!', 'success');
    };

    const handleSubmit = async () => {
        setLoading(true);
        const postData = cart.map((item, index) => {
            return {
                createduser: user?.username,
                productid: item.productid,
                productname: item.productname,
                quantityunitid: item.quantityunitid,
                quantityunitname: item.quantityunitname,
                barcode: item.barcode,
                price: parseFloat(item.price),
                quantity: item.quantity,
                customerid: item.customerid,
                customername: customers.find(c => c.customerid == item.customerid)?.customername,
                imageurl: item.imageurl,
                defaultcustomerid: defaultCustomerId
            }
        })

        console.log(postData);

        const response = await dispatch(_fetchData(HOSTNAME, 'api/inputvoucher/add', postData));
        Notification('Thông báo', response.message, response.iserror ? 'error' : 'success');
        setLoading(false);
        if (!response.iserror) {
            setCart([]);
            return
        }
    };

    const getWeight = async (productid) => {
        // const match = weight.match(/[-+]?\d*\.?\d+/);
        // const numberPart = match ? parseFloat(match[0]) : 0;
        // handleChangeValue(productid, 'quantity', numberPart);
        const response = await dispatch(_fetchData(HOSTNAME, 'api/weight', {}));
        let numberPart = 0;
        if (!response.iserror && response.resultObject) {
            const match = response.resultObject.weight.match(/[-+]?\d*\.?\d+/);
            numberPart = match ? parseFloat(match[0]) : 0;
        }
        handleChangeValue(productid, 'quantity', numberPart);
    }

    const excelDataTemplate = {
        data: [
            ['Mã sản phẩm', 'Tên sản phẩm', 'Mã đơn vị tính', 'Tên đơn vị tính', 'Barcode', 'Đơn giá', 'Số lượng', 'Mã khách hàng', 'Tên khách hàng', 'Link ảnh'],
            ['4241412000844', 'Sản phẩm ABC', '1', 'Kilogam', '123', 5000, 2, 1, 'Khách hàng số 1', 'https://i.pinimg.com/236x/85/40/33/854033242929cb15cd206e07b3981d58.jpg']
        ],
    }

    const schema = {
        "Mã sản phẩm": {
            prop: 'productid',
            type: String,
            required: true
        },
        "Tên sản phẩm": {
            prop: 'productname',
            type: String,
            required: true
        },
        "Mã đơn vị tính": {
            prop: 'quantityunitid',
            type: String,
            required: true
        },
        "Tên đơn vị tính": {
            prop: 'quantityunitname',
            type: String,
            required: true
        },
        "Barcode": {
            prop: 'barcode',
            type: String,
            required: true
        },
        "Đơn giá": {
            prop: 'price',
            type: Number,
            required: true
        },
        "Số lượng": {
            prop: 'quantity',
            type: Number,
            required: true
        },
        "Mã khách hàng": {
            prop: 'customerid',
            type: Number
        },
        "Tên khách hàng": {
            prop: 'customername',
            type: String
        },
        "Link ảnh": {
            prop: 'imageurl',
            type: String
        },
    };

    const handleImportExcel = async (data) => {
        setLoading(true);
        const postData = data.map((item, index) => {
            return {
                createduser: user?.username,
                ...item
            }
        })

        const response = await dispatch(_fetchData(HOSTNAME, 'api/inputvoucher/add', postData));
        Notification('Thông báo', response.message, response.iserror ? 'error' : 'success');
        setLoading(false);
    }

    const onChangeDefaultCustomer = (value) => {
        setDefaultCustomerId(value);
        const newCart = cart?.map(item => {
            if (!item.customerid) {
                item.customerid = value
                console.log('change')
            }
            return item;
        });

        console.log(newCart)
        setCart(newCart);
    }

    return (
        <>
            <Card
                title="Nhập hàng (click vào vùng trống khi quét mã)"
                style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            >
                <Row type="flex" justify="end" align="middle" style={{ marginBottom: 10 }}>
                    <Form
                        form={form}
                        name='input-barcode'
                        layout="inline"
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
                        <Form.Item name="barcode">
                            <Input placeholder="Nhập mã barcode" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Thêm</Button>
                        </Form.Item>
                    </Form>
                    <div style={{ display: 'flex', gap: 15 }}>
                        <ExcelExport
                            title='Xuất file mẫu'
                            name={'File mẫu phiếu nhập'}
                            sheets={[excelDataTemplate]}
                        />
                        <ImportExcel
                            schema={schema}
                            call={handleImportExcel}
                        />
                    </div>
                </Row>
                <Table
                    size="small"
                    columns={columns(handleChangeValue, handleRemoveItem, getWeight, customers)}
                    dataSource={cart}
                    rowKey="_id"
                    pagination={false}
                    bordered
                    scroll={{ x: true }}
                />
                <Row type="flex" justify="end" align="middle" style={{ marginTop: 5, gap: 10 }}>
                    <Select
                        allowClear
                        showSearch
                        style={{ width: '500px', marginTop: 5 }}
                        onChange={(val) => onChangeDefaultCustomer(val)}
                        filterOption={(input, option) =>
                            option.value
                                .toString()
                                .toLowerCase()
                                .includes(input.toLowerCase()) ||
                            option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        placeholder='Vui lòng nhập để chọn khách hàng'
                    >
                        {
                            customers.map((item, index) => {
                                return (<Select.Option value={item.customerid} key={index} label={item.customername}>{`${item.customerid} - ${item.customername}`}</Select.Option>)
                            })
                        }
                    </Select>
                    <Button style={{ marginTop: 5 }} type="primary" htmlType="submit" onClick={handleSubmit}>Cập nhật</Button>
                </Row>
            </Card>
            {contextHolder}
        </>
    );
};

export default Search;