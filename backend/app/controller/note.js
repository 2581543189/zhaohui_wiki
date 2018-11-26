'use strict';

const Controller = require('egg').Controller;

const util = require('../utils/commonUtil');

class NoteController extends Controller {
  async query() {
    let ctx = this.ctx;
    let query = {
      'include': [{ model: this.app.model.Book}]
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
      if(sorter.indexOf("book") != -1){
        util.dealSorterRelative(query,this.app.model.Note.associations.book,sorter);
      }else{
        util.dealSorter(query,sorter);
      }
      
    }

    //处理id
    const {id} = body;
    if(typeof(id)!= 'undefined' && id != null && id != ''){
      util.dealKeyEqual(query,'id',id);
    }
    //处理书籍
    const {name} = body;
    if(typeof(name)!= 'undefined' && name!= null && name !=''){
      let book_query={}
      util.dealKeyEqual(book_query,'name',name);
      let book = await ctx.service.book.query(book_query);
      if(book.rows.length==0){
        ctx.status = 510;
        ctx.body = '未找到书籍信息《'+name+'》!';
        return;
      }else{
        util.dealKeyEqual(query,'bookId',book.rows[0].id);
      }
    }
    
    ctx.body = await ctx.service.note.query(query);
  }


  async add() {
    const ctx = this.ctx;
    const note = ctx.request.body;
    //获取书籍
    const{bookName } =  ctx.request.body;
    //查询skill
    const query={
      where:{
        name:bookName,
      }
    }
    let books = await ctx.service.book.query(query);
    if(books.rows.length != 1){
      ctx.status = 510;
      ctx.body = '查询书籍失败!';
    }else{
      let book = books.rows[0];
      note.bookId = book.id;
      const obj = await ctx.service.note.create(note);
      //如果进度大于书籍进度 修改书籍数据
      if(note.current > book.current){
        //book.current=note.current;
        const id = book.id;
        await ctx.service.book.update({ id, updates: {current:note.current} });
      }
      //如果进度等于100% 增加完成时间
      if(note.current = book.count){
        const id = book.id;
        await ctx.service.book.update({ id, updates: {endDate:note.date} });
      }
      ctx.status = 201;
      ctx.body = obj;
    }

  }

  async update() {
    const ctx = this.ctx;
    const id = util.parseInt(ctx.params.id);
    const note = ctx.request.body;
    ctx.body = await ctx.service.note.update({ id, updates: note });
    ctx.status = 201;
  }

  async delete() {
    const ctx = this.ctx;
    const id = util.parseInt(ctx.params.id);
    await ctx.service.note.del(id);
    ctx.status = 200;
    ctx.body={
      id:id
    };
  }

}



module.exports = NoteController;
