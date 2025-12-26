import { hideLoading, setDataUser, showLoading } from '../components/Redux/Reducers';
import { HOST_LIST } from "./constants/systemVars";
import { _fetchAPI } from "./FuncRequest";
import AsyncStorage from '@react-native-async-storage/async-storage';

const _fetchLogin = (hostName, apiPath, data) => async (dispatch, state) => {
    try {
        dispatch(showLoading());
        const apiResult = await _fetchAPI(`${HOST_LIST[hostName].hostBaseURL}${apiPath}`, data);
        dispatch(hideLoading());

        if (!apiResult.iserror) {
            await AsyncStorage.setItem('logininfo', JSON.stringify(apiResult.resultObject));
            dispatch(setDataUser(JSON.stringify(apiResult.resultObject)));
            return {
                ...apiResult,
                messaege: 'Đăng nhập thành công!',
            }
        }
        else {
            return apiResult;
        }
    } catch (error) {
        return {
            iserror: true,
            message: error.messaege,
            messagedetail: error,
            resultObject: null
        }
    }
}

const _fetchData = (hostName, apiPath, data, method = 'POST') => async (dispatch, state) => {
    try {
        const logininfo = JSON.parse(localStorage.getItem('logininfo'));
        const _header = {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'Access-Control-Allow-Origin': '*',
            "authorization": `Bearer ${logininfo.accessToken}`,
            'Content-Type': 'application/json'
        };

        dispatch(showLoading());
        const apiResult = await _fetchAPI(`${HOST_LIST[hostName].hostBaseURL}${apiPath}`, data, _header);
        dispatch(hideLoading());
        if (apiResult.status == 403) {
            window.location.href = "/login";
            return
        }
        return apiResult

    } catch (error) {
        return {
            iserror: true,
            message: error.message,
            messagedetail: error,
            resultObject: null
        }
    }
}

export {
    _fetchLogin,
    _fetchData
}