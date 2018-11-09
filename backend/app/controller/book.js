'use strict';

const Controller = require('egg').Controller;

const util = require('../utils/commonUtil');
/**
 * 接口调用方式如下:
GET	/users/posts	posts	app.controllers.posts.index
GET	/users/posts/new	new_post	app.controllers.posts.new
GET	/users/posts/:id	post	app.controllers.posts.show
GET	/users/posts/:id/edit	edit_post	app.controllers.posts.edit
POST	/users/posts	posts	app.controllers.posts.create
PUT	/users/posts/:id	post	app.controllers.posts.update
DELETE	/users/posts/:id	post	app.controllers.posts.destroy
 */
class BookController extends Controller {
  async query() {
    let ctx = this.ctx;
    let query = {
      'include': [{ model: this.app.model.Skill}]
    }

    let body = {};

    if(typeof(ctx.request.body)!='undefined' && ctx.request.body!=null){
      body = ctx.request.body;
    }
    //处理分页
    const {currentPage,pageSize} = body;
    if(typeof(currentPage)!= 'undefined' &&typeof(pageSize)!= 'undefined'){
      query.limit = pageSize;
      query.offset = pageSize * (currentPage - 1);
    }else{
      query.limit = 10;
      query.offset = 0;
    }
    //处理排序
    const {sorter} = body;
    if(typeof(sorter)!= 'undefined'){
      if(sorter.indexOf("skill") != -1){
        util.dealSorterRelative(query,this.app.model.Book.associations.skill,sorter);
      }else{
        util.dealSorter(query,sorter);
      }
      
    }

    //处理id
    const {id} = body;
    if(typeof(id)!= 'undefined' && id != null && id != ''){
      util.dealKeyEqual(query,'id',id);
    }
    //处理name
    const {name} = body;
    if(typeof(name)!= 'undefined' && name != null && name != ''){
      util.dealKeyLike(query,'name',name);
    }
    

    //处理skill
    const {first,second,third} = body;
    if(typeof(first)!= 'undefined'&& first != null && first != ''){
      //获取所有skill
      let skill_query = {}
      //处理first
      util.dealKeyEqual(skill_query,'first',first);
      //处理second
      if(typeof(second)!= 'undefined'&&second!=null &&second!=''){
        util.dealKeyEqual(skill_query,'second',second);
      }
      //处理third
      if(typeof(third)!= 'undefined'&&third!=null &&third!=''){
        util.dealKeyEqual(skill_query,'third',third);
      }

      const skills= await ctx.service.skill.query(skill_query);
      const array=[];
      if(skills.rows.length>0){
        skills.rows.map((data)=>{
          array.unshift(data.id);
        });
      }
      //console.log(array);
      util.dealKeyEqual(query,'skillId',array);

    }
    ctx.body = await ctx.service.book.query(query);
  }

  async add() {
    const ctx = this.ctx;
    const book = ctx.request.body;
    //查询skill
    const query={
      where:{
        first:book.first,
        second:book.second,
        third:book.third,
      }
    }
    let skills = await ctx.service.skill.query(query);
    if(skills.rows.length != 1){
      ctx.status = 510;
      ctx.body = '查询分类失败!';
    }else{
      book.skillId = skills.rows[0].id;
      const obj = await ctx.service.book.create(book);
      ctx.status = 201;
      ctx.body = obj;
    }
    
  }

  async update() {
    const ctx = this.ctx;
    const id = util.parseInt(ctx.params.id);
    const book = ctx.request.body;
    //获取分类
    //查询skill
    const query={
      where:{
        first:book.first,
        second:book.second,
        third:book.third,
      }
    }
    let skills = await ctx.service.skill.query(query);
    if(skills.rows.length != 1){
      ctx.status = 510;
      ctx.body = '查询分类失败!';
    }else{
      book.skillId = skills.rows[0].id;

      ctx.body = await ctx.service.book.update({ id, updates: book });
      ctx.status = 201;
    }

  }

  async delete() {
    const ctx = this.ctx;
    const id = util.parseInt(ctx.params.id);
    await ctx.service.book.del(id);
    ctx.status = 200;
    ctx.body={
      id:id
    };
  }

}



module.exports = BookController;
