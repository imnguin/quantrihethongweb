import React from "react";

const ThermalBill = (props) => {
    let { items, outputvoucherid } = props;
    const total = items.reduce((sum, item) => sum + item.totalamount, 0);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);
    };

    // Kích thước chữ cơ bản cho bill (10px)
    const baseTextSize = "text-[10px]"; 
    // Kích thước chữ nhỏ hơn cho chi tiết sản phẩm và tên sản phẩm (9px)
    const smallTextSize = "text-[9px]"; 
    // Kích thước chữ siêu nhỏ cho chân bill (9px)
    const extraSmallTextSize = "text-[9px]";

    return (
        <div style={{ display: 'none' }} id="printbill" className="max-w-xs mx-auto">
            {/* Áp dụng kích thước chữ cơ bản và font-bold cho toàn bộ bill */}
            <div className={`bill bg-white border border-gray-300 ${baseTextSize} font-bold`}> 
                
                {/* Phần đầu bill */}
                <div style={{padding: '0.8rem 0.5rem 0.5rem 0.5rem'}}>
                    <h1 className="text-center text-base">BILL TÍNH TIỀN</h1> 
                    <p className="text-center">BÁCH HÓA SV</p>
                    <p className="text-center">Ngày: {new Date().toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' })}</p>
                    <p className="text-center">Mã bill: {outputvoucherid}</p>
                    <hr className="my-1" />
                    
                    {/* Bảng danh sách sản phẩm */}
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-400">
                                <th className="text-left py-1">Sản phẩm</th>
                                <th className="text-right py-1">Đơn giá</th>
                                <th className="text-right py-1">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index} className="pb-1">
                                    {/* *** THAY ĐỔI: Tên sản phẩm nhỏ hơn (9px) *** */}
                                    <td className={smallTextSize}> 
                                        <p>{item.productname}</p> 
                                        <p className={extraSmallTextSize}>x{item.quantity} {item.quantityunitname}</p> 
                                    </td>
                                    {/* Giá và Thành tiền cũng nhỏ hơn (9px) */}
                                    <td className={`text-right ${smallTextSize}`}>{formatCurrency(item.price)}</td>
                                    <td className={`text-right ${smallTextSize}`}>{formatCurrency(item.totalamount)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    <hr className="my-1" />
                    {/* TỔNG TIỀN: Giữ nguyên text-lg để nổi bật */}
                    <div className="flex justify-between text-lg"> 
                        <span>Tiền phải trả:</span>
                        <span>{formatCurrency(total)}</span>
                    </div>
                </div>
                
                {/* Phần chân bill */}
                <div className={`text-center ${extraSmallTextSize}`} style={{padding: '0.2rem 0.5rem 0.5rem 0.5rem'}}> 
                    <p className="mt-1">Cảm ơn quý khách!</p>
                    <p>Hẹn gặp lại!</p>
                </div>
                
            </div>
        </div>
    );
};

export default ThermalBill;