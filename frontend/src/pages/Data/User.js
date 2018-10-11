import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StandardTable from '@/components/StandardTable';
import React, { Component ,Fragment} from 'react';
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
} from 'antd';
import {roles,rolesIcon,normalValidFunction} from '../../constant/DataConstant';
import styles from './TableList.less';

const FormItem = Form.Item;
const md5 = crypto.createHash('md5');




const getValue = function(obj){

    const var1 = Object.keys(obj);
    const var2 =var1.map(function(key){
        const var3 = obj[key];
        return var3;
    });
    const var4 =  var2.join(',');
    return var4;  
}

//新增的弹窗

const CreateForm = Form.create()(props => {
    const { modalVisible, form, handleAdd, handleModalVisible } = props;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();

        fieldsValue.password = md5.update(fieldsValue.password).digest('hex');
        handleAdd(fieldsValue);
      });
    };

    //验证两次密码一致
    const  compareToFirstPassword=(rule, value, callback)=>{
        if (value && value !== form.getFieldValue('password')) {
        callback('两次输入的密码不一致');
        } else {
        callback();
        }
    }

    return (
      <Modal
        destroyOnClose
        title="新建用户"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible(false)}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户名">
          {form.getFieldDecorator('name', {
            rules: [{required: true,validator:normalValidFunction}],
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
          {form.getFieldDecorator('password', {
            rules: [{required: true,validator:normalValidFunction}],
          })(<Input prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入密码" type="password" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="确认密码">
          {form.getFieldDecorator('password2', {
            rules: [{required: true,validator:compareToFirstPassword}],
          })(<Input prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="再次输入密码" type="password" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="角色">
          {form.getFieldDecorator('role', {
            rules: [{ required: true, message: '请选择角色'}],
          })(
            <Select style={{ minWidth: 150 }}>
                {[0,1,2].map((index) => <Option key={index} >{roles[index]}  <Icon type={rolesIcon[index]} style={{ color: 'rgba(0,0,0,.25)' }} theme="twoTone"/> </Option>)}
            </Select>
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="头像url">
          {form.getFieldDecorator('avatar', {
            rules: [{min: 5 ,max:100}],
          })(<Input prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入url"  />)}
        </FormItem>
      </Modal>
    );
  });

  

@connect(({ data_user, loading }) => ({
    data_user,
    loading: loading.models.rule,
  }))
@Form.create()
class User extends Component {
    state = {
        updateModalVisible: false,
        selectedRows: [],
        formValues: {},
        updateFormValues:{},
    };
    columns = [
        {
          title: 'id',
          dataIndex: 'id',
          sorter: true,
          align:'center',
        },
        {
            title: '用户名',
            dataIndex: 'name',
            sorter: true,
            align:'center',
        },
        {
            title: '密码',
            sorter: true,
            dataIndex: 'password',
            align:'center',

        },
        {
            title: '角色',
            sorter: true,
            dataIndex: 'role',
            align:'center',
            filters: [
                {
                  text: roles[0],
                  value: 0,
                },
                {
                  text: roles[1],
                  value: 1,
                }
                ,
                {
                  text: roles[2],
                  value: 2,
                }
              ],
              render(val) {
                return <span>{roles[val]}<Icon type={rolesIcon[val]} style={{ color: 'rgba(0,0,0,.25)' }} theme="twoTone"/></span>
              },
        },
        {
            title: '头像url',
            sorter: true,
            dataIndex: 'avatar',
            align:'center',
            render(val) {
                if(typeof(val)=='undefined'||val===''){
                    return  <Tooltip title=""><Avatar icon="user" /></Tooltip>;
                }
                return <Tooltip title={val}><Avatar src={val} /></Tooltip>;
            }
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
                  <a onClick={() => openNotification('info','该功能暂未实现')}>修改</a>
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
            content: '确定删除用户'+item.name+'['+item.id+']吗?',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                dispatch({
                    type: 'data_user/delete',
                    payload:item.id,
                  });
            },
          });
    }

    //处理弹窗展示逻辑
    handleUpdateModalVisible = (flag, record) => {
        this.setState({
          updateModalVisible: !!flag,
          updateFormValues: record || {},
        });
    };

    //默认查询第一页
    componentDidMount() {
        
        const { dispatch } = this.props;
        dispatch({
          type: 'data_user/fetch',
        });
    }

    //查询条件
    renderForm(){
        const {
             form: { getFieldDecorator },
        } = this.props;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="用户名">
                    {getFieldDecorator('name')(<Input placeholder="请输入" />)}
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
          type: 'data_user/fetch',
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
            type: 'data_user/fetch',
            payload: values,
          });
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
            // dispatch({
            //     type: 'data_user/remove',
            //     payload: {
            //         key: selectedRows.map(row => row.key),
            //     },
            //     callback: () => {
            //         this.setState({
            //             selectedRows: [],
            //         });
            //     },
            // });
            break;
            case 'manager':
            openNotification('info','该功能暂未实现');
                // dispatch({
                //     type: 'data_user/manager',
                //     payload: {
                //         key: selectedRows.map(row => row.key),
                //     },
                //     callback: () => {
                //         this.setState({
                //             selectedRows: [],
                //         });
                //     },
                // });
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
          type: 'data_user/fetch',
          payload: params,
        });
    };

    //toogle新增的弹窗.
    handleModalVisible = flag => {
        const { dispatch } = this.props;
        if(typeof(flag)=='undefined'){
            flag=false;
        }
        dispatch({
            type: 'data_user/setModalVisible',
            payload:!!flag,
        });
    };

    //处理添加逻辑
    handleAdd = fields => {
        const { dispatch } = this.props;
        dispatch({
          type: 'data_user/add',
          payload: {
            ...fields
          },
        });
    
        //openNotification('success','添加成功!');
        //this.handleModalVisible();
    };


    render() {

        const {
            data_user: { data ,modalVisible},
            loading,
        } = this.props;

        const { selectedRows, updateModalVisible, updateFormValues } = this.state;

        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
        };

        const menu = (
            <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
              <Menu.Item key="remove">删除</Menu.Item>
              <Menu.Item key="manager">授予管理员</Menu.Item>
            </Menu>
          );

        return(
            /*统一头*/
            <PageHeaderWrapper  title="用户信息管理" > 
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
                    />
                </div>
            </Card>
            {/*新增的弹窗*/}
            <CreateForm {...parentMethods} modalVisible={modalVisible} />
            
        
            </PageHeaderWrapper>
            

        )
    }

}

export default User;