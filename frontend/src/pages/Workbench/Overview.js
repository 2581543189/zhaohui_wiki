
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


@connect(({  }) => ({
}))
class Overview extends PureComponent {
    //初始化获取数据
    componentDidMount() {
        const { dispatch } = this.props;

    }
    /**
     * 总览页框架
     */
    render(){

        const user= getUser();
        const pageHeaderContent =(
          <div className={styles.pageHeaderContent}>
            <div className={styles.avatar}>
              <Avatar size="large" src={user.avatar} />
            </div>
            <div className={styles.content}>
              <div className={styles.contentTitle}>
                早安，祝你开心每一天！
              </div>
            </div>
          </div>
        );
  
        const options=[
            {
                level:0,
                desc:{
                    now:'发表一篇文章',
                    next:'发表十篇文章',
                    current:5,
                    total:10,
                    hanzi:'壹',
                },
                icon:'highlight',
            },{
                level:1,
                desc:{
                    now:'发表十篇文章',
                    next:'发表五十篇文章',
                    current:5,
                    total:10,
                    hanzi:'十',
                },
                icon:'book',
            },{
                level:2,
                desc:{
                    now:'发表五十篇文章',
                    next:'发表一百篇文章',
                    current:5,
                    total:10,
                    hanzi:'卌',
                },
                icon:'tags',
            },{
                level:3,
                desc:{
                    now:'发表一百篇文章',
                    next:'发表二百篇文章',
                    current:5,
                    total:10,
                    hanzi:'百',
                },
                icon:'schedule',
            },{
                level:4,
                desc:{
                    now:'发表二百篇文章',
                    next:'',
                    current:5,
                    total:10,
                    hanzi:'皕',
                },
                icon:'file-add',
            },{
                level:0,
                desc:{
                    now:'发表一篇文章',
                    next:'发表十篇文章',
                    current:5,
                    total:10,
                    hanzi:'壹',
                },
                icon:'file-add',
            },{
                level:1,
                desc:{
                    now:'发表十篇文章',
                    next:'发表五十篇文章',
                    current:5,
                    total:10,
                    hanzi:'十',
                },
                icon:'file-add',
            },{
                level:2,
                desc:{
                    now:'发表五十篇文章',
                    next:'发表一百篇文章',
                    current:5,
                    total:10,
                    hanzi:'卌',
                },
                icon:'file-add',
            },{
                level:3,
                desc:{
                    now:'发表一百篇文章',
                    next:'发表二百篇文章',
                    current:5,
                    total:10,
                    hanzi:'百',
                },
                icon:'file-add',
            },{
                level:4,
                desc:{
                    now:'发表二百篇文章',
                    next:'',
                    current:5,
                    total:10,
                    hanzi:'皕',
                },
                icon:'file-add',
            }
        ]

        const children = [];
        let index = 0;
        options.map((option)=>{
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

        const tasks=[
            {
                id:1,
                level:0,
                title:'阅读书籍',
                desc:'<<xxxx>>等x本书还没读完，加把劲吧！'
            },{
                id:2,
                level:1,
                title:'发表文章',
                desc:'这周什么都没有总结,抓紧时间'
            },{
                id:3,
                level:2,
                title:'xxxxxxxxxxxxxxx',
                desc:'感兴趣的东西'
            },{
                id:4,
                level:3,
                title:'xxxxxxxxxxxxxxx',
                desc:'感兴趣的东西'
            },{
                id:5,
                level:4,
                title:'xxxxxxxxxxxxxxx',
                desc:'感兴趣的东西'
            },{
                id:6,
                level:2,
                title:'xxxxxxxxxxxxxxx',
                desc:'感兴趣的东西'
            }
        ];

        const news=[
            {
                icon:'book',
                date:'2018-10-21 10:00:00',
                desc:'关注了书籍《xxxxxx》,相关分类是xxxxxx',
            },{
                icon:'tags',
                date:'2018-10-22 20:00:00',
                desc:'新增了《xxxxxx》的读书笔记,目前已经阅读到xx页',
            },{
                icon:'highlight',
                date:'2018-10-22 20:00:00',
                desc:'在xxx平台发表了《xxxxxxxxx》',
            },{
                icon:'tool',
                date:'2018-10-23 20:00:00',
                desc:'在xxx分类中增加了xxxx-xxxx',
            },{
                icon:'alert',
                date:'2018-10-24 20:00:00',
                desc:'完成了任务:xxxxxxxxxx,总计耗时xxxxx天',
            }
        ];


        const radarOriginData = [
            {
              name: '汇总',
              book: 10,
              article: 8,
              note: 7,
              task: 20,
              question: 7,
            },
            {
              name: '掌握',
              book: 3,
              article: 6,
              note: 6,
              task: 15,
              question: 0,
            },
            {
              name: '未掌握',
              book: 7,
              article: 2,
              note: 1,
              task: 5,
              question: 7,
            },
          ];
          
          const radarData = [];
          const radarTitleMap = {
            book: '阅读',
            article: '发表',
            note: '笔记',
            task: '兴趣',
            question: '??',
          };
          radarOriginData.forEach(item => {
            Object.keys(item).forEach(key => {
              if (key !== 'name') {
                radarData.push({
                  name: item.name,
                  label: radarTitleMap[key],
                  value: item[key],
                });
              }
            });
        });

        const array=['AI人工智能',
        '区块链',
        '图灵测试',
        '回归分析',
        'MapReduce',
        '贪心算法',
        '数据挖掘',
        '数据可视化',
        '分布式计算',
        '分布式架构',
        'Hadoop',
        'BI',
        '商业智能',
        '非关系型数据库', 
        '结构化数据',
        'NoSQL',
        '半结构化数据',
        '数据清洗',
        '算法',
        'Algorithm',
        '深度学习',
        'Deep Learning',
        '人工神经网络', 
        'Artificial Neural Networks',
        '数据聚类', 
        '随机森林', 
        'Random forest',
        'Cluster analysis',
        '分治法', 
        'Divide and Conquer',
        '支持向量机',
        '熵',
        'entropy',
        'Support Vector Machine',
        '辛普森悖论',
        'Simpson’s Paradox',
        '朴素贝叶斯模型',
        'NBM',
        '数据科学家',
        'Data scientist',
        '并行处理',
        'Parallel Processing',
        'React',
        'Angular',
        'Vue',
        'PWA',
        'Electron',
        'GraphQL',
        'TypeScript',
        'JavaScript',
        '小程序',
        'styled-components',
        'Rollup',
        'ES6',
        'Babel',
        'Webpack',
        'Flex',
        'CSS Modules',
        'Flux',
        'Redux',
        'Mocha',
        'umi',
        'dva',
        'roadhog',
        'antd'];

        const tags = array.map((x)=>{
            let i=Math.ceil(Math.random()*100);
            return {
                name:x,
                value:i,
                type:i%3,

            }
        })
        
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
                    //loading={projectLoading}
                    bodyStyle={{ padding: 0 }}
                    >
                    {tasks.map(item => (
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
                    //loading={activitiesLoading}
                    extra={<Link to="/">more...</Link>}
                    >   <div className={styles.activitiesList}>

                        <List 
                            //loading={activitiesLoading} 
                            size="large">
                            {news.map(item => (
                            <List.Item key={item.id}>
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
                    //loading={radarData.length === 0}
                    >
                    <div className={styles.chart}>
                        <Radar hasLegend height={343} data={radarData} />
                    </div>
                    </Card>
                    <Card
                    title={"兴趣关键字"}
                    //loading={loading}
                    bordered={false}
                    bodyStyle={{ overflow: 'hidden' }}
                    >
                    <TagCloud data={tags} height={161} />
                    </Card>
                </Col>


                </Row>

            </PageHeaderWrapper>
        )
    }


}

export default Overview;