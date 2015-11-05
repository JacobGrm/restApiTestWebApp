"format register";
System.register("npm:core-js@0.9.18/library/modules/$.fw", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function($) {
    $.FW = false;
    $.path = $.core;
    return $;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.def", ["npm:core-js@0.9.18/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/library/modules/$"),
      global = $.g,
      core = $.core,
      isFunction = $.isFunction;
  function ctx(fn, that) {
    return function() {
      return fn.apply(that, arguments);
    };
  }
  $def.F = 1;
  $def.G = 2;
  $def.S = 4;
  $def.P = 8;
  $def.B = 16;
  $def.W = 32;
  function $def(type, name, source) {
    var key,
        own,
        out,
        exp,
        isGlobal = type & $def.G,
        isProto = type & $def.P,
        target = isGlobal ? global : type & $def.S ? global[name] : (global[name] || {}).prototype,
        exports = isGlobal ? core : core[name] || (core[name] = {});
    if (isGlobal)
      source = name;
    for (key in source) {
      own = !(type & $def.F) && target && key in target;
      if (own && key in exports)
        continue;
      out = own ? target[key] : source[key];
      if (isGlobal && !isFunction(target[key]))
        exp = source[key];
      else if (type & $def.B && own)
        exp = ctx(out, global);
      else if (type & $def.W && target[key] == out)
        !function(C) {
          exp = function(param) {
            return this instanceof C ? new C(param) : C(param);
          };
          exp.prototype = C.prototype;
        }(out);
      else
        exp = isProto && isFunction(out) ? ctx(Function.call, out) : out;
      exports[key] = exp;
      if (isProto)
        (exports.prototype || (exports.prototype = {}))[key] = out;
    }
  }
  module.exports = $def;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.get-names", ["npm:core-js@0.9.18/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/library/modules/$"),
      toString = {}.toString,
      getNames = $.getNames;
  var windowNames = typeof window == 'object' && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
  function getWindowNames(it) {
    try {
      return getNames(it);
    } catch (e) {
      return windowNames.slice();
    }
  }
  module.exports.get = function getOwnPropertyNames(it) {
    if (windowNames && toString.call(it) == '[object Window]')
      return getWindowNames(it);
    return getNames($.toObject(it));
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/fn/object/create", ["npm:core-js@0.9.18/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/library/modules/$");
  module.exports = function create(P, D) {
    return $.create(P, D);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.assert", ["npm:core-js@0.9.18/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/library/modules/$");
  function assert(condition, msg1, msg2) {
    if (!condition)
      throw TypeError(msg2 ? msg1 + msg2 : msg1);
  }
  assert.def = $.assertDefined;
  assert.fn = function(it) {
    if (!$.isFunction(it))
      throw TypeError(it + ' is not a function!');
    return it;
  };
  assert.obj = function(it) {
    if (!$.isObject(it))
      throw TypeError(it + ' is not an object!');
    return it;
  };
  assert.inst = function(it, Constructor, name) {
    if (!(it instanceof Constructor))
      throw TypeError(name + ": use the 'new' operator!");
    return it;
  };
  module.exports = assert;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.ctx", ["npm:core-js@0.9.18/library/modules/$.assert"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var assertFunction = require("npm:core-js@0.9.18/library/modules/$.assert").fn;
  module.exports = function(fn, that, length) {
    assertFunction(fn);
    if (~length && that === undefined)
      return fn;
    switch (length) {
      case 1:
        return function(a) {
          return fn.call(that, a);
        };
      case 2:
        return function(a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function(a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function() {
      return fn.apply(that, arguments);
    };
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.8.25/helpers/class-call-check", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  exports["default"] = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/fn/object/get-own-property-names", ["npm:core-js@0.9.18/library/modules/$", "npm:core-js@0.9.18/library/modules/es6.object.statics-accept-primitives"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/library/modules/$");
  require("npm:core-js@0.9.18/library/modules/es6.object.statics-accept-primitives");
  module.exports = function getOwnPropertyNames(it) {
    return $.getNames(it);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/fn/object/define-property", ["npm:core-js@0.9.18/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/library/modules/$");
  module.exports = function defineProperty(it, key, desc) {
    return $.setDesc(it, key, desc);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.shared", ["npm:core-js@0.9.18/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/library/modules/$"),
      SHARED = '__core-js_shared__',
      store = $.g[SHARED] || ($.g[SHARED] = {});
  module.exports = function(key) {
    return store[key] || (store[key] = {});
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.uid", ["npm:core-js@0.9.18/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var sid = 0;
  function uid(key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++sid + Math.random()).toString(36));
  }
  uid.safe = require("npm:core-js@0.9.18/library/modules/$").g.Symbol || uid;
  module.exports = uid;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.redef", ["npm:core-js@0.9.18/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:core-js@0.9.18/library/modules/$").hide;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.keyof", ["npm:core-js@0.9.18/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/library/modules/$");
  module.exports = function(object, el) {
    var O = $.toObject(object),
        keys = $.getKeys(O),
        length = keys.length,
        index = 0,
        key;
    while (length > index)
      if (O[key = keys[index++]] === el)
        return key;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.enum-keys", ["npm:core-js@0.9.18/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/library/modules/$");
  module.exports = function(it) {
    var keys = $.getKeys(it),
        getDesc = $.getDesc,
        getSymbols = $.getSymbols;
    if (getSymbols)
      $.each.call(getSymbols(it), function(key) {
        if (getDesc(it, key).enumerable)
          keys.push(key);
      });
    return keys;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.8.25/helpers/create-class", ["npm:babel-runtime@5.8.25/core-js/object/define-property"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var _Object$defineProperty = require("npm:babel-runtime@5.8.25/core-js/object/define-property")["default"];
  exports["default"] = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        _Object$defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.assign", ["npm:core-js@0.9.18/library/modules/$", "npm:core-js@0.9.18/library/modules/$.enum-keys"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/library/modules/$"),
      enumKeys = require("npm:core-js@0.9.18/library/modules/$.enum-keys");
  module.exports = Object.assign || function assign(target, source) {
    var T = Object($.assertDefined(target)),
        l = arguments.length,
        i = 1;
    while (l > i) {
      var S = $.ES5Object(arguments[i++]),
          keys = enumKeys(S),
          length = keys.length,
          j = 0,
          key;
      while (length > j)
        T[key = keys[j++]] = S[key];
    }
    return T;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.unscope", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function() {};
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.iter", ["npm:core-js@0.9.18/library/modules/$", "npm:core-js@0.9.18/library/modules/$.cof", "npm:core-js@0.9.18/library/modules/$.assert", "npm:core-js@0.9.18/library/modules/$.wks", "npm:core-js@0.9.18/library/modules/$.shared"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/library/modules/$"),
      cof = require("npm:core-js@0.9.18/library/modules/$.cof"),
      classof = cof.classof,
      assert = require("npm:core-js@0.9.18/library/modules/$.assert"),
      assertObject = assert.obj,
      SYMBOL_ITERATOR = require("npm:core-js@0.9.18/library/modules/$.wks")('iterator'),
      FF_ITERATOR = '@@iterator',
      Iterators = require("npm:core-js@0.9.18/library/modules/$.shared")('iterators'),
      IteratorPrototype = {};
  setIterator(IteratorPrototype, $.that);
  function setIterator(O, value) {
    $.hide(O, SYMBOL_ITERATOR, value);
    if (FF_ITERATOR in [])
      $.hide(O, FF_ITERATOR, value);
  }
  module.exports = {
    BUGGY: 'keys' in [] && !('next' in [].keys()),
    Iterators: Iterators,
    step: function(done, value) {
      return {
        value: value,
        done: !!done
      };
    },
    is: function(it) {
      var O = Object(it),
          Symbol = $.g.Symbol;
      return (Symbol && Symbol.iterator || FF_ITERATOR) in O || SYMBOL_ITERATOR in O || $.has(Iterators, classof(O));
    },
    get: function(it) {
      var Symbol = $.g.Symbol,
          getIter;
      if (it != undefined) {
        getIter = it[Symbol && Symbol.iterator || FF_ITERATOR] || it[SYMBOL_ITERATOR] || Iterators[classof(it)];
      }
      assert($.isFunction(getIter), it, ' is not iterable!');
      return assertObject(getIter.call(it));
    },
    set: setIterator,
    create: function(Constructor, NAME, next, proto) {
      Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
      cof.set(Constructor, NAME + ' Iterator');
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.iter-define", ["npm:core-js@0.9.18/library/modules/$.def", "npm:core-js@0.9.18/library/modules/$.redef", "npm:core-js@0.9.18/library/modules/$", "npm:core-js@0.9.18/library/modules/$.cof", "npm:core-js@0.9.18/library/modules/$.iter", "npm:core-js@0.9.18/library/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/library/modules/$.def"),
      $redef = require("npm:core-js@0.9.18/library/modules/$.redef"),
      $ = require("npm:core-js@0.9.18/library/modules/$"),
      cof = require("npm:core-js@0.9.18/library/modules/$.cof"),
      $iter = require("npm:core-js@0.9.18/library/modules/$.iter"),
      SYMBOL_ITERATOR = require("npm:core-js@0.9.18/library/modules/$.wks")('iterator'),
      FF_ITERATOR = '@@iterator',
      KEYS = 'keys',
      VALUES = 'values',
      Iterators = $iter.Iterators;
  module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE) {
    $iter.create(Constructor, NAME, next);
    function createMethod(kind) {
      function $$(that) {
        return new Constructor(that, kind);
      }
      switch (kind) {
        case KEYS:
          return function keys() {
            return $$(this);
          };
        case VALUES:
          return function values() {
            return $$(this);
          };
      }
      return function entries() {
        return $$(this);
      };
    }
    var TAG = NAME + ' Iterator',
        proto = Base.prototype,
        _native = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
        _default = _native || createMethod(DEFAULT),
        methods,
        key;
    if (_native) {
      var IteratorPrototype = $.getProto(_default.call(new Base));
      cof.set(IteratorPrototype, TAG, true);
      if ($.FW && $.has(proto, FF_ITERATOR))
        $iter.set(IteratorPrototype, $.that);
    }
    if ($.FW || FORCE)
      $iter.set(proto, _default);
    Iterators[NAME] = _default;
    Iterators[TAG] = $.that;
    if (DEFAULT) {
      methods = {
        keys: IS_SET ? _default : createMethod(KEYS),
        values: DEFAULT == VALUES ? _default : createMethod(VALUES),
        entries: DEFAULT != VALUES ? _default : createMethod('entries')
      };
      if (FORCE)
        for (key in methods) {
          if (!(key in proto))
            $redef(proto, key, methods[key]);
        }
      else
        $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.string-at", ["npm:core-js@0.9.18/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/library/modules/$");
  module.exports = function(TO_STRING) {
    return function(that, pos) {
      var s = String($.assertDefined(that)),
          i = $.toInteger(pos),
          l = s.length,
          a,
          b;
      if (i < 0 || i >= l)
        return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/core.iter-helpers", ["npm:core-js@0.9.18/library/modules/$", "npm:core-js@0.9.18/library/modules/$.iter"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var core = require("npm:core-js@0.9.18/library/modules/$").core,
      $iter = require("npm:core-js@0.9.18/library/modules/$.iter");
  core.isIterable = $iter.is;
  core.getIterator = $iter.get;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.iter-call", ["npm:core-js@0.9.18/library/modules/$.assert"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var assertObject = require("npm:core-js@0.9.18/library/modules/$.assert").obj;
  function close(iterator) {
    var ret = iterator['return'];
    if (ret !== undefined)
      assertObject(ret.call(iterator));
  }
  function call(iterator, fn, value, entries) {
    try {
      return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
    } catch (e) {
      close(iterator);
      throw e;
    }
  }
  call.close = close;
  module.exports = call;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.iter-detect", ["npm:core-js@0.9.18/library/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var SYMBOL_ITERATOR = require("npm:core-js@0.9.18/library/modules/$.wks")('iterator'),
      SAFE_CLOSING = false;
  try {
    var riter = [7][SYMBOL_ITERATOR]();
    riter['return'] = function() {
      SAFE_CLOSING = true;
    };
    Array.from(riter, function() {
      throw 2;
    });
  } catch (e) {}
  module.exports = function(exec) {
    if (!SAFE_CLOSING)
      return false;
    var safe = false;
    try {
      var arr = [7],
          iter = arr[SYMBOL_ITERATOR]();
      iter.next = function() {
        safe = true;
      };
      arr[SYMBOL_ITERATOR] = function() {
        return iter;
      };
      exec(arr);
    } catch (e) {}
    return safe;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/es6.object.to-string", ["npm:core-js@0.9.18/library/modules/$.cof", "npm:core-js@0.9.18/library/modules/$.wks", "npm:core-js@0.9.18/library/modules/$", "npm:core-js@0.9.18/library/modules/$.redef"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var cof = require("npm:core-js@0.9.18/library/modules/$.cof"),
      tmp = {};
  tmp[require("npm:core-js@0.9.18/library/modules/$.wks")('toStringTag')] = 'z';
  if (require("npm:core-js@0.9.18/library/modules/$").FW && cof(tmp) != 'z') {
    require("npm:core-js@0.9.18/library/modules/$.redef")(Object.prototype, 'toString', function toString() {
      return '[object ' + cof.classof(this) + ']';
    }, true);
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.for-of", ["npm:core-js@0.9.18/library/modules/$.ctx", "npm:core-js@0.9.18/library/modules/$.iter", "npm:core-js@0.9.18/library/modules/$.iter-call"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var ctx = require("npm:core-js@0.9.18/library/modules/$.ctx"),
      get = require("npm:core-js@0.9.18/library/modules/$.iter").get,
      call = require("npm:core-js@0.9.18/library/modules/$.iter-call");
  module.exports = function(iterable, entries, fn, that) {
    var iterator = get(iterable),
        f = ctx(fn, that, entries ? 2 : 1),
        step;
    while (!(step = iterator.next()).done) {
      if (call(iterator, f, step.value, entries) === false) {
        return call.close(iterator);
      }
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.same", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = Object.is || function is(x, y) {
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.species", ["npm:core-js@0.9.18/library/modules/$", "npm:core-js@0.9.18/library/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/library/modules/$"),
      SPECIES = require("npm:core-js@0.9.18/library/modules/$.wks")('species');
  module.exports = function(C) {
    if ($.DESC && !(SPECIES in C))
      $.setDesc(C, SPECIES, {
        configurable: true,
        get: $.that
      });
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.invoke", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function(fn, args, that) {
    var un = that === undefined;
    switch (args.length) {
      case 0:
        return un ? fn() : fn.call(that);
      case 1:
        return un ? fn(args[0]) : fn.call(that, args[0]);
      case 2:
        return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
      case 3:
        return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
      case 4:
        return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
      case 5:
        return un ? fn(args[0], args[1], args[2], args[3], args[4]) : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
    }
    return fn.apply(that, args);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.dom-create", ["npm:core-js@0.9.18/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/library/modules/$"),
      document = $.g.document,
      isObject = $.isObject,
      is = isObject(document) && isObject(document.createElement);
  module.exports = function(it) {
    return is ? document.createElement(it) : {};
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:process@0.10.1/browser", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var process = module.exports = {};
  var queue = [];
  var draining = false;
  function drainQueue() {
    if (draining) {
      return ;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      var i = -1;
      while (++i < len) {
        currentQueue[i]();
      }
      len = queue.length;
    }
    draining = false;
  }
  process.nextTick = function(fun) {
    queue.push(fun);
    if (!draining) {
      setTimeout(drainQueue, 0);
    }
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = '';
  process.versions = {};
  function noop() {}
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.binding = function(name) {
    throw new Error('process.binding is not supported');
  };
  process.cwd = function() {
    return '/';
  };
  process.chdir = function(dir) {
    throw new Error('process.chdir is not supported');
  };
  process.umask = function() {
    return 0;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.mix", ["npm:core-js@0.9.18/library/modules/$.redef"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $redef = require("npm:core-js@0.9.18/library/modules/$.redef");
  module.exports = function(target, src) {
    for (var key in src)
      $redef(target, key, src[key]);
    return target;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.collection-strong", ["npm:core-js@0.9.18/library/modules/$", "npm:core-js@0.9.18/library/modules/$.ctx", "npm:core-js@0.9.18/library/modules/$.uid", "npm:core-js@0.9.18/library/modules/$.assert", "npm:core-js@0.9.18/library/modules/$.for-of", "npm:core-js@0.9.18/library/modules/$.iter", "npm:core-js@0.9.18/library/modules/$.mix", "npm:core-js@0.9.18/library/modules/$.iter-define"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/library/modules/$"),
      ctx = require("npm:core-js@0.9.18/library/modules/$.ctx"),
      safe = require("npm:core-js@0.9.18/library/modules/$.uid").safe,
      assert = require("npm:core-js@0.9.18/library/modules/$.assert"),
      forOf = require("npm:core-js@0.9.18/library/modules/$.for-of"),
      step = require("npm:core-js@0.9.18/library/modules/$.iter").step,
      $has = $.has,
      set = $.set,
      isObject = $.isObject,
      hide = $.hide,
      isExtensible = Object.isExtensible || isObject,
      ID = safe('id'),
      O1 = safe('O1'),
      LAST = safe('last'),
      FIRST = safe('first'),
      ITER = safe('iter'),
      SIZE = $.DESC ? safe('size') : 'size',
      id = 0;
  function fastKey(it, create) {
    if (!isObject(it))
      return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!$has(it, ID)) {
      if (!isExtensible(it))
        return 'F';
      if (!create)
        return 'E';
      hide(it, ID, ++id);
    }
    return 'O' + it[ID];
  }
  function getEntry(that, key) {
    var index = fastKey(key),
        entry;
    if (index !== 'F')
      return that[O1][index];
    for (entry = that[FIRST]; entry; entry = entry.n) {
      if (entry.k == key)
        return entry;
    }
  }
  module.exports = {
    getConstructor: function(wrapper, NAME, IS_MAP, ADDER) {
      var C = wrapper(function(that, iterable) {
        assert.inst(that, C, NAME);
        set(that, O1, $.create(null));
        set(that, SIZE, 0);
        set(that, LAST, undefined);
        set(that, FIRST, undefined);
        if (iterable != undefined)
          forOf(iterable, IS_MAP, that[ADDER], that);
      });
      require("npm:core-js@0.9.18/library/modules/$.mix")(C.prototype, {
        clear: function clear() {
          for (var that = this,
              data = that[O1],
              entry = that[FIRST]; entry; entry = entry.n) {
            entry.r = true;
            if (entry.p)
              entry.p = entry.p.n = undefined;
            delete data[entry.i];
          }
          that[FIRST] = that[LAST] = undefined;
          that[SIZE] = 0;
        },
        'delete': function(key) {
          var that = this,
              entry = getEntry(that, key);
          if (entry) {
            var next = entry.n,
                prev = entry.p;
            delete that[O1][entry.i];
            entry.r = true;
            if (prev)
              prev.n = next;
            if (next)
              next.p = prev;
            if (that[FIRST] == entry)
              that[FIRST] = next;
            if (that[LAST] == entry)
              that[LAST] = prev;
            that[SIZE]--;
          }
          return !!entry;
        },
        forEach: function forEach(callbackfn) {
          var f = ctx(callbackfn, arguments[1], 3),
              entry;
          while (entry = entry ? entry.n : this[FIRST]) {
            f(entry.v, entry.k, this);
            while (entry && entry.r)
              entry = entry.p;
          }
        },
        has: function has(key) {
          return !!getEntry(this, key);
        }
      });
      if ($.DESC)
        $.setDesc(C.prototype, 'size', {get: function() {
            return assert.def(this[SIZE]);
          }});
      return C;
    },
    def: function(that, key, value) {
      var entry = getEntry(that, key),
          prev,
          index;
      if (entry) {
        entry.v = value;
      } else {
        that[LAST] = entry = {
          i: index = fastKey(key, true),
          k: key,
          v: value,
          p: prev = that[LAST],
          n: undefined,
          r: false
        };
        if (!that[FIRST])
          that[FIRST] = entry;
        if (prev)
          prev.n = entry;
        that[SIZE]++;
        if (index !== 'F')
          that[O1][index] = entry;
      }
      return that;
    },
    getEntry: getEntry,
    setIter: function(C, NAME, IS_MAP) {
      require("npm:core-js@0.9.18/library/modules/$.iter-define")(C, NAME, function(iterated, kind) {
        set(this, ITER, {
          o: iterated,
          k: kind
        });
      }, function() {
        var iter = this[ITER],
            kind = iter.k,
            entry = iter.l;
        while (entry && entry.r)
          entry = entry.p;
        if (!iter.o || !(iter.l = entry = entry ? entry.n : iter.o[FIRST])) {
          iter.o = undefined;
          return step(1);
        }
        if (kind == 'keys')
          return step(0, entry.k);
        if (kind == 'values')
          return step(0, entry.v);
        return step(0, [entry.k, entry.v]);
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.collection", ["npm:core-js@0.9.18/library/modules/$", "npm:core-js@0.9.18/library/modules/$.def", "npm:core-js@0.9.18/library/modules/$.iter", "npm:core-js@0.9.18/library/modules/$.for-of", "npm:core-js@0.9.18/library/modules/$.assert", "npm:core-js@0.9.18/library/modules/$.uid", "npm:core-js@0.9.18/library/modules/$.mix", "npm:core-js@0.9.18/library/modules/$.cof", "npm:core-js@0.9.18/library/modules/$.species"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/library/modules/$"),
      $def = require("npm:core-js@0.9.18/library/modules/$.def"),
      $iter = require("npm:core-js@0.9.18/library/modules/$.iter"),
      BUGGY = $iter.BUGGY,
      forOf = require("npm:core-js@0.9.18/library/modules/$.for-of"),
      assertInstance = require("npm:core-js@0.9.18/library/modules/$.assert").inst,
      INTERNAL = require("npm:core-js@0.9.18/library/modules/$.uid").safe('internal');
  module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
    var Base = $.g[NAME],
        C = Base,
        ADDER = IS_MAP ? 'set' : 'add',
        proto = C && C.prototype,
        O = {};
    if (!$.DESC || !$.isFunction(C) || !(IS_WEAK || !BUGGY && proto.forEach && proto.entries)) {
      C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
      require("npm:core-js@0.9.18/library/modules/$.mix")(C.prototype, methods);
    } else {
      C = wrapper(function(target, iterable) {
        assertInstance(target, C, NAME);
        target[INTERNAL] = new Base;
        if (iterable != undefined)
          forOf(iterable, IS_MAP, target[ADDER], target);
      });
      $.each.call('add,clear,delete,forEach,get,has,set,keys,values,entries'.split(','), function(KEY) {
        var chain = KEY == 'add' || KEY == 'set';
        if (KEY in proto)
          $.hide(C.prototype, KEY, function(a, b) {
            var result = this[INTERNAL][KEY](a === 0 ? 0 : a, b);
            return chain ? this : result;
          });
      });
      if ('size' in proto)
        $.setDesc(C.prototype, 'size', {get: function() {
            return this[INTERNAL].size;
          }});
    }
    require("npm:core-js@0.9.18/library/modules/$.cof").set(C, NAME);
    O[NAME] = C;
    $def($def.G + $def.W + $def.F, O);
    require("npm:core-js@0.9.18/library/modules/$.species")(C);
    if (!IS_WEAK)
      common.setIter(C, NAME, IS_MAP);
    return C;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.collection-to-json", ["npm:core-js@0.9.18/library/modules/$.def", "npm:core-js@0.9.18/library/modules/$.for-of"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/library/modules/$.def"),
      forOf = require("npm:core-js@0.9.18/library/modules/$.for-of");
  module.exports = function(NAME) {
    $def($def.P, NAME, {toJSON: function toJSON() {
        var arr = [];
        forOf(this, false, arr.push, arr);
        return arr;
      }});
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$", ["npm:core-js@0.9.18/library/modules/$.fw"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var global = typeof self != 'undefined' ? self : Function('return this')(),
      core = {},
      defineProperty = Object.defineProperty,
      hasOwnProperty = {}.hasOwnProperty,
      ceil = Math.ceil,
      floor = Math.floor,
      max = Math.max,
      min = Math.min;
  var DESC = !!function() {
    try {
      return defineProperty({}, 'a', {get: function() {
          return 2;
        }}).a == 2;
    } catch (e) {}
  }();
  var hide = createDefiner(1);
  function toInteger(it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  }
  function desc(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  }
  function simpleSet(object, key, value) {
    object[key] = value;
    return object;
  }
  function createDefiner(bitmap) {
    return DESC ? function(object, key, value) {
      return $.setDesc(object, key, desc(bitmap, value));
    } : simpleSet;
  }
  function isObject(it) {
    return it !== null && (typeof it == 'object' || typeof it == 'function');
  }
  function isFunction(it) {
    return typeof it == 'function';
  }
  function assertDefined(it) {
    if (it == undefined)
      throw TypeError("Can't call method on  " + it);
    return it;
  }
  var $ = module.exports = require("npm:core-js@0.9.18/library/modules/$.fw")({
    g: global,
    core: core,
    html: global.document && document.documentElement,
    isObject: isObject,
    isFunction: isFunction,
    that: function() {
      return this;
    },
    toInteger: toInteger,
    toLength: function(it) {
      return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0;
    },
    toIndex: function(index, length) {
      index = toInteger(index);
      return index < 0 ? max(index + length, 0) : min(index, length);
    },
    has: function(it, key) {
      return hasOwnProperty.call(it, key);
    },
    create: Object.create,
    getProto: Object.getPrototypeOf,
    DESC: DESC,
    desc: desc,
    getDesc: Object.getOwnPropertyDescriptor,
    setDesc: defineProperty,
    setDescs: Object.defineProperties,
    getKeys: Object.keys,
    getNames: Object.getOwnPropertyNames,
    getSymbols: Object.getOwnPropertySymbols,
    assertDefined: assertDefined,
    ES5Object: Object,
    toObject: function(it) {
      return $.ES5Object(assertDefined(it));
    },
    hide: hide,
    def: createDefiner(0),
    set: global.Symbol ? simpleSet : hide,
    each: [].forEach
  });
  if (typeof __e != 'undefined')
    __e = core;
  if (typeof __g != 'undefined')
    __g = global;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/es6.object.statics-accept-primitives", ["npm:core-js@0.9.18/library/modules/$", "npm:core-js@0.9.18/library/modules/$.def", "npm:core-js@0.9.18/library/modules/$.get-names"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/library/modules/$"),
      $def = require("npm:core-js@0.9.18/library/modules/$.def"),
      isObject = $.isObject,
      toObject = $.toObject;
  $.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' + 'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(','), function(KEY, ID) {
    var fn = ($.core.Object || {})[KEY] || Object[KEY],
        forced = 0,
        method = {};
    method[KEY] = ID == 0 ? function freeze(it) {
      return isObject(it) ? fn(it) : it;
    } : ID == 1 ? function seal(it) {
      return isObject(it) ? fn(it) : it;
    } : ID == 2 ? function preventExtensions(it) {
      return isObject(it) ? fn(it) : it;
    } : ID == 3 ? function isFrozen(it) {
      return isObject(it) ? fn(it) : true;
    } : ID == 4 ? function isSealed(it) {
      return isObject(it) ? fn(it) : true;
    } : ID == 5 ? function isExtensible(it) {
      return isObject(it) ? fn(it) : false;
    } : ID == 6 ? function getOwnPropertyDescriptor(it, key) {
      return fn(toObject(it), key);
    } : ID == 7 ? function getPrototypeOf(it) {
      return fn(Object($.assertDefined(it)));
    } : ID == 8 ? function keys(it) {
      return fn(toObject(it));
    } : require("npm:core-js@0.9.18/library/modules/$.get-names").get;
    try {
      fn('z');
    } catch (e) {
      forced = 1;
    }
    $def($def.S + $def.F * forced, 'Object', method);
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.8.25/core-js/object/create", ["npm:core-js@0.9.18/library/fn/object/create"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": require("npm:core-js@0.9.18/library/fn/object/create"),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.set-proto", ["npm:core-js@0.9.18/library/modules/$", "npm:core-js@0.9.18/library/modules/$.assert", "npm:core-js@0.9.18/library/modules/$.ctx"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/library/modules/$"),
      assert = require("npm:core-js@0.9.18/library/modules/$.assert");
  function check(O, proto) {
    assert.obj(O);
    assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
  }
  module.exports = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? function(buggy, set) {
      try {
        set = require("npm:core-js@0.9.18/library/modules/$.ctx")(Function.call, $.getDesc(Object.prototype, '__proto__').set, 2);
        set({}, []);
      } catch (e) {
        buggy = true;
      }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy)
          O.__proto__ = proto;
        else
          set(O, proto);
        return O;
      };
    }() : undefined),
    check: check
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.8.25/core-js/object/get-own-property-names", ["npm:core-js@0.9.18/library/fn/object/get-own-property-names"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": require("npm:core-js@0.9.18/library/fn/object/get-own-property-names"),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.8.25/core-js/object/define-property", ["npm:core-js@0.9.18/library/fn/object/define-property"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": require("npm:core-js@0.9.18/library/fn/object/define-property"),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.wks", ["npm:core-js@0.9.18/library/modules/$", "npm:core-js@0.9.18/library/modules/$.shared", "npm:core-js@0.9.18/library/modules/$.uid"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var global = require("npm:core-js@0.9.18/library/modules/$").g,
      store = require("npm:core-js@0.9.18/library/modules/$.shared")('wks');
  module.exports = function(name) {
    return store[name] || (store[name] = global.Symbol && global.Symbol[name] || require("npm:core-js@0.9.18/library/modules/$.uid").safe('Symbol.' + name));
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/es6.object.assign", ["npm:core-js@0.9.18/library/modules/$.def", "npm:core-js@0.9.18/library/modules/$.assign"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/library/modules/$.def");
  $def($def.S, 'Object', {assign: require("npm:core-js@0.9.18/library/modules/$.assign")});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/es6.array.iterator", ["npm:core-js@0.9.18/library/modules/$", "npm:core-js@0.9.18/library/modules/$.unscope", "npm:core-js@0.9.18/library/modules/$.uid", "npm:core-js@0.9.18/library/modules/$.iter", "npm:core-js@0.9.18/library/modules/$.iter-define"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/library/modules/$"),
      setUnscope = require("npm:core-js@0.9.18/library/modules/$.unscope"),
      ITER = require("npm:core-js@0.9.18/library/modules/$.uid").safe('iter'),
      $iter = require("npm:core-js@0.9.18/library/modules/$.iter"),
      step = $iter.step,
      Iterators = $iter.Iterators;
  require("npm:core-js@0.9.18/library/modules/$.iter-define")(Array, 'Array', function(iterated, kind) {
    $.set(this, ITER, {
      o: $.toObject(iterated),
      i: 0,
      k: kind
    });
  }, function() {
    var iter = this[ITER],
        O = iter.o,
        kind = iter.k,
        index = iter.i++;
    if (!O || index >= O.length) {
      iter.o = undefined;
      return step(1);
    }
    if (kind == 'keys')
      return step(0, index);
    if (kind == 'values')
      return step(0, O[index]);
    return step(0, [index, O[index]]);
  }, 'values');
  Iterators.Arguments = Iterators.Array;
  setUnscope('keys');
  setUnscope('values');
  setUnscope('entries');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/es6.string.iterator", ["npm:core-js@0.9.18/library/modules/$", "npm:core-js@0.9.18/library/modules/$.string-at", "npm:core-js@0.9.18/library/modules/$.uid", "npm:core-js@0.9.18/library/modules/$.iter", "npm:core-js@0.9.18/library/modules/$.iter-define"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var set = require("npm:core-js@0.9.18/library/modules/$").set,
      $at = require("npm:core-js@0.9.18/library/modules/$.string-at")(true),
      ITER = require("npm:core-js@0.9.18/library/modules/$.uid").safe('iter'),
      $iter = require("npm:core-js@0.9.18/library/modules/$.iter"),
      step = $iter.step;
  require("npm:core-js@0.9.18/library/modules/$.iter-define")(String, 'String', function(iterated) {
    set(this, ITER, {
      o: String(iterated),
      i: 0
    });
  }, function() {
    var iter = this[ITER],
        O = iter.o,
        index = iter.i,
        point;
    if (index >= O.length)
      return step(1);
    point = $at(O, index);
    iter.i += point.length;
    return step(0, point);
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/es6.array.from", ["npm:core-js@0.9.18/library/modules/$", "npm:core-js@0.9.18/library/modules/$.ctx", "npm:core-js@0.9.18/library/modules/$.def", "npm:core-js@0.9.18/library/modules/$.iter", "npm:core-js@0.9.18/library/modules/$.iter-call", "npm:core-js@0.9.18/library/modules/$.iter-detect"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/library/modules/$"),
      ctx = require("npm:core-js@0.9.18/library/modules/$.ctx"),
      $def = require("npm:core-js@0.9.18/library/modules/$.def"),
      $iter = require("npm:core-js@0.9.18/library/modules/$.iter"),
      call = require("npm:core-js@0.9.18/library/modules/$.iter-call");
  $def($def.S + $def.F * !require("npm:core-js@0.9.18/library/modules/$.iter-detect")(function(iter) {
    Array.from(iter);
  }), 'Array', {from: function from(arrayLike) {
      var O = Object($.assertDefined(arrayLike)),
          mapfn = arguments[1],
          mapping = mapfn !== undefined,
          f = mapping ? ctx(mapfn, arguments[2], 2) : undefined,
          index = 0,
          length,
          result,
          step,
          iterator;
      if ($iter.is(O)) {
        iterator = $iter.get(O);
        result = new (typeof this == 'function' ? this : Array);
        for (; !(step = iterator.next()).done; index++) {
          result[index] = mapping ? call(iterator, f, [step.value, index], true) : step.value;
        }
      } else {
        result = new (typeof this == 'function' ? this : Array)(length = $.toLength(O.length));
        for (; length > index; index++) {
          result[index] = mapping ? f(O[index], index) : O[index];
        }
      }
      result.length = index;
      return result;
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:process@0.10.1", ["npm:process@0.10.1/browser"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:process@0.10.1/browser");
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/es6.map", ["npm:core-js@0.9.18/library/modules/$.collection-strong", "npm:core-js@0.9.18/library/modules/$.collection"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var strong = require("npm:core-js@0.9.18/library/modules/$.collection-strong");
  require("npm:core-js@0.9.18/library/modules/$.collection")('Map', function(get) {
    return function Map() {
      return get(this, arguments[0]);
    };
  }, {
    get: function get(key) {
      var entry = strong.getEntry(this, key);
      return entry && entry.v;
    },
    set: function set(key, value) {
      return strong.def(this, key === 0 ? 0 : key, value);
    }
  }, strong, true);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/es7.map.to-json", ["npm:core-js@0.9.18/library/modules/$.collection-to-json"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.18/library/modules/$.collection-to-json")('Map');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/fn/object/get-own-property-descriptor", ["npm:core-js@0.9.18/library/modules/$", "npm:core-js@0.9.18/library/modules/es6.object.statics-accept-primitives"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/library/modules/$");
  require("npm:core-js@0.9.18/library/modules/es6.object.statics-accept-primitives");
  module.exports = function getOwnPropertyDescriptor(it, key) {
    return $.getDesc(it, key);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/es6.object.set-prototype-of", ["npm:core-js@0.9.18/library/modules/$.def", "npm:core-js@0.9.18/library/modules/$.set-proto"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/library/modules/$.def");
  $def($def.S, 'Object', {setPrototypeOf: require("npm:core-js@0.9.18/library/modules/$.set-proto").set});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.cof", ["npm:core-js@0.9.18/library/modules/$", "npm:core-js@0.9.18/library/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/library/modules/$"),
      TAG = require("npm:core-js@0.9.18/library/modules/$.wks")('toStringTag'),
      toString = {}.toString;
  function cof(it) {
    return toString.call(it).slice(8, -1);
  }
  cof.classof = function(it) {
    var O,
        T;
    return it == undefined ? it === undefined ? 'Undefined' : 'Null' : typeof(T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
  };
  cof.set = function(it, tag, stat) {
    if (it && !$.has(it = stat ? it : it.prototype, TAG))
      $.hide(it, TAG, tag);
  };
  module.exports = cof;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/fn/object/assign", ["npm:core-js@0.9.18/library/modules/es6.object.assign", "npm:core-js@0.9.18/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.18/library/modules/es6.object.assign");
  module.exports = require("npm:core-js@0.9.18/library/modules/$").core.Object.assign;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/web.dom.iterable", ["npm:core-js@0.9.18/library/modules/es6.array.iterator", "npm:core-js@0.9.18/library/modules/$", "npm:core-js@0.9.18/library/modules/$.iter", "npm:core-js@0.9.18/library/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.18/library/modules/es6.array.iterator");
  var $ = require("npm:core-js@0.9.18/library/modules/$"),
      Iterators = require("npm:core-js@0.9.18/library/modules/$.iter").Iterators,
      ITERATOR = require("npm:core-js@0.9.18/library/modules/$.wks")('iterator'),
      ArrayValues = Iterators.Array,
      NL = $.g.NodeList,
      HTC = $.g.HTMLCollection,
      NLProto = NL && NL.prototype,
      HTCProto = HTC && HTC.prototype;
  if ($.FW) {
    if (NL && !(ITERATOR in NLProto))
      $.hide(NLProto, ITERATOR, ArrayValues);
    if (HTC && !(ITERATOR in HTCProto))
      $.hide(HTCProto, ITERATOR, ArrayValues);
  }
  Iterators.NodeList = Iterators.HTMLCollection = ArrayValues;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/fn/array/from", ["npm:core-js@0.9.18/library/modules/es6.string.iterator", "npm:core-js@0.9.18/library/modules/es6.array.from", "npm:core-js@0.9.18/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.18/library/modules/es6.string.iterator");
  require("npm:core-js@0.9.18/library/modules/es6.array.from");
  module.exports = require("npm:core-js@0.9.18/library/modules/$").core.Array.from;
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-process@0.1.1/index", ["npm:process@0.10.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = System._nodeRequire ? process : require("npm:process@0.10.1");
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/fn/map", ["npm:core-js@0.9.18/library/modules/es6.object.to-string", "npm:core-js@0.9.18/library/modules/es6.string.iterator", "npm:core-js@0.9.18/library/modules/web.dom.iterable", "npm:core-js@0.9.18/library/modules/es6.map", "npm:core-js@0.9.18/library/modules/es7.map.to-json", "npm:core-js@0.9.18/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.18/library/modules/es6.object.to-string");
  require("npm:core-js@0.9.18/library/modules/es6.string.iterator");
  require("npm:core-js@0.9.18/library/modules/web.dom.iterable");
  require("npm:core-js@0.9.18/library/modules/es6.map");
  require("npm:core-js@0.9.18/library/modules/es7.map.to-json");
  module.exports = require("npm:core-js@0.9.18/library/modules/$").core.Map;
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.8.25/core-js/object/get-own-property-descriptor", ["npm:core-js@0.9.18/library/fn/object/get-own-property-descriptor"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": require("npm:core-js@0.9.18/library/fn/object/get-own-property-descriptor"),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/fn/object/set-prototype-of", ["npm:core-js@0.9.18/library/modules/es6.object.set-prototype-of", "npm:core-js@0.9.18/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.18/library/modules/es6.object.set-prototype-of");
  module.exports = require("npm:core-js@0.9.18/library/modules/$").core.Object.setPrototypeOf;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/es6.symbol", ["npm:core-js@0.9.18/library/modules/$", "npm:core-js@0.9.18/library/modules/$.cof", "npm:core-js@0.9.18/library/modules/$.uid", "npm:core-js@0.9.18/library/modules/$.shared", "npm:core-js@0.9.18/library/modules/$.def", "npm:core-js@0.9.18/library/modules/$.redef", "npm:core-js@0.9.18/library/modules/$.keyof", "npm:core-js@0.9.18/library/modules/$.enum-keys", "npm:core-js@0.9.18/library/modules/$.assert", "npm:core-js@0.9.18/library/modules/$.get-names", "npm:core-js@0.9.18/library/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/library/modules/$"),
      setTag = require("npm:core-js@0.9.18/library/modules/$.cof").set,
      uid = require("npm:core-js@0.9.18/library/modules/$.uid"),
      shared = require("npm:core-js@0.9.18/library/modules/$.shared"),
      $def = require("npm:core-js@0.9.18/library/modules/$.def"),
      $redef = require("npm:core-js@0.9.18/library/modules/$.redef"),
      keyOf = require("npm:core-js@0.9.18/library/modules/$.keyof"),
      enumKeys = require("npm:core-js@0.9.18/library/modules/$.enum-keys"),
      assertObject = require("npm:core-js@0.9.18/library/modules/$.assert").obj,
      ObjectProto = Object.prototype,
      DESC = $.DESC,
      has = $.has,
      $create = $.create,
      getDesc = $.getDesc,
      setDesc = $.setDesc,
      desc = $.desc,
      $names = require("npm:core-js@0.9.18/library/modules/$.get-names"),
      getNames = $names.get,
      toObject = $.toObject,
      $Symbol = $.g.Symbol,
      setter = false,
      TAG = uid('tag'),
      HIDDEN = uid('hidden'),
      _propertyIsEnumerable = {}.propertyIsEnumerable,
      SymbolRegistry = shared('symbol-registry'),
      AllSymbols = shared('symbols'),
      useNative = $.isFunction($Symbol);
  var setSymbolDesc = DESC ? function() {
    try {
      return $create(setDesc({}, HIDDEN, {get: function() {
          return setDesc(this, HIDDEN, {value: false})[HIDDEN];
        }}))[HIDDEN] || setDesc;
    } catch (e) {
      return function(it, key, D) {
        var protoDesc = getDesc(ObjectProto, key);
        if (protoDesc)
          delete ObjectProto[key];
        setDesc(it, key, D);
        if (protoDesc && it !== ObjectProto)
          setDesc(ObjectProto, key, protoDesc);
      };
    }
  }() : setDesc;
  function wrap(tag) {
    var sym = AllSymbols[tag] = $.set($create($Symbol.prototype), TAG, tag);
    DESC && setter && setSymbolDesc(ObjectProto, tag, {
      configurable: true,
      set: function(value) {
        if (has(this, HIDDEN) && has(this[HIDDEN], tag))
          this[HIDDEN][tag] = false;
        setSymbolDesc(this, tag, desc(1, value));
      }
    });
    return sym;
  }
  function defineProperty(it, key, D) {
    if (D && has(AllSymbols, key)) {
      if (!D.enumerable) {
        if (!has(it, HIDDEN))
          setDesc(it, HIDDEN, desc(1, {}));
        it[HIDDEN][key] = true;
      } else {
        if (has(it, HIDDEN) && it[HIDDEN][key])
          it[HIDDEN][key] = false;
        D = $create(D, {enumerable: desc(0, false)});
      }
      return setSymbolDesc(it, key, D);
    }
    return setDesc(it, key, D);
  }
  function defineProperties(it, P) {
    assertObject(it);
    var keys = enumKeys(P = toObject(P)),
        i = 0,
        l = keys.length,
        key;
    while (l > i)
      defineProperty(it, key = keys[i++], P[key]);
    return it;
  }
  function create(it, P) {
    return P === undefined ? $create(it) : defineProperties($create(it), P);
  }
  function propertyIsEnumerable(key) {
    var E = _propertyIsEnumerable.call(this, key);
    return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
  }
  function getOwnPropertyDescriptor(it, key) {
    var D = getDesc(it = toObject(it), key);
    if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))
      D.enumerable = true;
    return D;
  }
  function getOwnPropertyNames(it) {
    var names = getNames(toObject(it)),
        result = [],
        i = 0,
        key;
    while (names.length > i)
      if (!has(AllSymbols, key = names[i++]) && key != HIDDEN)
        result.push(key);
    return result;
  }
  function getOwnPropertySymbols(it) {
    var names = getNames(toObject(it)),
        result = [],
        i = 0,
        key;
    while (names.length > i)
      if (has(AllSymbols, key = names[i++]))
        result.push(AllSymbols[key]);
    return result;
  }
  if (!useNative) {
    $Symbol = function Symbol() {
      if (this instanceof $Symbol)
        throw TypeError('Symbol is not a constructor');
      return wrap(uid(arguments[0]));
    };
    $redef($Symbol.prototype, 'toString', function() {
      return this[TAG];
    });
    $.create = create;
    $.setDesc = defineProperty;
    $.getDesc = getOwnPropertyDescriptor;
    $.setDescs = defineProperties;
    $.getNames = $names.get = getOwnPropertyNames;
    $.getSymbols = getOwnPropertySymbols;
    if ($.DESC && $.FW)
      $redef(ObjectProto, 'propertyIsEnumerable', propertyIsEnumerable, true);
  }
  var symbolStatics = {
    'for': function(key) {
      return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
    },
    keyFor: function keyFor(key) {
      return keyOf(SymbolRegistry, key);
    },
    useSetter: function() {
      setter = true;
    },
    useSimple: function() {
      setter = false;
    }
  };
  $.each.call(('hasInstance,isConcatSpreadable,iterator,match,replace,search,' + 'species,split,toPrimitive,toStringTag,unscopables').split(','), function(it) {
    var sym = require("npm:core-js@0.9.18/library/modules/$.wks")(it);
    symbolStatics[it] = useNative ? sym : wrap(sym);
  });
  setter = true;
  $def($def.G + $def.W, {Symbol: $Symbol});
  $def($def.S, 'Symbol', symbolStatics);
  $def($def.S + $def.F * !useNative, 'Object', {
    create: create,
    defineProperty: defineProperty,
    defineProperties: defineProperties,
    getOwnPropertyDescriptor: getOwnPropertyDescriptor,
    getOwnPropertyNames: getOwnPropertyNames,
    getOwnPropertySymbols: getOwnPropertySymbols
  });
  setTag($Symbol, 'Symbol');
  setTag(Math, 'Math', true);
  setTag($.g.JSON, 'JSON', true);
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.8.25/core-js/object/assign", ["npm:core-js@0.9.18/library/fn/object/assign"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": require("npm:core-js@0.9.18/library/fn/object/assign"),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/fn/get-iterator", ["npm:core-js@0.9.18/library/modules/web.dom.iterable", "npm:core-js@0.9.18/library/modules/es6.string.iterator", "npm:core-js@0.9.18/library/modules/core.iter-helpers", "npm:core-js@0.9.18/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.18/library/modules/web.dom.iterable");
  require("npm:core-js@0.9.18/library/modules/es6.string.iterator");
  require("npm:core-js@0.9.18/library/modules/core.iter-helpers");
  module.exports = require("npm:core-js@0.9.18/library/modules/$").core.getIterator;
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.8.25/core-js/array/from", ["npm:core-js@0.9.18/library/fn/array/from"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": require("npm:core-js@0.9.18/library/fn/array/from"),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-process@0.1.1", ["github:jspm/nodelibs-process@0.1.1/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("github:jspm/nodelibs-process@0.1.1/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.8.25/core-js/map", ["npm:core-js@0.9.18/library/fn/map"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": require("npm:core-js@0.9.18/library/fn/map"),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.8.25/helpers/get", ["npm:babel-runtime@5.8.25/core-js/object/get-own-property-descriptor"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var _Object$getOwnPropertyDescriptor = require("npm:babel-runtime@5.8.25/core-js/object/get-own-property-descriptor")["default"];
  exports["default"] = function get(_x, _x2, _x3) {
    var _again = true;
    _function: while (_again) {
      var object = _x,
          property = _x2,
          receiver = _x3;
      desc = parent = getter = undefined;
      _again = false;
      if (object === null)
        object = Function.prototype;
      var desc = _Object$getOwnPropertyDescriptor(object, property);
      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
          return undefined;
        } else {
          _x = parent;
          _x2 = property;
          _x3 = receiver;
          _again = true;
          continue _function;
        }
      } else if ("value" in desc) {
        return desc.value;
      } else {
        var getter = desc.get;
        if (getter === undefined) {
          return undefined;
        }
        return getter.call(receiver);
      }
    }
  };
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.8.25/core-js/object/set-prototype-of", ["npm:core-js@0.9.18/library/fn/object/set-prototype-of"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": require("npm:core-js@0.9.18/library/fn/object/set-prototype-of"),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/fn/object/get-own-property-symbols", ["npm:core-js@0.9.18/library/modules/es6.symbol", "npm:core-js@0.9.18/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.18/library/modules/es6.symbol");
  module.exports = require("npm:core-js@0.9.18/library/modules/$").core.Object.getOwnPropertySymbols;
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.8.25/core-js/get-iterator", ["npm:core-js@0.9.18/library/fn/get-iterator"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": require("npm:core-js@0.9.18/library/fn/get-iterator"),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/$.task", ["npm:core-js@0.9.18/library/modules/$", "npm:core-js@0.9.18/library/modules/$.ctx", "npm:core-js@0.9.18/library/modules/$.cof", "npm:core-js@0.9.18/library/modules/$.invoke", "npm:core-js@0.9.18/library/modules/$.dom-create", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var $ = require("npm:core-js@0.9.18/library/modules/$"),
        ctx = require("npm:core-js@0.9.18/library/modules/$.ctx"),
        cof = require("npm:core-js@0.9.18/library/modules/$.cof"),
        invoke = require("npm:core-js@0.9.18/library/modules/$.invoke"),
        cel = require("npm:core-js@0.9.18/library/modules/$.dom-create"),
        global = $.g,
        isFunction = $.isFunction,
        html = $.html,
        process = global.process,
        setTask = global.setImmediate,
        clearTask = global.clearImmediate,
        MessageChannel = global.MessageChannel,
        counter = 0,
        queue = {},
        ONREADYSTATECHANGE = 'onreadystatechange',
        defer,
        channel,
        port;
    function run() {
      var id = +this;
      if ($.has(queue, id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
      }
    }
    function listner(event) {
      run.call(event.data);
    }
    if (!isFunction(setTask) || !isFunction(clearTask)) {
      setTask = function(fn) {
        var args = [],
            i = 1;
        while (arguments.length > i)
          args.push(arguments[i++]);
        queue[++counter] = function() {
          invoke(isFunction(fn) ? fn : Function(fn), args);
        };
        defer(counter);
        return counter;
      };
      clearTask = function(id) {
        delete queue[id];
      };
      if (cof(process) == 'process') {
        defer = function(id) {
          process.nextTick(ctx(run, id, 1));
        };
      } else if (global.addEventListener && isFunction(global.postMessage) && !global.importScripts) {
        defer = function(id) {
          global.postMessage(id, '*');
        };
        global.addEventListener('message', listner, false);
      } else if (isFunction(MessageChannel)) {
        channel = new MessageChannel;
        port = channel.port2;
        channel.port1.onmessage = listner;
        defer = ctx(port.postMessage, port, 1);
      } else if (ONREADYSTATECHANGE in cel('script')) {
        defer = function(id) {
          html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function() {
            html.removeChild(this);
            run.call(id);
          };
        };
      } else {
        defer = function(id) {
          setTimeout(ctx(run, id, 1), 0);
        };
      }
    }
    module.exports = {
      set: setTask,
      clear: clearTask
    };
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.8.25/helpers/inherits", ["npm:babel-runtime@5.8.25/core-js/object/create", "npm:babel-runtime@5.8.25/core-js/object/set-prototype-of"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var _Object$create = require("npm:babel-runtime@5.8.25/core-js/object/create")["default"];
  var _Object$setPrototypeOf = require("npm:babel-runtime@5.8.25/core-js/object/set-prototype-of")["default"];
  exports["default"] = function(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = _Object$create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.8.25/core-js/object/get-own-property-symbols", ["npm:core-js@0.9.18/library/fn/object/get-own-property-symbols"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": require("npm:core-js@0.9.18/library/fn/object/get-own-property-symbols"),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/modules/es6.promise", ["npm:core-js@0.9.18/library/modules/$", "npm:core-js@0.9.18/library/modules/$.ctx", "npm:core-js@0.9.18/library/modules/$.cof", "npm:core-js@0.9.18/library/modules/$.def", "npm:core-js@0.9.18/library/modules/$.assert", "npm:core-js@0.9.18/library/modules/$.for-of", "npm:core-js@0.9.18/library/modules/$.set-proto", "npm:core-js@0.9.18/library/modules/$.same", "npm:core-js@0.9.18/library/modules/$.species", "npm:core-js@0.9.18/library/modules/$.wks", "npm:core-js@0.9.18/library/modules/$.uid", "npm:core-js@0.9.18/library/modules/$.task", "npm:core-js@0.9.18/library/modules/$.mix", "npm:core-js@0.9.18/library/modules/$.iter-detect", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var $ = require("npm:core-js@0.9.18/library/modules/$"),
        ctx = require("npm:core-js@0.9.18/library/modules/$.ctx"),
        cof = require("npm:core-js@0.9.18/library/modules/$.cof"),
        $def = require("npm:core-js@0.9.18/library/modules/$.def"),
        assert = require("npm:core-js@0.9.18/library/modules/$.assert"),
        forOf = require("npm:core-js@0.9.18/library/modules/$.for-of"),
        setProto = require("npm:core-js@0.9.18/library/modules/$.set-proto").set,
        same = require("npm:core-js@0.9.18/library/modules/$.same"),
        species = require("npm:core-js@0.9.18/library/modules/$.species"),
        SPECIES = require("npm:core-js@0.9.18/library/modules/$.wks")('species'),
        RECORD = require("npm:core-js@0.9.18/library/modules/$.uid").safe('record'),
        PROMISE = 'Promise',
        global = $.g,
        process = global.process,
        isNode = cof(process) == 'process',
        asap = process && process.nextTick || require("npm:core-js@0.9.18/library/modules/$.task").set,
        P = global[PROMISE],
        isFunction = $.isFunction,
        isObject = $.isObject,
        assertFunction = assert.fn,
        assertObject = assert.obj,
        Wrapper;
    function testResolve(sub) {
      var test = new P(function() {});
      if (sub)
        test.constructor = Object;
      return P.resolve(test) === test;
    }
    var useNative = function() {
      var works = false;
      function P2(x) {
        var self = new P(x);
        setProto(self, P2.prototype);
        return self;
      }
      try {
        works = isFunction(P) && isFunction(P.resolve) && testResolve();
        setProto(P2, P);
        P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
        if (!(P2.resolve(5).then(function() {}) instanceof P2)) {
          works = false;
        }
        if (works && $.DESC) {
          var thenableThenGotten = false;
          P.resolve($.setDesc({}, 'then', {get: function() {
              thenableThenGotten = true;
            }}));
          works = thenableThenGotten;
        }
      } catch (e) {
        works = false;
      }
      return works;
    }();
    function isPromise(it) {
      return isObject(it) && (useNative ? cof.classof(it) == 'Promise' : RECORD in it);
    }
    function sameConstructor(a, b) {
      if (!$.FW && a === P && b === Wrapper)
        return true;
      return same(a, b);
    }
    function getConstructor(C) {
      var S = assertObject(C)[SPECIES];
      return S != undefined ? S : C;
    }
    function isThenable(it) {
      var then;
      if (isObject(it))
        then = it.then;
      return isFunction(then) ? then : false;
    }
    function notify(record) {
      var chain = record.c;
      if (chain.length)
        asap.call(global, function() {
          var value = record.v,
              ok = record.s == 1,
              i = 0;
          function run(react) {
            var cb = ok ? react.ok : react.fail,
                ret,
                then;
            try {
              if (cb) {
                if (!ok)
                  record.h = true;
                ret = cb === true ? value : cb(value);
                if (ret === react.P) {
                  react.rej(TypeError('Promise-chain cycle'));
                } else if (then = isThenable(ret)) {
                  then.call(ret, react.res, react.rej);
                } else
                  react.res(ret);
              } else
                react.rej(value);
            } catch (err) {
              react.rej(err);
            }
          }
          while (chain.length > i)
            run(chain[i++]);
          chain.length = 0;
        });
    }
    function isUnhandled(promise) {
      var record = promise[RECORD],
          chain = record.a || record.c,
          i = 0,
          react;
      if (record.h)
        return false;
      while (chain.length > i) {
        react = chain[i++];
        if (react.fail || !isUnhandled(react.P))
          return false;
      }
      return true;
    }
    function $reject(value) {
      var record = this,
          promise;
      if (record.d)
        return ;
      record.d = true;
      record = record.r || record;
      record.v = value;
      record.s = 2;
      record.a = record.c.slice();
      setTimeout(function() {
        asap.call(global, function() {
          if (isUnhandled(promise = record.p)) {
            if (isNode) {
              process.emit('unhandledRejection', value, promise);
            } else if (global.console && console.error) {
              console.error('Unhandled promise rejection', value);
            }
          }
          record.a = undefined;
        });
      }, 1);
      notify(record);
    }
    function $resolve(value) {
      var record = this,
          then;
      if (record.d)
        return ;
      record.d = true;
      record = record.r || record;
      try {
        if (then = isThenable(value)) {
          asap.call(global, function() {
            var wrapper = {
              r: record,
              d: false
            };
            try {
              then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
            } catch (e) {
              $reject.call(wrapper, e);
            }
          });
        } else {
          record.v = value;
          record.s = 1;
          notify(record);
        }
      } catch (e) {
        $reject.call({
          r: record,
          d: false
        }, e);
      }
    }
    if (!useNative) {
      P = function Promise(executor) {
        assertFunction(executor);
        var record = {
          p: assert.inst(this, P, PROMISE),
          c: [],
          a: undefined,
          s: 0,
          d: false,
          v: undefined,
          h: false
        };
        $.hide(this, RECORD, record);
        try {
          executor(ctx($resolve, record, 1), ctx($reject, record, 1));
        } catch (err) {
          $reject.call(record, err);
        }
      };
      require("npm:core-js@0.9.18/library/modules/$.mix")(P.prototype, {
        then: function then(onFulfilled, onRejected) {
          var S = assertObject(assertObject(this).constructor)[SPECIES];
          var react = {
            ok: isFunction(onFulfilled) ? onFulfilled : true,
            fail: isFunction(onRejected) ? onRejected : false
          };
          var promise = react.P = new (S != undefined ? S : P)(function(res, rej) {
            react.res = assertFunction(res);
            react.rej = assertFunction(rej);
          });
          var record = this[RECORD];
          record.c.push(react);
          if (record.a)
            record.a.push(react);
          if (record.s)
            notify(record);
          return promise;
        },
        'catch': function(onRejected) {
          return this.then(undefined, onRejected);
        }
      });
    }
    $def($def.G + $def.W + $def.F * !useNative, {Promise: P});
    cof.set(P, PROMISE);
    species(P);
    species(Wrapper = $.core[PROMISE]);
    $def($def.S + $def.F * !useNative, PROMISE, {reject: function reject(r) {
        return new (getConstructor(this))(function(res, rej) {
          rej(r);
        });
      }});
    $def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {resolve: function resolve(x) {
        return isPromise(x) && sameConstructor(x.constructor, this) ? x : new this(function(res) {
          res(x);
        });
      }});
    $def($def.S + $def.F * !(useNative && require("npm:core-js@0.9.18/library/modules/$.iter-detect")(function(iter) {
      P.all(iter)['catch'](function() {});
    })), PROMISE, {
      all: function all(iterable) {
        var C = getConstructor(this),
            values = [];
        return new C(function(res, rej) {
          forOf(iterable, false, values.push, values);
          var remaining = values.length,
              results = Array(remaining);
          if (remaining)
            $.each.call(values, function(promise, index) {
              C.resolve(promise).then(function(value) {
                results[index] = value;
                --remaining || res(results);
              }, rej);
            });
          else
            res(results);
        });
      },
      race: function race(iterable) {
        var C = getConstructor(this);
        return new C(function(res, rej) {
          forOf(iterable, false, function(promise) {
            C.resolve(promise).then(res, rej);
          });
        });
      }
    });
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/library/fn/promise", ["npm:core-js@0.9.18/library/modules/es6.object.to-string", "npm:core-js@0.9.18/library/modules/es6.string.iterator", "npm:core-js@0.9.18/library/modules/web.dom.iterable", "npm:core-js@0.9.18/library/modules/es6.promise", "npm:core-js@0.9.18/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.18/library/modules/es6.object.to-string");
  require("npm:core-js@0.9.18/library/modules/es6.string.iterator");
  require("npm:core-js@0.9.18/library/modules/web.dom.iterable");
  require("npm:core-js@0.9.18/library/modules/es6.promise");
  module.exports = require("npm:core-js@0.9.18/library/modules/$").core.Promise;
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.8.25/core-js/promise", ["npm:core-js@0.9.18/library/fn/promise"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": require("npm:core-js@0.9.18/library/fn/promise"),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.register('src/js/pubsub', ['npm:babel-runtime@5.8.25/helpers/create-class', 'npm:babel-runtime@5.8.25/helpers/class-call-check', 'src/js/base', 'src/js/log', 'src/js/dom'], function (_export) {
  var _createClass, _classCallCheck, BaseClass, Logger, dom, PubSub;

  return {
    setters: [function (_npmBabelRuntime5825HelpersCreateClass) {
      _createClass = _npmBabelRuntime5825HelpersCreateClass['default'];
    }, function (_npmBabelRuntime5825HelpersClassCallCheck) {
      _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck['default'];
    }, function (_srcJsBase) {
      BaseClass = _srcJsBase['default'];
    }, function (_srcJsLog) {
      Logger = _srcJsLog['default'];
    }, function (_srcJsDom) {
      dom = _srcJsDom['default'];
    }],
    execute: function () {

      /**
       *
       */
      'use strict';

      PubSub = (function () {

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

          this.log = new Logger(name, {
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

        _createClass(PubSub, [{
          key: 'start',
          value: function start() {}

          /**
           * Publish or broadcast events of interest with a specific topic name and arguments such as the data to pass along
           * @example
           * pubsub.publish('event', {name: 'value'});
           * @param {String} topic - The event topic name
           * @return {PubSub}
           */
        }, {
          key: 'publish',
          value: function publish(topic, args) {
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
          }

          /**
           * Subscribe to events of interest with a specific topic name and a callback function, to be executed when the topic/event is observed
           * @example
           * pubsub.subscribe('event', function(data){
             });
           * @param {String} topic - The name of the event.
           * @return {String} A string token
           */
        }, {
          key: 'subscribe',
          value: function subscribe(topic, fn) {
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
          }

          /**
           * Unsubscribe from a specific topic, based on a tokenized reference to the subscription
           * @example
           *
           * @param {String} token - The event token
           * @return {PubSub} PubSub instance
           */
        }, {
          key: 'unsubscribe',
          value: function unsubscribe(token) {
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
          }
        }], [{
          key: 'emit',
          value: function emit(event, data) {

            return dom('*body').trigger(event, data);
          }
        }, {
          key: 'on',
          value: function on(event, cb) {

            return dom('*body').on(event, cb);
          }
        }]);

        return PubSub;
      })();

      _export('default', PubSub);
    }
  };
});
System.register("src/js/interface", ["npm:babel-runtime@5.8.25/helpers/create-class", "npm:babel-runtime@5.8.25/helpers/class-call-check"], function (_export) {
  var _createClass, _classCallCheck, Interface;

  return {
    setters: [function (_npmBabelRuntime5825HelpersCreateClass) {
      _createClass = _npmBabelRuntime5825HelpersCreateClass["default"];
    }, function (_npmBabelRuntime5825HelpersClassCallCheck) {
      _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck["default"];
    }],
    execute: function () {
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

      Interface = (function () {
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

        _createClass(Interface, null, [{
          key: "ensureImplements",
          value: function ensureImplements(object) {
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
          }
        }]);

        return Interface;
      })();

      _export("default", Interface);
    }
  };
});
System.register('src/js/http', ['npm:babel-runtime@5.8.25/helpers/get', 'npm:babel-runtime@5.8.25/helpers/inherits', 'npm:babel-runtime@5.8.25/helpers/create-class', 'npm:babel-runtime@5.8.25/helpers/class-call-check', 'npm:babel-runtime@5.8.25/core-js/promise', 'src/js/base', 'src/js/log', 'src/js/interfaces'], function (_export) {
  var _get, _inherits, _createClass, _classCallCheck, _Promise, BaseClass, Logger, Interfaces, HTTP;

  return {
    setters: [function (_npmBabelRuntime5825HelpersGet) {
      _get = _npmBabelRuntime5825HelpersGet['default'];
    }, function (_npmBabelRuntime5825HelpersInherits) {
      _inherits = _npmBabelRuntime5825HelpersInherits['default'];
    }, function (_npmBabelRuntime5825HelpersCreateClass) {
      _createClass = _npmBabelRuntime5825HelpersCreateClass['default'];
    }, function (_npmBabelRuntime5825HelpersClassCallCheck) {
      _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck['default'];
    }, function (_npmBabelRuntime5825CoreJsPromise) {
      _Promise = _npmBabelRuntime5825CoreJsPromise['default'];
    }, function (_srcJsBase) {
      BaseClass = _srcJsBase['default'];
    }, function (_srcJsLog) {
      Logger = _srcJsLog['default'];
    }, function (_srcJsInterfaces) {
      Interfaces = _srcJsInterfaces['default'];
    }],
    execute: function () {
      /*globals Request, Promise*/

      /**
       * HTTP class provides an abstraction layer for HTTP calls.
       * @example
       * var $http = new px.mobile.HTTP('http1', {
       *  baseUrl: window.location.origin
       * });
       */
      'use strict';

      HTTP = (function (_BaseClass) {
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

          _get(Object.getPrototypeOf(HTTP.prototype), 'constructor', this).call(this, name, options);

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

        _createClass(HTTP, [{
          key: 'checkStatus',
          value: function checkStatus(response) {
            console.warn(response.status, response.statusText, response.url, response);
            if (response.status >= 200 && response.status < 300) {
              return response;
            } else {
              var error = new Error(response.statusText);
              error.response = response;
              return response;
            }
          }

          /**
           * I handle parsing the JSON of a response.
           * @param {Response} response A Response object
           * @return {Response} The original response with a data property that is the parsed JSON
           */
        }, {
          key: 'parseJSON',
          value: function parseJSON(response) {
            if (!response) {
              throw new Error('Must pass a response object to parseJSON!');
            }
            return response.json().then(function (json) {
              response.data = json;
              return response;
            });
          }

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
        }, {
          key: 'getJSON',
          value: function getJSON() {
            var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            var req = new Request(url, options || {
              method: 'GET'
            });
            return fetch(req).then(this.checkStatus).then(this.parseJSON);
          }

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
        }, {
          key: 'request',
          value: function request(url, options) {
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
            return new _Promise(function (resolve, reject) {
              return fetch(new Request(url, config)).then(function (resp) {
                _this.log.logHttp(resp.status + ' ' + benchmark.end(), resp, true);
                //return this.parseJSON(resp).then(resolve, reject);
                resp.data = {};
                resolve(resp);
              }, reject);
            });
          }

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
        }, {
          key: 'get',
          value: function get() {
            var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            this.log.logApi('get', options);
            return this.request(url, options).then(this.parseJSON);
          }

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
        }, {
          key: 'put',
          value: function put() {
            var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
            var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
            var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            this.log.logApi('put', data);
            return this.request(url, this.utils.extend({
              method: 'PUT',
              data: data
            }, options));
          }

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
        }, {
          key: 'post',
          value: function post() {
            var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
            var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
            var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            return this.request(url, this.utils.extend({
              method: 'POST',
              data: data
            }, options));
          }

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
        }, {
          key: 'delete',
          value: function _delete() {
            var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            return this.request(url, this.utils.extend({
              method: 'DELETE'
            }, options));
          }

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
        }, {
          key: 'head',
          value: function head() {
            var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            return this.request(url, this.utils.extend({
              method: 'HEAD'
            }, options));
          }
        }]);

        return HTTP;
      })(BaseClass);

      _export('default', HTTP);
    }
  };
});
System.register('src/js/core', ['npm:babel-runtime@5.8.25/helpers/get', 'npm:babel-runtime@5.8.25/helpers/inherits', 'npm:babel-runtime@5.8.25/helpers/create-class', 'npm:babel-runtime@5.8.25/helpers/class-call-check', 'src/js/base'], function (_export) {
  var _get, _inherits, _createClass, _classCallCheck, BaseClass, extensions, Core, err;

  return {
    setters: [function (_npmBabelRuntime5825HelpersGet) {
      _get = _npmBabelRuntime5825HelpersGet['default'];
    }, function (_npmBabelRuntime5825HelpersInherits) {
      _inherits = _npmBabelRuntime5825HelpersInherits['default'];
    }, function (_npmBabelRuntime5825HelpersCreateClass) {
      _createClass = _npmBabelRuntime5825HelpersCreateClass['default'];
    }, function (_npmBabelRuntime5825HelpersClassCallCheck) {
      _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck['default'];
    }, function (_srcJsBase) {
      BaseClass = _srcJsBase['default'];
    }],
    execute: function () {
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
      'use strict';
      extensions = {};

      Core = (function (_BaseClass) {
        _inherits(Core, _BaseClass);

        /**
         * The constructor of Core
         *
         * @class Core
         * @constructor
         */

        function Core(name, options) {
          _classCallCheck(this, Core);

          _get(Object.getPrototypeOf(Core.prototype), 'constructor', this).call(this, name, options);
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

        _createClass(Core, [{
          key: 'register',
          value: function register(module, constructor) {
            if (this.modules[module]) {
              this.helpers.err('!!module', module);
              return false;
            }
            this.modules[module] = {
              constructor: constructor,
              instance: null
            };
          }

          /**
           * Check if the module is already initialized or not
           *
           * @method moduleCheck
           * @param {string} module the name of the module that will be checked
           * @param {boolean} destroy check if the module exists, but is already destroyed
           * @return {boolean} if the module exists or already have an instance
           */
        }, {
          key: 'moduleCheck',
          value: function moduleCheck(module, destroy) {
            if (destroy) {
              return !module || !module.instance;
            }

            return !module || module.instance;
          }

          /**
           * Starts a registered module, if no module is passed, it starts all modules
           *
           * @method start
           * @param {string} module the name of the module
           */
        }, {
          key: 'start',
          value: function start(module) {
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
          }

          /**
           * Stops a registered module
           *
           * @method start
           * @param {string} module the name of the module
           */
        }, {
          key: 'stop',
          value: function stop(module) {
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
          }

          /**
           * Stop all started modules
           *
           * @method stopAll
           */
        }, {
          key: 'stopAll',
          value: function stopAll() {
            this.xAll('stop');
          }

          /**
           * Stop all started modules
           *
           * @method stopAll
           */
        }, {
          key: 'startAll',
          value: function startAll() {
            this.xAll('start');
          }

          /**
           * Helper for startAll and stopAll
           *
           * @method xAll
           * @param {string} method the method that will be triggered
           */
        }, {
          key: 'xAll',
          value: function xAll(method) {
            for (var module in this.modules) {
              if (this.modules.hasOwnProperty(module)) {
                this[method](module);
              }
            }
          }

          /**
           * Gets an element by ID to attach to the module instance
           *
           * @method getElement
           * @param {string} id the id of the main element in the module
           */
        }, {
          key: 'getElement',
          value: function getElement(id) {
            var el = document.getElementById(id);

            // this fixes some blackberry, opera and IE possible bugs
            return el && el.id === id && el.parentElement ? el : null;
          }

          /**
           * Extends core functionalities
           *
           * @method extend
           * @param {string} name the name of the extension
           * @param {function | array | boolean | string | number} implementation what the extension does
           */
        }], [{
          key: 'extend',
          value: function extend(name, implementation) {
            extensions[name] = implementation;
          }

          /**
           * returns the extension
           *
           * @method getExtension
           * @param {string} extension the name of the extension
           * @return {function | array | boolean | string | number} the implementation of the extension
           */
        }, {
          key: 'getExtension',
          value: function getExtension(extension) {
            return extensions[extension] || null;
          }
        }]);

        return Core;
      })(BaseClass);

      _export('default', Core);

      err = function err(error, message) {
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
    }
  };
});
System.register('src/js/service-locator', ['npm:babel-runtime@5.8.25/helpers/create-class', 'npm:babel-runtime@5.8.25/helpers/class-call-check'], function (_export) {
  var _createClass, _classCallCheck, _instance, _services, ServiceLocator;

  return {
    setters: [function (_npmBabelRuntime5825HelpersCreateClass) {
      _createClass = _npmBabelRuntime5825HelpersCreateClass['default'];
    }, function (_npmBabelRuntime5825HelpersClassCallCheck) {
      _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck['default'];
    }],
    execute: function () {
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

      _instance = null;
      _services = {};

      ServiceLocator = (function () {
        function ServiceLocator(options) {
          _classCallCheck(this, ServiceLocator);

          this.services = _services;
          this.options = options || {};
          return this;
        }

        _createClass(ServiceLocator, [{
          key: 'register',
          value: function register(key, service) {
            _services[key] = service;
            return this;
          }
        }, {
          key: 'resolve',
          value: function resolve(key) {
            return _services[key];
          }

          /**
           * I start a service by calling the start() method on the service.
           */
        }, {
          key: 'start',
          value: function start(key) {
            var service = _services[key];
            console.warn('Starting service', key, service);
            return service.start();
          }
        }, {
          key: 'startAll',
          value: function startAll() {
            var all = [];
            console.warn('startAll', _services);
            for (var service in _services) {
              console.warn('Starting service', service);
              all.push(this.start(service));
            }
            return all;
          }
        }, {
          key: 'reset',
          value: function reset() {
            _services = {};
            return this;
          }

          /**
           * Return the ServiceLocator _instance.
           * @return the _instance.
           */
        }], [{
          key: 'getInstance',
          value: function getInstance() {
            if (_instance == null) {
              _instance = new ServiceLocator();
            }
            return _instance;
          }
        }]);

        return ServiceLocator;
      })();

      _export('default', ServiceLocator);
    }
  };
});
System.register('src/js/db', ['npm:babel-runtime@5.8.25/helpers/get', 'npm:babel-runtime@5.8.25/helpers/inherits', 'npm:babel-runtime@5.8.25/helpers/create-class', 'npm:babel-runtime@5.8.25/helpers/class-call-check', 'src/js/base', 'src/js/http', 'src/js/log'], function (_export) {
  var _get, _inherits, _createClass, _classCallCheck, BaseClass, HTTP, Logger, DB;

  return {
    setters: [function (_npmBabelRuntime5825HelpersGet) {
      _get = _npmBabelRuntime5825HelpersGet['default'];
    }, function (_npmBabelRuntime5825HelpersInherits) {
      _inherits = _npmBabelRuntime5825HelpersInherits['default'];
    }, function (_npmBabelRuntime5825HelpersCreateClass) {
      _createClass = _npmBabelRuntime5825HelpersCreateClass['default'];
    }, function (_npmBabelRuntime5825HelpersClassCallCheck) {
      _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck['default'];
    }, function (_srcJsBase) {
      BaseClass = _srcJsBase['default'];
    }, function (_srcJsHttp) {
      HTTP = _srcJsHttp['default'];
    }, function (_srcJsLog) {
      Logger = _srcJsLog['default'];
    }],
    execute: function () {

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
      'use strict';

      DB = (function (_BaseClass) {
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

          _get(Object.getPrototypeOf(DB.prototype), 'constructor', this).call(this, name, options);

          if (!options.baseUrl) {
            //throw new Error('DB: Must provide a baseUrl');
            console.warn('[DB] - Using default baseUrl - /default');
          }

          /**
           * @type {Class} adapter - The adapter to use for all requests.
           */
          this.adapter = options.adapter || HTTP;
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

        _createClass(DB, [{
          key: 'info',
          value: function info() {
            return this.adapter.get('');
          }

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
        }, {
          key: 'allDocs',
          value: function allDocs(options) {
            this.log.logApi('allDocs', options);
            return this.adapter.get('/_all_docs', {
              params: options
            });
          }

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
        }, {
          key: 'get',
          value: function get(docId, options) {
            this.log.logApi('get', docId);
            if (!docId) {
              throw new Error('db.get(docId) - Must provide a document _id!');
            }
            return this.adapter.get('/' + docId, options);
          }

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
        }, {
          key: 'put',
          value: function put(doc, options) {
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
          }

          /**
           * @description I handle creating a new document with a generated _id
           * @example
           * @param {Object} doc - A document object
           * @return {Promise <Response, Error>} A promise that is resolved/rejected upon success/failure.
           */
        }, {
          key: 'post',
          value: function post(doc) {
            if (!doc) {
              throw new Error('db.put(doc) - Must provide a document object!');
            }
            doc._id = this.utils.uuid();
            return this.put(doc);
          }

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
        }, {
          key: 'remove',
          value: function remove(id, rev) {
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
          }

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
        }, {
          key: 'getAttachment',
          value: function getAttachment(id, attachmentId, contentType) {
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
          }

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
        }, {
          key: 'saveAttachment',
          value: function saveAttachment(id, rev, filename, type, file) {
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
          }

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
        }, {
          key: 'bulkDocs',
          value: function bulkDocs(docs) {
            if (!docs) {
              throw new Error('bulkDocs - Must provide an array of documents!');
            }
            this.log.logApi('bulkDocs', docs);
            return this.adapter.post('/_bulk_docs', {
              docs: docs
            }).then(this.adapter.parseJSON);
          }

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
        }, {
          key: 'changes',
          value: function changes(options) {
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
          }
        }]);

        return DB;
      })(BaseClass);

      _export('default', DB);
    }
  };
});
System.register('src/js/router', ['npm:babel-runtime@5.8.25/helpers/get', 'npm:babel-runtime@5.8.25/helpers/inherits', 'npm:babel-runtime@5.8.25/helpers/create-class', 'npm:babel-runtime@5.8.25/helpers/class-call-check', 'npm:babel-runtime@5.8.25/core-js/promise', 'src/js/pubsub', 'src/js/base'], function (_export) {
  var _get, _inherits, _createClass, _classCallCheck, _Promise, PubSub, BaseClass, routeStripper, rootStripper, pathStripper, RouterHistory, _instance, optionalParam, namedParam, splatParam, escapeRegExp, Router;

  return {
    setters: [function (_npmBabelRuntime5825HelpersGet) {
      _get = _npmBabelRuntime5825HelpersGet['default'];
    }, function (_npmBabelRuntime5825HelpersInherits) {
      _inherits = _npmBabelRuntime5825HelpersInherits['default'];
    }, function (_npmBabelRuntime5825HelpersCreateClass) {
      _createClass = _npmBabelRuntime5825HelpersCreateClass['default'];
    }, function (_npmBabelRuntime5825HelpersClassCallCheck) {
      _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck['default'];
    }, function (_npmBabelRuntime5825CoreJsPromise) {
      _Promise = _npmBabelRuntime5825CoreJsPromise['default'];
    }, function (_srcJsPubsub) {
      PubSub = _srcJsPubsub['default'];
    }, function (_srcJsBase) {
      BaseClass = _srcJsBase['default'];
    }],
    execute: function () {

      //regex for stripping a leading hash/slash and trailing space.
      'use strict';
      routeStripper = /^[#\/]|\s+$/g;

      //regex for stripping leading and trailing slashes.
      rootStripper = /^\/+|\/+$/g;

      // regex for stripping urls of hash.
      pathStripper = /#.*$/;

      /**
       * Router history manages the state of the router.
       * Handles cross-browser history management, based on either pushState and real URLs, or onhashchange and URL fragments.
       * Inspired by http://backbonejs.org/docs/backbone.html#section-196
       */

      RouterHistory = (function (_BaseClass) {
        _inherits(RouterHistory, _BaseClass);

        function RouterHistory(name) {
          var options = arguments.length <= 1 || arguments[1] === undefined ? {
            root: '/'
          } : arguments[1];

          _classCallCheck(this, RouterHistory);

          _get(Object.getPrototypeOf(RouterHistory.prototype), 'constructor', this).call(this, name, options);

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

        _createClass(RouterHistory, [{
          key: 'go',
          value: function go(route, options) {
            if (this.pushState) {
              this.history.pushState(options, document.title, route);
            } else {
              this.location.hash = route;
            }
          }

          /**
           *
           */
        }, {
          key: 'state',
          value: function state() {
            return this.history.state;
          }

          /**
           *
           */
        }, {
          key: 'back',
          value: function back() {
            return this.history.back();
          }

          /**
           *
           */
        }, {
          key: 'forward',
          value: function forward() {
            return this.history.forward();
          }
        }, {
          key: 'atRoot',
          value: function atRoot() {
            var path = this.location.pathname.replace(/[^\/]$/, '$&/');
            return path === this.root && !this.getSearch();
          }
        }, {
          key: 'matchRoot',
          value: function matchRoot() {
            var path = this.decodeFragment(this.location.pathname);
            var root = path.slice(0, this.root.length - 1) + '/';
            return root === this.root;
          }
        }, {
          key: 'decodeFragment',
          value: function decodeFragment(fragment) {
            return decodeURI(fragment.replace(/%25/g, '%2525'));
          }

          /**
           *
           */
        }, {
          key: 'getSearch',
          value: function getSearch() {
            var match = this.location.href.replace(/#.*/, '').match(/\?.+/);
            return match ? match[0] : '';
          }

          /**
           * Gets the true hash value.
           */
        }, {
          key: 'getHash',
          value: function getHash(window) {
            var match = (window || this).location.href.match(/#(.*)$/);
            return match ? match[1] : '';
          }

          /**
           * Get the pathname and search params, without the root.
           */
        }, {
          key: 'getPath',
          value: function getPath() {
            var path = this.decodeFragment(this.location.pathname + this.getSearch()).slice(this.root.length - 1);
            return path.charAt(0) === '/' ? path.slice(1) : path;
          }

          /**
           * Get the browser normailzed URL fragment form the path or hash.
           */
        }, {
          key: 'getFragment',
          value: function getFragment(fragment) {
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
          }
        }]);

        return RouterHistory;
      })(BaseClass);

      _export('RouterHistory', RouterHistory);

      RouterHistory.started = false;

      _instance = null;
      optionalParam = /\((.*?)\)/g;
      namedParam = /(\(\?)?:\w+/g;
      splatParam = /\*\w+/g;
      escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

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

      Router = (function (_BaseClass2) {
        _inherits(Router, _BaseClass2);

        _createClass(Router, null, [{
          key: 'getInstance',

          /**
           * Return the ServiceLocator _instance.
           * @return the _instance.
           */
          value: function getInstance() {
            if (_instance == null) {
              _instance = new Router();
            }

            return _instance;
          }

          /**
           * This is the Router class constructor
           * @constructor
           * @param {String} name - The name of the router
           * @param {Object} options - The options for the router
           */
        }]);

        function Router(name, options) {
          _classCallCheck(this, Router);

          name = name + '.Router';
          _get(Object.getPrototypeOf(Router.prototype), 'constructor', this).call(this, name, options);

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

        _createClass(Router, [{
          key: 'listen',
          value: function listen() {
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
          }
        }, {
          key: 'check',
          value: function check(f) {
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
          }

          /**
           * Handle starting the router and setting up listeners.
           */
        }, {
          key: 'start',
          value: function start() {
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
          }

          /**
           * Execute a route handler with the provided parameters.
           * @param {Function} callback - The callback function to invoke
           * @param {*} args - The arguments to pass to the callback
           * @param {String} name - The name of the route
           */
        }, {
          key: 'execute',
          value: function execute(callback, args, name) {
            //PubSub.emit(name, args);
            this.log.logApi('execute =>' + name, args);
            if (callback) {
              callback.apply(this, args);
            }
            return this;
          }

          /**
           * Navigate to a route passing options
           * @example
           * myRouter.navigate('/login');
           * @param {String} route - The route to Navigate to
           * @param {Object} options - The options to pass to the route handler
           */
        }, {
          key: 'navigate',
          value: function navigate(route, options) {
            this.log.logApi('navigate =>' + route, options);
            /*
            PubSub.emit('route:before', {
              route, options
            });
            */
            this.history.go(route, options);

            return this;
          }

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
        }, {
          key: 'on',
          value: function on(route, options) {
            this.subscribe(route, options);
            this.log.logApi('5. on -' + route, options);
            this.routes[route] = options;
            this._setRegexRoutes();
            return this;
          }

          /**
           * Promise based route handler, use this to add routes that resolve a promise when matched.
           * @param {String} route - The route to match.
           * @return {Promise} A promise that is resolved when matched.
           */
        }, {
          key: 'when',
          value: function when(route) {
            this.log.logApi('4. when', route);
            var _this = this;
            return new _Promise(function (resolve, reject) {
              _this.on(route, {
                callback: function callback(req, res) {
                  resolve(req, res);
                }
              });
            });
          }

          /**
           * Manually bind a single named route to a callback. For example:
           *
           * // Matches #page/10, passing "10"
           * this.route("page/:number", "page", function(number){ ... });
           *
           * // Matches /117-a/b/c/open, passing "117-a/b/c" to this.open
           * this.route(/^(.*?)\/open$/, "open");
           */
        }, {
          key: 'route',
          value: function route(_route2, name, callback) {
            this.log.logApi('route', _route2);
            return this;
          }

          /**
           * I handle the routing when the location.hash changes.
           */
        }, {
          key: '_handleRoute',
          value: function _handleRoute(e) {
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
          }

          /**
           * I handle building the regular expressions from the route patterns.
           */
        }, {
          key: '_setRegexRoutes',
          value: function _setRegexRoutes() {
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
          }

          /**
           * I handle taking a regex route pattern and the route and returning the matches key:value pair object.
           * @param {Object} routeObj - The route object to set
           * @return {Object} A route object map of name/value pairs
           */
        }, {
          key: '_setRouteParams',
          value: function _setRouteParams(routeObj) {
            var normalized = routeObj.route.replace(/\:/g, '');
            var m1 = routeObj.regexp.exec(normalized);
            var m2 = routeObj.regexp.exec(routeObj.current);
            var params = {};
            for (var i = 1; i < m1.length; i++) {
              params[m1[i]] = m2[i];
            }
            routeObj.params = params;
            return routeObj;
          }

          /**
           * I handle parsing a url string and returning the query object.
           * @param {String} url - The url to parse
           * @return {Object} A object map of name/value pairs
           */
        }, {
          key: '_getUrlQuery',
          value: function _getUrlQuery(url) {
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
          }

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
        }, {
          key: '_regexRoute',
          value: function _regexRoute(path, keys, sensitive, strict) {
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
          }

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

        }]);

        return Router;
      })(BaseClass);

      _export('default', Router);
    }
  };
});
System.register('src/js/page', ['npm:babel-runtime@5.8.25/helpers/get', 'npm:babel-runtime@5.8.25/helpers/inherits', 'npm:babel-runtime@5.8.25/helpers/create-class', 'npm:babel-runtime@5.8.25/helpers/class-call-check', 'src/js/pubsub', 'src/js/base'], function (_export) {
  var _get, _inherits, _createClass, _classCallCheck, PubSub, BaseClass, Page;

  return {
    setters: [function (_npmBabelRuntime5825HelpersGet) {
      _get = _npmBabelRuntime5825HelpersGet['default'];
    }, function (_npmBabelRuntime5825HelpersInherits) {
      _inherits = _npmBabelRuntime5825HelpersInherits['default'];
    }, function (_npmBabelRuntime5825HelpersCreateClass) {
      _createClass = _npmBabelRuntime5825HelpersCreateClass['default'];
    }, function (_npmBabelRuntime5825HelpersClassCallCheck) {
      _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck['default'];
    }, function (_srcJsPubsub) {
      PubSub = _srcJsPubsub['default'];
    }, function (_srcJsBase) {
      BaseClass = _srcJsBase['default'];
    }],
    execute: function () {

      /**
       * @description Page class has methods for managing a page.
       */
      'use strict';

      Page = (function (_BaseClass) {
        _inherits(Page, _BaseClass);

        function Page(name, options) {
          _classCallCheck(this, Page);

          _get(Object.getPrototypeOf(Page.prototype), 'constructor', this).call(this, name, options);

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

          this.utils.addMixin(new PubSub(name), this);

          return this;
        }

        _createClass(Page, [{
          key: 'created',
          value: function created() {
            var logger = new px.mobile.Logger(this.tagName, {
              colors: {
                debug: 'color:orange'
              }
            });
            px.mobile.utils.addMixin(logger, this);
            this.log.logApi('created', this.id);
            this.emit('page:' + this.id + ':init', this);
          }
        }, {
          key: 'ready',
          value: function ready() {
            this.log.logApi('ready', this.id);
            if (this.dialog) {
              this.toggleClass('dialog');
            }
            this.emit('page:' + this.id + ':ready', this);
          }
        }, {
          key: 'show',
          value: function show() {
            console.warn('INFO', 'show view', this.id);
            this.toggleClass('current', false, this);
          }
        }, {
          key: 'hide',
          value: function hide() {
            console.warn('INFO', 'hide view', this.id);
            this.toggleClass('hidden', true, this);
          }
        }, {
          key: 'update',
          value: function update() {
            console.warn('INFO', 'update view', this.id);
          }
        }, {
          key: 'currentView',
          value: function currentView() {
            console.warn('INFO', 'current view', this.id);
            this.child()[0].toggleClass('current', true, this);
          }
        }, {
          key: 'nextView',
          value: function nextView() {
            console.warn('INFO', 'next view', this.id);
            this.toggleClass('next', true, this);
          }
        }, {
          key: 'previousView',
          value: function previousView() {
            console.warn('INFO', 'previous view', this.id);
            this.toggleClass('previous', true, this);
          }
        }, {
          key: 'contextChanged',
          value: function contextChanged(newContext, oldContext) {
            console.warn('contextChanged', newContext, oldContext);
          }

          //I handle loading a page from a url
        }, {
          key: '_tmplChanged',
          value: function _tmplChanged(newVal, oldVal) {
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
          }
        }, {
          key: 'showMenu',
          value: function showMenu() {
            px.mobile.dom('px-app').toggleClass('show-menu');
          }
        }, {
          key: 'open',
          value: function open() {
            if (this.dialog) {
              this.toggleClass('open');
            }
          }
        }, {
          key: 'close',
          value: function close() {
            if (this.dialog) {
              this.toggleClass('open');
            }
          }
        }]);

        return Page;
      })(BaseClass);

      _export('default', Page);
    }
  };
});
System.register('src/js/pages', ['npm:babel-runtime@5.8.25/helpers/get', 'npm:babel-runtime@5.8.25/helpers/inherits', 'npm:babel-runtime@5.8.25/helpers/class-call-check', 'src/js/pubsub', 'src/js/base'], function (_export) {
  var _get, _inherits, _classCallCheck, PubSub, BaseClass, Pages;

  return {
    setters: [function (_npmBabelRuntime5825HelpersGet) {
      _get = _npmBabelRuntime5825HelpersGet['default'];
    }, function (_npmBabelRuntime5825HelpersInherits) {
      _inherits = _npmBabelRuntime5825HelpersInherits['default'];
    }, function (_npmBabelRuntime5825HelpersClassCallCheck) {
      _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck['default'];
    }, function (_srcJsPubsub) {
      PubSub = _srcJsPubsub['default'];
    }, function (_srcJsBase) {
      BaseClass = _srcJsBase['default'];
    }],
    execute: function () {

      /**
       * @description Pages class has methods for managing a collection of pages.
       */
      'use strict';

      Pages = (function (_BaseClass) {
        _inherits(Pages, _BaseClass);

        function Pages(name, options) {
          _classCallCheck(this, Pages);

          _get(Object.getPrototypeOf(Pages.prototype), 'constructor', this).call(this, name, options);
          return this;
        }

        return Pages;
      })(BaseClass);

      _export('default', Pages);
    }
  };
});
System.register('src/js/view', ['npm:babel-runtime@5.8.25/helpers/create-class', 'npm:babel-runtime@5.8.25/helpers/class-call-check'], function (_export) {
  var _createClass, _classCallCheck, View;

  return {
    setters: [function (_npmBabelRuntime5825HelpersCreateClass) {
      _createClass = _npmBabelRuntime5825HelpersCreateClass['default'];
    }, function (_npmBabelRuntime5825HelpersClassCallCheck) {
      _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck['default'];
    }],
    execute: function () {
      /**
       * View class provides event dispatching.
       * @example
       * var View = new View('namespace');
             View.publish('event', {name: value});
      
       * @param {String} name - The name of the View.
       * @return {View} Instance of the View.
       */
      'use strict';

      View = (function () {
        function View(options) {
          _classCallCheck(this, View);

          console.warn('new View', options);
          this.id = options.id;
          this.params = options.params || {};
          this.url = options.url || '';
          this.main = options.main || false;
          this.element = document.createElement('px-view');
        }

        _createClass(View, [{
          key: 'toHTML',
          value: function toHTML() {
            console.log(this, this.element);
          }
        }]);

        return View;
      })();

      _export('default', View);
    }
  };
});
System.register('src/js/interfaces', ['src/js/interface'], function (_export) {
  // TODO: All interfaces defined here to ensure modules implement;

  /**
   * All interfaces defined here to ensure modules implement;
   * @type {Object}
   */
  'use strict';

  var Interface, Interfaces;
  return {
    setters: [function (_srcJsInterface) {
      Interface = _srcJsInterface['default'];
    }],
    execute: function () {
      Interfaces = {};

      /**
       * Database interface - All database adapters must implement this interface.
       * @interface IDBInterface
       * @type {Interface}
       */
      Interfaces.IDBInterface = new Interface('IDBInterface', ['getAttachment', 'saveAttachment', 'get', 'put', 'post', 'remove', 'allDocs', 'bulkDocs', 'changes']);
      /**
       * HTTP interface - All HTTP adapters must implement this interface.
       * @interface IHTTPInterface
       * @type {Interface}
       */
      Interfaces.IHTTPInterface = new Interface('IHTTPInterface', ['get', 'put', 'post', 'delete', 'head', 'request']);

      _export('default', Interfaces);
    }
  };
});
System.register('src/js/app', ['npm:babel-runtime@5.8.25/helpers/get', 'npm:babel-runtime@5.8.25/helpers/inherits', 'npm:babel-runtime@5.8.25/helpers/create-class', 'npm:babel-runtime@5.8.25/helpers/class-call-check', 'npm:babel-runtime@5.8.25/core-js/promise', 'src/js/core', 'src/js/service-locator'], function (_export) {
  var _get, _inherits, _createClass, _classCallCheck, _Promise, Core, ServiceLocator, _instance, App;

  return {
    setters: [function (_npmBabelRuntime5825HelpersGet) {
      _get = _npmBabelRuntime5825HelpersGet['default'];
    }, function (_npmBabelRuntime5825HelpersInherits) {
      _inherits = _npmBabelRuntime5825HelpersInherits['default'];
    }, function (_npmBabelRuntime5825HelpersCreateClass) {
      _createClass = _npmBabelRuntime5825HelpersCreateClass['default'];
    }, function (_npmBabelRuntime5825HelpersClassCallCheck) {
      _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck['default'];
    }, function (_npmBabelRuntime5825CoreJsPromise) {
      _Promise = _npmBabelRuntime5825CoreJsPromise['default'];
    }, function (_srcJsCore) {
      Core = _srcJsCore['default'];
    }, function (_srcJsServiceLocator) {
      ServiceLocator = _srcJsServiceLocator['default'];
    }],
    execute: function () {
      'use strict';

      //import Router from './router';
      _instance = null;

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

      App = (function (_Core) {
        _inherits(App, _Core);

        _createClass(App, null, [{
          key: 'getInstance',

          /**
           * Return the ServiceLocator _instance.
           * @return the _instance.
           */
          value: function getInstance() {
            if (_instance === null) {
              _instance = new App();
            }
            return _instance;
          }
        }]);

        function App(name, options) {
          _classCallCheck(this, App);

          _get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this, name, options);
          this.modules = {};
          this.session = {};
          //  this.router = new Router();
          this.services = new ServiceLocator();

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

        _createClass(App, [{
          key: 'start',
          value: function start() {
            this.log.logApi('start', this);
            return _Promise.all(this.services.startAll());
          }

          /**
           * Handle bootstrapping application.
           * @param {Function} cb - The callback function to execute when done.
           */
        }, {
          key: 'bootstrap',
          value: function bootstrap(cb) {
            this.log.logApi('bootstrap', this);
            cb(this);
          }

          /**
           * Handle running the application.
           * @param {Function} cb - The callback function to execute when done.
           */
        }, {
          key: 'run',
          value: function run(cb) {
            this.log.logApi('run', this);
            this.start();
            cb(this);
          }
        }]);

        return App;
      })(Core);

      _export('default', App);
    }
  };
});
System.register('src/js/views', ['npm:babel-runtime@5.8.25/helpers/get', 'npm:babel-runtime@5.8.25/helpers/inherits', 'npm:babel-runtime@5.8.25/helpers/create-class', 'npm:babel-runtime@5.8.25/helpers/class-call-check', 'npm:babel-runtime@5.8.25/core-js/map', 'src/js/base', 'src/js/view'], function (_export) {
  var _get, _inherits, _createClass, _classCallCheck, _Map, BaseClass, View, Views;

  return {
    setters: [function (_npmBabelRuntime5825HelpersGet) {
      _get = _npmBabelRuntime5825HelpersGet['default'];
    }, function (_npmBabelRuntime5825HelpersInherits) {
      _inherits = _npmBabelRuntime5825HelpersInherits['default'];
    }, function (_npmBabelRuntime5825HelpersCreateClass) {
      _createClass = _npmBabelRuntime5825HelpersCreateClass['default'];
    }, function (_npmBabelRuntime5825HelpersClassCallCheck) {
      _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck['default'];
    }, function (_npmBabelRuntime5825CoreJsMap) {
      _Map = _npmBabelRuntime5825CoreJsMap['default'];
    }, function (_srcJsBase) {
      BaseClass = _srcJsBase['default'];
    }, function (_srcJsView) {
      View = _srcJsView['default'];
    }],
    execute: function () {

      /**
       * Views class provides event dispatching.
       * @example
       * var Views = new Views('namespace');
             Views.publish('event', {name: value});
      
       * @param {String} name - The name of the Views.
       * @return {Views} Instance of the Views.
       */
      'use strict';

      Views = (function (_BaseClass) {
        _inherits(Views, _BaseClass);

        function Views(options) {
          var _this = this;

          _classCallCheck(this, Views);

          _get(Object.getPrototypeOf(Views.prototype), 'constructor', this).call(this, options.id, options);
          this.id = options.id;
          this.selected = options.selected || 0;
          this.selectedView = {};
          this.views = [];
          this.viewMap = new _Map();
          //  this.router = new Router(options);

          if (options.views) {
            options.views.forEach(function (view) {
              _this.add(view);
            });
          }

          this.selectViewByIndex(this.selected);
          return this;
        }

        _createClass(Views, [{
          key: 'created',
          value: function created() {
            console.warn('Views created');
          }
        }, {
          key: 'attached',
          value: function attached() {
            console.warn('Views attached');
          }
        }, {
          key: 'add',
          value: function add(v) {
            var view = new View(v);
            view.index = this.views.length;
            this[view.id] = view;
            this.views.push(view);
            this.viewMap.set(view.id, view);
            return this;
          }
        }, {
          key: 'get',
          value: function get(key) {
            return this.viewMap.get(key);
          }
        }, {
          key: 'getViews',
          value: function getViews() {
            return this.viewMap.entries();
          }
        }, {
          key: 'selectView',
          value: function selectView(key) {
            console.warn('Views.selectView()', key);
            this.selectedView = this.viewMap.get(key);
            this.selected = this.views.indexOf(this.selectedView);
            return this;
          }
        }, {
          key: 'getSelectedView',
          value: function getSelectedView() {
            return this.selectedView;
          }
        }, {
          key: 'getSelectedIndex',
          value: function getSelectedIndex() {
            return this.views.indexOf(this.getSelectedView());
          }
        }, {
          key: 'nextView',
          value: function nextView() {
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
          }
        }, {
          key: 'prevView',
          value: function prevView() {
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
          }
        }, {
          key: 'selectViewByIndex',
          value: function selectViewByIndex(i) {
            this.selectView(this.views[i].id);
          }
        }, {
          key: 'changeView',
          value: function changeView(id) {
            this.selectView(id);
          }
        }]);

        return Views;
      })(BaseClass);

      _export('default', Views);
    }
  };
});
System.register('src/js/simple-router', ['npm:babel-runtime@5.8.25/helpers/get', 'npm:babel-runtime@5.8.25/helpers/inherits', 'npm:babel-runtime@5.8.25/helpers/create-class', 'npm:babel-runtime@5.8.25/helpers/class-call-check', 'npm:babel-runtime@5.8.25/core-js/map', 'src/js/base'], function (_export) {
  var _get, _inherits, _createClass, _classCallCheck, _Map, BaseClass, SimpleRouter;

  return {
    setters: [function (_npmBabelRuntime5825HelpersGet) {
      _get = _npmBabelRuntime5825HelpersGet['default'];
    }, function (_npmBabelRuntime5825HelpersInherits) {
      _inherits = _npmBabelRuntime5825HelpersInherits['default'];
    }, function (_npmBabelRuntime5825HelpersCreateClass) {
      _createClass = _npmBabelRuntime5825HelpersCreateClass['default'];
    }, function (_npmBabelRuntime5825HelpersClassCallCheck) {
      _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck['default'];
    }, function (_npmBabelRuntime5825CoreJsMap) {
      _Map = _npmBabelRuntime5825CoreJsMap['default'];
    }, function (_srcJsBase) {
      BaseClass = _srcJsBase['default'];
    }],
    execute: function () {
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
      'use strict';

      SimpleRouter = (function (_BaseClass) {
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
          _get(Object.getPrototypeOf(SimpleRouter.prototype), 'constructor', this).call(this, name, options);

          this.routes = {};

          this.routeMap = new _Map();

          //Could be 'hash' or 'history' showing if we use the History API or not
          this.mode = options.hash || 'hash';

          //the root URL path of the application. It is needed only if we use pushState.
          this.root = options.root || '/';

          this.urlPrefix = options.urlPrefix || '!#!';

          this.mixin(options);

          this.config(options);

          return this;
        }

        _createClass(SimpleRouter, [{
          key: 'config',
          value: function config(options) {
            this.mode = options && options.mode && options.mode === 'history' && !!history.pushState ? 'history' : 'hash';
            this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';
            if (options && options.routes) {
              for (var route in options.routes) {
                this.add(route, options.routes[route]);
                console.warn('Adding route', route);
              }
            }
            return this;
          }

          /**
           * Remove the slashes from the beginning and from the end of the string.
           */
        }, {
          key: 'clearSlashes',
          value: function clearSlashes(path) {
            return path.toString().replace(/\/$/, '').replace(/^\//, '');
          }
        }, {
          key: 'getFragment',
          value: function getFragment() {
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
          }

          /**
           * Handle adding a route to the Router.
           * @example
           * //Code
           * @param {RegExp} re - Regular expression to match route against.
           * @param {Function} handler - Callback function to invoke when route matches.
           * @return {SimpleRouter} Returns instance of the router.
           */
        }, {
          key: 'add',
          value: function add(re, handler) {
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
          }

          /**
           * Handle removing a param from the handler
           * @example
           * //Code
           */
        }, {
          key: 'remove',
          value: function remove(param) {
            for (var i = 0, r; i < this.routes.length, r = this.routes[i]; i++) {
              if (r.handler === param || r.re.toString() === param.toString()) {
                this.routes.splice(i, 1);
                return this;
              }
            }
            return this;
          }

          /**
           * Handle flusing all the routes.
           * @example
           * //Code
           */
        }, {
          key: 'flush',
          value: function flush() {
            this.routes = [];
            this.mode = null;
            this.root = '/';
            return this;
          }

          /**
           * Handle invoking a route which triggers the callback handler.
           * @example
           * //Code
           */
        }, {
          key: 'check',
          value: function check(f) {
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
          }

          /**
           * Handle starting the route which then listens for changes.
           * @example
           * //Code
           */
        }, {
          key: 'listen',
          value: function listen() {
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
          }

          /**
           * Handle changing the current routes location.
           * @example
           * //Code
           */
        }, {
          key: 'navigate',
          value: function navigate(path) {
            path = path ? path : '';
            if (this.mode === 'history') {
              history.pushState(null, null, this.root + this.clearSlashes(path));
            } else {
              window.location.href.match(/#(.*)$/);
              window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
            }
            return this;
          }

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
        }, {
          key: 'regexRoute',
          value: function regexRoute(path, keys, sensitive, strict) {
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
          }
        }]);

        return SimpleRouter;
      })(BaseClass);

      _export('default', SimpleRouter);
    }
  };
});
System.register('src/js/dom', ['npm:babel-runtime@5.8.25/helpers/create-class', 'npm:babel-runtime@5.8.25/helpers/class-call-check', 'npm:babel-runtime@5.8.25/core-js/object/assign', 'npm:babel-runtime@5.8.25/core-js/get-iterator', 'npm:babel-runtime@5.8.25/core-js/array/from'], function (_export) {
  var _createClass, _classCallCheck, _Object$assign, _getIterator, _Array$from, DOM, $, dom;

  return {
    setters: [function (_npmBabelRuntime5825HelpersCreateClass) {
      _createClass = _npmBabelRuntime5825HelpersCreateClass['default'];
    }, function (_npmBabelRuntime5825HelpersClassCallCheck) {
      _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck['default'];
    }, function (_npmBabelRuntime5825CoreJsObjectAssign) {
      _Object$assign = _npmBabelRuntime5825CoreJsObjectAssign['default'];
    }, function (_npmBabelRuntime5825CoreJsGetIterator) {
      _getIterator = _npmBabelRuntime5825CoreJsGetIterator['default'];
    }, function (_npmBabelRuntime5825CoreJsArrayFrom) {
      _Array$from = _npmBabelRuntime5825CoreJsArrayFrom['default'];
    }],
    execute: function () {
      /**
       * dom class provides various utility methods on a document element.
       * @example
       * var $ = selector => new DOM(selector);
       */
      'use strict';

      DOM = (function () {
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
          _Object$assign(this, out);
          console.timeEnd('dom');
          return this;
        }

        _createClass(DOM, [{
          key: 'find',
          value: function find(selector, context) {}
        }, {
          key: 'clone',
          value: function clone() {}

          /**
           * @param {Function} callback A callback to call on each element
           */
        }, {
          key: 'each',
          value: function each(callback) {
            // convert this to Array to use for...of
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = _getIterator(_Array$from(this)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
          }

          /**
           * Add a class to selected elements
           * @param {String} className The class name to add
           */
        }, {
          key: 'addClass',
          value: function addClass(className) {
            return this.each(function () {
              if (this.classList) {
                this.classList.add(className);
              } else {
                this.className += ' ' + className;
              }
            });
          }

          /**
           * Remove a class from selected elements
           * @param {String} className The class name to remove
           */
        }, {
          key: 'removeClass',
          value: function removeClass(className) {
            return this.each(function () {
              this.classList.remove(className);
            });
          }

          /**
           * Check to see if the element has a class
           * (Note: Only checks the first elements if more than one is selected)
           * @param {String} className The class name to check
           */
        }, {
          key: 'hasClass',
          value: function hasClass(className) {
            if (this.classList) {
              return this.classList.contains(className);
            } else {
              return new RegExp('(^| )' + className + '( |$)', 'gi').test(this.className);
            }
          }
        }, {
          key: 'toggleClass',
          value: function toggleClass(className) {
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
          }
        }, {
          key: 'css',
          value: function css(prop, value) {
            if (value) {
              this.style[prop] = value;
              return this;
            } else if (prop) {
              return this.style[prop];
            } else {
              return this.style;
            }
          }
        }, {
          key: 'attr',
          value: function attr(name, value) {
            name = name.toLowerCase();

            if (value) {
              this.setAttribute(name, value);
              return this;
            } else {
              return this.getAttribute(name);
            }
          }
        }, {
          key: 'data',
          value: function data(name, value) {
            if (value) {
              this.setAttribute('data-' + name, value);
              return this;
            } else {
              return this.getAttribute('data-' + name);
            }
          }
        }, {
          key: 'on',
          value: function on(event, callback) {
            return this.each(function () {
              this.addEventListener(event, callback, false);
            });
          }
        }, {
          key: '_on',
          value: function _on(eventName, eventHandler) {
            eventType = eventType.split(' ');
            for (var i = 0; i < eventType.length; i++) {
              this.addEventListener(eventType[i], callback);
            }
            return this;
          }
        }, {
          key: 'off',
          value: function off(eventName, eventHandler) {
            this.removeEventListener(eventName, eventHandler);
          }
        }, {
          key: 'trigger',
          value: function trigger(eventName, eventData) {
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
          }
        }, {
          key: 'empty',
          value: function empty() {
            this.innerHTML = '';
            return this;
          }
        }, {
          key: 'html',
          value: function html(_html) {
            if (_html) {
              this.innerHTML = _html;
              return this;
            } else {
              return this.innerHTML;
            }
          }
        }, {
          key: 'text',
          value: function text(_text) {
            if (_text) {
              this.textContent = _text;
              return this;
            } else {
              return this.textContent;
            }
          }
        }, {
          key: 'next',
          value: function next() {
            return this.nextElementSibling;
          }
        }, {
          key: 'prev',
          value: function prev() {}
        }, {
          key: 'parent',
          value: function parent() {
            return this.parentNode;
          }
        }, {
          key: 'child',
          value: function child() {}
        }, {
          key: 'position',
          value: function position() {}
        }]);

        return DOM;
      })();

      _export('default', DOM);

      $ = function $(selector) {
        return new DOM(selector);
      };

      _export('$', $);

      dom = function dom(selector, context, undefined) {

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

      _export('default', dom);
    }
  };
});
System.register('src/js/utils', ['npm:babel-runtime@5.8.25/helpers/get', 'npm:babel-runtime@5.8.25/helpers/inherits', 'npm:babel-runtime@5.8.25/helpers/class-call-check', 'npm:babel-runtime@5.8.25/core-js/object/get-own-property-names', 'npm:babel-runtime@5.8.25/core-js/object/define-property', 'npm:babel-runtime@5.8.25/core-js/object/get-own-property-descriptor', 'npm:babel-runtime@5.8.25/core-js/object/get-own-property-symbols'], function (_export) {
  var _get, _inherits, _classCallCheck, _Object$getOwnPropertyNames, _Object$defineProperty, _Object$getOwnPropertyDescriptor, _Object$getOwnPropertySymbols, chars, aggregation;

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

    _Object$getOwnPropertyNames(source).forEach(function (name) {
      if (name !== 'constructor') {
        _Object$defineProperty(target, name, _Object$getOwnPropertyDescriptor(source, name));
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
  return {
    setters: [function (_npmBabelRuntime5825HelpersGet) {
      _get = _npmBabelRuntime5825HelpersGet['default'];
    }, function (_npmBabelRuntime5825HelpersInherits) {
      _inherits = _npmBabelRuntime5825HelpersInherits['default'];
    }, function (_npmBabelRuntime5825HelpersClassCallCheck) {
      _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck['default'];
    }, function (_npmBabelRuntime5825CoreJsObjectGetOwnPropertyNames) {
      _Object$getOwnPropertyNames = _npmBabelRuntime5825CoreJsObjectGetOwnPropertyNames['default'];
    }, function (_npmBabelRuntime5825CoreJsObjectDefineProperty) {
      _Object$defineProperty = _npmBabelRuntime5825CoreJsObjectDefineProperty['default'];
    }, function (_npmBabelRuntime5825CoreJsObjectGetOwnPropertyDescriptor) {
      _Object$getOwnPropertyDescriptor = _npmBabelRuntime5825CoreJsObjectGetOwnPropertyDescriptor['default'];
    }, function (_npmBabelRuntime5825CoreJsObjectGetOwnPropertySymbols) {
      _Object$getOwnPropertySymbols = _npmBabelRuntime5825CoreJsObjectGetOwnPropertySymbols['default'];
    }],
    execute: function () {
      'use strict';

      _export('resolveURL', resolveURL);

      _export('extend', extend);

      _export('extendDeep', extendDeep);

      _export('extendClass', extendClass);

      _export('type', type);

      _export('addMixin', addMixin);

      _export('debounce', debounce);

      _export('mixin', mixin);

      _export('mix', mix);

      _export('uuid', uuid);

      chars = ('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz').split('');
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

      aggregation = function aggregation(baseClass) {
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

            _get(Object.getPrototypeOf(_Combined.prototype), 'constructor', this).apply(this, args);
            mixins.forEach(function (mixin) {
              mixin.prototype.initializer.call(_this);
            });
          }

          return _Combined;
        })(baseClass);
        var copyProps = function copyProps(target, source) {
          _Object$getOwnPropertyNames(source).concat(_Object$getOwnPropertySymbols(source)).forEach(function (prop) {
            if (prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/)) {
              return;
            }

            _Object$defineProperty(target, prop, _Object$getOwnPropertyDescriptor(source, prop));
          });
        };
        mixins.forEach(function (mixin) {
          copyProps(base.prototype, mixin.prototype);
          copyProps(base, mixin);
        });
        return base;
      };

      _export('aggregation', aggregation);
    }
  };
});
System.register('src/js/log', ['npm:babel-runtime@5.8.25/helpers/create-class', 'npm:babel-runtime@5.8.25/helpers/class-call-check', 'src/js/base', 'src/js/dom'], function (_export) {
  var _createClass, _classCallCheck, BaseClass, dom, Logger;

  return {
    setters: [function (_npmBabelRuntime5825HelpersCreateClass) {
      _createClass = _npmBabelRuntime5825HelpersCreateClass['default'];
    }, function (_npmBabelRuntime5825HelpersClassCallCheck) {
      _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck['default'];
    }, function (_srcJsBase) {
      BaseClass = _srcJsBase['default'];
    }, function (_srcJsDom) {
      dom = _srcJsDom['default'];
    }],
    execute: function () {

      /**
       * Logger class provides customized logging to the console.
       * pxdb:http GET http://127.0.0.1:5984/default/ +0ms
       * pxdb:api default +28ms id
       * pxdb:api default +1ms id success 9FA8E5B5-FA51-9A95-901E-E6DD8D6D4B90
       */
      'use strict';

      Logger = (function () {
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
          this.options = dom.extend(defaults, options);
          return this;
        }

        _createClass(Logger, [{
          key: 'log',
          value: function log(level, args) {
            var timestamp = new Date().toLocaleString();
            var log = window.console ? window.console.log.bind(window.console) : function () {};
            log('[' + timestamp + '] [' + level + '] [' + this.category + ']', arguments);
          }
        }, {
          key: 'debug',
          value: function debug(args) {
            return this.log('DEBUG', args);
          }
        }, {
          key: 'info',
          value: function info(args) {
            return this.log('INFO', args);
          }
        }, {
          key: 'warn',
          value: function warn(args) {
            return this.log('WARN', args);
          }
        }, {
          key: 'error',
          value: function error(args) {
            return this.log('ERROR', args);
          }

          /**
           * Log a API method to the console.
           * @example
            logger.logApi('someMethod', {}, true);
            logger.logApi('someMethod', {}, false);
           * @param {String} method - The name of the method.
           * @param {Object} params - The params to log.
           */
        }, {
          key: 'logApi',
          value: function logApi(method, params, success) {
            if (!params) {
              params = {};
            }
            console.log('%c[%s:api] %s %o', success ? this.options.colors.success : this.options.colors.debug, this.category, method, params);
          }

          /**
           * Log a API method to the console.
           * @example
            logger.logHttp('GET', '/default', true);
            logger.logHttp('PUT', '/default', false);
           * @param {String} method - The name of the method.
           * @param {Object} params - The params to log.
           */
        }, {
          key: 'logHttp',
          value: function logHttp(method, url, success) {
            console.log('%c[%s:http] %c%s %c%o', success ? this.options.colors.success : this.options.colors.info, this.category, null, method, null, url);
          }
        }, {
          key: 'logTime',
          value: function logTime(name) {
            var start = new Date();
            return {
              end: function end() {
                return new Date().getMilliseconds() - start.getMilliseconds() + 'ms';
              }
            };
          }
        }]);

        return Logger;
      })();

      _export('default', Logger);
    }
  };
});
System.register('src/js/base', ['npm:babel-runtime@5.8.25/helpers/create-class', 'npm:babel-runtime@5.8.25/helpers/class-call-check', 'src/js/utils', 'src/js/log', 'src/js/pubsub', 'src/js/dom'], function (_export) {
  var _createClass, _classCallCheck, utils, Logger, PubSub, dom, BaseClass;

  return {
    setters: [function (_npmBabelRuntime5825HelpersCreateClass) {
      _createClass = _npmBabelRuntime5825HelpersCreateClass['default'];
    }, function (_npmBabelRuntime5825HelpersClassCallCheck) {
      _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck['default'];
    }, function (_srcJsUtils) {
      utils = _srcJsUtils;
    }, function (_srcJsLog) {
      Logger = _srcJsLog['default'];
    }, function (_srcJsPubsub) {
      PubSub = _srcJsPubsub['default'];
    }, function (_srcJsDom) {
      dom = _srcJsDom['default'];
    }],
    execute: function () {

      /**
       * BaseClass provides a Base for all custom classes.
       * @example
       * class MyClass extends BaseClass{
       *  constructor(name, options) {
       *    super(name, options);
       *  }
       * }
       */
      'use strict';

      BaseClass = (function () {
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
          this.log = new Logger(name, {
            colors: {
              debug: 'color:blue'
            }
          });

          this.mixin(new PubSub(name, options));
          this.mixin(options);
          return this;
        }

        _createClass(BaseClass, [{
          key: 'mixin',
          value: function mixin(klass) {
            this.utils.addMixin(klass, this);
          }
        }], [{
          key: 'extend',
          value: function extend(obj) {
            console.warn('Extend', obj, this);
            return dom.extend(this, obj);
          }
        }]);

        return BaseClass;
      })();

      _export('default', BaseClass);
    }
  };
});
System.register('src/js/HTTP', ['npm:babel-runtime@5.8.25/helpers/get', 'npm:babel-runtime@5.8.25/helpers/inherits', 'npm:babel-runtime@5.8.25/helpers/create-class', 'npm:babel-runtime@5.8.25/helpers/class-call-check', 'npm:babel-runtime@5.8.25/core-js/promise', 'src/js/base', 'src/js/log', 'src/js/interfaces'], function (_export) {
  var _get, _inherits, _createClass, _classCallCheck, _Promise, BaseClass, Logger, Interfaces, HTTP;

  return {
    setters: [function (_npmBabelRuntime5825HelpersGet) {
      _get = _npmBabelRuntime5825HelpersGet['default'];
    }, function (_npmBabelRuntime5825HelpersInherits) {
      _inherits = _npmBabelRuntime5825HelpersInherits['default'];
    }, function (_npmBabelRuntime5825HelpersCreateClass) {
      _createClass = _npmBabelRuntime5825HelpersCreateClass['default'];
    }, function (_npmBabelRuntime5825HelpersClassCallCheck) {
      _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck['default'];
    }, function (_npmBabelRuntime5825CoreJsPromise) {
      _Promise = _npmBabelRuntime5825CoreJsPromise['default'];
    }, function (_srcJsBase) {
      BaseClass = _srcJsBase['default'];
    }, function (_srcJsLog) {
      Logger = _srcJsLog['default'];
    }, function (_srcJsInterfaces) {
      Interfaces = _srcJsInterfaces['default'];
    }],
    execute: function () {
      /*globals Request, Promise*/

      /**
       * HTTP class provides an abstraction layer for HTTP calls.
       * @example
       * var $http = new px.mobile.HTTP('http1', {
       *  baseUrl: window.location.origin
       * });
       */
      'use strict';

      HTTP = (function (_BaseClass) {
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

          _get(Object.getPrototypeOf(HTTP.prototype), 'constructor', this).call(this, name, options);

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

        _createClass(HTTP, [{
          key: 'checkStatus',
          value: function checkStatus(response) {
            console.warn(response.status, response.statusText, response.url, response);
            if (response.status >= 200 && response.status < 300) {
              return response;
            } else {
              var error = new Error(response.statusText);
              error.response = response;
              return response;
            }
          }

          /**
           * I handle parsing the JSON of a response.
           * @param {Response} response A Response object
           * @return {Response} The original response with a data property that is the parsed JSON
           */
        }, {
          key: 'parseJSON',
          value: function parseJSON(response) {
            if (!response) {
              throw new Error('Must pass a response object to parseJSON!');
            }
            return response.json().then(function (json) {
              response.data = json;
              return response;
            });
          }

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
        }, {
          key: 'getJSON',
          value: function getJSON() {
            var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            var req = new Request(url, options || {
              method: 'GET'
            });
            return fetch(req).then(this.checkStatus).then(this.parseJSON);
          }

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
        }, {
          key: 'request',
          value: function request(url, options) {
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
            return new _Promise(function (resolve, reject) {
              return fetch(new Request(url, config)).then(function (resp) {
                _this.log.logHttp(resp.status + ' ' + benchmark.end(), resp, true);
                //return this.parseJSON(resp).then(resolve, reject);
                resp.data = {};
                resolve(resp);
              }, reject);
            });
          }

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
        }, {
          key: 'get',
          value: function get() {
            var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            this.log.logApi('get', options);
            return this.request(url, options).then(this.parseJSON);
          }

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
        }, {
          key: 'put',
          value: function put() {
            var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
            var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
            var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            this.log.logApi('put', data);
            return this.request(url, this.utils.extend({
              method: 'PUT',
              data: data
            }, options));
          }

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
        }, {
          key: 'post',
          value: function post() {
            var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
            var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
            var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            return this.request(url, this.utils.extend({
              method: 'POST',
              data: data
            }, options));
          }

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
        }, {
          key: 'delete',
          value: function _delete() {
            var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            return this.request(url, this.utils.extend({
              method: 'DELETE'
            }, options));
          }

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
        }, {
          key: 'head',
          value: function head() {
            var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            return this.request(url, this.utils.extend({
              method: 'HEAD'
            }, options));
          }
        }]);

        return HTTP;
      })(BaseClass);

      _export('default', HTTP);
    }
  };
});
System.register('src/js/model', ['npm:babel-runtime@5.8.25/helpers/get', 'npm:babel-runtime@5.8.25/helpers/inherits', 'npm:babel-runtime@5.8.25/helpers/create-class', 'npm:babel-runtime@5.8.25/helpers/class-call-check', 'src/js/base', 'src/js/HTTP', 'src/js/utils', 'src/js/log'], function (_export) {
  var _get, _inherits, _createClass, _classCallCheck, BaseClass, HTTP, utils, Logger, Model;

  return {
    setters: [function (_npmBabelRuntime5825HelpersGet) {
      _get = _npmBabelRuntime5825HelpersGet['default'];
    }, function (_npmBabelRuntime5825HelpersInherits) {
      _inherits = _npmBabelRuntime5825HelpersInherits['default'];
    }, function (_npmBabelRuntime5825HelpersCreateClass) {
      _createClass = _npmBabelRuntime5825HelpersCreateClass['default'];
    }, function (_npmBabelRuntime5825HelpersClassCallCheck) {
      _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck['default'];
    }, function (_srcJsBase) {
      BaseClass = _srcJsBase['default'];
    }, function (_srcJsHTTP) {
      HTTP = _srcJsHTTP['default'];
    }, function (_srcJsUtils) {
      utils = _srcJsUtils;
    }, function (_srcJsLog) {
      Logger = _srcJsLog['default'];
    }],
    execute: function () {

      /**
       * Model class provides event dispatching.
       * @example
       * var model = new Model();
       * @param {String} id - The id of the model.
       * @param {Object} options - Options for the model
       */
      'use strict';

      Model = (function (_BaseClass) {
        _inherits(Model, _BaseClass);

        function Model(id, options) {
          _classCallCheck(this, Model);

          id = id || utils.uuid();
          options = options || {};

          _get(Object.getPrototypeOf(Model.prototype), 'constructor', this).call(this, id, options);

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

        _createClass(Model, [{
          key: 'url',
          value: function url() {
            var url = '/' + encodeURIComponent(this.get(this.idField));
            var rev = this.get('_rev');
            if (rev) {
              url += '?rev=' + _rev;
            }
            return url;
          }
        }, {
          key: 'has',
          value: function has(attribute) {
            this.log.logApi('has', attribute);
            return this.data.hasOwnProperty(attribute);
          }
        }, {
          key: 'get',
          value: function get(attribute) {
            this.log.logApi('has', attribute);
            return this.data[attribute];
          }
        }, {
          key: 'set',
          value: function set(attributes) {
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
          }
        }, {
          key: 'toJSON',
          value: function toJSON() {
            console.warn('toJSON', this.data);
            return JSON.stringify(this.data);
          }
        }, {
          key: 'clone',
          value: function clone() {
            return new this.constructor(this.options);
          }
        }, {
          key: 'parse',
          value: function parse(resp) {
            console.warn('parse', resp);
            if (resp.ok && resp.data._id) {
              this.utils.extend(this.data, resp.data);
            }
            return resp;
          }
        }, {
          key: 'fetch',
          value: function fetch(options) {
            console.warn('fetch', options);
            return this.adapter.get(this.url()).then(this.parse);
          }
        }, {
          key: 'save',
          value: function save(options) {
            console.warn('save', options);
            return this.adapter.put('' + this.url(), this.data).then(this.parse);
          }
        }, {
          key: 'destroy',
          value: function destroy(options) {
            console.warn('destroy', this.data._rev);
            return this.adapter['delete']('' + this.url()).then(this.parse);
          }
        }, {
          key: 'sync',
          value: function sync(options) {
            console.warn('sync', options);
          }
        }], [{
          key: 'extend',
          value: function extend(obj) {
            return _get(Object.getPrototypeOf(Model), 'extend', this).call(this, this, obj);
          }
        }]);

        return Model;
      })(BaseClass);

      _export('default', Model);
    }
  };
});
System.register('src/js/collection', ['npm:babel-runtime@5.8.25/helpers/get', 'npm:babel-runtime@5.8.25/helpers/inherits', 'npm:babel-runtime@5.8.25/helpers/create-class', 'npm:babel-runtime@5.8.25/helpers/class-call-check', 'src/js/base', 'src/js/model', 'src/js/http', 'src/js/utils'], function (_export) {
  var _get, _inherits, _createClass, _classCallCheck, BaseClass, Model, HTTP, utils, defaults, Collection;

  return {
    setters: [function (_npmBabelRuntime5825HelpersGet) {
      _get = _npmBabelRuntime5825HelpersGet['default'];
    }, function (_npmBabelRuntime5825HelpersInherits) {
      _inherits = _npmBabelRuntime5825HelpersInherits['default'];
    }, function (_npmBabelRuntime5825HelpersCreateClass) {
      _createClass = _npmBabelRuntime5825HelpersCreateClass['default'];
    }, function (_npmBabelRuntime5825HelpersClassCallCheck) {
      _classCallCheck = _npmBabelRuntime5825HelpersClassCallCheck['default'];
    }, function (_srcJsBase) {
      BaseClass = _srcJsBase['default'];
    }, function (_srcJsModel) {
      Model = _srcJsModel['default'];
    }, function (_srcJsHttp) {
      HTTP = _srcJsHttp['default'];
    }, function (_srcJsUtils) {
      utils = _srcJsUtils;
    }],
    execute: function () {
      'use strict';

      defaults = {
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

      Collection = (function (_BaseClass) {
        _inherits(Collection, _BaseClass);

        _createClass(Collection, null, [{
          key: 'extend',
          value: function extend(obj) {
            console.warn('Extend', obj, this);
            return utils.addMixin(obj, this);
          }
        }]);

        function Collection(name) {
          var options = arguments.length <= 1 || arguments[1] === undefined ? defaults : arguments[1];

          _classCallCheck(this, Collection);

          _get(Object.getPrototypeOf(Collection.prototype), 'constructor', this).call(this, name, options);

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
          this.adapter = options.adapter || HTTP;
          this.adapter = new this.adapter(name, options);

          return this;
        }

        //Handle parsing the response from a fetch

        _createClass(Collection, [{
          key: 'parse',
          value: function parse(resp) {
            return resp;
          }

          //Add a model to the list of items.
        }, {
          key: 'add',
          value: function add(models) {
            return this.models.push(models);
          }

          //Handle sending another request.
        }, {
          key: 'fetch',
          value: function fetch(params) {
            var self = this;
            return self.adapter.get(params).then(function (resp) {
              self.lastResponse = resp;
              self.models = resp.data.rows;
              return resp;
            });
          }

          // TODO: remove(model) - Remove a model from the list of items.
        }, {
          key: 'remove',
          value: function remove(model) {
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
          }

          // TODO: where(filter) - Filter models based on filter passed.
        }, {
          key: 'where',
          value: function where(filter) {
            return this.models.filter(filter);
          }

          // TODO: findWhere(filter) - Filter and return first model by filter.
        }, {
          key: 'find',
          value: function find(filter) {
            return this.models.filter(filter);
          }

          // TODO: Return a model by id
        }, {
          key: 'get',
          value: function get(id) {}
        }, {
          key: 'toJSON',
          value: function toJSON() {
            return JSON.stringify(this.models);
          }
        }]);

        return Collection;
      })(BaseClass);

      _export('default', Collection);
    }
  };
});
System.register('src/js/main', ['src/js/utils', 'src/js/base', 'src/js/collection', 'src/js/app', 'src/js/core', 'src/js/dom', 'src/js/db', 'src/js/http', 'src/js/model', 'src/js/router', 'src/js/simple-router', 'src/js/page', 'src/js/pages', 'src/js/views', 'src/js/view', 'src/js/pubsub', 'src/js/interface', 'src/js/interfaces', 'src/js/log'], function (_export) {
  'use strict';
  // TODO: Vendor
  //require('../vendor/overthrow/overthrow')
  //require('../vendor/es6-shim')
  //require('../vendor/fetch')
  //require('../vendor/fastclick')
  var utils, BaseClass, Collection, App, Core, dom, $, DB, HTTP, Model, Router, SimpleRouter, Page, Pages, Views, View, PubSub, Interface, Interfaces, Logger, pxMobile;
  return {
    setters: [function (_srcJsUtils) {
      utils = _srcJsUtils;
    }, function (_srcJsBase) {
      BaseClass = _srcJsBase['default'];
    }, function (_srcJsCollection) {
      Collection = _srcJsCollection['default'];
    }, function (_srcJsApp) {
      App = _srcJsApp['default'];
    }, function (_srcJsCore) {
      Core = _srcJsCore['default'];
    }, function (_srcJsDom) {
      dom = _srcJsDom['default'];
      $ = _srcJsDom.$;
    }, function (_srcJsDb) {
      DB = _srcJsDb['default'];
    }, function (_srcJsHttp) {
      HTTP = _srcJsHttp['default'];
    }, function (_srcJsModel) {
      Model = _srcJsModel['default'];
    }, function (_srcJsRouter) {
      Router = _srcJsRouter['default'];
    }, function (_srcJsSimpleRouter) {
      SimpleRouter = _srcJsSimpleRouter['default'];
    }, function (_srcJsPage) {
      Page = _srcJsPage['default'];
    }, function (_srcJsPages) {
      Pages = _srcJsPages['default'];
    }, function (_srcJsViews) {
      Views = _srcJsViews['default'];
    }, function (_srcJsView) {
      View = _srcJsView['default'];
    }, function (_srcJsPubsub) {
      PubSub = _srcJsPubsub['default'];
    }, function (_srcJsInterface) {
      Interface = _srcJsInterface['default'];
    }, function (_srcJsInterfaces) {
      Interfaces = _srcJsInterfaces['default'];
    }, function (_srcJsLog) {
      Logger = _srcJsLog['default'];
    }],
    execute: function () {
      pxMobile = {
        version: 'es6',
        utils: utils,
        $: $,
        Logger: Logger,
        BaseClass: BaseClass,
        App: App,
        Core: Core,
        Collection: Collection,
        dom: dom,
        DB: DB,
        HTTP: HTTP,
        Model: Model,
        SimpleRouter: SimpleRouter,
        Router: Router,
        Page: Page,
        Pages: Pages,
        Views: Views,
        View: View,
        PubSub: PubSub,
        Interface: Interface,
        Interfaces: Interfaces
      };

      window.px = window.px || {};
      pxMobile.debug = true;
      pxMobile.behaviors = {};

      window.px.mobile = pxMobile;
      window.pxMobile = pxMobile;
    }
  };
});
//# sourceMappingURL=bundle.js.map