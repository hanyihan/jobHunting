import React from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import PropTypes from 'prop-types';

class UserList extends React.Component {
    static propsTypes = {
        userList: PropTypes.array.isRequired
    }
    render() {
        return (
            <WingBlank style={{marginTop:50,marginBottom:50}}>
                {
                    this.props.userList.map(user => (
                        <div key={user._id}>
                            <WhiteSpace></WhiteSpace>
                            <Card>
                                <Card.Header
                                    thumb={user.header ? require(`../../assets/imgs/headers/头像1.png`) : null}
                                    extra={<span>{user.username}</span>}
                                />
                                <Card.Body>
                                    <div>职位：{user.post}</div>
                                    {user.company?<div>公司：{user.company}</div>:null}
                                    {user.salary?<div>薪资：{user.salary}</div>:null}
                                    <div>描述：{user.info}</div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                }
                {/* <div>
                    <WhiteSpace />
                    <Card>
                        <Card.Header
                            thumb={require(`../../assets/imgs/headers/头像1.png`)}
                            extra={<span>dashen1</span>}
                        />
                        <Card.Body>
                            <div>职位：前端工程师</div>
                            <div>公司：迷汁科技</div>
                            <div>薪资：18K</div>
                            <div>描述：大数据我自</div>
                        </Card.Body>
                    </Card>
                    <WhiteSpace />
                </div> */}
            </WingBlank>

        )
    }
}

export default UserList;