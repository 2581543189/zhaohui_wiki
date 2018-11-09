import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { setAuthority ,setUsername,setUser} from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import {login }from '@/services/data'

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {  

      let response={status:false};

      if(payload.guest===true){
        response={
          status:true,
          currentAuthority:'guest',
          logout:false,
        };
        setUsername('guest');
      }else{
        response = yield call(login, payload);
        setUsername(payload.username);
      }
     
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === true) {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.indexOf("/#") != -1) {
              redirect = redirect.substr(redirect.indexOf("/#")+2 ,redirect.length);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/website'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
          logout:true,
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/login/main',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      if(typeof(payload.logout)=='undefined'){
        payload.logout=false;
      }
      setAuthority(payload.currentAuthority);
      setUser(payload.user);
      return {
        ...state,
        status: payload.status,
        logout: payload.logout,
      };
    },
  },
};
