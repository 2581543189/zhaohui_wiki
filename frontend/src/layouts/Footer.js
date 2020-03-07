import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import Link from 'umi/link';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      copyright={
        <Fragment>
           <Icon type="copyright" />2018-2028, zhaohui.wiki. All rights reserved. | ICP证： <a href="http://www.beian.miit.gov.cn" target="_blank">鲁ICP备18044945号-1</a>
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
