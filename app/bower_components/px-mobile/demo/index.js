function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (undefined) {








































jade_mixins["input"] = jade_interp = function(type, text){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<dt class=\"col-sm-2\"><label>" + (jade.escape(null == (jade_interp = text) ? "" : jade_interp)) + "</label></dt><dd class=\"col-sm-10\"><input" + (jade.attr("type", type, true, false)) + (jade.attr("placeholder", text, true, false)) + "/></dd>");
};
jade_mixins["bg"] = jade_interp = function(name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<li" + (jade.cls(['background-color','background-color-primary',name], [null,null,true])) + "><span>" + (jade.escape(null == (jade_interp = name) ? "" : jade_interp)) + "</span></li>");
};
jade_mixins["buttons"] = jade_interp = function(id){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var items = [];
for (jade_interp = 1; jade_interp < arguments.length; jade_interp++) {
  items.push(arguments[jade_interp]);
}
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<button" + (jade.cls([item], [true])) + ">" + (jade.escape(null == (jade_interp = item) ? "" : jade_interp)) + "</button>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<button" + (jade.cls([item], [true])) + ">" + (jade.escape(null == (jade_interp = item) ? "" : jade_interp)) + "</button>");
    }

  }
}).call(this);

};
jade_mixins["alert"] = jade_interp = function(type, text){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div" + (jade.cls(['alert',type], [null,true])) + ">" + (jade.escape(null == (jade_interp = text) ? "" : jade_interp)) + "</div>");
};




buf.push("<!DOCTYPE html><html class=\"pxm\"><head><meta charset=\"utf-8\"><meta name=\"description\" content=\"px-mobile usage docs\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><title>px-mobile</title><!-- Web Application Manifest--><!--link(rel='manifest', href='manifest.json')--><!-- Tile color for Win8--><meta name=\"msapplication-TileColor\" content=\"#333333\"><!-- Add to homescreen for Chrome on Android--><meta name=\"mobile-web-app-capable\" content=\"yes\"><meta name=\"application-name\" content=\"PSK\"><link rel=\"icon\" sizes=\"192x192\" href=\"images/icons/favicon-white-144px.png\"><!-- Add to homescreen for Safari on iOS--><meta name=\"apple-mobile-web-app-capable\" content=\"yes\"><meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\"><meta name=\"apple-mobile-web-app-title\" content=\"Px Mobile Starter Kit\"><link rel=\"apple-touch-icon\" href=\"images/icons/favicon-white-144px.png\"><!-- Tile icon for Win8 (144x144)--><meta name=\"msapplication-TileImage\" content=\"images/icons/favicon-white-144px.png\"><!-- build:css styles/main.css--><!--link(rel='stylesheet', href='styles/main.css')--><!-- endbuild--><!-- build:js bower_components/webcomponentsjs/webcomponents-lite.min.js--><!--script(src='bower_components/webcomponentsjs/webcomponents-lite.js')--><!-- endbuild--><!-- will be replaced with elements/elements.vulcanized.html--><!--link(rel='import', href='elements/elements.html')--><!-- endreplace-->\n<!--Dependencies--><!--script(src='../jspm_packages/system.js')--><!--script(src='../config.js')--><!--script(src='../dist/bundle.js')--><script src=\"../../webcomponentsjs/webcomponents.js\"></script><!--script(src='https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.13/webcomponents.min.js')--><!-- - For px-example component.--><script src=\"../../highlightjs/highlight.pack.min.js\"></script><link rel=\"stylesheet\" href=\"../../highlightjs/styles/github.css\"><link rel=\"import\" href=\"../../polymer/polymer.html\"><link rel=\"import\" href=\"../px-mobile.html\"><link rel=\"import\" href=\"../../dist/elements/pxm-example.html\"><link rel=\"import\" href=\"../px-mobile-theme.html\"><link rel=\"stylesheet\" href=\"docs.css\"><title>px-mobile demo</title></head><body class=\"docs\"><!--pxm-navbar(title='px-mobile', fixed)--><article class=\"container full-width\"><section class=\"col-12\"><article id=\"welcome\"><div class=\"hero container full-width\"><div class=\"col-12 text-center\"><h1>px-mobile<p>Build cross platform apps with HTML‚ CSS‚ and JS components.</p></h1><!--a.large.positive.block.btn(href='https://github.build.ge.com/PredixComponents/px-mobile/archive/develop.zip', target='_blank') \n\ti.fa.fa-file-archive-o\n\tspan Download px-mobile\n--></div></div><div class=\"container full-width gutters\"><div class=\"col-4 text-center\"><p class=\"no-padding text-center\"><i class=\"fa fa-4x fa-html5\"></i></p><h4 class=\"no-margin\">Web Components</h4><p>Piece together your application using web components.</p></div><div class=\"col-4 text-center\"><p class=\"no-padding\"><i class=\"fa fa-4x fa-file-code-o\"></i></p><h4 class=\"no-margin\">ES6 JavaScript</h4><p>Use the px-mobile.js library to power your application.</p></div><div class=\"col-4 text-center\"><p class=\"no-padding text-center\"><i class=\"fa fa-4x fa-cubes\"></i></p><h4 class=\"no-margin\">Extendable</h4><p>Create a custom build to modifiy style and function.</p></div><footer class=\"col-12\"></footer><!--.padding-20.text-center\n\tsmall \n\t\ta(href='#') Currently 1.0.0\n\t\ta(href='#') Issues\n\t\ta(href='#') Releases\n--><footer class=\"col-12\"><div class=\"padding-20 text-center\"><small>Copywrite 2015 &copy; GE\t\t</small></div></footer></div></article><hr><article id=\"getting-started\" class=\"col-12\">");




