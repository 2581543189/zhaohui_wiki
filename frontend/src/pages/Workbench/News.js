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
class News extends Component {

    //初始化
    componentWillMount(){
        const {dispatch} = this.props;

        dispatch({
            type:'workbench_index/news_fetch',
            payload: {
                offset: 0
            }
        });

    }
    
    //重置表单
    handleFormReset(){
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
            type: 'workbench_index/news_fetch',
            payload: {
                offset: 0,
                type:''
            }
        });
    }
    
    
    //获取更多数据
    fetchMore(type,offset){
        const { dispatch, form } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            let payload = {
            }

            //设置分页
            payload.offset=offset;
            payload.type=type;
            payload.append = true
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

    getIcon(type){
        switch(type) {
            case 'BOOK':return 'book'
            case 'NOTE':return 'tags'
            case 'ARTICLE':return 'highlight'
            case 'LEETCODE':return 'calculator'
            case 'FOREIGN_ARTICLE':return 'ie'
            case 'BOOKMARK':return 'star-o'
            case 'MESSAGE':return 'message'
            case 'MOTTO':return 'picture'
            case 'KEYWORD':return 'pushpin-o'
            default:
                return 'book'
       } 
    }
    
    render(){
        let {
            form,
            workbench_index,
            loading,
        } = this.props;
        const { getFieldDecorator } = form;

        const news = workbench_index.news;
        
        let list=news.list;
        let offset = news.offset;
        let type = news.type;
        let typeOptions = ["BOOK","NOTE","ARTICLE","LEETCODE","FOREIGN_ARTICLE","BOOKMARK","MESSAGE","MOTTO","KEYWORD"]

        let typeOptionObj = [];
        for (let i = 0; i < typeOptions.length; i++) {
            typeOptionObj.push(<Option key={typeOptions[i]} value={typeOptions[i]}><Icon type={this.getIcon(typeOptions[i])} />{typeOptions[i]}</Option>);
        }

        const loadMore =
        news.hasNext ? (
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Button onClick={()=>{this.fetchMore(type,offset)}} style={{ paddingLeft: 48, paddingRight: 48 }}>
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
                                        {typeOptionObj}
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
                                    avatar={<Avatar icon={this.getIcon(item.type)} />}
                                    title={
                                        <Fragment>{index+1}<Divider type="vertical" />{item.desc}</Fragment>
                                    }
                                    description={
                                    <span className={styles.datetime} 
                                    >
                                        {moment(item.gmt_create).format('YYYY-MM-DD HH:mm:ss')} 
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