import { Button, Tooltip, Modal, Table } from "antd";
import React from "react";
import { UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import readXlsxFile from "read-excel-file";
import ErrorInfo from "./components/ErrorInfo";
const ImportExcel = (props) => {
    const {
        sheet,
        schema,
        call,
        check,
        rules
    } = props;

    const [modal, contextHolder] = Modal.useModal();
    const showModal = (content, isError, icon) => {
        if (!!isError) {
            modal.error({
                title: 'Thông báo!',
                icon,
                content: <span style={{ color: 'red' }}>{content}</span>,
            });
        } else {
            modal.success({
                title: 'Thông báo!',
                icon,
                content
            });
        }
    }

    const onClick = () => {
        const input = document.getElementById("imPortFile");
        input.click();
        input.addEventListener("change", () => {
            readXlsxFile(input.files[0], { sheet: sheet || 'Sheet1', schema: schema }).then((data) => {
                if (data.errors.length != 0) {
                    let content = <ErrorInfo data={data.errors} />
                    showModal(content, true);
                    return
                }
                else {
                    if (!!check) {
                        let errors = check?.(data.rows);
                        if (!!errors && Array.isArray(errors)) {
                            if (errors.length > 0) {
                                let content = <ErrorInfo data={errors} />
                                showModal(content, true);
                                return
                            } else {
                                call?.(data.rows);
                            }
                        } else {
                            showModal('Lỗi kiểm tra dữ liệu. Vui lòng liên hệ IT!', true);
                        }
                    } else {
                        let errors = [];
                        if (!!rules && rules.length > 0) {
                            data.rows.map((item, index) => {
                                const keys = Object.keys(item);
                                rules.map((rule, i) => {
                                    let key = keys.find(x => x == rule.key);
                                    if (!!key) {
                                        let smg = 'Không được phép:';
                                        let isError = false;
                                        rule.value.map(val => {
                                            if (!!val.includes('<=')) {
                                                const parts = val.split('<=');
                                                if (item[key] <= parseInt(parts[1])) {
                                                    smg += ` (<= ${parts[1]})`
                                                    isError = true;
                                                }
                                            } else if (!!val.includes('<')) {
                                                const parts = val.split('<');
                                                if (item[key] < parseInt(parts[1])) {
                                                    smg += ` (< ${parts[1]})`
                                                    isError = true;
                                                }
                                            } else if (!!val.includes('>=')) {
                                                const parts = val.split('>=');
                                                if (item[key] < parseInt(parts[1])) {
                                                    smg += ` (>= ${parts[1]})`
                                                    isError = true;
                                                }
                                            } else if (!!val.includes('>')) {
                                                const parts = val.split('>');
                                                if (item[key] < parseInt(parts[1])) {
                                                    smg += ` (> ${parts[1]})`
                                                    isError = true;
                                                }
                                            }
                                        });
                                        if (!!isError) {
                                            errors.push({
                                                error: smg,
                                                row: index + 2,
                                                column: rule.column
                                            });
                                        }
                                    }
                                });
                            });
                        }

                        if (errors.length > 0) {
                            let content = <ErrorInfo data={errors} />
                            showModal(content, true);
                            return
                        } else {
                            call?.(data.rows);
                        }
                    }
                }
            }).catch(error => {
                showModal(`Lỗi thêm file dữ liệu! ${error}`, true);
            }).finally(() => {
                input.value = '';
            });
        }, { once: true })
    }

    return (
        <Tooltip title='Thêm file' placement='top'>
            <Button size='middle' htmlType='button' onClick={onClick}>
                <UploadOutlined /> Thêm file
            </Button>
            <input type="file" id="imPortFile" hidden />
            {contextHolder}
        </Tooltip>
    );
}
export default ImportExcel;