import {combineReducers} from 'redux';

import { AUTH_SUCCESS,ERROR_MSG} from './action-types';

const initUser = {
    username:'', //用户名
    type:'', //类型
    msg:'', //错误提示信息
    redirectTo:'' //需要自动跳转的路由
}


function user (state = initUser,action){
    switch(action.type) {
        case AUTH_SUCCESS: 
            return {...action.data,redirectTo:'/'}
        case ERROR_MSG:
            return {...state,msg: action.data}
        default: 
            return state;
    }
}

export default combineReducers({
    user
})



