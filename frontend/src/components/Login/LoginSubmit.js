import React, { Component } from 'react';
import classNames from 'classnames';
import { Button, Form } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;

class LoginSubmit extends Component {




  render() {
    

    const { guestlogin ,className}=this.props;
    const clsString = classNames(styles.submit, className);
  
    return (
      <FormItem>
        <Button size="large" className={clsString} type="primary" htmlType="submit"  >用户登陆</Button>
        <Button size="large" className={clsString} type="primary" onClick={guestlogin}  >访客身份</Button>
      </FormItem>
    );

  }

}



export default LoginSubmit;
