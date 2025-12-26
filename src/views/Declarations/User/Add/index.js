import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumb } from "../../../../components/Redux/Reducers";
import { AddElementList, AddPagePath } from "../constants";
import FormContainer from "../../../../components/FormContainer";
import { _fetchData } from "../../../../utils/CallAPI";
import { HOSTNAME } from "../../../../utils/constants/systemVars";
import { Notification } from "../../../../utils/Notification";
import { useNavigate } from "react-router-dom";

const Add = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(setBreadcrumb(AddPagePath));
    }, []);

    const onSubmit = async (MLObject) => {
        console.log('onSubmit', MLObject);
        MLObject.password  = '080104';
        const response = await dispatch(_fetchData(HOSTNAME, 'api/user/add', MLObject));
        if (!response.iserror) {
            navigate('/User');
        }else {
            Notification('Thông báo', response.message, 'error');
        }
    }

    return(
        <FormContainer
            title='Thêm mới nhân viên'
            backLink='/User'
            onSubmit={onSubmit}
            listColumn={AddElementList}
            dataSoure={{}}
            layout='horizontal' //default : vertical
        ></FormContainer>
    );
}
export default Add;