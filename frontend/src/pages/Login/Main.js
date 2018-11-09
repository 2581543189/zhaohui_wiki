import React, { Component } from 'react';
import { connect } from 'dva';
import { Alert} from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';
import crypto from 'crypto' ;

const {  UserName, Password, Submit } = Login;

@connect(({ login, loading,logout }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {

    constructor(props) {
        super(props);
      }

  handleSubmit = (err, values) => {
    if (!err) {
      const { dispatch } = this.props;

      //密码进行md5
      const md5 = crypto.createHash('md5');
      values.password = md5.update(values.password).digest('hex');
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
        },
      });
    }
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  guestLogin=()=>{
    const { dispatch } = this.props;
    dispatch({
        type: 'login/login',
        payload: {
          guest:true,
        },
      });
  }

    /**ref属性可以设置为一个回调函数，这也是官方强烈推荐的用法；这个函数执行的时机为：

    组件被挂载后，回调函数被立即执行，回调函数的参数为该组件的具体实例。

    组件被卸载或者原有的ref属性本身发生变化时，回调也会被立即执行，此时回调函数参数为null，以确保内存泄露。 */

  render() {
    const { login, submitting} = this.props;

    return (
      <div className={styles.main}>
        <Login
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
        {login.status===false &&
            !submitting &&!login.logout &&
            this.renderMessage('账户或密码错误!')}
        <UserName placeholder="用户名" defaultValue="zhaohui"/>
        <Password
            placeholder="密码"
            onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
        />
          <Submit loading={submitting} guestlogin={this.guestLogin}>登录</Submit>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
