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

//尝试高阶函数

function globalTryCatch(innerFunction){

    return function(payload={}){
        try{
            return innerFunction(payload);
        }catch(e){
        console.log(e);
        return {
            error:1,
            message:e.message,
        };
    }

    }
}


/**
 * =======================================================================================
 *                                      用户表相关查询
 * =======================================================================================
 */


/**查询用户信息 */
export const queryUser = globalTryCatch(
    async function(payload) {
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
);

/**新增用户信息 */
export const addUser = globalTryCatch(async function (payload) {
    console.log('addUser',payload);
    let option={
        method:'POST',
        body:payload,
    }
    const response = await request(_BASE_PATH + '/user/add',option);
    return response;
});


/**删除用户信息 */
export const deleteUser = globalTryCatch(async function (payload) {
    console.log('deleteUser',payload);
    let option={
        method:'POST',
    }
    const response = await request(_BASE_PATH + '/user/delete/'+payload,option);
    return response;
});

/**授予管理员权限 */
export const managerUser = globalTryCatch(async function (payload) {

});

/**更新用户 */
export const updateUser = globalTryCatch(async function (payload) {
    console.log('updateUser',payload);
    let option={
        method:'POST',
        body:payload
    }
    const response = await request(_BASE_PATH + '/user/update/'+payload.id,option);
    return response;
});

/**登陆 */
export const login = globalTryCatch(async function (payload) {
        console.log('login',payload);
        let option={
            method:'POST',
        }
        if(Object.keys(payload).length!=0){
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
});



/**
 * =======================================================================================
 *                                      技能表相关查询
 * =======================================================================================
 */


/**查询用户信息 */
export const querySkill = globalTryCatch(async function (payload) {
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
});

/**新增技能信息 */
export const addSkill = globalTryCatch(async function (payload) {
    console.log('addSkill',payload);
    let option={
        method:'POST',
        body:payload,
    }
    const response = await request(_BASE_PATH + '/skill/add',option);
    return response;
});


/**删除技能信息 */
export const deleteSkill = globalTryCatch(async function (payload) {
    console.log('deleteSkill',payload);
    let option={
        method:'POST',
    }
    const response = await request(_BASE_PATH + '/skill/delete/'+payload,option);
    return response;
});

/**更新技能 */
export const updateSkill = globalTryCatch(async function (payload) {
    console.log('updateSkill',payload);
    let option={
        method:'POST',
        body:payload
    }
    const response = await request(_BASE_PATH + '/skill/update/'+payload.id,option);
    return response;
});

/**获取级联筛选框数据 */
export const distinctValue = globalTryCatch(async function (payload) {
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
});

/**
 * =======================================================================================
 *                                      文章表相关查询
 * =======================================================================================
 */

 /**查询文章信息 */
export const queryArticle = globalTryCatch(async function (payload) {
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
});


/**获取平台列表 */
export const distinctPlatforms = globalTryCatch(async function (payload) {
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
});
/**新增文章 */
export const addArticle = globalTryCatch(async function (payload) {
    console.log('addArticle',payload);
    let option={
        method:'POST',
        body:payload,
    }
    const response = await request(_BASE_PATH + '/article/add',option);
    return response;
});

/**删除文章信息 */
export const deleteArticle = globalTryCatch(async function (payload) {
    console.log('deleteArticle',payload);
    let option={
        method:'POST',
    }
    const response = await request(_BASE_PATH + '/article/delete/'+payload,option);
    return response;
});

/**更新文章 */
export const updateArticle = globalTryCatch(async function (payload) {
    console.log('updateArticle',payload);
    let option={
        method:'POST',
        body:payload
    }
    const response = await request(_BASE_PATH + '/article/update/'+payload.id,option);
    return response;
});

/**
 * =======================================================================================
 *                                      书籍表相关查询
 * =======================================================================================
 */

/**查询文章信息 */
export const queryBook = globalTryCatch(async function (payload) {
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
});

/**新增文章 */
export const addBook = globalTryCatch(async function (payload) {
    console.log('addBook',payload);
    let option={
        method:'POST',
        body:payload,
    }
    const response = await request(_BASE_PATH + '/book/add',option);
    return response;
});

/**删除书籍信息 */
export const deleteBook = globalTryCatch(async function (payload) {
    console.log('deleteBook',payload);
    let option={
        method:'POST',
    }
    const response = await request(_BASE_PATH + '/book/delete/'+payload,option);
    return response;
});

/**更新文章 */
export const updateBook = globalTryCatch(async function (payload) {
    console.log('updateBook',payload);
    let option={
        method:'POST',
        body:payload
    }
    const response = await request(_BASE_PATH + '/book/update/'+payload.id,option);
    return response;
});

/**
 * =======================================================================================
 *                                      笔记表相关查询
 * =======================================================================================
 */

 /**查询笔记信息 */
export const queryNote = globalTryCatch(async function (payload) {
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
});

/**新增笔记 */
export const addNote = globalTryCatch(async function (payload) {
    console.log('addNote',payload);
    let option={
        method:'POST',
        body:payload,
    }
    const response = await request(_BASE_PATH + '/note/add',option);
    return response;
});

/**删除笔记信息 */
export const deleteNote = globalTryCatch(async function (payload) {
    console.log('deleteNote',payload);
    let option={
        method:'POST',
    }
    const response = await request(_BASE_PATH + '/note/delete/'+payload,option);
    return response;
});

/**笔记文章 */
export const updateNote = globalTryCatch(async function (payload) {
    console.log('updateNote',payload);
    let option={
        method:'POST',
        body:payload
    }
    const response = await request(_BASE_PATH + '/note/update/'+payload.id,option);
    return response;
});

/**
 * =======================================================================================
 *                                      任务表相关查询
 * =======================================================================================
 */

 /**查询笔记信息 */
export const queryBulletin = globalTryCatch(async function (payload) {
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
});

/**新增笔记 */
export const addBulletin = globalTryCatch(async function (payload) {
    console.log('addBulletin',payload);
    let option={
        method:'POST',
        body:payload,
    }
    const response = await request(_BASE_PATH + '/bulletin/add',option);
    return response;
});

/**删除笔记信息 */
export const deleteBulletin = globalTryCatch(async function (payload) {
    console.log('deleteBulletin',payload);
    let option={
        method:'POST',
    }
    const response = await request(_BASE_PATH + '/bulletin/delete/'+payload,option);
    return response;
});

/**笔记文章 */
export const updateBulletin = globalTryCatch(async function (payload) {
    console.log('updateBulletin',payload);
    let option={
        method:'POST',
        body:payload
    }
    const response = await request(_BASE_PATH + '/bulletin/update/'+payload.id,option);
    return response;
});


/**
 * =======================================================================================
 *                                      首页相关查询
 * =======================================================================================
 */

/**获取鸡汤 */
export const getJitang = globalTryCatch(async function (payload) {
    console.log('getJitang',payload);
    let option={
        method:'POST'
    }
    const response = await request(_BASE_PATH + '/overview/randomJitang',option);
    return response;
});

/**获取成就 */
export const getAchievement = globalTryCatch(async function (payload) {
    console.log('getAchievement',payload);
    let option={
        method:'POST'
    }
    const response = await request(_BASE_PATH + '/overview/getAchievement',option);
    return response;
});

/**获取任务列表 */
export const getTaskList = globalTryCatch(async function (payload) {
    console.log('getTaskList',payload);
    let option={
        method:'POST'
    }
    const response = await request(_BASE_PATH + '/overview/getTaskList',option);
    return response;
});

/**获取最新动态 */
export const getNews = globalTryCatch(async function (payload) {
    console.log('getNews',payload);
    let option={
        method:'POST',
        body:payload,
    }
    const response = await request(_BASE_PATH + '/overview/getNews',option);
    return response;
});

/**获取活跃度数据 */
export const getActivity = globalTryCatch(async function (payload) {
    console.log('getActivity',payload);
    let option={
        method:'POST'
    }
    const response = await request(_BASE_PATH + '/overview/getActivity',option);
    return response;
});

/**获取兴趣数据 */
export const getInterest = globalTryCatch(async function (payload) {
    console.log('getInterest',payload);
    let option={
        method:'POST'
    }
    const response = await request(_BASE_PATH + '/overview/getInterest',option);
    return response;
});

/**
 * =======================================================================================
 *                                      留言表相关查询
 * =======================================================================================
 */

  /**查询留言信息 */
export const queryMessage = globalTryCatch(async function (payload) {
    console.log('queryMessage',payload);
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
    const response = await request(_BASE_PATH + '/message/query',option);

    let result = {};
    result.pagination = pagination;
    result.pagination.total = response.count;
    result.list = response.rows.map(function(value,key,arr){
        value.key = value.id;
        return value;
    });

    return result;
});

/**新增留言 */
export const addMessage = globalTryCatch(async function (payload) {
    console.log('addMessage',payload);
    let option={
        method:'POST',
        body:payload,
    }
    const response = await request(_BASE_PATH + '/message/add',option);
    return response;
});

/**删除留言信息 */
export const deleteMessage = globalTryCatch(async function (payload) {
    console.log('deleteMessage',payload);
    let option={
        method:'POST',
    }
    const response = await request(_BASE_PATH + '/message/delete/'+payload,option);
    return response;
});