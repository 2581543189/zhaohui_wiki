import SkillCascader from '@/components/custom/SkillCascader';
import React, { Component,Fragment} from 'react';
import { connect } from 'dva';
import {
    Form, 
    Card, 
    List, 
    Tag, 
    Icon, 
    Row, 
    Col, 
    Button,
    Input,
    Progress,
    Divider,
    Modal,
    message,
} from 'antd';
const FormItem = Form.Item; 
import styles from './Book.less';
import moment from'moment';


const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 12 },
    },
};


const IconText = ({ type, text,badge }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
      {badge?
        <Tag color="#2db7f5">{badge}</Tag>:null
      }
    </span>
);


/**
 * 笔记列表展示
 */
class NoteList extends Component {

    constructor(props) {
        super(props);
        this.changeShowNoteList=this.props.changeShowNoteList;
      }

    render() {
    
        const {showNoteList,noteList,loading} = this.props;
        return (
          <Modal
            destroyOnClose
            title="笔记列表"
            visible={showNoteList}
            footer={null}
            closable={true}
            centered
            onCancel={() => this.changeShowNoteList(false)}
          >
          {
              noteList.length>0?
              <List>
                  {noteList.map((item,index)=>(
                      <List.Item >
                        <Row gutter={24} style={{width:'200%'}}>
                            <Col md={8} sm={24}>
                                <Tag>日期</Tag>{moment(item.date).format('YYYY-MM-DD')}
                            </Col>
                            <Col md={8} sm={24}>
                                <Tag>进度</Tag>
                                <Progress percent={parseInt(item.current*100/item.book.count)} size="small" style={{width:'60%'}}/>
                            </Col>
                            <Col md={8} sm={24}>
                                <a href={item.url} target="_blank"><Tag>查看</Tag></a>
                            </Col>
                        </Row>   
                      </List.Item>
                  ))}
              </List>
              :<h1>没数据</h1>

          }

          </Modal>
        );
    }

}



@Form.create({})
 @connect(({workbench_index,loading})=>({
    workbench_index,
    loading
 }))
class Book extends Component {

    
    //初始化
    componentWillMount(){
        const {dispatch} = this.props;

        dispatch({
            type:'workbench_index/book_fetch',
        });

    }

    //重置表单
    handleFormReset(){
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
            type: 'workbench_index/book_fetch',
            payload: {
                    name:'',
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
                type:'workbench_index/book_fetch',
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
            pageSize:8,
            total:0,
           }

            dispatch({
                type:'workbench_index/book_fetch',
                payload:payload
            });
        });
    };

    //展示笔记
    changeShowNoteList(state,item){


        const { dispatch } = this.props;

        if(item){
            if(item.current===0){
                //提示没有数据
                message.error('还没有开始阅读《'+item.name+'》');
                return;
            }
            if(state){
                dispatch({
                    type:'workbench_index/note_fetch',
                    payload:{
                        bookId:item.id,
                        pageSize:100,
                        currentPage:1
                    }
                });
            }
        }
        dispatch({
            type:'workbench_index/changeStateBook',
            payload:{
                showNoteList:!!state,
            }
        });

    }
    

    render(){


        let {
            form,
            workbench_index,
            loading,
        } = this.props;
        const { getFieldDecorator } = form;

        const book = workbench_index.book;
        
        let list=book.list;
        let pagination = book.pagination;

        const loadMore =
        book.hasNext ? (
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Button onClick={()=>{this.fetchMore(pagination)}} style={{ paddingLeft: 48, paddingRight: 48 }}>
              {loading.effects['workbench_index/book_fetch'] ? (
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
              loading={loading.effects['workbench_index/book_fetch']}
              loadMore={loadMore}
              grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
              dataSource={list}
              renderItem={(item,index) => (
                <List.Item>
                  <Card
                    className={styles.card}
                    hoverable
                    cover={<img alt={item.name} src={item.img} style={{height:'280px',padding:'0 10%'}}/>}
                    actions={[(<a onClick={()=>{this.changeShowNoteList(true,item)}}><IconText type="eye" text='查看笔记' /></a>),(<IconText type="star" text='豆瓣评分:'  badge={item.score}/>)]} 
                    
                  >
                    <Card.Meta
                      title={(<Fragment>{index+1}<Divider type="vertical" />{item.name}</Fragment>)}
                      
                    />
                    <div className={styles.cardItemContent}>
                      <div className={styles.avatarList} style={{paddingTop:'10px'}}>
                       {/**百分比 */}
                       <Tag>阅读进度</Tag><Progress percent={parseInt(item.current*100/item.count)} size="small" style={{width:'60%'}}/>
                      </div>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
        ) : null;


        const {showNoteList,noteList} = book;
        const popParam={
            showNoteList:showNoteList,
            noteList:noteList,
            changeShowNoteList:this.changeShowNoteList,
            dispatch:this.props.dispatch,
        }

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
                <div className={styles.cardList} style={{ marginTop: 24 }}>{cardList}</div>
                <NoteList {...popParam}></NoteList>
            </Fragment>
        )
    }

}

export default Book;