'use strict';

const Controller = require('egg').Controller;

const util = require('../utils/commonUtil');

class SkillController extends Controller {
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

    //处理first
    const {first} = body;
    if(typeof(first)!= 'undefined'){
      util.dealKeyEqual(query,'first',first);
    }

    //处理second
    const {second} = body;
    if(typeof(second)!= 'undefined'){
      util.dealKeyEqual(query,'second',second);
    }

    //处理third
    const {third} = body;
    if(typeof(third)!= 'undefined'){
      util.dealKeyEqual(query,'third',third);
    }

    ctx.body = await ctx.service.skill.query(query);
  }


  async add() {
    const ctx = this.ctx;
    const skill = ctx.request.body;
    //查询有没有重名用户
    const query={
      where:{
        first:skill.first,
        second:skill.second,
        third:skill.third,
      }
    }
    let count = await ctx.service.skill.count(query);
    if(count > 0){
      ctx.status = 510;
      ctx.body = 'skill已经存在';
    }else{
      const skill = await ctx.service.skill.create(ctx.request.body);
      ctx.status = 201;
      ctx.body = skill;
    }
    
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    const body = ctx.request.body;
    ctx.body = await ctx.service.skill.update({ id, updates: body });
  }

  async delete() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    await ctx.service.skill.del(id);
    ctx.status = 200;
    ctx.body={
      id:id
    };
  }
}

module.exports = SkillController;
