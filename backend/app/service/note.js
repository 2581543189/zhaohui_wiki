'use strict';

const Service = require('egg').Service;

class Note extends Service {
  async query(query) {
    return this.ctx.model.Note.findAndCountAll(query);
  }

  async count(query) {
    return this.ctx.model.Note.count(query);
  }

  async find(id) {
    const note = await this.ctx.model.Note.findById(id);
    if (!note) {
      this.ctx.throw(404, 'note not found');
    }
    return note;
  }

  async create(note) {
    return this.ctx.model.Note.create(note);
  }

  async update({ id, updates }) {
    const note = await this.ctx.model.Note.findById(id);
    if (!note) {
      this.ctx.throw(404, 'note not found');
    }
    return note.update(updates);
  }

  async del(id) {
    const note = await this.ctx.model.Note.findById(id);
    if (!note) {
      this.ctx.throw(404, 'note not found');
    }
    return note.destroy();
  }
}

module.exports = Note;