buf.push("<!DOCTYPE html><html class=\"pxm\"><head><meta charset=\"utf-8\"><meta name=\"description\" content=\"px-mobile usage docs\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><title>px-mobile</title><!-- Web Application Manifest--><!--link(rel='manifest', href='manifest.json')--><!-- Tile color for Win8--><meta name=\"msapplication-TileColor\" content=\"#333333\"><!-- Add to homescreen for Chrome on Android--><meta name=\"mobile-web-app-capable\" content=\"yes\"><meta name=\"application-name\" content=\"PSK\"><link rel=\"icon\" sizes=\"192x192\" href=\"images/icons/favicon-white-144px.png\"><!-- Add to homescreen for Safari on iOS--><meta name=\"apple-mobile-web-app-capable\" content=\"yes\"><meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\"><meta name=\"apple-mobile-web-app-title\" content=\"Px Mobile Starter Kit\"><link rel=\"apple-touch-icon\" href=\"images/icons/favicon-white-144px.png\"><!-- Tile icon for Win8 (144x144)--><meta name=\"msapplication-TileImage\" content=\"images/icons/favicon-white-144px.png\"><!-- build:css styles/main.css--><!--link(rel='stylesheet', href='styles/main.css')--><!-- endbuild--><!-- build:js bower_components/webcomponentsjs/webcomponents-lite.min.js--><!--script(src='bower_components/webcomponentsjs/webcomponents-lite.js')--><!-- endbuild--><!-- will be replaced with elements/elements.vulcanized.html--><!--link(rel='import', href='elements/elements.html')--><!-- endreplace-->\n<!--Dependencies--><!--script(src='../jspm_packages/system.js')--><!--script(src='../config.js')--><!--script(src='../dist/bundle.js')--><script src=\"../../webcomponentsjs/webcomponents.js\"></script><!--script(src='https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.13/webcomponents.min.js')--><!-- - For px-example component.--><script src=\"../../highlightjs/highlight.pack.min.js\"></script><link rel=\"stylesheet\" href=\"../../highlightjs/styles/github.css\"><link rel=\"import\" href=\"../../polymer/polymer.html\"><link rel=\"import\" href=\"../px-mobile.html\"><link rel=\"import\" href=\"../../dist/elements/pxm-example.html\"><link rel=\"import\" href=\"../px-mobile-theme.html\"><link rel=\"stylesheet\" href=\"docs.css\"><title>px-mobile demo</title></head><body class=\"docs\"><!--pxm-navbar(title='px-mobile', fixed)--><article class=\"container full-width\"><section class=\"col-12\"><div class=\"hero container full-width\"><div class=\"col-12 text-center\"><h1>Getting Started</h1><p>Once you download px-mobile, here's what you need to do next.</p></div></div><div class=\"container full-width gutters\"><div class=\"col-12\"><h2>Quick Start</h2><p>Here are is a few easy ways to quickly get started, each one appealing to a different skill level and use case. Read through to see what suits your particular needs.</p><h3>Install with Bower</h3><p>Use bower to simplify the installation process, open the terminal and execute the following:</p><pre>$ bower install https://github.build.ge.com/PredixComponents/px-mobile.git --save</pre></div></div></section></article><script>HTMLImports.whenReady(function(){\n  hljs.configure({\n    tabReplace: '  '\n  })\n  hljs.initHighlightingOnLoad()\n})</script></body></html></article><hr><article id=\"css\" class=\"col-12\">");
jade_mixins["input"] = jade_interp = function(type, text){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<dt class=\"col-sm-2\"><label>" + (jade.escape(null == (jade_interp = text) ? "" : jade_interp)) + "</label></dt><dd class=\"col-sm-10\"><input" + (jade.attr("type", type, true, true)) + (jade.attr("placeholder", text, true, true)) + "></dd>");
};
jade_mixins["bg"] = jade_interp = function(name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<li" + (jade.cls(['background-color','background-color-primary',name], [null,null,true])) + "><span>" + (jade.escape(null == (jade_interp = name) ? "" : jade_interp)) + "</span></li>");
};
jade_mixins["buttons"] = jade_interp = function(id){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var items = [];
for (jade_interp = 1; jade_interp < arguments.length; jade_interp++) {
  items.push(arguments[jade_interp]);
}
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<button" + (jade.cls([item], [true])) + ">" + (jade.escape(null == (jade_interp = item) ? "" : jade_interp)) + "</button>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<button" + (jade.cls([item], [true])) + ">" + (jade.escape(null == (jade_interp = item) ? "" : jade_interp)) + "</button>");
    }

  }
}).call(this);

};
jade_mixins["alert"] = jade_interp = function(type, text){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div" + (jade.cls(['alert',type], [null,true])) + ">" + (jade.escape(null == (jade_interp = text) ? "" : jade_interp)) + "</div>");
};




