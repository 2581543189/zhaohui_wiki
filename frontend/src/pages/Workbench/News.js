import React, { Component,Fragment} from 'react';
import { connect } from 'dva';
import {
    Form, 
    Card, 
    Select, 
    List, 
    Icon, 
    Row, 
    Col, 
    Button,
    Avatar,
    Divider,
} from 'antd';
const {Option} = Select;
const FormItem = Form.Item;
import styles from './Article.less';

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
class News extends Component {

    //初始化
    componentWillMount(){
        const {dispatch} = this.props;

        dispatch({
            type:'workbench_index/news_fetch',
        });

    }
    
    //重置表单
    handleFormReset(){
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
            type: 'workbench_index/news_fetch',
            payload: {
                    type:'',
            }
        });
    }
    
    
    //获取更多数据
    fetchMore(endDate){
        const { dispatch, form } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            let payload = {
                type:fieldsValue.type,
            }

            //设置分页
            payload.endDate=endDate;
            payload.append=true;
            dispatch({
                type:'workbench_index/news_fetch',
                payload:payload
            });
        });
    }
    //点击查询
    handleSearch = e => {
        e.preventDefault();
        const { dispatch, form } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            let payload = {
                type:fieldsValue.type,
            }

            dispatch({
                type:'workbench_index/news_fetch',
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

        const news = workbench_index.news;
        
        let list=news.list;
        let endDate = news.endDate;

        const loadMore =
        news.hasNext ? (
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Button onClick={()=>{this.fetchMore(endDate)}} style={{ paddingLeft: 48, paddingRight: 48 }}>
              {loading.effects['workbench_index/news_fetch'] ? (
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
                    <div className={styles.tableListForm}>
                    <Form layout="inline" onSubmit={this.handleSearch}>
                        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                            <Col md={8} sm={24}>
                            <FormItem {...formItemLayout} label="类型">
                                {getFieldDecorator('type', {
                                })(
                                    <Select style={{width:'100%'}}>
                                        <Option key='article' value='article'><Icon type="highlight" /></Option>
                                        <Option key='book' value='book'><Icon type="book" /></Option>
                                        <Option key='note' value='note'><Icon type="tags" /></Option>
                                        <Option key='mission' value='mission'><Icon type="alert" /></Option>
                                        <Option key='skill' value='skill'><Icon type="tool" /></Option>
                                    </Select>
                                )}
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={8} sm={24}>
                            <span className={styles.submitButtons}>
                                <Button type="primary" htmlType="submit">
                                查询
                                </Button>
                                <Button style={{ marginLeft: 8 }} onClick={()=>{this.handleFormReset()}}>
                                重置
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
                    bodyStyle={{ padding: 0 }}
                    bordered={false}
                    >   
                        <div className={styles.activitiesList}>
                        <List 
                            loading={loading.effects['workbench_index/news_fetch']}
                            loadMore={loadMore}
                            size="large">
                            {list.map((item,index) => (
                            <List.Item key={index} style={{paddingLeft: '16px'}}>
                                <List.Item.Meta
                                    avatar={<Avatar icon={item.icon} />}
                                    title={
                                        <Fragment>{index+1}<Divider type="vertical" />{item.desc}</Fragment>
                                    }
                                    description={
                                    <span className={styles.datetime} 
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