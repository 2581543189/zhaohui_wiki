import { queryUser ,deleteUser,managerUser,addUser ,updateUser} from '@/services/data';
import {openNotification} from '../../../utils/utils';

// if(response.error!=1){
// }else{
//     openNotification('error',response.message);
// }

export default {
    namespace: 'data_user',
  
    state: {
        //列表页信息
        list: [],
        pagination: {
            current:1,
            pageSize:10,
            total:0,
        },
        //新增相关数据
        modalVisible: false,
        //更新相关数据
        updateModalVisible:false,
        updateModalData:{
            id:0,
            name:'-',
            password:'-',
            role:2,
            avatar:''
        }

    },
  
    effects: {
        //查询数据
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryUser, payload);
            if(response.error!=1){
                yield put({
                    type: 'save',
                    payload: response,
                  });
            }else{
                openNotification('error',response.message);
            }
            
        },
        //新增用户
        *add({ payload,callback }, { call, put }) {
            const response = yield call(addUser, payload);
            if(response.error!=1){
                yield put({
                    type: 'setModalVisible',
                    payload:false,
                });
                openNotification('success','新增用户'+response.data.name+'['+response.data.id+']成功')
                yield put({
                    type: 'fetch',
                    payload:{
                        name:response.name,
                        currentPage:1,
                        pageSize:10,
                    },
                });
            }else{
                openNotification('error',response.message);
            }
            
        },
        //删除用户
        *delete ({ payload }, { call, put }){
            const response = yield call(deleteUser, payload);
            if(response.error!=1){
                openNotification('success','删除用户['+response.data.id+']成功')
                yield put({
                    type: 'fetch',
                    payload:{
                        currentPage:1,
                        pageSize:10,
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
            const response = yield call(queryUser, param);
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
        *updateStep2({ payload }, { call, put }){
            const response = yield call(updateUser, payload);
            if(response.error!=1){
                yield put({
                    type: 'setUpdateModalVisible',
                    payload:{
                        updateModalVisible:false,
                        updateModalData:{},
                    },
                });
                yield put({
                    type: 'fetch',
                    payload:{
                        currentPage:1,
                        pageSize:10,
                    },
                });
            }else{
                openNotification('error',response.message);
            }
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
              list: action.payload.list,
              pagination: action.payload.pagination,
            };
        },
        setModalVisible(state, action){
            return {
                ...state,
                modalVisible: action.payload,
            };
        },
        setUpdateModalVisible(state, action){
            const default_ = {
                id:0,
                name:'-',
                password:'-',
                role:2,
                avatar:''
            }
            return {
                ...state,
                updateModalVisible: action.payload.updateModalVisible,
                updateModalData:action.payload.updateModalData?action.payload.updateModalData:default_,
            };
        }
    },
};
  