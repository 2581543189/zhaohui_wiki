'use strict';

const Controller = require('egg').Controller;

const util = require('../utils/commonUtil');

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

    //处理id
    const {id} = body;
    if(typeof(id)!= 'undefined'){
      util.dealKeyEqual(query,'id',id);
    }

    //处理name
    const {name} = body;
    if(typeof(name)!= 'undefined'){
      util.dealKeyLike(query,'name',name);
    }

    //处理username
    const {username} = body;
    if(typeof(username)!= 'undefined'){
      util.dealKeyEqual(query,'name',username);
    }


    //处理password
    const {password} = body;
    if(typeof(password)!= 'undefined'){
      util.dealKeyEqual(query,'password',password);
    }

    //处理role
    const {role} = body;
    if(typeof(role)!= 'undefined' && role != ''){
      util.dealKeyEqual(query,'role',role.split(',').map((val)=>{return parseInt(val)}));
    }
    ctx.body = await ctx.service.user.query(query);
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
      ctx.status = 510;
      ctx.body = '用户已经存在';
    }else{
      const user = await ctx.service.user.create(ctx.request.body);
      ctx.status = 201;
      ctx.body = user;
    }
    
  }

  async update() {
    const ctx = this.ctx;
    const id = util.parseInt(ctx.params.id);
    const body = ctx.request.body;
    ctx.body = await ctx.service.user.update({ id, updates: body });
  }

  async delete() {
    const ctx = this.ctx;
    const id = util.parseInt(ctx.params.id);
    await ctx.service.user.del(id);
    ctx.status = 200;
    ctx.body={
      id:id
    };
  }
}

module.exports = UserController;
