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

  
};