buf.push("<!DOCTYPE html><html class=\"pxm\"><head><meta charset=\"utf-8\"><meta name=\"description\" content=\"px-mobile usage docs\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><title>px-mobile</title><!-- Web Application Manifest--><!--link(rel='manifest', href='manifest.json')--><!-- Tile color for Win8--><meta name=\"msapplication-TileColor\" content=\"#333333\"><!-- Add to homescreen for Chrome on Android--><meta name=\"mobile-web-app-capable\" content=\"yes\"><meta name=\"application-name\" content=\"PSK\"><link rel=\"icon\" sizes=\"192x192\" href=\"images/icons/favicon-white-144px.png\"><!-- Add to homescreen for Safari on iOS--><meta name=\"apple-mobile-web-app-capable\" content=\"yes\"><meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\"><meta name=\"apple-mobile-web-app-title\" content=\"Px Mobile Starter Kit\"><link rel=\"apple-touch-icon\" href=\"images/icons/favicon-white-144px.png\"><!-- Tile icon for Win8 (144x144)--><meta name=\"msapplication-TileImage\" content=\"images/icons/favicon-white-144px.png\"><!-- build:css styles/main.css--><!--link(rel='stylesheet', href='styles/main.css')--><!-- endbuild--><!-- build:js bower_components/webcomponentsjs/webcomponents-lite.min.js--><!--script(src='bower_components/webcomponentsjs/webcomponents-lite.js')--><!-- endbuild--><!-- will be replaced with elements/elements.vulcanized.html--><!--link(rel='import', href='elements/elements.html')--><!-- endreplace-->\n<!--Dependencies--><!--script(src='../jspm_packages/system.js')--><!--script(src='../config.js')--><!--script(src='../dist/bundle.js')--><script src=\"../../webcomponentsjs/webcomponents.js\"></script><!--script(src='https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.13/webcomponents.min.js')--><!-- - For px-example component.--><script src=\"../../highlightjs/highlight.pack.min.js\"></script><link rel=\"stylesheet\" href=\"../../highlightjs/styles/github.css\"><link rel=\"import\" href=\"../../polymer/polymer.html\"><link rel=\"import\" href=\"../px-mobile.html\"><link rel=\"import\" href=\"../../dist/elements/pxm-example.html\"><link rel=\"import\" href=\"../px-mobile-theme.html\"><link rel=\"stylesheet\" href=\"docs.css\"><title>px-mobile demo</title></head><body class=\"docs\"><!--pxm-navbar(title='px-mobile', fixed)--><article class=\"container full-width\"><section class=\"col-12\"><div class=\"hero container full-width\"><div class=\"col-sm-12 text-center\"><h1>UI Elements</h1><p>Individual pieces of a consistent visual language used to represent user friendly interfaces</p><!--p HTML elements enhanced with extensible classes, and an advanced Flexbox grid system.--></div></div><div class=\"container full-width gutters\"><div class=\"col-12\">");
jade_mixins["alert"] = jade_interp = function(type, text){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div" + (jade.cls(['alert',type], [null,true])) + ">" + (jade.escape(null == (jade_interp = text) ? "" : jade_interp)) + "</div>");
};
buf.push("<div class=\"page-header\"><h2>Alerts</h2></div><section><pxm-example>");
jade_mixins["alert"](null, 'This is a unstyled alert.');
jade_mixins["alert"]('warn', 'This is a warn alert.');
jade_mixins["alert"]('success', 'This is a success alert.');
jade_mixins["alert"]('error', 'This is a error alert.');
jade_mixins["alert"]('info', 'This is a info alert.');
buf.push("</pxm-example></section>");
jade_mixins["buttons"] = jade_interp = function(id){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var items = [];
for (jade_interp = 1; jade_interp < arguments.length; jade_interp++) {
  items.push(arguments[jade_interp]);
}
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<button" + (jade.cls([item], [true])) + ">" + (jade.escape(null == (jade_interp = item) ? "" : jade_interp)) + "</button>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<button" + (jade.cls([item], [true])) + ">" + (jade.escape(null == (jade_interp = item) ? "" : jade_interp)) + "</button>");
    }

  }
}).call(this);

};
buf.push("<div class=\"page-header\"><h2>Buttons</h2><p>Buttons are available in four sizes and in a variety of priority indications. Depending on the use case a button with the right emphasis can be chosen.</p></div><div id=\"buttons\" class=\"container full-width gutters-sm\"><div class=\"col-md-6 demo\"><div class=\"page-header\"><h3>Small Buttons</h3></div><pxm-example>");
jade_mixins["buttons"]('small-buttons', 'primary small',  'secondary small', 'positive small', 'negative small', 'default small', 'disabled small');
buf.push("</pxm-example></div><div class=\"col-md-6 demo\"><div class=\"page-header\"><h3>Regular Buttons</h3></div><pxm-example>");
jade_mixins["buttons"]('basic-buttons', 'primary',  'secondary', 'positive', 'negative', 'default', 'disabled');
buf.push("</pxm-example></div><div class=\"col-md-6 demo\"><div class=\"page-header\"><h3>Large Buttons</h3></div><pxm-example>");
jade_mixins["buttons"]('large-buttons', 'primary large',  'secondary large', 'positive large', 'negative large', 'default large', 'disabled large');
buf.push("</pxm-example></div><div class=\"col-md-6 demo\"><div class=\"page-header\"><h3>Outline Buttons</h3></div><pxm-example>");
jade_mixins["buttons"]('outline-buttons', 'primary outline', 'secondary outline', 'positive outline', 'negative outline', 'default outline', 'disabled outline');
buf.push("</pxm-example></div><div class=\"col-md-6 demo\"><div class=\"page-header\"><h3>Buttons with Icons</h3></div><pxm-example><button class=\"primary\"><i class=\"fa fa-lg fa-search\"></i></button><button><i class=\"fa fa-lg fa-user\"></i></button><button class=\"secondary\"><i class=\"fa fa-lg fa-edit\"></i></button><button class=\"positive\"><i class=\"fa fa-lg fa-check\"></i></button><button class=\"negative\"><i class=\"fa fa-lg fa-times\"></i></button></pxm-example></div><div class=\"col-md-6\"><div class=\"page-header\"><h3>Button Groups</h3></div><pxm-example><section class=\"btn-group\">");
jade_mixins["buttons"]('group-buttons', 'primary', 'secondary', 'positive', 'negative', 'default', 'disabled');
buf.push("</section></pxm-example></div><div class=\"col-md-6\"><div class=\"page-header\"><h3>Block Buttons</h3></div><pxm-example>");
jade_mixins["buttons"]('block-buttons', 'primary block', 'secondary block', 'positive block', 'negative block', 'default block', 'disabled block');
buf.push("</pxm-example></div><div class=\"col-md-6\"><div class=\"page-header\"><h3>Block Outline Buttons</h3></div><pxm-example>");
jade_mixins["buttons"]('outlined-block-buttons',  'primary block outline', 'secondary block outline', 'positive block outline', 'negative block outline', 'default block outline', 'disabled block outline');
buf.push("</pxm-example></div></div>");
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

