//主页面路由

import React,{Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';
import {NavBar} from 'antd-mobile';

import LaobanInfo from '../laoban-info/laoban-info';
import DashenInfo from '../dashen-info/dashen-info';
import Dashen from '../dashen/dashen';
import Laoban from '../laoban/laoban';
import Message from '../message/message';
import Personal from '../personal/personal';
import NotFound from '../not-found/not-found';
import NavFooter from '../../components/nav-footer/nav-footer';

class Main extends Component {
// 组件类和组件对象
	// 给组件对象添加属性
	navList = [
		{
			path:'/laoban',
			component:Laoban,
			title:'大神列表',
			icon:'dashen',
			text:'大神'
		},
		{
			path:'/dashen',
			component:Dashen,
			title:'职位列表',
			icon:'laoban',
			text:'职位列表'
		},
		{
			path:'/message',
			component:Message,
			title:'消息列表',
			icon:'message',
			text:'消息'
		},
		{
			path:'/personal',
			component:Personal,
			title:'用户中心',
			icon:'personal',
			text:'个人'
		}
	
	]

	
	render() {
		const userid = Cookies.get('userid');
		if(!userid) {
			return <Redirect to='/login'></Redirect>
			
		}	

		return (
			<div>
				<Switch>
					<Route path='/laobaninfo' component={LaobanInfo}/>
					<Route path='/dasheninfo' component={DashenInfo}/>
					<Route path='/dashen' component={Dashen}/>
					<Route path='/laoban' component={Laoban}/>
					<Route path='/message' component={Message}/>
					<Route path='/personal' component={Personal}/>
					<Route component={NotFound}/>
					
				</Switch>
			</div>
		)
		
	}
}

export default connect(
	state => ({user: state.user})
)(Main)
