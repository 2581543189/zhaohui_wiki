import {getJitang,getAchievement,getTaskList,getNews,getActivity,getInterest,getRandomWord} from '@/services/data';
import {openNotification} from '../../../utils/utils';
export default {
    namespace: 'workbench_overview',

    state:{
        jitang:'',
        achievement:[],
        taskList:[],
        news:[],
        activitys:[],
        interest:[],
        foreignWord:[],
    },

    effects:{
        *getJitang({ payload }, { call, put,select }) {
            const response = yield call(getJitang, payload);
            if(response.error!=1){
                yield put({
                    type: 'setJitang',
                    payload: response.data,
                  });
            }else{
                openNotification('error',response.message);
            }
        },
        *getAchievement({ payload }, { call, put,select }) {
            const response = yield call(getAchievement, payload);
            if(response.error!=1){
                yield put({
                    type: 'setAchievement',
                    payload: response.data,
                  });
            }else{
                openNotification('error',response.message);
            }
        },
        *getTaskList({ payload }, { call, put,select }) {
            const response = yield call(getTaskList, payload);
            if(response.error!=1){
                yield put({
                    type: 'setTaskList',
                    payload: response,
                  });
            }else{
                openNotification('error',response.message);
            }
        },
        *getNews({ payload }, { call, put,select }) {
            const response = yield call(getNews, payload);
            if(response.error!=1){
                yield put({
                    type: 'setNews',
                    payload: response.data.list,
                  });
            }else{
                openNotification('error',response.message);
            }
        },
        *getActivity({ payload }, { call, put,select }) {
            const response = yield call(getActivity, payload);
            if(response.error!=1){
                yield put({
                    type: 'setActivity',
                    payload: response,
                  });
            }else{
                openNotification('error',response.message);
            }
        },
        *getInterest({ payload }, { call, put,select }) {
            const response = yield call(getInterest, payload);
            if(response.error!=1){
                yield put({
                    type: 'setInterest',
                    payload: response.data,
                  });
            }else{
                openNotification('error',response.message);
            }
        },
        *getRandomWord({ payload }, { call, put,select }) {
            const response = yield call(getRandomWord, payload);
            if(response.error!=1){
                yield put({
                    type: 'setRandomWord',
                    payload: response.data,
                  });
            }else{
                openNotification('error',response.message);
            }
        },

    },
    reducers:{
        setJitang(state, action) {
            return {
              ...state,
              jitang: action.payload,
            };
        },
        setAchievement(state, action) {
            return {
              ...state,
              achievement: action.payload,
            };
        },
        setTaskList(state, action) {
            return {
              ...state,
              taskList: action.payload,
            };
        },
        setNews(state, action) {
            return {
              ...state,
              news: action.payload,
            };
        },
        setActivity(state, action) {
            return {
              ...state,
              activitys: action.payload,
            };
        },
        setInterest(state, action) {
            return {
              ...state,
              interest: action.payload,
            };
        },
        setRandomWord(state, action) {
            return {
              ...state,
              foreignWord: action.payload,
            };
        }

    },
   

}