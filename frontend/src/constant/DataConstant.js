//角色相关
export const rolesLogin = ['admin', 'user', 'guest'];
export const roles = ['管理员', '用户', '访客'];
export const rolesIcon = ['crown', 'smile', 'eye'];
//表单验证  必填 字母数字下划线  5-100
const re1 = new RegExp(/^\w+$/);
export function normalValidFunction(rule, value, callback) {

    
    if(typeof(value)=='undefined'||value==''){
        callback('不能为空');
        return;
    }
    if (value.length < 5) {
        callback('长度不能小于5');
        return;
    }
    if (value.length >100) {
        callback('长度不能大于100');
        return;
    }
    if(!re1.test(value)){
        callback('只能是字母数字下划线');
        return;
    }

    callback(); // 校验通过
};

//表单验证  必填 汉字数字字母 不能有空格
const re2 = new RegExp(/^[A-Za-z0-9\u4e00-\u9fa5]+$/);
export function hanziValidFunction(rule, value, callback) {

    
    if(typeof(value)=='undefined'||value==''){
        callback('不能为空');
        return;
    }
    if (value.length < 3) {
        callback('长度不能小于3');
        return;
    }
    if (value.length >100) {
        callback('长度不能大于100');
        return;
    }
    if(!re2.test(value)){
        callback('汉字数字字母 不能有空格');
        return;
    }

    callback(); // 校验通过
}

/**奇怪的方法 */
export function getValue (obj){

    const var1 = Object.keys(obj);
    const var2 =var1.map(function(key){
        const var3 = obj[key];
        return var3;
    });
    const var4 =  var2.join(',');
    return var4;  
}


