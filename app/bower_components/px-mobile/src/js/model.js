'use strict';

import BaseClass from './base';
import HTTP from './HTTP';
import * as utils from './utils';
import Logger from './log';

/**
 * Model class provides event dispatching.
 * @example
 * var model = new Model();
 * @param {String} id - The id of the model.
 * @param {Object} options - Options for the model
 */
export default class Model extends BaseClass {

  constructor(id, options) {
    id = id || utils.uuid();
    options = options || {};

    super(id, options);

    this.uuid = utils.uuid();
    this.id = id;
    this.baseUrl = options.baseUrl || '/default';
    this.defaults = options.defaults || {};
    this.idField = options.idField || '_id';
    this.data = options.data || {};
    this.data[this.idField] = id;
    // TODO: Adpater can be http or db
    this.adapter = options.adapter || HTTP;
    this.adapter = new this.adapter(id, options);



    this.log = new Logger(id, {
      colors: {
        debug: 'color:blue'
      }
    });
    this.log.logApi('constructor', options);
  }

  url() {
    var url = `/${encodeURIComponent(this.get(this.idField))}`;
    var rev = this.get('_rev');
    if (rev) {
      url += '?rev=' + _rev;
    }
    return url;
  }

  has(attribute) {
    this.log.logApi('has', attribute);
    return this.data.hasOwnProperty(attribute);
  }

  get(attribute) {
    this.log.logApi('has', attribute);
    return this.data[attribute];
  }

  set(attributes, force = true) {
    for (var key in attributes) {
      if (force) {
        this.data[key] = attributes[key];
      }
      if (this.has(key)) {
        this.data[key] = attributes[key];
      }
    }
    return this;
  }

  toJSON() {
    console.warn('toJSON', this.data);
    return JSON.stringify(this.data);
  }

  clone() {
    return new this.constructor(this.options);
  }

  parse(resp) {
    console.warn('parse', resp);
    if (resp.ok && resp.data._id) {
      this.utils.extend(this.data, resp.data);
    }
    return resp;
  }

  fetch(options) {
    console.warn('fetch', options);
    return this.adapter.get(this.url()).then(this.parse);
  }

  save(options) {
    console.warn('save', options);
    return this.adapter.put(`${this.url()}`, this.data).then(this.parse);
  }

  destroy(options) {
    console.warn('destroy', this.data._rev);
    return this.adapter.delete(`${this.url()}`).then(this.parse);
  }

  sync(options) {
    console.warn('sync', options);
  }

  static extend(obj) {
    return super.extend(this, obj);
  }
}
