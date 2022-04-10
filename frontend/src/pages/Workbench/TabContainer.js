import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect()
class SearchList extends Component {
  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'articles':
        router.push(`${match.url}/articles`);
        break;
      case 'books':
        router.push(`${match.url}/books`);
        break;
      case 'missions':
        router.push(`${match.url}/missions`);
        break;
      case 'news':
        router.push(`${match.url}/news`);
        break;
      case 'messages':
        router.push(`${match.url}/messages`);
        break;
      default:
        break;
    }
  }


  render() {
    const tabList = [
      {
        key: 'articles',
        tab: '文章',
      },
      {
        key: 'books',
        tab: '书籍',
      },
      // {
      //   key: 'missions',
      //   tab: '任务',
      // },
      {
        key: 'news',
        tab: '动态',
      },
      {
        key: 'messages',
        tab: '留言',
      }
    ];


    const { match, children, location } = this.props;

    return (
      <PageHeaderWrapper
        title="索引"
        tabList={tabList}
        tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
        onTabChange={this.handleTabChange}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default SearchList;
