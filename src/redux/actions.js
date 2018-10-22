import {AUTH_SUCCESS,ERROR_MSG} from './action-types';

import {reqRegister,reqLogin} from '../api/index';

const errorMsg = (msg) => ({type:ERROR_MSG,data:msg});
const authSuccess = (user) => ({type:AUTH_SUCCESS,data:user});

    // 异步注册
export function register({username,password,password2,type}) {
    if(!username || !password || !password2) {
        return errorMsg('用户名密码必须输入');
        
    }
    if(password !== password2) {
        return errorMsg('两次密码输入不一致')；
    }


    return async dispatch => {
        const response = await reqRegister({username,password,type});
        const result = response.data;

        if(result.code === 0) {
            dispatch(authSuccess(result.data));
        }
        else {
            dispatch(errorMsg(result.msg));
        }
    }


}

 // 异步登录
export const Login = ({username,password}) => {
    if(!username || !password) {
        return errorMsg('请输入用户名密码');
    }

    return async dispatch => {
        const response = await reqLogin({username,password});
        const result = response.data;
        if(result.code === 0) {
            dispatch(authSuccess(result.data));
        }
        else {
            dispatch(errorMsg(result.msg));
        }
    }
}


