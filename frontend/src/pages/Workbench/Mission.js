import PageHeaderWrapper from '@/components/PageHeaderWrapper';
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
    Input,
    Tooltip,
} from 'antd';
const {Option} = Select;
const FormItem = Form.Item;
import StandardFormRow from '@/components/StandardFormRow';
import {bulletinLevelText,bulletinLevelClass} from '../../constant/DataConstant';

const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 12 },
    },
};


@Form.create({
    onValuesChange({ dispatch }, changedValues, allValues) {
      console.log(changedValues, allValues);
    },
 })
class Mission extends Component {

    
    render(){
        const {form} = this.props;
        const { getFieldDecorator } = form;

        let list=[
            {
                title:'你听过 React Fragments吗？?',
                level:2,
                date:'2015-01-15',
            },{
                title:'母猪都产后护理，必须注意的10个小细节',
                level:3,
                date:'2015-01-15',
            },{
                title:'你听过 React Fragments吗？?',
                level:2,
                date:'2015-01-15',
            },{
                title:'母猪都产后护理，必须注意的10个小细节',
                level:3,
                date:'2015-01-15',
            },{
                title:'你听过 React Fragments吗？?',
                level:2,
                date:'2015-01-15',
            },{
                title:'母猪都产后护理，必须注意的10个小细节',
                level:3,
                date:'2015-01-15',
            },{
                title:'你听过 React Fragments吗？?',
                level:2,
                date:'2015-01-15',
            },{
                title:'母猪都产后护理，必须注意的10个小细节',
                level:3,
                date:'2015-01-15',
            },{
                title:'你听过 React Fragments吗？?',
                level:2,
                date:'2015-01-15',
            },{
                title:'母猪都产后护理，必须注意的10个小细节',
                level:3,
                date:'2015-01-15',
            },
        ];
        let loading=false;
        const loadMore =
        list.length > 0 ? (
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Button onClick={this.fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
              {loading ? (
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
                    <Form layout="inline">
                    <StandardFormRow  grid last>
                        <Row gutter={16}>
                            <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                            <FormItem {...formItemLayout} label="状态">
                                {getFieldDecorator('state', {})(
                                    <Select>
                                        <Option key='1' value='1'>已完成</Option>
                                        <Option key='2' value='2'>未完成</Option>
                                    </Select>
                                )}
                            </FormItem>
                            </Col>
                        </Row>
                        </StandardFormRow>
                    </Form>

                </Card>
                {/**列表 */}
                <List
                    rowKey="id"
                    style={{ marginTop: 24 }}
                    grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
                    //loading={loading}
                    dataSource={list}
                    loadMore={loadMore}
                    renderItem={item => (
                        <List.Item key={item.id}>
                        <Card
                            hoverable
                            bodyStyle={{ paddingBottom: 20 }}
                            actions={[
                            <Tooltip title="执行任务">
                                <Icon type="rocket" />
                            </Tooltip>,
                            <Tooltip title="查看结果">
                                <Icon type="eye" />
                            </Tooltip>,
                            ]}
                        >
                            <Tag color={bulletinLevelClass[item.level]}>{bulletinLevelText[item.level]}</Tag>{item.title}
                        </Card>
                        </List.Item>
                    )}
                    />

            </Fragment>
        )
    }

}

export default Mission;