'use strict';


module.exports = app => {

  //用户相关的方法
  app.post('/user/query', app.controller.user.query);
  app.get('/user/query', app.controller.user.query);
  app.post('/user/add', app.controller.user.add);
  app.get('/user/add', app.controller.user.add);
  app.post('/user/delete/:id', app.controller.user.delete);
  app.get('/user/delete/:id', app.controller.user.delete);
  app.post('/user/update/:id', app.controller.user.update);
  app.get('/user/update/:id', app.controller.user.update);
  //skill相关方法
  app.post('/skill/query', app.controller.skill.query);
  app.get('/skill/query', app.controller.skill.query);
  app.post('/skill/add', app.controller.skill.add);
  app.get('/skill/add', app.controller.skill.add);
  app.post('/skill/delete/:id', app.controller.skill.delete);
  app.get('/skill/delete/:id', app.controller.skill.delete);
  app.post('/skill/update/:id', app.controller.skill.update);
  app.get('/skill/update/:id', app.controller.skill.update);
  app.post('/skill/distinctValue', app.controller.skill.distinctValue);
  app.get('/skill/distinctValue', app.controller.skill.distinctValue);
  //article相关方法
  app.post('/article/query', app.controller.article.query);
  app.get('/article/query', app.controller.article.query);
  app.post('/article/add', app.controller.article.add);
  app.get('/article/add', app.controller.article.add);
  app.post('/article/delete/:id', app.controller.article.delete);
  app.get('/article/delete/:id', app.controller.article.delete);
  app.post('/article/update/:id', app.controller.article.update);
  app.get('/article/update/:id', app.controller.article.update);
  app.post('/article/distinctPlatform', app.controller.article.distinctPlatform);
  app.get('/article/distinctPlatform', app.controller.article.distinctPlatform);
  //book相关方法
  app.post('/book/query', app.controller.book.query);
  app.get('/book/query', app.controller.book.query);
  app.post('/book/add', app.controller.book.add);
  app.get('/book/add', app.controller.book.add);
  app.post('/book/delete/:id', app.controller.book.delete);
  app.get('/book/delete/:id', app.controller.book.delete);
  app.post('/book/update/:id', app.controller.book.update);
  app.get('/book/update/:id', app.controller.book.update);
  //笔记相关方法
  app.post('/note/query', app.controller.note.query);
  app.get('/note/query', app.controller.note.query);
  app.post('/note/add', app.controller.note.add);
  app.get('/note/add', app.controller.note.add);
  app.post('/note/delete/:id', app.controller.note.delete);
  app.get('/note/delete/:id', app.controller.note.delete);
  app.post('/note/update/:id', app.controller.note.update);
  app.get('/note/update/:id', app.controller.note.update);
  //任务相关方法
  app.post('/bulletin/query', app.controller.bulletin.query);
  app.get('/bulletin/query', app.controller.bulletin.query);
  app.post('/bulletin/add', app.controller.bulletin.add);
  app.get('/bulletin/add', app.controller.bulletin.add);
  app.post('/bulletin/delete/:id', app.controller.bulletin.delete);
  app.get('/bulletin/delete/:id', app.controller.bulletin.delete);
  app.post('/bulletin/update/:id', app.controller.bulletin.update);
  app.get('/bulletin/update/:id', app.controller.bulletin.update);
  

};
