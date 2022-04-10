import {
    Card,
    Popover,
    Avatar,
    Divider,
  } from 'antd';
const { Meta } = Card;

//角色相关
export const rolesLogin = ['admin', 'user', 'guest'];
export const roles = ['管理员', '用户', '访客'];
export const classificationtTypes = ['SKILL','LEETCODE','LEETCODE_EXP','BOOK_MARK','FOREIGN_ARTICLE'];
export const rolesIcon = ['crown', 'smile', 'eye'];
export const bulletinLevelText = ['普通', '稀有', '史诗','传说','??!!'];
export const bulletinLevelClass = ['green', 'blue', 'magenta','gold','red'];

//表单验证  必填 字母数字下划线  5-100
const re1 = new RegExp(/^\w+$/);
export function normalValidFunction(rule, value, callback) {

    
    if(typeof(value)=='undefined'||value===''){
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

    
    if(typeof(value)=='undefined'||value===''){
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
//表单验证  技能必须选择所有。
export function skillsValidFunction(rule, value, callback) {

    
    if(typeof(value)=='undefined'||value===''){
        callback('不能为空');
        return;
    }
    if (value.length != 3) {
        callback('必须选择所有分类');
        return;
    }

    callback(); // 校验通过
}

//表单验证  url校验。
var urlMmatch = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/;
export function urlValidFunction(rule, value, callback) {

    
    if(typeof(value)=='undefined'||value===''){
        callback('不能为空');
        return;
    }
    if(!urlMmatch.test(value)){
        callback('url不合法');
        return;
    }

    callback(); // 校验通过
}
//表单验证  必须是正整数。
var positiveInteger =/^[0-9]+$/ ;
export function  positiveIntegerValidFunction(srule, value, callback){//是否为正整数
    if(typeof(value)=='undefined'||value===''){
        callback('不能为空');
        return;
    }
    if(!positiveInteger.test(value)){
        callback('必须是正整数');
        return;
    }

    callback(); // 校验通过
}  

//表单验证  评分 0 - 10 的数字
export function  scoreValidFunction(rule, value, callback){
    if(typeof(value)=='undefined'||value===''){
        callback('不能为空');
        return;
    }
    if(isNaN(value)){
        callback('必须是数字');
        return;
    }
    if(value > 10 || value <=0){
        callback('必须是0 - 10 的数字');
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

export function dataToOptionsBook(data){
    if(JSON.stringify(data) == "{}"){
        data=[];
    }else{
        var arr = []
        for (let i in data) {
            data[i].key =  data[i].id;
            arr.push(data[i]); //属性
        }
        data=arr;
    }
    const options = [];
    data.map((value)=>{
        const book= value;
        const img = book.img;
        const name = '《'+book.name+'》';
        const author = '--'+book.author;
        const toShowName = name.length>=10?name.substr(0,10)+'...':name
        const toShow=(
            <Card hoverable style={{ width: 200 }} cover={<img alt="example" src={img} />}>
                <Meta title={name} description={author} />
            </Card>  
        );
        options.unshift(
        <Option value={value.name}>
        <span><Popover content={toShow} placement="right"><Avatar src={img} /></Popover><Divider type="vertical" />{toShowName}</span>    
        </Option>);
    });
    return options;
}




