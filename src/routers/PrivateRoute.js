import React from "react";
import { useLocation, Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const location = useLocation();
    const logininfo = localStorage.getItem('logininfo');
    const data = JSON.parse(logininfo);

    if((!data && !data?.accesstoken))
    {
       return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default PrivateRoute;