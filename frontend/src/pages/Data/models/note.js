import {queryNote,queryBook,addNote,deleteNote,updateNote} from '@/services/data';
import {openNotification} from '../../../utils/utils';
export default {
    namespace: 'data_note',

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
            name:'',
        },
        //下拉选项
        options:[],
        //新增弹窗状态。
        modalVisible:false,
        addBook:{
            count:-1,
        },
        //更新相关数据
        updateModalData:{
            id:0,
            bookName :'-',
            current:0,
            date:'1970-01-01',
            url:'http://',
        },
        updateModalVisible:false,
    },

    effects: {

        //查询数据
        *fetch({ payload }, { call, put,select }) {
            if(typeof(payload)=='undefined'){
                payload={};
            }
            const formValues = yield select(state => state.data_note.formValues);
            const param = {
                ...formValues,
                ...payload,
            }
            const response = yield call(queryNote, param);
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
                        }
                    },
                });
            }else{
                openNotification('error',response.message);
            }

        },
        *getBooks({ payload }, { call, put,select }) {
            if(typeof(payload)=='undefined'||payload.name===null||payload.name===''){
                return;
            }
            const param ={
                name:payload.name,
            }
            const response = yield call(queryBook, param);
            if(response.error!=1){
                yield put({
                    type: 'setOptions',
                    payload: {
                        options:response.list,
                    }
                });
            }else{
                openNotification('error',response.message);
            }
        },
        *getOneBook({ payload }, { call, put,select }) {
            if(typeof(payload)=='undefined'||payload.name===null||payload.name===''){
                return;
            }
            const param ={
                name:payload.name,
            }
            const response = yield call(queryBook, param);
            if(response.error!=1){
                yield put({
                    type: 'setAddBook',
                    payload: {
                        addBook:response.list[0],
                    }
                });
            }else{
                openNotification('error',response.message);
            }
        },
        //增加note
        *add({ payload,callback }, { call, put,select }) {
            const response = yield call(addNote, payload);
            if(response.error!=1){
                yield put({
                    type: 'setModalVisible',
                    payload:false,
                });
                openNotification('success','新增笔记['+response.id+']成功')
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
        //删除note
        *delete ({ payload }, { call, put ,select }){
            const response = yield call(deleteNote, payload);
            if(response.error!=1){
                openNotification('success','删除笔记['+response.id+']成功')
                const formValues = yield select(state => state.data_note.formValues);
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
            //获取笔记信息
            const param = {
                id:payload.id,
            }
            const response = yield call(queryNote, param);
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
            const response = yield call(updateNote, payload);
            if(response.error!=1){
                yield put({
                    type: 'setUpdateModalVisible',
                    payload:{
                        updateModalVisible:false,
                        updateModalData:{
                            id:0,
                            bookName :'-',
                            current:0,
                            date:'1970-01-01',
                            url:'http://',
                        },
                    },
                });
                const formValues = yield select(state => state.data_note.formValues);
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
        //设置查询条件
        setFormValues(state, action){
            state.formValues={
                ...(state.formValues),
                ...(action.payload.formValues),
            }
            return{
                ...state,
            }
        },
        //获取书籍信息
        setOptions(state, action){
            state.options=action.payload.options;
            
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
                bookName :'-',
                current:0,
                date:'1970-01-01',
                url:'http://',
            };
            return {
                ...state,
                updateModalVisible: action.payload.updateModalVisible,
                updateModalData:action.payload.updateModalData?action.payload.updateModalData:_default,
            };
        },
        setAddBook(state, action){
            return {
                ...state,
                addBook: action.payload.addBook,
            };

        }

    },
}