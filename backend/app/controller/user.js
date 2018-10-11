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
class UserController extends Controller {
  async query() {
    let ctx = this.ctx;
    let query = {}

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
      util.dealSorter(query,sorter);
    }

    //处理name
    const {name} = body;
    if(typeof(name)!= 'undefined'){
      util.dealKeyLike(query,'name',name);
    }
    //处理role
    const {role} = body;
    if(typeof(role)!= 'undefined' && role != ''){
      util.dealKeyEqual(query,'role',role.split(',').map((val)=>{return parseInt(val)}));
    }
    ctx.body = await ctx.service.user.query(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.user.find(ctx.helper.parseInt(ctx.params.id));
  }

  async add() {
    const ctx = this.ctx;
    const user = ctx.request.body;
    //查询有没有重名用户
    const query={
      where:{
        name:user.name,
      }
    }
    let count = await ctx.service.user.count(query);
    if(count > 0){
      ctx.status = 600;
      ctx.body = '用户已经存在';
    }else{
      const user = await ctx.service.user.create(ctx.request.body);
      ctx.status = 201;
      ctx.body = user;
    }
    
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    const body = ctx.request.body;
    ctx.body = await ctx.service.user.update({ id, updates: body });
  }

  async delete() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    await ctx.service.user.del(id);
    ctx.status = 200;
    ctx.body={
      id:id
    };
  }
}

module.exports = UserController;