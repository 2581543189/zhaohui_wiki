'use strict';

const Service = require('egg').Service;

class Message extends Service {
  async query(query) {
    return this.ctx.model.Message.findAndCountAll(query);
  }

  async count(query) {
    return this.ctx.model.Message.count(query);
  }

  async find(id) {
    const message = await this.ctx.model.Message.findById(id);
    if (!message) {
      this.ctx.throw(404, 'message not found');
    }
    return user;
  }

  async create(message) {
    return this.ctx.model.Message.create(message);
  }

  async update({ id, updates }) {
    const message = await this.ctx.model.Message.findById(id);
    if (!message) {
      this.ctx.throw(404, 'message not found');
    }
    return message.update(updates);
  }

  async del(id) {
    const message = await this.ctx.model.Message.findById(id);
    if (!message) {
      this.ctx.throw(404, 'message not found');
    }
    return message.destroy();
  }
}

module.exports = Message;
