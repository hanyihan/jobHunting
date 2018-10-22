//注册页面路由
import React,{Component} from 'react';

import { NavBar, Radio,List, InputItem,WingBlank, WhiteSpace,Button} from 'antd-mobile';

import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {register} from '../../redux/actions';
import Logo from '../../components/logo/logo';

const ListItem = List.Item;
class Register extends Component {
	state = {
		username:'',
		password:'',
		password2:'',
		type: 'dashen'
	}

	// 处理输入框、单选框变化，收集数据到 state
	handleChange = (name, value) => {
		this.setState({[name]:value});
	}

	// 跳转到登录
	toLogin = () => {
		this.props.history.replace('/login');
	}

	register = () => {
		//console.log(JSON.stringify(this.state));
		this.props.register(this.state);
	}
	render(){
		const {type} = this.state;
		const {msg, redirectTo} = this.props.user;

		if(redirectTo) {
			return <Redirect to={redirectTo}></Redirect>
		}
		return(
			<div>
				<NavBar>
					Hunting直聘	
				</NavBar>
				<Logo></Logo>
				<WingBlank>
					<List>
						{msg? <div className="error-msg">{msg}</div> : null}
						<WhiteSpace></WhiteSpace>
						<InputItem placeholder="请输入用户名" onChange={val => this.handleChange('username',val)}>
								用户名：
						</InputItem>
						<WhiteSpace></WhiteSpace>
						<InputItem type="password" placeholder="请输入密码" onChange={val => this.handleChange('password',val)}>
								密码：
						</InputItem>
						<WhiteSpace></WhiteSpace>
						<InputItem type="password" placeholder="请确认密码" onChange={val => this.handleChange('password2',val)}>
								确认密码：
						</InputItem>
						<WhiteSpace></WhiteSpace>
						<ListItem>
							<span>用户类型：</span>
							&nbsp;&nbsp;&nbsp;
							<Radio checked={this.state.type === 'dashen'} onClick = {() => {this.handleChange('type','dashen')}}>大神</Radio>
							&nbsp;&nbsp;&nbsp;&nbsp;
							<Radio checked={this.state.type ==='laoban'} onClick= {() => {this.handleChange('type','laoban')}}>老板</Radio>
						</ListItem>
						<WhiteSpace></WhiteSpace>
						<Button type="primary" onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
						<WhiteSpace></WhiteSpace>
						<Button onClick={this.toLogin}>已有账号</Button>
					</List>
					
				</WingBlank>
				

			</div>	
		)
	}
}

export default connect(
	state => ({user:state.user}),{register}
)(Register)
