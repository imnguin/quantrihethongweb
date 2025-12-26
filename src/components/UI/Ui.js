import React from 'react';
import configRoute from '../../routers/configRoute'
import Layout from './Layout';
import { Routes, Route, Navigate } from 'react-router-dom';

const UI = (props) => {
    return (
        <React.Suspense fallback={<div>Đang tải dữ liệu... </div>}>
            <Routes>
                {
                    configRoute.map(({ component: Component, path, layout, breadcrumb }, index) => (
                        <Route path={path} key={path} element={Component ? <Layout layout={!!layout ? layout : 'Nguin'}><Component /></Layout> : <Navigate to={'/'} replace={true} />} />
                    ))
                }
            </Routes>
        </React.Suspense>
    );
}
export default UI;