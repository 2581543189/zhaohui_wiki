import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import React, { Component } from 'react';
import{
    message
} from 'antd';
import router from 'umi/router';

class Message extends Component {


    componentWillMount(){
        //弹出提示
        message.error('该功能未实现!');
        //跳转页面
        router.goBack();
    }

    render(){
        return(
            <div>该功能未实现</div>
        )
    }
    
}

export default Message;