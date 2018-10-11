//角色相关
export const roles = ['管理员', '用户', '访客'];
export const rolesIcon = ['crown', 'smile', 'eye'];
//表单验证  必填 字母数字下划线  5-100
const re1 = new RegExp(/^\w+$/);
export function normalValidFunction(rule, value, callback) {

    
    if(typeof(value)=='undefined'&&value==''){
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
}
