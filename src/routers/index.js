import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import UI from '../components/UI/Ui';
import PrivateRoute from './PrivateRoute';

const Router = (props) => {
    return (
        <>
            <Routes>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='*' element={<PrivateRoute><UI/></PrivateRoute>}></Route>
            </Routes>
        </>
    );
}
export default Router;