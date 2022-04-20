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
import {hanziValidFunction,getValue,leetcodeDifficculties,leetcodeStatus,classificationtTypes,bulletinLevelClass,skillsValidFunction,positiveIntegerValidFunction,urlValidFunction,dataToOptionsLeetcode} from '../../constant/DataConstant';
import styles from './TableList.less';

const FormItem = Form.Item;

/**
 * 新增的弹窗
 */
 @Form.create()
 class CreateForm extends Component {
 
     constructor(props) {
         super(props);
         this.handleLeetcodeSearch=this.props.handleLeetcodeSearch;
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

 
     handleAddChange=(value)=>{
        //  const {dispatch} = this.props;
        //  dispatch({
        //      type: 'data_leetcode_exp/getOneLeetcode',
        //      payload: {
        //          name:value,
        //      },
        //  });
     };
 
     render() {
     
         const {form,leetcodeOptions,modalVisible,addLeetcode} = this.props;
         const optionList = dataToOptionsLeetcode(leetcodeOptions); 
 
         return (
           <Modal
             destroyOnClose
             title="新建笔记"
             visible={modalVisible}
             onOk={this.okHandle}
             onCancel={() => this.handleModalVisible(false)}
           >
             <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="题目">
               {form.getFieldDecorator('leetcodeId', {
                 rules: [{required: true}],
               })(
                 <Select
                     showSearch
                     placeholder="关键字"
                     showArrow={false}
                     filterOption={false}
                     onSearch={(value)=>this.handleLeetcodeSearch(value)}
                     onChange={(value)=>this.handleAddChange(value)}
                     notFoundContent={null}
                     style={{ width: '100%' }}
                 >
                     {optionList}
                 </Select>
               )}
             </FormItem>
             <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="分类">
               {form.getFieldDecorator('type', {
                 rules: [{required: true,validator:skillsValidFunction}],
               })(
                 <SkillCascader style={{width:'100%'}} type="LEETCODE_EXP"/>
               )}
             </FormItem> 
 
             <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
               {form.getFieldDecorator('desc', {
                 rules: [{required: true}],
               })(<Input placeholder="请输入描述信息" />)}
             </FormItem>
             <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="序号">
               {form.getFieldDecorator('index', {
                 rules: [{required: true,validator:positiveIntegerValidFunction}],
               })(<Input placeholder="序号" />)}
             </FormItem>
           </Modal>
         );
     }
 
 }
 


/**
 * 页面框架
 */
@connect(({ data_leetcode_exp, loading }) => ({
    data_leetcode_exp,
    loading: loading.models.data_leetcode_exp,
}))
@Form.create()
class LeetcodeExp extends Component {
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
            title: '题目',
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
            title: '描述',
            dataIndex: 'desc',
            sorter: true,
            align:'center',
        },
        ,
        {
            title: '序号',
            dataIndex: 'index',
            sorter: true,
            align:'center',
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
                    type: 'data_leetcode_exp/delete',
                    payload:item.id,
                    });
            },
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
            type: 'data_leetcode_exp/fetch',
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
            type: 'data_leetcode_exp/getOption',
            payload: param,
        });

    };
    onChange(type,value, selectedOptions){
        const { dispatch } = this.props;
        let deepth = selectedOptions.length;
        if(deepth==3){
            dispatch({
                type: 'data_leetcode_exp/setFormValues',
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
                type: 'data_leetcode_exp/setFormValues',
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
                type: 'data_leetcode_exp/setFormValues',
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
                type: 'data_leetcode_exp/setFormValues',
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
    renderForm(type,options,optionList){
        const {
             form: { getFieldDecorator },
        } = this.props;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                    <FormItem label="题目">
                    {getFieldDecorator('LeetcodeId')(
                        <Select
                        showSearch
                        placeholder="请输入关键字"
                        showArrow={false}
                        filterOption={false}
                        onSearch={(value)=>this.handleLeetcodeSearch(value)}
                        onChange={(value)=>this.handleLeetcodeChange(value)}
                        notFoundContent={null}
                    >
                        {optionList}
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
    changeSelect = (value) => {
      const { form, dispatch } = this.props;
      dispatch({
        type: 'data_leetcode_exp/updateClassificationType',
        payload:{
          type:value
        }
      });
      dispatch({
        type: 'data_leetcode_exp/getOption',
      });
    }

    //清空查询条件
    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
            type: 'data_leetcode_exp/setFormValues',
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
            type: 'data_leetcode_exp/fetch',
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
                type: 'data_leetcode_exp/fetch',
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
            type: 'data_leetcode_exp/setModalVisible',
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
        fields.type='LEETCODE_EXP'
        dispatch({
            type: 'data_leetcode_exp/add',
            payload: {
                ...fields
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
          type: 'data_leetcode_exp/fetch',
        });
        dispatch({
            type: 'data_leetcode_exp/getOption',
        });
    };
    //当输入变化时候获取列表
    handleLeetcodeSearch(value){
        //getBooks
        const { dispatch } = this.props;
        dispatch({
            type: 'data_leetcode_exp/getLeetcode',
            payload:{
                name:value,
            }
        });
    };
    handleLeetcodeChange(value){
        console.log('handleLeetcodeChange',value);
    };
    

    render(){
        const {
            data_leetcode_exp: { list,pagination,modalVisible,updateModalVisible,updateModalData,options,formValues,leetcodeOptions},
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
            handleLeetcodeSearch:this.handleLeetcodeSearch,
            dispatch:this.props.dispatch,
            leetcodeOptions:leetcodeOptions
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

        const optionList = dataToOptionsLeetcode(leetcodeOptions); 

        return(
            <PageHeaderWrapper title="刷题心得管理" >
                <Card bordered={false}>
                <div className={styles.tableList}>
                    {/*查询条件*/}
                    <div className={styles.tableListForm}>{this.renderForm(formValues.type,options,optionList)}</div>
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
    
            </PageHeaderWrapper>
        )

    }
}



export default LeetcodeExp;