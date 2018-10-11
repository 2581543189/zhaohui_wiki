'use strict';

module.exports = app => {
  //app.resources('users', '/users', app.controller.user);
  //app.resources('posts', '/posts', app.controller.post);
  //用户相关的方法
  app.post('/user/query', app.controller.user.query);
  app.get('/user/query', app.controller.user.query);
  app.post('/user/add', app.controller.user.add);
  app.get('/user/add', app.controller.user.add);
  app.post('/user/delete/:id', app.controller.user.delete);
  app.get('/user/delete/:id', app.controller.user.delete);
};
