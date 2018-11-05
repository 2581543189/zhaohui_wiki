const constant = require('../constant/constant');
module.exports = {

    //const util = {};

    // //处理sorter
    // util.dealSorter = function (query, sorter) {
    //     const array = sorter.split('_');
    //     const key = array[0];
    //     const type = array[1] == 'descend' ? 'desc' : 'asc';
    //     query.order = [
    //         [key, type]
    //     ];
    // }

    // //处理like
    // util.dealKeyLike = function (query, key, value) {
    //     if (typeof (query.where) == 'undefined') {
    //         query.where = {};
    //     }
    //     query.where.key = {
    //         $like: '%' + value + '%'
    //     }
    // }

    // //处理equal
    // util.dealKeyEqual = function (query, key, value) {
    //     if (typeof (query.where) == 'undefined') {
    //         query.where = {};
    //     }
    //     query.where.key = value;
    // }



    // return util;


    //处理sorter
    dealSorter(query, sorter) {
        const array = sorter.split('_');
        const key = array[0];
        const type = array[1] == 'descend' ? 'desc' : 'asc';
        query.order = [
            [key, type]
        ];
    },

    //处理sorter
    dealSorterRelative(query,obj, sorter) {
        const array = sorter.split('_');
        const type = array[1] == 'descend' ? 'desc' : 'asc';
        query.order = [
            [obj, 'id', type]
        ];
    },

    //处理like
    dealKeyLike(query, key, value) {
        if (typeof (query.where) == 'undefined') {
            query.where = {};
        }
        query.where[key] = {
            $like: '%' + value + '%'
        }
    },

    //处理equal
    dealKeyEqual(query, key, value) {
        if (typeof (query.where) == 'undefined') {
            query.where = {};
        }
        query.where[key] = value;
    },
    //处理时间范围
    dealKeyRange(query,key,start,end){
        if (typeof (query.where) == 'undefined') {
            query.where = {};
        }
        query.where[key]={
            $between:[start,end],
        }
    },
    //随机获取一句鸡汤
    randomJitang(){
        let total = constant.jitang.length;
        let target = Math.ceil(Math.random() * total);
        return constant.jitang[target];
    },
    //构造成就对象
    generateArchievement(count,icon,start,end){
        let level = 0;
        let hanzi='壹';
        let total = 1;
        let now = 0;


        if(count <= 0){
            level = 0;
            hanzi='〇';
            total = 1;
            now=0;
        }else if(count <10){
            level = 0;
            hanzi='壹';
            total = 10;
            now = 1;
        }else if(count<50){
            level = 1;
            hanzi='十';
            total = 50;
            now = 10;
        }else if(count<100){
            level = 2;
            hanzi='卌';
            total = 100;
            now = 50;
        }else if(count<200){
            level = 3;
            hanzi='百';
            total = 200;
            now = 100;
        }else{
            level = 4;
            hanzi='皕';
            total = 1000;
            now = 200;
        }

        const archievement = {
            level:level,
            desc:{
                now:start+now+end,
                next:start+total+end,
                current:count,
                total:total,
                hanzi:hanzi,
            },
            icon:icon,
        }
        return archievement;

    },

    //构造活跃度数据
    generateActivity(numbers){
        const radarOriginData = [
            {
              name: '汇总',
              book: numbers.totalBooks,
              article: numbers.article,
              note: numbers.note,
              task: numbers.totalTask,
              question: 0
            },
            {
              name: '掌握',
              book: numbers.finishedBooks,
              article: numbers.article,
              note: numbers.note,
              task: numbers.finishedTask,
              question: 0
            },
            {
              name: '未掌握',
              book: numbers.totalBooks - numbers.finishedBooks,
              article: 0,
              note: 0,
              task: numbers.totalTask - numbers.finishedTask,
              question: 0
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
        return radarData;
    }
}