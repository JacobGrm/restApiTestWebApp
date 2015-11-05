(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*globals Request, Promise*/
'use strict';
exports.__esModule = true;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _interfaces = require('./interfaces');

var _interfaces2 = _interopRequireDefault(_interfaces);

/**
 * HTTP class provides an abstraction layer for HTTP calls.
 * @example
 * var $http = new px.mobile.HTTP('http1', {
 *  baseUrl: window.location.origin
 * });
 */

var HTTP = (function (_BaseClass) {
  _inherits(HTTP, _BaseClass);

  /**
   * Create a new instance of a HTTP service.
   * @constructor
   * @param {String} name - The name of the service
   * @param {Object} options - The default options to pass
   * @return {HTTP} An instance of the HTTP class
   */

  function HTTP() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? 'http' : arguments[0];
    var options = arguments.length <= 1 || arguments[1] === undefined ? {
      baseUrl: '/default'
    } : arguments[1];

    _classCallCheck(this, HTTP);

    _BaseClass.call(this, name, options);

    console.warn('HTTP', this, options);

    if (!options.baseUrl) {
      throw new Error('HTTP: Must provide a baseUrl');
    }

    return this;
  }

  /**
   *  I handle checking the response status code of a HTTP request.
   * @param {Response} response A Response object
   * @return {Response} The original response
   */

  HTTP.prototype.checkStatus = function checkStatus(response) {
    console.warn(response.status, response.statusText, response.url, response);
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      return response;
    }
  };

  /**
   * I handle parsing the JSON of a response.
   * @param {Response} response A Response object
   * @return {Response} The original response with a data property that is the parsed JSON
   */

  HTTP.prototype.parseJSON = function parseJSON(response) {
    if (!response) {
      throw new Error('Must pass a response object to parseJSON!');
    }
    return response.json().then(function (json) {
      response.data = json;
      return response;
    });
  };

  /**
   *  I make a HTTP request for JSON.
   * @example
   * $http.getJSON('/default/_all_docs', {limit: 5}).then(function(resp){
   *    //handle json
   * }).catch(function(err){
   *    //handle error
   * });
   * @param {String} url - The url
   * @param {Object} options - Request options object
   * @return {Promise} A promise that resolves a response
   */

  HTTP.prototype.getJSON = function getJSON() {
    var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var req = new Request(url, options || {
      method: 'GET'
    });
    return fetch(req).then(this.checkStatus).then(this.parseJSON);
  };

  /**
   * The response object has these properties:
   * @example
   * $http.request('/default', {
   *    method: 'POST',
   *    data: data
   * }).then(function(resp){
   *    //handle response
   * }).catch(function(err){
   *    //handle error
   * });
   * @param {String} url - The url
   * @param {Object} options - Options to pass
   * @return {Promise} A promise that resolves a response
   */

  HTTP.prototype.request = function request(url, options) {
    var _this = this;

    var config = this.utils.extend({
      data: null,
      params: null,
      body: null,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }, options);

    if (options.data) {
      config.body = JSON.stringify(options.data);
      delete config.data;
    }

    url = this.utils.resolveURL(this.baseUrl, url);
    //url = this.utils.resolveURL(url);

    if (options.params) {
      url = this.utils.resolveURL(url, options.params);
      delete options.params;
    }

    //this.log.logApi(`request => ${url}`, config);
    this.log.logHttp(config.method, url);

    var benchmark = this.log.logTime('request');
    return new Promise(function (resolve, reject) {
      return fetch(new Request(url, config)).then(function (resp) {
        _this.log.logHttp(resp.status + ' ' + benchmark.end(), resp, true);
        //return this.parseJSON(resp).then(resolve, reject);
        resp.data = {};
        resolve(resp);
      }, reject);
    });
  };

  /**
   * I make a HTTP GET request.
   * @example
   * $http.get('/default/_all_docs', {limit: 5}).then(function(resp){
   *    //handle resp:Response
   * }).catch(function(err){
   *    //handle error
   * });
   * @param {String} url The url
   * @param {Object} options Options to pass
   * @return {Promise} A promise that resolves a response
   */

  HTTP.prototype.get = function get() {
    var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    this.log.logApi('get', options);
    return this.request(url, options).then(this.parseJSON);
  };

  /**
   * I make a HTTP PUT request.
   * @example
  $http.put('/default/id', {name: 'value'}).then(function(resp){
    //handle resp:Response
  }).catch(function(err){
    //handle error
  });
    * @param {String} url The url
   * @param {Object} options Options to pass
   * @return {Promise} A promise that resolves a response
   */

  HTTP.prototype.put = function put() {
    var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    this.log.logApi('put', data);
    return this.request(url, this.utils.extend({
      method: 'PUT',
      data: data
    }, options));
  };

  /**
   * I make a HTTP POST request.
   * @example
  $http.post('/default', {name: 'value'}).then(function(resp){
   //handle resp:Response
  }).catch(function(err){
   //handle error
  });
    * @param {String} url The url
   * @param {Object} options Options to pass
   * @return {Promise} A promise that resolves a response
   */

  HTTP.prototype.post = function post() {
    var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return this.request(url, this.utils.extend({
      method: 'POST',
      data: data
    }, options));
  };

  /**
   * I make a HTTP DELETE request.
   * @example
  $http.delete('/default/id').then(function(resp){
   //handle resp:Response
  }).catch(function(err){
   //handle error
  });
    * @param {String} url The url
   * @param {Object} options Options to pass
   * @return {Promise} A promise that resolves a response
   */

  HTTP.prototype['delete'] = function _delete() {
    var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    return this.request(url, this.utils.extend({
      method: 'DELETE'
    }, options));
  };

  /**
   * I make a HTTP HEAD request.
   * @example
  $http.head('/default/id').then(function(resp){
    //handle resp:Response
  }).catch(function(err){
    //handle error
  });
    * @param {String} url The url
   * @param {Object} options Options to pass
   * @return {Promise} A promise that resolves a response
   */

  HTTP.prototype.head = function head() {
    var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    return this.request(url, this.utils.extend({
      method: 'HEAD'
    }, options));
  };

  return HTTP;
})(_base2['default']);

exports['default'] = HTTP;
module.exports = exports['default'];

},{"./base":3,"./interfaces":10,"./log":11}],2:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

//import Router from './router';

var _serviceLocator = require('./service-locator');

var _serviceLocator2 = _interopRequireDefault(_serviceLocator);

var _instance = null;
/**
 * The App class is used to manage the state of an application.
 * @example
 *	var app = new px.mobile.App('myApp', {
 *	debug: true,
 *	viewContainer: document.getElementById('appViews'),
 *	navbar: document.getElementById('navbar'),
 *	el: '#emApp',
 *	session: {
 *		user: null
 *	}
 * });
 * var pubsub = new px.mobile.PubSub('emPubSub');
 * var db = new px.mobile.DB('emDB', {
 *    baseUrl: 'http://pmapi/cdb/predixgo'
 * });
 * var http = new px.mobile.HTTP('emHTTP', {
 *   baseUrl: '/'
 * });
 * app.services.register('db', db);
 * app.services.register('http', http);
 * app.services.register('pubsub', pubsub);
 */

var App = (function (_Core) {
  _inherits(App, _Core);

  /**
   * Return the ServiceLocator _instance.
   * @return the _instance.
   */

  App.getInstance = function getInstance() {
    if (_instance === null) {
      _instance = new App();
    }
    return _instance;
  };

  function App(name, options) {
    _classCallCheck(this, App);

    _Core.call(this, name, options);
    this.modules = {};
    this.session = {};
    //  this.router = new Router();
    this.services = new _serviceLocator2['default']();

    // Default Parameters
    this.params = {

      cache: true,
      cacheIgnore: [],
      cacheIgnoreGetParameters: false,
      cacheDuration: 1000 * 60 * 10, // Ten minutes
      preloadPreviousPage: true,
      uniqueHistory: false,
      uniqueHistoryIgnoreGetParameters: false,
      dynamicPageUrl: 'content-{{index}}',
      allowDuplicateUrls: false,
      router: true,

      // Push State
      pushState: false,
      pushStateRoot: undefined,
      pushStateNoAnimation: false,
      pushStateSeparator: '#!/',
      pushStatePreventOnLoad: true,

      // Fast clicks
      fastClicks: true,
      fastClicksDistanceThreshold: 10,
      fastClicksDelayBetweenClicks: 50,

      // Tap Hold
      tapHold: false,
      tapHoldDelay: 750,
      tapHoldPreventClicks: true,

      // Active State
      activeState: true,
      activeStateElements: 'a, button, label, span',

      // Animate Nav Back Icon
      animateNavBackIcon: false,

      // Swipe Back
      swipeBackPage: true,
      swipeBackPageThreshold: 0,
      swipeBackPageActiveArea: 30,
      swipeBackPageAnimateShadow: true,
      swipeBackPageAnimateOpacity: true,

      // Ajax
      ajaxLinks: undefined, // or CSS selector

      // External Links
      externalLinks: '.external', // CSS selector

      // Sortable
      sortable: true,

      // Scroll toolbars
      hideNavbarOnPageScroll: false,
      hideToolbarOnPageScroll: false,
      hideTabbarOnPageScroll: false,
      showBarsOnPageScrollEnd: true,
      showBarsOnPageScrollTop: true,

      // Tap Navbar or Statusbar to scroll to top
      scrollTopOnNavbarClick: false,
      scrollTopOnStatusbarClick: false,

      // Modals
      modalButtonOk: 'OK',
      modalButtonCancel: 'Cancel',
      modalUsernamePlaceholder: 'Username',
      modalPasswordPlaceholder: 'Password',
      modalTitle: 'App',
      modalCloseByOutside: false,
      actionsCloseByOutside: true,
      popupCloseByOutside: true,
      modalPreloaderTitle: 'Loading... ',
      modalStack: true,

      // Lazy Load
      imagesLazyLoadThreshold: 0,
      imagesLazyLoadSequential: true,

      // Name space
      viewClass: 'view',
      viewMainClass: 'view-main',
      viewsClass: 'views',

      // Notifications defaults
      notificationCloseOnClick: false,
      notificationCloseIcon: true,
      notificationCloseButtonText: 'Close',

      // Animate Pages
      animatePages: true,

      // Templates
      templates: {},
      templateData: {},
      templatePages: false,
      precompileTemplates: false,

      // Auto init
      init: true
    };

    // Extend defaults with parameters
    for (var param in options) {
      this.params[param] = options[param];
    }

    console.warn('App.constructor', this);
  }

  /**
   * Handle starting all registered services.
   */

  App.prototype.start = function start() {
    this.log.logApi('start', this);
    return Promise.all(this.services.startAll());
  };

  /**
   * Handle bootstrapping application.
   * @param {Function} cb - The callback function to execute when done.
   */

  App.prototype.bootstrap = function bootstrap(cb) {
    this.log.logApi('bootstrap', this);
    cb(this);
  };

  /**
   * Handle running the application.
   * @param {Function} cb - The callback function to execute when done.
   */

  App.prototype.run = function run(cb) {
    this.log.logApi('run', this);
    this.start();
    cb(this);
  };

  return App;
})(_core2['default']);

exports['default'] = App;
module.exports = exports['default'];

},{"./core":5,"./service-locator":18}],3:[function(require,module,exports){
'use strict';
exports.__esModule = true;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj['default'] = obj;return newObj;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _pubsub = require('./pubsub');

var _pubsub2 = _interopRequireDefault(_pubsub);

var _dom = require('./dom');

var _dom2 = _interopRequireDefault(_dom);

/**
 * BaseClass provides a Base for all custom classes.
 * @example
 * class MyClass extends BaseClass{
 *  constructor(name, options) {
 *    super(name, options);
 *  }
 * }
 */

var BaseClass = (function () {
  /**
   * @description The constructor method that returns an instance of this class.
   * @constructor
   * @param {String} name  - The name of the instance.
   * @param {Object} options - The options for the instance.
   * @return {BaseClass}
   */

  function BaseClass(name, options) {
    _classCallCheck(this, BaseClass);

    this.utils = utils;
    this._id = name || utils.uuid();
    this.log = new _log2['default'](name, {
      colors: {
        debug: 'color:blue'
      }
    });

    this.mixin(new _pubsub2['default'](name, options));
    this.mixin(options);
    return this;
  }

  BaseClass.prototype.mixin = function mixin(klass) {
    this.utils.addMixin(klass, this);
  };

  BaseClass.extend = function extend(obj) {
    console.warn('Extend', obj, this);
    return _dom2['default'].extend(this, obj);
  };

  return BaseClass;
})();

exports['default'] = BaseClass;
module.exports = exports['default'];

},{"./dom":7,"./log":11,"./pubsub":16,"./utils":20}],4:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj['default'] = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _http = require('./http');

var _http2 = _interopRequireDefault(_http);

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

var defaults = {
  baseUrl: '/default',
  idField: '_id',
  model: {},
  models: [],
  params: {
    limit: 25,
    startkey: null,
    endkey: null
  }
};

var Collection = (function (_BaseClass) {
  _inherits(Collection, _BaseClass);

  Collection.extend = function extend(obj) {
    console.warn('Extend', obj, this);
    return utils.addMixin(obj, this);
  };

  function Collection(name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? defaults : arguments[1];

    _classCallCheck(this, Collection);

    _BaseClass.call(this, name, options);

    // TODO: Setup defaults
    this.model = options.model;
    this.models = options.models;
    this.baseUrl = options.baseUrl;

    this.idField = options.idField || '_id';
    this.params = options.params || {
      startkey: '',
      endkey: '',
      limit: 25
    };
    this.lastResponse = null;

    // TODO: Adpater can be http or db
    this.adapter = options.adapter || _http2['default'];
    this.adapter = new this.adapter(name, options);

    return this;
  }

  //Handle parsing the response from a fetch

  Collection.prototype.parse = function parse(resp) {
    return resp;
  };

  //Add a model to the list of items.

  Collection.prototype.add = function add(models) {
    return this.models.push(models);
  };

  //Handle sending another request.

  Collection.prototype.fetch = function fetch(params) {
    var self = this;
    return self.adapter.get(params).then(function (resp) {
      self.lastResponse = resp;
      self.models = resp.data.rows;
      return resp;
    });
  };

  // TODO: remove(model) - Remove a model from the list of items.

  Collection.prototype.remove = function remove(model) {
    console.warn('Find model by', model);
    if (this.utils.type(model) === 'string') {
      console.warn('Find by _id', model);
    }
    if (this.utils.type(model) === 'number') {
      console.warn('Find by index', model);
    }
    if (this.utils.type(model) === 'object') {
      console.warn('Find by model', model);
    }
  };

  // TODO: where(filter) - Filter models based on filter passed.

  Collection.prototype.where = function where(filter) {
    return this.models.filter(filter);
  };

  // TODO: findWhere(filter) - Filter and return first model by filter.

  Collection.prototype.find = function find(filter) {
    return this.models.filter(filter);
  };

  // TODO: Return a model by id

  Collection.prototype.get = function get(id) {};

  Collection.prototype.toJSON = function toJSON() {
    return JSON.stringify(this.models);
  };

  return Collection;
})(_base2['default']);

exports['default'] = Collection;
module.exports = exports['default'];

},{"./base":3,"./http":8,"./model":13,"./utils":20}],5:[function(require,module,exports){
'use strict';
exports.__esModule = true;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

/**
 * The Core class.
 * @example
 Core.register('tweet', function(sandbox) {
   return {
     init: function() {
       console.log('starting tweet module');
     }
   }
 });
 Core.start('tweet');
 * @class Core
 */
var extensions = {};

var Core = (function (_BaseClass) {
  _inherits(Core, _BaseClass);

  /**
   * The constructor of Core
   *
   * @class Core
   * @constructor
   */

  function Core(name, options) {
    _classCallCheck(this, Core);

    _BaseClass.call(this, name, options);
    this.modules = {};
    return this;
  }

  /**
   * helpers/err.js - Handles error messages
   *
   * @method err
   * @param {string} error the type of the error
   * @param {function} message the complementary message to the error
   */

  /**
   * Registers a new module
   *
   * @method register
   * @param {string} module the name of the new module
   * @param {function} constructor the constructor of the new module
   */

  Core.prototype.register = function register(module, constructor) {
    if (this.modules[module]) {
      this.helpers.err('!!module', module);
      return false;
    }
    this.modules[module] = {
      constructor: constructor,
      instance: null
    };
  };

  /**
   * Check if the module is already initialized or not
   *
   * @method moduleCheck
   * @param {string} module the name of the module that will be checked
   * @param {boolean} destroy check if the module exists, but is already destroyed
   * @return {boolean} if the module exists or already have an instance
   */

  Core.prototype.moduleCheck = function moduleCheck(module, destroy) {
    if (destroy) {
      return !module || !module.instance;
    }

    return !module || module.instance;
  };

  /**
   * Starts a registered module, if no module is passed, it starts all modules
   *
   * @method start
   * @param {string} module the name of the module
   */

  Core.prototype.start = function start(module) {
    if (!module) {
      return this.startAll();
    }

    var cModule = this.modules[module],
        el = this.getElement(module);

    if (this.moduleCheck(cModule)) {
      this.helpers.err('!start', module);
      return false;
    }

    cModule.instance = new cModule.constructor(new this.Sandbox(module));

    // attachs the element to the instance of the module
    cModule.instance.el = el;

    if (cModule.instance.init) {
      return cModule.instance.init();
    }
  };

  /**
   * Stops a registered module
   *
   * @method start
   * @param {string} module the name of the module
   */

  Core.prototype.stop = function stop(module) {
    if (!module) {
      return this.stopAll();
    }

    var cModule = this.modules[module],
        stopReturn;

    if (this.moduleCheck(cModule, true)) {
      this.helpers.err('!stop', module);
      return false;
    }

    if (cModule.instance.destroy) {
      stopReturn = cModule.instance.destroy();
    }

    cModule.instance = null;

    this.Sandbox.clearNotifications(module);

    return stopReturn;
  };

  /**
   * Stop all started modules
   *
   * @method stopAll
   */

  Core.prototype.stopAll = function stopAll() {
    this.xAll('stop');
  };

  /**
   * Stop all started modules
   *
   * @method stopAll
   */

  Core.prototype.startAll = function startAll() {
    this.xAll('start');
  };

  /**
   * Helper for startAll and stopAll
   *
   * @method xAll
   * @param {string} method the method that will be triggered
   */

  Core.prototype.xAll = function xAll(method) {
    for (var module in this.modules) {
      if (this.modules.hasOwnProperty(module)) {
        this[method](module);
      }
    }
  };

  /**
   * Gets an element by ID to attach to the module instance
   *
   * @method getElement
   * @param {string} id the id of the main element in the module
   */

  Core.prototype.getElement = function getElement(id) {
    var el = document.getElementById(id);

    // this fixes some blackberry, opera and IE possible bugs
    return el && el.id === id && el.parentElement ? el : null;
  };

  /**
   * Extends core functionalities
   *
   * @method extend
   * @param {string} name the name of the extension
   * @param {function | array | boolean | string | number} implementation what the extension does
   */

  Core.extend = function extend(name, implementation) {
    extensions[name] = implementation;
  };

  /**
   * returns the extension
   *
   * @method getExtension
   * @param {string} extension the name of the extension
   * @return {function | array | boolean | string | number} the implementation of the extension
   */

  Core.getExtension = function getExtension(extension) {
    return extensions[extension] || null;
  };

  return Core;
})(_base2['default']);

exports['default'] = Core;
var err = function err(error, message) {
  Core.helpers.log(err.messages[error] + ' - ' + message);
};

err.messages = {
  '!start': 'Could not start the given module, it\'s either already started or is not registered: ',
  '!stop': 'Could not stop the given module, it\'s either already stopped or is not registered: ',
  '!!module': 'Can\'t register an already registered module: ',
  '!!listen': 'There\'s already an listen handler to the notification: '
};

Core.helpers = Core.helpers || {};
Core.helpers.err = err;

/**
 * helpers/log.js - Adds console.log to Core helpers
 * @method log
 */
Core.helpers = Core.helpers || {};
Core.helpers.log = window.console ? window.console.log.bind(window.console) : function () {};
module.exports = exports['default'];

},{"./base":3}],6:[function(require,module,exports){
'use strict';
exports.__esModule = true;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _http = require('./http');

var _http2 = _interopRequireDefault(_http);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

/**
 * @description The DB class was created to help web developers build applications that work as well offline as they do online.
 * @example
 * var db = new px.mobile.DB('db1', {
 *    baseUrl: 'http://localhost:5984/default'
 * });
 * db.get('sync-user1').then(function(resp){
 *    console.log(json);
 * });
 * @extends {BaseClass}
 * @implements {MyInterface2}
 */

var DB = (function (_BaseClass) {
  _inherits(DB, _BaseClass);

  /**
   * @description The constructor method that returns an instance of this DB class.
   * @constructor
   * @param {String} name  - The name of the instance
   * @param {Object} options - The options object
   * @return {DB} Instance of the DB class.
   */

  function DB() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? 'db' : arguments[0];
    var options = arguments.length <= 1 || arguments[1] === undefined ? {
      baseUrl: '/default'
    } : arguments[1];

    _classCallCheck(this, DB);

    _BaseClass.call(this, name, options);

    if (!options.baseUrl) {
      //throw new Error('DB: Must provide a baseUrl');
      console.warn('[DB] - Using default baseUrl - /default');
    }

    /**
     * @type {Class} adapter - The adapter to use for all requests.
     */
    this.adapter = options.adapter || _http2['default'];
    this.adapter = new this.adapter(name, options);

    return this;
  }

  /**
   * @description I fetch general information of the database.
   * @example
   * db.info().then(function(resp){
   *    assert.equal(resp.status, 200);
   *    assert.ok(resp.data);
   *    assert.ok(resp.data.db_name);
   *    assert.ok(resp.data.update_seq);
   * }).catch(function (err) {
   *    console.log(err);
   * });
   * @return {Promise <Response, Error>} A promise that is resolved/rejected upon success/failure.
   */

  DB.prototype.info = function info() {
    return this.adapter.get('');
  };

  /**
   * @description Fetch multiple documents, indexed and sorted by the _id. Deleted documents are only included if options.keys is specified.
   * @param {Object} options - The options object
   * @param {Boolean} options.include_docs - Include the document itself in each row in the doc field. Otherwise by default you only get the _id and _rev properties.
   * @param {Boolean} options.conflicts - Include conflict information in the _conflicts field of a doc.
   * @param {Boolean} options.attachments - Include attachment data as base64-encoded string.
   * @param {String} options.startkey - Get documents with IDs in range.
   * @param {String} options.endkey - Get documents with IDs in a certain range (inclusive/inclusive).
   * @param {Boolean} options.inclusive_end - Include documents having an ID equal to the given options.endkey. Default: true.
   * @param {Number} options.limit - Maximum number of documents to return.
   * @param {Number} options.skip - Number of docs to skip before returning (warning: poor performance on IndexedDB/LevelDB!).
   * @param {Boolean} options.descending - Reverse the order of the output documents.
   * @param {String} options.key - Only return documents with IDs matching this string key.
   * @param {Array} options.keys - Array of string keys to fetch in a single shot.
   * @example
   * db.allDocs({
   *    limit: 5,
   *    include_docs: true
   * }).then(function(resp) {
   *    expect(resp.status).toBe(200);
   *    expect(resp.data.rows).toBeDefined();
   *    expect(resp.data.rows.length).toBe(5);
   * }).catch(function (err) {
   *    console.log(err);
   * });
   * @return {Promise <Response, Error>} A promise that is resolved/rejected upon success/failure.
   */

  DB.prototype.allDocs = function allDocs(options) {
    this.log.logApi('allDocs', options);
    return this.adapter.get('/_all_docs', {
      params: options
    });
  };

  /**
   * @description Retrieves a document, specified by docId.
   * @example
   * db.get(testObj._id).then(function (resp) {
   *    expect(resp.status).toBe(200);
   *    expect(resp.data._rev).toBeDefined();
   * }).catch(function(err){
   *    console.warn(err);
   * });
   * @param {String} docId - The id of the document
   * @param {Object} options - The options object
   * @return {Promise <Response, Error>} A promise that is resolved/rejected upon success/failure.
   */

  DB.prototype.get = function get(docId, options) {
    this.log.logApi('get', docId);
    if (!docId) {
      throw new Error('db.get(docId) - Must provide a document _id!');
    }
    return this.adapter.get('/' + docId, options);
  };

  /**
   * @description Put a document
   * @example
   * var doc = {
   *    _id: 'test-doc1',
   *    name: 'New Doc'
   * };
   * db.put(doc).then(function(resp){
   *    console.log(resp);
   * }).catch(function(err){
   *    console.warn(err);
   * });
   * @param {Object} doc - The document object, must have _id  for creation, and _rev for updating
   * @param {Object} options - The options to send with the request
   * @return {Promise <Response, Error>} A promise that is resolved/rejected upon success/failure.
   */

  DB.prototype.put = function put(doc, options) {
    this.log.logApi('put', doc);
    if (!doc) {
      throw new Error('db.put(doc) - Must provide a document object!');
    }
    if (!doc._id) {
      throw new Error('db.put(doc) - Must provide a _id on the document object!');
    }
    if (doc._rev) {
      options = options || {
        params: {
          rev: doc._rev
        }
      };
    }
    return this.adapter.put('/' + doc._id, doc, options).then(this.adapter.parseJSON);
  };

  /**
   * @description I handle creating a new document with a generated _id
   * @example
   * @param {Object} doc - A document object
   * @return {Promise <Response, Error>} A promise that is resolved/rejected upon success/failure.
   */

  DB.prototype.post = function post(doc) {
    if (!doc) {
      throw new Error('db.put(doc) - Must provide a document object!');
    }
    doc._id = this.utils.uuid();
    return this.put(doc);
  };

  /**
   * @description I handle removing a document from the data store.
   * @example
   * db.get(testObj._id).then(function (resp) {
   *    testObj._rev = resp.data._rev;
   *    db.remove(testObj._id, testObj._rev).then(function (res) {
   *      expect(res.status).toBe(200);
   *    });
   * });
   * @description
   * @param {String} id - The documents _id
   * @param {String} rev - The documents _rev
   * @return {Promise <Response, Error>} A promise that is resolved/rejected upon success/failure.
   */

  DB.prototype.remove = function remove(id, rev) {
    this.log.logApi('remove', {
      id: id,
      rev: rev
    });
    if (!id) {
      throw new Error('db.remove(id, rev) - Must provide a id!');
    }
    if (!rev) {
      throw new Error('db.remove(id, rev) - Must provide a rev!');
    }
    return this.adapter['delete']('/' + id, {
      params: {
        rev: rev
      }
    }).then(this.adapter.parseJSON);
  };

  /**
   * @description Get an attachment from the data store.
   * @example
   * var testAttachmentDoc = 'test-doc-attachment-' + Date.now();
   * db.getAttachment(testAttachmentDoc, 'file.html').then(function (resp) {
   *    expect(resp.ok).toBe(true);
   * });
   * @param {String} id - The documents _id
   * @param {String} attachmentId - The documents attachment name
   * @param {String} contentType - The documents attachment Content Type
   * @return {Promise <Response, Error>} A promise that is resolved/rejected upon success/failure.
   */

  DB.prototype.getAttachment = function getAttachment(id, attachmentId, contentType) {
    this.log.logApi('getAttachment', {
      id: id,
      attachment: attachmentId
    });
    if (!id) {
      throw new Error('db.getAttachment(id, attachmentId) - Must provide a document _id!');
    }
    if (!attachmentId) {
      throw new Error('db.getAttachment(id, attachmentId) - Must provide a document attachment!');
    }
    return this.adapter.request(id + '/' + attachmentId, {
      method: 'GET',
      headers: {
        'Content-Type': contentType || 'application/octet-stream'
      }
    });
  };

  /**
   * @description Save an attachment to the data store.
   * @example
   * var aFileParts = ['<a id="a"><b id="b">hey!</b></a>'];
   * var myBlob = new Blob(aFileParts, {
   *    type: 'text/html'
   * });
   * db.get(testAttachmentDoc).then(function (resp) {
   *    expect(resp.ok).toBe(true);
   *    db.saveAttachment(resp.data._id, resp.data._rev, 'file.html', myBlob.type, myBlob).then(function (resp) {
   *      expect(resp.ok).toBe(true);
   *    });
   * });
   * @param {String} id - The documents _id
   * @param {String} rev - The documents _rev
   * @param {String} filename - The documents attachment name
   * @param {String} type - The attachment type
   * @param {Blob} file - The actual attachment Blob
   * @return {Promise <Response, Error>} A promise that is resolved/rejected upon success/failure.
   */

  DB.prototype.saveAttachment = function saveAttachment(id, rev, filename, type, file) {
    this.log.logApi('saveAttachment', file);
    return this.adapter.request(id + '/' + filename, {
      method: 'PUT',
      headers: {
        'Content-Type': type || 'application/octet-stream'
      },
      params: {
        rev: rev
      },
      body: file
    });
  };

  /**
   * @description Bulk insert or remove documents from the data store.
   * Create, update or delete multiple documents. The docs argument is an array of documents.
   * If you omit an _id parameter on a given document, the database will create a new document and assign the ID for you.
   * To update a document, you must include both an _id parameter and a _rev parameter, which should match the ID and revision of the document on which to base your updates.
   * To delete a document, include a _deleted parameter with the value true.
   * @example
   * var docs = [{
   *   _id: 'test-doc-1-' + Date.now(),
   *   name: 'Test Doc 1'
   * },
   * {
   *   _id: 'test-doc-2-' + Date.now(),
   *   name: 'Test Doc 2'
   * }];
   * db.bulkDocs(docs).then(function(resp) {
   *   expect(resp.status).toBe(201);
   *   expect(resp.data.length).toBe(2);
   * });
   * @param {Array} docs - An array of document objects
   * @return {Promise <Response, Error>} A promise that is resolved/rejected upon success/failure.
   */

  DB.prototype.bulkDocs = function bulkDocs(docs) {
    if (!docs) {
      throw new Error('bulkDocs - Must provide an array of documents!');
    }
    this.log.logApi('bulkDocs', docs);
    return this.adapter.post('/_bulk_docs', {
      docs: docs
    }).then(this.adapter.parseJSON);
  };

  /**
   * @description A list of changes made to documents in the database, in the order they were made. It returns an object with the method cancel(), which you call if you don’t want to listen to new changes anymore.
   * It is an event emitter and will emit a 'change' event on each document change, a 'complete' event when all the changes have been processed, and an 'error' event when an error occurs.
   * In addition to the 'change' event, any change will also emit a 'create', 'update', or 'delete' event.
   * @example
   * var db = new px.mobile.DB('testdb', {baseUrl: 'adapter://localhost:5984/default'});
   * var changes = db.changes({
   *    since: 'now',
   *    live: true,
   *    include_docs: true
   * })
   * .on('change', function(change) {
   *    console.warn('Change', change);
   * })
   * .on('complete', function(info) {
   *    console.warn('Changes completed', info);
   * })
   * .on('error', function (err) {
   *    console.log(err);
   * });
   * changes.cancel(); // whenever you want to cancel
   * @param {Object} options - The options to send with the changes request. All options default to false unless otherwise specified.
   * @param {Boolean} options.live - Will emit change events for all future changes until cancelled.
   * @param {Boolean} options.include_docs - Include the associated document with each change.
   * @param {Boolean} options.conflicts - Include conflicts.
   * @param {Boolean} options.attachments -Include attachments.
   * @param {Boolean} options.binary - Return attachment data as Blobs/Buffers, instead of as base64-encoded strings.
   * @param {Boolean} options.descending - Reverse the order of the output documents.
   * @param {Number} options.since - Start the results from the change immediately after the given sequence number. You can also pass 'now' if you want only new changes (when live is true).
   * @param {Number} options.limit - Limit the number of results to this number.
   * @param {Number} options.timeout - Request timeout (in milliseconds).
   * @return {Object} An object with cancel() on(event) methods.
   */

  DB.prototype.changes = function changes(options) {
    var self = this;
    var defaults = {
      live: false,
      include_docs: false,
      conflicts: false,
      attachments: false,
      binary: false,
      descending: false,
      since: 0,
      limit: null,
      heartbeat: 1000
    };

    options = this.utils.extend(defaults, options);

    self.log.logApi('changes', options);

    //changes request
    var _fetchChanges = function _fetchChanges() {
      self.log.logApi('_fetchChanges', options);

      return self.adapter.get('/_changes', {
        params: options
      }).then(self.adapter.parseJSON).then(function (resp) {
        options.since = resp.data.last_seq;

        if (_callbacks.change) {
          if (resp.data.results) {
            resp.data.results.forEach(function (change) {
              _callbacks.change(change);
              self.log.logApi('change', change);
            });
          }
        }

        if (resp.data.results.length === 0) {
          if (_callbacks.complete) {
            _callbacks.complete(resp);
          }
          self.log.logApi('complete', resp);
        }

        return resp;
      })['catch'](function (err) {
        if (_callbacks.error) {
          _callbacks.error(err);
        }
        return err;
      });
    };

    var _callbacks = {};

    //changes feed
    var _feed = setInterval(function () {
      self.log.logApi('_feed', options);
      _fetchChanges();
    }, options.heartbeat);

    return {
      on: function on(e, cb) {
        _callbacks[e] = cb;
        self.log.logApi('on', options);
        return this;
      },
      cancel: function cancel() {
        self.log.logApi('cancel', options);
        clearInterval(_feed);
        return this;
      }
    };
  };

  return DB;
})(_base2['default']);

exports['default'] = DB;
module.exports = exports['default'];

},{"./base":3,"./http":8,"./log":11}],7:[function(require,module,exports){
/**
 * dom class provides various utility methods on a document element.
 * @example
 * var $ = selector => new DOM(selector);
 */
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var DOM = (function () {
  function DOM(selector, context) {
    _classCallCheck(this, DOM);

    console.time('dom');
    var matches = {
      '#': 'getElementById',
      '.': 'getElementsByClassName',
      '@': 'getElementsByName',
      '=': 'getElementsByTagName',
      '*': 'querySelectorAll'
    };
    var match = matches[selector[0]];
    if (!match) {
      match = 'querySelectorAll';
    }

    console.warn('dom()', matches, selector);

    var out = null,
        el;

    try {
      el = (context === undefined ? document : context)[matches](selector.slice(1));
      out = el.length < 2 ? el[0] : el;
      console.warn('found', el);
    } catch (err) {

      console.error('error', selector, 'not found');
    }

    this.length = el.length || 0;
    Object.assign(this, out);
    console.timeEnd('dom');
    return this;
  }

  DOM.prototype.find = function find(selector, context) {};

  DOM.prototype.clone = function clone() {};

  /**
   * @param {Function} callback A callback to call on each element
   */

  DOM.prototype.each = function each(callback) {
    // convert this to Array to use for...of
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Array.from(this)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var el = _step.value;

        callback.call(el);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return this;
  };

  /**
   * Add a class to selected elements
   * @param {String} className The class name to add
   */

  DOM.prototype.addClass = function addClass(className) {
    return this.each(function () {
      if (this.classList) {
        this.classList.add(className);
      } else {
        this.className += ' ' + className;
      }
    });
  };

  /**
   * Remove a class from selected elements
   * @param {String} className The class name to remove
   */

  DOM.prototype.removeClass = function removeClass(className) {
    return this.each(function () {
      this.classList.remove(className);
    });
  };

  /**
   * Check to see if the element has a class
   * (Note: Only checks the first elements if more than one is selected)
   * @param {String} className The class name to check
   */

  DOM.prototype.hasClass = function hasClass(className) {
    if (this.classList) {
      return this.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(this.className);
    }
  };

  DOM.prototype.toggleClass = function toggleClass(className) {
    var el = this;
    if (el.classList) {
      el.classList.toggle(className);
    } else {
      var classes = el.className.split(' ');
      var existingIndex = classes.indexOf(className);

      if (existingIndex >= 0) {
        classes.splice(existingIndex, 1);
      } else {
        classes.push(className);
      }
      el.className = classes.join(' ');
    }
  };

  DOM.prototype.css = function css(prop, value) {
    if (value) {
      this.style[prop] = value;
      return this;
    } else if (prop) {
      return this.style[prop];
    } else {
      return this.style;
    }
  };

  DOM.prototype.attr = function attr(name, value) {
    name = name.toLowerCase();

    if (value) {
      this.setAttribute(name, value);
      return this;
    } else {
      return this.getAttribute(name);
    }
  };

  DOM.prototype.data = function data(name, value) {
    if (value) {
      this.setAttribute('data-' + name, value);
      return this;
    } else {
      return this.getAttribute('data-' + name);
    }
  };

  DOM.prototype.on = function on(event, callback) {
    return this.each(function () {
      this.addEventListener(event, callback, false);
    });
  };

  DOM.prototype._on = function _on(eventName, eventHandler) {
    eventType = eventType.split(' ');
    for (var i = 0; i < eventType.length; i++) {
      this.addEventListener(eventType[i], callback);
    }
    return this;
  };

  DOM.prototype.off = function off(eventName, eventHandler) {
    this.removeEventListener(eventName, eventHandler);
  };

  DOM.prototype.trigger = function trigger(eventName, eventData) {
    var event;
    if (window.CustomEvent) {
      event = new CustomEvent(eventName, {
        detail: eventData
      });
    } else {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(eventName, true, true, eventData);
    }
    return this.dispatchEvent(event);
  };

  DOM.prototype.empty = function empty() {
    this.innerHTML = '';
    return this;
  };

  DOM.prototype.html = function html(_html) {
    if (_html) {
      this.innerHTML = _html;
      return this;
    } else {
      return this.innerHTML;
    }
  };

  DOM.prototype.text = function text(_text) {
    if (_text) {
      this.textContent = _text;
      return this;
    } else {
      return this.textContent;
    }
  };

  DOM.prototype.next = function next() {
    return this.nextElementSibling;
  };

  DOM.prototype.prev = function prev() {};

  DOM.prototype.parent = function parent() {
    return this.parentNode;
  };

  DOM.prototype.child = function child() {};

  DOM.prototype.position = function position() {};

  return DOM;
})();

exports['default'] = DOM;
var $ = function $(selector) {
  return new DOM(selector);
};

exports.$ = $;
var dom = function dom(selector, context, undefined) {

  var matches = ({
    '#': 'getElementById',
    '.': 'getElementsByClassName',
    '@': 'getElementsByName',
    '=': 'getElementsByTagName',
    '*': 'querySelectorAll'
  })[selector[0]];

  //console.warn('dom()', matches, selector);
  var out = null,
      el;
  try {
    el = (context === undefined ? document : context)[matches](selector.slice(1));
    out = el.length < 2 ? el[0] : el;
    //console.warn('found', el);
  } catch (err) {
    console.error('error', selector, 'not found');
  }

  return out;
};

// TODO: Extend Element on Window.

//dom('#iddiv').find('.inside')
window.Element.prototype.find = function (selector) {
  return dom(selector, this);
};

//dom(el).clone()
window.Element.prototype.clone = function () {
  return this.cloneNode(true);
};

//dom(el).hasClass(name)
window.Element.prototype.hasClass = function (className) {
  if (this.classList) {
    return this.classList.contains(className);
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(this.className);
  }
};

//dom(el).addClass(name)
window.Element.prototype.addClass = function (className) {
  if (this.classList) {
    this.classList.add(className);
  } else {
    this.className += ' ' + className;
  }
  return this;
};

//dom(el).removeClass(name)
window.Element.prototype.removeClass = function (className) {
  var el = this;
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
  return this;
};

//dom(el).toggleClass(name)
window.Element.prototype.toggleClass = function (className) {
  var el = this;
  if (el.classList) {
    el.classList.toggle(className);
  } else {
    var classes = el.className.split(' ');
    var existingIndex = classes.indexOf(className);

    if (existingIndex >= 0) {
      classes.splice(existingIndex, 1);
    } else {
      classes.push(className);
    }
    el.className = classes.join(' ');
  }
};

//dom().css('prop', 'value') support
window.Element.prototype.css = function (prop, value) {
  if (value) {
    this.style[prop] = value;
    return this;
  } else if (prop) {
    return this.style[prop];
  } else {
    return this.style;
  }
};

//dom(selector).attr('prop', 'value')
window.Element.prototype.attr = function (name, value) {
  name = name.toLowerCase();

  if (value) {
    this.setAttribute(name, value);
    return this;
  } else {
    return this.getAttribute(name);
  }
};

window.Element.prototype.data = function (name, value) {
  if (value) {
    this.setAttribute('data-' + name, value);
    return this;
  } else {
    return this.getAttribute('data-' + name);
  }
};

window.Element.prototype.on = function (eventType, callback) {
  eventType = eventType.split(' ');
  for (var i = 0; i < eventType.length; i++) {
    this.addEventListener(eventType[i], callback);
  }
  return this;
};

//px.mobile.dom('#sandbox').off('click', handler);
window.Element.prototype.off = function (eventName, eventHandler) {
  this.removeEventListener(eventName, eventHandler);
};

//px.mobile.dom('#sandbox').trigger('custom-event', {name: 'value'});
window.Element.prototype.trigger = function (eventName, eventData) {
  var event;
  if (window.CustomEvent) {
    event = new CustomEvent(eventName, {
      detail: eventData
    });
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, true, true, eventData);
  }
  return this.dispatchEvent(event);
};

//dom(el).empty();
window.Element.prototype.empty = function () {
  this.innerHTML = '';
  return this;
};

//dom(el).html();
window.Element.prototype.html = function (html) {
  if (html) {
    this.innerHTML = html;
    return this;
  } else {
    return this.innerHTML;
  }
};

//dom(el).text();
window.Element.prototype.text = function (text) {
  if (text) {
    this.textContent = text;
    return this;
  } else {
    return this.textContent;
  }
};

//dom(el).next();
window.Element.prototype.next = function () {
  return this.nextElementSibling;
};

//dom(el).parent();
window.Element.prototype.parent = function () {
  return this.parentNode;
};

//dom(el).remove();
window.Element.prototype.remove = function () {
  return this.parentNode.removeChild(this);
};

window.Element.prototype.child = function () {
  return this.children;
};
//dom(el).position();
window.Element.prototype.position = function () {
  var pos = {
    left: this.offsetLeft,
    top: this.offsetTop
  };
  return pos;
};

// TODO: Extend nodelist

//dom().addClass('name');
window.NodeList.prototype.addClass = function (name) {
  this.each(function (el) {
    el.classList.add(name);
  });
  return this;
};

// $().removeClass('name');
window.NodeList.prototype.removeClass = function (name) {
  this.each(function (el) {
    el.classList.remove(name);
  });
  return this;
};

//dom.extend({}, objA, objB);
dom.extend = function (out) {
  out = out || {};
  for (var i = 1; i < arguments.length; i++) {
    if (!arguments[i]) {
      continue;
    }
    for (var key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) {
        out[key] = arguments[i][key];
      }
    }
  }
  return out;
};

// doing a find in a NodeList doesnt really work. I had a function that
// would look inside and get the element but it was pretty big and
// required recusive searching inside NodeLists. So I would suggest just
// using a '*' selection method
window.NodeList.prototype.find = function find(elem) {
  console.error('You cannot find in a NodeList. Just use $(*selector %s)', elem);
  return this;
};

// another useful one for doing $('.inside').each()
window.NodeList.prototype.each = Array.prototype.forEach;

window.NodeList.prototype.attr = function (name, value) {
  this.each(function (el) {
    if (value) {
      el.setAttribute(name, value);
    } else {
      return el.getAttribute(name);
    }
  });
  return this;
};

window.NodeList.prototype.toggleClass = function (className) {
  this.each(function (el) {
    el.toggleClass(className);
  });
  return this;
};

window.NodeList.prototype.css = function (prop, value) {
  this.each(function (el) {
    el.css(prop, value);
  });
  return this;
};

window.NodeList.prototype.on = function (eventType, callback) {
  this.each(function (el) {
    el.on(eventType, callback);
  });
  return this;
};

window.NodeList.prototype.first = function () {
  return this.length < 2 ? this : this[0];
};

window.NodeList.prototype.last = function () {
  // if there are many items, return the last
  return this.length > 1 ? this[this.length - 1] : this;
};

exports['default'] = dom;

},{}],8:[function(require,module,exports){
/*globals Request, Promise*/
'use strict';
exports.__esModule = true;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _interfaces = require('./interfaces');

var _interfaces2 = _interopRequireDefault(_interfaces);

/**
 * HTTP class provides an abstraction layer for HTTP calls.
 * @example
 * var $http = new px.mobile.HTTP('http1', {
 *  baseUrl: window.location.origin
 * });
 */

var HTTP = (function (_BaseClass) {
  _inherits(HTTP, _BaseClass);

  /**
   * Create a new instance of a HTTP service.
   * @constructor
   * @param {String} name - The name of the service
   * @param {Object} options - The default options to pass
   * @return {HTTP} An instance of the HTTP class
   */

  function HTTP() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? 'http' : arguments[0];
    var options = arguments.length <= 1 || arguments[1] === undefined ? {
      baseUrl: '/default'
    } : arguments[1];

    _classCallCheck(this, HTTP);

    _BaseClass.call(this, name, options);

    console.warn('HTTP', this, options);

    if (!options.baseUrl) {
      throw new Error('HTTP: Must provide a baseUrl');
    }

    return this;
  }

  /**
   *  I handle checking the response status code of a HTTP request.
   * @param {Response} response A Response object
   * @return {Response} The original response
   */

  HTTP.prototype.checkStatus = function checkStatus(response) {
    console.warn(response.status, response.statusText, response.url, response);
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      return response;
    }
  };

  /**
   * I handle parsing the JSON of a response.
   * @param {Response} response A Response object
   * @return {Response} The original response with a data property that is the parsed JSON
   */

  HTTP.prototype.parseJSON = function parseJSON(response) {
    if (!response) {
      throw new Error('Must pass a response object to parseJSON!');
    }
    return response.json().then(function (json) {
      response.data = json;
      return response;
    });
  };

  /**
   *  I make a HTTP request for JSON.
   * @example
   * $http.getJSON('/default/_all_docs', {limit: 5}).then(function(resp){
   *    //handle json
   * }).catch(function(err){
   *    //handle error
   * });
   * @param {String} url - The url
   * @param {Object} options - Request options object
   * @return {Promise} A promise that resolves a response
   */

  HTTP.prototype.getJSON = function getJSON() {
    var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var req = new Request(url, options || {
      method: 'GET'
    });
    return fetch(req).then(this.checkStatus).then(this.parseJSON);
  };

  /**
   * The response object has these properties:
   * @example
   * $http.request('/default', {
   *    method: 'POST',
   *    data: data
   * }).then(function(resp){
   *    //handle response
   * }).catch(function(err){
   *    //handle error
   * });
   * @param {String} url - The url
   * @param {Object} options - Options to pass
   * @return {Promise} A promise that resolves a response
   */

  HTTP.prototype.request = function request(url, options) {
    var _this = this;

    var config = this.utils.extend({
      data: null,
      params: null,
      body: null,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }, options);

    if (options.data) {
      config.body = JSON.stringify(options.data);
      delete config.data;
    }

    url = this.utils.resolveURL(this.baseUrl, url);
    //url = this.utils.resolveURL(url);

    if (options.params) {
      url = this.utils.resolveURL(url, options.params);
      delete options.params;
    }

    //this.log.logApi(`request => ${url}`, config);
    this.log.logHttp(config.method, url);

    var benchmark = this.log.logTime('request');
    return new Promise(function (resolve, reject) {
      return fetch(new Request(url, config)).then(function (resp) {
        _this.log.logHttp(resp.status + ' ' + benchmark.end(), resp, true);
        //return this.parseJSON(resp).then(resolve, reject);
        resp.data = {};
        resolve(resp);
      }, reject);
    });
  };

  /**
   * I make a HTTP GET request.
   * @example
   * $http.get('/default/_all_docs', {limit: 5}).then(function(resp){
   *    //handle resp:Response
   * }).catch(function(err){
   *    //handle error
   * });
   * @param {String} url The url
   * @param {Object} options Options to pass
   * @return {Promise} A promise that resolves a response
   */

  HTTP.prototype.get = function get() {
    var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    this.log.logApi('get', options);
    return this.request(url, options).then(this.parseJSON);
  };

  /**
   * I make a HTTP PUT request.
   * @example
  $http.put('/default/id', {name: 'value'}).then(function(resp){
    //handle resp:Response
  }).catch(function(err){
    //handle error
  });
    * @param {String} url The url
   * @param {Object} options Options to pass
   * @return {Promise} A promise that resolves a response
   */

  HTTP.prototype.put = function put() {
    var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    this.log.logApi('put', data);
    return this.request(url, this.utils.extend({
      method: 'PUT',
      data: data
    }, options));
  };

  /**
   * I make a HTTP POST request.
   * @example
  $http.post('/default', {name: 'value'}).then(function(resp){
   //handle resp:Response
  }).catch(function(err){
   //handle error
  });
    * @param {String} url The url
   * @param {Object} options Options to pass
   * @return {Promise} A promise that resolves a response
   */

  HTTP.prototype.post = function post() {
    var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return this.request(url, this.utils.extend({
      method: 'POST',
      data: data
    }, options));
  };

  /**
   * I make a HTTP DELETE request.
   * @example
  $http.delete('/default/id').then(function(resp){
   //handle resp:Response
  }).catch(function(err){
   //handle error
  });
    * @param {String} url The url
   * @param {Object} options Options to pass
   * @return {Promise} A promise that resolves a response
   */

  HTTP.prototype['delete'] = function _delete() {
    var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    return this.request(url, this.utils.extend({
      method: 'DELETE'
    }, options));
  };

  /**
   * I make a HTTP HEAD request.
   * @example
  $http.head('/default/id').then(function(resp){
    //handle resp:Response
  }).catch(function(err){
    //handle error
  });
    * @param {String} url The url
   * @param {Object} options Options to pass
   * @return {Promise} A promise that resolves a response
   */

  HTTP.prototype.head = function head() {
    var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    return this.request(url, this.utils.extend({
      method: 'HEAD'
    }, options));
  };

  return HTTP;
})(_base2['default']);

exports['default'] = HTTP;
module.exports = exports['default'];

},{"./base":3,"./interfaces":10,"./log":11}],9:[function(require,module,exports){
/**
 * @description Taken from http://jscriptpatterns.blogspot.com/2013/01/javascript-interfaces.html
 * @example
 var IExample = new Interface('Example', ['add', 'remove', 'get']);
 var ExampleClass = {
    add: function(){},
    remove: function(){},
    get: function(){}
  };
  Interface.ensureImplements(ExampleClass, IExample)
 @param {String} name The name of the interface
 @param {methods} Array The methods the class object must implement
 */
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Interface = (function () {
  function Interface(name, methods) {
    _classCallCheck(this, Interface);

    if (arguments.length !== 2) {
      throw new Error("Interface constructor called with " + arguments.length + "arguments, but expected exactly 2.");
    }

    this.name = name;
    this.methods = [];

    for (var i = 0, len = methods.length; i < len; i++) {
      if (typeof methods[i] !== 'string') {
        throw new Error("Interface constructor expects method names to be passed in as a string.");
      }

      this.methods.push(methods[i]);
    }
  }

  /**
   * @description Handle ensuring a object implements the specified interface.
   * @param {Object} object The objects to verify
   * @returns {boolean}
   */

  Interface.ensureImplements = function ensureImplements(object) {
    if (arguments.length < 2) {
      throw new Error('Function Interface.ensureImplements called with ' + arguments.length + 'arguments, but expected at least 2.');
    }

    for (var i = 1, len = arguments.length; i < len; i++) {
      var _interface = arguments[i];
      if (_interface.constructor !== Interface) {
        throw new Error('Function Interface.ensureImplements expects arguments two and above to be instances of Interface.');
      }

      for (var j = 0, methodsLen = _interface.methods.length; j < methodsLen; j++) {
        var method = _interface.methods[j];
        if (!object[method] || typeof object[method] !== 'function') {
          throw new Error('Function Interface.ensureImplements: object does not implement the ' + _interface.name + ' interface. Method ' + method + ' was not found. ');
        }
      }
    }
    return true;
  };

  return Interface;
})();

exports["default"] = Interface;
module.exports = exports["default"];

},{}],10:[function(require,module,exports){
// TODO: All interfaces defined here to ensure modules implement;
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _interface = require('./interface');

var _interface2 = _interopRequireDefault(_interface);

/**
 * All interfaces defined here to ensure modules implement;
 * @type {Object}
 */
var Interfaces = {};

/**
 * Database interface - All database adapters must implement this interface.
 * @interface IDBInterface
 * @type {Interface}
 */
Interfaces.IDBInterface = new _interface2['default']('IDBInterface', ['getAttachment', 'saveAttachment', 'get', 'put', 'post', 'remove', 'allDocs', 'bulkDocs', 'changes']);
/**
 * HTTP interface - All HTTP adapters must implement this interface.
 * @interface IHTTPInterface
 * @type {Interface}
 */
Interfaces.IHTTPInterface = new _interface2['default']('IHTTPInterface', ['get', 'put', 'post', 'delete', 'head', 'request']);

exports['default'] = Interfaces;
module.exports = exports['default'];

},{"./interface":9}],11:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _dom = require('./dom');

var _dom2 = _interopRequireDefault(_dom);

/**
 * Logger class provides customized logging to the console.
 * pxdb:http GET http://127.0.0.1:5984/default/ +0ms
 * pxdb:api default +28ms id
 * pxdb:api default +1ms id success 9FA8E5B5-FA51-9A95-901E-E6DD8D6D4B90
 */

var Logger = (function () {
  function Logger() {
    var category = arguments.length <= 0 || arguments[0] === undefined ? 'log' : arguments[0];
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Logger);

    this.category = category;
    var defaults = {
      colors: {
        trace: 'color:#7672E6;',
        success: 'color:#288A29;',
        info: 'color:#1F9A2D;',
        warn: 'color:#9E9E23;',
        fatal: 'color:#C057BA;',
        error: 'color:#FC121E;',
        debug: 'color:#7672E6;'
      }
    };
    this.options = _dom2['default'].extend(defaults, options);
    return this;
  }

  Logger.prototype.log = function log(level, args) {
    var timestamp = new Date().toLocaleString();
    var log = window.console ? window.console.log.bind(window.console) : function () {};
    log('[' + timestamp + '] [' + level + '] [' + this.category + ']', arguments);
  };

  Logger.prototype.debug = function debug(args) {
    return this.log('DEBUG', args);
  };

  Logger.prototype.info = function info(args) {
    return this.log('INFO', args);
  };

  Logger.prototype.warn = function warn(args) {
    return this.log('WARN', args);
  };

  Logger.prototype.error = function error(args) {
    return this.log('ERROR', args);
  };

  /**
   * Log a API method to the console.
   * @example
    logger.logApi('someMethod', {}, true);
    logger.logApi('someMethod', {}, false);
   * @param {String} method - The name of the method.
   * @param {Object} params - The params to log.
   */

  Logger.prototype.logApi = function logApi(method, params, success) {
    if (!params) {
      params = {};
    }
    console.log('%c[%s:api] %s %o', success ? this.options.colors.success : this.options.colors.debug, this.category, method, params);
  };

  /**
   * Log a API method to the console.
   * @example
    logger.logHttp('GET', '/default', true);
    logger.logHttp('PUT', '/default', false);
   * @param {String} method - The name of the method.
   * @param {Object} params - The params to log.
   */

  Logger.prototype.logHttp = function logHttp(method, url, success) {
    console.log('%c[%s:http] %c%s %c%o', success ? this.options.colors.success : this.options.colors.info, this.category, null, method, null, url);
  };

  Logger.prototype.logTime = function logTime(name) {
    var start = new Date();
    return {
      end: function end() {
        return new Date().getMilliseconds() - start.getMilliseconds() + 'ms';
      }
    };
  };

  return Logger;
})();

exports['default'] = Logger;
module.exports = exports['default'];

},{"./base":3,"./dom":7}],12:[function(require,module,exports){
'use strict';
// TODO: Vendor
//require('../vendor/overthrow/overthrow')
//require('../vendor/es6-shim')
//require('../vendor/fetch')
//require('../vendor/fastclick')
exports.__esModule = true;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj['default'] = obj;return newObj;
  }
}

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _collection = require('./collection');

var _collection2 = _interopRequireDefault(_collection);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _dom = require('./dom');

var _dom2 = _interopRequireDefault(_dom);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _http = require('./http');

var _http2 = _interopRequireDefault(_http);

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _simpleRouter = require('./simple-router');

var _simpleRouter2 = _interopRequireDefault(_simpleRouter);

var _page = require('./page');

var _page2 = _interopRequireDefault(_page);

var _pages = require('./pages');

var _pages2 = _interopRequireDefault(_pages);

var _views = require('./views');

var _views2 = _interopRequireDefault(_views);

var _view = require('./view');

var _view2 = _interopRequireDefault(_view);

var _pubsub = require('./pubsub');

var _pubsub2 = _interopRequireDefault(_pubsub);

var _interface = require('./interface');

var _interface2 = _interopRequireDefault(_interface);

var _interfaces = require('./interfaces');

var _interfaces2 = _interopRequireDefault(_interfaces);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var pxMobile = {
  version: 'es6',
  utils: utils,
  Logger: _log2['default'],
  BaseClass: _base2['default'],
  App: _app2['default'],
  Core: _core2['default'],
  Collection: _collection2['default'],
  dom: _dom2['default'],
  DB: _db2['default'],
  HTTP: _http2['default'],
  Model: _model2['default'],
  SimpleRouter: _simpleRouter2['default'],
  Router: _router2['default'],
  Page: _page2['default'],
  Pages: _pages2['default'],
  Views: _views2['default'],
  View: _view2['default'],
  PubSub: _pubsub2['default'],
  Interface: _interface2['default'],
  Interfaces: _interfaces2['default']
};
pxMobile.debug = true;
pxMobile.behaviors = {};

if (window) {
  window.px = window.px || {};
  window.px.mobile = pxMobile;
  window.pxMobile = pxMobile;
}

exports['default'] = pxMobile;
module.exports = exports['default'];

},{"./app":2,"./base":3,"./collection":4,"./core":5,"./db":6,"./dom":7,"./http":8,"./interface":9,"./interfaces":10,"./log":11,"./model":13,"./page":14,"./pages":15,"./pubsub":16,"./router":17,"./simple-router":19,"./utils":20,"./view":21,"./views":22}],13:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj['default'] = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _HTTP = require('./HTTP');

var _HTTP2 = _interopRequireDefault(_HTTP);

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

/**
 * Model class provides event dispatching.
 * @example
 * var model = new Model();
 * @param {String} id - The id of the model.
 * @param {Object} options - Options for the model
 */

var Model = (function (_BaseClass) {
  _inherits(Model, _BaseClass);

  function Model(id, options) {
    _classCallCheck(this, Model);

    id = id || utils.uuid();
    options = options || {};

    _BaseClass.call(this, id, options);

    this.uuid = utils.uuid();
    this.id = id;
    this.baseUrl = options.baseUrl || '/default';
    this.defaults = options.defaults || {};
    this.idField = options.idField || '_id';
    this.data = options.data || {};
    this.data[this.idField] = id;
    // TODO: Adpater can be http or db
    this.adapter = options.adapter || _HTTP2['default'];
    this.adapter = new this.adapter(id, options);

    this.log = new _log2['default'](id, {
      colors: {
        debug: 'color:blue'
      }
    });
    this.log.logApi('constructor', options);
  }

  Model.prototype.url = function url() {
    var url = '/' + encodeURIComponent(this.get(this.idField));
    var rev = this.get('_rev');
    if (rev) {
      url += '?rev=' + _rev;
    }
    return url;
  };

  Model.prototype.has = function has(attribute) {
    this.log.logApi('has', attribute);
    return this.data.hasOwnProperty(attribute);
  };

  Model.prototype.get = function get(attribute) {
    this.log.logApi('has', attribute);
    return this.data[attribute];
  };

  Model.prototype.set = function set(attributes) {
    var force = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    for (var key in attributes) {
      if (force) {
        this.data[key] = attributes[key];
      }
      if (this.has(key)) {
        this.data[key] = attributes[key];
      }
    }
    return this;
  };

  Model.prototype.toJSON = function toJSON() {
    console.warn('toJSON', this.data);
    return JSON.stringify(this.data);
  };

  Model.prototype.clone = function clone() {
    return new this.constructor(this.options);
  };

  Model.prototype.parse = function parse(resp) {
    console.warn('parse', resp);
    if (resp.ok && resp.data._id) {
      this.utils.extend(this.data, resp.data);
    }
    return resp;
  };

  Model.prototype.fetch = function fetch(options) {
    console.warn('fetch', options);
    return this.adapter.get(this.url()).then(this.parse);
  };

  Model.prototype.save = function save(options) {
    console.warn('save', options);
    return this.adapter.put('' + this.url(), this.data).then(this.parse);
  };

  Model.prototype.destroy = function destroy(options) {
    console.warn('destroy', this.data._rev);
    return this.adapter['delete']('' + this.url()).then(this.parse);
  };

  Model.prototype.sync = function sync(options) {
    console.warn('sync', options);
  };

  Model.extend = function extend(obj) {
    return _BaseClass.extend.call(this, this, obj);
  };

  return Model;
})(_base2['default']);

exports['default'] = Model;
module.exports = exports['default'];

},{"./HTTP":1,"./base":3,"./log":11,"./utils":20}],14:[function(require,module,exports){
'use strict';
exports.__esModule = true;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _pubsub = require('./pubsub');

var _pubsub2 = _interopRequireDefault(_pubsub);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

/**
 * @description Page class has methods for managing a page.
 */

var Page = (function (_BaseClass) {
  _inherits(Page, _BaseClass);

  function Page(name, options) {
    _classCallCheck(this, Page);

    _BaseClass.call(this, name, options);

    this.properties = {
      title: {
        type: String,
        value: null
      },
      backText: {
        type: String,
        value: null
      },
      backLink: {
        type: String,
        value: null
      },
      //Path to remote view that will be loaded
      href: {
        type: String,
        notify: true,
        value: null,
        observer: '_tmplChanged'
      },
      active: {
        type: Boolean,
        value: false
      },
      dialog: {
        type: Boolean,
        value: false
      },
      //with URL query parameters. If your page URL is "about.html?id=10&count=20&color=blue"
      query: {
        type: Object
      },
      context: {
        type: Object
      },
      //View instance that contains this page (if this View was initialized)
      view: {
        type: Object
      },
      //Page Data object of the previously active page
      fromPage: {
        type: Object
      },
      route: {
        type: String
      },
      //Contains string URL of just loaded page
      url: {
        type: String
      },
      //Link to Page HTMLElement
      container: {
        type: String
      }
    };

    this.utils.addMixin(new _pubsub2['default'](name), this);

    return this;
  }

  Page.prototype.created = function created() {
    var logger = new px.mobile.Logger(this.tagName, {
      colors: {
        debug: 'color:orange'
      }
    });
    px.mobile.utils.addMixin(logger, this);
    this.log.logApi('created', this.id);
    this.emit('page:' + this.id + ':init', this);
  };

  Page.prototype.ready = function ready() {
    this.log.logApi('ready', this.id);
    if (this.dialog) {
      this.toggleClass('dialog');
    }
    this.emit('page:' + this.id + ':ready', this);
  };

  Page.prototype.show = function show() {
    console.warn('INFO', 'show view', this.id);
    this.toggleClass('current', false, this);
  };

  Page.prototype.hide = function hide() {
    console.warn('INFO', 'hide view', this.id);
    this.toggleClass('hidden', true, this);
  };

  Page.prototype.update = function update() {
    console.warn('INFO', 'update view', this.id);
  };

  Page.prototype.currentView = function currentView() {
    console.warn('INFO', 'current view', this.id);
    this.child()[0].toggleClass('current', true, this);
  };

  Page.prototype.nextView = function nextView() {
    console.warn('INFO', 'next view', this.id);
    this.toggleClass('next', true, this);
  };

  Page.prototype.previousView = function previousView() {
    console.warn('INFO', 'previous view', this.id);
    this.toggleClass('previous', true, this);
  };

  Page.prototype.contextChanged = function contextChanged(newContext, oldContext) {
    console.warn('contextChanged', newContext, oldContext);
  };

  //I handle loading a page from a url

  Page.prototype._tmplChanged = function _tmplChanged(newVal, oldVal) {
    var _this = this,
        html = '';
    if (newVal) {
      console.warn(this.id, 'Load remote html', newVal);
      this.importHref(newVal, function (e) {
        html = e.target['import'].body.innerHTML;
        _this.log.logApi('inject html', _this.id);
        console.warn('inject px-view html', _this.id);
        _this.html(html);
      }, function (e) {
        // loading error
        console.error('Error loading page', e);
      });
    }
  };

  Page.prototype.showMenu = function showMenu() {
    px.mobile.dom('px-app').toggleClass('show-menu');
  };

  Page.prototype.open = function open() {
    if (this.dialog) {
      this.toggleClass('open');
    }
  };

  Page.prototype.close = function close() {
    if (this.dialog) {
      this.toggleClass('open');
    }
  };

  return Page;
})(_base2['default']);

exports['default'] = Page;
module.exports = exports['default'];

},{"./base":3,"./pubsub":16}],15:[function(require,module,exports){
'use strict';
exports.__esModule = true;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _pubsub = require('./pubsub');

var _pubsub2 = _interopRequireDefault(_pubsub);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

/**
 * @description Pages class has methods for managing a collection of pages.
 */

var Pages = (function (_BaseClass) {
  _inherits(Pages, _BaseClass);

  function Pages(name, options) {
    _classCallCheck(this, Pages);

    _BaseClass.call(this, name, options);
    return this;
  }

  return Pages;
})(_base2['default']);

exports['default'] = Pages;
module.exports = exports['default'];

},{"./base":3,"./pubsub":16}],16:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _dom = require('./dom');

var _dom2 = _interopRequireDefault(_dom);

/**
 *
 */

var PubSub = (function () {

  /**
   * PubSub class provides event dispatching.
   * @example
   * var pubsub = new PubSub('namespace');
         pubsub.publish('event', {name: value});
    * @param {String} name - The name of the pubsub.
   * @return {PubSub} Instance of the pubsub.
   */

  function PubSub() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? 'pubsub' : arguments[0];
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, PubSub);

    //  super(name, options);

    this.log = new _log2['default'](name, {
      colors: {
        debug: 'color:orange'
      }
    });
    /**
     * @type {Object} Storage for topics that can be broadcast or listened to
     */
    this.topics = {};

    /**
     * @type {Number} A topic identifier
     */
    this.subUid = -1;
    return this;
  }

  PubSub.prototype.start = function start() {};

  /**
   * Publish or broadcast events of interest with a specific topic name and arguments such as the data to pass along
   * @example
   * pubsub.publish('event', {name: 'value'});
   * @param {String} topic - The event topic name
   * @return {PubSub}
   */

  PubSub.prototype.publish = function publish(topic, args) {
    var topics = this.topics;

    if (!topics[topic]) {
      return false;
    }

    var subscribers = topics[topic],
        len = subscribers ? subscribers.length : 0;

    while (len--) {
      subscribers[len].func(topic, args);
    }

    return this;
  };

  /**
   * Subscribe to events of interest with a specific topic name and a callback function, to be executed when the topic/event is observed
   * @example
   * pubsub.subscribe('event', function(data){
     });
   * @param {String} topic - The name of the event.
   * @return {String} A string token
   */

  PubSub.prototype.subscribe = function subscribe(topic, fn) {
    var topics = this.topics;

    if (!topics[topic]) {
      topics[topic] = [];
    }

    var token = (++this.subUid).toString();

    this.topics[topic].push({
      token: token,
      func: fn
    });
    return token;
  };

  /**
   * Unsubscribe from a specific topic, based on a tokenized reference to the subscription
   * @example
   *
   * @param {String} token - The event token
   * @return {PubSub} PubSub instance
   */

  PubSub.prototype.unsubscribe = function unsubscribe(token) {
    var topics = this.topics;
    for (var m in topics) {
      if (topics[m]) {
        for (var i = 0, j = topics[m].length; i < j; i++) {
          if (topics[m][i].token === token) {
            topics[m].splice(i, 1);
            return token;
          }
        }
      }
    }
    return this;
  };

  PubSub.emit = function emit(event, data) {

    return _dom2['default']('*body').trigger(event, data);
  };

  PubSub.on = function on(event, cb) {

    return _dom2['default']('*body').on(event, cb);
  };

  return PubSub;
})();

exports['default'] = PubSub;
module.exports = exports['default'];

},{"./base":3,"./dom":7,"./log":11}],17:[function(require,module,exports){
'use strict';
exports.__esModule = true;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _pubsub = require('./pubsub');

var _pubsub2 = _interopRequireDefault(_pubsub);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

//regex for stripping a leading hash/slash and trailing space.
var routeStripper = /^[#\/]|\s+$/g;

//regex for stripping leading and trailing slashes.
var rootStripper = /^\/+|\/+$/g;

// regex for stripping urls of hash.
var pathStripper = /#.*$/;

/**
 * Router history manages the state of the router.
 * Handles cross-browser history management, based on either pushState and real URLs, or onhashchange and URL fragments.
 * Inspired by http://backbonejs.org/docs/backbone.html#section-196
 */

var RouterHistory = (function (_BaseClass) {
  _inherits(RouterHistory, _BaseClass);

  function RouterHistory(name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {
      root: '/'
    } : arguments[1];

    _classCallCheck(this, RouterHistory);

    _BaseClass.call(this, name, options);

    this.root = ('/' + this.root + '/').replace(rootStripper, '#/');

    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
    this.pushState = options.pushState || false;
    return this;
  }

  /**
   *
   */

  RouterHistory.prototype.go = function go(route, options) {
    if (this.pushState) {
      this.history.pushState(options, document.title, route);
    } else {
      this.location.hash = route;
    }
  };

  /**
   *
   */

  RouterHistory.prototype.state = function state() {
    return this.history.state;
  };

  /**
   *
   */

  RouterHistory.prototype.back = function back() {
    return this.history.back();
  };

  /**
   *
   */

  RouterHistory.prototype.forward = function forward() {
    return this.history.forward();
  };

  RouterHistory.prototype.atRoot = function atRoot() {
    var path = this.location.pathname.replace(/[^\/]$/, '$&/');
    return path === this.root && !this.getSearch();
  };

  RouterHistory.prototype.matchRoot = function matchRoot() {
    var path = this.decodeFragment(this.location.pathname);
    var root = path.slice(0, this.root.length - 1) + '/';
    return root === this.root;
  };

  RouterHistory.prototype.decodeFragment = function decodeFragment(fragment) {
    return decodeURI(fragment.replace(/%25/g, '%2525'));
  };

  /**
   *
   */

  RouterHistory.prototype.getSearch = function getSearch() {
    var match = this.location.href.replace(/#.*/, '').match(/\?.+/);
    return match ? match[0] : '';
  };

  /**
   * Gets the true hash value.
   */

  RouterHistory.prototype.getHash = function getHash(window) {
    var match = (window || this).location.href.match(/#(.*)$/);
    return match ? match[1] : '';
  };

  /**
   * Get the pathname and search params, without the root.
   */

  RouterHistory.prototype.getPath = function getPath() {
    var path = this.decodeFragment(this.location.pathname + this.getSearch()).slice(this.root.length - 1);
    return path.charAt(0) === '/' ? path.slice(1) : path;
  };

  /**
   * Get the browser normailzed URL fragment form the path or hash.
   */

  RouterHistory.prototype.getFragment = function getFragment(fragment) {
    if (fragment === null) {
      if (this._usePushState || !this._wantsHashChange) {
        fragment = this.getPath();
      } else {
        fragment = this.getHash();
      }
    } else {
      fragment = this.getHash();
    }
    return fragment.replace(routeStripper, '');
  };

  return RouterHistory;
})(_base2['default']);

exports.RouterHistory = RouterHistory;
RouterHistory.started = false;

var _instance = null;
var optionalParam = /\((.*?)\)/g;
var namedParam = /(\(\?)?:\w+/g;
var splatParam = /\*\w+/g;
var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

/**
 * This is the Router class that handles simple routing.
 * @example
 * var myRouter = new px.mobile.Router('app', {
 *  routes: {
 * '/': routeHandlers.homeRoute,
 *     '/about': routeHandlers.aboutRoute,
 *     '/users': routeHandlers.listRoute,
 *     '/users/:action/:id': routeHandlers.detailRoute
 *   }
 * });

 "route:[name]" (params) — Fired by the router when a specific route is matched.
 "route" (route, params) — Fired by the router when any route has been matched.
 "route" (router, route, params) — Fired by history when any route has been matched.
 */

var Router = (function (_BaseClass2) {
  _inherits(Router, _BaseClass2);

  /**
   * Return the ServiceLocator _instance.
   * @return the _instance.
   */

  Router.getInstance = function getInstance() {
    if (_instance == null) {
      _instance = new Router();
    }

    return _instance;
  };

  /**
   * This is the Router class constructor
   * @constructor
   * @param {String} name - The name of the router
   * @param {Object} options - The options for the router
   */

  function Router(name, options) {
    _classCallCheck(this, Router);

    name = name + '.Router';
    _BaseClass2.call(this, name, options);

    /**
     * @type {RouterHistory}
     */
    this.history = new RouterHistory();

    /**
     * @type {Object} Initial routes
     */
    this.routes = {
      '/': ''
    };

    this.urlPrefix = '#';
    this.mixin(options);
    this.started = false;
    this._setRegexRoutes();

    return this;
  }

  Router.prototype.listen = function listen() {
    var self = this;
    var current = this.history.getFragment();
    var fn = function fn() {
      if (current !== self.history.getFragment()) {
        current = self.history.getFragment();
        self.check(current);
      }
    };
    clearInterval(this.interval);
    this.interval = setInterval(fn, 50);
    return this;
  };

  Router.prototype.check = function check(f) {
    var fragment = f || this.history.getFragment();

    for (var i = 0; i < this.routesRegex.length; i++) {
      var match = fragment.match(this.routesRegex[i].regexp);
      if (match) {
        match.shift();
        this.routesRegex[i].success.apply({}, match);
        return this;
      }
    }
    return this;
  };

  /**
   * Handle starting the router and setting up listeners.
   */

  Router.prototype.start = function start() {
    var _this2 = this;

    this.log.logApi('2. start', this);
    if ('onhashchange' in window) {
      this.log.logApi('3. onhashchange', 'The browser supports the hashchange event!');
      this.started = true;
      window.addEventListener('hashchange', function (e) {
        _this2._handleRoute(e);
      }, this);
    } else {
      console.error('Hashchange not availble');
    }
    return this;
  };

  /**
   * Execute a route handler with the provided parameters.
   * @param {Function} callback - The callback function to invoke
   * @param {*} args - The arguments to pass to the callback
   * @param {String} name - The name of the route
   */

  Router.prototype.execute = function execute(callback, args, name) {
    //PubSub.emit(name, args);
    this.log.logApi('execute =>' + name, args);
    if (callback) {
      callback.apply(this, args);
    }
    return this;
  };

  /**
   * Navigate to a route passing options
   * @example
   * myRouter.navigate('/login');
   * @param {String} route - The route to Navigate to
   * @param {Object} options - The options to pass to the route handler
   */

  Router.prototype.navigate = function navigate(route, options) {
    this.log.logApi('navigate =>' + route, options);
    /*
    PubSub.emit('route:before', {
      route, options
    });
    */
    this.history.go(route, options);

    return this;
  };

  /**
   * Trigger callback when route is found
   * @example
   myRouter.on('/users/:action/:id', function(req, res) {
     expect(req).toBeDefined();
     expect(res).toBeDefined();
     expect(req.url).toBe(window.location.origin + '/users/edit/99');
     expect(req.pathname).toBe('/users/edit/99');
     expect(req.params.action).toBe('edit');
     expect(req.params.id).toBe('99');
   });
    myRouter.navigate('/users/edit/99', {
     data: testObj
   });
   * @param {String} route - The route to watch
   * @param {Function} options - The route options
   */

  Router.prototype.on = function on(route, options) {
    this.subscribe(route, options);
    this.log.logApi('5. on -' + route, options);
    this.routes[route] = options;
    this._setRegexRoutes();
    return this;
  };

  /**
   * Promise based route handler, use this to add routes that resolve a promise when matched.
   * @param {String} route - The route to match.
   * @return {Promise} A promise that is resolved when matched.
   */

  Router.prototype.when = function when(route) {
    this.log.logApi('4. when', route);
    var _this = this;
    return new Promise(function (resolve, reject) {
      _this.on(route, {
        callback: function callback(req, res) {
          resolve(req, res);
        }
      });
    });
  };

  /**
   * Manually bind a single named route to a callback. For example:
   *
   * // Matches #page/10, passing "10"
   * this.route("page/:number", "page", function(number){ ... });
   *
   * // Matches /117-a/b/c/open, passing "117-a/b/c" to this.open
   * this.route(/^(.*?)\/open$/, "open");
   */

  Router.prototype.route = function route(_route2, name, callback) {
    this.log.logApi('route', _route2);
    return this;
  };

  /**
   * I handle the routing when the location.hash changes.
   */

  Router.prototype._handleRoute = function _handleRoute(e) {
    this.log.logApi('_handleRoute', e);
    var _hash = location.hash.replace(/^#\/|\/$/gi, '/');
    var parser = document.createElement('a');
    parser.href = _hash;
    var _routeObj = null;
    var res = {};
    var req = {
      hostname: parser.hostname,
      host: parser.host,
      port: parser.port,
      protocol: parser.protocol,
      pathname: parser.pathname,
      hash: parser.hash,
      url: parser.href,
      query: parser.search,
      params: {}, //needs to be routes named params keys and value the values
      data: {} //Needs to be any other data sent along
    };

    req.query = this._getUrlQuery(parser.href);

    //Loop each regex route and match against hash, if match, invoke route handler function.
    for (var i = 0; i < this.routesRegex.length; i++) {
      _routeObj = this.routesRegex[i];

      //Test if route matches registered route
      if (_routeObj.regexp.test(_hash)) {
        _routeObj.current = _hash;

        _routeObj = this._setRouteParams(_routeObj);

        //setup request params / and data
        req.params = _routeObj.params;

        //Log
        this.log.logApi(_hash, _routeObj);
        /*
         PubSub.emit('route:success', {
           _routeObj, req, res
         });
         PubSub.emit('route:change', {
           _routeObj, req, res
         });
         */
        //Execute route handler
        this.execute(_routeObj.success, [req, res], _hash);
      } else {

        this.execute(_routeObj.error, [req, res], _hash);
      }
    }
  };

  /**
   * I handle building the regular expressions from the route patterns.
   */

  Router.prototype._setRegexRoutes = function _setRegexRoutes() {
    var _out = [],
        _routeParams = [],
        _reg,
        _routeObj;

    var routeHandler = null;
    var routeErrorHandler = function routeErrorHandler() {};
    var routeSuccessHandler = function routeSuccessHandler() {};
    var routeResolver = null;

    this.log.logApi('1. registerRoutes', this.routes);
    for (var _route in this.routes) {

      // TODO: Route handler can be a function or object
      if (this.utils.type(this.routes[_route]) === 'function') {
        routeSuccessHandler = this.routes[_route];
      }

      // TODO:  If object, make sure callback prop exists,
      if (this.utils.type(this.routes[_route]) === 'object') {

        if (this.routes[_route].error) {
          routeErrorHandler.bind(this.routes[_route].error);
        }
        if (this.routes[_route].success) {
          routeSuccessHandler.bind(this.routes[_route].success);
        }

        console.warn('Found route callback');

        if (this.routes[_route].resolve) {
          routeSuccessHandler = this.routes[_route].resolve;
          console.warn('Found route resolver');
        }
      }

      // TODO: if object.resolve (Ensure objects key is added to params once resolved.)
      _routeParams = _route.replace('/', '').split('/');
      _reg = this._regexRoute(_route, _routeParams);
      _routeObj = {
        regexp: _reg,
        route: _route,
        success: routeSuccessHandler,
        error: routeErrorHandler
      };
      _out.push(_routeObj);
      //this.log.logApi('setRegexRoutes', _routeObj);
    }
    this.routesRegex = _out;
    return _out;
  };

  /**
   * I handle taking a regex route pattern and the route and returning the matches key:value pair object.
   * @param {Object} routeObj - The route object to set
   * @return {Object} A route object map of name/value pairs
   */

  Router.prototype._setRouteParams = function _setRouteParams(routeObj) {
    var normalized = routeObj.route.replace(/\:/g, '');
    var m1 = routeObj.regexp.exec(normalized);
    var m2 = routeObj.regexp.exec(routeObj.current);
    var params = {};
    for (var i = 1; i < m1.length; i++) {
      params[m1[i]] = m2[i];
    }
    routeObj.params = params;
    return routeObj;
  };

  /**
   * I handle parsing a url string and returning the query object.
   * @param {String} url - The url to parse
   * @return {Object} A object map of name/value pairs
   */

  Router.prototype._getUrlQuery = function _getUrlQuery(url) {
    var re = /(?:\?|&(?:amp;)?)([^=&#]+)(?:=?([^&#]*))/g,
        match,
        params = {};

    if (typeof url === 'undefined') {
      url = window.location.href;
    }
    var decode = function decode(s) {
      return decodeURIComponent(s.replace(/\+/g, ' '));
    };
    while (match = re.exec(url)) {
      params[decode(match[1])] = decode(match[2]);
    }

    this.log.logApi('getUrlQuery', url);
    return params;
  };

  /**
   * Create a RegExp Route from a string. Taken from https://github.com/EngineeringMode/Grapnel.js/blob/master/src/grapnel.js#L49
   * @example
    var router = new px.mobile.Router()
        router._regexRoute('/users/:action/:id', [':action', ':id']);
        => /^\/users\/(?:([^\/]+?))\/(?:([^\/]+?))\/?$/i
    * @param {String} path - Path of route
   * @param {Array} keys - Array of keys to fill
   * @param {Bool} sensitive - Case sensitive comparison
   * @param {Bool} strict - Strict mode
   * @return {RegExp} A new regular expression
   */

  Router.prototype._regexRoute = function _regexRoute(path, keys, sensitive, strict) {
    if (path instanceof RegExp) {
      return path;
    }
    if (path instanceof Array) {
      path = '(' + path.join('|') + ')';
    }
    path = path.concat(strict ? '' : '/?').replace(/\/\(/g, '(?:/').replace(/\+/g, '__plus__').replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function (_, slash, format, key, capture, optional) {
      keys.push({
        name: key,
        optional: !!optional
      });
      slash = slash || '';
      return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')' + (optional || '');
    }).replace(/([\/.])/g, '\\$1').replace(/__plus__/g, '(.+)').replace(/\*/g, '(.*)');

    return new RegExp('^' + path + '$', sensitive ? '' : 'i');
  };

  // TODO:
  /*
   // Set pages classess for animationEnd
     animatePages: function (leftPage, rightPage, direction, view) {
         // Loading new page
         var removeClasses = 'page-on-center page-on-right page-on-left';
         if (direction === 'to-left') {
             leftPage.removeClass(removeClasses).addClass('page-from-center-to-left');
             rightPage.removeClass(removeClasses).addClass('page-from-right-to-center');
         }
         // Go back
         if (direction === 'to-right') {
             leftPage.removeClass(removeClasses).addClass('page-from-left-to-center');
             rightPage.removeClass(removeClasses).addClass('page-from-center-to-right');
          }
     },
   */

  return Router;
})(_base2['default']);

exports['default'] = Router;

},{"./base":3,"./pubsub":16}],18:[function(require,module,exports){
// TODO: Service Location
/**
 * A simple Service Locator that handles regisering services and resolving services.
 * @example
 var app = new px.mobile.App();

 app.register('router', new px.mobile.Router('default', {
   routes: {
     '/users': {
       callback: function(req, res) {
         console.warn('route callback', req, res);
       },
       resolve: {
         users: function() {
           return new Promise(function(resolve, reject) {
             setTimeout(function() {
               resolve({});
             }, 5000);
           });
         }
       }
     }
   }
 }));
 */
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var _instance = null;
var _services = {};

var ServiceLocator = (function () {
  function ServiceLocator(options) {
    _classCallCheck(this, ServiceLocator);

    this.services = _services;
    this.options = options || {};
    return this;
  }

  ServiceLocator.prototype.register = function register(key, service) {
    _services[key] = service;
    return this;
  };

  ServiceLocator.prototype.resolve = function resolve(key) {
    return _services[key];
  };

  /**
   * I start a service by calling the start() method on the service.
   */

  ServiceLocator.prototype.start = function start(key) {
    var service = _services[key];
    console.warn('Starting service', key, service);
    return service.start();
  };

  ServiceLocator.prototype.startAll = function startAll() {
    var all = [];
    console.warn('startAll', _services);
    for (var service in _services) {
      console.warn('Starting service', service);
      all.push(this.start(service));
    }
    return all;
  };

  ServiceLocator.prototype.reset = function reset() {
    _services = {};
    return this;
  };

  /**
   * Return the ServiceLocator _instance.
   * @return the _instance.
   */

  ServiceLocator.getInstance = function getInstance() {
    if (_instance == null) {
      _instance = new ServiceLocator();
    }
    return _instance;
  };

  return ServiceLocator;
})();

exports['default'] = ServiceLocator;
module.exports = exports['default'];

},{}],19:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

// TODO: Experiment

/**
 * Simple Router Experiment
 * @example
 // configuration
Router.config({ mode: 'history'});

// returning the user to the initial state
Router.navigate();

// adding routes
Router
.add(/about/, function() {
    console.log('about');
})
.add(/products\/(.*)\/edit\/(.*)/, function() {
    console.log('products', arguments);
})
.add(function() {
    console.log('default');
})
.check('/products/12/edit/22').listen();

// forwarding
Router.navigate('/about');
 */

var SimpleRouter = (function (_BaseClass) {
  _inherits(SimpleRouter, _BaseClass);

  /**
   * This is the Router class constructor
   * @constructor
   * @param {String} name - The name of the router
   * @param {Object} options - The options for the router
   */

  function SimpleRouter(name, options) {
    _classCallCheck(this, SimpleRouter);

    name = name + '.Router';
    _BaseClass.call(this, name, options);

    this.routes = {};

    this.routeMap = new Map();

    //Could be 'hash' or 'history' showing if we use the History API or not
    this.mode = options.hash || 'hash';

    //the root URL path of the application. It is needed only if we use pushState.
    this.root = options.root || '/';

    this.urlPrefix = options.urlPrefix || '!#!';

    this.mixin(options);

    this.config(options);

    return this;
  }

  SimpleRouter.prototype.config = function config(options) {
    this.mode = options && options.mode && options.mode === 'history' && !!history.pushState ? 'history' : 'hash';
    this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';
    if (options && options.routes) {
      for (var route in options.routes) {
        this.add(route, options.routes[route]);
        console.warn('Adding route', route);
      }
    }
    return this;
  };

  /**
   * Remove the slashes from the beginning and from the end of the string.
   */

  SimpleRouter.prototype.clearSlashes = function clearSlashes(path) {
    return path.toString().replace(/\/$/, '').replace(/^\//, '');
  };

  SimpleRouter.prototype.getFragment = function getFragment() {
    var fragment = '';
    if (this.mode === 'history') {
      fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
      fragment = fragment.replace(/\?(.*)$/, '');
      fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
    } else {
      var match = window.location.href.match(/#(.*)$/);
      fragment = match ? match[1] : '';
    }
    return this.clearSlashes(fragment);
  };

  /**
   * Handle adding a route to the Router.
   * @example
   * //Code
   * @param {RegExp} re - Regular expression to match route against.
   * @param {Function} handler - Callback function to invoke when route matches.
   * @return {SimpleRouter} Returns instance of the router.
   */

  SimpleRouter.prototype.add = function add(re, handler) {
    if (typeof re === 'function') {
      handler = re;
      re = '';
    }
    /*
          this.routes.push({
            re: re,
            handler: handler
          });
          */
    this.routes[re] = {
      re: re,
      handler: handler
    };
    return this;
  };

  /**
   * Handle removing a param from the handler
   * @example
   * //Code
   */

  SimpleRouter.prototype.remove = function remove(param) {
    for (var i = 0, r; i < this.routes.length, r = this.routes[i]; i++) {
      if (r.handler === param || r.re.toString() === param.toString()) {
        this.routes.splice(i, 1);
        return this;
      }
    }
    return this;
  };

  /**
   * Handle flusing all the routes.
   * @example
   * //Code
   */

  SimpleRouter.prototype.flush = function flush() {
    this.routes = [];
    this.mode = null;
    this.root = '/';
    return this;
  };

  /**
   * Handle invoking a route which triggers the callback handler.
   * @example
   * //Code
   */

  SimpleRouter.prototype.check = function check(f) {
    var fragment = f || this.getFragment();

    for (var r in this.routes) {
      var match = fragment.match(this.routes[r].re);
      if (match) {
        //match.shift();
        this.routes[r].handler.apply({}, match);
        return this;
      }
    }
    return this;
  };

  /**
   * Handle starting the route which then listens for changes.
   * @example
   * //Code
   */

  SimpleRouter.prototype.listen = function listen() {
    var self = this;
    var current = self.getFragment();
    var fn = function fn() {
      if (current !== self.getFragment()) {
        current = self.getFragment();
        self.check(current);
        console.warn('Checking route', current);
      }
    };
    clearInterval(this.interval);
    this.interval = setInterval(fn, 50);
    return this;
  };

  /**
   * Handle changing the current routes location.
   * @example
   * //Code
   */

  SimpleRouter.prototype.navigate = function navigate(path) {
    path = path ? path : '';
    if (this.mode === 'history') {
      history.pushState(null, null, this.root + this.clearSlashes(path));
    } else {
      window.location.href.match(/#(.*)$/);
      window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
    }
    return this;
  };

  /**
   * Create a RegExp Route from a string. Taken from https://github.com/EngineeringMode/Grapnel.js/blob/master/src/grapnel.js#L49
   * @example
    var router = new px.mobile.Router()
        router._regexRoute('/users/:action/:id', [':action', ':id']);
        => /^\/users\/(?:([^\/]+?))\/(?:([^\/]+?))\/?$/i
    * @param {String} path - Path of route
   * @param {Array} keys - Array of keys to fill
   * @param {Bool} sensitive - Case sensitive comparison
   * @param {Bool} strict - Strict mode
   * @return {RegExp} A new regular expression
   */

  SimpleRouter.prototype.regexRoute = function regexRoute(path, keys, sensitive, strict) {
    if (path instanceof RegExp) {
      return path;
    }
    if (path instanceof Array) {
      path = '(' + path.join('|') + ')';
    }
    path = path.concat(strict ? '' : '/?').replace(/\/\(/g, '(?:/').replace(/\+/g, '__plus__').replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function (_, slash, format, key, capture, optional) {
      keys.push({
        name: key,
        optional: !!optional
      });
      slash = slash || '';
      return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')' + (optional || '');
    }).replace(/([\/.])/g, '\\$1').replace(/__plus__/g, '(.+)').replace(/\*/g, '(.*)');

    return new RegExp('^' + path + '$', sensitive ? '' : 'i');
  };

  return SimpleRouter;
})(_base2['default']);

exports['default'] = SimpleRouter;
module.exports = exports['default'];

},{"./base":3}],20:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.resolveURL = resolveURL;
exports.extend = extend;
exports.extendDeep = extendDeep;
exports.extendClass = extendClass;
exports.type = type;
exports.addMixin = addMixin;
exports.debounce = debounce;
exports.mixin = mixin;
exports.mix = mix;
exports.uuid = uuid;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function resolveURL() {
  var base, i, key, len, path, queryString, value;
  base = arguments[0];
  len = arguments.length;
  queryString = '';
  i = 1;
  while (i < len) {
    path = arguments[i];
    if (!path) {
      i++;
      continue;
    }
    if (typeof path === 'object') {

      /*jshint -W089 */
      for (key in path) {
        if (queryString.length > 0) {
          queryString += '&';
        }
        value = path[key];
        queryString += key + '=' + value;
        i++;
      }
      continue;
    }
    if (path && path.indexOf('/') !== 0) {
      path = '/' + path;
    }
    if (base.substr(base.length - 1) === '/') {
      base = base.substr(0, base.length - 1);
    }
    base += path;
    i++;
  }
  if (queryString.length > 0) {
    base += '?' + queryString;
  }
  return base;
}

function extend(dest, src) {
  var out = dest;
  for (var i in src) {
    out[i] = src[i];
  }
  return out;
}

function extendDeep(parent, child) {
  var i,
      toStr = Object.prototype.toString,
      astr = '[object Array]';
  child = child || {};
  for (i in parent) {
    if (parent.hasOwnProperty(i)) {
      if (typeof parent[i] === 'object') {
        child[i] = toStr.call(parent[i]) === astr ? [] : {};
        extendDeep(parent[i], child[i]);
      } else {
        child[i] = parent[i];
      }
    }
  }
  return child;
}

//https://coffeescript-cookbook.github.io/chapters/classes_and_objects/mixins

function extendClass(child, parent) {
  var hasProp = ({}).hasOwnProperty;
  for (var key in parent) {
    if (hasProp.call(parent, key)) {
      child[key] = parent[key];
    }
  }
  /* jshint ignore:start */
  function ctor() {
    this.constructor = child;
  }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
  child.__super__ = parent.prototype;
  /* jshint ignore:end */
  return child;
}

/**
 This function was modeled on jQuery's $.type function.
 https://coffeescript-cookbook.github.io/chapters/classes_and_objects/type-function
 */

function type(obj) {
  var classToType;
  if (obj === void 0 || obj === null) {
    return String(obj);
  }
  classToType = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regexp',
    '[object Object]': 'object'
  };
  return classToType[Object.prototype.toString.call(obj)];
}

//http://www.joezimjs.com/javascript/javascript-mixins-functional-inheritance/

function addMixin(obj, mixin) {
  return this.extend(mixin, obj);
}

function debounce(name, func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;
    var later = function later() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

function mixin(target, source) {
  target = target.prototype;
  source = source.prototype;

  Object.getOwnPropertyNames(source).forEach(function (name) {
    if (name !== 'constructor') {
      Object.defineProperty(target, name, Object.getOwnPropertyDescriptor(source, name));
    }
  });
}

function mix() {
  var arg,
      prop,
      child = {};
  for (arg = 0; arg < arguments.length; arg += 1) {
    for (prop in arguments[arg]) {
      if (arguments[arg].hasOwnProperty(prop)) {
        child[prop] = arguments[arg][prop];
      }
    }
  }
  return child;
}

/*!
 Math.uuid.js (v1.4)
 http://www.broofa.com
 mailto:robert@broofa.com
 Copyright (c) 2010 Robert Kieffer
 Dual licensed under the MIT and GPL licenses.
 */

/*
 * Generate a random uuid.
 *
 * USAGE: Math.uuid(length, radix)
 *   length - the desired number of characters
 *   radix  - the number of allowable values for each character.
 *
 * EXAMPLES:
 *   // No arguments  - returns RFC4122, version 4 ID
 *   >>> Math.uuid()
 *   "92329D39-6F5C-4520-ABFC-AAB64544E172"
 *
 *   // One argument - returns ID of the specified length
 *   >>> Math.uuid(15)     // 15 character ID (default base=62)
 *   "VcydxgltxrVZSTV"
 *
 *   // Two arguments - returns ID of the specified length, and radix.
 *   // (Radix must be <= 62)
 *   >>> Math.uuid(8, 2)  // 8 character ID (base=2)
 *   "01001010"
 *   >>> Math.uuid(8, 10) // 8 character ID (base=10)
 *   "47473046"
 *   >>> Math.uuid(8, 16) // 8 character ID (base=16)
 *   "098F4D35"
 */
var chars = ('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz').split('');

function getValue(radix) {
  return 0 | Math.random() * radix;
}

function uuid(len, radix) {
  radix = radix || chars.length;
  var out = '';
  var i = -1;

  if (len) {
    // Compact form
    while (++i < len) {
      out += chars[getValue(radix)];
    }
    return out;
  }
  // rfc4122, version 4 form
  // Fill in random data.  At i==19 set the high bits of clock sequence as
  // per rfc4122, sec. 4.1.5
  while (++i < 36) {
    switch (i) {
      case 8:
      case 13:
      case 18:
      case 23:
        out += '-';
        break;
      case 19:
        out += chars[getValue(16) & 0x3 | 0x8];
        break;
      default:
        out += chars[getValue(16)];
    }
  }

  return out;
}

//http://jscriptpatterns.blogspot.com/2013/01/javascript-interfaces.html
/**
 Usage:
 var IExample = new Interface('Example', ['add', 'remove', 'get']);
 var ExampleClass = {
  add: function(){},
  remove: function(){},
  get: function(){}
};

 Interface.ensureImplements(ExampleClass, IExample)
 */
// Constructor.
function Interface(name, methods) {

  if (arguments.length !== 2) {
    throw new Error("Interface constructor called with " + arguments.length + "arguments, but expected exactly 2.");
  }

  this.name = name;
  this.methods = [];

  for (var i = 0, len = methods.length; i < len; i++) {
    if (typeof methods[i] !== 'string') {
      throw new Error("Interface constructor expects method names to be passed in as a string.");
    }

    this.methods.push(methods[i]);
  }
}

// Static class method.
Interface.ensureImplements = function (object) {
  if (arguments.length < 2) {
    throw new Error('Function Interface.ensureImplements called with ' + arguments.length + 'arguments, but expected at least 2.');
  }

  for (var i = 1, len = arguments.length; i < len; i++) {
    var _interface = arguments[i];
    if (_interface.constructor !== Interface) {
      throw new Error('Function Interface.ensureImplements expects arguments two and above to be instances of Interface.');
    }

    for (var j = 0, methodsLen = _interface.methods.length; j < methodsLen; j++) {
      var method = _interface.methods[j];
      if (!object[method] || typeof object[method] !== 'function') {
        throw new Error('Function Interface.ensureImplements: object does not implement the ' + _interface.name + ' interface. Method ' + method + ' was not found. ');
      }
    }
  }
  return true;
};

/**
 * I handle mixing classes. This generic aggregation function is usually provided by a library like this one, of course]
 */
var aggregation = function aggregation(baseClass) {
  for (var _len = arguments.length, mixins = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    mixins[_key - 1] = arguments[_key];
  }

  var base = (function (_baseClass) {
    _inherits(_Combined, _baseClass);

    function _Combined() {
      var _this = this;

      _classCallCheck(this, _Combined);

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _baseClass.call.apply(_baseClass, [this].concat(args));
      mixins.forEach(function (mixin) {
        mixin.prototype.initializer.call(_this);
      });
    }

    return _Combined;
  })(baseClass);
  var copyProps = function copyProps(target, source) {
    Object.getOwnPropertyNames(source).concat(Object.getOwnPropertySymbols(source)).forEach(function (prop) {
      if (prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/)) {
        return;
      }

      Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
    });
  };
  mixins.forEach(function (mixin) {
    copyProps(base.prototype, mixin.prototype);
    copyProps(base, mixin);
  });
  return base;
};
exports.aggregation = aggregation;

},{}],21:[function(require,module,exports){
/**
 * View class provides event dispatching.
 * @example
 * var View = new View('namespace');
       View.publish('event', {name: value});

 * @param {String} name - The name of the View.
 * @return {View} Instance of the View.
 */
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var View = (function () {
  function View(options) {
    _classCallCheck(this, View);

    console.warn('new View', options);
    this.id = options.id;
    this.params = options.params || {};
    this.url = options.url || '';
    this.main = options.main || false;
    this.element = document.createElement('px-view');
  }

  View.prototype.toHTML = function toHTML() {
    console.log(this, this.element);
  };

  return View;
})();

exports['default'] = View;
module.exports = exports['default'];

},{}],22:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _view = require('./view');

var _view2 = _interopRequireDefault(_view);

/**
 * Views class provides event dispatching.
 * @example
 * var Views = new Views('namespace');
       Views.publish('event', {name: value});

 * @param {String} name - The name of the Views.
 * @return {Views} Instance of the Views.
 */

var Views = (function (_BaseClass) {
  _inherits(Views, _BaseClass);

  function Views(options) {
    var _this = this;

    _classCallCheck(this, Views);

    _BaseClass.call(this, options.id, options);
    this.id = options.id;
    this.selected = options.selected || 0;
    this.selectedView = {};
    this.views = [];
    this.viewMap = new Map();
    //  this.router = new Router(options);

    if (options.views) {
      options.views.forEach(function (view) {
        _this.add(view);
      });
    }

    this.selectViewByIndex(this.selected);
    return this;
  }

  Views.prototype.created = function created() {
    console.warn('Views created');
  };

  Views.prototype.attached = function attached() {
    console.warn('Views attached');
  };

  Views.prototype.add = function add(v) {
    var view = new _view2['default'](v);
    view.index = this.views.length;
    this[view.id] = view;
    this.views.push(view);
    this.viewMap.set(view.id, view);
    return this;
  };

  Views.prototype.get = function get(key) {
    return this.viewMap.get(key);
  };

  Views.prototype.getViews = function getViews() {
    return this.viewMap.entries();
  };

  Views.prototype.selectView = function selectView(key) {
    console.warn('Views.selectView()', key);
    this.selectedView = this.viewMap.get(key);
    this.selected = this.views.indexOf(this.selectedView);
    return this;
  };

  Views.prototype.getSelectedView = function getSelectedView() {
    return this.selectedView;
  };

  Views.prototype.getSelectedIndex = function getSelectedIndex() {
    return this.views.indexOf(this.getSelectedView());
  };

  Views.prototype.nextView = function nextView() {
    var items = this.views,
        len = items.length,
        counter = this.selected,
        index = this.selected + 1;
    counter++;

    if (counter >= len) {
      console.warn('Reached last item');
      counter = 0;
    }
    this.selected = counter;
    this.selectView(this.views[this.selected].id);

    console.log('nextView', items, len, 'index', index, 'selected', this.selected);
    return this.selected;
  };

  Views.prototype.prevView = function prevView() {
    var items = this.views,
        len = items.length,
        counter = this.selected,
        index = this.selected;

    counter--;

    if (counter >= len) {
      counter = index - len;
    } else if (counter < 0) {
      counter = 0;
      console.warn('Reached first item');
    }
    this.selected = counter;
    this.selectView(this.views[this.selected].id);

    console.log('prevView', items, len, 'index', index, 'selected', this.selected);

    return this.selected;
  };

  Views.prototype.selectViewByIndex = function selectViewByIndex(i) {
    this.selectView(this.views[i].id);
  };

  Views.prototype.changeView = function changeView(id) {
    this.selectView(id);
  };

  return Views;
})(_base2['default']);

exports['default'] = Views;
module.exports = exports['default'];

},{"./base":3,"./view":21}]},{},[12])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcHJlZGl4Z28vR2l0aHViRW50ZXJwcmlzZU9yZ3MvUHJlZGl4Q29tcG9uZW50cy9weC1tb2JpbGUvc3JjL2pzL0hUVFAuanMiLCIvVXNlcnMvcHJlZGl4Z28vR2l0aHViRW50ZXJwcmlzZU9yZ3MvUHJlZGl4Q29tcG9uZW50cy9weC1tb2JpbGUvc3JjL2pzL2FwcC5qcyIsIi9Vc2Vycy9wcmVkaXhnby9HaXRodWJFbnRlcnByaXNlT3Jncy9QcmVkaXhDb21wb25lbnRzL3B4LW1vYmlsZS9zcmMvanMvYmFzZS5qcyIsIi9Vc2Vycy9wcmVkaXhnby9HaXRodWJFbnRlcnByaXNlT3Jncy9QcmVkaXhDb21wb25lbnRzL3B4LW1vYmlsZS9zcmMvanMvY29sbGVjdGlvbi5qcyIsIi9Vc2Vycy9wcmVkaXhnby9HaXRodWJFbnRlcnByaXNlT3Jncy9QcmVkaXhDb21wb25lbnRzL3B4LW1vYmlsZS9zcmMvanMvY29yZS5qcyIsIi9Vc2Vycy9wcmVkaXhnby9HaXRodWJFbnRlcnByaXNlT3Jncy9QcmVkaXhDb21wb25lbnRzL3B4LW1vYmlsZS9zcmMvanMvZGIuanMiLCIvVXNlcnMvcHJlZGl4Z28vR2l0aHViRW50ZXJwcmlzZU9yZ3MvUHJlZGl4Q29tcG9uZW50cy9weC1tb2JpbGUvc3JjL2pzL2RvbS5qcyIsIi9Vc2Vycy9wcmVkaXhnby9HaXRodWJFbnRlcnByaXNlT3Jncy9QcmVkaXhDb21wb25lbnRzL3B4LW1vYmlsZS9zcmMvanMvaHR0cC5qcyIsIi9Vc2Vycy9wcmVkaXhnby9HaXRodWJFbnRlcnByaXNlT3Jncy9QcmVkaXhDb21wb25lbnRzL3B4LW1vYmlsZS9zcmMvanMvaW50ZXJmYWNlLmpzIiwiL1VzZXJzL3ByZWRpeGdvL0dpdGh1YkVudGVycHJpc2VPcmdzL1ByZWRpeENvbXBvbmVudHMvcHgtbW9iaWxlL3NyYy9qcy9pbnRlcmZhY2VzLmpzIiwiL1VzZXJzL3ByZWRpeGdvL0dpdGh1YkVudGVycHJpc2VPcmdzL1ByZWRpeENvbXBvbmVudHMvcHgtbW9iaWxlL3NyYy9qcy9sb2cuanMiLCIvVXNlcnMvcHJlZGl4Z28vR2l0aHViRW50ZXJwcmlzZU9yZ3MvUHJlZGl4Q29tcG9uZW50cy9weC1tb2JpbGUvc3JjL2pzL21haW4uanMiLCIvVXNlcnMvcHJlZGl4Z28vR2l0aHViRW50ZXJwcmlzZU9yZ3MvUHJlZGl4Q29tcG9uZW50cy9weC1tb2JpbGUvc3JjL2pzL21vZGVsLmpzIiwiL1VzZXJzL3ByZWRpeGdvL0dpdGh1YkVudGVycHJpc2VPcmdzL1ByZWRpeENvbXBvbmVudHMvcHgtbW9iaWxlL3NyYy9qcy9wYWdlLmpzIiwiL1VzZXJzL3ByZWRpeGdvL0dpdGh1YkVudGVycHJpc2VPcmdzL1ByZWRpeENvbXBvbmVudHMvcHgtbW9iaWxlL3NyYy9qcy9wYWdlcy5qcyIsIi9Vc2Vycy9wcmVkaXhnby9HaXRodWJFbnRlcnByaXNlT3Jncy9QcmVkaXhDb21wb25lbnRzL3B4LW1vYmlsZS9zcmMvanMvcHVic3ViLmpzIiwiL1VzZXJzL3ByZWRpeGdvL0dpdGh1YkVudGVycHJpc2VPcmdzL1ByZWRpeENvbXBvbmVudHMvcHgtbW9iaWxlL3NyYy9qcy9yb3V0ZXIuanMiLCIvVXNlcnMvcHJlZGl4Z28vR2l0aHViRW50ZXJwcmlzZU9yZ3MvUHJlZGl4Q29tcG9uZW50cy9weC1tb2JpbGUvc3JjL2pzL3NlcnZpY2UtbG9jYXRvci5qcyIsIi9Vc2Vycy9wcmVkaXhnby9HaXRodWJFbnRlcnByaXNlT3Jncy9QcmVkaXhDb21wb25lbnRzL3B4LW1vYmlsZS9zcmMvanMvc2ltcGxlLXJvdXRlci5qcyIsIi9Vc2Vycy9wcmVkaXhnby9HaXRodWJFbnRlcnByaXNlT3Jncy9QcmVkaXhDb21wb25lbnRzL3B4LW1vYmlsZS9zcmMvanMvdXRpbHMuanMiLCIvVXNlcnMvcHJlZGl4Z28vR2l0aHViRW50ZXJwcmlzZU9yZ3MvUHJlZGl4Q29tcG9uZW50cy9weC1tb2JpbGUvc3JjL2pzL3ZpZXcuanMiLCIvVXNlcnMvcHJlZGl4Z28vR2l0aHViRW50ZXJwcmlzZU9yZ3MvUHJlZGl4Q29tcG9uZW50cy9weC1tb2JpbGUvc3JjL2pzL3ZpZXdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0NBLFlBQVksQ0FBQztBQUNiLE9BQU8sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDOztBQUUxQixTQUFTLHNCQUFzQixDQUFDLEdBQUcsRUFBRTtBQUFFLFNBQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDO0NBQUU7O0FBRWpHLFNBQVMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUU7QUFBRSxNQUFJLEVBQUUsUUFBUSxZQUFZLFdBQVcsQ0FBQSxBQUFDLEVBQUU7QUFBRSxVQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7R0FBRTtDQUFFOztBQUV6SixTQUFTLFNBQVMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFO0FBQUUsTUFBSSxPQUFPLFVBQVUsS0FBSyxVQUFVLElBQUksVUFBVSxLQUFLLElBQUksRUFBRTtBQUFFLFVBQU0sSUFBSSxTQUFTLENBQUMsMERBQTBELEdBQUcsT0FBTyxVQUFVLENBQUMsQ0FBQztHQUFFLEFBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsU0FBUyxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxBQUFDLElBQUksVUFBVSxFQUFFLE1BQU0sQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7Q0FBRTs7QUFFOWUs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QUE7O0FBdkdrQixPQUFLLENBQUEsU0FBQSxDQXlHeEIsVUFBVSxHQUFBLFNBQUEsVUFBQSxDQUFDLEVBQUUsRUFBRTtBQUNiLFFBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7R0FDckIsQ0FBQTs7QUFxQkQsU0FoSW1CLEtBQUssQ0FBQTtDQWlJekIsQ0FBQSxDQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOztBQUV0QixPQUFPLENBQUMsU0FBUyxDQUFDLEdBbklHLEtBQUssQ0FBQTtBQW9JMUIsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLypnbG9iYWxzIFJlcXVlc3QsIFByb21pc2UqL1xuJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IEJhc2VDbGFzcyBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IExvZ2dlciBmcm9tICcuL2xvZyc7XG5pbXBvcnQgSW50ZXJmYWNlcyBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG4vKipcbiAqIEhUVFAgY2xhc3MgcHJvdmlkZXMgYW4gYWJzdHJhY3Rpb24gbGF5ZXIgZm9yIEhUVFAgY2FsbHMuXG4gKiBAZXhhbXBsZVxuICogdmFyICRodHRwID0gbmV3IHB4Lm1vYmlsZS5IVFRQKCdodHRwMScsIHtcbiAqICBiYXNlVXJsOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luXG4gKiB9KTtcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFRUUCBleHRlbmRzIEJhc2VDbGFzcyB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBhIEhUVFAgc2VydmljZS5cbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHNlcnZpY2VcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgZGVmYXVsdCBvcHRpb25zIHRvIHBhc3NcbiAgICogQHJldHVybiB7SFRUUH0gQW4gaW5zdGFuY2Ugb2YgdGhlIEhUVFAgY2xhc3NcbiAgICovXG4gIGNvbnN0cnVjdG9yKG5hbWUgPSAnaHR0cCcsIG9wdGlvbnMgPSB7XG4gICAgYmFzZVVybDogJy9kZWZhdWx0J1xuICB9KSB7XG4gICAgc3VwZXIobmFtZSwgb3B0aW9ucyk7XG5cbiAgICBjb25zb2xlLndhcm4oJ0hUVFAnLCB0aGlzLCBvcHRpb25zKTtcblxuICAgIGlmICghb3B0aW9ucy5iYXNlVXJsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0hUVFA6IE11c3QgcHJvdmlkZSBhIGJhc2VVcmwnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiAgSSBoYW5kbGUgY2hlY2tpbmcgdGhlIHJlc3BvbnNlIHN0YXR1cyBjb2RlIG9mIGEgSFRUUCByZXF1ZXN0LlxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNwb25zZSBBIFJlc3BvbnNlIG9iamVjdFxuICAgKiBAcmV0dXJuIHtSZXNwb25zZX0gVGhlIG9yaWdpbmFsIHJlc3BvbnNlXG4gICAqL1xuICBjaGVja1N0YXR1cyhyZXNwb25zZSkge1xuICAgIGNvbnNvbGUud2FybihyZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLnN0YXR1c1RleHQsIHJlc3BvbnNlLnVybCwgcmVzcG9uc2UpO1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMjAwICYmIHJlc3BvbnNlLnN0YXR1cyA8IDMwMCkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG4gICAgICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJIGhhbmRsZSBwYXJzaW5nIHRoZSBKU09OIG9mIGEgcmVzcG9uc2UuXG4gICAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc3BvbnNlIEEgUmVzcG9uc2Ugb2JqZWN0XG4gICAqIEByZXR1cm4ge1Jlc3BvbnNlfSBUaGUgb3JpZ2luYWwgcmVzcG9uc2Ugd2l0aCBhIGRhdGEgcHJvcGVydHkgdGhhdCBpcyB0aGUgcGFyc2VkIEpTT05cbiAgICovXG4gIHBhcnNlSlNPTihyZXNwb25zZSkge1xuICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwYXNzIGEgcmVzcG9uc2Ugb2JqZWN0IHRvIHBhcnNlSlNPTiEnKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKS50aGVuKGZ1bmN0aW9uKGpzb24pIHtcbiAgICAgIHJlc3BvbnNlLmRhdGEgPSBqc29uO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqICBJIG1ha2UgYSBIVFRQIHJlcXVlc3QgZm9yIEpTT04uXG4gICAqIEBleGFtcGxlXG4gICAqICRodHRwLmdldEpTT04oJy9kZWZhdWx0L19hbGxfZG9jcycsIHtsaW1pdDogNX0pLnRoZW4oZnVuY3Rpb24ocmVzcCl7XG4gICAqICAgIC8vaGFuZGxlIGpzb25cbiAgICogfSkuY2F0Y2goZnVuY3Rpb24oZXJyKXtcbiAgICogICAgLy9oYW5kbGUgZXJyb3JcbiAgICogfSk7XG4gICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgLSBUaGUgdXJsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gUmVxdWVzdCBvcHRpb25zIG9iamVjdFxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyBhIHJlc3BvbnNlXG4gICAqL1xuICBnZXRKU09OKHVybCA9ICcnLCBvcHRpb25zID0ge30pIHtcbiAgICBsZXQgcmVxID0gbmV3IFJlcXVlc3QodXJsLCBvcHRpb25zIHx8IHtcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KTtcbiAgICByZXR1cm4gZmV0Y2gocmVxKVxuICAgICAgLnRoZW4odGhpcy5jaGVja1N0YXR1cylcbiAgICAgIC50aGVuKHRoaXMucGFyc2VKU09OKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcmVzcG9uc2Ugb2JqZWN0IGhhcyB0aGVzZSBwcm9wZXJ0aWVzOlxuICAgKiBAZXhhbXBsZVxuICAgKiAkaHR0cC5yZXF1ZXN0KCcvZGVmYXVsdCcsIHtcbiAgICogICAgbWV0aG9kOiAnUE9TVCcsXG4gICAqICAgIGRhdGE6IGRhdGFcbiAgICogfSkudGhlbihmdW5jdGlvbihyZXNwKXtcbiAgICogICAgLy9oYW5kbGUgcmVzcG9uc2VcbiAgICogfSkuY2F0Y2goZnVuY3Rpb24oZXJyKXtcbiAgICogICAgLy9oYW5kbGUgZXJyb3JcbiAgICogfSk7XG4gICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgLSBUaGUgdXJsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3B0aW9ucyB0byBwYXNzXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIGEgcmVzcG9uc2VcbiAgICovXG4gIHJlcXVlc3QodXJsLCBvcHRpb25zKSB7XG4gICAgdmFyIGNvbmZpZyA9IHRoaXMudXRpbHMuZXh0ZW5kKHtcbiAgICAgIGRhdGE6IG51bGwsXG4gICAgICBwYXJhbXM6IG51bGwsXG4gICAgICBib2R5OiBudWxsLFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfVxuICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgaWYgKG9wdGlvbnMuZGF0YSkge1xuICAgICAgY29uZmlnLmJvZHkgPSBKU09OLnN0cmluZ2lmeShvcHRpb25zLmRhdGEpO1xuICAgICAgZGVsZXRlIGNvbmZpZy5kYXRhO1xuICAgIH1cblxuICAgIHVybCA9IHRoaXMudXRpbHMucmVzb2x2ZVVSTCh0aGlzLmJhc2VVcmwsIHVybCk7XG4gICAgLy91cmwgPSB0aGlzLnV0aWxzLnJlc29sdmVVUkwodXJsKTtcblxuICAgIGlmIChvcHRpb25zLnBhcmFtcykge1xuICAgICAgdXJsID0gdGhpcy51dGlscy5yZXNvbHZlVVJMKHVybCwgb3B0aW9ucy5wYXJhbXMpO1xuICAgICAgZGVsZXRlIG9wdGlvbnMucGFyYW1zO1xuICAgIH1cblxuICAgIC8vdGhpcy5sb2cubG9nQXBpKGByZXF1ZXN0ID0+ICR7dXJsfWAsIGNvbmZpZyk7XG4gICAgdGhpcy5sb2cubG9nSHR0cChjb25maWcubWV0aG9kLCB1cmwpO1xuXG5cbiAgICBsZXQgYmVuY2htYXJrID0gdGhpcy5sb2cubG9nVGltZSgncmVxdWVzdCcpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICByZXR1cm4gZmV0Y2gobmV3IFJlcXVlc3QodXJsLCBjb25maWcpKS50aGVuKChyZXNwKSA9PiB7XG4gICAgICAgIHRoaXMubG9nLmxvZ0h0dHAocmVzcC5zdGF0dXMgKyAnICcgKyBiZW5jaG1hcmsuZW5kKCksIHJlc3AsIHRydWUpO1xuICAgICAgICAvL3JldHVybiB0aGlzLnBhcnNlSlNPTihyZXNwKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIHJlc3AuZGF0YSA9IHt9O1xuICAgICAgICByZXNvbHZlKHJlc3ApO1xuICAgICAgfSwgcmVqZWN0KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJIG1ha2UgYSBIVFRQIEdFVCByZXF1ZXN0LlxuICAgKiBAZXhhbXBsZVxuICAgKiAkaHR0cC5nZXQoJy9kZWZhdWx0L19hbGxfZG9jcycsIHtsaW1pdDogNX0pLnRoZW4oZnVuY3Rpb24ocmVzcCl7XG4gICAqICAgIC8vaGFuZGxlIHJlc3A6UmVzcG9uc2VcbiAgICogfSkuY2F0Y2goZnVuY3Rpb24oZXJyKXtcbiAgICogICAgLy9oYW5kbGUgZXJyb3JcbiAgICogfSk7XG4gICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIHVybFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBPcHRpb25zIHRvIHBhc3NcbiAgICogQHJldHVybiB7UHJvbWlzZX0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgYSByZXNwb25zZVxuICAgKi9cbiAgZ2V0KHVybCA9ICcnLCBvcHRpb25zID0ge30pIHtcbiAgICB0aGlzLmxvZy5sb2dBcGkoJ2dldCcsIG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXJsLCBvcHRpb25zKS50aGVuKHRoaXMucGFyc2VKU09OKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJIG1ha2UgYSBIVFRQIFBVVCByZXF1ZXN0LlxuICAgKiBAZXhhbXBsZVxuICAkaHR0cC5wdXQoJy9kZWZhdWx0L2lkJywge25hbWU6ICd2YWx1ZSd9KS50aGVuKGZ1bmN0aW9uKHJlc3Ape1xuICAgIC8vaGFuZGxlIHJlc3A6UmVzcG9uc2VcbiAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKXtcbiAgICAvL2hhbmRsZSBlcnJvclxuICB9KTtcblxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSB1cmxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgT3B0aW9ucyB0byBwYXNzXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIGEgcmVzcG9uc2VcbiAgICovXG4gIHB1dCh1cmwgPSAnJywgZGF0YSA9IG51bGwsIG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMubG9nLmxvZ0FwaSgncHV0JywgZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1cmwsIHRoaXMudXRpbHMuZXh0ZW5kKHtcbiAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSwgb3B0aW9ucykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEkgbWFrZSBhIEhUVFAgUE9TVCByZXF1ZXN0LlxuICAgKiBAZXhhbXBsZVxuICRodHRwLnBvc3QoJy9kZWZhdWx0Jywge25hbWU6ICd2YWx1ZSd9KS50aGVuKGZ1bmN0aW9uKHJlc3Ape1xuICAgLy9oYW5kbGUgcmVzcDpSZXNwb25zZVxuIH0pLmNhdGNoKGZ1bmN0aW9uKGVycil7XG4gICAvL2hhbmRsZSBlcnJvclxuIH0pO1xuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIHVybFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBPcHRpb25zIHRvIHBhc3NcbiAgICogQHJldHVybiB7UHJvbWlzZX0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgYSByZXNwb25zZVxuICAgKi9cbiAgcG9zdCh1cmwgPSAnJywgZGF0YSA9IG51bGwsIG9wdGlvbnMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXJsLCB0aGlzLnV0aWxzLmV4dGVuZCh7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9LCBvcHRpb25zKSk7XG4gIH1cblxuICAvKipcbiAgICogSSBtYWtlIGEgSFRUUCBERUxFVEUgcmVxdWVzdC5cbiAgICogQGV4YW1wbGVcbiAkaHR0cC5kZWxldGUoJy9kZWZhdWx0L2lkJykudGhlbihmdW5jdGlvbihyZXNwKXtcbiAgIC8vaGFuZGxlIHJlc3A6UmVzcG9uc2VcbiB9KS5jYXRjaChmdW5jdGlvbihlcnIpe1xuICAgLy9oYW5kbGUgZXJyb3JcbiB9KTtcblxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSB1cmxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgT3B0aW9ucyB0byBwYXNzXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIGEgcmVzcG9uc2VcbiAgICovXG4gIGRlbGV0ZSh1cmwgPSAnJywgb3B0aW9ucyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1cmwsIHRoaXMudXRpbHMuZXh0ZW5kKHtcbiAgICAgIG1ldGhvZDogJ0RFTEVURSdcbiAgICB9LCBvcHRpb25zKSk7XG4gIH1cblxuICAvKipcbiAgICogSSBtYWtlIGEgSFRUUCBIRUFEIHJlcXVlc3QuXG4gICAqIEBleGFtcGxlXG4gICRodHRwLmhlYWQoJy9kZWZhdWx0L2lkJykudGhlbihmdW5jdGlvbihyZXNwKXtcbiAgICAvL2hhbmRsZSByZXNwOlJlc3BvbnNlXG4gIH0pLmNhdGNoKGZ1bmN0aW9uKGVycil7XG4gICAgLy9oYW5kbGUgZXJyb3JcbiAgfSk7XG5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgdXJsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIE9wdGlvbnMgdG8gcGFzc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyBhIHJlc3BvbnNlXG4gICAqL1xuICBoZWFkKHVybCA9ICcnLCBvcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHVybCwgdGhpcy51dGlscy5leHRlbmQoe1xuICAgICAgbWV0aG9kOiAnSEVBRCdcbiAgICB9LCBvcHRpb25zKSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IENvcmUgZnJvbSAnLi9jb3JlJztcbi8vaW1wb3J0IFJvdXRlciBmcm9tICcuL3JvdXRlcic7XG5pbXBvcnQgU2VydmljZUxvY2F0b3IgZnJvbSAnLi9zZXJ2aWNlLWxvY2F0b3InO1xubGV0IF9pbnN0YW5jZSA9IG51bGw7XG4vKipcbiAqIFRoZSBBcHAgY2xhc3MgaXMgdXNlZCB0byBtYW5hZ2UgdGhlIHN0YXRlIG9mIGFuIGFwcGxpY2F0aW9uLlxuICogQGV4YW1wbGVcbiAqXHR2YXIgYXBwID0gbmV3IHB4Lm1vYmlsZS5BcHAoJ215QXBwJywge1xuICpcdGRlYnVnOiB0cnVlLFxuICpcdHZpZXdDb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHBWaWV3cycpLFxuICpcdG5hdmJhcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdmJhcicpLFxuICpcdGVsOiAnI2VtQXBwJyxcbiAqXHRzZXNzaW9uOiB7XG4gKlx0XHR1c2VyOiBudWxsXG4gKlx0fVxuICogfSk7XG4gKiB2YXIgcHVic3ViID0gbmV3IHB4Lm1vYmlsZS5QdWJTdWIoJ2VtUHViU3ViJyk7XG4gKiB2YXIgZGIgPSBuZXcgcHgubW9iaWxlLkRCKCdlbURCJywge1xuICogICAgYmFzZVVybDogJ2h0dHA6Ly9wbWFwaS9jZGIvcHJlZGl4Z28nXG4gKiB9KTtcbiAqIHZhciBodHRwID0gbmV3IHB4Lm1vYmlsZS5IVFRQKCdlbUhUVFAnLCB7XG4gKiAgIGJhc2VVcmw6ICcvJ1xuICogfSk7XG4gKiBhcHAuc2VydmljZXMucmVnaXN0ZXIoJ2RiJywgZGIpO1xuICogYXBwLnNlcnZpY2VzLnJlZ2lzdGVyKCdodHRwJywgaHR0cCk7XG4gKiBhcHAuc2VydmljZXMucmVnaXN0ZXIoJ3B1YnN1YicsIHB1YnN1Yik7XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcCBleHRlbmRzIENvcmUge1xuICAvKipcbiAgICogUmV0dXJuIHRoZSBTZXJ2aWNlTG9jYXRvciBfaW5zdGFuY2UuXG4gICAqIEByZXR1cm4gdGhlIF9pbnN0YW5jZS5cbiAgICovXG4gIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICBpZiAoX2luc3RhbmNlID09PSBudWxsKSB7XG4gICAgICBfaW5zdGFuY2UgPSBuZXcgQXBwKCk7XG4gICAgfVxuICAgIHJldHVybiBfaW5zdGFuY2U7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihuYW1lLCBvcHRpb25zKSB7XG4gICAgc3VwZXIobmFtZSwgb3B0aW9ucyk7XG4gICAgdGhpcy5tb2R1bGVzID0ge307XG4gICAgdGhpcy5zZXNzaW9uID0ge307XG4gICAgLy8gIHRoaXMucm91dGVyID0gbmV3IFJvdXRlcigpO1xuICAgIHRoaXMuc2VydmljZXMgPSBuZXcgU2VydmljZUxvY2F0b3IoKTtcblxuICAgIC8vIERlZmF1bHQgUGFyYW1ldGVyc1xuICAgIHRoaXMucGFyYW1zID0ge1xuXG4gICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgIGNhY2hlSWdub3JlOiBbXSxcbiAgICAgIGNhY2hlSWdub3JlR2V0UGFyYW1ldGVyczogZmFsc2UsXG4gICAgICBjYWNoZUR1cmF0aW9uOiAxMDAwICogNjAgKiAxMCwgLy8gVGVuIG1pbnV0ZXNcbiAgICAgIHByZWxvYWRQcmV2aW91c1BhZ2U6IHRydWUsXG4gICAgICB1bmlxdWVIaXN0b3J5OiBmYWxzZSxcbiAgICAgIHVuaXF1ZUhpc3RvcnlJZ25vcmVHZXRQYXJhbWV0ZXJzOiBmYWxzZSxcbiAgICAgIGR5bmFtaWNQYWdlVXJsOiAnY29udGVudC17e2luZGV4fX0nLFxuICAgICAgYWxsb3dEdXBsaWNhdGVVcmxzOiBmYWxzZSxcbiAgICAgIHJvdXRlcjogdHJ1ZSxcblxuICAgICAgLy8gUHVzaCBTdGF0ZVxuICAgICAgcHVzaFN0YXRlOiBmYWxzZSxcbiAgICAgIHB1c2hTdGF0ZVJvb3Q6IHVuZGVmaW5lZCxcbiAgICAgIHB1c2hTdGF0ZU5vQW5pbWF0aW9uOiBmYWxzZSxcbiAgICAgIHB1c2hTdGF0ZVNlcGFyYXRvcjogJyMhLycsXG4gICAgICBwdXNoU3RhdGVQcmV2ZW50T25Mb2FkOiB0cnVlLFxuXG4gICAgICAvLyBGYXN0IGNsaWNrc1xuICAgICAgZmFzdENsaWNrczogdHJ1ZSxcbiAgICAgIGZhc3RDbGlja3NEaXN0YW5jZVRocmVzaG9sZDogMTAsXG4gICAgICBmYXN0Q2xpY2tzRGVsYXlCZXR3ZWVuQ2xpY2tzOiA1MCxcblxuICAgICAgLy8gVGFwIEhvbGRcbiAgICAgIHRhcEhvbGQ6IGZhbHNlLFxuICAgICAgdGFwSG9sZERlbGF5OiA3NTAsXG4gICAgICB0YXBIb2xkUHJldmVudENsaWNrczogdHJ1ZSxcblxuICAgICAgLy8gQWN0aXZlIFN0YXRlXG4gICAgICBhY3RpdmVTdGF0ZTogdHJ1ZSxcbiAgICAgIGFjdGl2ZVN0YXRlRWxlbWVudHM6ICdhLCBidXR0b24sIGxhYmVsLCBzcGFuJyxcblxuICAgICAgLy8gQW5pbWF0ZSBOYXYgQmFjayBJY29uXG4gICAgICBhbmltYXRlTmF2QmFja0ljb246IGZhbHNlLFxuXG4gICAgICAvLyBTd2lwZSBCYWNrXG4gICAgICBzd2lwZUJhY2tQYWdlOiB0cnVlLFxuICAgICAgc3dpcGVCYWNrUGFnZVRocmVzaG9sZDogMCxcbiAgICAgIHN3aXBlQmFja1BhZ2VBY3RpdmVBcmVhOiAzMCxcbiAgICAgIHN3aXBlQmFja1BhZ2VBbmltYXRlU2hhZG93OiB0cnVlLFxuICAgICAgc3dpcGVCYWNrUGFnZUFuaW1hdGVPcGFjaXR5OiB0cnVlLFxuXG4gICAgICAvLyBBamF4XG4gICAgICBhamF4TGlua3M6IHVuZGVmaW5lZCwgLy8gb3IgQ1NTIHNlbGVjdG9yXG5cbiAgICAgIC8vIEV4dGVybmFsIExpbmtzXG4gICAgICBleHRlcm5hbExpbmtzOiAnLmV4dGVybmFsJywgLy8gQ1NTIHNlbGVjdG9yXG5cbiAgICAgIC8vIFNvcnRhYmxlXG4gICAgICBzb3J0YWJsZTogdHJ1ZSxcblxuICAgICAgLy8gU2Nyb2xsIHRvb2xiYXJzXG4gICAgICBoaWRlTmF2YmFyT25QYWdlU2Nyb2xsOiBmYWxzZSxcbiAgICAgIGhpZGVUb29sYmFyT25QYWdlU2Nyb2xsOiBmYWxzZSxcbiAgICAgIGhpZGVUYWJiYXJPblBhZ2VTY3JvbGw6IGZhbHNlLFxuICAgICAgc2hvd0JhcnNPblBhZ2VTY3JvbGxFbmQ6IHRydWUsXG4gICAgICBzaG93QmFyc09uUGFnZVNjcm9sbFRvcDogdHJ1ZSxcblxuICAgICAgLy8gVGFwIE5hdmJhciBvciBTdGF0dXNiYXIgdG8gc2Nyb2xsIHRvIHRvcFxuICAgICAgc2Nyb2xsVG9wT25OYXZiYXJDbGljazogZmFsc2UsXG4gICAgICBzY3JvbGxUb3BPblN0YXR1c2JhckNsaWNrOiBmYWxzZSxcblxuICAgICAgLy8gTW9kYWxzXG4gICAgICBtb2RhbEJ1dHRvbk9rOiAnT0snLFxuICAgICAgbW9kYWxCdXR0b25DYW5jZWw6ICdDYW5jZWwnLFxuICAgICAgbW9kYWxVc2VybmFtZVBsYWNlaG9sZGVyOiAnVXNlcm5hbWUnLFxuICAgICAgbW9kYWxQYXNzd29yZFBsYWNlaG9sZGVyOiAnUGFzc3dvcmQnLFxuICAgICAgbW9kYWxUaXRsZTogJ0FwcCcsXG4gICAgICBtb2RhbENsb3NlQnlPdXRzaWRlOiBmYWxzZSxcbiAgICAgIGFjdGlvbnNDbG9zZUJ5T3V0c2lkZTogdHJ1ZSxcbiAgICAgIHBvcHVwQ2xvc2VCeU91dHNpZGU6IHRydWUsXG4gICAgICBtb2RhbFByZWxvYWRlclRpdGxlOiAnTG9hZGluZy4uLiAnLFxuICAgICAgbW9kYWxTdGFjazogdHJ1ZSxcblxuICAgICAgLy8gTGF6eSBMb2FkXG4gICAgICBpbWFnZXNMYXp5TG9hZFRocmVzaG9sZDogMCxcbiAgICAgIGltYWdlc0xhenlMb2FkU2VxdWVudGlhbDogdHJ1ZSxcblxuICAgICAgLy8gTmFtZSBzcGFjZVxuICAgICAgdmlld0NsYXNzOiAndmlldycsXG4gICAgICB2aWV3TWFpbkNsYXNzOiAndmlldy1tYWluJyxcbiAgICAgIHZpZXdzQ2xhc3M6ICd2aWV3cycsXG5cbiAgICAgIC8vIE5vdGlmaWNhdGlvbnMgZGVmYXVsdHNcbiAgICAgIG5vdGlmaWNhdGlvbkNsb3NlT25DbGljazogZmFsc2UsXG4gICAgICBub3RpZmljYXRpb25DbG9zZUljb246IHRydWUsXG4gICAgICBub3RpZmljYXRpb25DbG9zZUJ1dHRvblRleHQ6ICdDbG9zZScsXG5cbiAgICAgIC8vIEFuaW1hdGUgUGFnZXNcbiAgICAgIGFuaW1hdGVQYWdlczogdHJ1ZSxcblxuICAgICAgLy8gVGVtcGxhdGVzXG4gICAgICB0ZW1wbGF0ZXM6IHt9LFxuICAgICAgdGVtcGxhdGVEYXRhOiB7fSxcbiAgICAgIHRlbXBsYXRlUGFnZXM6IGZhbHNlLFxuICAgICAgcHJlY29tcGlsZVRlbXBsYXRlczogZmFsc2UsXG5cbiAgICAgIC8vIEF1dG8gaW5pdFxuICAgICAgaW5pdDogdHJ1ZVxuICAgIH07XG5cbiAgICAvLyBFeHRlbmQgZGVmYXVsdHMgd2l0aCBwYXJhbWV0ZXJzXG4gICAgZm9yICh2YXIgcGFyYW0gaW4gb3B0aW9ucykge1xuICAgICAgdGhpcy5wYXJhbXNbcGFyYW1dID0gb3B0aW9uc1twYXJhbV07XG4gICAgfVxuXG4gICAgY29uc29sZS53YXJuKCdBcHAuY29uc3RydWN0b3InLCB0aGlzKTtcblxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBzdGFydGluZyBhbGwgcmVnaXN0ZXJlZCBzZXJ2aWNlcy5cbiAgICovXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMubG9nLmxvZ0FwaSgnc3RhcnQnLCB0aGlzKTtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwodGhpcy5zZXJ2aWNlcy5zdGFydEFsbCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgYm9vdHN0cmFwcGluZyBhcHBsaWNhdGlvbi5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIGRvbmUuXG4gICAqL1xuICBib290c3RyYXAoY2IpIHtcbiAgICB0aGlzLmxvZy5sb2dBcGkoJ2Jvb3RzdHJhcCcsIHRoaXMpO1xuICAgIGNiKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBydW5uaW5nIHRoZSBhcHBsaWNhdGlvbi5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIGRvbmUuXG4gICAqL1xuICBydW4oY2IpIHtcbiAgICB0aGlzLmxvZy5sb2dBcGkoJ3J1bicsIHRoaXMpO1xuICAgIHRoaXMuc3RhcnQoKTtcbiAgICBjYih0aGlzKTtcbiAgfVxuXG59XG4iLCIndXNlIHN0cmljdCc7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBMb2dnZXIgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IFB1YlN1YiBmcm9tICcuL3B1YnN1Yic7XG5pbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcblxuLyoqXG4gKiBCYXNlQ2xhc3MgcHJvdmlkZXMgYSBCYXNlIGZvciBhbGwgY3VzdG9tIGNsYXNzZXMuXG4gKiBAZXhhbXBsZVxuICogY2xhc3MgTXlDbGFzcyBleHRlbmRzIEJhc2VDbGFzc3tcbiAqICBjb25zdHJ1Y3RvcihuYW1lLCBvcHRpb25zKSB7XG4gKiAgICBzdXBlcihuYW1lLCBvcHRpb25zKTtcbiAqICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VDbGFzcyB7XG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gVGhlIGNvbnN0cnVjdG9yIG1ldGhvZCB0aGF0IHJldHVybnMgYW4gaW5zdGFuY2Ugb2YgdGhpcyBjbGFzcy5cbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lICAtIFRoZSBuYW1lIG9mIHRoZSBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgdGhlIGluc3RhbmNlLlxuICAgKiBAcmV0dXJuIHtCYXNlQ2xhc3N9XG4gICAqL1xuICBjb25zdHJ1Y3RvcihuYW1lLCBvcHRpb25zKSB7XG4gICAgdGhpcy51dGlscyA9IHV0aWxzO1xuICAgIHRoaXMuX2lkID0gbmFtZSB8fCB1dGlscy51dWlkKCk7XG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nZ2VyKG5hbWUsIHtcbiAgICAgIGNvbG9yczoge1xuICAgICAgICBkZWJ1ZzogJ2NvbG9yOmJsdWUnXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLm1peGluKG5ldyBQdWJTdWIobmFtZSwgb3B0aW9ucykpO1xuICAgIHRoaXMubWl4aW4ob3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtaXhpbihrbGFzcykge1xuICAgIHRoaXMudXRpbHMuYWRkTWl4aW4oa2xhc3MsIHRoaXMpO1xuICB9XG5cbiAgc3RhdGljIGV4dGVuZChvYmopIHtcbiAgICBjb25zb2xlLndhcm4oJ0V4dGVuZCcsIG9iaiwgdGhpcyk7XG4gICAgcmV0dXJuIGRvbS5leHRlbmQodGhpcywgb2JqKTtcbiAgfVxuXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBCYXNlQ2xhc3MgZnJvbSAnLi9iYXNlJztcbmltcG9ydCBNb2RlbCBmcm9tICcuL21vZGVsJztcbmltcG9ydCBIVFRQIGZyb20gJy4vaHR0cCc7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzJztcblxubGV0IGRlZmF1bHRzID0ge1xuICBiYXNlVXJsOiAnL2RlZmF1bHQnLFxuICBpZEZpZWxkOiAnX2lkJyxcbiAgbW9kZWw6IHt9LFxuICBtb2RlbHM6IFtdLFxuICBwYXJhbXM6IHtcbiAgICBsaW1pdDogMjUsXG4gICAgc3RhcnRrZXk6IG51bGwsXG4gICAgZW5ka2V5OiBudWxsXG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxlY3Rpb24gZXh0ZW5kcyBCYXNlQ2xhc3Mge1xuXG4gIHN0YXRpYyBleHRlbmQob2JqKSB7XG4gICAgY29uc29sZS53YXJuKCdFeHRlbmQnLCBvYmosIHRoaXMpO1xuICAgIHJldHVybiB1dGlscy5hZGRNaXhpbihvYmosIHRoaXMpO1xuICB9XG4gIGNvbnN0cnVjdG9yKG5hbWUsIG9wdGlvbnMgPSBkZWZhdWx0cykge1xuICAgIHN1cGVyKG5hbWUsIG9wdGlvbnMpO1xuXG4gICAgLy8gVE9ETzogU2V0dXAgZGVmYXVsdHNcbiAgICB0aGlzLm1vZGVsID0gb3B0aW9ucy5tb2RlbDtcbiAgICB0aGlzLm1vZGVscyA9IG9wdGlvbnMubW9kZWxzO1xuICAgIHRoaXMuYmFzZVVybCA9IG9wdGlvbnMuYmFzZVVybDtcblxuICAgIHRoaXMuaWRGaWVsZCA9IG9wdGlvbnMuaWRGaWVsZCB8fCAnX2lkJztcbiAgICB0aGlzLnBhcmFtcyA9IG9wdGlvbnMucGFyYW1zIHx8IHtcbiAgICAgIHN0YXJ0a2V5OiAnJyxcbiAgICAgIGVuZGtleTogJycsXG4gICAgICBsaW1pdDogMjVcbiAgICB9O1xuICAgIHRoaXMubGFzdFJlc3BvbnNlID0gbnVsbDtcblxuICAgIC8vIFRPRE86IEFkcGF0ZXIgY2FuIGJlIGh0dHAgb3IgZGJcbiAgICB0aGlzLmFkYXB0ZXIgPSBvcHRpb25zLmFkYXB0ZXIgfHwgSFRUUDtcbiAgICB0aGlzLmFkYXB0ZXIgPSBuZXcgdGhpcy5hZGFwdGVyKG5hbWUsIG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvL0hhbmRsZSBwYXJzaW5nIHRoZSByZXNwb25zZSBmcm9tIGEgZmV0Y2hcbiAgcGFyc2UocmVzcCkge1xuICAgIHJldHVybiByZXNwO1xuICB9XG5cbiAgLy9BZGQgYSBtb2RlbCB0byB0aGUgbGlzdCBvZiBpdGVtcy5cbiAgYWRkKG1vZGVscykge1xuICAgIHJldHVybiB0aGlzLm1vZGVscy5wdXNoKG1vZGVscyk7XG4gIH1cblxuICAvL0hhbmRsZSBzZW5kaW5nIGFub3RoZXIgcmVxdWVzdC5cbiAgZmV0Y2gocGFyYW1zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHJldHVybiBzZWxmLmFkYXB0ZXIuZ2V0KHBhcmFtcykudGhlbihmdW5jdGlvbihyZXNwKSB7XG4gICAgICBzZWxmLmxhc3RSZXNwb25zZSA9IHJlc3A7XG4gICAgICBzZWxmLm1vZGVscyA9IHJlc3AuZGF0YS5yb3dzO1xuICAgICAgcmV0dXJuIHJlc3A7XG4gICAgfSk7XG4gIH1cblxuICAvLyBUT0RPOiByZW1vdmUobW9kZWwpIC0gUmVtb3ZlIGEgbW9kZWwgZnJvbSB0aGUgbGlzdCBvZiBpdGVtcy5cbiAgcmVtb3ZlKG1vZGVsKSB7XG4gICAgY29uc29sZS53YXJuKCdGaW5kIG1vZGVsIGJ5JywgbW9kZWwpO1xuICAgIGlmICh0aGlzLnV0aWxzLnR5cGUobW9kZWwpID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc29sZS53YXJuKCdGaW5kIGJ5IF9pZCcsIG1vZGVsKTtcbiAgICB9XG4gICAgaWYgKHRoaXMudXRpbHMudHlwZShtb2RlbCkgPT09ICdudW1iZXInKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0ZpbmQgYnkgaW5kZXgnLCBtb2RlbCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnV0aWxzLnR5cGUobW9kZWwpID09PSAnb2JqZWN0Jykge1xuICAgICAgY29uc29sZS53YXJuKCdGaW5kIGJ5IG1vZGVsJywgbW9kZWwpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFRPRE86IHdoZXJlKGZpbHRlcikgLSBGaWx0ZXIgbW9kZWxzIGJhc2VkIG9uIGZpbHRlciBwYXNzZWQuXG4gIHdoZXJlKGZpbHRlcikge1xuICAgIHJldHVybiB0aGlzLm1vZGVscy5maWx0ZXIoZmlsdGVyKTtcbiAgfVxuXG4gIC8vIFRPRE86IGZpbmRXaGVyZShmaWx0ZXIpIC0gRmlsdGVyIGFuZCByZXR1cm4gZmlyc3QgbW9kZWwgYnkgZmlsdGVyLlxuICBmaW5kKGZpbHRlcikge1xuICAgIHJldHVybiB0aGlzLm1vZGVscy5maWx0ZXIoZmlsdGVyKTtcbiAgfVxuXG4gIC8vIFRPRE86IFJldHVybiBhIG1vZGVsIGJ5IGlkXG4gIGdldChpZCkge1xuXG4gIH1cblxuICB0b0pTT04oKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMubW9kZWxzKTtcbiAgfVxuXG59XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZXh0ZW5zaW9ucyA9IHt9O1xuaW1wb3J0IEJhc2VDbGFzcyBmcm9tICcuL2Jhc2UnO1xuLyoqXG4gKiBUaGUgQ29yZSBjbGFzcy5cbiAqIEBleGFtcGxlXG4gQ29yZS5yZWdpc3RlcigndHdlZXQnLCBmdW5jdGlvbihzYW5kYm94KSB7XG4gICByZXR1cm4ge1xuICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICBjb25zb2xlLmxvZygnc3RhcnRpbmcgdHdlZXQgbW9kdWxlJyk7XG4gICAgIH1cbiAgIH1cbiB9KTtcbiBDb3JlLnN0YXJ0KCd0d2VldCcpO1xuICogQGNsYXNzIENvcmVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29yZSBleHRlbmRzIEJhc2VDbGFzcyB7XG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3Igb2YgQ29yZVxuICAgKlxuICAgKiBAY2xhc3MgQ29yZVxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKG5hbWUsIG9wdGlvbnMpIHtcbiAgICBzdXBlcihuYW1lLCBvcHRpb25zKTtcbiAgICB0aGlzLm1vZHVsZXMgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYSBuZXcgbW9kdWxlXG4gICAqXG4gICAqIEBtZXRob2QgcmVnaXN0ZXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1vZHVsZSB0aGUgbmFtZSBvZiB0aGUgbmV3IG1vZHVsZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb25zdHJ1Y3RvciB0aGUgY29uc3RydWN0b3Igb2YgdGhlIG5ldyBtb2R1bGVcbiAgICovXG4gIHJlZ2lzdGVyKG1vZHVsZSwgY29uc3RydWN0b3IpIHtcbiAgICBpZiAodGhpcy5tb2R1bGVzW21vZHVsZV0pIHtcbiAgICAgIHRoaXMuaGVscGVycy5lcnIoJyEhbW9kdWxlJywgbW9kdWxlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5tb2R1bGVzW21vZHVsZV0gPSB7XG4gICAgICBjb25zdHJ1Y3RvcjogY29uc3RydWN0b3IsXG4gICAgICBpbnN0YW5jZTogbnVsbFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIG1vZHVsZSBpcyBhbHJlYWR5IGluaXRpYWxpemVkIG9yIG5vdFxuICAgKlxuICAgKiBAbWV0aG9kIG1vZHVsZUNoZWNrXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtb2R1bGUgdGhlIG5hbWUgb2YgdGhlIG1vZHVsZSB0aGF0IHdpbGwgYmUgY2hlY2tlZFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRlc3Ryb3kgY2hlY2sgaWYgdGhlIG1vZHVsZSBleGlzdHMsIGJ1dCBpcyBhbHJlYWR5IGRlc3Ryb3llZFxuICAgKiBAcmV0dXJuIHtib29sZWFufSBpZiB0aGUgbW9kdWxlIGV4aXN0cyBvciBhbHJlYWR5IGhhdmUgYW4gaW5zdGFuY2VcbiAgICovXG4gIG1vZHVsZUNoZWNrKG1vZHVsZSwgZGVzdHJveSkge1xuICAgIGlmIChkZXN0cm95KSB7XG4gICAgICByZXR1cm4gIW1vZHVsZSB8fCAhbW9kdWxlLmluc3RhbmNlO1xuICAgIH1cblxuICAgIHJldHVybiAhbW9kdWxlIHx8IG1vZHVsZS5pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgYSByZWdpc3RlcmVkIG1vZHVsZSwgaWYgbm8gbW9kdWxlIGlzIHBhc3NlZCwgaXQgc3RhcnRzIGFsbCBtb2R1bGVzXG4gICAqXG4gICAqIEBtZXRob2Qgc3RhcnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1vZHVsZSB0aGUgbmFtZSBvZiB0aGUgbW9kdWxlXG4gICAqL1xuICBzdGFydChtb2R1bGUpIHtcbiAgICBpZiAoIW1vZHVsZSkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RhcnRBbGwoKTtcbiAgICB9XG5cbiAgICB2YXIgY01vZHVsZSA9IHRoaXMubW9kdWxlc1ttb2R1bGVdLFxuICAgICAgZWwgPSB0aGlzLmdldEVsZW1lbnQobW9kdWxlKTtcblxuICAgIGlmICh0aGlzLm1vZHVsZUNoZWNrKGNNb2R1bGUpKSB7XG4gICAgICB0aGlzLmhlbHBlcnMuZXJyKCchc3RhcnQnLCBtb2R1bGUpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNNb2R1bGUuaW5zdGFuY2UgPSBuZXcgY01vZHVsZS5jb25zdHJ1Y3RvcihuZXcgdGhpcy5TYW5kYm94KG1vZHVsZSkpO1xuXG4gICAgLy8gYXR0YWNocyB0aGUgZWxlbWVudCB0byB0aGUgaW5zdGFuY2Ugb2YgdGhlIG1vZHVsZVxuICAgIGNNb2R1bGUuaW5zdGFuY2UuZWwgPSBlbDtcblxuICAgIGlmIChjTW9kdWxlLmluc3RhbmNlLmluaXQpIHtcbiAgICAgIHJldHVybiBjTW9kdWxlLmluc3RhbmNlLmluaXQoKTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBTdG9wcyBhIHJlZ2lzdGVyZWQgbW9kdWxlXG4gICAqXG4gICAqIEBtZXRob2Qgc3RhcnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1vZHVsZSB0aGUgbmFtZSBvZiB0aGUgbW9kdWxlXG4gICAqL1xuICBzdG9wKG1vZHVsZSkge1xuICAgIGlmICghbW9kdWxlKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdG9wQWxsKCk7XG4gICAgfVxuXG4gICAgdmFyIGNNb2R1bGUgPSB0aGlzLm1vZHVsZXNbbW9kdWxlXSxcbiAgICAgIHN0b3BSZXR1cm47XG5cbiAgICBpZiAodGhpcy5tb2R1bGVDaGVjayhjTW9kdWxlLCB0cnVlKSkge1xuICAgICAgdGhpcy5oZWxwZXJzLmVycignIXN0b3AnLCBtb2R1bGUpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChjTW9kdWxlLmluc3RhbmNlLmRlc3Ryb3kpIHtcbiAgICAgIHN0b3BSZXR1cm4gPSBjTW9kdWxlLmluc3RhbmNlLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBjTW9kdWxlLmluc3RhbmNlID0gbnVsbDtcblxuICAgIHRoaXMuU2FuZGJveC5jbGVhck5vdGlmaWNhdGlvbnMobW9kdWxlKTtcblxuICAgIHJldHVybiBzdG9wUmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3AgYWxsIHN0YXJ0ZWQgbW9kdWxlc1xuICAgKlxuICAgKiBAbWV0aG9kIHN0b3BBbGxcbiAgICovXG4gIHN0b3BBbGwoKSB7XG4gICAgdGhpcy54QWxsKCdzdG9wJyk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcCBhbGwgc3RhcnRlZCBtb2R1bGVzXG4gICAqXG4gICAqIEBtZXRob2Qgc3RvcEFsbFxuICAgKi9cbiAgc3RhcnRBbGwoKSB7XG4gICAgdGhpcy54QWxsKCdzdGFydCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciBmb3Igc3RhcnRBbGwgYW5kIHN0b3BBbGxcbiAgICpcbiAgICogQG1ldGhvZCB4QWxsXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2QgdGhlIG1ldGhvZCB0aGF0IHdpbGwgYmUgdHJpZ2dlcmVkXG4gICAqL1xuICB4QWxsKG1ldGhvZCkge1xuICAgICAgZm9yICh2YXIgbW9kdWxlIGluIHRoaXMubW9kdWxlcykge1xuICAgICAgICBpZiAodGhpcy5tb2R1bGVzLmhhc093blByb3BlcnR5KG1vZHVsZSkpIHtcbiAgICAgICAgICB0aGlzW21ldGhvZF0obW9kdWxlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIGFuIGVsZW1lbnQgYnkgSUQgdG8gYXR0YWNoIHRvIHRoZSBtb2R1bGUgaW5zdGFuY2VcbiAgICAgKlxuICAgICAqIEBtZXRob2QgZ2V0RWxlbWVudFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCB0aGUgaWQgb2YgdGhlIG1haW4gZWxlbWVudCBpbiB0aGUgbW9kdWxlXG4gICAgICovXG4gIGdldEVsZW1lbnQoaWQpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG5cbiAgICAvLyB0aGlzIGZpeGVzIHNvbWUgYmxhY2tiZXJyeSwgb3BlcmEgYW5kIElFIHBvc3NpYmxlIGJ1Z3NcbiAgICByZXR1cm4gKGVsICYmIGVsLmlkID09PSBpZCAmJiBlbC5wYXJlbnRFbGVtZW50KSA/IGVsIDogbnVsbDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEV4dGVuZHMgY29yZSBmdW5jdGlvbmFsaXRpZXNcbiAgICpcbiAgICogQG1ldGhvZCBleHRlbmRcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgdGhlIG5hbWUgb2YgdGhlIGV4dGVuc2lvblxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uIHwgYXJyYXkgfCBib29sZWFuIHwgc3RyaW5nIHwgbnVtYmVyfSBpbXBsZW1lbnRhdGlvbiB3aGF0IHRoZSBleHRlbnNpb24gZG9lc1xuICAgKi9cbiAgc3RhdGljIGV4dGVuZChuYW1lLCBpbXBsZW1lbnRhdGlvbikge1xuICAgIGV4dGVuc2lvbnNbbmFtZV0gPSBpbXBsZW1lbnRhdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm5zIHRoZSBleHRlbnNpb25cbiAgICpcbiAgICogQG1ldGhvZCBnZXRFeHRlbnNpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV4dGVuc2lvbiB0aGUgbmFtZSBvZiB0aGUgZXh0ZW5zaW9uXG4gICAqIEByZXR1cm4ge2Z1bmN0aW9uIHwgYXJyYXkgfCBib29sZWFuIHwgc3RyaW5nIHwgbnVtYmVyfSB0aGUgaW1wbGVtZW50YXRpb24gb2YgdGhlIGV4dGVuc2lvblxuICAgKi9cbiAgc3RhdGljIGdldEV4dGVuc2lvbihleHRlbnNpb24pIHtcbiAgICByZXR1cm4gZXh0ZW5zaW9uc1tleHRlbnNpb25dIHx8IG51bGw7XG4gIH1cbn1cblxuXG5cbi8qKlxuICogaGVscGVycy9lcnIuanMgLSBIYW5kbGVzIGVycm9yIG1lc3NhZ2VzXG4gKlxuICogQG1ldGhvZCBlcnJcbiAqIEBwYXJhbSB7c3RyaW5nfSBlcnJvciB0aGUgdHlwZSBvZiB0aGUgZXJyb3JcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG1lc3NhZ2UgdGhlIGNvbXBsZW1lbnRhcnkgbWVzc2FnZSB0byB0aGUgZXJyb3JcbiAqL1xudmFyIGVyciA9IGZ1bmN0aW9uKGVycm9yLCBtZXNzYWdlKSB7XG4gIENvcmUuaGVscGVycy5sb2coYCR7ZXJyLm1lc3NhZ2VzW2Vycm9yXX0gLSAke21lc3NhZ2V9YCk7XG59O1xuXG5lcnIubWVzc2FnZXMgPSB7XG4gICchc3RhcnQnOiAnQ291bGQgbm90IHN0YXJ0IHRoZSBnaXZlbiBtb2R1bGUsIGl0XFwncyBlaXRoZXIgYWxyZWFkeSBzdGFydGVkIG9yIGlzIG5vdCByZWdpc3RlcmVkOiAnLFxuICAnIXN0b3AnOiAnQ291bGQgbm90IHN0b3AgdGhlIGdpdmVuIG1vZHVsZSwgaXRcXCdzIGVpdGhlciBhbHJlYWR5IHN0b3BwZWQgb3IgaXMgbm90IHJlZ2lzdGVyZWQ6ICcsXG4gICchIW1vZHVsZSc6ICdDYW5cXCd0IHJlZ2lzdGVyIGFuIGFscmVhZHkgcmVnaXN0ZXJlZCBtb2R1bGU6ICcsXG4gICchIWxpc3Rlbic6ICdUaGVyZVxcJ3MgYWxyZWFkeSBhbiBsaXN0ZW4gaGFuZGxlciB0byB0aGUgbm90aWZpY2F0aW9uOiAnXG59O1xuXG5Db3JlLmhlbHBlcnMgPSBDb3JlLmhlbHBlcnMgfHwge307XG5Db3JlLmhlbHBlcnMuZXJyID0gZXJyO1xuXG5cbi8qKlxuICogaGVscGVycy9sb2cuanMgLSBBZGRzIGNvbnNvbGUubG9nIHRvIENvcmUgaGVscGVyc1xuICogQG1ldGhvZCBsb2dcbiAqL1xuQ29yZS5oZWxwZXJzID0gQ29yZS5oZWxwZXJzIHx8IHt9O1xuQ29yZS5oZWxwZXJzLmxvZyA9ICh3aW5kb3cuY29uc29sZSkgPyB3aW5kb3cuY29uc29sZS5sb2cuYmluZCh3aW5kb3cuY29uc29sZSkgOiBmdW5jdGlvbigpIHt9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IEJhc2VDbGFzcyBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IEhUVFAgZnJvbSAnLi9odHRwJztcbmltcG9ydCBMb2dnZXIgZnJvbSAnLi9sb2cnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBUaGUgREIgY2xhc3Mgd2FzIGNyZWF0ZWQgdG8gaGVscCB3ZWIgZGV2ZWxvcGVycyBidWlsZCBhcHBsaWNhdGlvbnMgdGhhdCB3b3JrIGFzIHdlbGwgb2ZmbGluZSBhcyB0aGV5IGRvIG9ubGluZS5cbiAqIEBleGFtcGxlXG4gKiB2YXIgZGIgPSBuZXcgcHgubW9iaWxlLkRCKCdkYjEnLCB7XG4gKiAgICBiYXNlVXJsOiAnaHR0cDovL2xvY2FsaG9zdDo1OTg0L2RlZmF1bHQnXG4gKiB9KTtcbiAqIGRiLmdldCgnc3luYy11c2VyMScpLnRoZW4oZnVuY3Rpb24ocmVzcCl7XG4gKiAgICBjb25zb2xlLmxvZyhqc29uKTtcbiAqIH0pO1xuICogQGV4dGVuZHMge0Jhc2VDbGFzc31cbiAqIEBpbXBsZW1lbnRzIHtNeUludGVyZmFjZTJ9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERCIGV4dGVuZHMgQmFzZUNsYXNzIHtcblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoZSBjb25zdHJ1Y3RvciBtZXRob2QgdGhhdCByZXR1cm5zIGFuIGluc3RhbmNlIG9mIHRoaXMgREIgY2xhc3MuXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAgLSBUaGUgbmFtZSBvZiB0aGUgaW5zdGFuY2VcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3RcbiAgICogQHJldHVybiB7REJ9IEluc3RhbmNlIG9mIHRoZSBEQiBjbGFzcy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKG5hbWUgPSAnZGInLCBvcHRpb25zID0ge1xuICAgIGJhc2VVcmw6ICcvZGVmYXVsdCdcbiAgfSkge1xuICAgIHN1cGVyKG5hbWUsIG9wdGlvbnMpO1xuXG4gICAgaWYgKCFvcHRpb25zLmJhc2VVcmwpIHtcbiAgICAgIC8vdGhyb3cgbmV3IEVycm9yKCdEQjogTXVzdCBwcm92aWRlIGEgYmFzZVVybCcpO1xuICAgICAgY29uc29sZS53YXJuKCdbREJdIC0gVXNpbmcgZGVmYXVsdCBiYXNlVXJsIC0gL2RlZmF1bHQnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Q2xhc3N9IGFkYXB0ZXIgLSBUaGUgYWRhcHRlciB0byB1c2UgZm9yIGFsbCByZXF1ZXN0cy5cbiAgICAgKi9cbiAgICB0aGlzLmFkYXB0ZXIgPSBvcHRpb25zLmFkYXB0ZXIgfHwgSFRUUDtcbiAgICB0aGlzLmFkYXB0ZXIgPSBuZXcgdGhpcy5hZGFwdGVyKG5hbWUsIG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIEkgZmV0Y2ggZ2VuZXJhbCBpbmZvcm1hdGlvbiBvZiB0aGUgZGF0YWJhc2UuXG4gICAqIEBleGFtcGxlXG4gICAqIGRiLmluZm8oKS50aGVuKGZ1bmN0aW9uKHJlc3Ape1xuICAgKiAgICBhc3NlcnQuZXF1YWwocmVzcC5zdGF0dXMsIDIwMCk7XG4gICAqICAgIGFzc2VydC5vayhyZXNwLmRhdGEpO1xuICAgKiAgICBhc3NlcnQub2socmVzcC5kYXRhLmRiX25hbWUpO1xuICAgKiAgICBhc3NlcnQub2socmVzcC5kYXRhLnVwZGF0ZV9zZXEpO1xuICAgKiB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAqICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAqIH0pO1xuICAgKiBAcmV0dXJuIHtQcm9taXNlIDxSZXNwb25zZSwgRXJyb3I+fSBBIHByb21pc2UgdGhhdCBpcyByZXNvbHZlZC9yZWplY3RlZCB1cG9uIHN1Y2Nlc3MvZmFpbHVyZS5cbiAgICovXG4gIGluZm8oKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlci5nZXQoJycpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBGZXRjaCBtdWx0aXBsZSBkb2N1bWVudHMsIGluZGV4ZWQgYW5kIHNvcnRlZCBieSB0aGUgX2lkLiBEZWxldGVkIGRvY3VtZW50cyBhcmUgb25seSBpbmNsdWRlZCBpZiBvcHRpb25zLmtleXMgaXMgc3BlY2lmaWVkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIG9iamVjdFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuaW5jbHVkZV9kb2NzIC0gSW5jbHVkZSB0aGUgZG9jdW1lbnQgaXRzZWxmIGluIGVhY2ggcm93IGluIHRoZSBkb2MgZmllbGQuIE90aGVyd2lzZSBieSBkZWZhdWx0IHlvdSBvbmx5IGdldCB0aGUgX2lkIGFuZCBfcmV2IHByb3BlcnRpZXMuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5jb25mbGljdHMgLSBJbmNsdWRlIGNvbmZsaWN0IGluZm9ybWF0aW9uIGluIHRoZSBfY29uZmxpY3RzIGZpZWxkIG9mIGEgZG9jLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuYXR0YWNobWVudHMgLSBJbmNsdWRlIGF0dGFjaG1lbnQgZGF0YSBhcyBiYXNlNjQtZW5jb2RlZCBzdHJpbmcuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLnN0YXJ0a2V5IC0gR2V0IGRvY3VtZW50cyB3aXRoIElEcyBpbiByYW5nZS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuZW5ka2V5IC0gR2V0IGRvY3VtZW50cyB3aXRoIElEcyBpbiBhIGNlcnRhaW4gcmFuZ2UgKGluY2x1c2l2ZS9pbmNsdXNpdmUpLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuaW5jbHVzaXZlX2VuZCAtIEluY2x1ZGUgZG9jdW1lbnRzIGhhdmluZyBhbiBJRCBlcXVhbCB0byB0aGUgZ2l2ZW4gb3B0aW9ucy5lbmRrZXkuIERlZmF1bHQ6IHRydWUuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmxpbWl0IC0gTWF4aW11bSBudW1iZXIgb2YgZG9jdW1lbnRzIHRvIHJldHVybi5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuc2tpcCAtIE51bWJlciBvZiBkb2NzIHRvIHNraXAgYmVmb3JlIHJldHVybmluZyAod2FybmluZzogcG9vciBwZXJmb3JtYW5jZSBvbiBJbmRleGVkREIvTGV2ZWxEQiEpLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuZGVzY2VuZGluZyAtIFJldmVyc2UgdGhlIG9yZGVyIG9mIHRoZSBvdXRwdXQgZG9jdW1lbnRzLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5rZXkgLSBPbmx5IHJldHVybiBkb2N1bWVudHMgd2l0aCBJRHMgbWF0Y2hpbmcgdGhpcyBzdHJpbmcga2V5LlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLmtleXMgLSBBcnJheSBvZiBzdHJpbmcga2V5cyB0byBmZXRjaCBpbiBhIHNpbmdsZSBzaG90LlxuICAgKiBAZXhhbXBsZVxuICAgKiBkYi5hbGxEb2NzKHtcbiAgICogICAgbGltaXQ6IDUsXG4gICAqICAgIGluY2x1ZGVfZG9jczogdHJ1ZVxuICAgKiB9KS50aGVuKGZ1bmN0aW9uKHJlc3ApIHtcbiAgICogICAgZXhwZWN0KHJlc3Auc3RhdHVzKS50b0JlKDIwMCk7XG4gICAqICAgIGV4cGVjdChyZXNwLmRhdGEucm93cykudG9CZURlZmluZWQoKTtcbiAgICogICAgZXhwZWN0KHJlc3AuZGF0YS5yb3dzLmxlbmd0aCkudG9CZSg1KTtcbiAgICogfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgKiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgKiB9KTtcbiAgICogQHJldHVybiB7UHJvbWlzZSA8UmVzcG9uc2UsIEVycm9yPn0gQSBwcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQvcmVqZWN0ZWQgdXBvbiBzdWNjZXNzL2ZhaWx1cmUuXG4gICAqL1xuICBhbGxEb2NzKG9wdGlvbnMpIHtcbiAgICB0aGlzLmxvZy5sb2dBcGkoJ2FsbERvY3MnLCBvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmdldChgL19hbGxfZG9jc2AsIHtcbiAgICAgIHBhcmFtczogb3B0aW9uc1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBSZXRyaWV2ZXMgYSBkb2N1bWVudCwgc3BlY2lmaWVkIGJ5IGRvY0lkLlxuICAgKiBAZXhhbXBsZVxuICAgKiBkYi5nZXQodGVzdE9iai5faWQpLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHtcbiAgICogICAgZXhwZWN0KHJlc3Auc3RhdHVzKS50b0JlKDIwMCk7XG4gICAqICAgIGV4cGVjdChyZXNwLmRhdGEuX3JldikudG9CZURlZmluZWQoKTtcbiAgICogfSkuY2F0Y2goZnVuY3Rpb24oZXJyKXtcbiAgICogICAgY29uc29sZS53YXJuKGVycik7XG4gICAqIH0pO1xuICAgKiBAcGFyYW0ge1N0cmluZ30gZG9jSWQgLSBUaGUgaWQgb2YgdGhlIGRvY3VtZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0XG4gICAqIEByZXR1cm4ge1Byb21pc2UgPFJlc3BvbnNlLCBFcnJvcj59IEEgcHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkL3JlamVjdGVkIHVwb24gc3VjY2Vzcy9mYWlsdXJlLlxuICAgKi9cbiAgZ2V0KGRvY0lkLCBvcHRpb25zKSB7XG4gICAgdGhpcy5sb2cubG9nQXBpKCdnZXQnLCBkb2NJZCk7XG4gICAgaWYgKCFkb2NJZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdkYi5nZXQoZG9jSWQpIC0gTXVzdCBwcm92aWRlIGEgZG9jdW1lbnQgX2lkIScpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmdldChgLyR7ZG9jSWR9YCwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFB1dCBhIGRvY3VtZW50XG4gICAqIEBleGFtcGxlXG4gICAqIHZhciBkb2MgPSB7XG4gICAqICAgIF9pZDogJ3Rlc3QtZG9jMScsXG4gICAqICAgIG5hbWU6ICdOZXcgRG9jJ1xuICAgKiB9O1xuICAgKiBkYi5wdXQoZG9jKS50aGVuKGZ1bmN0aW9uKHJlc3Ape1xuICAgKiAgICBjb25zb2xlLmxvZyhyZXNwKTtcbiAgICogfSkuY2F0Y2goZnVuY3Rpb24oZXJyKXtcbiAgICogICAgY29uc29sZS53YXJuKGVycik7XG4gICAqIH0pO1xuICAgKiBAcGFyYW0ge09iamVjdH0gZG9jIC0gVGhlIGRvY3VtZW50IG9iamVjdCwgbXVzdCBoYXZlIF9pZCAgZm9yIGNyZWF0aW9uLCBhbmQgX3JldiBmb3IgdXBkYXRpbmdcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyB0byBzZW5kIHdpdGggdGhlIHJlcXVlc3RcbiAgICogQHJldHVybiB7UHJvbWlzZSA8UmVzcG9uc2UsIEVycm9yPn0gQSBwcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQvcmVqZWN0ZWQgdXBvbiBzdWNjZXNzL2ZhaWx1cmUuXG4gICAqL1xuICBwdXQoZG9jLCBvcHRpb25zKSB7XG4gICAgdGhpcy5sb2cubG9nQXBpKCdwdXQnLCBkb2MpO1xuICAgIGlmICghZG9jKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RiLnB1dChkb2MpIC0gTXVzdCBwcm92aWRlIGEgZG9jdW1lbnQgb2JqZWN0IScpO1xuICAgIH1cbiAgICBpZiAoIWRvYy5faWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZGIucHV0KGRvYykgLSBNdXN0IHByb3ZpZGUgYSBfaWQgb24gdGhlIGRvY3VtZW50IG9iamVjdCEnKTtcbiAgICB9XG4gICAgaWYgKGRvYy5fcmV2KSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7XG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHJldjogZG9jLl9yZXZcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlci5wdXQoYC8ke2RvYy5faWR9YCwgZG9jLCBvcHRpb25zKS50aGVuKHRoaXMuYWRhcHRlci5wYXJzZUpTT04pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBJIGhhbmRsZSBjcmVhdGluZyBhIG5ldyBkb2N1bWVudCB3aXRoIGEgZ2VuZXJhdGVkIF9pZFxuICAgKiBAZXhhbXBsZVxuICAgKiBAcGFyYW0ge09iamVjdH0gZG9jIC0gQSBkb2N1bWVudCBvYmplY3RcbiAgICogQHJldHVybiB7UHJvbWlzZSA8UmVzcG9uc2UsIEVycm9yPn0gQSBwcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQvcmVqZWN0ZWQgdXBvbiBzdWNjZXNzL2ZhaWx1cmUuXG4gICAqL1xuICBwb3N0KGRvYykge1xuICAgIGlmICghZG9jKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RiLnB1dChkb2MpIC0gTXVzdCBwcm92aWRlIGEgZG9jdW1lbnQgb2JqZWN0IScpO1xuICAgIH1cbiAgICBkb2MuX2lkID0gdGhpcy51dGlscy51dWlkKCk7XG4gICAgcmV0dXJuIHRoaXMucHV0KGRvYyk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIEkgaGFuZGxlIHJlbW92aW5nIGEgZG9jdW1lbnQgZnJvbSB0aGUgZGF0YSBzdG9yZS5cbiAgICogQGV4YW1wbGVcbiAgICogZGIuZ2V0KHRlc3RPYmouX2lkKS50aGVuKGZ1bmN0aW9uIChyZXNwKSB7XG4gICAqICAgIHRlc3RPYmouX3JldiA9IHJlc3AuZGF0YS5fcmV2O1xuICAgKiAgICBkYi5yZW1vdmUodGVzdE9iai5faWQsIHRlc3RPYmouX3JldikudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAqICAgICAgZXhwZWN0KHJlcy5zdGF0dXMpLnRvQmUoMjAwKTtcbiAgICogICAgfSk7XG4gICAqIH0pO1xuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IGlkIC0gVGhlIGRvY3VtZW50cyBfaWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IHJldiAtIFRoZSBkb2N1bWVudHMgX3JldlxuICAgKiBAcmV0dXJuIHtQcm9taXNlIDxSZXNwb25zZSwgRXJyb3I+fSBBIHByb21pc2UgdGhhdCBpcyByZXNvbHZlZC9yZWplY3RlZCB1cG9uIHN1Y2Nlc3MvZmFpbHVyZS5cbiAgICovXG4gIHJlbW92ZShpZCwgcmV2KSB7XG4gICAgdGhpcy5sb2cubG9nQXBpKCdyZW1vdmUnLCB7XG4gICAgICBpZDogaWQsXG4gICAgICByZXY6IHJldlxuICAgIH0pO1xuICAgIGlmICghaWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZGIucmVtb3ZlKGlkLCByZXYpIC0gTXVzdCBwcm92aWRlIGEgaWQhJyk7XG4gICAgfVxuICAgIGlmICghcmV2KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RiLnJlbW92ZShpZCwgcmV2KSAtIE11c3QgcHJvdmlkZSBhIHJldiEnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlci5kZWxldGUoYC8ke2lkfWAsIHtcbiAgICAgIHBhcmFtczoge1xuICAgICAgICByZXY6IHJldlxuICAgICAgfVxuICAgIH0pLnRoZW4odGhpcy5hZGFwdGVyLnBhcnNlSlNPTik7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIEdldCBhbiBhdHRhY2htZW50IGZyb20gdGhlIGRhdGEgc3RvcmUuXG4gICAqIEBleGFtcGxlXG4gICAqIHZhciB0ZXN0QXR0YWNobWVudERvYyA9ICd0ZXN0LWRvYy1hdHRhY2htZW50LScgKyBEYXRlLm5vdygpO1xuICAgKiBkYi5nZXRBdHRhY2htZW50KHRlc3RBdHRhY2htZW50RG9jLCAnZmlsZS5odG1sJykudGhlbihmdW5jdGlvbiAocmVzcCkge1xuICAgKiAgICBleHBlY3QocmVzcC5vaykudG9CZSh0cnVlKTtcbiAgICogfSk7XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpZCAtIFRoZSBkb2N1bWVudHMgX2lkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBhdHRhY2htZW50SWQgLSBUaGUgZG9jdW1lbnRzIGF0dGFjaG1lbnQgbmFtZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gY29udGVudFR5cGUgLSBUaGUgZG9jdW1lbnRzIGF0dGFjaG1lbnQgQ29udGVudCBUeXBlXG4gICAqIEByZXR1cm4ge1Byb21pc2UgPFJlc3BvbnNlLCBFcnJvcj59IEEgcHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkL3JlamVjdGVkIHVwb24gc3VjY2Vzcy9mYWlsdXJlLlxuICAgKi9cbiAgZ2V0QXR0YWNobWVudChpZCwgYXR0YWNobWVudElkLCBjb250ZW50VHlwZSkge1xuICAgIHRoaXMubG9nLmxvZ0FwaSgnZ2V0QXR0YWNobWVudCcsIHtcbiAgICAgIGlkOiBpZCxcbiAgICAgIGF0dGFjaG1lbnQ6IGF0dGFjaG1lbnRJZFxuICAgIH0pO1xuICAgIGlmICghaWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZGIuZ2V0QXR0YWNobWVudChpZCwgYXR0YWNobWVudElkKSAtIE11c3QgcHJvdmlkZSBhIGRvY3VtZW50IF9pZCEnKTtcbiAgICB9XG4gICAgaWYgKCFhdHRhY2htZW50SWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZGIuZ2V0QXR0YWNobWVudChpZCwgYXR0YWNobWVudElkKSAtIE11c3QgcHJvdmlkZSBhIGRvY3VtZW50IGF0dGFjaG1lbnQhJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIucmVxdWVzdChgJHtpZH0vJHthdHRhY2htZW50SWR9YCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6IGNvbnRlbnRUeXBlIHx8ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFNhdmUgYW4gYXR0YWNobWVudCB0byB0aGUgZGF0YSBzdG9yZS5cbiAgICogQGV4YW1wbGVcbiAgICogdmFyIGFGaWxlUGFydHMgPSBbJzxhIGlkPVwiYVwiPjxiIGlkPVwiYlwiPmhleSE8L2I+PC9hPiddO1xuICAgKiB2YXIgbXlCbG9iID0gbmV3IEJsb2IoYUZpbGVQYXJ0cywge1xuICAgKiAgICB0eXBlOiAndGV4dC9odG1sJ1xuICAgKiB9KTtcbiAgICogZGIuZ2V0KHRlc3RBdHRhY2htZW50RG9jKS50aGVuKGZ1bmN0aW9uIChyZXNwKSB7XG4gICAqICAgIGV4cGVjdChyZXNwLm9rKS50b0JlKHRydWUpO1xuICAgKiAgICBkYi5zYXZlQXR0YWNobWVudChyZXNwLmRhdGEuX2lkLCByZXNwLmRhdGEuX3JldiwgJ2ZpbGUuaHRtbCcsIG15QmxvYi50eXBlLCBteUJsb2IpLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHtcbiAgICogICAgICBleHBlY3QocmVzcC5vaykudG9CZSh0cnVlKTtcbiAgICogICAgfSk7XG4gICAqIH0pO1xuICAgKiBAcGFyYW0ge1N0cmluZ30gaWQgLSBUaGUgZG9jdW1lbnRzIF9pZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcmV2IC0gVGhlIGRvY3VtZW50cyBfcmV2XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlbmFtZSAtIFRoZSBkb2N1bWVudHMgYXR0YWNobWVudCBuYW1lXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gVGhlIGF0dGFjaG1lbnQgdHlwZVxuICAgKiBAcGFyYW0ge0Jsb2J9IGZpbGUgLSBUaGUgYWN0dWFsIGF0dGFjaG1lbnQgQmxvYlxuICAgKiBAcmV0dXJuIHtQcm9taXNlIDxSZXNwb25zZSwgRXJyb3I+fSBBIHByb21pc2UgdGhhdCBpcyByZXNvbHZlZC9yZWplY3RlZCB1cG9uIHN1Y2Nlc3MvZmFpbHVyZS5cbiAgICovXG4gIHNhdmVBdHRhY2htZW50KGlkLCByZXYsIGZpbGVuYW1lLCB0eXBlLCBmaWxlKSB7XG4gICAgdGhpcy5sb2cubG9nQXBpKCdzYXZlQXR0YWNobWVudCcsIGZpbGUpO1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIucmVxdWVzdChgJHtpZH0vJHtmaWxlbmFtZX1gLCB7XG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogdHlwZSB8fCAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJ1xuICAgICAgfSxcbiAgICAgIHBhcmFtczoge1xuICAgICAgICByZXY6IHJldlxuICAgICAgfSxcbiAgICAgIGJvZHk6IGZpbGVcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gQnVsayBpbnNlcnQgb3IgcmVtb3ZlIGRvY3VtZW50cyBmcm9tIHRoZSBkYXRhIHN0b3JlLlxuICAgKiBDcmVhdGUsIHVwZGF0ZSBvciBkZWxldGUgbXVsdGlwbGUgZG9jdW1lbnRzLiBUaGUgZG9jcyBhcmd1bWVudCBpcyBhbiBhcnJheSBvZiBkb2N1bWVudHMuXG4gICAqIElmIHlvdSBvbWl0IGFuIF9pZCBwYXJhbWV0ZXIgb24gYSBnaXZlbiBkb2N1bWVudCwgdGhlIGRhdGFiYXNlIHdpbGwgY3JlYXRlIGEgbmV3IGRvY3VtZW50IGFuZCBhc3NpZ24gdGhlIElEIGZvciB5b3UuXG4gICAqIFRvIHVwZGF0ZSBhIGRvY3VtZW50LCB5b3UgbXVzdCBpbmNsdWRlIGJvdGggYW4gX2lkIHBhcmFtZXRlciBhbmQgYSBfcmV2IHBhcmFtZXRlciwgd2hpY2ggc2hvdWxkIG1hdGNoIHRoZSBJRCBhbmQgcmV2aXNpb24gb2YgdGhlIGRvY3VtZW50IG9uIHdoaWNoIHRvIGJhc2UgeW91ciB1cGRhdGVzLlxuICAgKiBUbyBkZWxldGUgYSBkb2N1bWVudCwgaW5jbHVkZSBhIF9kZWxldGVkIHBhcmFtZXRlciB3aXRoIHRoZSB2YWx1ZSB0cnVlLlxuICAgKiBAZXhhbXBsZVxuICAgKiB2YXIgZG9jcyA9IFt7XG4gICAqICAgX2lkOiAndGVzdC1kb2MtMS0nICsgRGF0ZS5ub3coKSxcbiAgICogICBuYW1lOiAnVGVzdCBEb2MgMSdcbiAgICogfSxcbiAgICoge1xuICAgKiAgIF9pZDogJ3Rlc3QtZG9jLTItJyArIERhdGUubm93KCksXG4gICAqICAgbmFtZTogJ1Rlc3QgRG9jIDInXG4gICAqIH1dO1xuICAgKiBkYi5idWxrRG9jcyhkb2NzKS50aGVuKGZ1bmN0aW9uKHJlc3ApIHtcbiAgICogICBleHBlY3QocmVzcC5zdGF0dXMpLnRvQmUoMjAxKTtcbiAgICogICBleHBlY3QocmVzcC5kYXRhLmxlbmd0aCkudG9CZSgyKTtcbiAgICogfSk7XG4gICAqIEBwYXJhbSB7QXJyYXl9IGRvY3MgLSBBbiBhcnJheSBvZiBkb2N1bWVudCBvYmplY3RzXG4gICAqIEByZXR1cm4ge1Byb21pc2UgPFJlc3BvbnNlLCBFcnJvcj59IEEgcHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkL3JlamVjdGVkIHVwb24gc3VjY2Vzcy9mYWlsdXJlLlxuICAgKi9cbiAgYnVsa0RvY3MoZG9jcykge1xuICAgIGlmICghZG9jcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdidWxrRG9jcyAtIE11c3QgcHJvdmlkZSBhbiBhcnJheSBvZiBkb2N1bWVudHMhJyk7XG4gICAgfVxuICAgIHRoaXMubG9nLmxvZ0FwaSgnYnVsa0RvY3MnLCBkb2NzKTtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLnBvc3QoJy9fYnVsa19kb2NzJywge1xuICAgICAgZG9jczogZG9jc1xuICAgIH0pLnRoZW4odGhpcy5hZGFwdGVyLnBhcnNlSlNPTik7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIEEgbGlzdCBvZiBjaGFuZ2VzIG1hZGUgdG8gZG9jdW1lbnRzIGluIHRoZSBkYXRhYmFzZSwgaW4gdGhlIG9yZGVyIHRoZXkgd2VyZSBtYWRlLiBJdCByZXR1cm5zIGFuIG9iamVjdCB3aXRoIHRoZSBtZXRob2QgY2FuY2VsKCksIHdoaWNoIHlvdSBjYWxsIGlmIHlvdSBkb27igJl0IHdhbnQgdG8gbGlzdGVuIHRvIG5ldyBjaGFuZ2VzIGFueW1vcmUuXG4gICAqIEl0IGlzIGFuIGV2ZW50IGVtaXR0ZXIgYW5kIHdpbGwgZW1pdCBhICdjaGFuZ2UnIGV2ZW50IG9uIGVhY2ggZG9jdW1lbnQgY2hhbmdlLCBhICdjb21wbGV0ZScgZXZlbnQgd2hlbiBhbGwgdGhlIGNoYW5nZXMgaGF2ZSBiZWVuIHByb2Nlc3NlZCwgYW5kIGFuICdlcnJvcicgZXZlbnQgd2hlbiBhbiBlcnJvciBvY2N1cnMuXG4gICAqIEluIGFkZGl0aW9uIHRvIHRoZSAnY2hhbmdlJyBldmVudCwgYW55IGNoYW5nZSB3aWxsIGFsc28gZW1pdCBhICdjcmVhdGUnLCAndXBkYXRlJywgb3IgJ2RlbGV0ZScgZXZlbnQuXG4gICAqIEBleGFtcGxlXG4gICAqIHZhciBkYiA9IG5ldyBweC5tb2JpbGUuREIoJ3Rlc3RkYicsIHtiYXNlVXJsOiAnYWRhcHRlcjovL2xvY2FsaG9zdDo1OTg0L2RlZmF1bHQnfSk7XG4gICAqIHZhciBjaGFuZ2VzID0gZGIuY2hhbmdlcyh7XG4gICAqICAgIHNpbmNlOiAnbm93JyxcbiAgICogICAgbGl2ZTogdHJ1ZSxcbiAgICogICAgaW5jbHVkZV9kb2NzOiB0cnVlXG4gICAqIH0pXG4gICAqIC5vbignY2hhbmdlJywgZnVuY3Rpb24oY2hhbmdlKSB7XG4gICAqICAgIGNvbnNvbGUud2FybignQ2hhbmdlJywgY2hhbmdlKTtcbiAgICogfSlcbiAgICogLm9uKCdjb21wbGV0ZScsIGZ1bmN0aW9uKGluZm8pIHtcbiAgICogICAgY29uc29sZS53YXJuKCdDaGFuZ2VzIGNvbXBsZXRlZCcsIGluZm8pO1xuICAgKiB9KVxuICAgKiAub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuICAgKiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgKiB9KTtcbiAgICogY2hhbmdlcy5jYW5jZWwoKTsgLy8gd2hlbmV2ZXIgeW91IHdhbnQgdG8gY2FuY2VsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgdG8gc2VuZCB3aXRoIHRoZSBjaGFuZ2VzIHJlcXVlc3QuIEFsbCBvcHRpb25zIGRlZmF1bHQgdG8gZmFsc2UgdW5sZXNzIG90aGVyd2lzZSBzcGVjaWZpZWQuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5saXZlIC0gV2lsbCBlbWl0IGNoYW5nZSBldmVudHMgZm9yIGFsbCBmdXR1cmUgY2hhbmdlcyB1bnRpbCBjYW5jZWxsZWQuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5pbmNsdWRlX2RvY3MgLSBJbmNsdWRlIHRoZSBhc3NvY2lhdGVkIGRvY3VtZW50IHdpdGggZWFjaCBjaGFuZ2UuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5jb25mbGljdHMgLSBJbmNsdWRlIGNvbmZsaWN0cy5cbiAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmF0dGFjaG1lbnRzIC1JbmNsdWRlIGF0dGFjaG1lbnRzLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuYmluYXJ5IC0gUmV0dXJuIGF0dGFjaG1lbnQgZGF0YSBhcyBCbG9icy9CdWZmZXJzLCBpbnN0ZWFkIG9mIGFzIGJhc2U2NC1lbmNvZGVkIHN0cmluZ3MuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5kZXNjZW5kaW5nIC0gUmV2ZXJzZSB0aGUgb3JkZXIgb2YgdGhlIG91dHB1dCBkb2N1bWVudHMuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLnNpbmNlIC0gU3RhcnQgdGhlIHJlc3VsdHMgZnJvbSB0aGUgY2hhbmdlIGltbWVkaWF0ZWx5IGFmdGVyIHRoZSBnaXZlbiBzZXF1ZW5jZSBudW1iZXIuIFlvdSBjYW4gYWxzbyBwYXNzICdub3cnIGlmIHlvdSB3YW50IG9ubHkgbmV3IGNoYW5nZXMgKHdoZW4gbGl2ZSBpcyB0cnVlKS5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMubGltaXQgLSBMaW1pdCB0aGUgbnVtYmVyIG9mIHJlc3VsdHMgdG8gdGhpcyBudW1iZXIuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLnRpbWVvdXQgLSBSZXF1ZXN0IHRpbWVvdXQgKGluIG1pbGxpc2Vjb25kcykuXG4gICAqIEByZXR1cm4ge09iamVjdH0gQW4gb2JqZWN0IHdpdGggY2FuY2VsKCkgb24oZXZlbnQpIG1ldGhvZHMuXG4gICAqL1xuICBjaGFuZ2VzKG9wdGlvbnMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgbGl2ZTogZmFsc2UsXG4gICAgICBpbmNsdWRlX2RvY3M6IGZhbHNlLFxuICAgICAgY29uZmxpY3RzOiBmYWxzZSxcbiAgICAgIGF0dGFjaG1lbnRzOiBmYWxzZSxcbiAgICAgIGJpbmFyeTogZmFsc2UsXG4gICAgICBkZXNjZW5kaW5nOiBmYWxzZSxcbiAgICAgIHNpbmNlOiAwLFxuICAgICAgbGltaXQ6IG51bGwsXG4gICAgICBoZWFydGJlYXQ6IDEwMDBcbiAgICB9O1xuXG4gICAgb3B0aW9ucyA9IHRoaXMudXRpbHMuZXh0ZW5kKGRlZmF1bHRzLCBvcHRpb25zKTtcblxuXG4gICAgc2VsZi5sb2cubG9nQXBpKCdjaGFuZ2VzJywgb3B0aW9ucyk7XG5cbiAgICAvL2NoYW5nZXMgcmVxdWVzdFxuICAgIHZhciBfZmV0Y2hDaGFuZ2VzID0gZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLmxvZy5sb2dBcGkoJ19mZXRjaENoYW5nZXMnLCBvcHRpb25zKTtcblxuICAgICAgcmV0dXJuIHNlbGYuYWRhcHRlci5nZXQoJy9fY2hhbmdlcycsIHtcbiAgICAgICAgcGFyYW1zOiBvcHRpb25zXG4gICAgICB9KS50aGVuKHNlbGYuYWRhcHRlci5wYXJzZUpTT04pLnRoZW4oZnVuY3Rpb24ocmVzcCkge1xuICAgICAgICBvcHRpb25zLnNpbmNlID0gcmVzcC5kYXRhLmxhc3Rfc2VxO1xuXG4gICAgICAgIGlmIChfY2FsbGJhY2tzLmNoYW5nZSkge1xuICAgICAgICAgIGlmIChyZXNwLmRhdGEucmVzdWx0cykge1xuICAgICAgICAgICAgcmVzcC5kYXRhLnJlc3VsdHMuZm9yRWFjaChmdW5jdGlvbihjaGFuZ2UpIHtcbiAgICAgICAgICAgICAgX2NhbGxiYWNrcy5jaGFuZ2UoY2hhbmdlKTtcbiAgICAgICAgICAgICAgc2VsZi5sb2cubG9nQXBpKCdjaGFuZ2UnLCBjaGFuZ2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3AuZGF0YS5yZXN1bHRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGlmIChfY2FsbGJhY2tzLmNvbXBsZXRlKSB7XG4gICAgICAgICAgICBfY2FsbGJhY2tzLmNvbXBsZXRlKHJlc3ApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZWxmLmxvZy5sb2dBcGkoJ2NvbXBsZXRlJywgcmVzcCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzcDtcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICBpZiAoX2NhbGxiYWNrcy5lcnJvcikge1xuICAgICAgICAgIF9jYWxsYmFja3MuZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXJyO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBfY2FsbGJhY2tzID0ge307XG5cbiAgICAvL2NoYW5nZXMgZmVlZFxuICAgIHZhciBfZmVlZCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5sb2cubG9nQXBpKCdfZmVlZCcsIG9wdGlvbnMpO1xuICAgICAgX2ZldGNoQ2hhbmdlcygpO1xuICAgIH0sIG9wdGlvbnMuaGVhcnRiZWF0KTtcblxuICAgIHJldHVybiB7XG4gICAgICBvbjogZnVuY3Rpb24oZSwgY2IpIHtcbiAgICAgICAgX2NhbGxiYWNrc1tlXSA9IGNiO1xuICAgICAgICBzZWxmLmxvZy5sb2dBcGkoJ29uJywgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSxcbiAgICAgIGNhbmNlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYubG9nLmxvZ0FwaSgnY2FuY2VsJywgb3B0aW9ucyk7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoX2ZlZWQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG4iLCIvKipcbiAqIGRvbSBjbGFzcyBwcm92aWRlcyB2YXJpb3VzIHV0aWxpdHkgbWV0aG9kcyBvbiBhIGRvY3VtZW50IGVsZW1lbnQuXG4gKiBAZXhhbXBsZVxuICogdmFyICQgPSBzZWxlY3RvciA9PiBuZXcgRE9NKHNlbGVjdG9yKTtcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRE9NIHtcblxuXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgY29uc29sZS50aW1lKCdkb20nKTtcbiAgICB2YXIgbWF0Y2hlcyA9IHtcbiAgICAgICcjJzogJ2dldEVsZW1lbnRCeUlkJyxcbiAgICAgICcuJzogJ2dldEVsZW1lbnRzQnlDbGFzc05hbWUnLFxuICAgICAgJ0AnOiAnZ2V0RWxlbWVudHNCeU5hbWUnLFxuICAgICAgJz0nOiAnZ2V0RWxlbWVudHNCeVRhZ05hbWUnLFxuICAgICAgJyonOiAncXVlcnlTZWxlY3RvckFsbCdcbiAgICB9O1xuICAgIHZhciBtYXRjaCA9IG1hdGNoZXNbc2VsZWN0b3JbMF1dO1xuICAgIGlmICghbWF0Y2gpIHtcbiAgICAgIG1hdGNoID0gJ3F1ZXJ5U2VsZWN0b3JBbGwnO1xuICAgIH1cblxuICAgIGNvbnNvbGUud2FybignZG9tKCknLCBtYXRjaGVzLCBzZWxlY3Rvcik7XG5cblxuXG4gICAgdmFyIG91dCA9IG51bGwsXG4gICAgICBlbDtcblxuICAgIHRyeSB7XG4gICAgICBlbCA9ICgoKGNvbnRleHQgPT09IHVuZGVmaW5lZCkgPyBkb2N1bWVudCA6IGNvbnRleHQpW21hdGNoZXNdKHNlbGVjdG9yLnNsaWNlKDEpKSk7XG4gICAgICBvdXQgPSAoKGVsLmxlbmd0aCA8IDIpID8gZWxbMF0gOiBlbCk7XG4gICAgICBjb25zb2xlLndhcm4oJ2ZvdW5kJywgZWwpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuXG4gICAgICBjb25zb2xlLmVycm9yKCdlcnJvcicsIHNlbGVjdG9yLCAnbm90IGZvdW5kJyk7XG4gICAgfVxuXG5cblxuICAgIHRoaXMubGVuZ3RoID0gZWwubGVuZ3RoIHx8IDA7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvdXQpO1xuICAgIGNvbnNvbGUudGltZUVuZCgnZG9tJyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmaW5kKHNlbGVjdG9yLCBjb250ZXh0KSB7XG5cbiAgfVxuXG5cblxuICBjbG9uZSgpIHtcblxuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBBIGNhbGxiYWNrIHRvIGNhbGwgb24gZWFjaCBlbGVtZW50XG4gICAgICovXG4gIGVhY2goY2FsbGJhY2spIHtcbiAgICAvLyBjb252ZXJ0IHRoaXMgdG8gQXJyYXkgdG8gdXNlIGZvci4uLm9mXG4gICAgZm9yIChsZXQgZWwgb2YgQXJyYXkuZnJvbSh0aGlzKSkge1xuICAgICAgY2FsbGJhY2suY2FsbChlbCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIGNsYXNzIHRvIHNlbGVjdGVkIGVsZW1lbnRzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc05hbWUgVGhlIGNsYXNzIG5hbWUgdG8gYWRkXG4gICAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuY2xhc3NMaXN0KSB7XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3NOYW1lO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGNsYXNzIGZyb20gc2VsZWN0ZWQgZWxlbWVudHNcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZSBUaGUgY2xhc3MgbmFtZSB0byByZW1vdmVcbiAgICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB0byBzZWUgaWYgdGhlIGVsZW1lbnQgaGFzIGEgY2xhc3NcbiAgICogKE5vdGU6IE9ubHkgY2hlY2tzIHRoZSBmaXJzdCBlbGVtZW50cyBpZiBtb3JlIHRoYW4gb25lIGlzIHNlbGVjdGVkKVxuICAgKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lIFRoZSBjbGFzcyBuYW1lIHRvIGNoZWNrXG4gICAqL1xuICBoYXNDbGFzcyhjbGFzc05hbWUpIHtcbiAgICBpZiAodGhpcy5jbGFzc0xpc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnKF58ICknICsgY2xhc3NOYW1lICsgJyggfCQpJywgJ2dpJykudGVzdCh0aGlzLmNsYXNzTmFtZSk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgdmFyIGVsID0gdGhpcztcbiAgICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzTmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBjbGFzc2VzID0gZWwuY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG4gICAgICB2YXIgZXhpc3RpbmdJbmRleCA9IGNsYXNzZXMuaW5kZXhPZihjbGFzc05hbWUpO1xuXG4gICAgICBpZiAoZXhpc3RpbmdJbmRleCA+PSAwKSB7XG4gICAgICAgIGNsYXNzZXMuc3BsaWNlKGV4aXN0aW5nSW5kZXgsIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKGNsYXNzTmFtZSk7XG4gICAgICB9XG4gICAgICBlbC5jbGFzc05hbWUgPSBjbGFzc2VzLmpvaW4oJyAnKTtcbiAgICB9XG4gIH1cblxuICBjc3MocHJvcCwgdmFsdWUpIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuc3R5bGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZSBpZiAocHJvcCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3R5bGVbcHJvcF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnN0eWxlO1xuICAgIH1cbiAgfVxuXG4gIGF0dHIobmFtZSwgdmFsdWUpIHtcbiAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGRhdGEobmFtZSwgdmFsdWUpIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdkYXRhLScgKyBuYW1lLCB2YWx1ZSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLScgKyBuYW1lKTtcbiAgICB9XG4gIH1cblxuICBvbihldmVudCwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjaywgZmFsc2UpO1xuICAgIH0pO1xuICB9XG5cbiAgX29uKGV2ZW50TmFtZSwgZXZlbnRIYW5kbGVyKSB7XG4gICAgZXZlbnRUeXBlID0gZXZlbnRUeXBlLnNwbGl0KCcgJyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudFR5cGUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGVbaV0sIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBvZmYoZXZlbnROYW1lLCBldmVudEhhbmRsZXIpIHtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudEhhbmRsZXIpO1xuICB9XG5cbiAgdHJpZ2dlcihldmVudE5hbWUsIGV2ZW50RGF0YSkge1xuICAgIHZhciBldmVudDtcbiAgICBpZiAod2luZG93LkN1c3RvbUV2ZW50KSB7XG4gICAgICBldmVudCA9IG5ldyBDdXN0b21FdmVudChldmVudE5hbWUsIHtcbiAgICAgICAgZGV0YWlsOiBldmVudERhdGFcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgICAgZXZlbnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50TmFtZSwgdHJ1ZSwgdHJ1ZSwgZXZlbnREYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH1cblxuICBlbXB0eSgpIHtcbiAgICB0aGlzLmlubmVySFRNTCA9ICcnO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaHRtbChodG1sKSB7XG4gICAgaWYgKGh0bWwpIHtcbiAgICAgIHRoaXMuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5pbm5lckhUTUw7XG4gICAgfVxuICB9XG5cbiAgdGV4dCh0ZXh0KSB7XG4gICAgaWYgKHRleHQpIHtcbiAgICAgIHRoaXMudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHRDb250ZW50O1xuICAgIH1cbiAgfVxuICBuZXh0KCkge1xuICAgIHJldHVybiB0aGlzLm5leHRFbGVtZW50U2libGluZztcbiAgfVxuICBwcmV2KCkge1xuXG4gIH1cbiAgcGFyZW50KCkge1xuICAgIHJldHVybiB0aGlzLnBhcmVudE5vZGU7XG4gIH1cbiAgY2hpbGQoKSB7XG5cbiAgfVxuICBwb3NpdGlvbigpIHtcblxuICB9XG59XG5cbmV4cG9ydCB2YXIgJCA9IHNlbGVjdG9yID0+IG5ldyBET00oc2VsZWN0b3IpO1xuXG52YXIgZG9tID0gZnVuY3Rpb24oc2VsZWN0b3IsIGNvbnRleHQsIHVuZGVmaW5lZCkge1xuXG5cbiAgdmFyIG1hdGNoZXMgPSB7XG4gICAgJyMnOiAnZ2V0RWxlbWVudEJ5SWQnLFxuICAgICcuJzogJ2dldEVsZW1lbnRzQnlDbGFzc05hbWUnLFxuICAgICdAJzogJ2dldEVsZW1lbnRzQnlOYW1lJyxcbiAgICAnPSc6ICdnZXRFbGVtZW50c0J5VGFnTmFtZScsXG4gICAgJyonOiAncXVlcnlTZWxlY3RvckFsbCdcbiAgfVtzZWxlY3RvclswXV07XG5cbiAgLy9jb25zb2xlLndhcm4oJ2RvbSgpJywgbWF0Y2hlcywgc2VsZWN0b3IpO1xuICB2YXIgb3V0ID0gbnVsbCxcbiAgICBlbDtcbiAgdHJ5IHtcbiAgICBlbCA9ICgoKGNvbnRleHQgPT09IHVuZGVmaW5lZCkgPyBkb2N1bWVudCA6IGNvbnRleHQpW21hdGNoZXNdKHNlbGVjdG9yLnNsaWNlKDEpKSk7XG4gICAgb3V0ID0gKChlbC5sZW5ndGggPCAyKSA/IGVsWzBdIDogZWwpO1xuICAgIC8vY29uc29sZS53YXJuKCdmb3VuZCcsIGVsKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignZXJyb3InLCBzZWxlY3RvciwgJ25vdCBmb3VuZCcpO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn07XG5cblxuXG4vLyBUT0RPOiBFeHRlbmQgRWxlbWVudCBvbiBXaW5kb3cuXG5cbi8vZG9tKCcjaWRkaXYnKS5maW5kKCcuaW5zaWRlJylcbndpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgcmV0dXJuIGRvbShzZWxlY3RvciwgdGhpcyk7XG59O1xuXG4vL2RvbShlbCkuY2xvbmUoKVxud2luZG93LkVsZW1lbnQucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNsb25lTm9kZSh0cnVlKTtcbn07XG5cbi8vZG9tKGVsKS5oYXNDbGFzcyhuYW1lKVxud2luZG93LkVsZW1lbnQucHJvdG90eXBlLmhhc0NsYXNzID0gZnVuY3Rpb24oY2xhc3NOYW1lKSB7XG4gIGlmICh0aGlzLmNsYXNzTGlzdCkge1xuICAgIHJldHVybiB0aGlzLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKCcoXnwgKScgKyBjbGFzc05hbWUgKyAnKCB8JCknLCAnZ2knKS50ZXN0KHRoaXMuY2xhc3NOYW1lKTtcbiAgfVxufTtcblxuLy9kb20oZWwpLmFkZENsYXNzKG5hbWUpXG53aW5kb3cuRWxlbWVudC5wcm90b3R5cGUuYWRkQ2xhc3MgPSBmdW5jdGlvbihjbGFzc05hbWUpIHtcbiAgaWYgKHRoaXMuY2xhc3NMaXN0KSB7XG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3NOYW1lO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy9kb20oZWwpLnJlbW92ZUNsYXNzKG5hbWUpXG53aW5kb3cuRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbihjbGFzc05hbWUpIHtcbiAgdmFyIGVsID0gdGhpcztcbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKCcoXnxcXFxcYiknICsgY2xhc3NOYW1lLnNwbGl0KCcgJykuam9pbignfCcpICsgJyhcXFxcYnwkKScsICdnaScpLCAnICcpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy9kb20oZWwpLnRvZ2dsZUNsYXNzKG5hbWUpXG53aW5kb3cuRWxlbWVudC5wcm90b3R5cGUudG9nZ2xlQ2xhc3MgPSBmdW5jdGlvbihjbGFzc05hbWUpIHtcbiAgdmFyIGVsID0gdGhpcztcbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY2xhc3NlcyA9IGVsLmNsYXNzTmFtZS5zcGxpdCgnICcpO1xuICAgIHZhciBleGlzdGluZ0luZGV4ID0gY2xhc3Nlcy5pbmRleE9mKGNsYXNzTmFtZSk7XG5cbiAgICBpZiAoZXhpc3RpbmdJbmRleCA+PSAwKSB7XG4gICAgICBjbGFzc2VzLnNwbGljZShleGlzdGluZ0luZGV4LCAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2xhc3Nlcy5wdXNoKGNsYXNzTmFtZSk7XG4gICAgfVxuICAgIGVsLmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbignICcpO1xuICB9XG59O1xuXG4vL2RvbSgpLmNzcygncHJvcCcsICd2YWx1ZScpIHN1cHBvcnRcbndpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5jc3MgPSBmdW5jdGlvbihwcm9wLCB2YWx1ZSkge1xuICBpZiAodmFsdWUpIHtcbiAgICB0aGlzLnN0eWxlW3Byb3BdID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0gZWxzZSBpZiAocHJvcCkge1xuICAgIHJldHVybiB0aGlzLnN0eWxlW3Byb3BdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLnN0eWxlO1xuICB9XG59O1xuXG4vL2RvbShzZWxlY3RvcikuYXR0cigncHJvcCcsICd2YWx1ZScpXG53aW5kb3cuRWxlbWVudC5wcm90b3R5cGUuYXR0ciA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgaWYgKHZhbHVlKSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgfVxufTtcblxud2luZG93LkVsZW1lbnQucHJvdG90eXBlLmRhdGEgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICBpZiAodmFsdWUpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgnZGF0YS0nICsgbmFtZSwgdmFsdWUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS0nICsgbmFtZSk7XG4gIH1cbn07XG5cblxuXG53aW5kb3cuRWxlbWVudC5wcm90b3R5cGUub24gPSBmdW5jdGlvbihldmVudFR5cGUsIGNhbGxiYWNrKSB7XG4gIGV2ZW50VHlwZSA9IGV2ZW50VHlwZS5zcGxpdCgnICcpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50VHlwZS5sZW5ndGg7IGkrKykge1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGVbaV0sIGNhbGxiYWNrKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vcHgubW9iaWxlLmRvbSgnI3NhbmRib3gnKS5vZmYoJ2NsaWNrJywgaGFuZGxlcik7XG53aW5kb3cuRWxlbWVudC5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24oZXZlbnROYW1lLCBldmVudEhhbmRsZXIpIHtcbiAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRIYW5kbGVyKTtcbn07XG5cblxuLy9weC5tb2JpbGUuZG9tKCcjc2FuZGJveCcpLnRyaWdnZXIoJ2N1c3RvbS1ldmVudCcsIHtuYW1lOiAndmFsdWUnfSk7XG53aW5kb3cuRWxlbWVudC5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZXZlbnREYXRhKSB7XG4gIHZhciBldmVudDtcbiAgaWYgKHdpbmRvdy5DdXN0b21FdmVudCkge1xuICAgIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KGV2ZW50TmFtZSwge1xuICAgICAgZGV0YWlsOiBldmVudERhdGFcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgIGV2ZW50LmluaXRDdXN0b21FdmVudChldmVudE5hbWUsIHRydWUsIHRydWUsIGV2ZW50RGF0YSk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG59O1xuXG5cbi8vZG9tKGVsKS5lbXB0eSgpO1xud2luZG93LkVsZW1lbnQucHJvdG90eXBlLmVtcHR5ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuaW5uZXJIVE1MID0gJyc7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy9kb20oZWwpLmh0bWwoKTtcbndpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5odG1sID0gZnVuY3Rpb24oaHRtbCkge1xuICBpZiAoaHRtbCkge1xuICAgIHRoaXMuaW5uZXJIVE1MID0gaHRtbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5pbm5lckhUTUw7XG4gIH1cbn07XG5cbi8vZG9tKGVsKS50ZXh0KCk7XG53aW5kb3cuRWxlbWVudC5wcm90b3R5cGUudGV4dCA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgaWYgKHRleHQpIHtcbiAgICB0aGlzLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICByZXR1cm4gdGhpcztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy50ZXh0Q29udGVudDtcbiAgfVxufTtcblxuLy9kb20oZWwpLm5leHQoKTtcbndpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm5leHRFbGVtZW50U2libGluZztcbn07XG5cbi8vZG9tKGVsKS5wYXJlbnQoKTtcbndpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5wYXJlbnQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMucGFyZW50Tm9kZTtcbn07XG5cbi8vZG9tKGVsKS5yZW1vdmUoKTtcbndpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKTtcbn07XG5cbndpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5jaGlsZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jaGlsZHJlbjtcbn07XG4vL2RvbShlbCkucG9zaXRpb24oKTtcbndpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5wb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcG9zID0ge1xuICAgIGxlZnQ6IHRoaXMub2Zmc2V0TGVmdCxcbiAgICB0b3A6IHRoaXMub2Zmc2V0VG9wXG4gIH07XG4gIHJldHVybiBwb3M7XG59O1xuXG4vLyBUT0RPOiBFeHRlbmQgbm9kZWxpc3RcblxuLy9kb20oKS5hZGRDbGFzcygnbmFtZScpO1xud2luZG93Lk5vZGVMaXN0LnByb3RvdHlwZS5hZGRDbGFzcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdGhpcy5lYWNoKGZ1bmN0aW9uKGVsKSB7XG4gICAgZWwuY2xhc3NMaXN0LmFkZChuYW1lKTtcbiAgfSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gJCgpLnJlbW92ZUNsYXNzKCduYW1lJyk7XG53aW5kb3cuTm9kZUxpc3QucHJvdG90eXBlLnJlbW92ZUNsYXNzID0gZnVuY3Rpb24obmFtZSkge1xuICB0aGlzLmVhY2goZnVuY3Rpb24oZWwpIHtcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xuICB9KTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cbi8vZG9tLmV4dGVuZCh7fSwgb2JqQSwgb2JqQik7XG5kb20uZXh0ZW5kID0gZnVuY3Rpb24ob3V0KSB7XG4gIG91dCA9IG91dCB8fCB7fTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIWFyZ3VtZW50c1tpXSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGZvciAodmFyIGtleSBpbiBhcmd1bWVudHNbaV0pIHtcbiAgICAgIGlmIChhcmd1bWVudHNbaV0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBvdXRba2V5XSA9IGFyZ3VtZW50c1tpXVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gb3V0O1xufTtcblxuXG5cbi8vIGRvaW5nIGEgZmluZCBpbiBhIE5vZGVMaXN0IGRvZXNudCByZWFsbHkgd29yay4gSSBoYWQgYSBmdW5jdGlvbiB0aGF0XG4vLyB3b3VsZCBsb29rIGluc2lkZSBhbmQgZ2V0IHRoZSBlbGVtZW50IGJ1dCBpdCB3YXMgcHJldHR5IGJpZyBhbmRcbi8vIHJlcXVpcmVkIHJlY3VzaXZlIHNlYXJjaGluZyBpbnNpZGUgTm9kZUxpc3RzLiBTbyBJIHdvdWxkIHN1Z2dlc3QganVzdFxuLy8gdXNpbmcgYSAnKicgc2VsZWN0aW9uIG1ldGhvZFxud2luZG93Lk5vZGVMaXN0LnByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24gZmluZChlbGVtKSB7XG4gIGNvbnNvbGUuZXJyb3IoJ1lvdSBjYW5ub3QgZmluZCBpbiBhIE5vZGVMaXN0LiBKdXN0IHVzZSAkKCpzZWxlY3RvciAlcyknLCBlbGVtKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBhbm90aGVyIHVzZWZ1bCBvbmUgZm9yIGRvaW5nICQoJy5pbnNpZGUnKS5lYWNoKClcbndpbmRvdy5Ob2RlTGlzdC5wcm90b3R5cGUuZWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xuXG5cbndpbmRvdy5Ob2RlTGlzdC5wcm90b3R5cGUuYXR0ciA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHRoaXMuZWFjaChmdW5jdGlvbihlbCkge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbndpbmRvdy5Ob2RlTGlzdC5wcm90b3R5cGUudG9nZ2xlQ2xhc3MgPSBmdW5jdGlvbihjbGFzc05hbWUpIHtcbiAgdGhpcy5lYWNoKGZ1bmN0aW9uKGVsKSB7XG4gICAgZWwudG9nZ2xlQ2xhc3MoY2xhc3NOYW1lKTtcbiAgfSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuXG53aW5kb3cuTm9kZUxpc3QucHJvdG90eXBlLmNzcyA9IGZ1bmN0aW9uKHByb3AsIHZhbHVlKSB7XG4gIHRoaXMuZWFjaChmdW5jdGlvbihlbCkge1xuICAgIGVsLmNzcyhwcm9wLCB2YWx1ZSk7XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07XG5cblxuXG53aW5kb3cuTm9kZUxpc3QucHJvdG90eXBlLm9uID0gZnVuY3Rpb24oZXZlbnRUeXBlLCBjYWxsYmFjaykge1xuICB0aGlzLmVhY2goZnVuY3Rpb24oZWwpIHtcbiAgICBlbC5vbihldmVudFR5cGUsIGNhbGxiYWNrKTtcbiAgfSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuXG5cbndpbmRvdy5Ob2RlTGlzdC5wcm90b3R5cGUuZmlyc3QgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICh0aGlzLmxlbmd0aCA8IDIpID8gdGhpcyA6IHRoaXNbMF07XG59O1xuXG53aW5kb3cuTm9kZUxpc3QucHJvdG90eXBlLmxhc3QgPSBmdW5jdGlvbigpIHtcbiAgLy8gaWYgdGhlcmUgYXJlIG1hbnkgaXRlbXMsIHJldHVybiB0aGUgbGFzdFxuICByZXR1cm4gKHRoaXMubGVuZ3RoID4gMSkgPyB0aGlzW3RoaXMubGVuZ3RoIC0gMV0gOiB0aGlzO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZG9tO1xuIiwiLypnbG9iYWxzIFJlcXVlc3QsIFByb21pc2UqL1xuJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IEJhc2VDbGFzcyBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IExvZ2dlciBmcm9tICcuL2xvZyc7XG5pbXBvcnQgSW50ZXJmYWNlcyBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG4vKipcbiAqIEhUVFAgY2xhc3MgcHJvdmlkZXMgYW4gYWJzdHJhY3Rpb24gbGF5ZXIgZm9yIEhUVFAgY2FsbHMuXG4gKiBAZXhhbXBsZVxuICogdmFyICRodHRwID0gbmV3IHB4Lm1vYmlsZS5IVFRQKCdodHRwMScsIHtcbiAqICBiYXNlVXJsOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luXG4gKiB9KTtcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFRUUCBleHRlbmRzIEJhc2VDbGFzcyB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBhIEhUVFAgc2VydmljZS5cbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHNlcnZpY2VcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgZGVmYXVsdCBvcHRpb25zIHRvIHBhc3NcbiAgICogQHJldHVybiB7SFRUUH0gQW4gaW5zdGFuY2Ugb2YgdGhlIEhUVFAgY2xhc3NcbiAgICovXG4gIGNvbnN0cnVjdG9yKG5hbWUgPSAnaHR0cCcsIG9wdGlvbnMgPSB7XG4gICAgYmFzZVVybDogJy9kZWZhdWx0J1xuICB9KSB7XG4gICAgc3VwZXIobmFtZSwgb3B0aW9ucyk7XG5cbiAgICBjb25zb2xlLndhcm4oJ0hUVFAnLCB0aGlzLCBvcHRpb25zKTtcblxuICAgIGlmICghb3B0aW9ucy5iYXNlVXJsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0hUVFA6IE11c3QgcHJvdmlkZSBhIGJhc2VVcmwnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiAgSSBoYW5kbGUgY2hlY2tpbmcgdGhlIHJlc3BvbnNlIHN0YXR1cyBjb2RlIG9mIGEgSFRUUCByZXF1ZXN0LlxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNwb25zZSBBIFJlc3BvbnNlIG9iamVjdFxuICAgKiBAcmV0dXJuIHtSZXNwb25zZX0gVGhlIG9yaWdpbmFsIHJlc3BvbnNlXG4gICAqL1xuICBjaGVja1N0YXR1cyhyZXNwb25zZSkge1xuICAgIGNvbnNvbGUud2FybihyZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLnN0YXR1c1RleHQsIHJlc3BvbnNlLnVybCwgcmVzcG9uc2UpO1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMjAwICYmIHJlc3BvbnNlLnN0YXR1cyA8IDMwMCkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG4gICAgICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJIGhhbmRsZSBwYXJzaW5nIHRoZSBKU09OIG9mIGEgcmVzcG9uc2UuXG4gICAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc3BvbnNlIEEgUmVzcG9uc2Ugb2JqZWN0XG4gICAqIEByZXR1cm4ge1Jlc3BvbnNlfSBUaGUgb3JpZ2luYWwgcmVzcG9uc2Ugd2l0aCBhIGRhdGEgcHJvcGVydHkgdGhhdCBpcyB0aGUgcGFyc2VkIEpTT05cbiAgICovXG4gIHBhcnNlSlNPTihyZXNwb25zZSkge1xuICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwYXNzIGEgcmVzcG9uc2Ugb2JqZWN0IHRvIHBhcnNlSlNPTiEnKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKS50aGVuKGZ1bmN0aW9uKGpzb24pIHtcbiAgICAgIHJlc3BvbnNlLmRhdGEgPSBqc29uO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqICBJIG1ha2UgYSBIVFRQIHJlcXVlc3QgZm9yIEpTT04uXG4gICAqIEBleGFtcGxlXG4gICAqICRodHRwLmdldEpTT04oJy9kZWZhdWx0L19hbGxfZG9jcycsIHtsaW1pdDogNX0pLnRoZW4oZnVuY3Rpb24ocmVzcCl7XG4gICAqICAgIC8vaGFuZGxlIGpzb25cbiAgICogfSkuY2F0Y2goZnVuY3Rpb24oZXJyKXtcbiAgICogICAgLy9oYW5kbGUgZXJyb3JcbiAgICogfSk7XG4gICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgLSBUaGUgdXJsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gUmVxdWVzdCBvcHRpb25zIG9iamVjdFxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyBhIHJlc3BvbnNlXG4gICAqL1xuICBnZXRKU09OKHVybCA9ICcnLCBvcHRpb25zID0ge30pIHtcbiAgICBsZXQgcmVxID0gbmV3IFJlcXVlc3QodXJsLCBvcHRpb25zIHx8IHtcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KTtcbiAgICByZXR1cm4gZmV0Y2gocmVxKVxuICAgICAgLnRoZW4odGhpcy5jaGVja1N0YXR1cylcbiAgICAgIC50aGVuKHRoaXMucGFyc2VKU09OKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcmVzcG9uc2Ugb2JqZWN0IGhhcyB0aGVzZSBwcm9wZXJ0aWVzOlxuICAgKiBAZXhhbXBsZVxuICAgKiAkaHR0cC5yZXF1ZXN0KCcvZGVmYXVsdCcsIHtcbiAgICogICAgbWV0aG9kOiAnUE9TVCcsXG4gICAqICAgIGRhdGE6IGRhdGFcbiAgICogfSkudGhlbihmdW5jdGlvbihyZXNwKXtcbiAgICogICAgLy9oYW5kbGUgcmVzcG9uc2VcbiAgICogfSkuY2F0Y2goZnVuY3Rpb24oZXJyKXtcbiAgICogICAgLy9oYW5kbGUgZXJyb3JcbiAgICogfSk7XG4gICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgLSBUaGUgdXJsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3B0aW9ucyB0byBwYXNzXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIGEgcmVzcG9uc2VcbiAgICovXG4gIHJlcXVlc3QodXJsLCBvcHRpb25zKSB7XG4gICAgdmFyIGNvbmZpZyA9IHRoaXMudXRpbHMuZXh0ZW5kKHtcbiAgICAgIGRhdGE6IG51bGwsXG4gICAgICBwYXJhbXM6IG51bGwsXG4gICAgICBib2R5OiBudWxsLFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfVxuICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgaWYgKG9wdGlvbnMuZGF0YSkge1xuICAgICAgY29uZmlnLmJvZHkgPSBKU09OLnN0cmluZ2lmeShvcHRpb25zLmRhdGEpO1xuICAgICAgZGVsZXRlIGNvbmZpZy5kYXRhO1xuICAgIH1cblxuICAgIHVybCA9IHRoaXMudXRpbHMucmVzb2x2ZVVSTCh0aGlzLmJhc2VVcmwsIHVybCk7XG4gICAgLy91cmwgPSB0aGlzLnV0aWxzLnJlc29sdmVVUkwodXJsKTtcblxuICAgIGlmIChvcHRpb25zLnBhcmFtcykge1xuICAgICAgdXJsID0gdGhpcy51dGlscy5yZXNvbHZlVVJMKHVybCwgb3B0aW9ucy5wYXJhbXMpO1xuICAgICAgZGVsZXRlIG9wdGlvbnMucGFyYW1zO1xuICAgIH1cblxuICAgIC8vdGhpcy5sb2cubG9nQXBpKGByZXF1ZXN0ID0+ICR7dXJsfWAsIGNvbmZpZyk7XG4gICAgdGhpcy5sb2cubG9nSHR0cChjb25maWcubWV0aG9kLCB1cmwpO1xuXG5cbiAgICBsZXQgYmVuY2htYXJrID0gdGhpcy5sb2cubG9nVGltZSgncmVxdWVzdCcpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICByZXR1cm4gZmV0Y2gobmV3IFJlcXVlc3QodXJsLCBjb25maWcpKS50aGVuKChyZXNwKSA9PiB7XG4gICAgICAgIHRoaXMubG9nLmxvZ0h0dHAocmVzcC5zdGF0dXMgKyAnICcgKyBiZW5jaG1hcmsuZW5kKCksIHJlc3AsIHRydWUpO1xuICAgICAgICAvL3JldHVybiB0aGlzLnBhcnNlSlNPTihyZXNwKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIHJlc3AuZGF0YSA9IHt9O1xuICAgICAgICByZXNvbHZlKHJlc3ApO1xuICAgICAgfSwgcmVqZWN0KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJIG1ha2UgYSBIVFRQIEdFVCByZXF1ZXN0LlxuICAgKiBAZXhhbXBsZVxuICAgKiAkaHR0cC5nZXQoJy9kZWZhdWx0L19hbGxfZG9jcycsIHtsaW1pdDogNX0pLnRoZW4oZnVuY3Rpb24ocmVzcCl7XG4gICAqICAgIC8vaGFuZGxlIHJlc3A6UmVzcG9uc2VcbiAgICogfSkuY2F0Y2goZnVuY3Rpb24oZXJyKXtcbiAgICogICAgLy9oYW5kbGUgZXJyb3JcbiAgICogfSk7XG4gICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIHVybFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBPcHRpb25zIHRvIHBhc3NcbiAgICogQHJldHVybiB7UHJvbWlzZX0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgYSByZXNwb25zZVxuICAgKi9cbiAgZ2V0KHVybCA9ICcnLCBvcHRpb25zID0ge30pIHtcbiAgICB0aGlzLmxvZy5sb2dBcGkoJ2dldCcsIG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXJsLCBvcHRpb25zKS50aGVuKHRoaXMucGFyc2VKU09OKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJIG1ha2UgYSBIVFRQIFBVVCByZXF1ZXN0LlxuICAgKiBAZXhhbXBsZVxuICAkaHR0cC5wdXQoJy9kZWZhdWx0L2lkJywge25hbWU6ICd2YWx1ZSd9KS50aGVuKGZ1bmN0aW9uKHJlc3Ape1xuICAgIC8vaGFuZGxlIHJlc3A6UmVzcG9uc2VcbiAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKXtcbiAgICAvL2hhbmRsZSBlcnJvclxuICB9KTtcblxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSB1cmxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgT3B0aW9ucyB0byBwYXNzXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIGEgcmVzcG9uc2VcbiAgICovXG4gIHB1dCh1cmwgPSAnJywgZGF0YSA9IG51bGwsIG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMubG9nLmxvZ0FwaSgncHV0JywgZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1cmwsIHRoaXMudXRpbHMuZXh0ZW5kKHtcbiAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSwgb3B0aW9ucykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEkgbWFrZSBhIEhUVFAgUE9TVCByZXF1ZXN0LlxuICAgKiBAZXhhbXBsZVxuICRodHRwLnBvc3QoJy9kZWZhdWx0Jywge25hbWU6ICd2YWx1ZSd9KS50aGVuKGZ1bmN0aW9uKHJlc3Ape1xuICAgLy9oYW5kbGUgcmVzcDpSZXNwb25zZVxuIH0pLmNhdGNoKGZ1bmN0aW9uKGVycil7XG4gICAvL2hhbmRsZSBlcnJvclxuIH0pO1xuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIHVybFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBPcHRpb25zIHRvIHBhc3NcbiAgICogQHJldHVybiB7UHJvbWlzZX0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgYSByZXNwb25zZVxuICAgKi9cbiAgcG9zdCh1cmwgPSAnJywgZGF0YSA9IG51bGwsIG9wdGlvbnMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXJsLCB0aGlzLnV0aWxzLmV4dGVuZCh7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9LCBvcHRpb25zKSk7XG4gIH1cblxuICAvKipcbiAgICogSSBtYWtlIGEgSFRUUCBERUxFVEUgcmVxdWVzdC5cbiAgICogQGV4YW1wbGVcbiAkaHR0cC5kZWxldGUoJy9kZWZhdWx0L2lkJykudGhlbihmdW5jdGlvbihyZXNwKXtcbiAgIC8vaGFuZGxlIHJlc3A6UmVzcG9uc2VcbiB9KS5jYXRjaChmdW5jdGlvbihlcnIpe1xuICAgLy9oYW5kbGUgZXJyb3JcbiB9KTtcblxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSB1cmxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgT3B0aW9ucyB0byBwYXNzXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIGEgcmVzcG9uc2VcbiAgICovXG4gIGRlbGV0ZSh1cmwgPSAnJywgb3B0aW9ucyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1cmwsIHRoaXMudXRpbHMuZXh0ZW5kKHtcbiAgICAgIG1ldGhvZDogJ0RFTEVURSdcbiAgICB9LCBvcHRpb25zKSk7XG4gIH1cblxuICAvKipcbiAgICogSSBtYWtlIGEgSFRUUCBIRUFEIHJlcXVlc3QuXG4gICAqIEBleGFtcGxlXG4gICRodHRwLmhlYWQoJy9kZWZhdWx0L2lkJykudGhlbihmdW5jdGlvbihyZXNwKXtcbiAgICAvL2hhbmRsZSByZXNwOlJlc3BvbnNlXG4gIH0pLmNhdGNoKGZ1bmN0aW9uKGVycil7XG4gICAgLy9oYW5kbGUgZXJyb3JcbiAgfSk7XG5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgdXJsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIE9wdGlvbnMgdG8gcGFzc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyBhIHJlc3BvbnNlXG4gICAqL1xuICBoZWFkKHVybCA9ICcnLCBvcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHVybCwgdGhpcy51dGlscy5leHRlbmQoe1xuICAgICAgbWV0aG9kOiAnSEVBRCdcbiAgICB9LCBvcHRpb25zKSk7XG4gIH1cblxufVxuIiwiLyoqXG4gKiBAZGVzY3JpcHRpb24gVGFrZW4gZnJvbSBodHRwOi8vanNjcmlwdHBhdHRlcm5zLmJsb2dzcG90LmNvbS8yMDEzLzAxL2phdmFzY3JpcHQtaW50ZXJmYWNlcy5odG1sXG4gKiBAZXhhbXBsZVxuIHZhciBJRXhhbXBsZSA9IG5ldyBJbnRlcmZhY2UoJ0V4YW1wbGUnLCBbJ2FkZCcsICdyZW1vdmUnLCAnZ2V0J10pO1xuIHZhciBFeGFtcGxlQ2xhc3MgPSB7XG4gICAgYWRkOiBmdW5jdGlvbigpe30sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbigpe30sXG4gICAgZ2V0OiBmdW5jdGlvbigpe31cbiAgfTtcbiAgSW50ZXJmYWNlLmVuc3VyZUltcGxlbWVudHMoRXhhbXBsZUNsYXNzLCBJRXhhbXBsZSlcbiBAcGFyYW0ge1N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgaW50ZXJmYWNlXG4gQHBhcmFtIHttZXRob2RzfSBBcnJheSBUaGUgbWV0aG9kcyB0aGUgY2xhc3Mgb2JqZWN0IG11c3QgaW1wbGVtZW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVyZmFjZXtcblxuICBjb25zdHJ1Y3RvcihuYW1lLCBtZXRob2RzKSB7XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCAhPT0gMikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW50ZXJmYWNlIGNvbnN0cnVjdG9yIGNhbGxlZCB3aXRoIFwiICsgYXJndW1lbnRzLmxlbmd0aCArIFwiYXJndW1lbnRzLCBidXQgZXhwZWN0ZWQgZXhhY3RseSAyLlwiKTtcbiAgICB9XG5cbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubWV0aG9kcyA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gbWV0aG9kcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAodHlwZW9mIG1ldGhvZHNbaV0gIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW50ZXJmYWNlIGNvbnN0cnVjdG9yIGV4cGVjdHMgbWV0aG9kIG5hbWVzIHRvIGJlIHBhc3NlZCBpbiBhcyBhIHN0cmluZy5cIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1ldGhvZHMucHVzaChtZXRob2RzW2ldKTtcbiAgICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBIYW5kbGUgZW5zdXJpbmcgYSBvYmplY3QgaW1wbGVtZW50cyB0aGUgc3BlY2lmaWVkIGludGVyZmFjZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0cyB0byB2ZXJpZnlcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgZW5zdXJlSW1wbGVtZW50cyhvYmplY3QpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRnVuY3Rpb24gSW50ZXJmYWNlLmVuc3VyZUltcGxlbWVudHMgY2FsbGVkIHdpdGggJyArIGFyZ3VtZW50cy5sZW5ndGggK1xuICAgICAgJ2FyZ3VtZW50cywgYnV0IGV4cGVjdGVkIGF0IGxlYXN0IDIuJyk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDEsIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgdmFyIF9pbnRlcmZhY2UgPSBhcmd1bWVudHNbaV07XG4gICAgICBpZiAoX2ludGVyZmFjZS5jb25zdHJ1Y3RvciAhPT0gSW50ZXJmYWNlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnRnVuY3Rpb24gSW50ZXJmYWNlLmVuc3VyZUltcGxlbWVudHMgZXhwZWN0cyBhcmd1bWVudHMgdHdvIGFuZCBhYm92ZSB0byBiZSBpbnN0YW5jZXMgb2YgSW50ZXJmYWNlLicpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBqID0gMCwgbWV0aG9kc0xlbiA9IF9pbnRlcmZhY2UubWV0aG9kcy5sZW5ndGg7IGogPCBtZXRob2RzTGVuOyBqKyspIHtcbiAgICAgICAgdmFyIG1ldGhvZCA9IF9pbnRlcmZhY2UubWV0aG9kc1tqXTtcbiAgICAgICAgaWYgKCFvYmplY3RbbWV0aG9kXSB8fCB0eXBlb2Ygb2JqZWN0W21ldGhvZF0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Z1bmN0aW9uIEludGVyZmFjZS5lbnN1cmVJbXBsZW1lbnRzOiBvYmplY3QgZG9lcyBub3QgaW1wbGVtZW50IHRoZSAnICsgX2ludGVyZmFjZS5uYW1lICtcbiAgICAgICAgICAnIGludGVyZmFjZS4gTWV0aG9kICcgKyBtZXRob2QgKyAnIHdhcyBub3QgZm91bmQuICcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbn1cbiIsIi8vIFRPRE86IEFsbCBpbnRlcmZhY2VzIGRlZmluZWQgaGVyZSB0byBlbnN1cmUgbW9kdWxlcyBpbXBsZW1lbnQ7XG5pbXBvcnQgSW50ZXJmYWNlIGZyb20gJy4vaW50ZXJmYWNlJztcblxuLyoqXG4gKiBBbGwgaW50ZXJmYWNlcyBkZWZpbmVkIGhlcmUgdG8gZW5zdXJlIG1vZHVsZXMgaW1wbGVtZW50O1xuICogQHR5cGUge09iamVjdH1cbiAqL1xuY29uc3QgSW50ZXJmYWNlcyA9IHt9O1xuXG4vKipcbiAqIERhdGFiYXNlIGludGVyZmFjZSAtIEFsbCBkYXRhYmFzZSBhZGFwdGVycyBtdXN0IGltcGxlbWVudCB0aGlzIGludGVyZmFjZS5cbiAqIEBpbnRlcmZhY2UgSURCSW50ZXJmYWNlXG4gKiBAdHlwZSB7SW50ZXJmYWNlfVxuICovXG5JbnRlcmZhY2VzLklEQkludGVyZmFjZSA9IG5ldyBJbnRlcmZhY2UoJ0lEQkludGVyZmFjZScsIFtcbiAgJ2dldEF0dGFjaG1lbnQnLCAnc2F2ZUF0dGFjaG1lbnQnLFxuICAnZ2V0JywgJ3B1dCcsICdwb3N0JywgJ3JlbW92ZScsXG4gICdhbGxEb2NzJywgJ2J1bGtEb2NzJywgJ2NoYW5nZXMnXG5dKTtcbi8qKlxuICogSFRUUCBpbnRlcmZhY2UgLSBBbGwgSFRUUCBhZGFwdGVycyBtdXN0IGltcGxlbWVudCB0aGlzIGludGVyZmFjZS5cbiAqIEBpbnRlcmZhY2UgSUhUVFBJbnRlcmZhY2VcbiAqIEB0eXBlIHtJbnRlcmZhY2V9XG4gKi9cbkludGVyZmFjZXMuSUhUVFBJbnRlcmZhY2UgPSBuZXcgSW50ZXJmYWNlKCdJSFRUUEludGVyZmFjZScsIFtcbiAgJ2dldCcsICdwdXQnLCAncG9zdCcsICdkZWxldGUnLCAnaGVhZCcsICdyZXF1ZXN0J1xuXSk7XG5cbmV4cG9ydCBkZWZhdWx0IEludGVyZmFjZXM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBCYXNlQ2xhc3MgZnJvbSAnLi9iYXNlJztcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuXG4vKipcbiAqIExvZ2dlciBjbGFzcyBwcm92aWRlcyBjdXN0b21pemVkIGxvZ2dpbmcgdG8gdGhlIGNvbnNvbGUuXG4gKiBweGRiOmh0dHAgR0VUIGh0dHA6Ly8xMjcuMC4wLjE6NTk4NC9kZWZhdWx0LyArMG1zXG4gKiBweGRiOmFwaSBkZWZhdWx0ICsyOG1zIGlkXG4gKiBweGRiOmFwaSBkZWZhdWx0ICsxbXMgaWQgc3VjY2VzcyA5RkE4RTVCNS1GQTUxLTlBOTUtOTAxRS1FNkREOEQ2RDRCOTBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nZ2VyIHtcblxuICBjb25zdHJ1Y3RvcihjYXRlZ29yeSA9ICdsb2cnLCBvcHRpb25zID0ge30pIHtcbiAgICB0aGlzLmNhdGVnb3J5ID0gY2F0ZWdvcnk7XG4gICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgY29sb3JzOiB7XG4gICAgICAgIHRyYWNlOiAnY29sb3I6Izc2NzJFNjsnLFxuICAgICAgICBzdWNjZXNzOiAnY29sb3I6IzI4OEEyOTsnLFxuICAgICAgICBpbmZvOiAnY29sb3I6IzFGOUEyRDsnLFxuICAgICAgICB3YXJuOiAnY29sb3I6IzlFOUUyMzsnLFxuICAgICAgICBmYXRhbDogJ2NvbG9yOiNDMDU3QkE7JyxcbiAgICAgICAgZXJyb3I6ICdjb2xvcjojRkMxMjFFOycsXG4gICAgICAgIGRlYnVnOiAnY29sb3I6Izc2NzJFNjsnXG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLm9wdGlvbnMgPSBkb20uZXh0ZW5kKGRlZmF1bHRzLCBvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxvZyhsZXZlbCwgYXJncykge1xuICAgIGxldCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgdmFyIGxvZyA9ICh3aW5kb3cuY29uc29sZSkgPyB3aW5kb3cuY29uc29sZS5sb2cuYmluZCh3aW5kb3cuY29uc29sZSkgOiBmdW5jdGlvbigpIHt9O1xuICAgIGxvZyhgWyR7dGltZXN0YW1wfV0gWyR7bGV2ZWx9XSBbJHt0aGlzLmNhdGVnb3J5fV1gLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgZGVidWcoYXJncykge1xuICAgIHJldHVybiB0aGlzLmxvZygnREVCVUcnLCBhcmdzKTtcbiAgfVxuXG4gIGluZm8oYXJncykge1xuICAgIHJldHVybiB0aGlzLmxvZygnSU5GTycsIGFyZ3MpO1xuICB9XG5cbiAgd2FybihhcmdzKSB7XG4gICAgcmV0dXJuIHRoaXMubG9nKCdXQVJOJywgYXJncyk7XG4gIH1cblxuICBlcnJvcihhcmdzKSB7XG4gICAgcmV0dXJuIHRoaXMubG9nKCdFUlJPUicsIGFyZ3MpO1xuICB9XG5cbiAgLyoqXG4gICAqIExvZyBhIEFQSSBtZXRob2QgdG8gdGhlIGNvbnNvbGUuXG4gICAqIEBleGFtcGxlXG4gICAgbG9nZ2VyLmxvZ0FwaSgnc29tZU1ldGhvZCcsIHt9LCB0cnVlKTtcbiAgICBsb2dnZXIubG9nQXBpKCdzb21lTWV0aG9kJywge30sIGZhbHNlKTtcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZCAtIFRoZSBuYW1lIG9mIHRoZSBtZXRob2QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBUaGUgcGFyYW1zIHRvIGxvZy5cbiAgICovXG4gIGxvZ0FwaShtZXRob2QsIHBhcmFtcywgc3VjY2Vzcykge1xuICAgIGlmICghcGFyYW1zKSB7XG4gICAgICBwYXJhbXMgPSB7fTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coJyVjWyVzOmFwaV0gJXMgJW8nLCAoc3VjY2VzcyA/IHRoaXMub3B0aW9ucy5jb2xvcnMuc3VjY2VzcyA6IHRoaXMub3B0aW9ucy5jb2xvcnMuZGVidWcpLCB0aGlzLmNhdGVnb3J5LFxuICAgICAgbWV0aG9kLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIExvZyBhIEFQSSBtZXRob2QgdG8gdGhlIGNvbnNvbGUuXG4gICAqIEBleGFtcGxlXG4gICAgbG9nZ2VyLmxvZ0h0dHAoJ0dFVCcsICcvZGVmYXVsdCcsIHRydWUpO1xuICAgIGxvZ2dlci5sb2dIdHRwKCdQVVQnLCAnL2RlZmF1bHQnLCBmYWxzZSk7XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2QgLSBUaGUgbmFtZSBvZiB0aGUgbWV0aG9kLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gVGhlIHBhcmFtcyB0byBsb2cuXG4gICAqL1xuICBsb2dIdHRwKG1ldGhvZCwgdXJsLCBzdWNjZXNzKSB7XG4gICAgY29uc29sZS5sb2coJyVjWyVzOmh0dHBdICVjJXMgJWMlbycsIChzdWNjZXNzID8gdGhpcy5vcHRpb25zLmNvbG9ycy5zdWNjZXNzIDogdGhpcy5vcHRpb25zLmNvbG9ycy5pbmZvKSwgdGhpcy5jYXRlZ29yeSxcbiAgICAgIG51bGwsIG1ldGhvZCwgbnVsbCwgdXJsKTtcbiAgfVxuXG4gIGxvZ1RpbWUobmFtZSkge1xuICAgIHZhciBzdGFydCA9IG5ldyBEYXRlKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAobmV3IERhdGUoKS5nZXRNaWxsaXNlY29uZHMoKSAtIHN0YXJ0LmdldE1pbGxpc2Vjb25kcygpICsgJ21zJyk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG59XG4iLCIndXNlIHN0cmljdCc7XG4vLyBUT0RPOiBWZW5kb3Jcbi8vcmVxdWlyZSgnLi4vdmVuZG9yL292ZXJ0aHJvdy9vdmVydGhyb3cnKVxuLy9yZXF1aXJlKCcuLi92ZW5kb3IvZXM2LXNoaW0nKVxuLy9yZXF1aXJlKCcuLi92ZW5kb3IvZmV0Y2gnKVxuLy9yZXF1aXJlKCcuLi92ZW5kb3IvZmFzdGNsaWNrJylcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IEJhc2VDbGFzcyBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IENvbGxlY3Rpb24gZnJvbSAnLi9jb2xsZWN0aW9uJztcbmltcG9ydCBBcHAgZnJvbSAnLi9hcHAnO1xuaW1wb3J0IENvcmUgZnJvbSAnLi9jb3JlJztcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuaW1wb3J0IERCIGZyb20gJy4vZGInO1xuaW1wb3J0IEhUVFAgZnJvbSAnLi9odHRwJztcbmltcG9ydCBNb2RlbCBmcm9tICcuL21vZGVsJztcbmltcG9ydCBSb3V0ZXIgZnJvbSAnLi9yb3V0ZXInO1xuaW1wb3J0IFNpbXBsZVJvdXRlciBmcm9tICcuL3NpbXBsZS1yb3V0ZXInO1xuaW1wb3J0IFBhZ2UgZnJvbSAnLi9wYWdlJztcbmltcG9ydCBQYWdlcyBmcm9tICcuL3BhZ2VzJztcbmltcG9ydCBWaWV3cyBmcm9tICcuL3ZpZXdzJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5pbXBvcnQgUHViU3ViIGZyb20gJy4vcHVic3ViJztcbmltcG9ydCBJbnRlcmZhY2UgZnJvbSAnLi9pbnRlcmZhY2UnO1xuaW1wb3J0IEludGVyZmFjZXMgZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCBMb2dnZXIgZnJvbSAnLi9sb2cnO1xuXG52YXIgcHhNb2JpbGUgPSB7XG4gIHZlcnNpb246ICdlczYnLFxuICB1dGlscyxcbiAgTG9nZ2VyLFxuICBCYXNlQ2xhc3MsXG4gIEFwcCxcbiAgQ29yZSxcbiAgQ29sbGVjdGlvbixcbiAgZG9tLFxuICBEQixcbiAgSFRUUCxcbiAgTW9kZWwsXG4gIFNpbXBsZVJvdXRlcixcbiAgUm91dGVyLFxuICBQYWdlLFxuICBQYWdlcyxcbiAgVmlld3MsXG4gIFZpZXcsXG4gIFB1YlN1YixcbiAgSW50ZXJmYWNlLFxuICBJbnRlcmZhY2VzXG59O1xucHhNb2JpbGUuZGVidWcgPSB0cnVlO1xucHhNb2JpbGUuYmVoYXZpb3JzID0ge307XG5cbmlmICh3aW5kb3cpIHtcbiAgd2luZG93LnB4ID0gd2luZG93LnB4IHx8IHt9O1xuICB3aW5kb3cucHgubW9iaWxlID0gcHhNb2JpbGU7XG4gIHdpbmRvdy5weE1vYmlsZSA9IHB4TW9iaWxlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBweE1vYmlsZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEJhc2VDbGFzcyBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IEhUVFAgZnJvbSAnLi9IVFRQJztcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IExvZ2dlciBmcm9tICcuL2xvZyc7XG5cbi8qKlxuICogTW9kZWwgY2xhc3MgcHJvdmlkZXMgZXZlbnQgZGlzcGF0Y2hpbmcuXG4gKiBAZXhhbXBsZVxuICogdmFyIG1vZGVsID0gbmV3IE1vZGVsKCk7XG4gKiBAcGFyYW0ge1N0cmluZ30gaWQgLSBUaGUgaWQgb2YgdGhlIG1vZGVsLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPcHRpb25zIGZvciB0aGUgbW9kZWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kZWwgZXh0ZW5kcyBCYXNlQ2xhc3Mge1xuXG4gIGNvbnN0cnVjdG9yKGlkLCBvcHRpb25zKSB7XG4gICAgaWQgPSBpZCB8fCB1dGlscy51dWlkKCk7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICBzdXBlcihpZCwgb3B0aW9ucyk7XG5cbiAgICB0aGlzLnV1aWQgPSB1dGlscy51dWlkKCk7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMuYmFzZVVybCA9IG9wdGlvbnMuYmFzZVVybCB8fCAnL2RlZmF1bHQnO1xuICAgIHRoaXMuZGVmYXVsdHMgPSBvcHRpb25zLmRlZmF1bHRzIHx8IHt9O1xuICAgIHRoaXMuaWRGaWVsZCA9IG9wdGlvbnMuaWRGaWVsZCB8fCAnX2lkJztcbiAgICB0aGlzLmRhdGEgPSBvcHRpb25zLmRhdGEgfHwge307XG4gICAgdGhpcy5kYXRhW3RoaXMuaWRGaWVsZF0gPSBpZDtcbiAgICAvLyBUT0RPOiBBZHBhdGVyIGNhbiBiZSBodHRwIG9yIGRiXG4gICAgdGhpcy5hZGFwdGVyID0gb3B0aW9ucy5hZGFwdGVyIHx8IEhUVFA7XG4gICAgdGhpcy5hZGFwdGVyID0gbmV3IHRoaXMuYWRhcHRlcihpZCwgb3B0aW9ucyk7XG5cblxuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nZ2VyKGlkLCB7XG4gICAgICBjb2xvcnM6IHtcbiAgICAgICAgZGVidWc6ICdjb2xvcjpibHVlJ1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMubG9nLmxvZ0FwaSgnY29uc3RydWN0b3InLCBvcHRpb25zKTtcbiAgfVxuXG4gIHVybCgpIHtcbiAgICB2YXIgdXJsID0gYC8ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLmdldCh0aGlzLmlkRmllbGQpKX1gO1xuICAgIHZhciByZXYgPSB0aGlzLmdldCgnX3JldicpO1xuICAgIGlmIChyZXYpIHtcbiAgICAgIHVybCArPSAnP3Jldj0nICsgX3JldjtcbiAgICB9XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIGhhcyhhdHRyaWJ1dGUpIHtcbiAgICB0aGlzLmxvZy5sb2dBcGkoJ2hhcycsIGF0dHJpYnV0ZSk7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5oYXNPd25Qcm9wZXJ0eShhdHRyaWJ1dGUpO1xuICB9XG5cbiAgZ2V0KGF0dHJpYnV0ZSkge1xuICAgIHRoaXMubG9nLmxvZ0FwaSgnaGFzJywgYXR0cmlidXRlKTtcbiAgICByZXR1cm4gdGhpcy5kYXRhW2F0dHJpYnV0ZV07XG4gIH1cblxuICBzZXQoYXR0cmlidXRlcywgZm9yY2UgPSB0cnVlKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgIGlmIChmb3JjZSkge1xuICAgICAgICB0aGlzLmRhdGFba2V5XSA9IGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmhhcyhrZXkpKSB7XG4gICAgICAgIHRoaXMuZGF0YVtrZXldID0gYXR0cmlidXRlc1trZXldO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHRvSlNPTigpIHtcbiAgICBjb25zb2xlLndhcm4oJ3RvSlNPTicsIHRoaXMuZGF0YSk7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSk7XG4gIH1cblxuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy5vcHRpb25zKTtcbiAgfVxuXG4gIHBhcnNlKHJlc3ApIHtcbiAgICBjb25zb2xlLndhcm4oJ3BhcnNlJywgcmVzcCk7XG4gICAgaWYgKHJlc3Aub2sgJiYgcmVzcC5kYXRhLl9pZCkge1xuICAgICAgdGhpcy51dGlscy5leHRlbmQodGhpcy5kYXRhLCByZXNwLmRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzcDtcbiAgfVxuXG4gIGZldGNoKG9wdGlvbnMpIHtcbiAgICBjb25zb2xlLndhcm4oJ2ZldGNoJywgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlci5nZXQodGhpcy51cmwoKSkudGhlbih0aGlzLnBhcnNlKTtcbiAgfVxuXG4gIHNhdmUob3B0aW9ucykge1xuICAgIGNvbnNvbGUud2Fybignc2F2ZScsIG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIucHV0KGAke3RoaXMudXJsKCl9YCwgdGhpcy5kYXRhKS50aGVuKHRoaXMucGFyc2UpO1xuICB9XG5cbiAgZGVzdHJveShvcHRpb25zKSB7XG4gICAgY29uc29sZS53YXJuKCdkZXN0cm95JywgdGhpcy5kYXRhLl9yZXYpO1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuZGVsZXRlKGAke3RoaXMudXJsKCl9YCkudGhlbih0aGlzLnBhcnNlKTtcbiAgfVxuXG4gIHN5bmMob3B0aW9ucykge1xuICAgIGNvbnNvbGUud2Fybignc3luYycsIG9wdGlvbnMpO1xuICB9XG5cbiAgc3RhdGljIGV4dGVuZChvYmopIHtcbiAgICByZXR1cm4gc3VwZXIuZXh0ZW5kKHRoaXMsIG9iaik7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCBQdWJTdWIgZnJvbSAnLi9wdWJzdWInO1xuaW1wb3J0IEJhc2VDbGFzcyBmcm9tICcuL2Jhc2UnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBQYWdlIGNsYXNzIGhhcyBtZXRob2RzIGZvciBtYW5hZ2luZyBhIHBhZ2UuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2UgZXh0ZW5kcyBCYXNlQ2xhc3Mge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBvcHRpb25zKSB7XG4gICAgc3VwZXIobmFtZSwgb3B0aW9ucyk7XG5cblxuXG4gICAgdGhpcy5wcm9wZXJ0aWVzID0ge1xuICAgICAgdGl0bGU6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICB2YWx1ZTogbnVsbFxuICAgICAgfSxcbiAgICAgIGJhY2tUZXh0OiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgdmFsdWU6IG51bGxcbiAgICAgIH0sXG4gICAgICBiYWNrTGluazoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHZhbHVlOiBudWxsXG4gICAgICB9LFxuICAgICAgLy9QYXRoIHRvIHJlbW90ZSB2aWV3IHRoYXQgd2lsbCBiZSBsb2FkZWRcbiAgICAgIGhyZWY6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICBub3RpZnk6IHRydWUsXG4gICAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgICBvYnNlcnZlcjogJ190bXBsQ2hhbmdlZCdcbiAgICAgIH0sXG4gICAgICBhY3RpdmU6IHtcbiAgICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgICAgdmFsdWU6IGZhbHNlXG4gICAgICB9LFxuICAgICAgZGlhbG9nOiB7XG4gICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgIHZhbHVlOiBmYWxzZVxuICAgICAgfSxcbiAgICAgIC8vd2l0aCBVUkwgcXVlcnkgcGFyYW1ldGVycy4gSWYgeW91ciBwYWdlIFVSTCBpcyBcImFib3V0Lmh0bWw/aWQ9MTAmY291bnQ9MjAmY29sb3I9Ymx1ZVwiXG4gICAgICBxdWVyeToge1xuICAgICAgICB0eXBlOiBPYmplY3RcbiAgICAgIH0sXG4gICAgICBjb250ZXh0OiB7XG4gICAgICAgIHR5cGU6IE9iamVjdFxuICAgICAgfSxcbiAgICAgIC8vVmlldyBpbnN0YW5jZSB0aGF0IGNvbnRhaW5zIHRoaXMgcGFnZSAoaWYgdGhpcyBWaWV3IHdhcyBpbml0aWFsaXplZClcbiAgICAgIHZpZXc6IHtcbiAgICAgICAgdHlwZTogT2JqZWN0XG4gICAgICB9LFxuICAgICAgLy9QYWdlIERhdGEgb2JqZWN0IG9mIHRoZSBwcmV2aW91c2x5IGFjdGl2ZSBwYWdlXG4gICAgICBmcm9tUGFnZToge1xuICAgICAgICB0eXBlOiBPYmplY3RcbiAgICAgIH0sXG4gICAgICByb3V0ZToge1xuICAgICAgICB0eXBlOiBTdHJpbmdcbiAgICAgIH0sXG4gICAgICAvL0NvbnRhaW5zIHN0cmluZyBVUkwgb2YganVzdCBsb2FkZWQgcGFnZVxuICAgICAgdXJsOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZ1xuICAgICAgfSxcbiAgICAgIC8vTGluayB0byBQYWdlIEhUTUxFbGVtZW50XG4gICAgICBjb250YWluZXI6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nXG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMudXRpbHMuYWRkTWl4aW4obmV3IFB1YlN1YihuYW1lKSwgdGhpcyk7XG5cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGNyZWF0ZWQoKSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IHB4Lm1vYmlsZS5Mb2dnZXIodGhpcy50YWdOYW1lLCB7XG4gICAgICBjb2xvcnM6IHtcbiAgICAgICAgZGVidWc6ICdjb2xvcjpvcmFuZ2UnXG4gICAgICB9XG4gICAgfSk7XG4gICAgcHgubW9iaWxlLnV0aWxzLmFkZE1peGluKGxvZ2dlciwgdGhpcyk7XG4gICAgdGhpcy5sb2cubG9nQXBpKCdjcmVhdGVkJywgdGhpcy5pZCk7XG4gICAgdGhpcy5lbWl0KGBwYWdlOiR7IHRoaXMuaWQgfTppbml0YCwgdGhpcyk7XG4gIH1cbiAgcmVhZHkoKSB7XG4gICAgdGhpcy5sb2cubG9nQXBpKCdyZWFkeScsIHRoaXMuaWQpO1xuICAgIGlmICh0aGlzLmRpYWxvZykge1xuICAgICAgdGhpcy50b2dnbGVDbGFzcygnZGlhbG9nJyk7XG4gICAgfVxuICAgIHRoaXMuZW1pdChgcGFnZTokeyB0aGlzLmlkIH06cmVhZHlgLCB0aGlzKTtcbiAgfVxuICBzaG93KCkge1xuICAgIGNvbnNvbGUud2FybignSU5GTycsICdzaG93IHZpZXcnLCB0aGlzLmlkKTtcbiAgICB0aGlzLnRvZ2dsZUNsYXNzKCdjdXJyZW50JywgZmFsc2UsIHRoaXMpO1xuICB9XG4gIGhpZGUoKSB7XG4gICAgY29uc29sZS53YXJuKCdJTkZPJywgJ2hpZGUgdmlldycsIHRoaXMuaWQpO1xuICAgIHRoaXMudG9nZ2xlQ2xhc3MoJ2hpZGRlbicsIHRydWUsIHRoaXMpO1xuICB9XG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zb2xlLndhcm4oJ0lORk8nLCAndXBkYXRlIHZpZXcnLCB0aGlzLmlkKTtcbiAgfVxuICBjdXJyZW50VmlldygpIHtcbiAgICBjb25zb2xlLndhcm4oJ0lORk8nLCAnY3VycmVudCB2aWV3JywgdGhpcy5pZCk7XG4gICAgdGhpcy5jaGlsZCgpWzBdLnRvZ2dsZUNsYXNzKCdjdXJyZW50JywgdHJ1ZSwgdGhpcyk7XG4gIH1cbiAgbmV4dFZpZXcoKSB7XG4gICAgY29uc29sZS53YXJuKCdJTkZPJywgJ25leHQgdmlldycsIHRoaXMuaWQpO1xuICAgIHRoaXMudG9nZ2xlQ2xhc3MoJ25leHQnLCB0cnVlLCB0aGlzKTtcbiAgfVxuICBwcmV2aW91c1ZpZXcoKSB7XG4gICAgY29uc29sZS53YXJuKCdJTkZPJywgJ3ByZXZpb3VzIHZpZXcnLCB0aGlzLmlkKTtcbiAgICB0aGlzLnRvZ2dsZUNsYXNzKCdwcmV2aW91cycsIHRydWUsIHRoaXMpO1xuICB9XG4gIGNvbnRleHRDaGFuZ2VkKG5ld0NvbnRleHQsIG9sZENvbnRleHQpIHtcbiAgICAgIGNvbnNvbGUud2FybignY29udGV4dENoYW5nZWQnLCBuZXdDb250ZXh0LCBvbGRDb250ZXh0KTtcbiAgICB9XG4gICAgLy9JIGhhbmRsZSBsb2FkaW5nIGEgcGFnZSBmcm9tIGEgdXJsXG4gIF90bXBsQ2hhbmdlZChuZXdWYWwsIG9sZFZhbCkge1xuICAgIGxldCBfdGhpcyA9IHRoaXMsXG4gICAgICBodG1sID0gJyc7XG4gICAgaWYgKG5ld1ZhbCkge1xuICAgICAgY29uc29sZS53YXJuKHRoaXMuaWQsICdMb2FkIHJlbW90ZSBodG1sJywgbmV3VmFsKTtcbiAgICAgIHRoaXMuaW1wb3J0SHJlZihuZXdWYWwsIGUgPT4ge1xuICAgICAgICBodG1sID0gZS50YXJnZXQuaW1wb3J0LmJvZHkuaW5uZXJIVE1MO1xuICAgICAgICBfdGhpcy5sb2cubG9nQXBpKCdpbmplY3QgaHRtbCcsIF90aGlzLmlkKTtcbiAgICAgICAgY29uc29sZS53YXJuKCdpbmplY3QgcHgtdmlldyBodG1sJywgX3RoaXMuaWQpO1xuICAgICAgICBfdGhpcy5odG1sKGh0bWwpO1xuICAgICAgfSwgZSA9PiB7XG4gICAgICAgIC8vIGxvYWRpbmcgZXJyb3JcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyBwYWdlJywgZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgc2hvd01lbnUoKSB7XG4gICAgcHgubW9iaWxlLmRvbSgncHgtYXBwJykudG9nZ2xlQ2xhc3MoJ3Nob3ctbWVudScpO1xuICB9XG4gIG9wZW4oKSB7XG4gICAgaWYgKHRoaXMuZGlhbG9nKSB7XG4gICAgICB0aGlzLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgfVxuICB9XG4gIGNsb3NlKCkge1xuICAgIGlmICh0aGlzLmRpYWxvZykge1xuICAgICAgdGhpcy50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgIH1cbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IFB1YlN1YiBmcm9tICcuL3B1YnN1Yic7XG5pbXBvcnQgQmFzZUNsYXNzIGZyb20gJy4vYmFzZSc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIFBhZ2VzIGNsYXNzIGhhcyBtZXRob2RzIGZvciBtYW5hZ2luZyBhIGNvbGxlY3Rpb24gb2YgcGFnZXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2VzIGV4dGVuZHMgQmFzZUNsYXNzIHtcbiAgY29uc3RydWN0b3IobmFtZSwgb3B0aW9ucykge1xuICAgIHN1cGVyKG5hbWUsIG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBCYXNlQ2xhc3MgZnJvbSAnLi9iYXNlJztcbmltcG9ydCBMb2dnZXIgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHViU3ViIHtcblxuICAvKipcbiAgICogUHViU3ViIGNsYXNzIHByb3ZpZGVzIGV2ZW50IGRpc3BhdGNoaW5nLlxuICAgKiBAZXhhbXBsZVxuICAgKiB2YXIgcHVic3ViID0gbmV3IFB1YlN1YignbmFtZXNwYWNlJyk7XG4gICAgICAgICBwdWJzdWIucHVibGlzaCgnZXZlbnQnLCB7bmFtZTogdmFsdWV9KTtcblxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwdWJzdWIuXG4gICAqIEByZXR1cm4ge1B1YlN1Yn0gSW5zdGFuY2Ugb2YgdGhlIHB1YnN1Yi5cbiAgICovXG4gIGNvbnN0cnVjdG9yKG5hbWUgPSAncHVic3ViJywgb3B0aW9ucyA9IHt9KSB7XG4gICAgLy8gIHN1cGVyKG5hbWUsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nZ2VyKG5hbWUsIHtcbiAgICAgIGNvbG9yczoge1xuICAgICAgICBkZWJ1ZzogJ2NvbG9yOm9yYW5nZSdcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7T2JqZWN0fSBTdG9yYWdlIGZvciB0b3BpY3MgdGhhdCBjYW4gYmUgYnJvYWRjYXN0IG9yIGxpc3RlbmVkIHRvXG4gICAgICovXG4gICAgdGhpcy50b3BpY3MgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtOdW1iZXJ9IEEgdG9waWMgaWRlbnRpZmllclxuICAgICAqL1xuICAgIHRoaXMuc3ViVWlkID0gLTE7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzdGFydCgpIHtcblxuICB9XG5cblxuXG4gIC8qKlxuICAgKiBQdWJsaXNoIG9yIGJyb2FkY2FzdCBldmVudHMgb2YgaW50ZXJlc3Qgd2l0aCBhIHNwZWNpZmljIHRvcGljIG5hbWUgYW5kIGFyZ3VtZW50cyBzdWNoIGFzIHRoZSBkYXRhIHRvIHBhc3MgYWxvbmdcbiAgICogQGV4YW1wbGVcbiAgICogcHVic3ViLnB1Ymxpc2goJ2V2ZW50Jywge25hbWU6ICd2YWx1ZSd9KTtcbiAgICogQHBhcmFtIHtTdHJpbmd9IHRvcGljIC0gVGhlIGV2ZW50IHRvcGljIG5hbWVcbiAgICogQHJldHVybiB7UHViU3VifVxuICAgKi9cbiAgcHVibGlzaCh0b3BpYywgYXJncykge1xuICAgIGxldCB0b3BpY3MgPSB0aGlzLnRvcGljcztcblxuICAgIGlmICghdG9waWNzW3RvcGljXSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBzdWJzY3JpYmVycyA9IHRvcGljc1t0b3BpY10sXG4gICAgICBsZW4gPSBzdWJzY3JpYmVycyA/IHN1YnNjcmliZXJzLmxlbmd0aCA6IDA7XG5cbiAgICB3aGlsZSAobGVuLS0pIHtcbiAgICAgIHN1YnNjcmliZXJzW2xlbl0uZnVuYyh0b3BpYywgYXJncyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlIHRvIGV2ZW50cyBvZiBpbnRlcmVzdCB3aXRoIGEgc3BlY2lmaWMgdG9waWMgbmFtZSBhbmQgYSBjYWxsYmFjayBmdW5jdGlvbiwgdG8gYmUgZXhlY3V0ZWQgd2hlbiB0aGUgdG9waWMvZXZlbnQgaXMgb2JzZXJ2ZWRcbiAgICogQGV4YW1wbGVcbiAgICogcHVic3ViLnN1YnNjcmliZSgnZXZlbnQnLCBmdW5jdGlvbihkYXRhKXtcblxuICAgIH0pO1xuICAgKiBAcGFyYW0ge1N0cmluZ30gdG9waWMgLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXG4gICAqIEByZXR1cm4ge1N0cmluZ30gQSBzdHJpbmcgdG9rZW5cbiAgICovXG4gIHN1YnNjcmliZSh0b3BpYywgZm4pIHtcbiAgICBsZXQgdG9waWNzID0gdGhpcy50b3BpY3M7XG5cbiAgICBpZiAoIXRvcGljc1t0b3BpY10pIHtcbiAgICAgIHRvcGljc1t0b3BpY10gPSBbXTtcbiAgICB9XG5cbiAgICB2YXIgdG9rZW4gPSAoKyt0aGlzLnN1YlVpZCkudG9TdHJpbmcoKTtcblxuICAgIHRoaXMudG9waWNzW3RvcGljXS5wdXNoKHtcbiAgICAgIHRva2VuOiB0b2tlbixcbiAgICAgIGZ1bmM6IGZuXG4gICAgfSk7XG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG5cbiAgLyoqXG4gICAqIFVuc3Vic2NyaWJlIGZyb20gYSBzcGVjaWZpYyB0b3BpYywgYmFzZWQgb24gYSB0b2tlbml6ZWQgcmVmZXJlbmNlIHRvIHRoZSBzdWJzY3JpcHRpb25cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHRva2VuIC0gVGhlIGV2ZW50IHRva2VuXG4gICAqIEByZXR1cm4ge1B1YlN1Yn0gUHViU3ViIGluc3RhbmNlXG4gICAqL1xuICB1bnN1YnNjcmliZSh0b2tlbikge1xuICAgIGxldCB0b3BpY3MgPSB0aGlzLnRvcGljcztcbiAgICBmb3IgKHZhciBtIGluIHRvcGljcykge1xuICAgICAgaWYgKHRvcGljc1ttXSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgaiA9IHRvcGljc1ttXS5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgICBpZiAodG9waWNzW21dW2ldLnRva2VuID09PSB0b2tlbikge1xuICAgICAgICAgICAgdG9waWNzW21dLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzdGF0aWMgZW1pdChldmVudCwgZGF0YSkge1xuXG4gICAgcmV0dXJuIGRvbSgnKmJvZHknKS50cmlnZ2VyKGV2ZW50LCBkYXRhKTtcbiAgfVxuXG4gIHN0YXRpYyBvbihldmVudCwgY2IpIHtcblxuXG4gICAgcmV0dXJuIGRvbSgnKmJvZHknKS5vbihldmVudCwgY2IpO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5pbXBvcnQgUHViU3ViIGZyb20gJy4vcHVic3ViJztcbmltcG9ydCBCYXNlQ2xhc3MgZnJvbSAnLi9iYXNlJztcblxuLy9yZWdleCBmb3Igc3RyaXBwaW5nIGEgbGVhZGluZyBoYXNoL3NsYXNoIGFuZCB0cmFpbGluZyBzcGFjZS5cbnZhciByb3V0ZVN0cmlwcGVyID0gL15bI1xcL118XFxzKyQvZztcblxuLy9yZWdleCBmb3Igc3RyaXBwaW5nIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNsYXNoZXMuXG52YXIgcm9vdFN0cmlwcGVyID0gL15cXC8rfFxcLyskL2c7XG5cbi8vIHJlZ2V4IGZvciBzdHJpcHBpbmcgdXJscyBvZiBoYXNoLlxudmFyIHBhdGhTdHJpcHBlciA9IC8jLiokLztcblxuLyoqXG4gKiBSb3V0ZXIgaGlzdG9yeSBtYW5hZ2VzIHRoZSBzdGF0ZSBvZiB0aGUgcm91dGVyLlxuICogSGFuZGxlcyBjcm9zcy1icm93c2VyIGhpc3RvcnkgbWFuYWdlbWVudCwgYmFzZWQgb24gZWl0aGVyIHB1c2hTdGF0ZSBhbmQgcmVhbCBVUkxzLCBvciBvbmhhc2hjaGFuZ2UgYW5kIFVSTCBmcmFnbWVudHMuXG4gKiBJbnNwaXJlZCBieSBodHRwOi8vYmFja2JvbmVqcy5vcmcvZG9jcy9iYWNrYm9uZS5odG1sI3NlY3Rpb24tMTk2XG4gKi9cbmV4cG9ydCBjbGFzcyBSb3V0ZXJIaXN0b3J5IGV4dGVuZHMgQmFzZUNsYXNzIHtcblxuICBjb25zdHJ1Y3RvcihuYW1lLCBvcHRpb25zID0ge1xuICAgIHJvb3Q6ICcvJ1xuICB9KSB7XG4gICAgc3VwZXIobmFtZSwgb3B0aW9ucyk7XG5cbiAgICB0aGlzLnJvb3QgPSAoJy8nICsgdGhpcy5yb290ICsgJy8nKS5yZXBsYWNlKHJvb3RTdHJpcHBlciwgJyMvJyk7XG5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMubG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb247XG4gICAgICB0aGlzLmhpc3RvcnkgPSB3aW5kb3cuaGlzdG9yeTtcbiAgICB9XG4gICAgdGhpcy5wdXNoU3RhdGUgPSBvcHRpb25zLnB1c2hTdGF0ZSB8fCBmYWxzZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdvKHJvdXRlLCBvcHRpb25zKSB7XG4gICAgICBpZiAodGhpcy5wdXNoU3RhdGUpIHtcbiAgICAgICAgdGhpcy5oaXN0b3J5LnB1c2hTdGF0ZShvcHRpb25zLCBkb2N1bWVudC50aXRsZSwgcm91dGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2NhdGlvbi5oYXNoID0gcm91dGU7XG4gICAgICB9XG5cbiAgICB9XG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgc3RhdGUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5oaXN0b3J5LnN0YXRlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICBiYWNrKCkge1xuICAgIHJldHVybiB0aGlzLmhpc3RvcnkuYmFjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBmb3J3YXJkKCkge1xuICAgIHJldHVybiB0aGlzLmhpc3RvcnkuZm9yd2FyZCgpO1xuICB9XG5cbiAgYXRSb290KCkge1xuICAgIHZhciBwYXRoID0gdGhpcy5sb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9bXlxcL10kLywgJyQmLycpO1xuICAgIHJldHVybiBwYXRoID09PSB0aGlzLnJvb3QgJiYgIXRoaXMuZ2V0U2VhcmNoKCk7XG4gIH1cblxuICBtYXRjaFJvb3QoKSB7XG4gICAgdmFyIHBhdGggPSB0aGlzLmRlY29kZUZyYWdtZW50KHRoaXMubG9jYXRpb24ucGF0aG5hbWUpO1xuICAgIHZhciByb290ID0gcGF0aC5zbGljZSgwLCB0aGlzLnJvb3QubGVuZ3RoIC0gMSkgKyAnLyc7XG4gICAgcmV0dXJuIHJvb3QgPT09IHRoaXMucm9vdDtcbiAgfVxuXG4gIGRlY29kZUZyYWdtZW50KGZyYWdtZW50KSB7XG4gICAgcmV0dXJuIGRlY29kZVVSSShmcmFnbWVudC5yZXBsYWNlKC8lMjUvZywgJyUyNTI1JykpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBnZXRTZWFyY2goKSB7XG4gICAgdmFyIG1hdGNoID0gdGhpcy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoLyMuKi8sICcnKS5tYXRjaCgvXFw/LisvKTtcbiAgICByZXR1cm4gbWF0Y2ggPyBtYXRjaFswXSA6ICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHRydWUgaGFzaCB2YWx1ZS5cbiAgICovXG4gIGdldEhhc2god2luZG93KSB7XG4gICAgdmFyIG1hdGNoID0gKHdpbmRvdyB8fCB0aGlzKS5sb2NhdGlvbi5ocmVmLm1hdGNoKC8jKC4qKSQvKTtcbiAgICByZXR1cm4gbWF0Y2ggPyBtYXRjaFsxXSA6ICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcGF0aG5hbWUgYW5kIHNlYXJjaCBwYXJhbXMsIHdpdGhvdXQgdGhlIHJvb3QuXG4gICAqL1xuICBnZXRQYXRoKCkge1xuICAgICAgdmFyIHBhdGggPSB0aGlzLmRlY29kZUZyYWdtZW50KHRoaXMubG9jYXRpb24ucGF0aG5hbWUgKyB0aGlzLmdldFNlYXJjaCgpKS5zbGljZSh0aGlzLnJvb3QubGVuZ3RoIC0gMSk7XG4gICAgICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICcvJyA/IHBhdGguc2xpY2UoMSkgOiBwYXRoO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGJyb3dzZXIgbm9ybWFpbHplZCBVUkwgZnJhZ21lbnQgZm9ybSB0aGUgcGF0aCBvciBoYXNoLlxuICAgICAqL1xuICBnZXRGcmFnbWVudChmcmFnbWVudCkge1xuICAgIGlmIChmcmFnbWVudCA9PT0gbnVsbCkge1xuICAgICAgaWYgKHRoaXMuX3VzZVB1c2hTdGF0ZSB8fCAhdGhpcy5fd2FudHNIYXNoQ2hhbmdlKSB7XG4gICAgICAgIGZyYWdtZW50ID0gdGhpcy5nZXRQYXRoKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmcmFnbWVudCA9IHRoaXMuZ2V0SGFzaCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmcmFnbWVudCA9IHRoaXMuZ2V0SGFzaCgpO1xuICAgIH1cbiAgICByZXR1cm4gZnJhZ21lbnQucmVwbGFjZShyb3V0ZVN0cmlwcGVyLCAnJyk7XG4gIH1cbn1cblxuLyoqXG4gKlxuICovXG5Sb3V0ZXJIaXN0b3J5LnN0YXJ0ZWQgPSBmYWxzZTtcblxuXG5sZXQgX2luc3RhbmNlID0gbnVsbDtcbmxldCBvcHRpb25hbFBhcmFtID0gL1xcKCguKj8pXFwpL2c7XG5sZXQgbmFtZWRQYXJhbSA9IC8oXFwoXFw/KT86XFx3Ky9nO1xubGV0IHNwbGF0UGFyYW0gPSAvXFwqXFx3Ky9nO1xubGV0IGVzY2FwZVJlZ0V4cCA9IC9bXFwte31cXFtcXF0rPy4sXFxcXFxcXiR8I1xcc10vZztcblxuXG5cbi8qKlxuICogVGhpcyBpcyB0aGUgUm91dGVyIGNsYXNzIHRoYXQgaGFuZGxlcyBzaW1wbGUgcm91dGluZy5cbiAqIEBleGFtcGxlXG4gKiB2YXIgbXlSb3V0ZXIgPSBuZXcgcHgubW9iaWxlLlJvdXRlcignYXBwJywge1xuICogIHJvdXRlczoge1xuICogJy8nOiByb3V0ZUhhbmRsZXJzLmhvbWVSb3V0ZSxcbiAqICAgICAnL2Fib3V0Jzogcm91dGVIYW5kbGVycy5hYm91dFJvdXRlLFxuICogICAgICcvdXNlcnMnOiByb3V0ZUhhbmRsZXJzLmxpc3RSb3V0ZSxcbiAqICAgICAnL3VzZXJzLzphY3Rpb24vOmlkJzogcm91dGVIYW5kbGVycy5kZXRhaWxSb3V0ZVxuICogICB9XG4gKiB9KTtcblxuIFwicm91dGU6W25hbWVdXCIgKHBhcmFtcykg4oCUIEZpcmVkIGJ5IHRoZSByb3V0ZXIgd2hlbiBhIHNwZWNpZmljIHJvdXRlIGlzIG1hdGNoZWQuXG4gXCJyb3V0ZVwiIChyb3V0ZSwgcGFyYW1zKSDigJQgRmlyZWQgYnkgdGhlIHJvdXRlciB3aGVuIGFueSByb3V0ZSBoYXMgYmVlbiBtYXRjaGVkLlxuIFwicm91dGVcIiAocm91dGVyLCByb3V0ZSwgcGFyYW1zKSDigJQgRmlyZWQgYnkgaGlzdG9yeSB3aGVuIGFueSByb3V0ZSBoYXMgYmVlbiBtYXRjaGVkLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZXIgZXh0ZW5kcyBCYXNlQ2xhc3Mge1xuXG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgU2VydmljZUxvY2F0b3IgX2luc3RhbmNlLlxuICAgKiBAcmV0dXJuIHRoZSBfaW5zdGFuY2UuXG4gICAqL1xuICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgaWYgKF9pbnN0YW5jZSA9PSBudWxsKSB7XG4gICAgICBfaW5zdGFuY2UgPSBuZXcgUm91dGVyKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIF9pbnN0YW5jZTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgdGhlIFJvdXRlciBjbGFzcyBjb25zdHJ1Y3RvclxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcm91dGVyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHRoZSByb3V0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKG5hbWUsIG9wdGlvbnMpIHtcbiAgICBuYW1lID0gbmFtZSArICcuUm91dGVyJztcbiAgICBzdXBlcihuYW1lLCBvcHRpb25zKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtSb3V0ZXJIaXN0b3J5fVxuICAgICAqL1xuICAgIHRoaXMuaGlzdG9yeSA9IG5ldyBSb3V0ZXJIaXN0b3J5KCk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7T2JqZWN0fSBJbml0aWFsIHJvdXRlc1xuICAgICAqL1xuICAgIHRoaXMucm91dGVzID0ge1xuICAgICAgJy8nOiAnJ1xuICAgIH07XG5cbiAgICB0aGlzLnVybFByZWZpeCA9ICcjJztcbiAgICB0aGlzLm1peGluKG9wdGlvbnMpO1xuICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3NldFJlZ2V4Um91dGVzKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBsaXN0ZW4oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBjdXJyZW50ID0gdGhpcy5oaXN0b3J5LmdldEZyYWdtZW50KCk7XG4gICAgdmFyIGZuID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoY3VycmVudCAhPT0gc2VsZi5oaXN0b3J5LmdldEZyYWdtZW50KCkpIHtcbiAgICAgICAgY3VycmVudCA9IHNlbGYuaGlzdG9yeS5nZXRGcmFnbWVudCgpO1xuICAgICAgICBzZWxmLmNoZWNrKGN1cnJlbnQpO1xuICAgICAgfVxuICAgIH07XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoZm4sIDUwKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBjaGVjayhmKSB7XG4gICAgdmFyIGZyYWdtZW50ID0gZiB8fCB0aGlzLmhpc3RvcnkuZ2V0RnJhZ21lbnQoKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5yb3V0ZXNSZWdleC5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG1hdGNoID0gZnJhZ21lbnQubWF0Y2godGhpcy5yb3V0ZXNSZWdleFtpXS5yZWdleHApO1xuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIG1hdGNoLnNoaWZ0KCk7XG4gICAgICAgIHRoaXMucm91dGVzUmVnZXhbaV0uc3VjY2Vzcy5hcHBseSh7fSwgbWF0Y2gpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIHN0YXJ0aW5nIHRoZSByb3V0ZXIgYW5kIHNldHRpbmcgdXAgbGlzdGVuZXJzLlxuICAgKi9cbiAgc3RhcnQoKSB7XG4gICAgdGhpcy5sb2cubG9nQXBpKCcyLiBzdGFydCcsIHRoaXMpO1xuICAgIGlmICgnb25oYXNoY2hhbmdlJyBpbiB3aW5kb3cpIHtcbiAgICAgIHRoaXMubG9nLmxvZ0FwaSgnMy4gb25oYXNoY2hhbmdlJywgJ1RoZSBicm93c2VyIHN1cHBvcnRzIHRoZSBoYXNoY2hhbmdlIGV2ZW50IScpO1xuICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgKGUpID0+IHtcbiAgICAgICAgdGhpcy5faGFuZGxlUm91dGUoZSk7XG4gICAgICB9LCB0aGlzKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdIYXNoY2hhbmdlIG5vdCBhdmFpbGJsZScpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlIGEgcm91dGUgaGFuZGxlciB3aXRoIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBpbnZva2VcbiAgICogQHBhcmFtIHsqfSBhcmdzIC0gVGhlIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBjYWxsYmFja1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb3V0ZVxuICAgKi9cbiAgZXhlY3V0ZShjYWxsYmFjaywgYXJncywgbmFtZSkge1xuICAgIC8vUHViU3ViLmVtaXQobmFtZSwgYXJncyk7XG4gICAgdGhpcy5sb2cubG9nQXBpKCdleGVjdXRlID0+JyArIG5hbWUsIGFyZ3MpO1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cblxuICAvKipcbiAgICogTmF2aWdhdGUgdG8gYSByb3V0ZSBwYXNzaW5nIG9wdGlvbnNcbiAgICogQGV4YW1wbGVcbiAgICogbXlSb3V0ZXIubmF2aWdhdGUoJy9sb2dpbicpO1xuICAgKiBAcGFyYW0ge1N0cmluZ30gcm91dGUgLSBUaGUgcm91dGUgdG8gTmF2aWdhdGUgdG9cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyB0byBwYXNzIHRvIHRoZSByb3V0ZSBoYW5kbGVyXG4gICAqL1xuICBuYXZpZ2F0ZShyb3V0ZSwgb3B0aW9ucykge1xuICAgIHRoaXMubG9nLmxvZ0FwaSgnbmF2aWdhdGUgPT4nICsgcm91dGUsIG9wdGlvbnMpO1xuICAgIC8qXG4gICAgUHViU3ViLmVtaXQoJ3JvdXRlOmJlZm9yZScsIHtcbiAgICAgIHJvdXRlLCBvcHRpb25zXG4gICAgfSk7XG4qL1xuICAgIHRoaXMuaGlzdG9yeS5nbyhyb3V0ZSwgb3B0aW9ucyk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIGNhbGxiYWNrIHdoZW4gcm91dGUgaXMgZm91bmRcbiAgICogQGV4YW1wbGVcbiAgIG15Um91dGVyLm9uKCcvdXNlcnMvOmFjdGlvbi86aWQnLCBmdW5jdGlvbihyZXEsIHJlcykge1xuICAgICBleHBlY3QocmVxKS50b0JlRGVmaW5lZCgpO1xuICAgICBleHBlY3QocmVzKS50b0JlRGVmaW5lZCgpO1xuICAgICBleHBlY3QocmVxLnVybCkudG9CZSh3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgJy91c2Vycy9lZGl0Lzk5Jyk7XG4gICAgIGV4cGVjdChyZXEucGF0aG5hbWUpLnRvQmUoJy91c2Vycy9lZGl0Lzk5Jyk7XG4gICAgIGV4cGVjdChyZXEucGFyYW1zLmFjdGlvbikudG9CZSgnZWRpdCcpO1xuICAgICBleHBlY3QocmVxLnBhcmFtcy5pZCkudG9CZSgnOTknKTtcbiAgIH0pO1xuXG4gICBteVJvdXRlci5uYXZpZ2F0ZSgnL3VzZXJzL2VkaXQvOTknLCB7XG4gICAgIGRhdGE6IHRlc3RPYmpcbiAgIH0pO1xuICAgKiBAcGFyYW0ge1N0cmluZ30gcm91dGUgLSBUaGUgcm91dGUgdG8gd2F0Y2hcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucyAtIFRoZSByb3V0ZSBvcHRpb25zXG4gICAqL1xuICBvbihyb3V0ZSwgb3B0aW9ucykge1xuICAgIHRoaXMuc3Vic2NyaWJlKHJvdXRlLCBvcHRpb25zKTtcbiAgICB0aGlzLmxvZy5sb2dBcGkoJzUuIG9uIC0nICsgcm91dGUsIG9wdGlvbnMpO1xuICAgIHRoaXMucm91dGVzW3JvdXRlXSA9IG9wdGlvbnM7XG4gICAgdGhpcy5fc2V0UmVnZXhSb3V0ZXMoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9taXNlIGJhc2VkIHJvdXRlIGhhbmRsZXIsIHVzZSB0aGlzIHRvIGFkZCByb3V0ZXMgdGhhdCByZXNvbHZlIGEgcHJvbWlzZSB3aGVuIG1hdGNoZWQuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSByb3V0ZSAtIFRoZSByb3V0ZSB0byBtYXRjaC5cbiAgICogQHJldHVybiB7UHJvbWlzZX0gQSBwcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiBtYXRjaGVkLlxuICAgKi9cbiAgd2hlbihyb3V0ZSkge1xuICAgIHRoaXMubG9nLmxvZ0FwaSgnNC4gd2hlbicsIHJvdXRlKTtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIF90aGlzLm9uKHJvdXRlLCB7XG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihyZXEsIHJlcykge1xuICAgICAgICAgIHJlc29sdmUocmVxLCByZXMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIE1hbnVhbGx5IGJpbmQgYSBzaW5nbGUgbmFtZWQgcm91dGUgdG8gYSBjYWxsYmFjay4gRm9yIGV4YW1wbGU6XG4gICAqXG4gICAqIC8vIE1hdGNoZXMgI3BhZ2UvMTAsIHBhc3NpbmcgXCIxMFwiXG4gICAqIHRoaXMucm91dGUoXCJwYWdlLzpudW1iZXJcIiwgXCJwYWdlXCIsIGZ1bmN0aW9uKG51bWJlcil7IC4uLiB9KTtcbiAgICpcbiAgICogLy8gTWF0Y2hlcyAvMTE3LWEvYi9jL29wZW4sIHBhc3NpbmcgXCIxMTctYS9iL2NcIiB0byB0aGlzLm9wZW5cbiAgICogdGhpcy5yb3V0ZSgvXiguKj8pXFwvb3BlbiQvLCBcIm9wZW5cIik7XG4gICAqL1xuICByb3V0ZShyb3V0ZSwgbmFtZSwgY2FsbGJhY2spIHtcbiAgICB0aGlzLmxvZy5sb2dBcGkoJ3JvdXRlJywgcm91dGUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEkgaGFuZGxlIHRoZSByb3V0aW5nIHdoZW4gdGhlIGxvY2F0aW9uLmhhc2ggY2hhbmdlcy5cbiAgICovXG4gIF9oYW5kbGVSb3V0ZShlKSB7XG4gICAgdGhpcy5sb2cubG9nQXBpKCdfaGFuZGxlUm91dGUnLCBlKTtcbiAgICB2YXIgX2hhc2ggPSBsb2NhdGlvbi5oYXNoLnJlcGxhY2UoL14jXFwvfFxcLyQvZ2ksICcvJyk7XG4gICAgdmFyIHBhcnNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBwYXJzZXIuaHJlZiA9IF9oYXNoO1xuICAgIHZhciBfcm91dGVPYmogPSBudWxsO1xuICAgIHZhciByZXMgPSB7fTtcbiAgICB2YXIgcmVxID0ge1xuICAgICAgaG9zdG5hbWU6IHBhcnNlci5ob3N0bmFtZSxcbiAgICAgIGhvc3Q6IHBhcnNlci5ob3N0LFxuICAgICAgcG9ydDogcGFyc2VyLnBvcnQsXG4gICAgICBwcm90b2NvbDogcGFyc2VyLnByb3RvY29sLFxuICAgICAgcGF0aG5hbWU6IHBhcnNlci5wYXRobmFtZSxcbiAgICAgIGhhc2g6IHBhcnNlci5oYXNoLFxuICAgICAgdXJsOiBwYXJzZXIuaHJlZixcbiAgICAgIHF1ZXJ5OiBwYXJzZXIuc2VhcmNoLFxuICAgICAgcGFyYW1zOiB7fSwgLy9uZWVkcyB0byBiZSByb3V0ZXMgbmFtZWQgcGFyYW1zIGtleXMgYW5kIHZhbHVlIHRoZSB2YWx1ZXNcbiAgICAgIGRhdGE6IHt9IC8vTmVlZHMgdG8gYmUgYW55IG90aGVyIGRhdGEgc2VudCBhbG9uZ1xuICAgIH07XG5cbiAgICByZXEucXVlcnkgPSB0aGlzLl9nZXRVcmxRdWVyeShwYXJzZXIuaHJlZik7XG5cbiAgICAvL0xvb3AgZWFjaCByZWdleCByb3V0ZSBhbmQgbWF0Y2ggYWdhaW5zdCBoYXNoLCBpZiBtYXRjaCwgaW52b2tlIHJvdXRlIGhhbmRsZXIgZnVuY3Rpb24uXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJvdXRlc1JlZ2V4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBfcm91dGVPYmogPSB0aGlzLnJvdXRlc1JlZ2V4W2ldO1xuXG4gICAgICAvL1Rlc3QgaWYgcm91dGUgbWF0Y2hlcyByZWdpc3RlcmVkIHJvdXRlXG4gICAgICBpZiAoX3JvdXRlT2JqLnJlZ2V4cC50ZXN0KF9oYXNoKSkge1xuICAgICAgICBfcm91dGVPYmouY3VycmVudCA9IF9oYXNoO1xuXG4gICAgICAgIF9yb3V0ZU9iaiA9IHRoaXMuX3NldFJvdXRlUGFyYW1zKF9yb3V0ZU9iaik7XG5cbiAgICAgICAgLy9zZXR1cCByZXF1ZXN0IHBhcmFtcyAvIGFuZCBkYXRhXG4gICAgICAgIHJlcS5wYXJhbXMgPSBfcm91dGVPYmoucGFyYW1zO1xuXG4gICAgICAgIC8vTG9nXG4gICAgICAgIHRoaXMubG9nLmxvZ0FwaShfaGFzaCwgX3JvdXRlT2JqKTtcbiAgICAgICAgLypcbiAgICAgICAgIFB1YlN1Yi5lbWl0KCdyb3V0ZTpzdWNjZXNzJywge1xuICAgICAgICAgICBfcm91dGVPYmosIHJlcSwgcmVzXG4gICAgICAgICB9KTtcbiAgICAgICAgIFB1YlN1Yi5lbWl0KCdyb3V0ZTpjaGFuZ2UnLCB7XG4gICAgICAgICAgIF9yb3V0ZU9iaiwgcmVxLCByZXNcbiAgICAgICAgIH0pO1xuICAgICAgICAgKi9cbiAgICAgICAgLy9FeGVjdXRlIHJvdXRlIGhhbmRsZXJcbiAgICAgICAgdGhpcy5leGVjdXRlKF9yb3V0ZU9iai5zdWNjZXNzLCBbcmVxLCByZXNdLCBfaGFzaCk7XG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIHRoaXMuZXhlY3V0ZShfcm91dGVPYmouZXJyb3IsIFtyZXEsIHJlc10sIF9oYXNoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSSBoYW5kbGUgYnVpbGRpbmcgdGhlIHJlZ3VsYXIgZXhwcmVzc2lvbnMgZnJvbSB0aGUgcm91dGUgcGF0dGVybnMuXG4gICAqL1xuICBfc2V0UmVnZXhSb3V0ZXMoKSB7XG4gICAgdmFyIF9vdXQgPSBbXSxcbiAgICAgIF9yb3V0ZVBhcmFtcyA9IFtdLFxuICAgICAgX3JlZywgX3JvdXRlT2JqO1xuXG4gICAgdmFyIHJvdXRlSGFuZGxlciA9IG51bGw7XG4gICAgdmFyIHJvdXRlRXJyb3JIYW5kbGVyID0gZnVuY3Rpb24oKSB7fTtcbiAgICB2YXIgcm91dGVTdWNjZXNzSGFuZGxlciA9IGZ1bmN0aW9uKCkge307XG4gICAgdmFyIHJvdXRlUmVzb2x2ZXIgPSBudWxsO1xuXG4gICAgdGhpcy5sb2cubG9nQXBpKCcxLiByZWdpc3RlclJvdXRlcycsIHRoaXMucm91dGVzKTtcbiAgICBmb3IgKHZhciBfcm91dGUgaW4gdGhpcy5yb3V0ZXMpIHtcblxuXG4gICAgICAvLyBUT0RPOiBSb3V0ZSBoYW5kbGVyIGNhbiBiZSBhIGZ1bmN0aW9uIG9yIG9iamVjdFxuICAgICAgaWYgKHRoaXMudXRpbHMudHlwZSh0aGlzLnJvdXRlc1tfcm91dGVdKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByb3V0ZVN1Y2Nlc3NIYW5kbGVyID0gdGhpcy5yb3V0ZXNbX3JvdXRlXTtcbiAgICAgIH1cblxuICAgICAgLy8gVE9ETzogIElmIG9iamVjdCwgbWFrZSBzdXJlIGNhbGxiYWNrIHByb3AgZXhpc3RzLFxuICAgICAgaWYgKHRoaXMudXRpbHMudHlwZSh0aGlzLnJvdXRlc1tfcm91dGVdKSA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgICBpZiAodGhpcy5yb3V0ZXNbX3JvdXRlXS5lcnJvcikge1xuICAgICAgICAgIHJvdXRlRXJyb3JIYW5kbGVyLmJpbmQodGhpcy5yb3V0ZXNbX3JvdXRlXS5lcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucm91dGVzW19yb3V0ZV0uc3VjY2Vzcykge1xuICAgICAgICAgIHJvdXRlU3VjY2Vzc0hhbmRsZXIuYmluZCh0aGlzLnJvdXRlc1tfcm91dGVdLnN1Y2Nlc3MpO1xuICAgICAgICB9XG5cblxuXG4gICAgICAgIGNvbnNvbGUud2FybignRm91bmQgcm91dGUgY2FsbGJhY2snKTtcblxuICAgICAgICBpZiAodGhpcy5yb3V0ZXNbX3JvdXRlXS5yZXNvbHZlKSB7XG4gICAgICAgICAgcm91dGVTdWNjZXNzSGFuZGxlciA9IHRoaXMucm91dGVzW19yb3V0ZV0ucmVzb2x2ZTtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ0ZvdW5kIHJvdXRlIHJlc29sdmVyJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVE9ETzogaWYgb2JqZWN0LnJlc29sdmUgKEVuc3VyZSBvYmplY3RzIGtleSBpcyBhZGRlZCB0byBwYXJhbXMgb25jZSByZXNvbHZlZC4pXG4gICAgICBfcm91dGVQYXJhbXMgPSBfcm91dGUucmVwbGFjZSgnLycsICcnKS5zcGxpdCgnLycpO1xuICAgICAgX3JlZyA9IHRoaXMuX3JlZ2V4Um91dGUoX3JvdXRlLCBfcm91dGVQYXJhbXMpO1xuICAgICAgX3JvdXRlT2JqID0ge1xuICAgICAgICByZWdleHA6IF9yZWcsXG4gICAgICAgIHJvdXRlOiBfcm91dGUsXG4gICAgICAgIHN1Y2Nlc3M6IHJvdXRlU3VjY2Vzc0hhbmRsZXIsXG4gICAgICAgIGVycm9yOiByb3V0ZUVycm9ySGFuZGxlclxuICAgICAgfTtcbiAgICAgIF9vdXQucHVzaChfcm91dGVPYmopO1xuICAgICAgLy90aGlzLmxvZy5sb2dBcGkoJ3NldFJlZ2V4Um91dGVzJywgX3JvdXRlT2JqKTtcbiAgICB9XG4gICAgdGhpcy5yb3V0ZXNSZWdleCA9IF9vdXQ7XG4gICAgcmV0dXJuIF9vdXQ7XG4gIH1cblxuICAvKipcbiAgICogSSBoYW5kbGUgdGFraW5nIGEgcmVnZXggcm91dGUgcGF0dGVybiBhbmQgdGhlIHJvdXRlIGFuZCByZXR1cm5pbmcgdGhlIG1hdGNoZXMga2V5OnZhbHVlIHBhaXIgb2JqZWN0LlxuICAgKiBAcGFyYW0ge09iamVjdH0gcm91dGVPYmogLSBUaGUgcm91dGUgb2JqZWN0IHRvIHNldFxuICAgKiBAcmV0dXJuIHtPYmplY3R9IEEgcm91dGUgb2JqZWN0IG1hcCBvZiBuYW1lL3ZhbHVlIHBhaXJzXG4gICAqL1xuICBfc2V0Um91dGVQYXJhbXMocm91dGVPYmopIHtcbiAgICB2YXIgbm9ybWFsaXplZCA9IHJvdXRlT2JqLnJvdXRlLnJlcGxhY2UoL1xcOi9nLCAnJyk7XG4gICAgdmFyIG0xID0gcm91dGVPYmoucmVnZXhwLmV4ZWMobm9ybWFsaXplZCk7XG4gICAgdmFyIG0yID0gcm91dGVPYmoucmVnZXhwLmV4ZWMocm91dGVPYmouY3VycmVudCk7XG4gICAgdmFyIHBhcmFtcyA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbTEubGVuZ3RoOyBpKyspIHtcbiAgICAgIHBhcmFtc1ttMVtpXV0gPSBtMltpXTtcbiAgICB9XG4gICAgcm91dGVPYmoucGFyYW1zID0gcGFyYW1zO1xuICAgIHJldHVybiByb3V0ZU9iajtcbiAgfVxuXG4gIC8qKlxuICAgKiBJIGhhbmRsZSBwYXJzaW5nIGEgdXJsIHN0cmluZyBhbmQgcmV0dXJuaW5nIHRoZSBxdWVyeSBvYmplY3QuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgLSBUaGUgdXJsIHRvIHBhcnNlXG4gICAqIEByZXR1cm4ge09iamVjdH0gQSBvYmplY3QgbWFwIG9mIG5hbWUvdmFsdWUgcGFpcnNcbiAgICovXG4gIF9nZXRVcmxRdWVyeSh1cmwpIHtcbiAgICB2YXIgcmUgPSAvKD86XFw/fCYoPzphbXA7KT8pKFtePSYjXSspKD86PT8oW14mI10qKSkvZyxcbiAgICAgIG1hdGNoLFxuICAgICAgcGFyYW1zID0ge307XG5cbiAgICBpZiAodHlwZW9mIHVybCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgIH1cbiAgICB2YXIgZGVjb2RlID0gZnVuY3Rpb24ocykge1xuICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbiAgICB9O1xuICAgIHdoaWxlIChtYXRjaCA9IHJlLmV4ZWModXJsKSkge1xuICAgICAgcGFyYW1zW2RlY29kZShtYXRjaFsxXSldID0gZGVjb2RlKG1hdGNoWzJdKTtcbiAgICB9XG5cbiAgICB0aGlzLmxvZy5sb2dBcGkoJ2dldFVybFF1ZXJ5JywgdXJsKTtcbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIFJlZ0V4cCBSb3V0ZSBmcm9tIGEgc3RyaW5nLiBUYWtlbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9FbmdpbmVlcmluZ01vZGUvR3JhcG5lbC5qcy9ibG9iL21hc3Rlci9zcmMvZ3JhcG5lbC5qcyNMNDlcbiAgICogQGV4YW1wbGVcbiAgICB2YXIgcm91dGVyID0gbmV3IHB4Lm1vYmlsZS5Sb3V0ZXIoKVxuICAgICAgICByb3V0ZXIuX3JlZ2V4Um91dGUoJy91c2Vycy86YWN0aW9uLzppZCcsIFsnOmFjdGlvbicsICc6aWQnXSk7XG4gICAgICAgID0+IC9eXFwvdXNlcnNcXC8oPzooW15cXC9dKz8pKVxcLyg/OihbXlxcL10rPykpXFwvPyQvaVxuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIC0gUGF0aCBvZiByb3V0ZVxuICAgKiBAcGFyYW0ge0FycmF5fSBrZXlzIC0gQXJyYXkgb2Yga2V5cyB0byBmaWxsXG4gICAqIEBwYXJhbSB7Qm9vbH0gc2Vuc2l0aXZlIC0gQ2FzZSBzZW5zaXRpdmUgY29tcGFyaXNvblxuICAgKiBAcGFyYW0ge0Jvb2x9IHN0cmljdCAtIFN0cmljdCBtb2RlXG4gICAqIEByZXR1cm4ge1JlZ0V4cH0gQSBuZXcgcmVndWxhciBleHByZXNzaW9uXG4gICAqL1xuICBfcmVnZXhSb3V0ZShwYXRoLCBrZXlzLCBzZW5zaXRpdmUsIHN0cmljdCkge1xuICAgIGlmIChwYXRoIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICByZXR1cm4gcGF0aDtcbiAgICB9XG4gICAgaWYgKHBhdGggaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgcGF0aCA9ICcoJyArIHBhdGguam9pbignfCcpICsgJyknO1xuICAgIH1cbiAgICBwYXRoID0gcGF0aC5jb25jYXQoc3RyaWN0ID8gJycgOiAnLz8nKVxuICAgICAgLnJlcGxhY2UoL1xcL1xcKC9nLCAnKD86LycpXG4gICAgICAucmVwbGFjZSgvXFwrL2csICdfX3BsdXNfXycpXG4gICAgICAucmVwbGFjZSgvKFxcLyk/KFxcLik/OihcXHcrKSg/OihcXCguKj9cXCkpKT8oXFw/KT8vZywgZnVuY3Rpb24oXywgc2xhc2gsIGZvcm1hdCwga2V5LCBjYXB0dXJlLCBvcHRpb25hbCkge1xuICAgICAgICBrZXlzLnB1c2goe1xuICAgICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgICBvcHRpb25hbDogISFvcHRpb25hbFxuICAgICAgICB9KTtcbiAgICAgICAgc2xhc2ggPSBzbGFzaCB8fCAnJztcbiAgICAgICAgcmV0dXJuICcnICsgKG9wdGlvbmFsID8gJycgOiBzbGFzaCkgKyAnKD86JyArIChvcHRpb25hbCA/IHNsYXNoIDogJycpICsgKGZvcm1hdCB8fCAnJykgKyAoY2FwdHVyZSB8fCAoXG4gICAgICAgICAgZm9ybWF0ICYmICcoW14vLl0rPyknIHx8ICcoW14vXSs/KScpKSArICcpJyArIChvcHRpb25hbCB8fCAnJyk7XG4gICAgICB9KVxuICAgICAgLnJlcGxhY2UoLyhbXFwvLl0pL2csICdcXFxcJDEnKVxuICAgICAgLnJlcGxhY2UoL19fcGx1c19fL2csICcoLispJylcbiAgICAgIC5yZXBsYWNlKC9cXCovZywgJyguKiknKTtcblxuICAgIHJldHVybiBuZXcgUmVnRXhwKCdeJyArIHBhdGggKyAnJCcsIHNlbnNpdGl2ZSA/ICcnIDogJ2knKTtcbiAgfVxuXG5cblxuICAvLyBUT0RPOlxuICAvKlxuXG4gIC8vIFNldCBwYWdlcyBjbGFzc2VzcyBmb3IgYW5pbWF0aW9uRW5kXG4gICAgIGFuaW1hdGVQYWdlczogZnVuY3Rpb24gKGxlZnRQYWdlLCByaWdodFBhZ2UsIGRpcmVjdGlvbiwgdmlldykge1xuICAgICAgICAgLy8gTG9hZGluZyBuZXcgcGFnZVxuICAgICAgICAgdmFyIHJlbW92ZUNsYXNzZXMgPSAncGFnZS1vbi1jZW50ZXIgcGFnZS1vbi1yaWdodCBwYWdlLW9uLWxlZnQnO1xuICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3RvLWxlZnQnKSB7XG4gICAgICAgICAgICAgbGVmdFBhZ2UucmVtb3ZlQ2xhc3MocmVtb3ZlQ2xhc3NlcykuYWRkQ2xhc3MoJ3BhZ2UtZnJvbS1jZW50ZXItdG8tbGVmdCcpO1xuICAgICAgICAgICAgIHJpZ2h0UGFnZS5yZW1vdmVDbGFzcyhyZW1vdmVDbGFzc2VzKS5hZGRDbGFzcygncGFnZS1mcm9tLXJpZ2h0LXRvLWNlbnRlcicpO1xuICAgICAgICAgfVxuICAgICAgICAgLy8gR28gYmFja1xuICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3RvLXJpZ2h0Jykge1xuICAgICAgICAgICAgIGxlZnRQYWdlLnJlbW92ZUNsYXNzKHJlbW92ZUNsYXNzZXMpLmFkZENsYXNzKCdwYWdlLWZyb20tbGVmdC10by1jZW50ZXInKTtcbiAgICAgICAgICAgICByaWdodFBhZ2UucmVtb3ZlQ2xhc3MocmVtb3ZlQ2xhc3NlcykuYWRkQ2xhc3MoJ3BhZ2UtZnJvbS1jZW50ZXItdG8tcmlnaHQnKTtcblxuICAgICAgICAgfVxuICAgICB9LFxuXG4gICovXG5cbn1cbiIsIi8vIFRPRE86IFNlcnZpY2UgTG9jYXRpb25cbi8qKlxuICogQSBzaW1wbGUgU2VydmljZSBMb2NhdG9yIHRoYXQgaGFuZGxlcyByZWdpc2VyaW5nIHNlcnZpY2VzIGFuZCByZXNvbHZpbmcgc2VydmljZXMuXG4gKiBAZXhhbXBsZVxuIHZhciBhcHAgPSBuZXcgcHgubW9iaWxlLkFwcCgpO1xuXG4gYXBwLnJlZ2lzdGVyKCdyb3V0ZXInLCBuZXcgcHgubW9iaWxlLlJvdXRlcignZGVmYXVsdCcsIHtcbiAgIHJvdXRlczoge1xuICAgICAnL3VzZXJzJzoge1xuICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihyZXEsIHJlcykge1xuICAgICAgICAgY29uc29sZS53YXJuKCdyb3V0ZSBjYWxsYmFjaycsIHJlcSwgcmVzKTtcbiAgICAgICB9LFxuICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgIHVzZXJzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICByZXNvbHZlKHt9KTtcbiAgICAgICAgICAgICB9LCA1MDAwKTtcbiAgICAgICAgICAgfSk7XG4gICAgICAgICB9XG4gICAgICAgfVxuICAgICB9XG4gICB9XG4gfSkpO1xuICovXG5sZXQgX2luc3RhbmNlID0gbnVsbDtcbmxldCBfc2VydmljZXMgPSB7fTtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcnZpY2VMb2NhdG9yIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuc2VydmljZXMgPSBfc2VydmljZXM7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICByZWdpc3RlcihrZXksIHNlcnZpY2UpIHtcbiAgICBfc2VydmljZXNba2V5XSA9IHNlcnZpY2U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgcmVzb2x2ZShrZXkpIHtcbiAgICByZXR1cm4gX3NlcnZpY2VzW2tleV07XG4gIH1cblxuICAvKipcbiAgICogSSBzdGFydCBhIHNlcnZpY2UgYnkgY2FsbGluZyB0aGUgc3RhcnQoKSBtZXRob2Qgb24gdGhlIHNlcnZpY2UuXG4gICAqL1xuICBzdGFydChrZXkpIHtcbiAgICB2YXIgc2VydmljZSA9IF9zZXJ2aWNlc1trZXldO1xuICAgIGNvbnNvbGUud2FybignU3RhcnRpbmcgc2VydmljZScsIGtleSwgc2VydmljZSk7XG4gICAgcmV0dXJuIHNlcnZpY2Uuc3RhcnQoKTtcbiAgfVxuXG4gIHN0YXJ0QWxsKCkge1xuICAgIHZhciBhbGwgPSBbXTtcbiAgICBjb25zb2xlLndhcm4oJ3N0YXJ0QWxsJywgX3NlcnZpY2VzKTtcbiAgICBmb3IgKHZhciBzZXJ2aWNlIGluIF9zZXJ2aWNlcykge1xuICAgICAgY29uc29sZS53YXJuKCdTdGFydGluZyBzZXJ2aWNlJywgc2VydmljZSk7XG4gICAgICBhbGwucHVzaCh0aGlzLnN0YXJ0KHNlcnZpY2UpKTtcbiAgICB9XG4gICAgcmV0dXJuIGFsbDtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIF9zZXJ2aWNlcyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgU2VydmljZUxvY2F0b3IgX2luc3RhbmNlLlxuICAgKiBAcmV0dXJuIHRoZSBfaW5zdGFuY2UuXG4gICAqL1xuICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgaWYgKF9pbnN0YW5jZSA9PSBudWxsKSB7XG4gICAgICBfaW5zdGFuY2UgPSBuZXcgU2VydmljZUxvY2F0b3IoKTtcbiAgICB9XG4gICAgcmV0dXJuIF9pbnN0YW5jZTtcbiAgfVxufVxuIiwiaW1wb3J0IEJhc2VDbGFzcyBmcm9tICcuL2Jhc2UnO1xuLy8gVE9ETzogRXhwZXJpbWVudFxuXG4vKipcbiAqIFNpbXBsZSBSb3V0ZXIgRXhwZXJpbWVudFxuICogQGV4YW1wbGVcbiAvLyBjb25maWd1cmF0aW9uXG5Sb3V0ZXIuY29uZmlnKHsgbW9kZTogJ2hpc3RvcnknfSk7XG5cbi8vIHJldHVybmluZyB0aGUgdXNlciB0byB0aGUgaW5pdGlhbCBzdGF0ZVxuUm91dGVyLm5hdmlnYXRlKCk7XG5cbi8vIGFkZGluZyByb3V0ZXNcblJvdXRlclxuLmFkZCgvYWJvdXQvLCBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZygnYWJvdXQnKTtcbn0pXG4uYWRkKC9wcm9kdWN0c1xcLyguKilcXC9lZGl0XFwvKC4qKS8sIGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKCdwcm9kdWN0cycsIGFyZ3VtZW50cyk7XG59KVxuLmFkZChmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZygnZGVmYXVsdCcpO1xufSlcbi5jaGVjaygnL3Byb2R1Y3RzLzEyL2VkaXQvMjInKS5saXN0ZW4oKTtcblxuLy8gZm9yd2FyZGluZ1xuUm91dGVyLm5hdmlnYXRlKCcvYWJvdXQnKTtcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2ltcGxlUm91dGVyIGV4dGVuZHMgQmFzZUNsYXNzIHtcblxuICAvKipcbiAgICogVGhpcyBpcyB0aGUgUm91dGVyIGNsYXNzIGNvbnN0cnVjdG9yXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb3V0ZXJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgdGhlIHJvdXRlclxuICAgKi9cbiAgY29uc3RydWN0b3IobmFtZSwgb3B0aW9ucykge1xuICAgIG5hbWUgPSBuYW1lICsgJy5Sb3V0ZXInO1xuICAgIHN1cGVyKG5hbWUsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5yb3V0ZXMgPSB7fTtcblxuICAgIHRoaXMucm91dGVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAvL0NvdWxkIGJlICdoYXNoJyBvciAnaGlzdG9yeScgc2hvd2luZyBpZiB3ZSB1c2UgdGhlIEhpc3RvcnkgQVBJIG9yIG5vdFxuICAgIHRoaXMubW9kZSA9IG9wdGlvbnMuaGFzaCB8fCAnaGFzaCc7XG5cbiAgICAvL3RoZSByb290IFVSTCBwYXRoIG9mIHRoZSBhcHBsaWNhdGlvbi4gSXQgaXMgbmVlZGVkIG9ubHkgaWYgd2UgdXNlIHB1c2hTdGF0ZS5cbiAgICB0aGlzLnJvb3QgPSBvcHRpb25zLnJvb3QgfHwgJy8nO1xuXG4gICAgdGhpcy51cmxQcmVmaXggPSBvcHRpb25zLnVybFByZWZpeCB8fCAnISMhJztcblxuICAgIHRoaXMubWl4aW4ob3B0aW9ucyk7XG5cbiAgICB0aGlzLmNvbmZpZyhvcHRpb25zKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cblxuICBjb25maWcob3B0aW9ucykge1xuICAgIHRoaXMubW9kZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5tb2RlICYmIG9wdGlvbnMubW9kZSA9PT0gJ2hpc3RvcnknICYmICEhKGhpc3RvcnkucHVzaFN0YXRlKSA/ICdoaXN0b3J5JyA6ICdoYXNoJztcbiAgICB0aGlzLnJvb3QgPSBvcHRpb25zICYmIG9wdGlvbnMucm9vdCA/ICcvJyArIHRoaXMuY2xlYXJTbGFzaGVzKG9wdGlvbnMucm9vdCkgKyAnLycgOiAnLyc7XG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5yb3V0ZXMpIHtcbiAgICAgIGZvciAodmFyIHJvdXRlIGluIG9wdGlvbnMucm91dGVzKSB7XG4gICAgICAgIHRoaXMuYWRkKHJvdXRlLCBvcHRpb25zLnJvdXRlc1tyb3V0ZV0pO1xuICAgICAgICBjb25zb2xlLndhcm4oJ0FkZGluZyByb3V0ZScsIHJvdXRlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIHRoZSBzbGFzaGVzIGZyb20gdGhlIGJlZ2lubmluZyBhbmQgZnJvbSB0aGUgZW5kIG9mIHRoZSBzdHJpbmcuXG4gICAqL1xuICBjbGVhclNsYXNoZXMocGF0aCkge1xuICAgIHJldHVybiBwYXRoLnRvU3RyaW5nKCkucmVwbGFjZSgvXFwvJC8sICcnKS5yZXBsYWNlKC9eXFwvLywgJycpO1xuICB9XG5cbiAgZ2V0RnJhZ21lbnQoKSB7XG4gICAgdmFyIGZyYWdtZW50ID0gJyc7XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJ2hpc3RvcnknKSB7XG4gICAgICBmcmFnbWVudCA9IHRoaXMuY2xlYXJTbGFzaGVzKGRlY29kZVVSSShsb2NhdGlvbi5wYXRobmFtZSArIGxvY2F0aW9uLnNlYXJjaCkpO1xuICAgICAgZnJhZ21lbnQgPSBmcmFnbWVudC5yZXBsYWNlKC9cXD8oLiopJC8sICcnKTtcbiAgICAgIGZyYWdtZW50ID0gdGhpcy5yb290ICE9PSAnLycgPyBmcmFnbWVudC5yZXBsYWNlKHRoaXMucm9vdCwgJycpIDogZnJhZ21lbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtYXRjaCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLm1hdGNoKC8jKC4qKSQvKTtcbiAgICAgIGZyYWdtZW50ID0gbWF0Y2ggPyBtYXRjaFsxXSA6ICcnO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jbGVhclNsYXNoZXMoZnJhZ21lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBhZGRpbmcgYSByb3V0ZSB0byB0aGUgUm91dGVyLlxuICAgKiBAZXhhbXBsZVxuICAgKiAvL0NvZGVcbiAgICogQHBhcmFtIHtSZWdFeHB9IHJlIC0gUmVndWxhciBleHByZXNzaW9uIHRvIG1hdGNoIHJvdXRlIGFnYWluc3QuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXIgLSBDYWxsYmFjayBmdW5jdGlvbiB0byBpbnZva2Ugd2hlbiByb3V0ZSBtYXRjaGVzLlxuICAgKiBAcmV0dXJuIHtTaW1wbGVSb3V0ZXJ9IFJldHVybnMgaW5zdGFuY2Ugb2YgdGhlIHJvdXRlci5cbiAgICovXG4gIGFkZChyZSwgaGFuZGxlcikge1xuICAgICAgaWYgKHR5cGVvZiByZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBoYW5kbGVyID0gcmU7XG4gICAgICAgIHJlID0gJyc7XG4gICAgICB9XG4gICAgICAvKlxuICAgICAgICAgICAgdGhpcy5yb3V0ZXMucHVzaCh7XG4gICAgICAgICAgICAgIHJlOiByZSxcbiAgICAgICAgICAgICAgaGFuZGxlcjogaGFuZGxlclxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAqL1xuICAgICAgdGhpcy5yb3V0ZXNbcmVdID0ge1xuICAgICAgICByZTogcmUsXG4gICAgICAgIGhhbmRsZXI6IGhhbmRsZXJcbiAgICAgIH07XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHJlbW92aW5nIGEgcGFyYW0gZnJvbSB0aGUgaGFuZGxlclxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy9Db2RlXG4gICAgICovXG4gIHJlbW92ZShwYXJhbSkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIHI7IGkgPCB0aGlzLnJvdXRlcy5sZW5ndGgsIHIgPSB0aGlzLnJvdXRlc1tpXTsgaSsrKSB7XG4gICAgICAgIGlmIChyLmhhbmRsZXIgPT09IHBhcmFtIHx8IHIucmUudG9TdHJpbmcoKSA9PT0gcGFyYW0udG9TdHJpbmcoKSkge1xuICAgICAgICAgIHRoaXMucm91dGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBmbHVzaW5nIGFsbCB0aGUgcm91dGVzLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy9Db2RlXG4gICAgICovXG4gIGZsdXNoKCkge1xuICAgIHRoaXMucm91dGVzID0gW107XG4gICAgdGhpcy5tb2RlID0gbnVsbDtcbiAgICB0aGlzLnJvb3QgPSAnLyc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIGludm9raW5nIGEgcm91dGUgd2hpY2ggdHJpZ2dlcnMgdGhlIGNhbGxiYWNrIGhhbmRsZXIuXG4gICAqIEBleGFtcGxlXG4gICAqIC8vQ29kZVxuICAgKi9cbiAgY2hlY2soZikge1xuICAgIHZhciBmcmFnbWVudCA9IGYgfHwgdGhpcy5nZXRGcmFnbWVudCgpO1xuXG4gICAgZm9yICh2YXIgciBpbiB0aGlzLnJvdXRlcykge1xuICAgICAgdmFyIG1hdGNoID0gZnJhZ21lbnQubWF0Y2godGhpcy5yb3V0ZXNbcl0ucmUpO1xuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIC8vbWF0Y2guc2hpZnQoKTtcbiAgICAgICAgdGhpcy5yb3V0ZXNbcl0uaGFuZGxlci5hcHBseSh7fSwgbWF0Y2gpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIHN0YXJ0aW5nIHRoZSByb3V0ZSB3aGljaCB0aGVuIGxpc3RlbnMgZm9yIGNoYW5nZXMuXG4gICAqIEBleGFtcGxlXG4gICAqIC8vQ29kZVxuICAgKi9cbiAgbGlzdGVuKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgY3VycmVudCA9IHNlbGYuZ2V0RnJhZ21lbnQoKTtcbiAgICB2YXIgZm4gPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChjdXJyZW50ICE9PSBzZWxmLmdldEZyYWdtZW50KCkpIHtcbiAgICAgICAgY3VycmVudCA9IHNlbGYuZ2V0RnJhZ21lbnQoKTtcbiAgICAgICAgc2VsZi5jaGVjayhjdXJyZW50KTtcbiAgICAgICAgY29uc29sZS53YXJuKCdDaGVja2luZyByb3V0ZScsIGN1cnJlbnQpO1xuICAgICAgfVxuICAgIH07XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoZm4sIDUwKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgY2hhbmdpbmcgdGhlIGN1cnJlbnQgcm91dGVzIGxvY2F0aW9uLlxuICAgKiBAZXhhbXBsZVxuICAgKiAvL0NvZGVcbiAgICovXG4gIG5hdmlnYXRlKHBhdGgpIHtcbiAgICBwYXRoID0gcGF0aCA/IHBhdGggOiAnJztcbiAgICBpZiAodGhpcy5tb2RlID09PSAnaGlzdG9yeScpIHtcbiAgICAgIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIHRoaXMucm9vdCArIHRoaXMuY2xlYXJTbGFzaGVzKHBhdGgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYubWF0Y2goLyMoLiopJC8pO1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC8jKC4qKSQvLCAnJykgKyAnIycgKyBwYXRoO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIFJlZ0V4cCBSb3V0ZSBmcm9tIGEgc3RyaW5nLiBUYWtlbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9FbmdpbmVlcmluZ01vZGUvR3JhcG5lbC5qcy9ibG9iL21hc3Rlci9zcmMvZ3JhcG5lbC5qcyNMNDlcbiAgICogQGV4YW1wbGVcbiAgICB2YXIgcm91dGVyID0gbmV3IHB4Lm1vYmlsZS5Sb3V0ZXIoKVxuICAgICAgICByb3V0ZXIuX3JlZ2V4Um91dGUoJy91c2Vycy86YWN0aW9uLzppZCcsIFsnOmFjdGlvbicsICc6aWQnXSk7XG4gICAgICAgID0+IC9eXFwvdXNlcnNcXC8oPzooW15cXC9dKz8pKVxcLyg/OihbXlxcL10rPykpXFwvPyQvaVxuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIC0gUGF0aCBvZiByb3V0ZVxuICAgKiBAcGFyYW0ge0FycmF5fSBrZXlzIC0gQXJyYXkgb2Yga2V5cyB0byBmaWxsXG4gICAqIEBwYXJhbSB7Qm9vbH0gc2Vuc2l0aXZlIC0gQ2FzZSBzZW5zaXRpdmUgY29tcGFyaXNvblxuICAgKiBAcGFyYW0ge0Jvb2x9IHN0cmljdCAtIFN0cmljdCBtb2RlXG4gICAqIEByZXR1cm4ge1JlZ0V4cH0gQSBuZXcgcmVndWxhciBleHByZXNzaW9uXG4gICAqL1xuICByZWdleFJvdXRlKHBhdGgsIGtleXMsIHNlbnNpdGl2ZSwgc3RyaWN0KSB7XG4gICAgaWYgKHBhdGggaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIHJldHVybiBwYXRoO1xuICAgIH1cbiAgICBpZiAocGF0aCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBwYXRoID0gJygnICsgcGF0aC5qb2luKCd8JykgKyAnKSc7XG4gICAgfVxuICAgIHBhdGggPSBwYXRoLmNvbmNhdChzdHJpY3QgPyAnJyA6ICcvPycpXG4gICAgICAucmVwbGFjZSgvXFwvXFwoL2csICcoPzovJylcbiAgICAgIC5yZXBsYWNlKC9cXCsvZywgJ19fcGx1c19fJylcbiAgICAgIC5yZXBsYWNlKC8oXFwvKT8oXFwuKT86KFxcdyspKD86KFxcKC4qP1xcKSkpPyhcXD8pPy9nLCBmdW5jdGlvbihfLCBzbGFzaCwgZm9ybWF0LCBrZXksIGNhcHR1cmUsIG9wdGlvbmFsKSB7XG4gICAgICAgIGtleXMucHVzaCh7XG4gICAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAgIG9wdGlvbmFsOiAhIW9wdGlvbmFsXG4gICAgICAgIH0pO1xuICAgICAgICBzbGFzaCA9IHNsYXNoIHx8ICcnO1xuICAgICAgICByZXR1cm4gJycgKyAob3B0aW9uYWwgPyAnJyA6IHNsYXNoKSArICcoPzonICsgKG9wdGlvbmFsID8gc2xhc2ggOiAnJykgKyAoZm9ybWF0IHx8ICcnKSArIChjYXB0dXJlIHx8IChcbiAgICAgICAgICBmb3JtYXQgJiYgJyhbXi8uXSs/KScgfHwgJyhbXi9dKz8pJykpICsgJyknICsgKG9wdGlvbmFsIHx8ICcnKTtcbiAgICAgIH0pXG4gICAgICAucmVwbGFjZSgvKFtcXC8uXSkvZywgJ1xcXFwkMScpXG4gICAgICAucmVwbGFjZSgvX19wbHVzX18vZywgJyguKyknKVxuICAgICAgLnJlcGxhY2UoL1xcKi9nLCAnKC4qKScpO1xuXG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoJ14nICsgcGF0aCArICckJywgc2Vuc2l0aXZlID8gJycgOiAnaScpO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cblxuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVVSTCgpIHtcbiAgdmFyIGJhc2UsIGksIGtleSwgbGVuLCBwYXRoLCBxdWVyeVN0cmluZywgdmFsdWU7XG4gIGJhc2UgPSBhcmd1bWVudHNbMF07XG4gIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHF1ZXJ5U3RyaW5nID0gJyc7XG4gIGkgPSAxO1xuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIHBhdGggPSBhcmd1bWVudHNbaV07XG4gICAgaWYgKCFwYXRoKSB7XG4gICAgICBpKys7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBwYXRoID09PSAnb2JqZWN0Jykge1xuXG4gICAgICAvKmpzaGludCAtVzA4OSAqL1xuICAgICAgZm9yIChrZXkgaW4gcGF0aCkge1xuICAgICAgICBpZiAocXVlcnlTdHJpbmcubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHF1ZXJ5U3RyaW5nICs9ICcmJztcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZSA9IHBhdGhba2V5XTtcbiAgICAgICAgcXVlcnlTdHJpbmcgKz0ga2V5ICsgJz0nICsgdmFsdWU7XG4gICAgICAgIGkrKztcbiAgICAgIH1cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAocGF0aCAmJiBwYXRoLmluZGV4T2YoJy8nKSAhPT0gMCkge1xuICAgICAgcGF0aCA9ICcvJyArIHBhdGg7XG4gICAgfVxuICAgIGlmIChiYXNlLnN1YnN0cihiYXNlLmxlbmd0aCAtIDEpID09PSAnLycpIHtcbiAgICAgIGJhc2UgPSBiYXNlLnN1YnN0cigwLCBiYXNlLmxlbmd0aCAtIDEpO1xuICAgIH1cbiAgICBiYXNlICs9IHBhdGg7XG4gICAgaSsrO1xuICB9XG4gIGlmIChxdWVyeVN0cmluZy5sZW5ndGggPiAwKSB7XG4gICAgYmFzZSArPSAnPycgKyBxdWVyeVN0cmluZztcbiAgfVxuICByZXR1cm4gYmFzZTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKGRlc3QsIHNyYykge1xuICB2YXIgb3V0ID0gZGVzdDtcbiAgZm9yICh2YXIgaSBpbiBzcmMpIHtcbiAgICBvdXRbaV0gPSBzcmNbaV07XG4gIH1cbiAgcmV0dXJuIG91dDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBleHRlbmREZWVwKHBhcmVudCwgY2hpbGQpIHtcbiAgdmFyIGksIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyxcbiAgICBhc3RyID0gJ1tvYmplY3QgQXJyYXldJztcbiAgY2hpbGQgPSBjaGlsZCB8fCB7fTtcbiAgZm9yIChpIGluIHBhcmVudCkge1xuICAgIGlmIChwYXJlbnQuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgIGlmICh0eXBlb2YgcGFyZW50W2ldID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjaGlsZFtpXSA9ICh0b1N0ci5jYWxsKHBhcmVudFtpXSkgPT09IGFzdHIpID8gW10gOiB7fTtcbiAgICAgICAgZXh0ZW5kRGVlcChwYXJlbnRbaV0sIGNoaWxkW2ldKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoaWxkW2ldID0gcGFyZW50W2ldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY2hpbGQ7XG59XG5cbi8vaHR0cHM6Ly9jb2ZmZWVzY3JpcHQtY29va2Jvb2suZ2l0aHViLmlvL2NoYXB0ZXJzL2NsYXNzZXNfYW5kX29iamVjdHMvbWl4aW5zXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kQ2xhc3MoY2hpbGQsIHBhcmVudCkge1xuICB2YXIgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuICBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7XG4gICAgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIHtcbiAgICAgIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTtcbiAgICB9XG4gIH1cbiAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICBmdW5jdGlvbiBjdG9yKCkge1xuICAgIHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDtcbiAgfVxuICBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7XG4gIGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7XG4gIGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7XG4gIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4gIHJldHVybiBjaGlsZDtcbn1cblxuXG5cbi8qKlxuIFRoaXMgZnVuY3Rpb24gd2FzIG1vZGVsZWQgb24galF1ZXJ5J3MgJC50eXBlIGZ1bmN0aW9uLlxuIGh0dHBzOi8vY29mZmVlc2NyaXB0LWNvb2tib29rLmdpdGh1Yi5pby9jaGFwdGVycy9jbGFzc2VzX2FuZF9vYmplY3RzL3R5cGUtZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHR5cGUob2JqKSB7XG4gIHZhciBjbGFzc1RvVHlwZTtcbiAgaWYgKG9iaiA9PT0gdm9pZCAwIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgIHJldHVybiBTdHJpbmcob2JqKTtcbiAgfVxuICBjbGFzc1RvVHlwZSA9IHtcbiAgICAnW29iamVjdCBCb29sZWFuXSc6ICdib29sZWFuJyxcbiAgICAnW29iamVjdCBOdW1iZXJdJzogJ251bWJlcicsXG4gICAgJ1tvYmplY3QgU3RyaW5nXSc6ICdzdHJpbmcnLFxuICAgICdbb2JqZWN0IEZ1bmN0aW9uXSc6ICdmdW5jdGlvbicsXG4gICAgJ1tvYmplY3QgQXJyYXldJzogJ2FycmF5JyxcbiAgICAnW29iamVjdCBEYXRlXSc6ICdkYXRlJyxcbiAgICAnW29iamVjdCBSZWdFeHBdJzogJ3JlZ2V4cCcsXG4gICAgJ1tvYmplY3QgT2JqZWN0XSc6ICdvYmplY3QnXG4gIH07XG4gIHJldHVybiBjbGFzc1RvVHlwZVtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKV07XG59XG5cblxuXG4vL2h0dHA6Ly93d3cuam9lemltanMuY29tL2phdmFzY3JpcHQvamF2YXNjcmlwdC1taXhpbnMtZnVuY3Rpb25hbC1pbmhlcml0YW5jZS9cbmV4cG9ydCBmdW5jdGlvbiBhZGRNaXhpbihvYmosIG1peGluKSB7XG4gIHJldHVybiB0aGlzLmV4dGVuZChtaXhpbiwgb2JqKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlYm91bmNlKG5hbWUsIGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuICB2YXIgdGltZW91dDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb250ZXh0ID0gdGhpcyxcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgIGlmICghaW1tZWRpYXRlKSB7XG4gICAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuICAgIGlmIChjYWxsTm93KSB7XG4gICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIH1cbiAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBtaXhpbih0YXJnZXQsIHNvdXJjZSkge1xuICB0YXJnZXQgPSB0YXJnZXQucHJvdG90eXBlO1xuICBzb3VyY2UgPSBzb3VyY2UucHJvdG90eXBlO1xuXG4gIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIG5hbWUsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBuYW1lKSk7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1peCgpIHtcbiAgdmFyIGFyZywgcHJvcCwgY2hpbGQgPSB7fTtcbiAgZm9yIChhcmcgPSAwOyBhcmcgPCBhcmd1bWVudHMubGVuZ3RoOyBhcmcgKz0gMSkge1xuICAgIGZvciAocHJvcCBpbiBhcmd1bWVudHNbYXJnXSkge1xuICAgICAgaWYgKGFyZ3VtZW50c1thcmddLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgIGNoaWxkW3Byb3BdID0gYXJndW1lbnRzW2FyZ11bcHJvcF07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjaGlsZDtcbn1cblxuXG5cbi8qIVxuIE1hdGgudXVpZC5qcyAodjEuNClcbiBodHRwOi8vd3d3LmJyb29mYS5jb21cbiBtYWlsdG86cm9iZXJ0QGJyb29mYS5jb21cbiBDb3B5cmlnaHQgKGMpIDIwMTAgUm9iZXJ0IEtpZWZmZXJcbiBEdWFsIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgYW5kIEdQTCBsaWNlbnNlcy5cbiAqL1xuXG4vKlxuICogR2VuZXJhdGUgYSByYW5kb20gdXVpZC5cbiAqXG4gKiBVU0FHRTogTWF0aC51dWlkKGxlbmd0aCwgcmFkaXgpXG4gKiAgIGxlbmd0aCAtIHRoZSBkZXNpcmVkIG51bWJlciBvZiBjaGFyYWN0ZXJzXG4gKiAgIHJhZGl4ICAtIHRoZSBudW1iZXIgb2YgYWxsb3dhYmxlIHZhbHVlcyBmb3IgZWFjaCBjaGFyYWN0ZXIuXG4gKlxuICogRVhBTVBMRVM6XG4gKiAgIC8vIE5vIGFyZ3VtZW50cyAgLSByZXR1cm5zIFJGQzQxMjIsIHZlcnNpb24gNCBJRFxuICogICA+Pj4gTWF0aC51dWlkKClcbiAqICAgXCI5MjMyOUQzOS02RjVDLTQ1MjAtQUJGQy1BQUI2NDU0NEUxNzJcIlxuICpcbiAqICAgLy8gT25lIGFyZ3VtZW50IC0gcmV0dXJucyBJRCBvZiB0aGUgc3BlY2lmaWVkIGxlbmd0aFxuICogICA+Pj4gTWF0aC51dWlkKDE1KSAgICAgLy8gMTUgY2hhcmFjdGVyIElEIChkZWZhdWx0IGJhc2U9NjIpXG4gKiAgIFwiVmN5ZHhnbHR4clZaU1RWXCJcbiAqXG4gKiAgIC8vIFR3byBhcmd1bWVudHMgLSByZXR1cm5zIElEIG9mIHRoZSBzcGVjaWZpZWQgbGVuZ3RoLCBhbmQgcmFkaXguXG4gKiAgIC8vIChSYWRpeCBtdXN0IGJlIDw9IDYyKVxuICogICA+Pj4gTWF0aC51dWlkKDgsIDIpICAvLyA4IGNoYXJhY3RlciBJRCAoYmFzZT0yKVxuICogICBcIjAxMDAxMDEwXCJcbiAqICAgPj4+IE1hdGgudXVpZCg4LCAxMCkgLy8gOCBjaGFyYWN0ZXIgSUQgKGJhc2U9MTApXG4gKiAgIFwiNDc0NzMwNDZcIlxuICogICA+Pj4gTWF0aC51dWlkKDgsIDE2KSAvLyA4IGNoYXJhY3RlciBJRCAoYmFzZT0xNilcbiAqICAgXCIwOThGNEQzNVwiXG4gKi9cbnZhciBjaGFycyA9IChcbiAgJzAxMjM0NTY3ODlBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWicgK1xuICAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonXG4pLnNwbGl0KCcnKTtcblxuZnVuY3Rpb24gZ2V0VmFsdWUocmFkaXgpIHtcbiAgcmV0dXJuIDAgfCBNYXRoLnJhbmRvbSgpICogcmFkaXg7XG59XG5leHBvcnQgZnVuY3Rpb24gdXVpZChsZW4sIHJhZGl4KSB7XG4gIHJhZGl4ID0gcmFkaXggfHwgY2hhcnMubGVuZ3RoO1xuICB2YXIgb3V0ID0gJyc7XG4gIHZhciBpID0gLTE7XG5cbiAgaWYgKGxlbikge1xuICAgIC8vIENvbXBhY3QgZm9ybVxuICAgIHdoaWxlICgrK2kgPCBsZW4pIHtcbiAgICAgIG91dCArPSBjaGFyc1tnZXRWYWx1ZShyYWRpeCldO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8vIHJmYzQxMjIsIHZlcnNpb24gNCBmb3JtXG4gIC8vIEZpbGwgaW4gcmFuZG9tIGRhdGEuICBBdCBpPT0xOSBzZXQgdGhlIGhpZ2ggYml0cyBvZiBjbG9jayBzZXF1ZW5jZSBhc1xuICAvLyBwZXIgcmZjNDEyMiwgc2VjLiA0LjEuNVxuICB3aGlsZSAoKytpIDwgMzYpIHtcbiAgICBzd2l0Y2ggKGkpIHtcbiAgICAgIGNhc2UgODpcbiAgICAgIGNhc2UgMTM6XG4gICAgICBjYXNlIDE4OlxuICAgICAgY2FzZSAyMzpcbiAgICAgICAgb3V0ICs9ICctJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE5OlxuICAgICAgICBvdXQgKz0gY2hhcnNbKGdldFZhbHVlKDE2KSAmIDB4MykgfCAweDhdO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIG91dCArPSBjaGFyc1tnZXRWYWx1ZSgxNildO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59XG5cblxuXG4vL2h0dHA6Ly9qc2NyaXB0cGF0dGVybnMuYmxvZ3Nwb3QuY29tLzIwMTMvMDEvamF2YXNjcmlwdC1pbnRlcmZhY2VzLmh0bWxcbi8qKlxuIFVzYWdlOlxuIHZhciBJRXhhbXBsZSA9IG5ldyBJbnRlcmZhY2UoJ0V4YW1wbGUnLCBbJ2FkZCcsICdyZW1vdmUnLCAnZ2V0J10pO1xuIHZhciBFeGFtcGxlQ2xhc3MgPSB7XG4gIGFkZDogZnVuY3Rpb24oKXt9LFxuICByZW1vdmU6IGZ1bmN0aW9uKCl7fSxcbiAgZ2V0OiBmdW5jdGlvbigpe31cbn07XG5cbiBJbnRlcmZhY2UuZW5zdXJlSW1wbGVtZW50cyhFeGFtcGxlQ2xhc3MsIElFeGFtcGxlKVxuICovXG4vLyBDb25zdHJ1Y3Rvci5cbmZ1bmN0aW9uIEludGVyZmFjZShuYW1lLCBtZXRob2RzKSB7XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggIT09IDIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnRlcmZhY2UgY29uc3RydWN0b3IgY2FsbGVkIHdpdGggXCIgKyBhcmd1bWVudHMubGVuZ3RoICsgXCJhcmd1bWVudHMsIGJ1dCBleHBlY3RlZCBleGFjdGx5IDIuXCIpO1xuICB9XG5cbiAgdGhpcy5uYW1lID0gbmFtZTtcbiAgdGhpcy5tZXRob2RzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG1ldGhvZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAodHlwZW9mIG1ldGhvZHNbaV0gIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnRlcmZhY2UgY29uc3RydWN0b3IgZXhwZWN0cyBtZXRob2QgbmFtZXMgdG8gYmUgcGFzc2VkIGluIGFzIGEgc3RyaW5nLlwiKTtcbiAgICB9XG5cbiAgICB0aGlzLm1ldGhvZHMucHVzaChtZXRob2RzW2ldKTtcbiAgfVxufVxuXG4vLyBTdGF0aWMgY2xhc3MgbWV0aG9kLlxuSW50ZXJmYWNlLmVuc3VyZUltcGxlbWVudHMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdGdW5jdGlvbiBJbnRlcmZhY2UuZW5zdXJlSW1wbGVtZW50cyBjYWxsZWQgd2l0aCAnICsgYXJndW1lbnRzLmxlbmd0aCArXG4gICAgICAnYXJndW1lbnRzLCBidXQgZXhwZWN0ZWQgYXQgbGVhc3QgMi4nKTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAxLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YXIgX2ludGVyZmFjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICBpZiAoX2ludGVyZmFjZS5jb25zdHJ1Y3RvciAhPT0gSW50ZXJmYWNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdGdW5jdGlvbiBJbnRlcmZhY2UuZW5zdXJlSW1wbGVtZW50cyBleHBlY3RzIGFyZ3VtZW50cyB0d28gYW5kIGFib3ZlIHRvIGJlIGluc3RhbmNlcyBvZiBJbnRlcmZhY2UuJyk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaiA9IDAsIG1ldGhvZHNMZW4gPSBfaW50ZXJmYWNlLm1ldGhvZHMubGVuZ3RoOyBqIDwgbWV0aG9kc0xlbjsgaisrKSB7XG4gICAgICB2YXIgbWV0aG9kID0gX2ludGVyZmFjZS5tZXRob2RzW2pdO1xuICAgICAgaWYgKCFvYmplY3RbbWV0aG9kXSB8fCB0eXBlb2Ygb2JqZWN0W21ldGhvZF0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGdW5jdGlvbiBJbnRlcmZhY2UuZW5zdXJlSW1wbGVtZW50czogb2JqZWN0IGRvZXMgbm90IGltcGxlbWVudCB0aGUgJyArIF9pbnRlcmZhY2UubmFtZSArXG4gICAgICAgICAgJyBpbnRlcmZhY2UuIE1ldGhvZCAnICsgbWV0aG9kICsgJyB3YXMgbm90IGZvdW5kLiAnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5cbi8qKlxuICogSSBoYW5kbGUgbWl4aW5nIGNsYXNzZXMuIFRoaXMgZ2VuZXJpYyBhZ2dyZWdhdGlvbiBmdW5jdGlvbiBpcyB1c3VhbGx5IHByb3ZpZGVkIGJ5IGEgbGlicmFyeSBsaWtlIHRoaXMgb25lLCBvZiBjb3Vyc2VdXG4gKi9cbmV4cG9ydCB2YXIgYWdncmVnYXRpb24gPSAoYmFzZUNsYXNzLCAuLi5taXhpbnMpID0+IHtcbiAgbGV0IGJhc2UgPSBjbGFzcyBfQ29tYmluZWQgZXh0ZW5kcyBiYXNlQ2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgICAgbWl4aW5zLmZvckVhY2goKG1peGluKSA9PiB7XG4gICAgICAgIG1peGluLnByb3RvdHlwZS5pbml0aWFsaXplci5jYWxsKHRoaXMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuICBsZXQgY29weVByb3BzID0gKHRhcmdldCwgc291cmNlKSA9PiB7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlKVxuICAgICAgLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkpXG4gICAgICAuZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgICAgICBpZiAocHJvcC5tYXRjaCgvXig/OmNvbnN0cnVjdG9yfHByb3RvdHlwZXxhcmd1bWVudHN8Y2FsbGVyfG5hbWV8YmluZHxjYWxsfGFwcGx5fHRvU3RyaW5nfGxlbmd0aCkkLykpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgcHJvcCkpO1xuICAgICAgfSk7XG4gIH07XG4gIG1peGlucy5mb3JFYWNoKChtaXhpbikgPT4ge1xuICAgIGNvcHlQcm9wcyhiYXNlLnByb3RvdHlwZSwgbWl4aW4ucHJvdG90eXBlKTtcbiAgICBjb3B5UHJvcHMoYmFzZSwgbWl4aW4pO1xuICB9KTtcbiAgcmV0dXJuIGJhc2U7XG59O1xuIiwiLyoqXG4gKiBWaWV3IGNsYXNzIHByb3ZpZGVzIGV2ZW50IGRpc3BhdGNoaW5nLlxuICogQGV4YW1wbGVcbiAqIHZhciBWaWV3ID0gbmV3IFZpZXcoJ25hbWVzcGFjZScpO1xuICAgICAgIFZpZXcucHVibGlzaCgnZXZlbnQnLCB7bmFtZTogdmFsdWV9KTtcblxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgVmlldy5cbiAqIEByZXR1cm4ge1ZpZXd9IEluc3RhbmNlIG9mIHRoZSBWaWV3LlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3IHtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgY29uc29sZS53YXJuKCduZXcgVmlldycsIG9wdGlvbnMpO1xuICAgIHRoaXMuaWQgPSBvcHRpb25zLmlkO1xuICAgIHRoaXMucGFyYW1zID0gb3B0aW9ucy5wYXJhbXMgfHwge307XG4gICAgdGhpcy51cmwgPSBvcHRpb25zLnVybCB8fCAnJztcbiAgICB0aGlzLm1haW4gPSBvcHRpb25zLm1haW4gfHwgZmFsc2U7XG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHgtdmlldycpO1xuICB9XG5cbiAgdG9IVE1MKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMsIHRoaXMuZWxlbWVudCk7XG4gIH1cbn1cbiIsImltcG9ydCBCYXNlQ2xhc3MgZnJvbSAnLi9iYXNlJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cblxuXG4vKipcbiAqIFZpZXdzIGNsYXNzIHByb3ZpZGVzIGV2ZW50IGRpc3BhdGNoaW5nLlxuICogQGV4YW1wbGVcbiAqIHZhciBWaWV3cyA9IG5ldyBWaWV3cygnbmFtZXNwYWNlJyk7XG4gICAgICAgVmlld3MucHVibGlzaCgnZXZlbnQnLCB7bmFtZTogdmFsdWV9KTtcblxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgVmlld3MuXG4gKiBAcmV0dXJuIHtWaWV3c30gSW5zdGFuY2Ugb2YgdGhlIFZpZXdzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3cyBleHRlbmRzIEJhc2VDbGFzcyB7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMuaWQsIG9wdGlvbnMpO1xuICAgIHRoaXMuaWQgPSBvcHRpb25zLmlkO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBvcHRpb25zLnNlbGVjdGVkIHx8IDA7XG4gICAgdGhpcy5zZWxlY3RlZFZpZXcgPSB7fTtcbiAgICB0aGlzLnZpZXdzID0gW107XG4gICAgdGhpcy52aWV3TWFwID0gbmV3IE1hcCgpO1xuICAgIC8vICB0aGlzLnJvdXRlciA9IG5ldyBSb3V0ZXIob3B0aW9ucyk7XG5cbiAgICBpZiAob3B0aW9ucy52aWV3cykge1xuICAgICAgb3B0aW9ucy52aWV3cy5mb3JFYWNoKCh2aWV3KSA9PiB7XG4gICAgICAgIHRoaXMuYWRkKHZpZXcpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RWaWV3QnlJbmRleCh0aGlzLnNlbGVjdGVkKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNyZWF0ZWQoKSB7XG4gICAgY29uc29sZS53YXJuKCdWaWV3cyBjcmVhdGVkJyk7XG4gIH1cblxuICBhdHRhY2hlZCgpIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZpZXdzIGF0dGFjaGVkJyk7XG4gIH1cblxuICBhZGQodikge1xuICAgIGxldCB2aWV3ID0gbmV3IFZpZXcodik7XG4gICAgdmlldy5pbmRleCA9IHRoaXMudmlld3MubGVuZ3RoO1xuICAgIHRoaXNbdmlldy5pZF0gPSB2aWV3O1xuICAgIHRoaXMudmlld3MucHVzaCh2aWV3KTtcbiAgICB0aGlzLnZpZXdNYXAuc2V0KHZpZXcuaWQsIHZpZXcpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0KGtleSkge1xuICAgIHJldHVybiB0aGlzLnZpZXdNYXAuZ2V0KGtleSk7XG4gIH1cblxuICBnZXRWaWV3cygpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3TWFwLmVudHJpZXMoKTtcbiAgfVxuXG4gIHNlbGVjdFZpZXcoa2V5KSB7XG4gICAgY29uc29sZS53YXJuKCdWaWV3cy5zZWxlY3RWaWV3KCknLCBrZXkpO1xuICAgIHRoaXMuc2VsZWN0ZWRWaWV3ID0gdGhpcy52aWV3TWFwLmdldChrZXkpO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLnZpZXdzLmluZGV4T2YodGhpcy5zZWxlY3RlZFZpZXcpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0U2VsZWN0ZWRWaWV3KCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkVmlldztcbiAgfVxuXG4gIGdldFNlbGVjdGVkSW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlld3MuaW5kZXhPZih0aGlzLmdldFNlbGVjdGVkVmlldygpKTtcbiAgfVxuXG4gIG5leHRWaWV3KCkge1xuICAgIHZhciBpdGVtcyA9IHRoaXMudmlld3MsXG4gICAgICBsZW4gPSBpdGVtcy5sZW5ndGgsXG4gICAgICBjb3VudGVyID0gdGhpcy5zZWxlY3RlZCxcbiAgICAgIGluZGV4ID0gdGhpcy5zZWxlY3RlZCArIDE7XG4gICAgY291bnRlcisrO1xuXG4gICAgaWYgKGNvdW50ZXIgPj0gbGVuKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1JlYWNoZWQgbGFzdCBpdGVtJyk7XG4gICAgICBjb3VudGVyID0gMDtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZCA9IGNvdW50ZXI7XG4gICAgdGhpcy5zZWxlY3RWaWV3KHRoaXMudmlld3NbdGhpcy5zZWxlY3RlZF0uaWQpO1xuXG4gICAgY29uc29sZS5sb2coJ25leHRWaWV3JywgaXRlbXMsIGxlbiwgJ2luZGV4JywgaW5kZXgsICdzZWxlY3RlZCcsIHRoaXMuc2VsZWN0ZWQpO1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xuICB9XG5cbiAgcHJldlZpZXcoKSB7XG4gICAgdmFyIGl0ZW1zID0gdGhpcy52aWV3cyxcbiAgICAgIGxlbiA9IGl0ZW1zLmxlbmd0aCxcbiAgICAgIGNvdW50ZXIgPSB0aGlzLnNlbGVjdGVkLFxuICAgICAgaW5kZXggPSB0aGlzLnNlbGVjdGVkO1xuXG4gICAgY291bnRlci0tO1xuXG4gICAgaWYgKGNvdW50ZXIgPj0gbGVuKSB7XG4gICAgICBjb3VudGVyID0gaW5kZXggLSBsZW47XG4gICAgfSBlbHNlIGlmIChjb3VudGVyIDwgMCkge1xuICAgICAgY291bnRlciA9IDA7XG4gICAgICBjb25zb2xlLndhcm4oJ1JlYWNoZWQgZmlyc3QgaXRlbScpO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdGVkID0gY291bnRlcjtcbiAgICB0aGlzLnNlbGVjdFZpZXcodGhpcy52aWV3c1t0aGlzLnNlbGVjdGVkXS5pZCk7XG5cbiAgICBjb25zb2xlLmxvZygncHJldlZpZXcnLCBpdGVtcywgbGVuLCAnaW5kZXgnLCBpbmRleCwgJ3NlbGVjdGVkJywgdGhpcy5zZWxlY3RlZCk7XG5cbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZDtcbiAgfVxuXG4gIHNlbGVjdFZpZXdCeUluZGV4KGkpIHtcbiAgICB0aGlzLnNlbGVjdFZpZXcodGhpcy52aWV3c1tpXS5pZCk7XG4gIH1cblxuICBjaGFuZ2VWaWV3KGlkKSB7XG4gICAgdGhpcy5zZWxlY3RWaWV3KGlkKTtcbiAgfVxuXG59XG4iXX0=
