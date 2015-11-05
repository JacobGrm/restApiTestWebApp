/**
 * dom class provides various utility methods on a document element.
 * @example
 * var $ = selector => new DOM(selector);
 */
export default class DOM {


  constructor(selector, context) {
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
      el = (((context === undefined) ? document : context)[matches](selector.slice(1)));
      out = ((el.length < 2) ? el[0] : el);
      console.warn('found', el);
    } catch (err) {

      console.error('error', selector, 'not found');
    }



    this.length = el.length || 0;
    Object.assign(this, out);
    console.timeEnd('dom');
    return this;
  }

  find(selector, context) {

  }



  clone() {

    }
    /**
     * @param {Function} callback A callback to call on each element
     */
  each(callback) {
    // convert this to Array to use for...of
    for (let el of Array.from(this)) {
      callback.call(el);
    }
    return this;
  }

  /**
   * Add a class to selected elements
   * @param {String} className The class name to add
   */
  addClass(className) {
    return this.each(function() {
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
  removeClass(className) {
    return this.each(function() {
      this.classList.remove(className);
    });
  }

  /**
   * Check to see if the element has a class
   * (Note: Only checks the first elements if more than one is selected)
   * @param {String} className The class name to check
   */
  hasClass(className) {
    if (this.classList) {
      return this.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(this.className);
    }
  }

  toggleClass(className) {
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

  css(prop, value) {
    if (value) {
      this.style[prop] = value;
      return this;
    } else if (prop) {
      return this.style[prop];
    } else {
      return this.style;
    }
  }

  attr(name, value) {
    name = name.toLowerCase();

    if (value) {
      this.setAttribute(name, value);
      return this;
    } else {
      return this.getAttribute(name);
    }
  }

  data(name, value) {
    if (value) {
      this.setAttribute('data-' + name, value);
      return this;
    } else {
      return this.getAttribute('data-' + name);
    }
  }

  on(event, callback) {
    return this.each(function() {
      this.addEventListener(event, callback, false);
    });
  }

  _on(eventName, eventHandler) {
    eventType = eventType.split(' ');
    for (var i = 0; i < eventType.length; i++) {
      this.addEventListener(eventType[i], callback);
    }
    return this;
  }

  off(eventName, eventHandler) {
    this.removeEventListener(eventName, eventHandler);
  }

  trigger(eventName, eventData) {
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

  empty() {
    this.innerHTML = '';
    return this;
  }

  html(html) {
    if (html) {
      this.innerHTML = html;
      return this;
    } else {
      return this.innerHTML;
    }
  }

  text(text) {
    if (text) {
      this.textContent = text;
      return this;
    } else {
      return this.textContent;
    }
  }
  next() {
    return this.nextElementSibling;
  }
  prev() {

  }
  parent() {
    return this.parentNode;
  }
  child() {

  }
  position() {

  }
}

export var $ = selector => new DOM(selector);

var dom = function(selector, context, undefined) {


  var matches = {
    '#': 'getElementById',
    '.': 'getElementsByClassName',
    '@': 'getElementsByName',
    '=': 'getElementsByTagName',
    '*': 'querySelectorAll'
  }[selector[0]];

  //console.warn('dom()', matches, selector);
  var out = null,
    el;
  try {
    el = (((context === undefined) ? document : context)[matches](selector.slice(1)));
    out = ((el.length < 2) ? el[0] : el);
    //console.warn('found', el);
  } catch (err) {
    console.error('error', selector, 'not found');
  }

  return out;
};



// TODO: Extend Element on Window.

//dom('#iddiv').find('.inside')
window.Element.prototype.find = function(selector) {
  return dom(selector, this);
};

//dom(el).clone()
window.Element.prototype.clone = function() {
  return this.cloneNode(true);
};

//dom(el).hasClass(name)
window.Element.prototype.hasClass = function(className) {
  if (this.classList) {
    return this.classList.contains(className);
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(this.className);
  }
};

//dom(el).addClass(name)
window.Element.prototype.addClass = function(className) {
  if (this.classList) {
    this.classList.add(className);
  } else {
    this.className += ' ' + className;
  }
  return this;
};

//dom(el).removeClass(name)
window.Element.prototype.removeClass = function(className) {
  var el = this;
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
  return this;
};

//dom(el).toggleClass(name)
window.Element.prototype.toggleClass = function(className) {
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
window.Element.prototype.css = function(prop, value) {
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
window.Element.prototype.attr = function(name, value) {
  name = name.toLowerCase();

  if (value) {
    this.setAttribute(name, value);
    return this;
  } else {
    return this.getAttribute(name);
  }
};

window.Element.prototype.data = function(name, value) {
  if (value) {
    this.setAttribute('data-' + name, value);
    return this;
  } else {
    return this.getAttribute('data-' + name);
  }
};



window.Element.prototype.on = function(eventType, callback) {
  eventType = eventType.split(' ');
  for (var i = 0; i < eventType.length; i++) {
    this.addEventListener(eventType[i], callback);
  }
  return this;
};

//px.mobile.dom('#sandbox').off('click', handler);
window.Element.prototype.off = function(eventName, eventHandler) {
  this.removeEventListener(eventName, eventHandler);
};


//px.mobile.dom('#sandbox').trigger('custom-event', {name: 'value'});
window.Element.prototype.trigger = function(eventName, eventData) {
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
window.Element.prototype.empty = function() {
  this.innerHTML = '';
  return this;
};

//dom(el).html();
window.Element.prototype.html = function(html) {
  if (html) {
    this.innerHTML = html;
    return this;
  } else {
    return this.innerHTML;
  }
};

//dom(el).text();
window.Element.prototype.text = function(text) {
  if (text) {
    this.textContent = text;
    return this;
  } else {
    return this.textContent;
  }
};

//dom(el).next();
window.Element.prototype.next = function() {
  return this.nextElementSibling;
};

//dom(el).parent();
window.Element.prototype.parent = function() {
  return this.parentNode;
};

//dom(el).remove();
window.Element.prototype.remove = function() {
  return this.parentNode.removeChild(this);
};

window.Element.prototype.child = function() {
  return this.children;
};
//dom(el).position();
window.Element.prototype.position = function() {
  var pos = {
    left: this.offsetLeft,
    top: this.offsetTop
  };
  return pos;
};

// TODO: Extend nodelist

//dom().addClass('name');
window.NodeList.prototype.addClass = function(name) {
  this.each(function(el) {
    el.classList.add(name);
  });
  return this;
};

// $().removeClass('name');
window.NodeList.prototype.removeClass = function(name) {
  this.each(function(el) {
    el.classList.remove(name);
  });
  return this;
};


//dom.extend({}, objA, objB);
dom.extend = function(out) {
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


window.NodeList.prototype.attr = function(name, value) {
  this.each(function(el) {
    if (value) {
      el.setAttribute(name, value);
    } else {
      return el.getAttribute(name);
    }
  });
  return this;
};

window.NodeList.prototype.toggleClass = function(className) {
  this.each(function(el) {
    el.toggleClass(className);
  });
  return this;
};


window.NodeList.prototype.css = function(prop, value) {
  this.each(function(el) {
    el.css(prop, value);
  });
  return this;
};



window.NodeList.prototype.on = function(eventType, callback) {
  this.each(function(el) {
    el.on(eventType, callback);
  });
  return this;
};



window.NodeList.prototype.first = function() {
  return (this.length < 2) ? this : this[0];
};

window.NodeList.prototype.last = function() {
  // if there are many items, return the last
  return (this.length > 1) ? this[this.length - 1] : this;
};

export default dom;
