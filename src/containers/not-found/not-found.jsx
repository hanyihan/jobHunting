// 找不到页面

import React,{Component} from 'react';
import {Button} from 'antd-mobile';

class NotFound extends Component {
    render() {
        return (
            <div>
                <h2>页面丢了~~</h2>
                <Button type='primary' onClick = {() => this.props.history.replace("/")}>返回首页</Button>
            </div>
        )
    }
}

export default NotFound;