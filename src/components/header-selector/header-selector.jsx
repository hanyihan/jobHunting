import React,{Component} from 'react';
import {List,Grid} from 'antd-mobile';
import PropTypes from 'prop-types';

export default class HeaderSelectors extends Component {
    static propTypes = {
        setHeader: PropTypes.func.isRequired
    }

    state = {
        icon:null //图片对象，默认没有值
    }
    
    constructor(props) {
        super(props);
        this.headerList = [];
        // 将头像图片加载
        for(var i = 0; i < 20; i++) {
            const text = `头像${i+1}`;
            this.headerList.push({text,icon:require(`../../assets/imgs/headers/${text}.png`)});
        }
    }
    //选择头像
    selectHeader = ({icon,text}) => {
        this.setState({icon});
        this.props.setHeader(text);
    }

    render() {
        const {icon} = this.state;
        const gridHeader = icon ?<p>已选择头像：<img src={icon} alt="header"/></p> : '请选择头像'
        return (
            <List renderHeader={() => gridHeader}>
                <Grid data = {this.headerList} columnNum='5' onClick={this.selectHeader}></Grid>
            </List>
        )
    }
    
}