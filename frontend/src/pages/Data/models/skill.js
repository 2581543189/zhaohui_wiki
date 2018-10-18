import { querySkill ,deleteSkill,addSkill ,updateSkill,distinctValue} from '@/services/data';
import {openNotification} from '../../../utils/utils';
// if(response.error!=1){
// }else{
//     openNotification('error',response.message);
// }
export default {
    namespace: 'data_skill',
  
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
            first:'-',
            second:'-',
            third:'-',
        },
        //筛选条件
        options:[],
        //查询条件    
        formValues:{},

    },
  
    effects: {
        //查询数据
        *fetch({ payload }, { call, put,select }) {
            if(typeof(payload)=='undefined'){
                payload={};
            }
            const formValues = yield select(state => state.data_skill.formValues);
            const param = {
                ...payload,
                ...formValues,
            }
            const response = yield call(querySkill, param);
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
        *add({ payload,callback }, { call, put,select }) {
            const response = yield call(addSkill, payload);
            if(response.error!=1){
                yield put({
                    type: 'setModalVisible',
                    payload:false,
                });
                openNotification('success','新增技能'+response.name+'['+response.id+']成功')
                const formValues = yield select(state => state.data_skill.formValues);
                yield put({
                    type: 'fetch',
                    payload:{
                        name:response.name,
                        currentPage:1,
                        pageSize:10,
                        ...formValues,
                    },
                });
            }else{
                openNotification('error',response.message);
            }
            
        },
        //删除用户
        *delete ({ payload }, { call, put ,select }){
            const response = yield call(deleteSkill, payload);
            if(response.error!=1){
                openNotification('success','删除技能['+response.id+']成功')
                const formValues = yield select(state => state.data_skill.formValues);
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
            const response = yield call(querySkill, param);
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
            const response = yield call(updateSkill, payload);
            if(response.error!=1){
                yield put({
                    type: 'setUpdateModalVisible',
                    payload:{
                        updateModalVisible:false,
                        updateModalData:{},
                    },
                });
                const formValues = yield select(state => state.data_skill.formValues);
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

        /**
         * 获取级联下拉框数据。
         * 
         */
        *getOption({ payload }, { call, put }){
            const response = yield call(distinctValue, payload);
            if(response.error!=1){
                yield put({
                    type: 'addOptions',
                    payload:response,
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
        },
        //处理级联select
        addOptions(state, action){
            const response = action.payload.body;

            
            if(typeof(response.first)=='undefined' ||response.first===null){
                //无条件
                let options = [];
                response.array.map(data=>{
                    options.unshift({
                        value: data,
                        label: data,
                        isLeaf: false,
                    })
                })
                state.options = options;

            }else{
                let children=[];
                const first = response.first;

                if(typeof(response.second)=='undefined' ||response.second===null){ 
                    //根据1 查2
                    response.array.map(data=>{
                        children.unshift({
                            label: data,
                            value: data,
                            isLeaf: false,
                        })
                    })
                    state.options.map(data=>{
                        if(data.value===first){
                            data.children = children;
                        }
                    })
    
                }else{
                    //根据1 2 查3
                    const second = response.second;
                    response.array.map(data=>{
                        children.unshift({
                            label: data,
                            value: data,
                        })
                    })
                    state.options.map(data=>{
                        if(data.value===first){
                            data.children.map(data2=>{
                                if(data2.value===second){
                                    data2.children = children;
                                }
                            })
                        }
                    })
                    //state.options[first][second].children = children;
                }
            }

            return{
                ...state,
            }

        },
        //通过级联select设置查询条件
        setFormValues(state, action){
            state.formValues=action.payload.formValues;
            return{
                ...state,
            }
        }
    },


};
  