// 底部导航

import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import { TabBar } from 'antd-mobile';


const Item = TabBar.Item;
class NavFooter extends Component {

    static propTypes = {
        navList: PropTypes.array.isRequired,
        unReadCount: PropTypes.number.isRequired
    }
    render(){

        const navList = this.props.navList.filter(nav => !nav.hide);//回调函数返回值为true，当前元素留下，否则不留
        // 当前请求的路径
        const {pathname} = this.props.location;
        const {unReadCount} = this.props;

        return (
            <div>
                <TabBar>
                    {
                        navList.map((nav) => (
                            <Item key = {nav.path}
                                  badge={nav.path === '/message'? unReadCount : 0}
                                  title={nav.text}
                                  icon={{uri:require(`./images/${nav.icon}.png`)}}
                                  selectedIcon = {{uri:require(`./images/${nav.icon}-selected.png`)}}
                                  selected={pathname === nav.path} 
                                  onPress={() => {
                                      this.props.history.replace(nav.path)
                                  }}/>
                        ))
                    }
                </TabBar>
            </div>
        )
    }
}

export default withRouter(NavFooter);//让非路由组件可以访问到路由组件的API