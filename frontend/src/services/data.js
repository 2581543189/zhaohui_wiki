/**查询后端数据的相关service */
import { stringify } from 'qs';
import { makeFormData } from '../utils/utils';
import request from '@/utils/request';
import {rolesLogin} from '../constant/DataConstant'


let _BASE_PATH="http://47.99.76.20/backend";
/**查询用户信息 */
export async function queryUsers(payload={}) {
    console.log('queryUsers',payload);
    //分页信息
    let pagination = {
        current:1,
        pageSize:10,
    }
    if(payload.currentPage){
        pagination = {
        current:payload.currentPage,
        pageSize:payload.pageSize,
        }
    }

    let option={
        method:'POST',
    }
    if(Object.keys(payload).length!=0){
        //var formData = new FormData();
        //makeFormData(payload,formData);
    
        option={
            method:'POST',
            body:payload,
        }
    
    }

    
    const response = await request(_BASE_PATH + '/user/query',option);

    let result = {};
    result.pagination = pagination;
    result.pagination.total = response.count;
    result.list = response.rows.map(function(value,key,arr){
        value.key = value.id;
        value.role = parseInt(value.role);
        return value;
    });

    return result;

}
/**新增用户信息 */
export async function addUsers(payload={}) {
    console.log('addUsers',payload);
    let option={
        method:'POST',
        body:payload,
    }
    const response = await request(_BASE_PATH + '/user/add',option);
    return response;

}



/**删除用户信息 */
export async function deleteUser(payload){
    console.log('deleteUser',payload);
    let option={
        method:'POST',
    }
    const response = await request(_BASE_PATH + '/user/delete/'+payload,option);
    return response;

}
/**授予管理员权限 */
export async function managerUser(payload){
    
}

export async function login(payload){

    console.log('login',payload);

    let option={
        method:'POST',
    }
    if(Object.keys(payload).length!=0){
        //var formData = new FormData();
        //makeFormData(payload,formData);

        option={
            method:'POST',
            body:payload,
        }
    }

    const response = await request(_BASE_PATH + '/user/query',option);

    let result = {};

    const count = response.count;
    if(count!=0){
        result = {
            status:true,
            currentAuthority:rolesLogin[response.rows[0].role],
            logout:false,
        }
    }else {

        result = {
            status:false,
            currentAuthority:'guest',
            logout:false,
        }
    }
    return result;

}