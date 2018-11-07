// 个人中心

import React, { Component } from 'react';
import { Result, Modal, WhiteSpace, List,Button } from 'antd-mobile';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';
import {resetUser} from '../../redux/actions';

const Item = List.Item;
const Brief = Item.Brief;

const alert = Modal.alert;
class Personal extends Component {

    handleLogout = () => {

        alert('退出登录', '确定退出？', [
            { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
            { text: '确定', onPress: () => {Cookies.remove('userid'); this.props.resetUser()} }
          ]);
    }
    render() {
        const {username,header,post,info,salary,company} = this.props.user;
        return (
            <div style={{marginTop:50}}>
                <Result
                    img={<img src={require(`../../assets/imgs/headers/${header}.png`)} style={{ width: 50 }} alt="header" />}
                    title={username}
                    message={company}
                />
                <List renderHeader={() => '相关信息'}>
                    <Item multipleLine>
                        <Brief>职位：{post}</Brief>
                        <Brief>简介：{info}</Brief>
                        {salary?<Brief>薪资：{salary}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    {/* <Button type="warning" onClick={this.handleLogout}>退出登录</Button> */}
                    <Button onClick={this.handleLogout}  type="warning">退出登录</Button>
                </List>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {resetUser}
)(Personal)