import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER} from './action-types';

// import {reqRegister,reqLogin} from '../api/index';
import {reqRegister,reqLogin,reqUpdateUser} from '../api/index';

const errorMsg = (msg) => ({type:ERROR_MSG,data:msg});
const authSuccess = (user) => ({type:AUTH_SUCCESS,data:user});

const receiveUser = (user) => ({type:RECEIVE_USER,data:user});
const resetUser = (msg) => ({type:RESET_USER,data:msg});

    // 异步注册
export const register = ({username,password,password2,type}) => {
    if(!username || !password || !password2) {
        return errorMsg('用户名密码必须输入');
        
    }
    if(password !== password2) {
        return errorMsg('两次密码输入不一致');
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
export const login = ({username,password}) => {
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

//异步更新状态

export const updateUser = ((user) => {
    return async dispatch => {
        // 发送异步ajax 请求
        const response = await reqUpdateUser(user);
        const result = response.data;
        if(result.code === 0) {//更新成功
            dispatch(receiveUser(result.user));
        }
        else {
            dispatch(resetUser(result.msg));
        }
    }
})
