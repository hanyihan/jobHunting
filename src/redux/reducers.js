import {combineReducers} from 'redux';

import { AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER, RECEIVE_USER_List,RECEIVE_MSG_LIST,RECEIVE_MSG,MSG_READ} from './action-types';
import {getRedirectPath} from '../utils/index';

const initUser = {
    username:'', //用户名
    type:'', //类型
    msg:'', //错误提示信息
    redirectTo:'' //需要自动跳转的路由
}

const initChat = {
    chatMsgs:[], //消息数组
    users:{}, //所有用户的集合对象
    unReadCount:0 //未读消息的数量
}

const initUserList = [];


function user (state = initUser,action){
    switch(action.type) {
        case AUTH_SUCCESS: 
            const redirectTo = getRedirectPath(action.data.type,action.data.header);
            return {...action.data,redirectTo};
        case ERROR_MSG:
            return {...state,msg: action.data};
        case RECEIVE_USER:
            return action.data;
        case RESET_USER:
            return {...initUser, msg:action.data}
        default: 
            return state;
    }
}

function userList(state = initUserList,action) {
    switch(action.type) {
        case RECEIVE_USER_List:
            return action.data;
        default:
            return state;
    }
}

// 管理聊天相关信息数据的reducer
// function chat (state=initChat,action) {
//     switch(action.type) {
//         case RECEIVE_MSG_LIST:
//             const {users,chatMsgs} = action.data;
//             return {
//                 users,
//                 chatMsgs,
//                 unReadCount:0
//             }
//         case RECEIVE_MSG:
//             return 0;
//         default:
//             return state;
//     }
// }
function chat(state=initChat,action) {
    switch(action.type) {
        case RECEIVE_MSG_LIST:
            const {chatMsgs,users,userid} = action.data;
            return {
                chatMsgs,
                users,
                unReadCount: chatMsgs.reduce((preTotal,msg) => preTotal + (!msg.read && msg.to === userid ? 1 : 0),0)
            }
        case RECEIVE_MSG:
            const {chatMsg} = action.data;
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unReadCount: state.unReadCount + (!chatMsg.read&&chatMsg.to===action.data.userid?1:0)
              }
        case MSG_READ:
            const {from, to,count} = action.data;
            
            state.chatMsgs.forEach(msg => {
                if(msg.from === from && msg.to === to && !msg.read) {
                    msg.read = true;
                }
            })
            return {
                users: state.users,
                chatMsgs: state.chatMsgs.map(msg => {
                    if(msg.from === from && msg.to === to && !msg.read) {
                        return {...msg, read:true}
                    }
                    else {
                        return msg;
                    }
                }),
                unReadCount: state.unReadCount-count
            }
        default:
            return state;
    }
}

export default combineReducers({
    user,
    userList,
    chat
})



