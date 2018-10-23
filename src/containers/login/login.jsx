//登录页面路由
import React,{Component} from 'react';
import { NavBar, List, InputItem,WingBlank, WhiteSpace,Button} from 'antd-mobile';

import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {login} from '../../redux/actions';
import '../../assets/css/index.less';
import Logo from '../../components/logo/logo';

class Login extends Component {
	state = {
		username:'',
		password:''
	}

	handleChange =(name,value) => {
		this.setState({[name]:value});
	}

	login = () => {
		//console.log(this.props);
		this.props.login(this.state);
	}

	toRegister = () => {
		this.props.history.replace('/register');
	}
	render(){
		const {redirectTo,msg} = this.props;
		if(redirectTo) {
			return <Redirect to={redirectTo}></Redirect>
		}
		return (
			<div>
				<NavBar>
					Hunting直聘	
				</NavBar>
				<Logo></Logo>
				<WingBlank>
					{msg? <div className="error-msg"></div>:null}
					<List>
						{/* {msg? <div className="error-msg">{msg}</div> : null} */}
						<WhiteSpace></WhiteSpace>
						<InputItem placeholder="请输入用户名" onChange={val => this.handleChange('username',val)}>
								用户名：
						</InputItem>
						<WhiteSpace></WhiteSpace>
						<InputItem type="password" placeholder="请输入密码" onChange={val => this.handleChange('password',val)}>
								密码：
						</InputItem>
						<WhiteSpace></WhiteSpace>
						<Button type="primary" onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button>
						<WhiteSpace></WhiteSpace>
						<Button onClick={this.toRegister}>还没有账号？</Button>
					</List>
					
				</WingBlank>
			</div>
		)
	}
}

export default connect(
	state => state.user,{login}
)(Login)
