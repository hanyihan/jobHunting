import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USER_List,RECEIVE_MSG_LIST,RECEIVE_MSG,MSG_READ} from './action-types';

// import {reqRegister,reqLogin} from '../api/index';
import {reqRegister,reqLogin,reqUpdateUser, reqUser,reqUserList,reqChatMsgList,reqReadChatMsg} from '../api/index';
import io from 'socket.io-client';

const errorMsg = (msg) => ({type:ERROR_MSG,data:msg});
const authSuccess = (user) => ({type:AUTH_SUCCESS,data:user});

const receiveUser = (user) => ({type:RECEIVE_USER,data:user});
const receiveUserList = (users) =>({type:RECEIVE_USER_List,data:users})
export const resetUser = (msg) => ({type:RESET_USER,data:msg});

// 接收消息列表的同步action
const receiveMsgList = ({users,chatMsgs,userid}) => ({type:RECEIVE_MSG_LIST,data:{users,chatMsgs,userid}});
// 接收消息的同步action
const receiveMsg = (chatMsg,isToMe) => ({type:RECEIVE_MSG,data:{chatMsg,isToMe}});
// 读取了消息的同步action
const msgRead = ({from,to,count}) => ({type:MSG_READ,data:{from ,to, count}});

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
            dispatch(receiveUser(result.data));
        }
        else {
            dispatch(resetUser(result.msg));
        }
    }
})


// 异步获取状态

export const getUser = () => {
    return async dispatch => {
        const response = await reqUser();
        const result = response.data;
        if(result.code === 0) {
            dispatch(receiveUser(result.data));
        }
        else {
            dispatch(resetUser(result.msg));
        }
    }
}

// 异步获取用户列表
export const getUserList = (type) => {
    return async dispatch => {
        const resopnse = await reqUserList(type);
        const result = resopnse.data;
        if(result.code === 0) {
            dispatch(receiveUserList(result.data));
        }
    }
}

// 初始化客户端socketio
// 1.链接服务器
// 2.绑定用于接收服务器返回chatMsg的监听

function initIO(dispatch,userid) {
    if(!io.socket) {
        io.socket = io('ws://localhost:4000');
        io.socket.on('receiveMsg',(chatMsg) => {
            if(chatMsg.from === userid || chatMsg.to === userid) {
                dispatch(receiveMsg(chatMsg,chatMsg.to === userid));
            }
        })
    }
}

// 获取当前用户相关的聊天消息列表

async function getMsgList(dispatch,userid) {
    initIO(dispatch,userid);
    const response = await reqChatMsgList();
    const result = response.data;
    if(result.code === 0) {
        const{chatMsgs,users} = result.data;
        dispatch(receiveMsgList({chatMsgs,users,userid}));
    }
}

// 发送消息的异步action
export const sendMsg = ({from,to,content}) => {
    return async dispatch => {
        io.socket.emit('sendMsg',{from,to,content});
    }
}


// 更新读取消息的异步action

export const readMsg = (userid) => {
    return async (dispatch,getState) => {
        const response = await reqReadChatMsg(userid);
        const result = response.data;
        if(result.code ===0) {
            const count = result.data;
            const from = userid;
            const to = getState().user._id;
            dispatch(msgRead({from,to,count}));
        }
    }
}





