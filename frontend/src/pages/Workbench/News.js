import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import React, { Component,Fragment} from 'react';
import { connect } from 'dva';
import {
    Form, 
    Card, 
    Select, 
    List, 
    Tag, 
    Icon, 
    Row, 
    Col, 
    Button,
    Input,
    Tooltip,
    Avatar,
} from 'antd';
const {Option} = Select;
const FormItem = Form.Item;
import StandardFormRow from '@/components/StandardFormRow';
import styles from './Overview.less';

const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 12 },
    },
};


@Form.create({
    onValuesChange({ dispatch }, changedValues, allValues) {
      console.log(changedValues, allValues);
    },
 })
class News extends Component {

    
    render(){
        const {form} = this.props;
        const { getFieldDecorator } = form;
        let list=[
            {
                icon:'book',
                date:'2018-10-21 10:00:00',
                desc:'关注了书籍《xxxxxx》,相关分类是xxxxxx',
            },{
                icon:'tags',
                date:'2018-10-22 20:00:00',
                desc:'新增了《xxxxxx》的读书笔记,目前已经阅读到xx页',
            },{
                icon:'highlight',
                date:'2018-10-22 20:00:00',
                desc:'在xxx平台发表了《xxxxxxxxx》',
            },{
                icon:'tool',
                date:'2018-10-23 20:00:00',
                desc:'在xxx分类中增加了xxxx-xxxx',
            },{
                icon:'alert',
                date:'2018-10-24 20:00:00',
                desc:'完成了任务:xxxxxxxxxx,总计耗时xxxxx天',
            }
        ];

        let loading=false;
        const loadMore =
        list.length > 0 ? (
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Button onClick={this.fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
              {loading ? (
                <span>
                  <Icon type="loading" /> 加载中...
                </span>
              ) : (
                '加载更多'
              )}
            </Button>
          </div>
        ) : null;

        return(
            <Fragment>
                {/**搜索框 */}
                <Card bordered={false}>
                    <Form layout="inline">
                    <StandardFormRow  grid last>
                        <Row gutter={16}>
                            <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                            <FormItem {...formItemLayout} label="类型">
                                {getFieldDecorator('state', {})(
                                    <Select>
                                        <Option key='1' value='1'>已完成</Option>
                                        <Option key='2' value='2'>未完成</Option>
                                    </Select>
                                )}
                            </FormItem>
                            </Col>
                        </Row>
                        </StandardFormRow>
                    </Form>

                </Card>
                {/**列表 */}
                <Card
                    style={{ marginTop: 24 }}
                    bodyStyle={{ padding: 0 }}
                    bordered={false}
                    //className={styles.activeCard}
                    //title="动态"
                    //loading={loading.effects['data_overview/getNews']}
                    //extra={<Link to="/">more...</Link>}
                    >   <div className={styles.activitiesList}>

                        <List 
                            //loading={activitiesLoading} 
                            loadMore={loadMore}
                            size="large">
                            {list.map(item => (
                            <List.Item key={item.key}>
                                <List.Item.Meta
                                    avatar={<Avatar icon={item.icon} />}
                                    title={
                                        item.desc
                                    }
                                    description={
                                    <span className={styles.datetime} 
                                    //title={item.updatedAt}
                                    >
                                        {item.date} 
                                    </span>
                                    }
                                />
                            </List.Item>
                            ))}

                            
                        </List>
                        </div>
                </Card>


            </Fragment>
        )
    }

}

export default News;