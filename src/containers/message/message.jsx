// 对话消息列表

import React,{Component} from 'react';
import {connect} from 'react-redux';
import {List,Badge} from 'antd-mobile';



const Item = List.Item;
const Brief = Item.Brief;

function getLastMsgs(chatMsgs,userid) {
    // 每个聊天的lastMsg，并用对象容器保存
    const lastMsgsObj = {};
    chatMsgs.forEach(msg => {

        if(!msg.read && userid === msg.to) {
            msg.unReadCount = 1;
        }
        else {
            msg.unReadCount = 0;
        }
        const chatId = msg.chat_id;
        const lastMsg = lastMsgsObj[chatId];
        if(!lastMsg) {
            lastMsgsObj[chatId] = msg;   
        }
        else {
            const unReadCount = lastMsg.unReadCount + msg.unReadCount;
            if(msg.create_time > lastMsg.create_time) {
                lastMsgsObj[chatId] = msg;
                
            }
            lastMsgsObj[chatId].unReadCount = unReadCount;
        }
    })
    const lastMsgs = Object.values(lastMsgsObj) 
    lastMsgs.sort(function(msg1,msg2) {
        return msg2.create_time-msg1.create_time
    })

    return lastMsgs;
    
}

class Message extends Component {

    render() {
        const {user} = this.props;
        const meId = user._id;
        const {users,chatMsgs} = this.props.chat;
        const lastMsgs =getLastMsgs(chatMsgs,meId);
        return (
            <List style={{marginTop:50,marginBottom:50}}>
                {
                    lastMsgs.map(msg => {
                        const targetId = msg.to === meId? msg.from : msg.to;
                        const targetUser = users[targetId];
                        const avatarImg = targetUser.avatar ? require(`../../assets/imgs/headers/${targetUser.avatar}.png`):null
                        return (
                            <Item key={msg._id} extra={<Badge text={msg.unReadCount}/>} thumb={avatarImg} arrow='horizontal' onClick={() => this.props.history.push(`/chat/${targetId}`)}>
                                {msg.content}
                                <Brief>{targetUser.username}</Brief>
                            </Item>
                        )
                    })
                }
            </List>
        )
    }
}

export default connect(
    state => ({
        user: state.user,
        chat: state.chat
    })
)(Message)