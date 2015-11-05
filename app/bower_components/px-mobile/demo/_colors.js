function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (undefined) {
jade_mixins["bg"] = jade_interp = function(name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<li" + (jade.cls(['background-color',name], [null,true])) + "><span>" + (jade.escape(null == (jade_interp = name) ? "" : jade_interp)) + "</span></li>");
};
buf.push("<div class=\"page-header\"><h2>Color Pallete</h2><!--p From neutrals to brights, each hue is chosen to fit into the overall visual language and promote a contemporary and vibrant user experience.--><p>The GE color palette represents an approachable and optimistic visual language. Because color is a strong part of its visual equity, Px incorporates these colors to help shape a welcoming, true-to-GE user experience.</p></div><div class=\"container full-width gutters\"><div class=\"col-12\"><div class=\"page-header\"><h3>App Brand Colors</h3></div><ul class=\"grid-container background-colors\">");
// iterate [ 'primary-color', 'chrome-color', 'default-color', 'positive-color', 'negative-color', 'color-alt', 'color-dark', 'color-light']
;(function(){
  var $$obj = [ 'primary-color', 'chrome-color', 'default-color', 'positive-color', 'negative-color', 'color-alt', 'color-dark', 'color-light'];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var val = $$obj[$index];

jade_mixins["bg"](val);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var val = $$obj[$index];

jade_mixins["bg"](val);
    }

  }
}).call(this);

buf.push("</ul><div class=\"page-header\"><h3>GE Brand Colors Regular</h3></div><ul class=\"grid-container background-colors\">");
// iterate [ 'gray', 'blue', 'orange', 'green', 'pink', 'brown', 'purple', 'yellow', 'red']
;(function(){
  var $$obj = [ 'gray', 'blue', 'orange', 'green', 'pink', 'brown', 'purple', 'yellow', 'red'];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var val = $$obj[$index];

jade_mixins["bg"](val);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var val = $$obj[$index];

jade_mixins["bg"](val);
    }

  }
}).call(this);

buf.push("</ul><div class=\"page-header\"><h3>GE Brand Colors Light</h3></div><ul class=\"grid-container background-colors\">");
// iterate [ 'gray-light', 'blue-light', 'orange-light', 'green-light', 'pink-light', 'brown-light', 'purple-light', 'yellow-light', 'red-light']
;(function(){
  var $$obj = [ 'gray-light', 'blue-light', 'orange-light', 'green-light', 'pink-light', 'brown-light', 'purple-light', 'yellow-light', 'red-light'];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var val = $$obj[$index];

jade_mixins["bg"](val);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var val = $$obj[$index];

jade_mixins["bg"](val);
    }

  }
}).call(this);

buf.push("</ul><div class=\"page-header\"><h3>GE Brand Colors Dark</h3></div><ul class=\"grid-container background-colors\">");
// iterate ['gray-dark', 'blue-dark', 'orange-dark', 'green-dark', 'pink-dark', 'brown-dark', 'purple-dark', 'yellow-dark', 'red-dark']
;(function(){
  var $$obj = ['gray-dark', 'blue-dark', 'orange-dark', 'green-dark', 'pink-dark', 'brown-dark', 'purple-dark', 'yellow-dark', 'red-dark'];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var val = $$obj[$index];

jade_mixins["bg"](val);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var val = $$obj[$index];

jade_mixins["bg"](val);
    }

  }
}).call(this);

buf.push("</ul><div class=\"page-header\"><h3>Monochromatic</h3></div><ul class=\"grid-container background-colors\">");
// iterate ['black', 'gray10', 'gray9', 'gray8', 'gray7', 'gray6', 'gray5', 'gray4', 'gray3', 'gray2', 'gray1', 'white']
;(function(){
  var $$obj = ['black', 'gray10', 'gray9', 'gray8', 'gray7', 'gray6', 'gray5', 'gray4', 'gray3', 'gray2', 'gray1', 'white'];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var val = $$obj[$index];

jade_mixins["bg"](val);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var val = $$obj[$index];

jade_mixins["bg"](val);
    }

  }
}).call(this);

buf.push("</ul><div class=\"page-header\"><h3>Primary and Selection</h3></div><ul class=\"grid-container background-colors\">");
// iterate ['primary', 'primary-hover', 'primary-pressed', 'select-default', 'select-hover', 'select-pressed']
;(function(){
  var $$obj = ['primary', 'primary-hover', 'primary-pressed', 'select-default', 'select-hover', 'select-pressed'];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var val = $$obj[$index];

jade_mixins["bg"](val);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var val = $$obj[$index];

jade_mixins["bg"](val);
    }

  }
}).call(this);

buf.push("</ul><div class=\"page-header\"><h3>Data Visualization Regular</h3></div><ul class=\"grid-container background-colors\">");
// iterate ['dv-gray', 'dv-blue', 'dv-orange', 'dv-green', 'dv-pink', 'dv-brown', 'dv-purple', 'dv-yellow', 'dv-red']
;(function(){
  var $$obj = ['dv-gray', 'dv-blue', 'dv-orange', 'dv-green', 'dv-pink', 'dv-brown', 'dv-purple', 'dv-yellow', 'dv-red'];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var val = $$obj[$index];

jade_mixins["bg"](val);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var val = $$obj[$index];

jade_mixins["bg"](val);
    }

  }
}).call(this);

buf.push("</ul><div class=\"page-header\"><h3>Data Visualization Light</h3></div><ul class=\"grid-container background-colors\">");
// iterate ['dv-light-gray', 'dv-light-blue', 'dv-light-orange', 'dv-light-green', 'dv-light-pink', 'dv-light-brown', 'dv-light-purple', 'dv-light-yellow', 'dv-light-red']
;(function(){
  var $$obj = ['dv-light-gray', 'dv-light-blue', 'dv-light-orange', 'dv-light-green', 'dv-light-pink', 'dv-light-brown', 'dv-light-purple', 'dv-light-yellow', 'dv-light-red'];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var val = $$obj[$index];

jade_mixins["bg"](val);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var val = $$obj[$index];

jade_mixins["bg"](val);
    }

  }
}).call(this);

buf.push("</ul><div class=\"page-header\"><h3>Data Visualization Dark</h3></div><ul class=\"grid-container background-colors\">");
// iterate ['dv-dark-gray', 'dv-dark-blue', 'dv-dark-orange', 'dv-dark-green', 'dv-dark-pink', 'dv-dark-brown', 'dv-dark-purple', 'dv-dark-yellow', 'dv-dark-red']
;(function(){
  var $$obj = ['dv-dark-gray', 'dv-dark-blue', 'dv-dark-orange', 'dv-dark-green', 'dv-dark-pink', 'dv-dark-brown', 'dv-dark-purple', 'dv-dark-yellow', 'dv-dark-red'];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var val = $$obj[$index];

jade_mixins["bg"](val);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var val = $$obj[$index];

jade_mixins["bg"](val);
    }

  }
}).call(this);

buf.push("</ul></div></div>");}.call(this,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
}