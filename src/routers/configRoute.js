import QRCodeURL from "../components/QRCodeURL";
import DashBoard from "../components/UI/DashBoard";
import PageNotFound from "../components/UI/PageNotFound";
import { routes as dec } from "../views/Declarations";
import { routes as major } from "../views/Major"

const configRoute = [
    {
        path: '/',
        component: DashBoard,
        layout: 'Nguin'
    },
    ...dec,
    ...major,
    {
        path: '*',
        component: PageNotFound,
        layout: 'notUse'
    },
    {
        path: 'QRCodeUrl',
        component: QRCodeURL,
        layout: 'notUse'
    },
]

export default configRoute;