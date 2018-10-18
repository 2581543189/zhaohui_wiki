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


    //处理id
    const {id} = body;
    if(typeof(id)!= 'undefined'){
      util.dealKeyEqual(query,'id',id);
    }

    //处理first
    const {first} = body;
    if(typeof(first)!= 'undefined'&&first!=null &&first!=''){
      util.dealKeyEqual(query,'first',first);
    }

    //处理second
    const {second} = body;
    if(typeof(second)!= 'undefined'&&second!=null &&second!=''){
      util.dealKeyEqual(query,'second',second);
    }

    //处理third
    const {third} = body;
    if(typeof(third)!= 'undefined'&&third!=null &&third!=''){
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

  //级联查询使用
  async distinctValue(){
    const ctx = this.ctx;
    //参数检验
    let body = ctx.request.body;
    if(typeof(body)=='undefined'){
      body={};
    }
    let name = 'first';
    let first='';
    let second='';
    let third='';
    if(typeof(body.name)!= 'undefined' &&body.name!=null && body.name!=''){
      name = body.name;
    }
    if(typeof(body.first)!= 'undefined' &&body.first!=null && body.first!=''){
      first = body.first;
    }
    if(typeof(body.second)!= 'undefined' &&body.second!=null && body.second!=''){
      second = body.second;
    }
    if(typeof(body.third)!= 'undefined' &&body.third!=null && body.third!=''){
      third = body.third;
    }
    //分别查询
    let sql = 'SELECT DISTINCT '+name+' FROM skill WHERE 1 = 1';
    if(first!=''){
      sql+=' AND first=\''+first+'\'';
    }
    if(second!=''){
      sql+=' AND second=\''+second+'\'';
    }
    if(third!=''){
      sql+=' AND third=\''+third+'\'';
    }

    //const Sequelize = ctx.app.Sequelize;
    ctx.body = await this.app.model.query(sql, {type : this.app.model.QueryTypes.SELECT});
    ctx.status = 200;


  }
}

module.exports = SkillController;
