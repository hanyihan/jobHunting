//注册页面路由
import React,{Component} from 'react';

import { NavBar, Radio,List, InputItem,WingBlank, WhiteSpace,Button} from 'antd-mobile';

import Logo from '../../components/logo/logo';

const ListItem = List.Item;
export default class Register extends Component {

	render(){
		return(
			<div>
				<NavBar>
					Hunting直聘	
				</NavBar>
				<Logo></Logo>
				<WingBlank>
					<List>
						<WhiteSpace></WhiteSpace>
						<InputItem placeholder="请输入用户名">
								用户名：
						</InputItem>
						<WhiteSpace></WhiteSpace>
						<InputItem placeholder="请输入密码">
								密码：
						</InputItem>
						<WhiteSpace></WhiteSpace>
						<InputItem placeholder="请确认密码">
								确认密码：
						</InputItem>
						<WhiteSpace></WhiteSpace>
						<ListItem>
							<span>用户类型：</span>
							<Radio>大神</Radio>
							<Radio>老板</Radio>
						</ListItem>
						<WhiteSpace></WhiteSpace>
						<Button type="primary">注册</Button>
						<WhiteSpace></WhiteSpace>
						<Button>已有账号</Button>
					</List>
					
				</WingBlank>
				

			</div>	
		)
	}
}
