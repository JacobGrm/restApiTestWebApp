function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (undefined) {
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

buf.push("</tbody></table>");}.call(this,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
}