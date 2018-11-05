'use strict';

const Controller = require('egg').Controller;

const util = require('../utils/commonUtil');

class BulletinController extends Controller {

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
    //处理level
    const {level} = body;
    if(typeof(level)!= 'undefined' && level != ''){
      util.dealKeyEqual(query,'level',level.split(',').map((val)=>{return parseInt(val)}));
    }
    //处理时间范围
    const {startDate,endDate} = body;
    if(typeof(startDate)!= 'undefined' && startDate != ''&&typeof(endDate)!= 'undefined' && endDate != ''){
      util.dealKeyRange(query,'startDate',startDate,endDate)
    }

    ctx.body = await ctx.service.bulletin.query(query);
  }


  async add() {
    const ctx = this.ctx;
    const bulletin = await ctx.service.bulletin.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = bulletin;

    
  }

  async update() {
    const ctx = this.ctx;
    const id = util.parseInt(ctx.params.id);
    const body = ctx.request.body;
    ctx.body = await ctx.service.bulletin.update({ id, updates: body });
  }

  async delete() {
    const ctx = this.ctx;
    const id = util.parseInt(ctx.params.id);
    await ctx.service.bulletin.del(id);
    ctx.status = 200;
    ctx.body={
      id:id
    };
  }
}

module.exports = BulletinController;
