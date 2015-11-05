'use strict';
import PubSub from './pubsub';
import BaseClass from './base';

/**
 * @description Pages class has methods for managing a collection of pages.
 */
export default class Pages extends BaseClass {
  constructor(name, options) {
    super(name, options);
    return this;
  }
}
