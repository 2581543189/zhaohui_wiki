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
  Icon,
  Button,
  Dropdown,
  Menu,
  Modal,
  Divider,
  Cascader,
  Select,
} from 'antd';
import {hanziValidFunction,getValue,classificationtTypes} from '../../constant/DataConstant';
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
        title="新建"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible(false)}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类目">
          {form.getFieldDecorator('type', {
            rules: [{ required: true, message: '请选择类目'}],
          })(
            <Select style={{ minWidth: 150 }}>
                {[0,1,2,3,4].map((index) => <Option key={classificationtTypes[index]} >{classificationtTypes[index]}  </Option>)}
            </Select>
          )}
        </FormItem>
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
        title="更新"
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
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类目">
          {form.getFieldDecorator('type', {
            rules: [{ required: true, message: '请选择类目'}],
            initialValue: updateModalData.type,
          })(
            <Select style={{ minWidth: 150 }}>
                {[0,1,2,3,4].map((index) => <Option key={classificationtTypes[index]} >{classificationtTypes[index]}  </Option>)}
            </Select>
          )}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="分类1">
          {form.getFieldDecorator('first', {
            rules: [{required: true,validator:hanziValidFunction}],
            initialValue: updateModalData.first,
          })(<Input prefix={<Icon type="ordered-list" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="不能为空" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="分类2">
          {form.getFieldDecorator('second', {
            rules: [{required: true,validator:hanziValidFunction}],
            initialValue: updateModalData.second,
          })(<Input prefix={<Icon type="ordered-list" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="不能为空" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="分类3">
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
    loading: loading.models.data_skill,
}))
@Form.create()
class Skill extends Component {
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
            title: '类目',
            dataIndex: 'type',
            align:'center',
            filters: [
              {
                text: classificationtTypes[0],
                value: classificationtTypes[0],
              },
              {
                text: classificationtTypes[1],
                value: classificationtTypes[1],
              }
              ,
              {
                text: classificationtTypes[2],
                value: classificationtTypes[2],
              },
              {
                text: classificationtTypes[3],
                value: classificationtTypes[3],
              },
              {
                text: classificationtTypes[4],
                value: classificationtTypes[4],
              }
            ]
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
            dataIndex: 'gmt_create',
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
            title: '删除能力',
            content: '确定删除能力['+item.type+'-'+item.first+'-'+item.second+'-'+item.third+']['+item.id+']吗?',
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
            params.sorter = `${sorter.field}|${sorter.order}`;
        }
    
        dispatch({
            type: 'data_skill/fetch',
            payload: params,
        });
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
            type: 'data_skill/getOption',
            payload: param,
        });

    };
    onChange(type,value, selectedOptions){
        const { dispatch } = this.props;
        let deepth = selectedOptions.length;
        if(deepth==3){
            dispatch({
                type: 'data_skill/setFormValues',
                payload: {
                    formValues:{
                        type:type,
                        first:selectedOptions[0].value,
                        second:selectedOptions[1].value,
                        third:selectedOptions[2].value,
                    }
                },
            });
        }else if(deepth==2){
            dispatch({
                type: 'data_skill/setFormValues',
                payload: {
                    formValues:{
                        type:type,
                        first:selectedOptions[0].value,
                        second:selectedOptions[1].value,
                        third:'',
                    }
                },
            });
        }else if(deepth==1){
            dispatch({
                type: 'data_skill/setFormValues',
                payload: {
                    formValues:{
                        type:type,
                        first:selectedOptions[0].value,
                        second:'',
                        third:'',
                    }
                },
            });
        }else{
            dispatch({
                type: 'data_skill/setFormValues',
                payload: {
                    formValues:{
                        type:type,
                        first:'',
                        second:'',
                        third:'',
                    },
                }
            });

        }

        console.log(value, selectedOptions);
    };
    //select 选中

    //查询条件
    renderForm(type,options){
        const {
             form: { getFieldDecorator },
        } = this.props;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
                <FormItem label="类目">
                    {getFieldDecorator('type', {
                      // rules: [{ required: fals, message: '请选择类目'}],
                      initialValue:type,
                    })(
                    <Select 
                      style={{ minWidth: 150 }}
                      allowClear={true}
                      onSelect={value => this.changeSelect(value)}
                      >
                        {[0,1,2,3,4].map((index) => <Option key={classificationtTypes[index]} >{classificationtTypes[index]}  </Option>)}
                    </Select>
                    )}
                </FormItem>
            </Col>
                <Col md={15} sm={24}>
                  <FormItem label="筛选">
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
    changeSelect = (value) => {
      const { form, dispatch } = this.props;
      dispatch({
        type: 'data_skill/updateClassificationType',
        payload:{
          type:value
        }
      });
      dispatch({
        type: 'data_skill/getOption',
      });
    }

    //清空查询条件
    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
            type: 'data_skill/setFormValues',
            payload: {
                formValues:{
                    type:'',
                    first:'',
                    second:'',
                    third:'',
                },
            }
        });
        dispatch({
            type: 'data_skill/fetch',
        });
    };

    //查询数据
    handleSearch = e => {
        e.preventDefault();
        const { dispatch, form } = this.props;
        form.validateFields((err, fieldsValue) => {
              //处理type
              if(typeof(fieldsValue.type)=='undefined'){
                fieldsValue.type='';
            }

            let payload={};
            //删除undifined
            Object.keys(fieldsValue).forEach(function(key){
                if(typeof(fieldsValue[key])!='undefined'){
                    payload[key] = fieldsValue[key];
                }
            });
            if (err) return;
            dispatch({
                type: 'data_skill/fetch',
                payload:payload,
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
            content: '确定更新能力['+fields.type+'-'+fields.first+'-'+fields.second+'-'+fields.third+']['+fields.id+']吗?',
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
        dispatch({
            type: 'data_skill/getOption',
        });
    }

    render(){
        const {
            data_skill: { list,pagination,modalVisible,updateModalVisible,updateModalData,options,formValues},
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
                    <div className={styles.tableListForm}>{this.renderForm(formValues.type,options)}</div>
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