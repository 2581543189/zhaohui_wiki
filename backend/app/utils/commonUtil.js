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
            //   book: numbers.totalBooks,
            //   note: numbers.note,
              read:numbers.totalBooks + numbers.note,
              article: numbers.article,
              task: numbers.totalTask,
              algorithm: numbers.totalAlgorithm,
              math:numbers.totalMath,
            },
            {
              name: '完成',
            //   book: numbers.finishedBooks,
            //   note: numbers.note,
              read:numbers.finishedBooks + numbers.note,
              article: numbers.article,
              task: numbers.finishedTask,
              algorithm: numbers.finishedAlgorithm,
              math:numbers.finishedMath,
            },
            {
              name: '进行中',
            //   book: numbers.totalBooks - numbers.finishedBooks,
            //   note: 0,
              read:numbers.totalBooks + numbers.note-numbers.finishedBooks,
              article: 0,
              task: numbers.totalTask - numbers.finishedTask,
              algorithm: numbers.totalAlgorithm - numbers.finishedAlgorithm,
              math:numbers.totalMath - numbers.finishedMath,
            },
        ];
        const radarData = [];
        const radarTitleMap = {
            // book: '书籍',
            // note: '笔记',
            read:'阅读',
            article: '分享',
            task: '目标',
            algorithm: '算法',
            math:'数学'
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
    },
    parseInt(string) {
        if (typeof string === 'number') return string;
        if (!string) return string;
        return parseInt(string) || 0;
    },
    
}