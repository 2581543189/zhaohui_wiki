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
    Avatar,
    Popover,
    Slider,
  } from 'antd';
const { Meta } = Card;
import styles from './TableList.less';
import {getValue,urlValidFunction,dataToOptionsBook} from '../../constant/DataConstant';

const FormItem = Form.Item;


/**
 * 新增的弹窗
 */
@Form.create()
class CreateForm extends Component {

    constructor(props) {
        super(props);
        this.handleBookSearch=this.props.handleBookSearch;
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
        const {dispatch} = this.props;
        dispatch({
            type: 'data_note/getOneBook',
            payload: {
                name:value,
            },
        });
    };

    render() {
    
        const {form,options,modalVisible,addBook} = this.props;
        const optionList = dataToOptionsBook(options); 

        return (
          <Modal
            destroyOnClose
            title="新建笔记"
            visible={modalVisible}
            onOk={this.okHandle}
            onCancel={() => this.handleModalVisible(false)}
          >
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="书籍">
              {form.getFieldDecorator('bookName', {
                rules: [{required: true}],
              })(
                <Select
                    showSearch
                    placeholder="书籍名称"
                    showArrow={false}
                    filterOption={false}
                    onSearch={(value)=>this.handleBookSearch(value)}
                    onChange={(value)=>this.handleAddChange(value)}
                    notFoundContent={null}
                    style={{ width: '100%' }}
                >
                    {optionList}
                </Select>
              )}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="进度">
              {form.getFieldDecorator('current', {
                rules: [{required: true}],
              })(
                <Slider
                    min={addBook.current?addBook.current:0}
                    max={addBook.count > 0?addBook.count:100}
                    disabled={addBook.count < 0}
                />
              )}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="日期">
              {form.getFieldDecorator('gmt_create', {
                rules: [{required: true}],
              })(
                <DatePicker showTime style={{ width: '100%' }} format="YYYY-MM-DD HH:mm:ss" placeholder="请选择时间"/>
              )}
            </FormItem>

            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="url">
              {form.getFieldDecorator('url', {
                rules: [{required: true,validator:urlValidFunction}],
              })(
                <Input placeholder="url" />
              )}
            </FormItem> 
          </Modal>
        );
    }

}




/**
 * 笔记页面框架.
 */
@connect(({ data_note, loading }) => ({
    data_note,
    loading: loading.models.data_note,
}))
@Form.create()
class Notes extends Component {

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
            title: '书籍',
            sorter: true,
            dataIndex: 'book',
            align:'center',
            render:(text, record) => {
                const book = record.book;

                const img = book.img;
                const name = '《'+book.name+'》';
                const author = '--'+book.author;
                const toShowName = name.length>=10?name.substr(0,10)+'...':name
                const toShow=(
                    <Card hoverable style={{ width: 200 }} cover={<img alt="example" src={img} />}>
                        <Meta title={name} description={author} />
                    </Card>  
                );
                return <span><Popover content={toShow} placement="right"><Avatar src={img} /></Popover><Divider type="vertical" />{toShowName}</span>
            }
        },
        {
            title: '创建日期',
            sorter: true,
            dataIndex: 'gmt_create',
            align:'center',
            render(val) {
                return moment(val).format("YYYY-MM-DD HH:mm:ss");
              },
        },
        {
            title: '进度',
            dataIndex: 'current',
            align:'center',
        },
        {
            title: '时间戳',
            sorter: true,
            dataIndex: 'gmt_modified',
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
                    <a onClick={() => this.dealDelete(record)}>删除</a>
                </Fragment>
                ),
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
            params.sorter = `${sorter.field}|${sorter.order}`;
        }
    
        dispatch({
            type: 'data_note/fetch',
            payload: params,
        });
    };

    //默认查询第一页
    componentDidMount() {
    
        const { dispatch } = this.props;

        dispatch({
            type: 'data_note/fetch',
        });
    }

    //当输入变化时候获取列表
    handleBookSearch(value){
        //getBooks
        const { dispatch } = this.props;
        dispatch({
            type: 'data_note/getBooks',
            payload:{
                name:value,
            }
        });
    }
    
    handleBookChange(value){
        console.log('handleBookChange',value);
    }
    //查询条件。
    renderForm(name,data){
        const {
            form: { getFieldDecorator },
        } = this.props;
        
        const options = dataToOptionsBook(data); 

        return (
        <Form onSubmit={this.handleSearch} layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
                <FormItem label="书籍">
                {getFieldDecorator('name')(
                    <Select
                    showSearch
                    placeholder="书籍名称"
                    showArrow={false}
                    filterOption={false}
                    onSearch={(value)=>this.handleBookSearch(value)}
                    onChange={(value)=>this.handleBookChange(value)}
                    notFoundContent={null}
                >
                    {options}
                </Select>
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
            
            let payload={};
            //删除undifined
            Object.keys(fieldsValue).forEach(function(key){
                if(typeof(fieldsValue[key])!='undefined'){
                    payload[key] = fieldsValue[key];
                }
            });

            dispatch({
                type: 'data_note/fetch',
                payload:payload
            });
        });
    };
    //清空查询条件
    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
            type: 'data_note/setFormValues',
            payload: {
                formValues:{
                    name:'',
                },
            }
        });
        dispatch({
            type: 'data_note/setOptions',
            payload: {
                options:[],
            }
        });

        dispatch({
            type: 'data_note/fetch',
        });
    };


    //处理添加逻辑
    handleAdd = fields => {
        const { dispatch } = this.props;

        //处理date
        fields.gmt_create = fields.gmt_create.format("YYYY-MM-DD HH:mm:ss");


        dispatch({
            type: 'data_note/add',
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
            type: 'data_note/setModalVisible',
            payload:!!flag,
        });
    };
    //处理更新逻辑

    //展示uodate页面
    showUpdate(item){
        const { dispatch } = this.props;
        dispatch({
            type: 'data_note/updateStep1',
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
            type: 'data_note/setUpdateModalVisible',
            payload:{
                updateModalVisible:!!flag,
            }
        });
    };

    handleUpdate= fields => {
        const { dispatch } = this.props;

        Modal.confirm({
            title: '修改笔记',
            content: '确定更新笔记['+fields.id+']吗?',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {

                //处理date
                fields.gmt_create = fields.gmt_create.format("YYYY-MM-DD HH:mm:ss");
                dispatch({
                    type: 'data_note/updateStep2',
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
            title: '删除笔记',
            content: '确定删除笔记['+item.id+']吗?',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                dispatch({
                    type: 'data_note/delete',
                    payload:item.id,
                    });
            },
        });
    }

    render(){

        const {
            data_note: { list,pagination,formValues,options,modalVisible,addBook,updateModalData,updateModalVisible},
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
            handleBookSearch:this.handleBookSearch,
            options:options,
            dispatch:this.props.dispatch,
            addBook:addBook,
        };

        const updateParams = {
            handleUpdate: this.handleUpdate,
            handleUpdateModalVisible: this.handleUpdateModalVisible,
            handleBookSearch:this.handleBookSearch,
            options:options,
            dispatch:this.props.dispatch,
        }

        return(
            <PageHeaderWrapper title="笔记管理" >
                <Card bordered={false}>
                <div className={styles.tableList}>
                    {/*查询条件*/}
                    <div className={styles.tableListForm}>{this.renderForm(formValues.name,options)}</div>
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
            {/*<UpdateForm {...updateParams} updateModalVisible={updateModalVisible} updateModalData={updateModalData}/>*/}
            </PageHeaderWrapper>
        )

    }


}

export default Notes;