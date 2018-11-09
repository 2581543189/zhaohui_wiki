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
    Select,
    Icon,
    Button,
    Dropdown,
    Menu,
    DatePicker,
    Modal,
    Divider,
    Tooltip,
} from 'antd';
const { Option } = Select;
import styles from './TableList.less';
import {getValue,skillsValidFunction,urlValidFunction} from '../../constant/DataConstant';

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
            title="新建文章"
            visible={modalVisible}
            onOk={this.okHandle}
            onCancel={() => this.handleModalVisible(false)}
          >
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="标题">
              {form.getFieldDecorator('title', {
                rules: [{required: true}],
              })(<Input placeholder="不能为空" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="日期">
              {form.getFieldDecorator('createDate', {
                rules: [{required: true}],
              })(
                <DatePicker style={{ width: '100%' }}/>
              )}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="平台">
              {form.getFieldDecorator('platform', {
                rules: [{required: true}],
              })(<Input placeholder="不能为空" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="分类">
              {form.getFieldDecorator('type', {
                rules: [{required: true,validator:skillsValidFunction}],
              })(
                <SkillCascader style={{ width: '100%' }} />
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

  transfer(skill){
      if(typeof(skill)=='undefined'){
          return [];
      }
      return [skill.first,skill.second,skill.third];

  }

  render() {
    const { updateModalVisible, form,updateModalData} = this.props;
    return (
      <Modal
        destroyOnClose
        title="更新文章"
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
  
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="标题">
              {form.getFieldDecorator('title', {
                rules: [{required: true}],
                initialValue: updateModalData.title,
              })(<Input placeholder="不能为空" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="日期">
              {form.getFieldDecorator('createDate', {
                rules: [{required: true}],
                initialValue: moment(updateModalData.createDate),
              })(
                <DatePicker style={{ width: '100%' }}/>
              )}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="平台">
              {form.getFieldDecorator('platform', {
                rules: [{required: true}],
                initialValue: updateModalData.platform,
              })(<Input placeholder="不能为空" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="分类">
              {form.getFieldDecorator('type', {
                rules: [{required: true,validator:skillsValidFunction}],
                initialValue: this.transfer(updateModalData.skill),
              })(
                    <SkillCascader style={{ width: '100%' }} initdata={updateModalData.skill}/> 
              )}
            </FormItem> 
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="url">
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
 * 文章页面框架
 */
@connect(({ data_article, loading }) => ({
    data_article,
    loading: loading.models.data_article,
}))
@Form.create()
class Article extends Component {

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
            dataIndex: 'title',
            sorter: true,
            align:'center',
            render(val) {
                if(val.length >=10){
                    let short = val.substr(0,10);
                    short+='...';
                    return  <Tooltip title={val}><span>{short}</span></Tooltip>

                }else{
                    return <span>{val}</span>
                }
               
            },
        },
        {
            title: '分类',
            sorter: true,
            dataIndex: 'skill',
            align:'center',
            render: (text, record) => {
                let skill = record.skill;
                let skillId = record.skillId;
                if(skill!= null){
                    return <Tooltip title={'['+skill.first+'/'+skill.second+'/'+skill.third+']'}><span>{'['+skill.first+']['+skillId+']'}</span></Tooltip>;
                }else{
                    return <Tooltip title={'[-]'}><span>{'['+skillId+']'}</span></Tooltip>;
                }
                
            },
        },
        {
            title: '发表时间',
            sorter: true,
            dataIndex: 'createDate',
            align:'center',
  
        },
        {
            title: '发表平台',
            sorter: true,
            dataIndex: 'platform',
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
            title: '删除文章',
            content: '确定删除文章['+item.title+']['+item.id+']吗?',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                dispatch({
                    type: 'data_article/delete',
                    payload:item.id,
                    });
            },
        });
    }
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
            type: 'data_article/fetch',
            payload: params,
        });
    };

    //默认查询第一页
    componentWillMount() {
    
        const { dispatch } = this.props;
        dispatch({
            type: 'data_article/getPlatforms',
        });
        dispatch({
            type: 'data_article/fetch',
        });
    }

    //查询条件。
    renderForm(platforms){
        const {
            form: { getFieldDecorator },
        } = this.props;


        const children = [];
        for (let i = 0; i < platforms.length; i++) {
            children.push(<Option key={platforms[i]}>{platforms[i]}</Option>);
        }

       return (
        <Form onSubmit={this.handleSearch} layout="inline">
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
                <FormItem label="标题">
                {getFieldDecorator('title')(
                    <Input  placeholder="模糊匹配" />
                )}
                </FormItem>
            </Col>
            <Col md={8} sm={24}>
                <FormItem label="平台">
                    {getFieldDecorator('platform')(
                    <Select style={{ minWidth: 150 }} allowClear={true}>
                        {children}
                    </Select>
                    )}
                </FormItem>
            </Col>

            <Col md={8} sm={24}>
                <FormItem label="分类">
                {getFieldDecorator('skills')(
                    <SkillCascader />
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
            //处理skill
            if(fieldsValue.skills){
                fieldsValue.first=fieldsValue.skills[0];
                fieldsValue.second=fieldsValue.skills[1];
                fieldsValue.third=fieldsValue.skills[2];
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

            dispatch({
                type: 'data_article/fetch',
                payload:payload
            });
        });
    };

    //清空查询条件
    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
            type: 'data_article/setFormValues',
            payload: {
                formValues:{
                    title:'',
                    platform:'',
                    first:'',
                    second:'',
                    third:'',
                },
            }
        });
        dispatch({
            type: 'data_article/fetch',
        });
    };

    //处理添加逻辑
    handleAdd = fields => {
        const { dispatch } = this.props;
        //处理type
        fields.first = fields.type[0];
        fields.second = fields.type[1];
        fields.third = fields.type[2];
        //处理createDate
        fields.createDate = fields.createDate.format("YYYY-MM-DD");
        dispatch({
            type: 'data_article/add',
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
            type: 'data_article/setModalVisible',
            payload:!!flag,
        });
    };
    //处理更新逻辑

    //展示uodate页面
    showUpdate(item){
        const { dispatch } = this.props;
        dispatch({
            type: 'data_article/updateStep1',
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
            type: 'data_article/setUpdateModalVisible',
            payload:{
              updateModalVisible:!!flag,
            }
        });
    };

    handleUpdate= fields => {
        const { dispatch } = this.props;

        Modal.confirm({
            title: '修改文章',
            content: '确定更新文章['+fields.title+']['+fields.id+']吗?',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                //处理type
                fields.first = fields.type[0];
                fields.second = fields.type[1];
                fields.third = fields.type[2];
                //处理createDate
                fields.createDate = fields.createDate.format("YYYY-MM-DD");
                dispatch({
                    type: 'data_article/updateStep2',
                    payload: {
                      ...fields
                    },
                });
            },
        });
    };



    render(){

        const {
            data_article: { list,pagination,platforms,modalVisible,updateModalData,updateModalVisible},
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
        }

        return(
            <PageHeaderWrapper title="文章信息管理" >
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        {/*查询条件*/}
                        <div className={styles.tableListForm}>{this.renderForm(platforms)}</div>
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


export default Article;