buf.push("</ul></div></div>");
jade_mixins["input"] = jade_interp = function(type, text){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<dt class=\"col-sm-2\"><label>" + (jade.escape(null == (jade_interp = text) ? "" : jade_interp)) + "</label></dt><dd class=\"col-sm-10\"><input" + (jade.attr("type", type, true, true)) + (jade.attr("placeholder", text, true, true)) + "></dd>");
};
buf.push("<div class=\"page-header\"><h2>Forms</h2></div><h3>Basic Form</h3><pxm-example><form><input type=\"text\" placeholder=\"Full name\"><input type=\"email\" placeholder=\"Email\"><input type=\"text\" placeholder=\"Success\" class=\"success\"><input type=\"email\" placeholder=\"Error\" class=\"error\"><input type=\"password\" placeholder=\"Warning\" class=\"warning\"><textarea rows=\"5\"></textarea><button class=\"button block\">Reset</button><button class=\"button block primary\">Submit</button></form></pxm-example><h3>Responsive Forms</h3><pxm-example><form><dl class=\"container\">");
jade_mixins["input"]('email', 'Email');
jade_mixins["input"].call({
block: function(){
buf.push("       ");
}
}, 'password', 'Password');
jade_mixins["input"]('tel', 'Telephone');
jade_mixins["input"]('date', 'Date');
jade_mixins["input"]('datetime', 'Date Time');
jade_mixins["input"]('datetime-local', 'Date Time Local');
jade_mixins["input"]('month', 'Month');
jade_mixins["input"]('week', 'Week');
jade_mixins["input"]('time', 'Time');
jade_mixins["input"]('url', 'URL');
jade_mixins["input"]('color', 'Color');
jade_mixins["input"]('file', 'File');
jade_mixins["input"].call({
attributes: {"checkbox": true,"Checkbox": true,"class": "switch"}
});
jade_mixins["input"].call({
attributes: {"radio": true,"Radio": true,"class": "switch"}
});
jade_mixins["input"]('number', 'Number');
buf.push("<dt class=\"col-sm-2\"><label>Select</label></dt><dd class=\"col-sm-10\"><select><option>Option 1</option><option>Option 2</option><option>Option 3</option><option>Option 4</option><option>Option 5</option></select></dd><dt class=\"col-sm-2\"><label>Select Multi</label></dt><dd class=\"col-sm-10\"><select multiple><option>Option 1</option><option>Option 2</option><option>Option 3</option><option>Option 4</option><option>Option 5</option></select></dd></dl><button class=\"button block primary\">Submit</button></form></pxm-example><div class=\"page-header\"><h2>Flexbox Grids</h2></div><pxm-example class=\"cheatsheet\"><div class=\"grid\"><div>Full</div></div><div class=\"grid\"><div>1/2</div><div>1/2</div></div><div class=\"grid\"><div>1/3</div><div>1/3</div><div>1/3</div></div><div class=\"grid\"><div>1/4</div><div>1/4</div><div>1/4</div><div>1/4</div></div></pxm-example><div class=\"page-header\"><h3>Grids with Gutters</h3></div><pxm-example class=\"cheatsheet\"><div class=\"grid gutters\"><div>Full</div></div><div class=\"grid gutters\"><div>1/2</div><div>1/2</div></div><div class=\"grid gutters\"><div>1/3</div><div>1/3</div><div>1/3</div></div><div class=\"grid gutters\"><div>1/4</div><div>1/4</div><div>1/4</div><div>1/4</div></div></pxm-example><div class=\"page-header\"><h3>Top Aligned Grid Cells</h3></div><pxm-example class=\"cheatsheet\"><div class=\"grid align-top\"><div>1/3</div><div> <p>Pellentesque sagittis vel erat ac laoreet. Phasellus ac aliquet enim, eu aliquet sem. </p></div><div>1/3</div></div></pxm-example><div class=\"page-header\"><h3>Bottom Aligned Grid Cells</h3></div><pxm-example class=\"cheatsheet\"><div class=\"grid align-bottom\"><div>1/3</div><div> <p>Pellentesque sagittis vel erat ac laoreet. Phasellus ac aliquet enim, eu aliquet sem. </p></div><div>1/3</div></div></pxm-example><div class=\"page-header\"><h3>Vertically Centered Grid Cells</h3></div><pxm-example class=\"cheatsheet\"><div class=\"grid align-center\"><div>1/3</div><div> <p>Pellentesque sagittis vel erat ac laoreet. Phasellus ac aliquet enim, eu aliquet sem. </p></div><div>1/3</div></div></pxm-example><div class=\"page-header\"><h3>Mixed Vertical Alignment</h3></div><pxm-example class=\"cheatsheet\"><div class=\"grid\"><div class=\"align-top\"><p>This should be top-aligned.</p></div><div> <p>This is default aligned. Pellentesque sagittis vel erat ac laoreet. Phasellus ac aliquet enim, eu aliquet sem. Lorem ipsum dolor sit amet,Pellentesque sagittis vel erat ac laoreet. Phasellus ac aliquet enim, eu aliquet sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porta leo, eu ultricies nunc sollicitudin vitae.</p></div><div class=\"align-center\"><p>This should be center-aligned.</p></div><div class=\"align-bottom\"> <p>This should be bottom-aligned.</p></div></div></pxm-example><div class=\"page-header\"><h2>12 Grid System</h2></div><div class=\"container full-width\"><div class=\"cheatsheet column\"><div class=\"demo\"><pxm-example><section class=\"container full-width gutters\"><!-- TODO: col 1 x 12--><div class=\"col-1\"></div><div class=\"col-1\"></div><div class=\"col-1\"></div><div class=\"col-1\"></div><div class=\"col-1\"></div><div class=\"col-1\"></div><div class=\"col-1\"></div><div class=\"col-1\"></div><div class=\"col-1\"></div><div class=\"col-1\"></div><div class=\"col-1\"></div><div class=\"col-1\"></div><!-- TODO: col 2 x 6--><div class=\"col-2\"></div><div class=\"col-2\"></div><div class=\"col-2\"></div><div class=\"col-2\"></div><div class=\"col-2\"></div><div class=\"col-2\"></div><!-- TODO: col 3 x 4--><div class=\"col-3\"></div><div class=\"col-3\"></div><div class=\"col-3\"></div><div class=\"col-3\"></div><!-- TODO: col 4 x 3--><div class=\"col-4\"></div><div class=\"col-4\"></div><div class=\"col-4\"></div><!-- TODO: col 6 x 2--><div class=\"col-6\"></div><div class=\"col-6\"></div><!-- TODO: col 12 x 1--><div class=\"col-12\"></div></section></pxm-example></div></div></div><div class=\"page-header\"><h3>Mobile, Tablet, Desktop Grid</h3></div><div class=\"cheatsheet column\"><div class=\"demo\"><pxm-example><section class=\"container full-width gutters\"><div class=\"col-sm-2\"></div><div class=\"col-sm-10\"></div><div class=\"col-sm-3\"></div><div class=\"col-sm-9\"></div><div class=\"col-sm-4\"></div><div class=\"col-sm-8\"></div><div class=\"col-sm-6\"></div><div class=\"col-sm-6\"></div></section></pxm-example></div></div>");
jade_mixins["bg"] = jade_interp = function(name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<li" + (jade.cls(['background-color','background-color-primary',name], [null,null,true])) + "><span>" + (jade.escape(null == (jade_interp = name) ? "" : jade_interp)) + "</span></li>");
};
buf.push("<div class=\"page-header\"><h2>Typography</h2></div><pxm-example><h1>Heading Size 1</h1><h2>Heading Size 2</h2><h3>Heading Size 3</h3><h4>Heading Size 4</h4><h5>Heading Size 5</h5><h6>Heading Size 6</h6></pxm-example><!--h1 h1. pxMobile\n  small Secondary text\nh2 h2. pxMobile\n  small Secondary text\nh3 h3. pxMobile\n  small Secondary text\nh4 h4. pxMobile\n  small Secondary text\nh5 h5. pxMobile\n  small Secondary text\nh6 h6. pxMobile\n  small Secondary text\n\np Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n--><div class=\"page-header\"><h2>Utility Classes<small>An extensive list of small utility classes</small></h2></div><div class=\"page-header\"><h3>Test Alignment<small>Text alignment helpers</small></h3></div><pxm-example><p class=\"text-left\">Left aligned text.</p><p class=\"text-center\">Center aligned text.</p><p class=\"text-right\">Right aligned text.</p><p class=\"text-justify\">Justified text.</p><p class=\"text-nowrap\">Nowrap text.</p></pxm-example><div class=\"page-header\"><h3>Text Transform</h3></div><pxm-example><p class=\"text-uppercase\">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p><p class=\"text-lowercase\">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p><p class=\"text-capitalize\">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p></pxm-example><div class=\"page-header\"><h3>Font Color</h3></div><pxm-example>");
// iterate ['primary', 'alt', 'dark', 'light', 'green', 'red', 'blue', 'yellow', 'white']
;(function(){
  var $$obj = ['primary', 'alt', 'dark', 'light', 'green', 'red', 'blue', 'yellow', 'white'];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var val = $$obj[$index];

buf.push("<p" + (jade.cls(['color-'+val], [true])) + ">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var val = $$obj[$index];

buf.push("<p" + (jade.cls(['color-'+val], [true])) + ">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>");
    }

  }
}).call(this);

