'use strict';

const Controller = require('egg').Controller;

const util = require('../utils/commonUtil');

const constant = require('../constant/constant');

const moment = require('moment');

class OverviewController extends Controller {

    //随机获取一个鸡汤文案
    randomJitang(){
        let ctx = this.ctx;
        ctx.status = 200;
        ctx.body = {
            text:util.randomJitang()
        };
    }

    //获取成就信息
    async getAchievement(){
        let ctx = this.ctx;
        let achievement = [];
        //获取写死的成就
        constant.achievement.forEach((x)=>{
            achievement.push(x);
        })
        //获取计算的成就
        //文章
        let count = await ctx.service.article.count({});
        achievement.push(util.generateArchievement(count,'highlight','累积发表','篇文章'));
        //书籍
        const param={
            'where':{
                'endDate':{
                    '$ne': null,
                }
            }
        }
        count = await ctx.service.book.count(param);
        achievement.push(util.generateArchievement(count,'book','累积阅读完成','本书'));
        //笔记
        count = await ctx.service.note.count({});
        achievement.push(util.generateArchievement(count,'tags','累积记录','篇读书笔记'));
        //任务
        count = await ctx.service.bulletin.count(param);
        achievement.push(util.generateArchievement(count,'schedule','累积完成','个任务'));
        ctx.status = 200;
        ctx.body = achievement;
    }
    //获取任务列表
    async getTaskList(){
        let ctx = this.ctx;
        let tasks=[];
        //判断这周是否需要发表文章
        let param={
            'where':{
                'createDate':{
                    '$gt': moment().subtract(7,'days').format('YYYY-MM-DD'),
                }
            }
        }
        let count = await ctx.service.article.count(param);
        if(count==0){
            tasks.push({
                level:1,
                title:'发表文章',
                desc:'这周什么都没有总结,抓紧时间'
            })
        }else{
            tasks.push({
                level:1,
                title:'发表文章',
                desc:'任务已经完成'
            })
        }
        //判断是否有未读完的书
        param={
            'where':{
                'endDate':{
                    '$eq': null,
                }
            }
        }
        count = await ctx.service.book.count(param);
        if(count==0){
            tasks.push({
                level:2,
                title:'阅读书籍',
                desc:'书单都读完了，需要丰富一下了'
            })
        }else{
            let books = await ctx.service.book.query(param);
            let book = books.rows[books.rows.length-1];
            tasks.push({
                level:0,
                title:'阅读书籍',
                desc:'《'+book.name+'》等'+count+'本书还没读完，加把劲吧！'
            })
        }
        //获取任务列表
        param['order']=[['startDate','desc']];
        let taskObjs = await ctx.service.bulletin.query(param);
        taskObjs.rows.forEach((x)=>{
            if(tasks.length==6){
                return;
            }
            let during = moment().diff(moment(x.startDate), 'days')
            tasks.push({
                level:x.level,
                title:'感兴趣的东西('+during+'天前)',
                desc:x.sketch
            })
        });

        //设置id
        let index = 0;
        tasks = tasks.map((x)=>{
            index++;
            x.id = index;
            return x;
        })

        //
        ctx.status = 200;
        ctx.body = tasks;
    }
    //获取动态
    async getNews(){
        let ctx = this.ctx;
        if(typeof(ctx.request.body)=='undefined' || ctx.request.body==null){
            ctx.request.body={};
        }
        //从当前时间 往前减24小时30次，直到获取30个事件
        const news= [];
        //入参
        let {endDate,type}=ctx.request.body;
        if(type===''){
            type=null;
        }
        let resultEndDate;
        for(let i = 0;i<30;i++){

            let theDate = (endDate ? moment(endDate):moment()).format('YYYY-MM-DD')+' 23:59:59';
            const end = moment(theDate).subtract(i*24,'hours');
            const start = moment(theDate).subtract((i+1)*24,'hours');
            if(news.length >=10){
                resultEndDate=end.format('YYYY-MM-DD HH:mm:ss');
                break;
            }
            if(i==29){
                resultEndDate=end.format('YYYY-MM-DD HH:mm:ss');
            }

            //查询article
            let param ={
                'where':{
                    'createDate':{
                        '$between':[start.format('YYYY-MM-DD HH:mm:ss'),end.format('YYYY-MM-DD HH:mm:ss')]
                    }
                }
            }
            if(typeof(type)=='undefined' || type===null||type==='article'){
                const articles =  await ctx.service.article.query(param);
                if(articles.count >0){
                    articles.rows.forEach((x)=>{
                        news.push({
                            icon:'highlight',
                            date:moment(x.createDate).format('YYYY-MM-DD')+moment(x.timestamp).format(' HH:mm:ss'),
                            desc:'在'+x.platform+'平台发表了《'+x.title+'》',
                        });
                    });
                }
            }

            //查询书籍 新增
            param ={
                'include': [{ model: this.app.model.Skill}],
                'where':{
                    'startDate':{
                        '$between':[start.format('YYYY-MM-DD HH:mm:ss'),end.format('YYYY-MM-DD HH:mm:ss')]
                    }
                }
            }
            if(typeof(type)=='undefined' || type===null||type==='book'){
                let newBooks =  await ctx.service.book.query(param);
                if(newBooks.count >0){
                    newBooks.rows.forEach((x)=>{
                        news.push({
                            icon:'book',
                            date:moment(x.startDate).format('YYYY-MM-DD')+moment(x.timestamp).format(' HH:mm:ss'),
                            desc:'关注了书籍《'+x.name+'》,相关分类是['+x.skill.first+'/'+x.skill.second+'/'+x.skill.third+']',
                        });
                    });
                }
                //读完书籍
                param ={
                    'include': [{ model: this.app.model.Skill}],
                    'where':{
                        'endDate':{
                            '$between':[start.format('YYYY-MM-DD HH:mm:ss'),end.format('YYYY-MM-DD HH:mm:ss')]
                        }
                    }
                }
                newBooks =  await ctx.service.book.query(param);
                if(newBooks.count >0){
                    newBooks.rows.forEach((x)=>{
                        let during = moment(x.endDate).diff(moment(x.startDate), 'days')
                        news.push({
                            icon:'book',
                            date:moment(x.endDate).format('YYYY-MM-DD')+moment(x.timestamp).format(' HH:mm:ss'),
                            desc:'读完了书籍《'+x.name+'》,相关分类是['+x.skill.first+'/'+x.skill.second+'/'+x.skill.third+']累计耗时['+during+']天',
                        });
                    });
                }
            }
            

            if(typeof(type)=='undefined' || type===null||type==='note'){
                //笔记
                param ={
                    'include': [{ model: this.app.model.Book}],
                    'where':{
                        'date':{
                            '$between':[start.format('YYYY-MM-DD HH:mm:ss'),end.format('YYYY-MM-DD HH:mm:ss')]
                        }
                    }
                }
                const notes =  await ctx.service.note.query(param);
                if(notes.count >0){
                    notes.rows.forEach((x)=>{
                        news.push({
                            icon:'tags',
                            date:moment(x.date).format('YYYY-MM-DD')+moment(x.timestamp).format(' HH:mm:ss'),
                            desc:'新增了《'+x.book.name+'》的读书笔记,目前已经阅读到['+x.current+'/'+x.book.count+']页',
                        });
                    });
                }
            }

            //任务新增
            if(typeof(type)=='undefined' || type===null||type==='mission'){
                param ={
                    'where':{
                        'startDate':{
                            '$between':[start.format('YYYY-MM-DD HH:mm:ss'),end.format('YYYY-MM-DD HH:mm:ss')]
                        }
                    }
                }
                let tasks =  await ctx.service.bulletin.query(param);
                if(tasks.count >0){
                    tasks.rows.forEach((x)=>{
                        news.push({
                            icon:'alert',
                            date:moment(x.startDate).format('YYYY-MM-DD')+moment(x.timestamp).format(' HH:mm:ss'),
                            desc:'新增了任务:'+x.sketch,
                        });
                    });
                }
    
                //任务完成
                param ={
                    'where':{
                        'endDate':{
                            '$between':[start.format('YYYY-MM-DD HH:mm:ss'),end.format('YYYY-MM-DD HH:mm:ss')]
                        }
                    }
                }
                tasks =  await ctx.service.bulletin.query(param);
                if(tasks.count >0){
                    tasks.rows.forEach((x)=>{
                        let during = moment(x.endDate).diff(moment(x.startDate), 'days')
                        news.push({
                            icon:'book',
                            date:moment(x.endDate).format('YYYY-MM-DD')+moment(x.timestamp).format(' HH:mm:ss'),
                            desc:'完成了任务:'+x.sketch+',累计耗时['+during+']天',
                        });
                    });
                }

            }

            if(typeof(type)=='undefined' || type===null||type==='skill'){
                //查询skill
                param ={
                    'where':{
                        'timestamp':{
                            '$between':[start.format('YYYY-MM-DD HH:mm:ss'),end.format('YYYY-MM-DD HH:mm:ss')]
                        }
                    }
                }
                const skills =  await ctx.service.skill.query(param);
                if(skills.count >0){
                    skills.rows.forEach((x)=>{
                        news.push({
                            icon:'tool',
                            date:moment(x.timestamp).format('YYYY-MM-DD HH:mm:ss'),
                            desc:'在'+x.first+'分类中增加了'+x.second+'-'+x.third,
                        });
                    });
                }
            }

        }

        //排序
        news.sort(function(a,b){
            if(b.date>a.date){
                return 1;
            }
            return -1;
        });
        ctx.status = 200;
        ctx.body={};
        ctx.body.list = news;
        ctx.body.endDate = resultEndDate;

    }
    //获取活跃度信息
    async getActivity(){
        let ctx = this.ctx;
        let numbers={};
        const param={
            'where':{
                'endDate':{
                    '$ne': null,
                }
            }
        }
        //总书籍
        numbers['totalBooks'] = await ctx.service.book.count({});
        //完成书籍
        numbers['finishedBooks'] = await ctx.service.book.count(param);
        //总任务
        numbers['totalTask'] = await ctx.service.bulletin.count({});
        //完成任务
        numbers['finishedTask'] = await ctx.service.bulletin.count(param);
        //笔记
        numbers['note'] = await ctx.service.note.count({});
        //文章
        numbers['article'] = await ctx.service.article.count({});
        //算法 所有bulletin中名称中包含'[算法]'的
        let query = {
            where :{
                sketch:{
                    $like: '%[算法]%'
                }
            }
        };
        numbers['totalAlgorithm'] = await ctx.service.bulletin.count(query);
        query= {
            where :{
                $and:[{
                    sketch:{
                        $like: '%[算法]%'
                    }
                },{
                    endDate:{ $ne: null} 
                }]
            }
        };
        numbers['finishedAlgorithm'] = await ctx.service.bulletin.count(query);
        ctx.status = 200;
        ctx.body = util.generateActivity(numbers);
        

    }

    //获取关注名词信息
    getInterest(){
        let ctx = this.ctx;
        let array = constant.interest;
        let interest = array.map((x)=>{
            let i=Math.ceil(Math.random()*100);
            return {
                name:x,
                value:i,
                type:i%3,
            }
        })
        ctx.status = 200;
        ctx.body = interest;
    }

}

module.exports = OverviewController;