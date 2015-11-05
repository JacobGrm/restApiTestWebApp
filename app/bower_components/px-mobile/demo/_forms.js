function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

jade_mixins["input"] = jade_interp = function(type, text){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<dt class=\"col-sm-2\"><label>" + (jade.escape(null == (jade_interp = text) ? "" : jade_interp)) + "</label></dt><dd class=\"col-sm-10\"><input" + (jade.attr("type", type, true, false)) + (jade.attr("placeholder", text, true, false)) + "/></dd>");
};
buf.push("<div class=\"page-header\"><h2>Forms</h2></div><h3>Basic Form</h3><pxm-example><form><input type=\"text\" placeholder=\"Full name\"/><input type=\"email\" placeholder=\"Email\"/><input type=\"text\" placeholder=\"Success\" class=\"success\"/><input type=\"email\" placeholder=\"Error\" class=\"error\"/><input type=\"password\" placeholder=\"Warning\" class=\"warning\"/><textarea rows=\"5\"></textarea><button class=\"button block\">Reset</button><button class=\"button block primary\">Submit</button></form></pxm-example><h3>Responsive Forms</h3><pxm-example><form><dl class=\"container\">");
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
buf.push("<dt class=\"col-sm-2\"><label>Select</label></dt><dd class=\"col-sm-10\"><select><option>Option 1</option><option>Option 2</option><option>Option 3</option><option>Option 4</option><option>Option 5</option></select></dd><dt class=\"col-sm-2\"><label>Select Multi</label></dt><dd class=\"col-sm-10\"><select multiple=\"multiple\"><option>Option 1</option><option>Option 2</option><option>Option 3</option><option>Option 4</option><option>Option 5</option></select></dd></dl><button class=\"button block primary\">Submit</button></form></pxm-example>");;return buf.join("");
}