buf.push("</pxm-example><div class=\"page-header\"><h3>Font Weight</h3></div><pxm-example> ");
// iterate ['normal', 'italic', 'oblique', 'bold', 'bolder', 'lighter']
;(function(){
  var $$obj = ['normal', 'italic', 'oblique', 'bold', 'bolder', 'lighter'];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var val = $$obj[$index];

buf.push("<p" + (jade.cls(['font-'+val], [true])) + ">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var val = $$obj[$index];

buf.push("<p" + (jade.cls(['font-'+val], [true])) + ">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>");
    }

  }
}).call(this);

buf.push("</pxm-example><div class=\"page-header\"><h3>Margin</h3></div><div class=\"page-header\"><h3>Padding</h3></div><div class=\"page-header\"><h3>Display</h3></div><div class=\"page-header\"><h3>Overflow</h3></div><div class=\"page-header\"><h3>Transition</h3><ul class=\"grid-container background-colors\">");
// iterate [ 'transition-background transition-normal hover-background-color-green', 'transition-background transition-slow hover-background-color-green', 'transition-background transition-slow-2x hover-background-color-green', 'transition-background transition-fast hover-background-color-green']
;(function(){
  var $$obj = [ 'transition-background transition-normal hover-background-color-green', 'transition-background transition-slow hover-background-color-green', 'transition-background transition-slow-2x hover-background-color-green', 'transition-background transition-fast hover-background-color-green'];
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

buf.push("</ul></div><div class=\"page-header\"><h3>Scroll</h3></div><div class=\"page-header\"><h3>Floats</h3></div><div class=\"page-header\"><h3>Opacity</h3><ul class=\"grid-container background-colors\">");
// iterate [ 'hover-opacity-0', 'hover-opacity-25', 'hover-opacity-50', 'hover-opacity-75', 'hover-opacity-100']
;(function(){
  var $$obj = [ 'hover-opacity-0', 'hover-opacity-25', 'hover-opacity-50', 'hover-opacity-75', 'hover-opacity-100'];
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

buf.push("</ul></div><div class=\"page-header\"><h3>Scale</h3><ul class=\"grid-container background-colors\">");
// iterate [ 'hover-scale-0', 'hover-scale-25', 'hover-scale-50', 'hover-scale-75', 'hover-scale-100', 'hover-scale-105']
;(function(){
  var $$obj = [ 'hover-scale-0', 'hover-scale-25', 'hover-scale-50', 'hover-scale-75', 'hover-scale-100', 'hover-scale-105'];
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

buf.push("</ul></div><div class=\"page-header\"><h3>Cursors</h3></div><table><tr> <th>Class</th><th>Example</th></tr><tbody>");
// iterate ['pointer', 'default', 'auto', 'none', 'not-allowed', 'help', 'no-drop', 'progress', 'cell', 'wait', 'text', 'copy', 'move','col-resize', 'context-menu','row-resize', 'n-resize', 'e-resize', 's-resize',' w-resize', 'grab', 'grabbing', 'zoom-in', 'zoom-out']
;(function(){
  var $$obj = ['pointer', 'default', 'auto', 'none', 'not-allowed', 'help', 'no-drop', 'progress', 'cell', 'wait', 'text', 'copy', 'move','col-resize', 'context-menu','row-resize', 'n-resize', 'e-resize', 's-resize',' w-resize', 'grab', 'grabbing', 'zoom-in', 'zoom-out'];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var val = $$obj[$index];

buf.push("<tr><td><code class=\"color-alt\">" + (jade.escape(null == (jade_interp = val) ? "" : jade_interp)) + "</code></td><td" + (jade.cls(['padding-5','cursor-'+val], [null,true])) + "></td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var val = $$obj[$index];

buf.push("<tr><td><code class=\"color-alt\">" + (jade.escape(null == (jade_interp = val) ? "" : jade_interp)) + "</code></td><td" + (jade.cls(['padding-5','cursor-'+val], [null,true])) + "></td></tr>");
    }

  }
}).call(this);

buf.push("</tbody></table></div></div></section></article><script>HTMLImports.whenReady(function(){\n  hljs.configure({\n    tabReplace: '  '\n  })\n  hljs.initHighlightingOnLoad()\n})</script></body></html></article><hr><article id=\"components\" class=\"col-12\">");








































jade_mixins["input"] = jade_interp = function(type, text){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<dt class=\"col-sm-2\"><label>" + (jade.escape(null == (jade_interp = text) ? "" : jade_interp)) + "</label></dt><dd class=\"col-sm-10\"><input" + (jade.attr("type", type, true, true)) + (jade.attr("placeholder", text, true, true)) + "></dd>");
};
jade_mixins["bg"] = jade_interp = function(name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<li" + (jade.cls(['background-color','background-color-primary',name], [null,null,true])) + "><span>" + (jade.escape(null == (jade_interp = name) ? "" : jade_interp)) + "</span></li>");
};
jade_mixins["buttons"] = jade_interp = function(id){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var items = [];
for (jade_interp = 1; jade_interp < arguments.length; jade_interp++) {
  items.push(arguments[jade_interp]);
}
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<button" + (jade.cls([item], [true])) + ">" + (jade.escape(null == (jade_interp = item) ? "" : jade_interp)) + "</button>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<button" + (jade.cls([item], [true])) + ">" + (jade.escape(null == (jade_interp = item) ? "" : jade_interp)) + "</button>");
    }

  }
}).call(this);

};
jade_mixins["alert"] = jade_interp = function(type, text){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div" + (jade.cls(['alert',type], [null,true])) + ">" + (jade.escape(null == (jade_interp = text) ? "" : jade_interp)) + "</div>");
};




