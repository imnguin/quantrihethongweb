import Detail from './Detail';
import History from './History';
import ReportOutputVoucherDetail from './Report';
import Search from './Search'

const OutputVoucher = [
    {
        path : '/OutputVoucher',
        component : Search
    },
    {
        path : '/History',
        component : History
    },
    {
        path : '/OutputVoucher/Detail/:outputvoucherid',
        component : Detail
    },
    {
        path : '/ReportOutputVoucherDetail',
        component : ReportOutputVoucherDetail
    },
]
export default OutputVoucher;