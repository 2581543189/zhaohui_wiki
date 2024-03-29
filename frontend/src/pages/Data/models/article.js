import {queryArticle,distinctPlatforms,distinctValue,addArticle,deleteArticle,updateArticle} from '@/services/data';
import {openNotification} from '../../../utils/utils';

export default {
    namespace: 'data_article',

    state:{
        //列表页信息
        list: [],
        pagination: {
            current:1,
            pageSize:10,
            total:0,
        },
        //平台列表
        platforms:[],
        //查询条件    
        formValues:{
            type:'SKILL',
            title:'',
            platform:'',
            first:'',
            second:'',
            third:'',
        },
        //级联查询选项
        options:[],
        //新增弹窗状态。
        modalVisible:false,
        //更新相关数据
        updateModalData:{
            id:0,
            title:'-',
            gmt_create:'1970-01-01 00:00:00',
            url:'http://',
            type:[],
            platform:'-'
        },
        updateModalVisible:false,

    },

    effects: {
        //查询数据
        *fetch({ payload }, { call, put,select }) {
            if(typeof(payload)=='undefined'){
                payload={};
            }
            const formValues = yield select(state => state.data_article.formValues);
            const param = {
                ...formValues,
                ...payload,
            }
            const response = yield call(queryArticle, param);
            if(response.error!=1){
                yield put({
                    type: 'save',
                    payload: response,
                  });
                //保存当前formValues
                yield put({
                    type: 'setFormValues',
                    payload: {
                        formValues: {
                            title:param.title,
                            platform:param.platform,
                            first:param.first,
                            second:param.second,
                            third:param.third,
                        }
                    },
                  });
            }else{
                openNotification('error',response.message);
            }

        },
        //获取平台列表
        *getPlatforms({ payload }, { call, put,select }) {
            const response = yield call(distinctPlatforms, payload);
            if(response.error!=1){
                yield put({
                    type: 'setplatforms',
                    payload: {
                        platforms:response.body.array,
                    },
                  });
            }else{
                openNotification('error',response.message);
            }

        },
        //增加article
        *add({ payload,callback }, { call, put,select }) {
            const response = yield call(addArticle, payload);
            if(response.error!=1){
                yield put({
                    type: 'setModalVisible',
                    payload:false,
                });
                openNotification('success','新增文章'+response.data.title+'['+response.data.id+']成功')
                const formValues = yield select(state => state.data_article.formValues);
                yield put({
                    type: 'fetch',
                    payload:{
                        currentPage:1,
                        pageSize:10,
                        id:response.id,
                    },
                });
            }else{
                openNotification('error',response.message);
            }
            
        },
        //删除文章
        *delete ({ payload }, { call, put ,select }){
            const response = yield call(deleteArticle, payload);
            if(response.error!=1){
                openNotification('success','删除文章['+response.data.id+']成功')
                const formValues = yield select(state => state.data_article.formValues);
                yield put({
                    type: 'fetch',
                    payload:{
                        currentPage:1,
                        pageSize:10,
                        ...formValues,
                    },
                });
            }else{
                openNotification('error',response.message);
            }

        },
        //更新用户step1
        *updateStep1({ payload }, { call, put }){
            //获取用户信息
            const param = {
                id:payload.id,
            }
            const response = yield call(queryArticle, param);
            if(response.error!=1){
                yield put({
                    type: 'setUpdateModalVisible',
                    payload:{
                        updateModalVisible:true,
                        updateModalData:response.list[0],
                    },
                });
            }else{
                openNotification('error',response.message);
            }

        },
        //更新用户step2
        *updateStep2({ payload }, { call, put ,select }){
            delete payload.type
            const response = yield call(updateArticle, payload);
            if(response.error!=1){
                yield put({
                    type: 'setUpdateModalVisible',
                    payload:{
                        updateModalVisible:false,
                        updateModalData:{
                            id:0,
                            title:'-',
                            gmt_create:'1970-01-01',
                            url:'http://',
                            type:[],
                            platform:'-'
                        },
                    },
                });
                const formValues = yield select(state => state.data_article.formValues);
                yield put({
                    type: 'fetch',
                    payload:{
                        currentPage:1,
                        pageSize:10,
                        id:response.id,
                        ...formValues,
                    },
                });
            }else{
                openNotification('error',response.message);
            }

        },

    },

    reducers: {
        save(state, action) {
            return {
              ...state,
              list: action.payload.list,
              pagination: action.payload.pagination,
            };
        },
        //通过级联select设置查询条件
        setFormValues(state, action){
            state.formValues={
                ...(state.formValues),
                ...(action.payload.formValues),
            }
            return{
                ...state,
            }
        },
        //设置平台列表
        setplatforms(state, action){
            state.platforms=action.payload.platforms;
            return{
                ...state,
            }

        },
        setModalVisible(state, action){
            return {
                ...state,
                modalVisible: action.payload,
            };
        },
        setUpdateModalVisible(state, action){
            const _default={
                id:0,
                title:'-',
                gmt_create:'1970-01-01',
                url:'http://',
                type:[],
                platform:'-'
            }

            return {
                ...state,
                updateModalData:action.payload.updateModalData?action.payload.updateModalData:_default,
                updateModalVisible: action.payload.updateModalVisible,
            };
        },

    }

}

