import React, { Component,Fragment} from 'react';
import { connect } from 'dva';
import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Icon,
    Button,
    Dropdown,
    Menu,
    Modal,
    Divider,
    Cascader,
    Select,
    Tooltip,
    Tag,
    Popover,
    DatePicker,
    List,
} from 'antd';
const {Option} = Select;
const FormItem = Form.Item;
import {bulletinLevelText,bulletinLevelClass,leetcodeDifficculties,leetcodeStatus} from '../../constant/DataConstant';
import styles from './Book.less';
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
class Mission extends Component {

    //初始化
    componentWillMount(){
        const {dispatch} = this.props;

        dispatch({
            type:'workbench_index/mission_fetch',
        });
        dispatch({
            type:'workbench_index/getMissionOption',
        });

    }
    
    //重置表单
    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
            type: 'workbench_index/mission_fetch',
            payload: {
                formValues:{
                    type:'LEETCODE',
                    name:'',
                }
            }
        });
    }
    
    
    //获取更多数据
    fetchMore(formValues,pagination){
        const { dispatch, form } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            let payload = {
                state:fieldsValue.state,
                ...formValues
            }

            //设置分页
            payload.pagination={
            current:pagination.current+1,
            pageSize:10,
            total:pagination.total,
            }
            payload.append=true;
            dispatch({
                type:'workbench_index/mission_fetch',
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
            let payload = {}
            if (fieldsValue.option && fieldsValue.option.length == 3){
                payload.type='LEETCODE'
                payload.first = fieldsValue.option[0]
                payload.second = fieldsValue.option[1]
                payload.third = fieldsValue.option[2]
            }
            
            payload.name = fieldsValue['name']
            payload.difficulty = fieldsValue['difficulty']

            //设置分页
            payload.pagination={
            current:1,
            pageSize:8,
            total:0,
            }

            dispatch({
                type:'workbench_index/mission_fetch',
                payload:payload
            });
        });
    };
    //查询条件
    renderForm(type,options){
        const {
             form: { getFieldDecorator },
        } = this.props;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                    <FormItem label="关键字">
                    {getFieldDecorator('name')(
                        <Input  placeholder="模糊匹配" />
                    )}
                    </FormItem>
                </Col>
                <Col md={8} sm={24}>
                    <FormItem label="难度">
                        {getFieldDecorator('difficulty', {
                        // initialValue:type,
                        })(
                        <Select 
                        style={{ minWidth: 150 }}
                        allowClear={true}
                        onSelect={value => this.changeSelect(value)}
                        >
                            {[1,2,3].map((index) => <Option key={index} ><Tag color={bulletinLevelClass[index]}>{leetcodeDifficculties[index]}</Tag>  </Option>)}
                        </Select>
                        )}
                    </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="类别">
                    {getFieldDecorator('option')(
                        <Cascader
                            options={options}
                            loadData={(selectedOptions)=>this.loadData(selectedOptions)}
                            onChange={(value, selectedOptions)=>this.onChange(type,value, selectedOptions)}
                            changeOnSelect
                        />
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <span className={styles.submitButtons}>
                    <Button type="primary" htmlType="submit">
                      查询
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                      重置
                    </Button>
                  </span>
                </Col>
              </Row>
            </Form>
          );
    };
    //获取option数据
    loadData(selectedOptions){
        console.log(selectedOptions);
        const { dispatch } = this.props;
        let deepth = selectedOptions.length;
        let param={};
        if(deepth==3){

        }else if(deepth==2){
            param={
                name:'third',
                first:selectedOptions[0].value,
                second:selectedOptions[1].value,
            }

        }else if(deepth==1){
            param={
                name:'second',
                first:selectedOptions[0].value,
            }

        }else{
            param={
                name:'first',
            }
        }
        dispatch({
            type: 'workbench_index/getMissionOption',
            payload: param,
        });

    };
    onChange(type,value, selectedOptions){
        const { dispatch } = this.props;
        let deepth = selectedOptions.length;
        if(deepth==3){
            dispatch({
                type: 'workbench_index/setFormValues',
                payload: {
                    mission:{
                        formValues:{
                            type:type,
                            first:selectedOptions[0].value,
                            second:selectedOptions[1].value,
                            third:selectedOptions[2].value,
                        }
                    }
                    
                },
            });
        }else if(deepth==2){
            dispatch({
                type: 'workbench_index/setFormValues',
                payload: {
                    mission:{
                        formValues:{
                            type:type,
                            first:selectedOptions[0].value,
                            second:selectedOptions[1].value,
                            third:'',
                        }
                    }
                
                },
            });
        }else if(deepth==1){
            dispatch({
                type: 'workbench_index/setFormValues',
                payload: {
                    mission:{
                        formValues:{
                            type:type,
                            first:selectedOptions[0].value,
                            second:'',
                            third:'',
                        }
                    }
                    
                },
            });
        }else{
            dispatch({
                type: 'workbench_index/setFormValues',
                payload: {
                    mission:{
                        formValues:{
                            type:type,
                            first:'',
                            second:'',
                            third:'',
                        },
                    }
                    
                }
            });
        }
        console.log(value, selectedOptions);
    };
    changeSelect = (value) => {
        const { form, dispatch } = this.props;
        dispatch({
          type: 'data_leetcode/updateClassificationType',
          payload:{
            type:value
          }
        });
        dispatch({
          type: 'data_leetcode/getOption',
        });
      }
    
    render(){
        let {
            form,
            workbench_index,
            loading,
        } = this.props;
        const { getFieldDecorator } = form;

        const mission = workbench_index.mission;
        let formValues = mission.formValues
        let options = mission.options
        let list=mission.list;
        let pagination = mission.pagination;

        const loadMore =
        mission.hasNext ? (
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Button onClick={()=>{this.fetchMore(formValues,pagination)}} style={{ paddingLeft: 48, paddingRight: 48 }}>
              {loading.effects['workbench_index/mission_fetch'] ? (
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
                    {/*查询条件*/}
                    <div className={styles.tableListForm}>{this.renderForm(formValues.type,options)}</div>
                    </div>
                </Card>
                {/**列表 */}
                <List
                    rowKey="id"
                    style={{ marginTop: 24 }}
                    grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
                    loading={loading.effects['workbench_index/mission_fetch']}
                    dataSource={list}
                    loadMore={loadMore}
                    renderItem={item => (
                        <List.Item key={item.id}>
                        <Card
                            hoverable
                            bodyStyle={{ paddingBottom: 20 ,height:'100px',overflow:'hidden'}}
                            actions={[
                            <Tooltip title="去刷题">
                                <a href={item.url} target="_blank"><Icon type="rocket" /></a>
                            </Tooltip>,
                            <Tooltip title="查看笔记">
                                <a href={item.url} target="_blank"><Icon type="eye" /></a>
                            </Tooltip>
                            ]}
                        >
                            <Tag color={bulletinLevelClass[item.difficulty]}>{leetcodeDifficculties[item.difficulty]}</Tag>{item.name}
                        </Card>
                        </List.Item>
                    )}
                    />

            </Fragment>
        )
    }

}

export default Mission;