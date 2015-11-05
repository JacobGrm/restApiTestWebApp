function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

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
buf.push("</pxm-example></div></div>");;return buf.join("");
}