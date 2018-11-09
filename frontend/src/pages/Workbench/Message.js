import React, { Component,Fragment} from 'react';
import { connect } from 'dva';
import {
    Form, 
    Card, 
    List, 
    Icon, 
    Row, 
    Col, 
    Button,
    Input,
    Avatar,
} from 'antd';

const FormItem = Form.Item;
import styles from './Article.less';
import moment from 'moment';

const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 12 },
    },
};

@Form.create({})
 @connect(({workbench_index,loading})=>({
    workbench_index,
    loading
 }))
class Message extends Component {

    
    //初始化
    componentWillMount(){
        const {dispatch} = this.props;

        dispatch({
            type:'workbench_index/message_fetch',
        });

    }


    //获取更多数据
    fetchMore(pagination){
        const { dispatch, form } = this.props;
        let payload = {};

        //设置分页
        payload.pagination={
        current:pagination.current+1,
        pageSize:10,
        total:pagination.total,
        }
        payload.append=true;
        dispatch({
            type:'workbench_index/message_fetch',
            payload:payload
        });

    }
    //点击查询
    handleSearch = e => {
        e.preventDefault();
        const { dispatch, form } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            let payload={
                name:fieldsValue.name,
                avatar:fieldsValue.avatar,
                content:fieldsValue.content,
            }

            dispatch({
                type:'workbench_index/message_add',
                payload:payload
            });
        });
    };


    render(){


        let {
            form,
            workbench_index,
            loading,
        } = this.props;
        const { getFieldDecorator } = form;

        const message = workbench_index.message;
        
        let list=message.list;
        let pagination = message.pagination;
        let name = message.name;
        let avatar = message.avatar;

        const loadMore =
        message.hasNext ? (
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Button onClick={()=>{this.fetchMore(pagination)}} style={{ paddingLeft: 48, paddingRight: 48 }}>
              {loading.effects['workbench_index/message_fetch'] ? (
                <span>
                  <Icon type="loading" /> 加载中...
                </span>
              ) : (
                '加载更多'
              )}
            </Button>
          </div>
        ) : null;

        const cardList = list ? (
            <List
              rowKey="id"
              loading={loading.effects['workbench_index/message_fetch']}
              loadMore={loadMore}
              dataSource={list}
              renderItem={(item,index) => (
                <List.Item
                >
                <div>
                    <List.Item.Meta
                    avatar={<Avatar src={item.avatar} shape="square" size="large" />}
                    title={item.name}
                    description={'['+moment(item.timestamp).format('YYYY-MM-DD HH:mm:ss')+'] '+item.content}
                    />
                    {/*<ListContent data={moment(item.timestamp).format('YYYY-MM-DD HH:mm:ss')} />*/}
                </div>

              </List.Item>
              )}
            />
        ) : null;

        return(
            <Fragment>
                {/**搜索框 */}
                <Card bordered={false}>
                    <div className={styles.tableListForm}>
                    <Form layout="inline" onSubmit={this.handleSearch}>
                        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                            <Col md={8} sm={24}>
                            <FormItem {...formItemLayout} label="名称">
                                {getFieldDecorator('name', {
                                    rules: [{required: true}],
                                    initialValue:name,
                                })(
                                    <Input placeholder="留下姓名" style={{width:'100%'}}/>
                                )}
                            </FormItem>
                            </Col>
                            <Col md={16} sm={24}>
                            <FormItem {...formItemLayout} label="头像url">
                                {getFieldDecorator('avatar', {
                                    rules: [{required: true}],
                                    initialValue:avatar,
                                })(
                                    <Input placeholder="头像的url" style={{width:'100%'}}/>
                                )}
                            </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                            <Col md={24} sm={24}>
                            <FormItem {...formItemLayout} label="内容">
                                {getFieldDecorator('content', {
                                    rules: [{required: true}],
                                })(
                                    <Input placeholder="说点什么" style={{width:'100%'}}/>
                                )}
                            </FormItem>
                            </Col>

                        </Row>
                        <Row>
                            <Col md={8} sm={24}>
                            <span className={styles.submitButtons}>
                                <Button type="primary" htmlType="submit">
                                    发表
                                </Button>
                            </span>
                            </Col>
                        </Row>
                    </Form>
                    </div>
                </Card>
                {/**列表 */}
                <Card
                    style={{ marginTop: 24 }}
                    bordered={false}
                    bodyStyle={{ padding: '8px 32px 32px 32px' }}
                    >
                    <div className={styles.cardList} style={{ marginTop: 24 }}>{cardList}</div>
                </Card>
                
            </Fragment>
        )
    }
}

export default Message;