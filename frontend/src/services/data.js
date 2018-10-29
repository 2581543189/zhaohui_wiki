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

/**
 * =======================================================================================
 *                                      文章表相关查询
 * =======================================================================================
 */

 /**查询文章信息 */
export async function queryArticle(payload={}) {
    try{
        console.log('queryArticle',payload);
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
            option={
                method:'POST',
                body:payload,
            }
        }
        
        const response = await request(_BASE_PATH + '/article/query',option);
    
        let result = {};
        result.pagination = pagination;
        result.pagination.total = response.count;
        result.list = response.rows.map(function(value,key,arr){
            value.key = value.id;
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


/**获取平台列表 */
export async function distinctPlatforms(payload){
    try{
        //first/second/具体的查询条件
        console.log('distinctPlatforms',payload);
        let option={
            method:'POST'
        }

        let response = await request(_BASE_PATH + '/article/distinctPlatform',option);
        let array=[];
        response.map(function(data){
            array.push(data['platform']);
        })
        response={};
        response.body = {
            array:array,
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
/**新增文章 */
export async function addArticle(payload){
    try{
        console.log('addArticle',payload);
        let option={
            method:'POST',
            body:payload,
        }
        const response = await request(_BASE_PATH + '/article/add',option);
        return response;
    }catch(e){
        console.log(e);
        return {
            error:1,
            message:e.message,
        };
    }
}

/**删除文章信息 */
export async function deleteArticle(payload){
    try{
        console.log('deleteArticle',payload);
        let option={
            method:'POST',
        }
        const response = await request(_BASE_PATH + '/article/delete/'+payload,option);
        return response;
    }catch(e){
        console.log(e);
        return {
            error:1,
            message:e.message,
        };
    }
}

/**更新文章 */
export async function updateArticle(payload){
    try{
        console.log('updateArticle',payload);
        let option={
            method:'POST',
            body:payload
        }
        const response = await request(_BASE_PATH + '/article/update/'+payload.id,option);
        return response;
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
 *                                      书籍表相关查询
 * =======================================================================================
 */

/**查询文章信息 */
export async function queryBook(payload={}) {
    try{
        console.log('queryBook',payload);
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
            option={
                method:'POST',
                body:payload,
            }
        }
        const response = await request(_BASE_PATH + '/book/query',option);
    
        let result = {};
        result.pagination = pagination;
        result.pagination.total = response.count;
        result.list = response.rows.map(function(value,key,arr){
            value.key = value.id;
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

/**新增文章 */
export async function addBook(payload){
    try{
        console.log('addBook',payload);
        let option={
            method:'POST',
            body:payload,
        }
        const response = await request(_BASE_PATH + '/book/add',option);
        return response;
    }catch(e){
        console.log(e);
        return {
            error:1,
            message:e.message,
        };
    }
}

/**删除书籍信息 */
export async function deleteBook(payload){
    try{
        console.log('deleteBook',payload);
        let option={
            method:'POST',
        }
        const response = await request(_BASE_PATH + '/book/delete/'+payload,option);
        return response;
    }catch(e){
        console.log(e);
        return {
            error:1,
            message:e.message,
        };
    }
}

/**更新文章 */
export async function updateBook(payload){
    try{
        console.log('updateBook',payload);
        let option={
            method:'POST',
            body:payload
        }
        const response = await request(_BASE_PATH + '/book/update/'+payload.id,option);
        return response;
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
 *                                      笔记表相关查询
 * =======================================================================================
 */

 /**查询笔记信息 */
export async function queryNote(payload={}) {
    try{
        console.log('queryNote',payload);
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
            option={
                method:'POST',
                body:payload,
            }
        }
        const response = await request(_BASE_PATH + '/note/query',option);
    
        let result = {};
        result.pagination = pagination;
        result.pagination.total = response.count;
        result.list = response.rows.map(function(value,key,arr){
            value.key = value.id;
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

/**新增笔记 */
export async function addNote(payload){
    try{
        console.log('addNote',payload);
        let option={
            method:'POST',
            body:payload,
        }
        const response = await request(_BASE_PATH + '/note/add',option);
        return response;
    }catch(e){
        console.log(e);
        return {
            error:1,
            message:e.message,
        };
    }
}

/**删除笔记信息 */
export async function deleteNote(payload){
    try{
        console.log('deleteNote',payload);
        let option={
            method:'POST',
        }
        const response = await request(_BASE_PATH + '/note/delete/'+payload,option);
        return response;
    }catch(e){
        console.log(e);
        return {
            error:1,
            message:e.message,
        };
    }
}

/**笔记文章 */
export async function updateNote(payload){
    try{
        console.log('updateNote',payload);
        let option={
            method:'POST',
            body:payload
        }
        const response = await request(_BASE_PATH + '/note/update/'+payload.id,option);
        return response;
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
 *                                      任务表相关查询
 * =======================================================================================
 */

 /**查询笔记信息 */
export async function queryBulletin(payload={}) {
    try{
        console.log('queryBulletin',payload);
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
            option={
                method:'POST',
                body:payload,
            }
        }
        const response = await request(_BASE_PATH + '/bulletin/query',option);
    
        let result = {};
        result.pagination = pagination;
        result.pagination.total = response.count;
        result.list = response.rows.map(function(value,key,arr){
            value.key = value.id;
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

/**新增笔记 */
export async function addBulletin(payload){
    try{
        console.log('addBulletin',payload);
        let option={
            method:'POST',
            body:payload,
        }
        const response = await request(_BASE_PATH + '/bulletin/add',option);
        return response;
    }catch(e){
        console.log(e);
        return {
            error:1,
            message:e.message,
        };
    }
}

/**删除笔记信息 */
export async function deleteBulletin(payload){
    try{
        console.log('deleteBulletin',payload);
        let option={
            method:'POST',
        }
        const response = await request(_BASE_PATH + '/bulletin/delete/'+payload,option);
        return response;
    }catch(e){
        console.log(e);
        return {
            error:1,
            message:e.message,
        };
    }
}

/**笔记文章 */
export async function updateBulletin(payload){
    try{
        console.log('updateBulletin',payload);
        let option={
            method:'POST',
            body:payload
        }
        const response = await request(_BASE_PATH + '/bulletin/update/'+payload.id,option);
        return response;
    }catch(e){
        console.log(e);
        return {
            error:1,
            message:e.message,
        };
    }
}




