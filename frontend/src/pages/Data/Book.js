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
    DatePicker,
    Modal,
    Divider,
    Avatar,
    Tooltip,
    Progress,
    Popover,
  } from 'antd';
const { Meta } = Card;
import styles from './TableList.less';
import {getValue,skillsValidFunction,urlValidFunction,positiveIntegerValidFunction,scoreValidFunction} from '../../constant/DataConstant';

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
            title="新建书籍"
            visible={modalVisible}
            onOk={this.okHandle}
            onCancel={() => this.handleModalVisible(false)}
          >
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="名称">
              {form.getFieldDecorator('name', {
                rules: [{required: true}],
              })(<Input placeholder="书籍名称" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="作者">
              {form.getFieldDecorator('author', {
                rules: [{required: true}],
              })(<Input placeholder="作者" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="分类">
              {form.getFieldDecorator('type', {
                rules: [{required: true,validator:skillsValidFunction}],
              })(
                <SkillCascader style={{width:'100%'}} type="SKILL"/>
              )}
            </FormItem> 
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="总页数">
              {form.getFieldDecorator('count', {
                rules: [{required: true,validator:positiveIntegerValidFunction}],
              })(<Input placeholder="总页数" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="阅读进度">
              {form.getFieldDecorator('current', {
                rules: [{required: true,validator:positiveIntegerValidFunction}],
                initialValue: 0,
              })(<Input placeholder="当前阅读" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="开始日期">
              {form.getFieldDecorator('gmt_create', {
                rules: [{required: true}],
              })(
                <DatePicker showTime style={{ width: '100%' }} format="YYYY-MM-DD HH:mm:ss" placeholder="请选择时间"/>
              )}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="结束日期">
              {form.getFieldDecorator('gmt_end', {
                rules: [],
              })(
                <DatePicker showTime style={{ width: '100%' }} format="YYYY-MM-DD HH:mm:ss" placeholder="请选择时间"/>
              )}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="评分">
              {form.getFieldDecorator('score', {
                rules: [{required: true,validator:scoreValidFunction}],
              })(<Input placeholder="0-10的数字" />)}
            </FormItem>

            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="封面url">
              {form.getFieldDecorator('img', {
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
        title="更新书籍"
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
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="名称">
            {form.getFieldDecorator('name', {
            rules: [{required: true}],
            initialValue: updateModalData.name,
            })(<Input placeholder="书籍名称" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="作者">
            {form.getFieldDecorator('author', {
            rules: [{required: true}],
            initialValue: updateModalData.author,
            })(<Input placeholder="作者" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="分类">
            {form.getFieldDecorator('type', {
            rules: [{required: true,validator:skillsValidFunction}],
            initialValue: this.transfer(updateModalData.skill),
            })(
                <SkillCascader style={{width:'100%'}} initdata={updateModalData.skill} type="SKILL"/>
            )}
        </FormItem> 
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="总页数">
            {form.getFieldDecorator('count', {
            rules: [{required: true,validator:positiveIntegerValidFunction}],
            initialValue: updateModalData.count,
            })(<Input placeholder="总页数" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="阅读进度">
            {form.getFieldDecorator('current', {
            rules: [{required: true,validator:positiveIntegerValidFunction}],
            initialValue: updateModalData.current,
            })(<Input placeholder="当前阅读" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="开始日期">
            {form.getFieldDecorator('gmt_create', {
            rules: [{required: true}],
            initialValue: moment(updateModalData.gmt_create),
            })(
                <DatePicker showTime style={{ width: '100%' }} format="YYYY-MM-DD HH:mm:ss" placeholder="请选择时间"/>
            )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="结束日期">
            {form.getFieldDecorator('gmt_end', {
            rules: [],
            initialValue: updateModalData.gmt_end?moment(updateModalData.gmt_end):null,
            })(
                <DatePicker showTime style={{ width: '100%' }} format="YYYY-MM-DD HH:mm:ss" placeholder="请选择时间"/>
            )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="评分">
            {form.getFieldDecorator('score', {
            rules: [{required: true,validator:scoreValidFunction}],
            initialValue: updateModalData.score,
            })(<Input placeholder="0-10的数字" />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="封面url">
            {form.getFieldDecorator('img', {
            rules: [{required: true,validator:urlValidFunction}],
            initialValue: updateModalData.img,
            })(<Input placeholder="不能为空" />)}
        </FormItem>
      </Modal>
    );
  }
}




/**
 * 书籍页面框架.
 */
@connect(({ data_book, loading }) => ({
    data_book,
    loading: loading.models.data_book,
}))
@Form.create()
class Book extends Component {

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
            title: '名称/作者',
            align:'center',
            render(text, record) {
                const name = record.name;
                const author = record.author;
                const toShow='《'+name+'》['+author+']';
                if(toShow.length >=18){
                    let short = toShow.substr(0,18);
                    short+='...';
                    return  <Tooltip title={toShow}><span>{short}</span></Tooltip>

                }else{
                    return <span>{toShow}</span>
                }
               
            },
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
            title: '进度',
            align:'center',
            render: (text, record) => {
                const total =record.count;
                const current =record.current;
                const toShow=current+'/'+total;
                return <Tooltip title={toShow}><Progress type="circle" percent={current*100/total} width={50} /></Tooltip>;
            }
  
        },
        {
            title: '时间',
            align:'center',
            render:(text, record) => {
                const timestamp = moment(record.gmt_modified).format("YYYY-MM-DD HH:mm:ss");
                const startDate = moment(record.gmt_create).format("YYYY-MM-DD HH:mm:ss");
                let endDate ='-';
                if(typeof(record.gmt_end)!= 'undefined'&&record.gmt_end!=null){
                    endDate= moment(record.gmt_end).format("YYYY-MM-DD HH:mm:ss");
                }
                
                const toShow=(
                <table>
                    <tr><td>timestamp:{timestamp}</td></tr>
                    <tr><td>startDate:{startDate}</td></tr>
                    <tr><td>endDate:{endDate}</td></tr>
                    </table>
                );
                

                return <Popover content={toShow}><Icon type="calendar" theme="outlined" /></Popover>
            },
        },
        {
            title: '封面',
            align:'center',
            render:(text, record) => {
                const img = record.img;
                const name = '《'+record.name+'》';
                const author = '--'+record.author;
                const toShow=(
                  <Card hoverable style={{ width: 200 }} cover={<img alt="example" src={img} />}>
                    <Meta title={name} description={author} />
                  </Card>  
                );
                return <Popover content={toShow} placement="left"><Avatar src={img} /></Popover>
            }
        },
        {
            title: '评分',
            dataIndex: 'score',
            sorter: true,
            align:'center',
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
            title: '删除书籍',
            content: '确定删除书籍['+item.name+']['+item.id+']吗?',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                dispatch({
                    type: 'data_book/delete',
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
            params.sorter = `${sorter.field}|${sorter.order}`;
        }
    
        dispatch({
            type: 'data_book/fetch',
            payload: params,
        });
    };

    //默认查询第一页
    componentWillMount() {
    
        const { dispatch } = this.props;
        dispatch({
            type: 'data_book/fetch',
        });
    }

    //查询条件。
    renderForm(){
        const {
            form: { getFieldDecorator },
        } = this.props;

        return (
        <Form onSubmit={this.handleSearch} layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
                <FormItem label="名称">
                {getFieldDecorator('name')(
                    <Input  placeholder="模糊匹配" />
                )}
                </FormItem>
            </Col>
            <Col md={8} sm={24}>
                <FormItem label="分类">
                {getFieldDecorator('skills')(
                    <SkillCascader type="SKILL"/>
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

            let payload={};
            //删除undifined
            Object.keys(fieldsValue).forEach(function(key){
                if(typeof(fieldsValue[key])!='undefined'){
                    payload[key] = fieldsValue[key];
                }
            });

            dispatch({
                type: 'data_book/fetch',
                payload:payload
            });
        });
    };
    //清空查询条件
    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
            type: 'data_book/setFormValues',
            payload: {
                formValues:{
                    name:'',
                    first:'',
                    second:'',
                    third:'',
                },
            }
        });
        dispatch({
            type: 'data_book/fetch',
        });
    };

    //处理添加逻辑
    handleAdd = fields => {
        const { dispatch } = this.props;
        //处理type
        fields.first = fields.type[0];
        fields.second = fields.type[1];
        fields.third = fields.type[2];
        //处理startDate
        fields.gmt_create = fields.gmt_create.format("YYYY-MM-DD HH:mm:ss");
        //处理endDate
        if(typeof(fields.gmt_end)!= 'undefined'&&fields.gmt_end != null){
            fields.gmt_end = fields.gmt_end.format("YYYY-MM-DD HH:mm:ss");
        }else{
            fields.gmt_end = ""
        }
        fields.current = "" + fields.current

        dispatch({
            type: 'data_book/add',
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
            type: 'data_book/setModalVisible',
            payload:!!flag,
        });
    };
    //处理更新逻辑

    //展示uodate页面
    showUpdate(item){
        const { dispatch } = this.props;
        dispatch({
            type: 'data_book/updateStep1',
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
            type: 'data_book/setUpdateModalVisible',
            payload:{
                updateModalVisible:!!flag,
            }
        });
    };

    handleUpdate= fields => {
        const { dispatch } = this.props;

        Modal.confirm({
            title: '修改书籍',
            content: '确定更新书籍['+fields.name+']['+fields.id+']吗?',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                //处理type
                fields.first = fields.type[0];
                fields.second = fields.type[1];
                fields.third = fields.type[2];
                //处理startDate
                fields.gmt_create = fields.gmt_create.format("YYYY-MM-DD HH:mm:ss");
                //处理endDate
                if(typeof(fields.gmt_end)!= 'undefined'&&fields.gmt_end != null&&fields.gmt_end != ''){
                    fields.gmt_end = fields.gmt_end.format("YYYY-MM-DD HH:mm:ss");
                }else{
                    fields.gmt_end ="";
                }
                fields.count = "" + fields.count
                fields.score = "" + fields.score
                fields.current = "" + fields.current
                dispatch({
                    type: 'data_book/updateStep2',
                    payload: {
                        ...fields
                    },
                });
            },
        });
    };
    


    render(){

        const {
            data_book: { list,pagination,modalVisible,updateModalData,updateModalVisible},
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
            <PageHeaderWrapper title="书籍管理" >
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
                <CreateForm {...addParams} modalVisible={modalVisible} />
                <UpdateForm {...updateParams} updateModalVisible={updateModalVisible} updateModalData={updateModalData}/>
            </PageHeaderWrapper>
        )

    }
}

export default Book;