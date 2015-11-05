function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

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
buf.push("</pxm-example></section>");;return buf.join("");
}