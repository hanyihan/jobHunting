import ajax from './ajax';

// 注册接口
export const reqRegister = (user) => ajax('/register',user,'POST');

// 登录接口
export const reqLogin = ({username,password}) => ajax('/login',{username,password},'POST');
//查看用户信息
export const reqUser = () => ajax('/user');
// 更新用户信息
export const reqUpdateUser = (user) => ajax('/update',user,'POST');

// 请求用户列表
export const reqUserList = (type) => ajax('/list',{type});

// 请求获取当前用户的所有聊天记录
export const reqChatMsgList = () => ajax('/msglist');

// 标识查看了指定用户发送的聊天信息
export const reqReadChatMsg = (from) => ajax('/readmsg',{from},'POST');

