//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import EventEmitter from 'events';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class Collection {

  constructor() {
    this.items = [];
    this.emitter = new EventEmitter();
  }

  size() {
    return this.items.length;
  }

  at(index) {
    if (typeof this.items[index] === 'undefined') {
      return undefined;
    }
    return Object.assign({}, this.items[index]);
  }

  first() {
    return this.at(0);
  }

  last() {
    return this.at(this.size() - 1);
  }

  all() {
    return this.items.map(item => Object.assign({}, item));
  }

  on(name, listener) {
    this.emitter.on(name, listener);
  }

  add(item) {
    this.items.push(item);
    this.emitter.emit('add', Object.assign({}, item));
  }

  findBy(prop, value) {
    for (const item of this.items) {
      if (item[prop] === value) {
        return Object.assign({}, item);
      }
    }
    return undefined;
  }

  updateBy(prop, value, newItem) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item[prop] === value) {
        this.items[i] = newItem;
        this.emitter.emit('update', Object.assign({}, newItem));
      }
    }
  }

}
