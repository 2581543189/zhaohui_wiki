import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StandardTable from '@/components/StandardTable';
import SkillCascader from '@/components/custom/SkillCascader';
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
  Tooltip,
  Tag,
  Popover,
  DatePicker,
} from 'antd';
import {hanziValidFunction,getValue,leetcodeDifficculties,leetcodeStatus,classificationtTypes,bulletinLevelClass,skillsValidFunction,positiveIntegerValidFunction,urlValidFunction} from '../../constant/DataConstant';
import styles from './TableList.less';

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
     
         const {form,modalVisible} = this.props;
         return (
           <Modal
             destroyOnClose
             title="新建题目"
             visible={modalVisible}
             onOk={this.okHandle}
             onCancel={() => this.handleModalVisible(false)}
           >
             <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="标题">
               {form.getFieldDecorator('name', {
                 rules: [{required: true}],
               })(<Input placeholder="题目标题" />)}
             </FormItem>
             <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="难度">
            {form.getFieldDecorator('difficulty', {
                rules: [{ required: true, message: '请选择难度'}],
            })(
                <Select style={{ minWidth: 150 }}>
                    {[1,2,3].map((index) => <Option key={index} ><Tag color={bulletinLevelClass[index]}>{leetcodeDifficculties[index]}</Tag>  </Option>)}
                </Select>
            )}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="状态">
            {form.getFieldDecorator('status', {
                rules: [{ required: true, message: '请选择状态'}],
            })(
                <Select style={{ minWidth: 150 }}>
                    {[0,1].map((index) => <Option key={index} >{leetcodeStatus[index]} </Option>)}
                </Select>
            )}
            </FormItem>
             <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="分类">
               {form.getFieldDecorator('type', {
                 rules: [{required: true,validator:skillsValidFunction}],
               })(
                 <SkillCascader style={{width:'100%'}} type="LEETCODE"/>
               )}
             </FormItem> 
             <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="频度">
               {form.getFieldDecorator('frequency', {
                 rules: [{required: true,validator:positiveIntegerValidFunction}],
               })(<Input placeholder="频度" />)}
             </FormItem>
             
             <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="收藏日期">
               {form.getFieldDecorator('gmt_create', {
                 rules: [{required: true}],
               })(
                 <DatePicker showTime style={{ width: '100%' }} format="YYYY-MM-DD HH:mm:ss" placeholder="请选择时间"/>
               )}
             </FormItem>
             <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="url">
               {form.getFieldDecorator('url', {
                 rules: [{required: true,validator:urlValidFunction}],
               })(<Input placeholder="不能为空" />)}
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
  transfer(skill){
    if(typeof(skill)=='undefined'){
        return [];
    }
    return [skill.first,skill.second,skill.third];
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
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="标题">
        {form.getFieldDecorator('name', {
            rules: [{required: true}],
            initialValue: updateModalData.name,
        })(<Input placeholder="题目标题" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="难度">
        {form.getFieldDecorator('difficulty', {
            rules: [{ required: true, message: '请选择难度'}],
            initialValue: leetcodeDifficculties[updateModalData.difficulty],
        })(
            <Select style={{ minWidth: 150 }}>
                {[1,2,3].map((index) => <Option key={index} ><Tag color={bulletinLevelClass[index]}>{leetcodeDifficculties[index]}</Tag>  </Option>)}
            </Select>
        )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="状态">
        {form.getFieldDecorator('status', {
            rules: [{ required: true, message: '请选择状态'}],
            initialValue: leetcodeStatus[updateModalData.status],
        })(
            <Select style={{ minWidth: 150 }}>
                {[0,1].map((index) => <Option key={index} >{leetcodeStatus[index]} </Option>)}
            </Select>
        )}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="分类">
            {form.getFieldDecorator('type', {
            rules: [{required: true,validator:skillsValidFunction}],
            initialValue: this.transfer(updateModalData.skill),
            })(
                <SkillCascader style={{width:'100%'}} initdata={updateModalData.skill} type="LEETCODE"/>
            )}
        </FormItem> 
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="频度">
        {form.getFieldDecorator('frequency', {
            rules: [{required: true,validator:positiveIntegerValidFunction}],
            initialValue: updateModalData.frequency,
        })(<Input placeholder="频度" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="收藏日期">
            {form.getFieldDecorator('gmt_create', {
            rules: [{required: true}],
            initialValue: moment(updateModalData.gmt_create),
            })(
                <DatePicker showTime style={{ width: '100%' }} format="YYYY-MM-DD HH:mm:ss" placeholder="请选择时间"/>
            )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="封面url">
            {form.getFieldDecorator('url', {
            rules: [{required: true,validator:urlValidFunction}],
            initialValue: updateModalData.url,
            })(<Input placeholder="不能为空" />)}
        </FormItem>
      </Modal>
    );
  }
}




/**
 * 页面框架
 */
@connect(({ data_leetcode, loading }) => ({
    data_leetcode,
    loading: loading.models.data_leetcode,
}))
@Form.create()
class Leetcode extends Component {
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
            title: '标题',
            dataIndex: 'name',
            sorter: true,
            align:'center',
          },
        {
            title: '分类',
            dataIndex: 'skill',
            align:'center',
            render: (text, record) => {
                let skill = record.skill;
                let skillId = skill.id;
                if(skill!= null){
                    return <Tooltip title={'['+skill.first+'/'+skill.second+'/'+skill.third+']'}><span>{'['+skill.first+']['+skillId+']'}</span></Tooltip>;
                }else{
                    return <Tooltip title={'[-]'}><span>{'['+skillId+']'}</span></Tooltip>;
                }
                
            },
        },
        {
            title: '难度',
            dataIndex: 'difficulty',
            align:'center',
            render: (text, record) => {
                let index = record.difficulty
                return <Tag color={bulletinLevelClass[index]}>{leetcodeDifficculties[index]}</Tag>
            },
        },
        {
            title: '频度',
            dataIndex: 'frequency',
            sorter: true,
            align:'center',
        },
        ,
        {
            title: '状态',
            dataIndex: 'status',
            align:'center',
            render: (text, record) => {
                let index = record.status
                return leetcodeStatus[index]
            },
        },
        {
            title: '时间',
            align:'center',
            render:(text, record) => {
                const timestamp = moment(record.gmt_modified).format("YYYY-MM-DD HH:mm:ss");
                const startDate = moment(record.gmt_create).format("YYYY-MM-DD HH:mm:ss");
            
                
                const toShow=(
                <table>
                    <tr><td>创建时间:{startDate}</td></tr>
                    <tr><td>最后更新:{timestamp}</td></tr>
                    </table>
                );
                

                return <Popover content={toShow}><Icon type="calendar" theme="outlined" /></Popover>
            },
        },
        {
            title: '操作',
            align:'center',
            render: (text, record) => (
                <Fragment>
                    <a href={record.url} target="_blank">查看</a>
                    <Divider type="vertical" />
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
            title: '删除题目',
            content: '确定删除题目['+item.name+']吗?',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                dispatch({
                    type: 'data_leetcode/delete',
                    payload:item.id,
                    });
            },
            });
    }

    //展示uodate页面
    showUpdate(item){
        const { dispatch } = this.props;
        dispatch({
            type: 'data_leetcode/updateStep1',
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
            type: 'data_leetcode/fetch',
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
            type: 'data_leetcode/getOption',
            payload: param,
        });

    };
    onChange(type,value, selectedOptions){
        const { dispatch } = this.props;
        let deepth = selectedOptions.length;
        if(deepth==3){
            dispatch({
                type: 'data_leetcode/setFormValues',
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
                type: 'data_leetcode/setFormValues',
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
                type: 'data_leetcode/setFormValues',
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
                type: 'data_leetcode/setFormValues',
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
                    <FormItem label="状态">
                        {getFieldDecorator('status', {
                        // initialValue:0,
                        })(
                        <Select 
                        style={{ minWidth: 150 }}
                        allowClear={true}
                        onSelect={value => this.changeSelect(value)}
                        >
                            {[0,1].map((index) => <Option key={index} >{leetcodeStatus[index]}  </Option>)}
                        </Select>
                        )}
                    </FormItem>
                </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={15} sm={24}>
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

    //清空查询条件
    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
            type: 'data_leetcode/setFormValues',
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
            type: 'data_leetcode/fetch',
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
                type: 'data_leetcode/fetch',
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
            type: 'data_leetcode/setModalVisible',
            payload:!!flag,
        });
    };

      //处理添加逻辑
    handleAdd = fields => {
        const { dispatch } = this.props;
        //处理type
        fields.first = fields.type[0];
        fields.second = fields.type[1];
        fields.third = fields.type[2];
        fields.type='LEETCODE'
        //处理startDate
        fields.gmt_create = fields.gmt_create.format("YYYY-MM-DD HH:mm:ss");
        dispatch({
            type: 'data_leetcode/add',
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
            type: 'data_leetcode/setUpdateModalVisible',
            payload:{
              updateModalVisible:!!flag,
            }
        });
    };

    handleUpdate= fields => {
        const { dispatch } = this.props;

        Modal.confirm({
            title: '修改题目',
            content: '确定更新题目['+fields.name+']['+fields.id+']吗?',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                //处理type
                fields.first = fields.type[0];
                fields.second = fields.type[1];
                fields.third = fields.type[2];
                fields.type='LEETCODE'
                fields.frequency = '' + fields.frequency
                //处理startDate
                fields.gmt_create = fields.gmt_create.format("YYYY-MM-DD HH:mm:ss");
                dispatch({
                    type: 'data_leetcode/updateStep2',
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
          type: 'data_leetcode/fetch',
        });
        dispatch({
            type: 'data_leetcode/getOption',
        });
    }

    render(){
        const {
            data_leetcode: { list,pagination,modalVisible,updateModalVisible,updateModalData,options,formValues},
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
            <PageHeaderWrapper title="算法题目管理" >
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



export default Leetcode;