'use strict';

const Service = require('egg').Service;

class User extends Service {
  async query(query) {
    return this.ctx.model.Skill.findAndCountAll(query);
  }

  async count(query) {
    return this.ctx.model.Skill.count(query);
  }

  async find(id) {
    const user = await this.ctx.model.Skill.findById(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user;
  }

  async create(user) {
    return this.ctx.model.Skill.create(user);
  }

  async update({ id, updates }) {
    const user = await this.ctx.model.Skill.findById(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.update(updates);
  }

  async del(id) {
    const user = await this.ctx.model.Skill.findById(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.destroy();
  }
}

module.exports = User;
