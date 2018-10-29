'use strict';

const Service = require('egg').Service;

class Bulletin extends Service {
  async query(query) {
    return this.ctx.model.Bulletin.findAndCountAll(query);
  }

  async count(query) {
    return this.ctx.model.Bulletin.count(query);
  }

  async find(id) {
    const bulletin = await this.ctx.model.Bulletin.findById(id);
    if (!bulletin) {
      this.ctx.throw(404, 'bulletin not found');
    }
    return bulletin;
  }

  async create(bulletin) {
    return this.ctx.model.Bulletin.create(bulletin);
  }

  async update({ id, updates }) {
    const bulletin = await this.ctx.model.Bulletin.findById(id);
    if (!bulletin) {
      this.ctx.throw(404, 'bulletin not found');
    }
    return bulletin.update(updates);
  }

  async del(id) {
    const bulletin = await this.ctx.model.Bulletin.findById(id);
    if (!bulletin) {
      this.ctx.throw(404, 'bulletin not found');
    }
    return bulletin.destroy();
  }
}

module.exports = Bulletin;
