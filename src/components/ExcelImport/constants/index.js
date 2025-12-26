export const listColumn = [
    {
        key: 'row',
        dataIndex: 'row',
        title: 'Dòng'
    },
    {
        key: 'column',
        dataIndex: 'column',
        title: 'Cột'
    },
    {
        key: 'error',
        dataIndex: 'error',
        title: 'Thông tin lỗi',
        render: (text) => <span style={{ color: 'red' }}>{text}</span>
    },
];