'use strict';

const Controller = require('egg').Controller;

const util = require('../utils/commonUtil');

class ArticleController extends Controller {
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
        util.dealSorterRelative(query,this.app.model.Article.associations.skill,sorter);
      }else{
        util.dealSorter(query,sorter);
      }
      
    }

    //处理title
    const {title} = body;
    if(typeof(title)!= 'undefined' && title != null && title != ''){
      util.dealKeyLike(query,'title',title);
    }

    //处理platform
    const {platform} = body;
    if(typeof(platform)!= 'undefined' && platform != null && platform != ''){
      util.dealKeyEqual(query,'platform',platform);
    }

    //处理id
    const {id} = body;
    if(typeof(id)!= 'undefined' && id != null && id != ''){
      util.dealKeyEqual(query,'id',id);
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
    ctx.body = await ctx.service.article.query(query);
  }

  // async show() {
  //   const ctx = this.ctx;
  //   ctx.body = await ctx.service.user.find(ctx.helper.parseInt(ctx.params.id));
  // }

  async add() {
    const ctx = this.ctx;
    const article = ctx.request.body;
    //查询skill
    const query={
      where:{
        first:article.first,
        second:article.second,
        third:article.third,
      }
    }
    let skills = await ctx.service.skill.query(query);
    if(skills.rows.length != 1){
      ctx.status = 510;
      ctx.body = '查询分类失败!';
    }else{
      article.skillId = skills.rows[0].id;
      const obj = await ctx.service.article.create(article);
      ctx.status = 201;
      ctx.body = obj;
    }
    
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    const article = ctx.request.body;
    //获取分类
    //查询skill
    const query={
      where:{
        first:article.first,
        second:article.second,
        third:article.third,
      }
    }
    let skills = await ctx.service.skill.query(query);
    if(skills.rows.length != 1){
      ctx.status = 510;
      ctx.body = '查询分类失败!';
    }else{
      article.skillId = skills.rows[0].id;

      ctx.body = await ctx.service.article.update({ id, updates: article });
      ctx.status = 201;
    }

  }

  async delete() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    await ctx.service.article.del(id);
    ctx.status = 200;
    ctx.body={
      id:id
    };
  }

    //获取所有平台信息
  async distinctPlatform(){
    const ctx = this.ctx;
    //参数检验
    let body = ctx.request.body;
    if(typeof(body)=='undefined'){
      body={};
    }
    
    //分别查询
    let sql = 'SELECT DISTINCT platform FROM article ';
    ctx.body = await this.app.model.query(sql, {type : this.app.model.QueryTypes.SELECT});
    ctx.status = 200;
  }
}



module.exports = ArticleController;
