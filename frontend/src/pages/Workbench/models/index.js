import {distinctPlatforms,queryArticle,queryBook,queryBulletin,getNews,queryNote,queryMessage,addMessage,deleteMessage} from '@/services/data';
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
            },
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
            },
            showNoteList:false,//是否展示笔记列表页
            noteList:[],//笔记列表
        },
        mission:{
            list:[],//列表数据
            hasNext:true,//是否有下一页
            state:'',//任务状态
            pagination: {//分页信息
                current:1,
                pageSize:8,
                total:0,
            },
        },
        news:{
            list:[],//列表数据
            hasNext:true,//是否有下一页
            type:'',//任务状态
            endDate:'',
        },
        message:{
            list:[],//列表数据
            hasNext:true,//是否有下一页
            pagination: {//分页信息
                current:1,
                pageSize:10,
                total:0,
            },
            name:'guest',
            avatar:'http://cdn2.scratch.mit.edu/get_image/gallery/4789249_170x100.png',
            content:'',
        },
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
        //获取笔记数据
        *note_fetch({ payload }, { call, put,select }) {
            //处理入参
            if(typeof(payload)=='undefined'){
                payload={};
            }

            const response = yield call(queryNote, payload);
            if(response.error!=1){
                yield put({
                    type: 'changeStateBook',
                    payload: {
                        noteList:response.list,
                    }
                });
                
            }else{
                openNotification('error',response.message);
            }
        },
        //获取书籍数据
        *mission_fetch({ payload }, { call, put,select }) {
            //处理入参
            let append=false;
            if(typeof(payload)=='undefined'){
                payload={};
            }
            if(payload.append){
                append = payload.append;
            }
            let param = {
                state:payload.state,
                currentPage:payload.pagination?payload.pagination.current:1,
                pageSize:10,
                sorter:'startDate_descend',
            }

            const response = yield call(queryBulletin, param);
            if(response.error!=1){
                let hasNext = false;
                if(response.list.length === 8){
                    hasNext=true;
                }
                yield put({
                    type: 'changeStateMission',
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
        },        //获取书籍数据
        *news_fetch({ payload }, { call, put,select }) {
            //处理入参
            let append=false;
            if(typeof(payload)=='undefined'){
                payload={};
            }
            if(payload.append){
                append = payload.append;
            }
            let param = {
                type:payload.type,
                endDate:payload.endDate,
            }

            const response = yield call(getNews, param);
            if(response.error!=1){
                let hasNext = true;
                if(response.list.length === 0){
                    hasNext=false;
                }
                yield put({
                    type: 'changeStateNews',
                    payload: {
                        list:response.list,
                        hasNext:hasNext,
                        endDate:response.endDate,
                        append:append,
                    }
                  });
                
            }else{
                openNotification('error',response.message);
            }
        },
        //获取留言数据
        *message_fetch({ payload }, { call, put,select }) {
            //处理入参
            let append=false;
            if(typeof(payload)=='undefined'){
                payload={};
            }
            if(payload.append){
                append = payload.append;
            }
            let param = {
                state:payload.state,
                currentPage:payload.pagination?payload.pagination.current:1,
                pageSize:10,
                sorter:'timestamp_descend',
            }

            const response = yield call(queryMessage, param);
            if(response.error!=1){
                let hasNext = false;
                if(response.list.length === 10){
                    hasNext=true;
                }
                yield put({
                    type: 'changeStateMessage',
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
        *message_add({ payload }, { call, put,select }) {
            const response = yield call(addMessage, payload);
            if(response.error!=1){
                openNotification('info','发表成功');
                yield put({
                    type: 'message_fetch',
                    payload: {
                        pagination: {//分页信息
                            current:1,
                            pageSize:10,
                            total:0,
                        },
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
        changeStateMission(state, action){
            
            if(action.payload.append){
                let temp = action.payload.list;
                action.payload.list = state.mission.list.concat(temp);
            }
            return{
                ...state,
                mission:{
                    ...(state.mission),
                    ...action.payload,
                }
            }
        },
        changeStateNews(state, action){
            
            if(action.payload.append){
                let temp = action.payload.list;
                action.payload.list = state.news.list.concat(temp);
            }
            return{
                ...state,
                news:{
                    ...(state.news),
                    ...action.payload,
                }
            }
        },
        changeStateMessage(state, action){
            
            if(action.payload.append){
                let temp = action.payload.list;
                action.payload.list = state.message.list.concat(temp);
            }
            return{
                ...state,
                message:{
                    ...(state.message),
                    ...action.payload,
                }
            }
        },

    }
}