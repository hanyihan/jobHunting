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

import {getUser} from '../../redux/actions';
import {getRedirectPath} from '../../utils/index'


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
			text:'职位'
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

	componentDidMount(){
		// 登陆过(cookie中有userid), 但没有有登陆(redux管理的user中没有_id) 发请求获取对应的user:
		const userid = Cookies.get('userid');
		const {user} = this.props;
		if(userid && !user._id) {
			this.props.getUser();
		}
	}

	
	render() {
		// 得到当前请求的path
		const pathname = this.props.location.pathname;
		// 判断用户是否已登录过
		const userid = Cookies.get('userid');
		if(!userid) {//没有登陆过，跳转到登录界面
			return <Redirect to='/login'></Redirect>
			
		}
		const {user} = this.props;
		if(!user._id) {
			return null;
		}	
		else {
			if(pathname === '/') {
				const path = getRedirectPath(user.type,user.header);
				return <Redirect to={path}></Redirect>
			}
			if(user.type === 'laoban') {
				this.navList[1].hide = true;
			}
			else {
				this.navList[0].hide = true;
			}
		}

		const currentNav = this.navList.find(nav => nav.path === pathname);

		const unReadCount = this.props.unReadCount;
		return (
			<div>
				{currentNav?<NavBar className='stick-top'>{currentNav.title}</NavBar>:null}
				<Switch>
					<Route path='/laobaninfo' component={LaobanInfo}/>
					<Route path='/dasheninfo' component={DashenInfo}/>
					<Route path='/dashen' component={Dashen}/>
					<Route path='/laoban' component={Laoban}/>
					<Route path='/message' component={Message}/>
					<Route path='/personal' component={Personal}/>
					<Route component={NotFound}/>
					
				</Switch>
				{currentNav? <NavFooter unReadCount={unReadCount} navList = {this.navList}></NavFooter>:null}
			</div>
		)
		
	}
}

export default connect(
	state => ({user: state.user,unReadCount: state.chat.unReadCount}),
	{getUser}
)(Main)
