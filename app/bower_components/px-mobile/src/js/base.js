'use strict';
import * as utils from './utils';
import Logger from './log';
import PubSub from './pubsub';
import dom from './dom';

/**
 * BaseClass provides a Base for all custom classes.
 * @example
 * class MyClass extends BaseClass{
 *  constructor(name, options) {
 *    super(name, options);
 *  }
 * }
 */
export default class BaseClass {
  /**
   * @description The constructor method that returns an instance of this class.
   * @constructor
   * @param {String} name  - The name of the instance.
   * @param {Object} options - The options for the instance.
   * @return {BaseClass}
   */
  constructor(name, options) {
    this.utils = utils;
    this._id = name || utils.uuid();
    this.log = new Logger(name, {
      colors: {
        debug: 'color:blue'
      }
    });

    this.mixin(new PubSub(name, options));
    this.mixin(options);
    return this;
  }

  mixin(klass) {
    this.utils.addMixin(klass, this);
  }

  static extend(obj) {
    console.warn('Extend', obj, this);
    return dom.extend(this, obj);
  }

}
