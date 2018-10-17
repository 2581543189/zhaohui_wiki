import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StandardTable from '@/components/StandardTable';
import React, { Component ,Fragment,PureComponent} from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {openNotification} from '../../utils/utils';
import crypto from 'crypto' ;
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
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
  Avatar,
  Tooltip,
  Switch,
} from 'antd';
import {roles,rolesIcon,hanziValidFunction,getValue} from '../../constant/DataConstant';
import styles from './TableList.less';

const FormItem = Form.Item;

/**
 * 新增的弹窗
 */
const CreateForm = Form.create()(props => {
    const { modalVisible, form, handleAdd, handleModalVisible } = props;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleAdd(fieldsValue);
      });
    };

    return (
      <Modal
        destroyOnClose
        title="新建技能"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible(false)}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="分类1">
          {form.getFieldDecorator('first', {
            rules: [{required: true,validator:hanziValidFunction}],
          })(<Input prefix={<Icon type="ordered-list" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="不能为空" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="分类2">
          {form.getFieldDecorator('second', {
            rules: [{required: true,validator:hanziValidFunction}],
          })(<Input prefix={<Icon type="ordered-list" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="不能为空" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="分类3">
          {form.getFieldDecorator('third', {
            rules: [{required: true,validator:hanziValidFunction}],
          })(<Input prefix={<Icon type="ordered-list" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="不能为空"  />)}
        </FormItem> 
      </Modal>
    );
});

/**
 * 更新的弹窗
 */
//更新的弹窗
@Form.create()
class UpdateForm extends PureComponent {

  constructor(props) {
    super(props);
    // this.state = {
    // };
  }

  //点击确定的事件
  updateOkHandle = () => {
    const {handleUpdate,form} = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleUpdate(fieldsValue);
    });
  };

  render() {
    const { updateModalVisible, form, handleUpdateModalVisible ,updateModalData} = this.props;
    return (
      <Modal
        destroyOnClose
        title="更新用户"
        visible={updateModalVisible}
        onOk={this.updateOkHandle}
        onCancel={() => handleUpdateModalVisible(false)}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="id">
          {form.getFieldDecorator('id', {
            rules: [{required: true}],
            initialValue: updateModalData.id,
          })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="" readOnly/>)}
        </FormItem>
  
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="分类1">
          {form.getFieldDecorator('first', {
            rules: [{required: true,validator:hanziValidFunction}],
            initialValue: updateModalData.first,
          })(<Input prefix={<Icon type="ordered-list" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="不能为空" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="分类1">
          {form.getFieldDecorator('second', {
            rules: [{required: true,validator:hanziValidFunction}],
            initialValue: updateModalData.second,
          })(<Input prefix={<Icon type="ordered-list" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="不能为空" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="分类1">
          {form.getFieldDecorator('third', {
            rules: [{required: true,validator:hanziValidFunction}],
            initialValue: updateModalData.third,
          })(<Input prefix={<Icon type="ordered-list" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="不能为空" />)}
        </FormItem>
      </Modal>
    );
  }
}




/**
 * 技能页面框架
 */
@connect(({ data_skill, loading }) => ({
    data_skill,
    loading: loading.models.rule,
}))
@Form.create()
class Skill extends Component {
    //控件自己维护的状态信息  
    state = {
        formValues:{},//查询条件
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
            title: '第一分类',
            dataIndex: 'first',
            sorter: true,
            align:'center',
        },
        {
            title: '第二分类',
            sorter: true,
            dataIndex: 'second',
            align:'center',
  
        },
        {
            title: '第三分类',
            sorter: true,
            dataIndex: 'third',
            align:'center',
        },
        {
            title: '时间戳',
            sorter: true,
            dataIndex: 'timestamp',
            align:'center',
            render(val) {
                return moment(val).format("YYYY-MM-DD HH:mm:ss");
              },
        },
        {
            title: '操作',
            align:'center',
            render: (text, record) => (
                <Fragment>
                    <a onClick={() => this.showUpdate(record)}>修改</a>
                    <Divider type="vertical" />
                    <a onClick={() => this.dealDelete(record)}>删除</a>
                </Fragment>
              ),
        }
    ];

    //处理删除逻辑
    dealDelete(item){
        const { dispatch } = this.props;
        Modal.confirm({
            title: '删除用户',
            content: '确定删除能力['+item.first+'-'+item.second+'-'+item.third+']['+item.id+']吗?',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                dispatch({
                    type: 'data_skill/delete',
                    payload:item.id,
                    });
            },
            });
    }

    //展示uodate页面
    showUpdate(item){
        const { dispatch } = this.props;
        dispatch({
            type: 'data_skill/updateStep1',
            payload:{
            id:item.id,
            }
        });
    }

    //表格操作回调函数
    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const { dispatch } = this.props;
        const { formValues } = this.state;
    
        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            const newObj = { ...obj };
            newObj[key] = getValue(filtersArg[key]);
            return newObj;
        }, {});
    
        const params = {
            currentPage: pagination.current,
            pageSize: pagination.pageSize,
            ...formValues,
            ...filters,
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }
    
        dispatch({
            type: 'data_skill/fetch',
            payload: params,
        });
    };


    //查询条件
    renderForm(){
        const {
             form: { getFieldDecorator },
        } = this.props;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="分类1">
                    {getFieldDecorator('first')(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="分类2">
                    {getFieldDecorator('second')(<Input placeholder="请输入" />)}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="分类3">
                    {getFieldDecorator('third')(<Input placeholder="请输入" />)}
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

    //清空查询条件
    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        this.setState({
            formValues: {},
        });
        dispatch({
            type: 'data_skill/fetch',
            payload: {},
        });
    };

    //查询数据
    handleSearch = e => {
        e.preventDefault();
        const { dispatch, form } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
            ...fieldsValue
            };
            this.setState({
            formValues: values,
            });
            dispatch({
            type: 'data_skill/fetch',
            payload: values,
            });
        });
    };


    //toogle新增的弹窗.
    handleModalVisible = flag => {
        const { dispatch } = this.props;
        if(typeof(flag)=='undefined'){
            flag=false;
        }
        dispatch({
            type: 'data_skill/setModalVisible',
            payload:!!flag,
        });
    };

      //处理添加逻辑
    handleAdd = fields => {
        const { dispatch } = this.props;
        dispatch({
        type: 'data_skill/add',
        payload: {
            ...fields
        },
        });
    };

    handleUpdateModalVisible = flag => {
        const { dispatch } = this.props;
        if(typeof(flag)=='undefined'){
            flag=false;
        }
        dispatch({
            type: 'data_skill/setUpdateModalVisible',
            payload:{
              updateModalVisible:!!flag,
            }
        });
    };

    handleUpdate= fields => {
        const { dispatch } = this.props;
        Modal.confirm({
            title: '修改能力',
            content: '确定更新能力['+fields.first+'-'+fields.second+'-'+fields.third+']['+fields.id+']吗?',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                dispatch({
                    type: 'data_skill/updateStep2',
                    payload: {
                      ...fields
                    },
                });
            },
        });
        

    };

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


    //默认查询第一页
    componentDidMount() {
      
        const { dispatch } = this.props;
        dispatch({
          type: 'data_skill/fetch',
        });
    }

    render(){
        const {
            data_skill: { list,pagination,modalVisible,updateModalVisible,updateModalData},
            loading,
        } = this.props;

        const { selectedRows } = this.state;

        const data={
          list:list,
          pagination:pagination,
        }

        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
        };

        const updateMethods = {
          handleUpdate: this.handleUpdate,
          handleUpdateModalVisible: this.handleUpdateModalVisible,
        };

        const menu = (
            <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
              <Menu.Item key="remove">删除</Menu.Item>
            </Menu>
          );

        return(
            <PageHeaderWrapper title="技能信息管理" >
                <Card bordered={false}>
                <div className={styles.tableList}>
                    {/*查询条件*/}
                    <div className={styles.tableListForm}>{this.renderForm()}</div>
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
            {/*新增的弹窗*/}
            <CreateForm {...parentMethods} modalVisible={modalVisible} />
            <UpdateForm {...updateMethods} updateModalVisible={updateModalVisible} updateModalData={updateModalData}/>
    
            </PageHeaderWrapper>
        )

    }
}



export default Skill;