buf.push("<!DOCTYPE html><html class=\"pxm\"><head><meta charset=\"utf-8\"><meta name=\"description\" content=\"px-mobile usage docs\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><title>px-mobile</title><!-- Web Application Manifest--><!--link(rel='manifest', href='manifest.json')--><!-- Tile color for Win8--><meta name=\"msapplication-TileColor\" content=\"#333333\"><!-- Add to homescreen for Chrome on Android--><meta name=\"mobile-web-app-capable\" content=\"yes\"><meta name=\"application-name\" content=\"PSK\"><link rel=\"icon\" sizes=\"192x192\" href=\"images/icons/favicon-white-144px.png\"><!-- Add to homescreen for Safari on iOS--><meta name=\"apple-mobile-web-app-capable\" content=\"yes\"><meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\"><meta name=\"apple-mobile-web-app-title\" content=\"Px Mobile Starter Kit\"><link rel=\"apple-touch-icon\" href=\"images/icons/favicon-white-144px.png\"><!-- Tile icon for Win8 (144x144)--><meta name=\"msapplication-TileImage\" content=\"images/icons/favicon-white-144px.png\"><!-- build:css styles/main.css--><!--link(rel='stylesheet', href='styles/main.css')--><!-- endbuild--><!-- build:js bower_components/webcomponentsjs/webcomponents-lite.min.js--><!--script(src='bower_components/webcomponentsjs/webcomponents-lite.js')--><!-- endbuild--><!-- will be replaced with elements/elements.vulcanized.html--><!--link(rel='import', href='elements/elements.html')--><!-- endreplace-->\n<!--Dependencies--><!--script(src='../jspm_packages/system.js')--><!--script(src='../config.js')--><!--script(src='../dist/bundle.js')--><script src=\"../../webcomponentsjs/webcomponents.js\"></script><!--script(src='https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.13/webcomponents.min.js')--><!-- - For px-example component.--><script src=\"../../highlightjs/highlight.pack.min.js\"></script><link rel=\"stylesheet\" href=\"../../highlightjs/styles/github.css\"><link rel=\"import\" href=\"../../polymer/polymer.html\"><link rel=\"import\" href=\"../px-mobile.html\"><link rel=\"import\" href=\"../../dist/elements/pxm-example.html\"><link rel=\"import\" href=\"../px-mobile-theme.html\"><link rel=\"stylesheet\" href=\"docs.css\"><title>px-mobile demo</title></head><body class=\"docs\"><!--pxm-navbar(title='px-mobile', fixed)--><article class=\"container full-width\"><section class=\"col-12\"><div class=\"hero container full-width\"><div class=\"col-12 text-center\"><h1>UI Components</h1><!--p Web Components that serve as basic building blocks.--><p>Basic building blocks that use the Predix design system</p></div></div><!--.col-4\n  p.padding-25.text-center\n    i.fa.fa-4x.fa-cubes\n  --><div class=\"container full-width gutters\"><div class=\"col-12\">");













buf.push("<div class=\"page-header\"><h2>Cards<small>An editable container that resides within the content area of your screen</small></h2></div><div class=\"grid full-width gutters-sm\"><pxm-card title=\"Basic Card\"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in reprehenderit in voluptate velit.</p></pxm-card><pxm-card title=\"Form Card\"><form><input type=\"text\" placeholder=\"Enter title here...\"><textarea placeholder=\"Lorem ipsum dolor sit amet...\" rows=\"10\"></textarea><button class=\"button block\">Reset</button><button class=\"button block primary\">Submit</button></form></pxm-card></div><div class=\"grid\"><pxm-card title=\"Image Card\"><img src=\"images/image.png\" style=\"max-height:400px\" class=\"responsive\"></pxm-card><pxm-card title=\"Map Card\"><img src=\"images/staticmap.png\" style=\"max-height:400px\" class=\"responsive\"></pxm-card></div><div class=\"grid\"><pxm-card name=\"John Doe\" facebook><img src=\"images/image.png\" style=\"max-height:400px\" class=\"responsive\"></pxm-card><pxm-card name=\"John Doe\" facebook><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></pxm-card></div><script>var basicItems = [ \n {title: 'Item 1'},\n {title: 'Item 2'},\n {title: 'Item 3'},\n {title: 'Item 4'}\n];\nvar textItems = [ \n {title: 'Item 1', subtitle: 'Subtitle'},\n {title: 'Item 2', subtitle: 'Subtitle'},\n {title: 'Item 3', subtitle: 'Subtitle'},\n {title: 'Item 4', subtitle: 'Subtitle'}\n];\nvar mediaItems = [ \n {title: 'Item 1', subtitle: 'Subtitle', image: 'http://placehold.it/100'},\n {title: 'Item 2', subtitle: 'Subtitle', image: 'http://placehold.it/100'},\n {title: 'Item 3', subtitle: 'Subtitle', image: 'http://placehold.it/100'},\n {title: 'Item 4', subtitle: 'Subtitle', image: 'http://placehold.it/100'}\n];\nHTMLImports.whenReady(function(){\n  document.getElementById('list1').data = basicItems;\n  document.getElementById('list2').data = textItems;\n  document.getElementById('list3').data = mediaItems;\n});\n</script>");



























buf.push("<div class=\"page-header\"><h2>Lists</h2></div><div class=\"container demo\"><div class=\"col-12\"><h3>Basic list</h3><pxm-list id=\"list1\"></pxm-list><ul class=\"table-view\">");
// iterate [1, 2, 3, 4, 5]
;(function(){
  var $$obj = [1, 2, 3, 4, 5];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var val = $$obj[$index];

buf.push("<li>" + (jade.escape(null == (jade_interp = val) ? "" : jade_interp)) + "</li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var val = $$obj[$index];

buf.push("<li>" + (jade.escape(null == (jade_interp = val) ? "" : jade_interp)) + "</li>");
    }

  }
}).call(this);

