import {queryBook,addBook,deleteBook,updateBook} from '@/services/data';
import {openNotification} from '../../../utils/utils';
export default {
    namespace: 'data_book',

    state:{
        //列表页信息
        list: [],
        pagination: {
            current:1,
            pageSize:10,
            total:0,
        },
        //查询条件    
        formValues:{
            type:'SKILL',
            name:'',
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
            name:'-',
            author:'-',
            url:'http://',
            first:'',
            second:'',
            third:'',
            count:0,
            current:0,
            startDate:'1970-01-01',
            endDate:null,
            img:'',
            score:'',
        },
        updateModalVisible:false,

    },
    effects: {
        //查询数据
        *fetch({ payload }, { call, put,select }) {
            if(typeof(payload)=='undefined'){
                payload={};
            }
            const formValues = yield select(state => state.data_book.formValues);
            const param = {
                ...formValues,
                ...payload,
            }
            const response = yield call(queryBook, param);
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
                            name:param.name,
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
        //增加book
        *add({ payload,callback }, { call, put,select }) {
            delete payload.type
            const response = yield call(addBook, payload);
            if(response.error!=1){
                yield put({
                    type: 'setModalVisible',
                    payload:false,
                });
                openNotification('success','新增书籍'+response.data.name+'['+response.data.id+']成功')
                const formValues = yield select(state => state.data_book.formValues);
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
        //删除book
        *delete ({ payload }, { call, put ,select }){
            const response = yield call(deleteBook, payload);
            if(response.error!=1){
                openNotification('success','删除书籍['+response.data.id+']成功')
                const formValues = yield select(state => state.data_book.formValues);
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
            const response = yield call(queryBook, param);
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
            const response = yield call(updateBook, payload);
            if(response.error!=1){
                yield put({
                    type: 'setUpdateModalVisible',
                    payload:{
                        updateModalVisible:false,
                        updateModalData:{
                            id:0,
                            name:'-',
                            author:'-',
                            url:'http://',
                            first:'',
                            second:'',
                            third:'',
                            count:0,
                            current:0,
                            startDate:'1970-01-01',
                            endDate:null,
                            img:'',
                            score:'',
                        },
                    },
                });
                const formValues = yield select(state => state.data_book.formValues);
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
        setModalVisible(state, action){
            return {
                ...state,
                modalVisible: action.payload,
            };
        },
        setUpdateModalVisible(state, action){
            const _default = {
                id:0,
                name:'-',
                author:'-',
                url:'http://',
                first:'',
                second:'',
                third:'',
                count:0,
                current:0,
                startDate:'1970-01-01',
                endDate:null,
                img:'',
                score:'',
            };
            return {
                ...state,
                updateModalVisible: action.payload.updateModalVisible,
                updateModalData:action.payload.updateModalData?action.payload.updateModalData:_default,
            };
        },
    },

}