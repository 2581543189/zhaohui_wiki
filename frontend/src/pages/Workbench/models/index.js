import {distinctPlatforms,queryArticle,queryBook} from '@/services/data';
import {openNotification} from '../../../utils/utils';
export default {
    namespace: 'workbench_index',

    state:{
        //article相关
        article:{
            list:[],//列表数据
            hasNext:true,//是否有下一页
            title:'',//模糊匹配名称
            first:'',//分类
            secont:'',
            third:'',
            platform:'',//发表平台
            platformList:[],//平台列表
            pagination: {//分页信息
                current:1,
                pageSize:10,
                total:0,
            }
        },
        book:{
            list:[],//列表数据
            hasNext:true,//是否有下一页
            name:'',
            first:'',//分类
            secont:'',
            third:'',
            pagination: {//分页信息
                current:1,
                pageSize:8,
                total:0,
            }
        }





    },

    effects:{

        //获取所有平台
        *article_getPlatforms({ payload }, { call, put,select }) {
            
            const response = yield call(distinctPlatforms, payload);
            if(response.error!=1){
                yield put({
                    type: 'changeStateArticle',
                    payload: {
                        platformList:response.body.array,
                    }
                  });
            }else{
                openNotification('error',response.message);
            }
        },
        //获取文章数据
        *article_fetch({ payload }, { call, put,select }) {
            //处理入参
            let append=false;
            if(typeof(payload)=='undefined'){
                payload={};
            }
            if(payload.append){
                append = payload.append;
            }
            let param = {
                title:payload.title,
                first:payload.first,
                second:payload.second,
                third:payload.third,
                platform:payload.platform,
                currentPage:payload.pagination?payload.pagination.current:1,
                pageSize:10,
                sorter:'createDate_descend',
            }

            const response = yield call(queryArticle, param);
            if(response.error!=1){
                let hasNext = false;
                if(response.list.length === 10){
                    hasNext=true;
                }
                yield put({
                    type: 'changeStateArticle',
                    payload: {
                        list:response.list,
                        hasNext:hasNext,
                        pagination:{
                            current:param.currentPage,
                            pageSize:param.pageSize,
                            total:response.count
                        },
                        append:append,
                    }
                  });
                
            }else{
                openNotification('error',response.message);
            }
        },
        //获取书籍数据
        *book_fetch({ payload }, { call, put,select }) {
            //处理入参
            let append=false;
            if(typeof(payload)=='undefined'){
                payload={};
            }
            if(payload.append){
                append = payload.append;
            }
            let param = {
                name:payload.name,
                first:payload.first,
                second:payload.second,
                third:payload.third,
                currentPage:payload.pagination?payload.pagination.current:1,
                pageSize:8,
                sorter:'startDate_descend',
            }

            const response = yield call(queryBook, param);
            if(response.error!=1){
                let hasNext = false;
                if(response.list.length === 8){
                    hasNext=true;
                }
                yield put({
                    type: 'changeStateBook',
                    payload: {
                        list:response.list,
                        hasNext:hasNext,
                        pagination:{
                            current:param.currentPage,
                            pageSize:param.pageSize,
                            total:response.count
                        },
                        append:append,
                    }
                  });
                
            }else{
                openNotification('error',response.message);
            }
        },


    },

    reducers:{
        //article 相关state修改
        changeStateArticle(state, action){
            
            if(action.payload.append){
                let temp = action.payload.list;
                action.payload.list = state.article.list.concat(temp);
            }
            return{
                ...state,
                article:{
                    ...(state.article),
                    ...action.payload,
                }
            }
        },
        changeStateBook(state, action){
            
            if(action.payload.append){
                let temp = action.payload.list;
                action.payload.list = state.book.list.concat(temp);
            }
            return{
                ...state,
                book:{
                    ...(state.book),
                    ...action.payload,
                }
            }
        },

    }
}