buf.push("</ul><h3>Title list</h3><pxm-list id=\"list2\"></pxm-list><h3>Media list</h3><pxm-list id=\"list3\"></pxm-list></div></div><div class=\"page-header\"><h2>Modals</h2></div><a onclick=\"myModalexample.toggle()\" class=\"btn\">Toggle modal</a><pxm-modal id=\"myModalexample\" title=\"Modal\"></pxm-modal><div class=\"page-header\"><h2>Popovers</h2><p>Popovers are designed to only fire from title bars. Set the value of the title href to the id of a popover, like so:</p></div><div class=\"page-header\"><h2>Navbars</h2><small>Full width and docked to the top of the viewport.</small></div><p>The navbar serves as the page title, is usually the first element inside each mobile page, and typically contains a page title and up to two buttons.</p><div class=\"demo position-relative overflow-hidden height-400\"> <pxm-navbar title=\"Title\"><div class=\"left\"><button class=\"outline secondary\"><i class=\"fa fa-lg fa-bars\"></i></button></div><div class=\"title\">Navbar</div><div class=\"right\"><button class=\"outline secondary\"><i class=\"fa fa-lg fa-gear\"></i></button></div></pxm-navbar></div><div class=\"page-header\"><h2>Toolbars</h2></div><div class=\"demo\"><pxm-toolbar id=\"myToolbar\"><button class=\"btn secondary\"><i class=\"fa fa-lg fa-edit\"></i></button></pxm-toolbar></div><div class=\"page-header\"><h2>Pages</h2><p>A simple container for multiple pages.</p></div><div class=\"demo\"><pxm-pages id=\"myPages\" loop><pxm-page id=\"page1\" title=\"Page 1\" class=\"background-color-red\"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><button onclick=\"myPages.prev()\">Prev Page</button><button onclick=\"myPages.next()\">Next Page</button></pxm-page><pxm-page id=\"page2\" title=\"Page 2\" class=\"background-color-green\"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><button onclick=\"myPages.prev()\">Prev Page</button><button onclick=\"myPages.next()\">Next Page</button></pxm-page><pxm-page id=\"page3\" title=\"Page 3\" class=\"background-color-blue\"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><button onclick=\"myPages.prev()\">Prev Page</button><button onclick=\"myPages.next()\">Next Page</button></pxm-page></pxm-pages></div><div class=\"page-header\"><h2>pxm-views</h2></div><p>A simple container for multiple views.</p><pxm-views id=\"myViews\"><pxm-view id=\"view1\" title=\"View 1\" class=\"background-color-green\"><p>A simple view container. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><button onclick=\"myViews.next()\">Next View</button></pxm-view><pxm-view id=\"view2\" title=\"View 2\" class=\"background-color-red\"><p>A simple view container. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><button onclick=\"myViews.prev()\">Prev View</button><button onclick=\"myViews.next()\">Next View</button></pxm-view><pxm-view id=\"view3\" title=\"View 3\" class=\"background-color-blue\"><p>A simple view container. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><button onclick=\"myViews.prev()\">Prev View</button><button onclick=\"myViews.next()\">Next View</button></pxm-view></pxm-views></div></div></section></article><script>HTMLImports.whenReady(function(){\n  hljs.configure({\n    tabReplace: '  '\n  })\n  hljs.initHighlightingOnLoad()\n})</script></body></html></article><hr><article id=\"javascript\" class=\"col-12\">");








































jade_mixins["input"] = jade_interp = function(type, text){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<dt class=\"col-sm-2\"><label>" + (jade.escape(null == (jade_interp = text) ? "" : jade_interp)) + "</label></dt><dd class=\"col-sm-10\"><input" + (jade.attr("type", type, true, true)) + (jade.attr("placeholder", text, true, true)) + "></dd>");
};
jade_mixins["bg"] = jade_interp = function(name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<li" + (jade.cls(['background-color','background-color-primary',name], [null,null,true])) + "><span>" + (jade.escape(null == (jade_interp = name) ? "" : jade_interp)) + "</span></li>");
};
jade_mixins["buttons"] = jade_interp = function(id){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var items = [];
for (jade_interp = 1; jade_interp < arguments.length; jade_interp++) {
  items.push(arguments[jade_interp]);
}
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<button" + (jade.cls([item], [true])) + ">" + (jade.escape(null == (jade_interp = item) ? "" : jade_interp)) + "</button>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<button" + (jade.cls([item], [true])) + ">" + (jade.escape(null == (jade_interp = item) ? "" : jade_interp)) + "</button>");
    }

  }
}).call(this);

};
jade_mixins["alert"] = jade_interp = function(type, text){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div" + (jade.cls(['alert',type], [null,true])) + ">" + (jade.escape(null == (jade_interp = text) ? "" : jade_interp)) + "</div>");
};




buf.push("<!DOCTYPE html><html class=\"pxm\"><head><meta charset=\"utf-8\"><meta name=\"description\" content=\"px-mobile usage docs\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><title>px-mobile</title><!-- Web Application Manifest--><!--link(rel='manifest', href='manifest.json')--><!-- Tile color for Win8--><meta name=\"msapplication-TileColor\" content=\"#333333\"><!-- Add to homescreen for Chrome on Android--><meta name=\"mobile-web-app-capable\" content=\"yes\"><meta name=\"application-name\" content=\"PSK\"><link rel=\"icon\" sizes=\"192x192\" href=\"images/icons/favicon-white-144px.png\"><!-- Add to homescreen for Safari on iOS--><meta name=\"apple-mobile-web-app-capable\" content=\"yes\"><meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\"><meta name=\"apple-mobile-web-app-title\" content=\"Px Mobile Starter Kit\"><link rel=\"apple-touch-icon\" href=\"images/icons/favicon-white-144px.png\"><!-- Tile icon for Win8 (144x144)--><meta name=\"msapplication-TileImage\" content=\"images/icons/favicon-white-144px.png\"><!-- build:css styles/main.css--><!--link(rel='stylesheet', href='styles/main.css')--><!-- endbuild--><!-- build:js bower_components/webcomponentsjs/webcomponents-lite.min.js--><!--script(src='bower_components/webcomponentsjs/webcomponents-lite.js')--><!-- endbuild--><!-- will be replaced with elements/elements.vulcanized.html--><!--link(rel='import', href='elements/elements.html')--><!-- endreplace-->\n<!--Dependencies--><!--script(src='../jspm_packages/system.js')--><!--script(src='../config.js')--><!--script(src='../dist/bundle.js')--><script src=\"../../webcomponentsjs/webcomponents.js\"></script><!--script(src='https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.13/webcomponents.min.js')--><!-- - For px-example component.--><script src=\"../../highlightjs/highlight.pack.min.js\"></script><link rel=\"stylesheet\" href=\"../../highlightjs/styles/github.css\"><link rel=\"import\" href=\"../../polymer/polymer.html\"><link rel=\"import\" href=\"../px-mobile.html\"><link rel=\"import\" href=\"../../dist/elements/pxm-example.html\"><link rel=\"import\" href=\"../px-mobile-theme.html\"><link rel=\"stylesheet\" href=\"docs.css\"><title>px-mobile demo</title></head><body class=\"docs\"><!--pxm-navbar(title='px-mobile', fixed)--><article class=\"container full-width\"><section class=\"col-12\"><div class=\"hero container full-width\"><div class=\"col-12 text-center\"><h1>JavaScript</h1><p>Use this API for constructing the logic of your mobile application.</p></div></div><div class=\"container full-width gutters\"><div class=\"col-3\"><h4>Structure</h4><ul><li>App</li><li>Page</li><li>Pages</li><li>Router</li><li>View</li><li>Views</li></ul><h4>Data</h4><ul><li>Collection</li><li>Model</li><li>DB</li></ul><h4>Utilities</h4><ul><li>DOM</li><li>HTTP</li><li>Logger</li><li>PubSub</li><li>Sandbox</li><li>Service Locator</li></ul></div><div class=\"col-8\"></div></div></section></article><script>HTMLImports.whenReady(function(){\n  hljs.configure({\n    tabReplace: '  '\n  })\n  hljs.initHighlightingOnLoad()\n})</script></body></html></article><hr><article id=\"examples\" class=\"col-12\">");








































