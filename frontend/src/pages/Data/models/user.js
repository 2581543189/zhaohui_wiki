import { queryUsers ,deleteUser,managerUser,addUsers } from '@/services/data';
import {openNotification} from '../../../utils/utils';

export default {
    namespace: 'data_user',
  
    state: {
        data: {
            list: [],
            pagination: {
                current:1,
                pageSize:10,
                total:0,
            },
            modalVisible: false,

        },
    },
  
    effects: {
        //查询数据
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryUsers, payload);
            yield put({
              type: 'save',
              payload: response,
            });
        },
        *add({ payload,callback }, { call, put }) {
            const response = yield call(addUsers, payload);
            yield put({
                type: 'setModalVisible',
                payload:false,
            });
            openNotification('success','新增用户'+response.name+'['+response.id+']成功')
            yield put({
                type: 'fetch',
                payload:{
                    name:response.name,
                    currentPage:1,
                    pageSize:10,
                },
            });
        },

        *delete ({ payload }, { call, put }){
            const response = yield call(deleteUser, payload);
            openNotification('success','删除用户['+response.id+']成功')
            yield put({
                type: 'fetch',
                payload:{
                    currentPage:1,
                    pageSize:10,
                },
            });
        },
        // *manager ({ payload }, { call, put }){
        //     const response = yield call(managerUser, payload);
        //     yield put({
        //         type: 'save',
        //         payload: response,
        //       });
        // },



        
    },
  
    reducers: {
        save(state, action) {
            return {
              ...state,
              data: action.payload,
            };
        },
        setModalVisible(state, action){
            return {
                ...state,
                modalVisible: action.payload,
            };
        }
    },
};
  