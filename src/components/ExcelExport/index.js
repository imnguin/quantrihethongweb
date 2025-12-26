import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

const ExcelExport = (props) => {
    const { sheets = [], name, title, placement } = props;
    const exportFile = () => {
        if (!sheets.length) {
            console.error("No sheets provided for export.");
            return;
        }
        const wb = XLSX.utils.book_new();
        sheets.forEach((sheet, index) => {
            const ws = XLSX.utils.aoa_to_sheet(sheet.data);
            XLSX.utils.book_append_sheet(wb, ws, sheet.name || `Sheet${index + 1}`);
        });

        XLSX.writeFile(wb, !!name ? `${name}.xlsx` : 'exported_data.xlsx');
    }

    return (
        <Tooltip title={title} placement={placement || 'top'}>
            <Button onClick={exportFile} size='middle' htmlType='button'>
                <DownloadOutlined /> {title}
            </Button>
        </Tooltip>
    );
}

export default ExcelExport;
