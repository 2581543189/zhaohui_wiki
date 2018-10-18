/**查询后端数据的相关service */
import request from '@/utils/request';
import {rolesLogin} from '../constant/DataConstant'


//let _BASE_PATH="http://localhost/backend";
let _BASE_PATH="http://www.zhaohui.wiki/backend";

//TODO:模版方法希望后续能找到切面的方法不用每个方法都写这么费劲
// export async function xxx(payload={}) {
//     try{

//     }catch(e){
//         console.log(e);
//         return {
//             error:1,
//             message:e.message,
//         };
//     }
// }


/**
 * =======================================================================================
 *                                      用户表相关查询
 * =======================================================================================
 */


/**查询用户信息 */
export async function queryUser(payload={}) {
    try{
        console.log('queryUser',payload);
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
    
    }catch(e){
        console.log(e);
        return {
            error:1,
            message:e.message,
        };
    }
}

/**新增用户信息 */
export async function addUser(payload={}) {
    try{
        console.log('addUser',payload);
        let option={
            method:'POST',
            body:payload,
        }
        const response = await request(_BASE_PATH + '/user/add',option);
        return response;
    }catch(e){
        console.log(e);
        return {
            error:1,
            message:e.message,
        };
    }
}


/**删除用户信息 */
export async function deleteUser(payload={}) {
    try{
        console.log('deleteUser',payload);
        let option={
            method:'POST',
        }
        const response = await request(_BASE_PATH + '/user/delete/'+payload,option);
        return response;
    }catch(e){
        console.log(e);
        return {
            error:1,
            message:e.message,
        };
    }
}

/**授予管理员权限 */
export async function managerUser(payload={}) {
    try{

    }catch(e){
        console.log(e);
        return {
            error:1,
            message:e.message,
        };
    }
}

/**更新用户 */
export async function updateUser(payload={}) {
    try{
        console.log('updateUser',payload);
        let option={
            method:'POST',
            body:payload
        }
        const response = await request(_BASE_PATH + '/user/update/'+payload.id,option);
        return response;
    }catch(e){
        console.log(e);
        return {
            error:1,
            message:e.message,
        };
    }
}

/**登陆 */
export async function login(payload={}) {
    try{
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
                user:response.rows[0],
            }
        }else {
    
            result = {
                status:false,
                currentAuthority:'guest',
                logout:false,
                user:{},
            }
        }
        return result;
    
    }catch(e){
        console.log(e);
        return {
            error:1,
            message:e.message,
        };
    }
}



/**
 * =======================================================================================
 *                                      技能表相关查询
 * =======================================================================================
 */


/**查询用户信息 */
export async function querySkill(payload={}) {
    try{
        console.log('querySkill',payload);
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
    
        
        const response = await request(_BASE_PATH + '/skill/query',option);
    
        let result = {};
        result.pagination = pagination;
        result.pagination.total = response.count;
        result.list = response.rows.map(function(value,key,arr){
            value.key = value.id;
            value.role = parseInt(value.role);
            return value;
        });
    
        return result;
    }catch(e){
        console.log(e);
        return {
            error:1,
            message:e.message,
        };
    }
}

/**新增技能信息 */
export async function addSkill(payload={}) {
    try{
        console.log('addSkill',payload);
        let option={
            method:'POST',
            body:payload,
        }
        const response = await request(_BASE_PATH + '/skill/add',option);
        return response;
    }catch(e){
        console.log(e);
        return {
            error:1,
            message:e.message,
        };
    }
}


/**删除技能信息 */
export async function deleteSkill(payload){
    try{
        console.log('deleteSkill',payload);
        let option={
            method:'POST',
        }
        const response = await request(_BASE_PATH + '/skill/delete/'+payload,option);
        return response;
    }catch(e){
        console.log(e);
        return {
            error:1,
            message:e.message,
        };
    }
}

/**更新技能 */
export async function updateSkill(payload){
    try{
        console.log('updateSkill',payload);
        let option={
            method:'POST',
            body:payload
        }
        const response = await request(_BASE_PATH + '/skill/update/'+payload.id,option);
        return response;
    }catch(e){
        console.log(e);
        return {
            error:1,
            message:e.message,
        };
    }
}

/**获取级联筛选框数据 */
export async function distinctValue(payload){
    try{
        if(typeof(payload)=='undefined'){
            payload={};
        }
        let name='first';
        if(payload.name){
            name=payload.name;
        }
        //name:字段
        //first/second/具体的查询条件
        console.log('distinctValue',payload);
        let option={
            method:'POST',
            body:payload
        }

        let response = await request(_BASE_PATH + '/skill/distinctValue',option);
        let array=[];
        response.map(function(data){
            array.push(data[name]);
        })
        response={};
        response.body = {
            name:name,
            array:array,
            second:payload.second,
            first:payload.first,
        }
        return response;
    }catch(e){
        console.log(e);
        return {
            error:1,
            message:e.message,
        };
    }
}