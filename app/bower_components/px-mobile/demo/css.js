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
buf.push("<!DOCTYPE html><html class=\"pxm\"><head><meta charset=\"utf-8\"><meta name=\"description\" content=\"px-mobile usage docs\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><title>px-mobile</title><!-- Web Application Manifest--><!--link(rel='manifest', href='manifest.json')--><!-- Tile color for Win8--><meta name=\"msapplication-TileColor\" content=\"#333333\"><!-- Add to homescreen for Chrome on Android--><meta name=\"mobile-web-app-capable\" content=\"yes\"><meta name=\"application-name\" content=\"PSK\"><link rel=\"icon\" sizes=\"192x192\" href=\"images/icons/favicon-white-144px.png\"><!-- Add to homescreen for Safari on iOS--><meta name=\"apple-mobile-web-app-capable\" content=\"yes\"><meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\"><meta name=\"apple-mobile-web-app-title\" content=\"Px Mobile Starter Kit\"><link rel=\"apple-touch-icon\" href=\"images/icons/favicon-white-144px.png\"><!-- Tile icon for Win8 (144x144)--><meta name=\"msapplication-TileImage\" content=\"images/icons/favicon-white-144px.png\"><!-- build:css styles/main.css--><!--link(rel='stylesheet', href='styles/main.css')--><!-- endbuild--><!-- build:js bower_components/webcomponentsjs/webcomponents-lite.min.js--><!--script(src='bower_components/webcomponentsjs/webcomponents-lite.js')--><!-- endbuild--><!-- will be replaced with elements/elements.vulcanized.html--><!--link(rel='import', href='elements/elements.html')--><!-- endreplace-->\n<!--Dependencies--><!--script(src='../jspm_packages/system.js')--><!--script(src='../config.js')--><!--script(src='../dist/bundle.js')--><script src=\"../../webcomponentsjs/webcomponents.js\"></script><!--script(src='https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.13/webcomponents.min.js')--><!-- - For px-example component.--><script src=\"../../highlightjs/highlight.pack.min.js\"></script><link rel=\"stylesheet\" href=\"../../highlightjs/styles/github.css\"><link rel=\"import\" href=\"../../polymer/polymer.html\"><link rel=\"import\" href=\"../px-mobile.html\"><link rel=\"import\" href=\"../../dist/elements/pxm-example.html\"><link rel=\"import\" href=\"../px-mobile-theme.html\"><link rel=\"stylesheet\" href=\"docs.css\"><title>px-mobile | UI Elements</title></head><body class=\"docs\"><!--pxm-navbar(title='px-mobile', fixed)--><article class=\"container full-width\"><section class=\"col-12\"><div class=\"hero container full-width\"><div class=\"col-sm-12 text-center\"><h1>UI Elements</h1><p>Individual pieces of a consistent visual language used to represent user friendly interfaces</p><!--p HTML elements enhanced with extensible classes, and an advanced Flexbox grid system.--></div></div><div class=\"container full-width gutters\"><div class=\"col-12\">");
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

buf.push("</tbody></table></div></div></section></article><script>HTMLImports.whenReady(function(){\n  hljs.configure({\n    tabReplace: '  '\n  })\n  hljs.initHighlightingOnLoad()\n})</script></body></html>");}.call(this,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
}