jade_mixins["input"] = jade_interp = function(type, text){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<dt class=\"col-sm-2\"><label>" + (jade.escape(null == (jade_interp = text) ? "" : jade_interp)) + "</label></dt><dd class=\"col-sm-10\"><input" + (jade.attr("type", type, true, true)) + (jade.attr("placeholder", text, true, true)) + "></dd>");
};
jade_mixins["bg"] = jade_interp = function(name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<li" + (jade.cls(['background-color','background-color-primary',name], [null,null,true])) + "><span>" + (jade.escape(null == (jade_interp = name) ? "" : jade_interp)) + "</span></li>");
};
jade_mixins["buttons"] = jade_interp = function(id){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var items = [];
for (jade_interp = 1; jade_interp < arguments.length; jade_interp++) {
  items.push(arguments[jade_interp]);
}
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<button" + (jade.cls([item], [true])) + ">" + (jade.escape(null == (jade_interp = item) ? "" : jade_interp)) + "</button>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<button" + (jade.cls([item], [true])) + ">" + (jade.escape(null == (jade_interp = item) ? "" : jade_interp)) + "</button>");
    }

  }
}).call(this);

};
jade_mixins["alert"] = jade_interp = function(type, text){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<div" + (jade.cls(['alert',type], [null,true])) + ">" + (jade.escape(null == (jade_interp = text) ? "" : jade_interp)) + "</div>");
};




buf.push("<!DOCTYPE html><html class=\"pxm\"><head><meta charset=\"utf-8\"><meta name=\"description\" content=\"px-mobile usage docs\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><title>px-mobile</title><!-- Web Application Manifest--><!--link(rel='manifest', href='manifest.json')--><!-- Tile color for Win8--><meta name=\"msapplication-TileColor\" content=\"#333333\"><!-- Add to homescreen for Chrome on Android--><meta name=\"mobile-web-app-capable\" content=\"yes\"><meta name=\"application-name\" content=\"PSK\"><link rel=\"icon\" sizes=\"192x192\" href=\"images/icons/favicon-white-144px.png\"><!-- Add to homescreen for Safari on iOS--><meta name=\"apple-mobile-web-app-capable\" content=\"yes\"><meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\"><meta name=\"apple-mobile-web-app-title\" content=\"Px Mobile Starter Kit\"><link rel=\"apple-touch-icon\" href=\"images/icons/favicon-white-144px.png\"><!-- Tile icon for Win8 (144x144)--><meta name=\"msapplication-TileImage\" content=\"images/icons/favicon-white-144px.png\"><!-- build:css styles/main.css--><!--link(rel='stylesheet', href='styles/main.css')--><!-- endbuild--><!-- build:js bower_components/webcomponentsjs/webcomponents-lite.min.js--><!--script(src='bower_components/webcomponentsjs/webcomponents-lite.js')--><!-- endbuild--><!-- will be replaced with elements/elements.vulcanized.html--><!--link(rel='import', href='elements/elements.html')--><!-- endreplace-->\n<!--Dependencies--><!--script(src='../jspm_packages/system.js')--><!--script(src='../config.js')--><!--script(src='../dist/bundle.js')--><script src=\"../../webcomponentsjs/webcomponents.js\"></script><!--script(src='https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.13/webcomponents.min.js')--><!-- - For px-example component.--><script src=\"../../highlightjs/highlight.pack.min.js\"></script><link rel=\"stylesheet\" href=\"../../highlightjs/styles/github.css\"><link rel=\"import\" href=\"../../polymer/polymer.html\"><link rel=\"import\" href=\"../px-mobile.html\"><link rel=\"import\" href=\"../../dist/elements/pxm-example.html\"><link rel=\"import\" href=\"../px-mobile-theme.html\"><link rel=\"stylesheet\" href=\"docs.css\"><title>px-mobile demo</title></head><body class=\"docs\"><!--pxm-navbar(title='px-mobile', fixed)--><article class=\"container full-width\"><section class=\"col-12\"><div class=\"hero container full-width\"><div class=\"col-12 text-center\"><h1>Reference Examples</h1><p>Use these examples as a starting point for your mobile application.</p></div></div><div class=\"container full-width gutters\"><div class=\"col-4\"><h3>Dashboard Page</h3><p>Basic structure for a mobile ready dashboard.</p><img src=\"images/image.png\" class=\"img-responsive\"><a href=\"example-dashboard.html\" class=\"button block\">View Example</a></div><div class=\"col-4\"><h3>Sign-in Page</h3><p>Basic design for a mobile sign in form.</p><img src=\"images/image.png\" class=\"img-responsive\"><a href=\"example-login.html\" class=\"button block\">View Example</a></div><div class=\"col-4\"><h3>Context Browser</h3><p>Example a mobile ready context browser.</p><img src=\"images/image.png\" class=\"img-responsive\"><a href=\"example-context-browser.html\" class=\"button block\">View Example</a></div></div><hr></section></article><script>HTMLImports.whenReady(function(){\n  hljs.configure({\n    tabReplace: '  '\n  })\n  hljs.initHighlightingOnLoad()\n})</script></body></html></article></section></article><script>HTMLImports.whenReady(function(){\n  hljs.configure({\n    tabReplace: '  '\n  })\n  hljs.initHighlightingOnLoad()\n})</script></body></html>");}.call(this,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
}