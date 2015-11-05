function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (undefined) {
buf.push("<script>var basicItems = [ \n {title: 'Item 1'},\n {title: 'Item 2'},\n {title: 'Item 3'},\n {title: 'Item 4'}\n];\nvar textItems = [ \n {title: 'Item 1', subtitle: 'Subtitle'},\n {title: 'Item 2', subtitle: 'Subtitle'},\n {title: 'Item 3', subtitle: 'Subtitle'},\n {title: 'Item 4', subtitle: 'Subtitle'}\n];\nvar mediaItems = [ \n {title: 'Item 1', subtitle: 'Subtitle', image: 'http://placehold.it/100'},\n {title: 'Item 2', subtitle: 'Subtitle', image: 'http://placehold.it/100'},\n {title: 'Item 3', subtitle: 'Subtitle', image: 'http://placehold.it/100'},\n {title: 'Item 4', subtitle: 'Subtitle', image: 'http://placehold.it/100'}\n];\nHTMLImports.whenReady(function(){\n  document.getElementById('list1').data = basicItems;\n  document.getElementById('list2').data = textItems;\n  document.getElementById('list3').data = mediaItems;\n});\n</script>");



























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

buf.push("</ul><h3>Title list</h3><pxm-list id=\"list2\"></pxm-list><h3>Media list</h3><pxm-list id=\"list3\"></pxm-list></div></div>");}.call(this,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
}