'use strict';
// TODO: Vendor
//require('../vendor/overthrow/overthrow')
//require('../vendor/es6-shim')
//require('../vendor/fetch')
//require('../vendor/fastclick')
import * as utils from './utils';
import BaseClass from './base';
import Collection from './collection';
import App from './app';
import Core from './core';
import dom from './dom';
import DB from './db';
import HTTP from './http';
import Model from './model';
import Router from './router';
import SimpleRouter from './simple-router';
import Page from './page';
import Pages from './pages';
import Views from './views';
import View from './view';
import PubSub from './pubsub';
import Interface from './interface';
import Interfaces from './interfaces';
import Logger from './log';

var pxMobile = {
  version: 'es6',
  utils,
  Logger,
  BaseClass,
  App,
  Core,
  Collection,
  dom,
  DB,
  HTTP,
  Model,
  SimpleRouter,
  Router,
  Page,
  Pages,
  Views,
  View,
  PubSub,
  Interface,
  Interfaces
};
pxMobile.debug = true;
pxMobile.behaviors = {};

if (window) {
  window.px = window.px || {};
  window.px.mobile = pxMobile;
  window.pxMobile = pxMobile;
}

export default pxMobile;
