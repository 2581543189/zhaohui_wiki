'use strict';

const Service = require('egg').Service;

class Book extends Service {
  async query(query) {
    return this.ctx.model.Book.findAndCountAll(query);
  }

  async count(query) {
    return this.ctx.model.Book.count(query);
  }

  async find(id) {
    const book = await this.ctx.model.Book.findById(id);
    if (!book) {
      this.ctx.throw(404, 'book not found');
    }
    return book;
  }

  async create(book) {
    return this.ctx.model.Book.create(book);
  }

  async update({ id, updates }) {
    const book = await this.ctx.model.Book.findById(id);
    if (!book) {
      this.ctx.throw(404, 'book not found');
    }
    return book.update(updates);
  }

  async del(id) {
    const book = await this.ctx.model.Book.findById(id);
    if (!book) {
      this.ctx.throw(404, 'book not found');
    }
    return book.destroy();
  }
}

module.exports = Book;
