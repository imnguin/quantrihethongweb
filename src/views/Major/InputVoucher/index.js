import Detail from './Detail';
import History from './History';
import ReportInputVoucherDetail from './Report';
import Search from './Search';

const InputVoucher = [
    {
        path : '/InputVoucher',
        component : Search
    },
    {
        path : '/InputVoucherHistory',
        component : History
    },
    {
        path : '/InputVoucher/Detail/:inputvoucherid',
        component : Detail
    },
    {
        path : '/ReportInputVoucherDetail',
        component : ReportInputVoucherDetail
    },
]
export default InputVoucher;