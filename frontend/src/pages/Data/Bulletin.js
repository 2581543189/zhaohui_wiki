import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StandardTable from '@/components/StandardTable';
import React, { Component ,Fragment,PureComponent} from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {openNotification} from '../../utils/utils';
import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Select,
    Icon,
    Button,
    Dropdown,
    Menu,
    DatePicker,
    Modal,
    Divider,
    Tooltip,
    Tag,
  } from 'antd';

const { RangePicker } = DatePicker;

const { Option } = Select;
import styles from './TableList.less';
import {getValue,urlValidFunction,bulletinLevelText,bulletinLevelClass, hanziValidFunction} from '../../constant/DataConstant';

const FormItem = Form.Item;

/**
 * 新增的弹窗
 */
@Form.create()
class CreateForm extends Component {

    constructor(props) {
        super(props);
        this.handleModalVisible=this.props.handleModalVisible;
        this.handleAdd=this.props.handleAdd;
        this.dispatch=this.props.dispatch;
      }

    okHandle = () => {
        const {form} = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            form.resetFields();
            this.handleAdd(fieldsValue);
        });
    };

    render() {
    
        const {form,options,modalVisible} = this.props;
        return (
          <Modal
            destroyOnClose
            title="新建任务"
            visible={modalVisible}
            onOk={this.okHandle}
            onCancel={() => this.handleModalVisible(false)}
          >
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="简述">
              {form.getFieldDecorator('sketch', {
                rules: [{required: true,validator:hanziValidFunction}],
              })(<Input placeholder="简单描述" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="难度">
              {form.getFieldDecorator('level', {
                rules: [{required: true}],
              })(
                <Select style={{ width: '100%' }}>
                {[0,1,2,3,4].map((index) => <Option key={index} value={index} style={{ width: '100%' }}> 
                    <Tag color={bulletinLevelClass[index]}>{bulletinLevelText[index]}</Tag>
                </Option>)}
            </Select>
              )}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="开始日期">
              {form.getFieldDecorator('startDate', {
                rules: [{required: true}],
              })(
                <DatePicker style={{ width: '100%' }}/>
              )}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="结束日期">
              {form.getFieldDecorator('endDate', {
                rules: [],
              })(
                <DatePicker style={{ width: '100%' }}/>
              )}
            </FormItem>

            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="执行url">
              {form.getFieldDecorator('startUrl', {
                rules: [{required: true,validator:urlValidFunction}],
              })(<Input placeholder="不能为空" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="结束url">
              {form.getFieldDecorator('endUrl', {
                rules: [],
              })(<Input placeholder="" />)}
            </FormItem>
          </Modal>
        );
    }

}


/**
 * 更新的弹窗
 */
//更新的弹窗
@Form.create()
class UpdateForm extends PureComponent {

  constructor(props) {
    super(props);
    this.handleUpdateModalVisible=this.props.handleUpdateModalVisible;
    this.handleUpdate=this.props.handleUpdate;
    this.dispatch=this.props.dispatch;
  }

  //点击确定的事件
  updateOkHandle = () => {
    const {form} = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.handleUpdate(fieldsValue);
      //form.resetFields();
    });
  };

  render() {
    const { updateModalVisible, form,options,updateModalData} = this.props;

    return (
      <Modal
        destroyOnClose
        title="更新任务"
        visible={updateModalVisible}
        onOk={this.updateOkHandle}
        onCancel={() => this.handleUpdateModalVisible(false)}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="id">
          {form.getFieldDecorator('id', {
            rules: [{required: true}],
            initialValue: updateModalData.id,
          })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="" readOnly/>)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="简述">
            {form.getFieldDecorator('sketch', {
            rules: [{required: true,validator:hanziValidFunction}],
            initialValue: updateModalData.sketch,
            })(<Input placeholder="简单描述" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="难度">
            {form.getFieldDecorator('level', {
            rules: [{required: true}],
            initialValue: updateModalData.level,
            })(
            <Select style={{ width: '100%' }}>
            {[0,1,2,3,4].map((index) => <Option key={index} value={index} style={{ width: '100%' }}> 
                <Tag color={bulletinLevelClass[index]}>{bulletinLevelText[index]}</Tag>
            </Option>)}
        </Select>
            )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="开始日期">
            {form.getFieldDecorator('startDate', {
            rules: [{required: true}],
            initialValue: updateModalData.startDate? moment(updateModalData.startDate):null,
            })(
            <DatePicker style={{ width: '100%' }}/>
            )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="结束日期">
            {form.getFieldDecorator('endDate', {
            rules: [],
            initialValue: updateModalData.endDate? moment(updateModalData.endDate):null,
            })(
            <DatePicker style={{ width: '100%' }}/>
            )}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="执行url">
            {form.getFieldDecorator('startUrl', {
            rules: [{required: true,validator:urlValidFunction}],
            initialValue: updateModalData.startUrl,
            })(<Input placeholder="不能为空" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="结束url">
            {form.getFieldDecorator('endUrl', {
            rules: [],
            initialValue: updateModalData.endUrl,
            })(<Input placeholder="" />)}
        </FormItem>
      </Modal>
    );
  }
}


/**
 * 任务页面框架.
 */
@connect(({ data_bulletin, loading }) => ({
    data_bulletin,
    loading: loading.models.data_bulletin,
}))
@Form.create()
class Bulletin extends Component {


    //控件自己维护的状态信息  
    state = {
        selectedRows: [],//多选
    };
    //数据表表头
    columns = [
        {
            title: 'id',
            dataIndex: 'id',
            sorter: true,
            align:'center',
        },
        {
            title: '概述',
            dataIndex: 'sketch',
            align:'center',
            render:(text, record) => {
                const sketch = record.sketch;
                if(sketch.length >=10){
                    let short = sketch.substr(0,10);
                    short+='...';
                    return  <Tooltip title={sketch}><span>{short}</span></Tooltip>

                }else{
                    return <span>{sketch}</span>
                }
            }
        },
        {
            title: '难度',
            dataIndex: 'level',
            align:'center',
            filters: [
                {
                  text: <Tag color={bulletinLevelClass[0]}>{bulletinLevelText[0]}</Tag>,
                  value: 0,
                },{
                  text: <Tag color={bulletinLevelClass[1]}>{bulletinLevelText[1]}</Tag>,
                  value: 1,
                },{
                  text: <Tag color={bulletinLevelClass[2]}>{bulletinLevelText[2]}</Tag>,
                  value: 2,
                },{
                    text: <Tag color={bulletinLevelClass[3]}>{bulletinLevelText[3]}</Tag>,
                    value: 3,
                },{
                    text: <Tag color={bulletinLevelClass[4]}>{bulletinLevelText[4]}</Tag>,
                    value: 4,
                }
              ],
            render:(level) => {
                return(
                    <Tag color={bulletinLevelClass[level]}>{bulletinLevelText[level]}</Tag>
                );
            }
        },
        {
            title: '开始日期',
            sorter: true,
            dataIndex: 'startDate',
            align:'center',
            render(val) {
                return moment(val).format("YYYY-MM-DD");
              },
        },
        {
            title: '结束日期',
            sorter: true,
            dataIndex: 'endDate',
            align:'center',
            render(val) {
                if(val == null){
                    return '-';
                }else{
                    return moment(val).format("YYYY-MM-DD");
                }
              },
        },
        {
            title: '操作',
            align:'center',
            render: (text, record) => {
                
                if(record.endUrl != null&&record.endUrl !=''){
                    return(
                        <Fragment>
                            <a href={record.startUrl} target="_blank">进行任务</a>
                            <Divider type="vertical" />
                            <a href={record.endUrl} target="_blank">查看进度</a>
                            <Divider type="vertical" />
                            <a onClick={() => this.showUpdate(record)}>修改</a>
                            <Divider type="vertical" />
                            <a onClick={() => this.dealDelete(record)}>删除</a>
                        </Fragment>
                    );
                }else{
                    return(
                        <Fragment>
                            <a href={record.startUrl} target="_blank">进行任务</a>
                            <Divider type="vertical" />
                            <a onClick={() => this.showUpdate(record)}>修改</a>
                            <Divider type="vertical" />
                            <a onClick={() => this.dealDelete(record)}>删除</a>
                        </Fragment>
                    );
                }


            },
        }
    ];

    //批量操作
    handleMenuClick = e => {
        const { dispatch } = this.props;
        const { selectedRows } = this.state;
    
        if (!selectedRows) return;
        switch (e.key) {
            case 'remove':
            openNotification('info','该功能暂未实现');
            break;
            default:
            break;
        }
    };

    //数据绑定
    handleSelectRows = rows => {
        this.setState({
            selectedRows: rows,
        });
    };

    //表格操作回调函数
    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const { dispatch } = this.props;
    
        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            const newObj = { ...obj };
            newObj[key] = getValue(filtersArg[key]);
            return newObj;
        }, {});
    
        const params = {
            currentPage: pagination.current,
            pageSize: pagination.pageSize,
            ...filters,
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }
    
        dispatch({
            type: 'data_bulletin/fetch',
            payload: params,
        });
    };

    //默认查询第一页
    componentDidMount() {
    
        const { dispatch } = this.props;

        dispatch({
            type: 'data_bulletin/fetch',
        });
    }

    
    onRangeChange(value){
        console.log(value);
    }

    //查询条件。
    renderForm(formValues){
        const {
            form: { getFieldDecorator },
        } = this.props;

        //默认时间是 最近一周
        let array=[];
        if(formValues.startDate != null && formValues.startDate != ''){
            array[0] = moment(formValues.startDate);
        }else{
            array[0] = null;//moment().subtract(7, "days");
        }
        if(formValues.endDate != null && formValues.endDate != ''){
            array[1] = moment(formValues.endDate);
        }else{
            array[1] = null;//moment();
        }
        return (
        <Form onSubmit={this.handleSearch} layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
                <FormItem label="时间范围">
                {getFieldDecorator('range', {initialValue: array})(
                    <RangePicker onChange={(value)=>{this.onRangeChange(value)}} />
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
    }

    //查询数据
    handleSearch = e => {
        e.preventDefault();
        const { dispatch, form } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            if(fieldsValue.range != null&&fieldsValue.range.length==2){
                if(fieldsValue.range[0] != null){
                    fieldsValue.startDate = fieldsValue.range[0].format("YYYY-MM-DD");
                }
            }
            if(fieldsValue.range != null &&fieldsValue.range.length==2){
                if(fieldsValue.range[1] != null){
                    fieldsValue.endDate = fieldsValue.range[1].format("YYYY-MM-DD");
                }
            }
            let payload={};

            //删除undifined
            Object.keys(fieldsValue).forEach(function(key){
                if(typeof(fieldsValue[key])!='undefined'){
                    payload[key] = fieldsValue[key];
                }
            });

            dispatch({
                type: 'data_bulletin/fetch',
                payload:payload
            });
        });
    };
    //清空查询条件
    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
            type: 'data_bulletin/setFormValues',
            payload: {
                formValues:{

                },
            }
        });

        dispatch({
            type: 'data_bulletin/fetch',
        });
    };


    //处理添加逻辑
    handleAdd = fields => {
        const { dispatch } = this.props;

        //处理date
        fields.startDate = fields.startDate.format("YYYY-MM-DD");
        if(fields.endDate !=null){
            fields.endDate = fields.endDate.format("YYYY-MM-DD");
        }


        dispatch({
            type: 'data_bulletin/add',
            payload: {
                ...fields
            },
        });
    };

    //toogle新增的弹窗.
    handleModalVisible = flag => {
        const { dispatch } = this.props;
        if(typeof(flag)=='undefined'){
            flag=false;
        }
        dispatch({
            type: 'data_bulletin/setModalVisible',
            payload:!!flag,
        });
    };
    //处理更新逻辑

    //展示uodate页面
    showUpdate(item){
        const { dispatch } = this.props;
        dispatch({
            type: 'data_bulletin/updateStep1',
                payload:{
                id:item.id,
            }
        });
    }
    handleUpdateModalVisible = flag => {
        const { dispatch } = this.props;
        if(typeof(flag)=='undefined'){
            flag=false;
        }
        dispatch({
            type: 'data_bulletin/setUpdateModalVisible',
            payload:{
                updateModalVisible:!!flag,
            }
        });
    };

    handleUpdate= fields => {
        const { dispatch } = this.props;

        Modal.confirm({
            title: '修改任务',
            content: '确定更新任务['+fields.id+']吗?',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {

                //处理date
                fields.startDate = fields.startDate.format("YYYY-MM-DD");
                if(fields.endDate !=null){
                    fields.endDate = fields.endDate.format("YYYY-MM-DD");
                }
                dispatch({
                    type: 'data_bulletin/updateStep2',
                    payload: {
                        ...fields
                    },
                });
            },
        });
    };

    //处理删除逻辑
    dealDelete(item){
        const { dispatch } = this.props;
        Modal.confirm({
            title: '删除任务',
            content: '确定删除任务['+item.id+']吗?',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                dispatch({
                    type: 'data_bulletin/delete',
                    payload:item.id,
                    });
            },
        });
    }

    render(){

        const {
            data_bulletin: { list,pagination,formValues,modalVisible,updateModalData,updateModalVisible},
            loading,
        } = this.props;

        const { selectedRows } = this.state;

        const data={
          list:list,
          pagination:pagination,
        }

        const menu = (
            <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
              <Menu.Item key="remove">删除</Menu.Item>
            </Menu>
        );

        const addParams = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
            dispatch:this.props.dispatch,
        };

        const updateParams = {
            handleUpdate: this.handleUpdate,
            handleUpdateModalVisible: this.handleUpdateModalVisible,
            dispatch:this.props.dispatch,
            updateModalData:updateModalData,
        }

        return(
            <PageHeaderWrapper title="任务管理" >
                <Card bordered={false}>
                <div className={styles.tableList}>
                    {/*查询条件*/}
                    <div className={styles.tableListForm}>{this.renderForm(formValues)}</div>
                    <div className={styles.tableListOperator}>
                        <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                            新建
                        </Button>
                        {selectedRows.length > 0 && (
                            <span>
                            <Dropdown overlay={menu}>
                                <Button>
                                批量操作 <Icon type="down" />
                                </Button>
                            </Dropdown>
                            </span>
                        )}
                    </div>
                    <StandardTable
                        selectedRows={selectedRows}
                        loading={loading}
                        data={data}
                        columns={this.columns}
                        onSelectRow={this.handleSelectRows}
                        onChange={this.handleStandardTableChange}
                        rowKey='id'
                    />
                </div>
            </Card>
            <CreateForm {...addParams} modalVisible={modalVisible} />
            <UpdateForm {...updateParams} updateModalVisible={updateModalVisible} updateModalData={updateModalData}/>
            </PageHeaderWrapper>
        )

    }




}

export default Bulletin;