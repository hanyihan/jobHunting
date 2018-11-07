// 对话聊天

import React,{Component} from 'react';
import {NavBar,List,InputItem,Icon} from 'antd-mobile';
import {connect} from 'react-redux';

import {sendMsg} from '../../redux/actions';

const Item = List.Item;

class Chat extends Component {
    state= {
        content:''
    }
    componentDidMount() {
        window.scrollTo(0,document.body.scrollHeight);
        this.props.readMsg(this.props.match.params.userid);
    }
    componentWillUnmount() {
        this.props.readMsg(this.props.match.params.userid);
    }
    componentDidUpdate(){
        window.scrollTo(0,document,body,scrollHeight);

    }
    submit = () => {
        const content =this.state.content.trim();
        const to = this.props.match.params.userid;
        const from = this.props.user._id;
        this.props.sendMsg({from,to,content});
        this.setState({content:''})
    }
    render(){
        const{user} = this.props;
        const {chatMsgs,users} = this.props.chat;
        const targetId = this.props.match.params.userid;
        if(!users[targetId]) {
            return null;
        }
        const meId = user._id;
        const chatId = [targetId,meId].sort().join('_');
        const msgs = chatMsgs.filter(msg => msg.chat_id===chatId);
        const targetIcon = users[targetId]?require(`../../assets/imgs/headers/${users[targetId].header}.png`):null;
        return(
            <div id='chat-page'>
                <NavBar 
                className='stick-top' 
                icon={<Icon type='left'/>} 
                onLeftClick={() =>this.props.history.goBack()}
                >
                    {users[targetId].username}
                </NavBar>
                <List style={{marginBottom:50,marginTop:50}}>
                {
                    msgs.map(msg => {
                        if(msg.from === targetId) {
                            return (
                                <Item key={msg._id} thumb={targetIcon}>{msg.content}</Item>
                            )
                        }
                        else {
                            return (
                                <Item key={msg._id} className='chat-me' extra='我'>
                                    {msg.content}
                                </Item>
                            )
                        }
                    })
                }
                </List>
                <div className='am-tab-bar'>
                    <InputItem placeholder="请输入" value={this.state.content} onChange={val => this.setState({content:val})} extra={<span onClick={this.submit}>发送</span>}>
                    </InputItem>

                </div>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user,chat:state.chat}),
    {sendMsg}
)(Chat)


