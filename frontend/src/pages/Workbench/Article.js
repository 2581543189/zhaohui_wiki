import SkillCascader from '@/components/custom/SkillCascader';
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


const ArticleListContent = ({ data: { platform, createDate }}) => (
    <div className={styles.listContent}>
      <div className={styles.extra}>
        <em>[{moment(createDate).format('YYYY-MM-DD')}]</em>发布在 <a>{platform}</a> 平台
        
      </div>
    </div>
);


@Form.create({})
 @connect(({workbench_index,loading})=>({
    workbench_index,
    loading
 }))
class Article extends Component {


    //初始化
    componentWillMount(){
        const {dispatch} = this.props;

        dispatch({
            type:'workbench_index/article_getPlatforms',
        });

        dispatch({
            type:'workbench_index/article_fetch',
        });

    }

    //重置表单
    handleFormReset(){
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
            type: 'workbench_index/article_fetch',
            payload: {
                    title:'',
                    platform:'',
                    first:'',
                    second:'',
                    third:'',
            }
        });
    }


    //解析表单数据。
    getDataFromForm(fieldsValue){
        //处理skill
        if(fieldsValue.type){

            fieldsValue.first=fieldsValue.type[0]?fieldsValue.type[0]:'';
            fieldsValue.second=fieldsValue.type[1]?fieldsValue.type[1]:'';
            fieldsValue.third=fieldsValue.type[2]?fieldsValue.type[2]:'';
        }else{
            fieldsValue.first='';
            fieldsValue.second='';
            fieldsValue.third='';
        }
        //处理platform
        if(typeof(fieldsValue.platform)=='undefined'){
            fieldsValue.platform='';
        }
        let payload={};
        //删除undifined
        Object.keys(fieldsValue).forEach(function(key){
            if(typeof(fieldsValue[key])!='undefined'){
                payload[key] = fieldsValue[key];
            }
        });
        return payload;
    }

    //获取更多数据
    fetchMore(pagination){
        const { dispatch, form } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            let payload = this.getDataFromForm(fieldsValue);

           //设置分页
           payload.pagination={
            current:pagination.current+1,
            pageSize:10,
            total:pagination.total,
           }
           payload.append=true;
            dispatch({
                type:'workbench_index/article_fetch',
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
            let payload = this.getDataFromForm(fieldsValue);

           //设置分页
           payload.pagination={
            current:1,
            pageSize:10,
            total:0,
           }

            dispatch({
                type:'workbench_index/article_fetch',
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

        const article = workbench_index.article;
        
        let list=article.list;
        let pagination = article.pagination;

        const loadMore =
        article.hasNext ? (
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Button onClick={()=>{this.fetchMore(pagination)}} style={{ paddingLeft: 48, paddingRight: 48 }}>
              {loading.effects['workbench_index/article_fetch'] ? (
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
                            <FormItem {...formItemLayout} label="标题">
                                {getFieldDecorator('title', {
                                })(
                                    <Input placeholder="模糊匹配" style={{width:'100%'}}/>
                                )}
                            </FormItem>
                            </Col>
                            <Col md={8} sm={24}>
                            <FormItem {...formItemLayout} label="分类">
                                {getFieldDecorator('type', {})(
                                    <SkillCascader style={{width:'100%'}}/>
                                )}
                            </FormItem>
                            </Col>
                            <Col md={8} sm={24}>
                            <FormItem {...formItemLayout} label="平台">
                                {getFieldDecorator('platform', {})(
                                    <Select style={{width:'100%'}}>
                                        {
                                            article.platformList.map(item=>(
                                               <Option key={item} value={item}>{item}</Option>
                                            ))
                                        }
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
                    bordered={false}
                    bodyStyle={{ padding: '8px 32px 32px 32px' }}
                    >
                    <List
                        size="large"
                        loading={loading.effects['workbench_index/article_fetch']}
                        rowKey="id"
                        itemLayout="vertical"
                        loadMore={loadMore}
                        dataSource={list}
                        renderItem={(item,index) => (
                        <List.Item
                            key={item.id}
                        >
                            <List.Item.Meta
                                title={
                                    <Fragment>
                                        {index+1}
                                        <Divider type="vertical" />
                                        <a className={styles.listItemMetaTitle} target="_blank" href={item.url}>
                                        {item.title}
                                        </a>
                                    </Fragment>
                                
                                }
                                description={
                                    <span>
                                    <Tag>{item.skill.first}</Tag>
                                    <Tag>{item.skill.second}</Tag>
                                    <Tag>{item.skill.third}</Tag>
                                    </span>
                                }
                            />
                            <ArticleListContent data={item} />
                        </List.Item>
                        )}
                    />
                    </Card>

            </Fragment>
        )
    }

}

export default Article;