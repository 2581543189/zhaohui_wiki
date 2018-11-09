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
    Tooltip,
} from 'antd';
const {Option} = Select;
const FormItem = Form.Item;
import {bulletinLevelText,bulletinLevelClass} from '../../constant/DataConstant';
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

    }
    
    //重置表单
    handleFormReset(){
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
            type: 'workbench_index/mission_fetch',
            payload: {
                    state:'',
            }
        });
    }
    
    
    //获取更多数据
    fetchMore(pagination){
        const { dispatch, form } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            let payload = {
                state:fieldsValue.state,
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
            let payload = {
                state:fieldsValue.state,
            }

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
    
    render(){
        let {
            form,
            workbench_index,
            loading,
        } = this.props;
        const { getFieldDecorator } = form;

        const mission = workbench_index.mission;
        
        let list=mission.list;
        let pagination = mission.pagination;

        const loadMore =
        mission.hasNext ? (
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Button onClick={()=>{this.fetchMore(pagination)}} style={{ paddingLeft: 48, paddingRight: 48 }}>
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
                    <Form layout="inline" onSubmit={this.handleSearch}>
                        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                            <Col md={8} sm={24}>
                            <FormItem {...formItemLayout} label="状态">
                                {getFieldDecorator('state', {
                                })(
                                    <Select>
                                        <Option key='所有' value=''>所有</Option>
                                        <Option key='已完成' value='1'>已完成</Option>
                                        <Option key='未完成' value='2'>未完成</Option>
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
                            <Tooltip title="执行任务">
                                <a href={item.startUrl} target="_blank"><Icon type="rocket" /></a>
                            </Tooltip>,
                            item.endDate==null?
                            <Tooltip title="未完成">
                                <Icon type="ellipsis" />
                            </Tooltip>:
                            <Tooltip title="查看结果">
                                <a href={item.endUrl} target="_blank"><Icon type="eye" /></a>
                            </Tooltip>
                            ]}
                        >
                            <Tag color={bulletinLevelClass[item.level]}>{bulletinLevelText[item.level]}</Tag>{item.sketch}
                        </Card>
                        </List.Item>
                    )}
                    />

            </Fragment>
        )
    }

}

export default Mission;