'use strict';

const Controller = require('egg').Controller;

const util = require('../utils/commonUtil');

class MessageController extends Controller {

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
    //处理username
    const {name} = body;
    if(typeof(name)!= 'undefined'){
      util.dealKeyEqual(query,'name',name);
    }
    ctx.body = await ctx.service.message.query(query);
  }


  async add() {
    const ctx = this.ctx;
    const message = await ctx.service.message.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = message;
  }


  async delete() {
    const ctx = this.ctx;
    const id = util.parseInt(ctx.params.id);
    await ctx.service.message.del(id);
    ctx.status = 200;
    ctx.body={
      id:id
    };
  }
}

module.exports = MessageController;
