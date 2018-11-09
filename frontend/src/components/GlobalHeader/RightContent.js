import React, { PureComponent } from 'react';
import { FormattedMessage, setLocale, getLocale } from 'umi/locale';
import { Spin, Tag, Menu, Icon, Dropdown, Avatar, Tooltip, Button } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import {rolesIcon} from '../../constant/DataConstant';
import {getUser}from '../../utils/authority'
import Link from 'umi/link';

export default class GlobalHeaderRight extends PureComponent {
  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  changLang = () => {
    const locale = getLocale();
    if (!locale || locale === 'zh-CN') {
      setLocale('en-US');
    } else {
      setLocale('zh-CN');
    }
  };

  renderAvatar(currentUser){
    if(typeof(currentUser.avatar)=='undefined' || currentUser.avatar==''||currentUser.avatar==null){
      return (<Avatar
        size="small"
        className={styles.avatar}
        src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
        alt="avatar"
      />);
    }else{
      return(<Avatar
        size="small"
        className={styles.avatar}
        src={currentUser.avatar}
        alt="avatar"
      />);
    }

  }

  render() {
    const {
      //currentUser,
      fetchingNotices,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
      theme,
    } = this.props;
    const currentUser = getUser();

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );


    const noticeData = this.getNoticeData();
    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
        <HeaderSearch
          className={`${styles.action} ${styles.search}`}
          placeholder="该功能未实现"
          dataSource={['没有提示...']}
          onSearch={value => {
            console.log('input', value); // eslint-disable-line
          }}
          onPressEnter={value => {
            console.log('enter', value); // eslint-disable-line
          }}
        />
        <Tooltip title="测试页面" >
          <Link to="/" style={{padding: '0 12px'}}><Icon type="gift" theme="filled" style={{fontSize: '19px'}}/></Link>
        </Tooltip>
        <Tooltip title="github">
          <a
            target="_blank"
            href="https://github.com/2581543189/zhaohui_wiki"
            rel="noopener noreferrer"
            className={styles.action}
            title="github"
            style={{fontSize: '19px'}}
          >
            <Icon type="github" theme="filled" />
          </a>
        </Tooltip>


        {currentUser.name ? (
          <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
            {this.renderAvatar(currentUser)}
              <span className={styles.name}>{currentUser.name}<Icon type={rolesIcon[currentUser.role]} style={{ color: 'rgba(0,0,0,.25)' }} theme="twoTone"/></span>
            </span>
          </Dropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
        <Button
          size="small"
          ghost={theme === 'dark'}
          style={{
            margin: '0 8px',
          }}
          onClick={() => {
            this.changLang();
          }}
        >
          <FormattedMessage id="navbar.lang" />
        </Button>
      </div>
    );
  }
}
