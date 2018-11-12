// 对话聊天

import React, { Component } from 'react';
import { NavBar, List, InputItem, Icon,Grid } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';

import { sendMsg, readMsg } from '../../redux/actions';

const Item = List.Item;

class Chat extends Component {
    state = {
        content: '',
        isShow: false //是否显示表情列表
    }
    
    componentWillMount() {
        const emojis = ['😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀'
            , '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣'
            , '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣'
            , '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣'];
        this.emojis = emojis.map(emojis => ({text:emojis}));
    }

    
    componentDidMount() {
        // 初始显示列表

        window.scrollTo(0, document.body.scrollHeight);
    
    }
    
    componentDidUpdate () {
        // 更新显示列表
        window.scrollTo(0, document.body.scrollHeight);
    }
    
    componentWillUnmount() {//在退出前
        const from = this.props.match.params.userid;
        const to = this.props.user._id;
        this.props.readMsg(from, to);
    }

    toggleShow = () => {
        const isShow = !this.state.isShow;
        this.setState({isShow});
        if(isShow) {
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 0);
        }
    }
    handleSend = () => {
        const content = this.state.content.trim();
        const to = this.props.match.params.userid;
        const from = this.props.user._id;
        if (content) {
            this.props.sendMsg({ from, to, content });
        }

        this.setState({ content: '' , isShow: false})
    }
    render() {
        const { user } = this.props;
        const { chatMsgs, users } = this.props.chat;
        const targetId = this.props.match.params.userid;
        const meId = user._id;
        if (!users[meId]) {
            return null;
        }
        const chatId = [targetId, meId].sort().join('_');
        const msgs = chatMsgs.filter(msg => msg.chat_id === chatId);
        const targetHeader = users[targetId].header
        const targetIcon = targetHeader ? require(`../../assets/imgs/headers/${targetHeader}.png`) : null;
        return (
            <div id='chat-page'>
                <NavBar
                    className='sticky-header'
                    icon={<Icon type='left' />}
                    onLeftClick={() => this.props.history.goBack()}
                >
                    {users[targetId].username}
                </NavBar>
                <List style={{ marginBottom: 50, marginTop: 50 }}>
                    <QueueAnim type='left' delay={100}>
                        {
                            msgs.map(msg => {
                                if (msg.from === targetId) {
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
                    </QueueAnim>
                </List>
                <div className='am-tab-bar'>
                    <InputItem 
                    placeholder="请输入" 
                    value={this.state.content} 
                    onChange={val => this.setState({ content: val })} 
                    onFocus={ () => this.setState({isShow:false})}
                    extra={
                        <span>
                            <span onClick={this.toggleShow} style={{marginRight:5}}>😊</span>
                            <span onClick={this.handleSend}>发送</span>
                        </span>
                    }>
                    </InputItem>
                    {this.state.isShow? (
                        <Grid
                        data={this.emojis}
                        columnNum={8}
                        carouselMaxRow={4}
                        onClick={(item) => {
                            this.setState({content: this.state.content + item.text});
                        }}>

                        </Grid>
                    ) : null }
                </div>
            </div>
        )
    }

    // render(){
    //     return (
    //         <div id='chat-page'>
    //             <NavBar>aa</NavBar>
    //             <List>
    //                 <Item thumb={require('../../assets/imgs/headers/头像1.png')}>你好</Item>
    //                 <Item thumb={require('../../assets/imgs/headers/头像1.png')}>你好3</Item>
    //                 <Item className='chat-me' extra='我'>很好</Item>
    //                 <Item className='chat-me' extra='我'>很好2</Item>

    //             </List>
    //             <div className='am-tab-bar'>
    //                 <InputItem placeholder='请输入' value = {this.state.content} onChange={val => this.setState({content: val})} extra={<span onClick={this.handleSend}>发送</span>}></InputItem>
    //             </div>
    //         </div>
    //     )
    // }
}

export default connect(
    state => ({ user: state.user, chat: state.chat }),
    { sendMsg, readMsg }
)(Chat)


