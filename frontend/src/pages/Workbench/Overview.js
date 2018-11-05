
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Achievement from '@/components/Achievement';
import { getUser } from '../../utils/authority';
import styles from './Overview.less';
import React, { Component ,Fragment,PureComponent} from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import {openNotification} from '../../utils/utils';
import { Radar,TagCloud } from '@/components/Charts';
import {
    Row,
    Col,
    Card,
    Divider,
    Avatar,
    Tabs,
    Tag,
    List,
} from 'antd';
const TabPane = Tabs.TabPane;

import {bulletinLevelText,bulletinLevelClass} from '../../constant/DataConstant';


@connect(({ data_overview, loading }) => ({
    data_overview,
    loading: loading,
}))
class Overview extends PureComponent {
    //初始化获取数据
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type:'data_overview/getJitang'
        });
        dispatch({
            type:'data_overview/getAchievement'
        });
        dispatch({
            type:'data_overview/getTaskList'
        });
        dispatch({
            type:'data_overview/getNews'
        });
        dispatch({
            type:'data_overview/getActivity'
        });
        dispatch({
            type:'data_overview/getInterest'
        });

    }
    /**
     * 总览页框架
     */
    render(){


        let {
            data_overview:{jitang,achievement,taskList,news,activitys,interest},
            loading,
        } = this.props;

        //给task添加key
        let ket_index = 0;
        taskList = taskList.map((x)=>{
            ket_index++;
            x.key = ket_index;
            return x;
        });
        ket_index = 0;
        news = news.map((x)=>{
            ket_index++;
            x.key = ket_index;
            return x;
        });


        const user= getUser();
        let avatar_overview = (<Avatar size="large" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />)
        if(typeof(user.avatar)=='undefined' || user.avatar==''||user.avatar==null){
            //doNothing
        }else{
            avatar_overview = (<Avatar size="large" src={user.avatar} />)
        }
        const pageHeaderContent =(
          <div className={styles.pageHeaderContent}>
            <div className={styles.avatar}>
             {avatar_overview}
            </div>
            <div className={styles.content}>
              <div className={styles.contentTitle}>
                {jitang}
              </div>
            </div>
          </div>
        );
  
        const children = [];
        let index = 0;
        achievement.map((option)=>{
            index++;
            children.push(<TabPane tab={<Achievement {...option}></Achievement>} key={index}></TabPane>);
        })

        const extraContent = (
            <Row className={styles.achievementCabinet} >
                <Col>
                    <Divider orientation="left" style={{marginBottom:'-10px'}}>成就展柜</Divider>
                    <Tabs
                        defaultActiveKey="1"
                        tabBarGutter={0}
                    >
                    {children}
                    </Tabs>
                </Col>
            </Row>
        );
        
        return(
            <PageHeaderWrapper 
            content={pageHeaderContent}
            extraContent={extraContent} >
                <Row gutter={24}>
                <Col xl={16} lg={24} md={24} sm={24} xs={24}>
                    <Card
                    className={styles.projectList}
                    style={{ marginBottom: 24 }}
                    title="任务栏"
                    bordered={false}
                    extra={<Link to="/">more...</Link>}
                    loading={loading.effects['data_overview/getTaskList']}
                    bodyStyle={{ padding: 0 }}
                    >
                    {taskList.map(item => (
                        <Card.Grid className={styles.projectGrid} key={item.id}>
                        <Card bodyStyle={{ padding: 0 }} bordered={false}>
                            <Card.Meta
                            title={
                                <div className={styles.cardTitle}>
                                <Tag color={bulletinLevelClass[item.level]}>{bulletinLevelText[item.level]}</Tag>
                                <Link to="">{item.title}</Link>
                                </div>
                            }
                            description={item.desc}
                            />
                            <div className={styles.projectItemContent}>
                            </div>
                        </Card>
                        </Card.Grid>
                    ))}
                    </Card>
                    <Card
                    bodyStyle={{ padding: 0 }}
                    bordered={false}
                    className={styles.activeCard}
                    title="动态"
                    loading={loading.effects['data_overview/getNews']}
                    extra={<Link to="/">more...</Link>}
                    >   <div className={styles.activitiesList}>

                        <List 
                            //loading={activitiesLoading} 
                            size="large">
                            {news.map(item => (
                            <List.Item key={item.key}>
                                <List.Item.Meta
                                    avatar={<Avatar icon={item.icon} />}
                                    title={
                                        item.desc
                                    }
                                    description={
                                    <span className={styles.datetime} 
                                    //title={item.updatedAt}
                                    >
                                        {item.date} 
                                    </span>
                                    }
                                />
                            </List.Item>
                            ))}

                            
                        </List>
                        </div>
                    </Card>
                </Col>
                <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                    <Card
                    style={{ marginBottom: 24 }}
                    bordered={false}
                    title="活跃度"
                    loading={loading.effects['data_overview/getActivity']}
                    >
                    <div className={styles.chart}>
                        <Radar hasLegend height={343} data={activitys} />
                    </div>
                    </Card>
                    <Card
                    title={"兴趣关键字"}
                    loading={loading.effects['data_overview/getInterest']}
                    bordered={false}
                    bodyStyle={{ overflow: 'hidden' }}
                    >
                    <TagCloud data={interest} height={161} />
                    </Card>
                </Col>


                </Row>

            </PageHeaderWrapper>
        )
    }


}

export default Overview;