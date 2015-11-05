function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (undefined) {








































buf.push("<!DOCTYPE html><html class=\"pxm\"><head><meta charset=\"utf-8\"><meta name=\"description\" content=\"px-mobile usage docs\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><title>px-mobile</title><!-- Web Application Manifest--><!--link(rel='manifest', href='manifest.json')--><!-- Tile color for Win8--><meta name=\"msapplication-TileColor\" content=\"#333333\"><!-- Add to homescreen for Chrome on Android--><meta name=\"mobile-web-app-capable\" content=\"yes\"><meta name=\"application-name\" content=\"PSK\"><link rel=\"icon\" sizes=\"192x192\" href=\"images/icons/favicon-white-144px.png\"><!-- Add to homescreen for Safari on iOS--><meta name=\"apple-mobile-web-app-capable\" content=\"yes\"><meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\"><meta name=\"apple-mobile-web-app-title\" content=\"Px Mobile Starter Kit\"><link rel=\"apple-touch-icon\" href=\"images/icons/favicon-white-144px.png\"><!-- Tile icon for Win8 (144x144)--><meta name=\"msapplication-TileImage\" content=\"images/icons/favicon-white-144px.png\"><!-- build:css styles/main.css--><!--link(rel='stylesheet', href='styles/main.css')--><!-- endbuild--><!-- build:js bower_components/webcomponentsjs/webcomponents-lite.min.js--><!--script(src='bower_components/webcomponentsjs/webcomponents-lite.js')--><!-- endbuild--><!-- will be replaced with elements/elements.vulcanized.html--><!--link(rel='import', href='elements/elements.html')--><!-- endreplace-->\n<!--Dependencies--><!--script(src='../jspm_packages/system.js')--><!--script(src='../config.js')--><!--script(src='../dist/bundle.js')--><script src=\"../../webcomponentsjs/webcomponents.js\"></script><!--script(src='https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.13/webcomponents.min.js')--><!-- - For px-example component.--><script src=\"../../highlightjs/highlight.pack.min.js\"></script><link rel=\"stylesheet\" href=\"../../highlightjs/styles/github.css\"><link rel=\"import\" href=\"../../polymer/polymer.html\"><link rel=\"import\" href=\"../px-mobile.html\"><link rel=\"import\" href=\"../../dist/elements/pxm-example.html\"><link rel=\"import\" href=\"../px-mobile-theme.html\"><link rel=\"stylesheet\" href=\"docs.css\"><title>px-mobile | Components</title></head><body class=\"docs\"><!--pxm-navbar(title='px-mobile', fixed)--><article class=\"container full-width\"><section class=\"col-12\"><div class=\"hero container full-width\"><div class=\"col-12 text-center\"><h1>UI Components</h1><!--p Web Components that serve as basic building blocks.--><p>Basic building blocks that use the Predix design system</p></div></div><!--.col-4\n  p.padding-25.text-center\n    i.fa.fa-4x.fa-cubes\n  --><div class=\"container full-width gutters\"><div class=\"col-12\">");













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

buf.push("</ul><h3>Title list</h3><pxm-list id=\"list2\"></pxm-list><h3>Media list</h3><pxm-list id=\"list3\"></pxm-list></div></div><div class=\"page-header\"><h2>Modals</h2></div><a onclick=\"myModalexample.toggle()\" class=\"btn\">Toggle modal</a><pxm-modal id=\"myModalexample\" title=\"Modal\"></pxm-modal><div class=\"page-header\"><h2>Popovers</h2><p>Popovers are designed to only fire from title bars. Set the value of the title href to the id of a popover, like so:</p></div><div class=\"page-header\"><h2>Navbars</h2><small>Full width and docked to the top of the viewport.</small></div><p>The navbar serves as the page title, is usually the first element inside each mobile page, and typically contains a page title and up to two buttons.</p><div class=\"demo position-relative overflow-hidden height-400\"> <pxm-navbar title=\"Title\"><div class=\"left\"><button class=\"outline secondary\"><i class=\"fa fa-lg fa-bars\"></i></button></div><div class=\"title\">Navbar</div><div class=\"right\"><button class=\"outline secondary\"><i class=\"fa fa-lg fa-gear\"></i></button></div></pxm-navbar></div><div class=\"page-header\"><h2>Toolbars</h2></div><div class=\"demo\"><pxm-toolbar id=\"myToolbar\"><button class=\"btn secondary\"><i class=\"fa fa-lg fa-edit\"></i></button></pxm-toolbar></div><div class=\"page-header\"><h2>Pages</h2><p>A simple container for multiple pages.</p></div><div class=\"demo\"><pxm-pages id=\"myPages\" loop><pxm-page id=\"page1\" title=\"Page 1\" class=\"background-color-red\"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><button onclick=\"myPages.prev()\">Prev Page</button><button onclick=\"myPages.next()\">Next Page</button></pxm-page><pxm-page id=\"page2\" title=\"Page 2\" class=\"background-color-green\"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><button onclick=\"myPages.prev()\">Prev Page</button><button onclick=\"myPages.next()\">Next Page</button></pxm-page><pxm-page id=\"page3\" title=\"Page 3\" class=\"background-color-blue\"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><button onclick=\"myPages.prev()\">Prev Page</button><button onclick=\"myPages.next()\">Next Page</button></pxm-page></pxm-pages></div><div class=\"page-header\"><h2>pxm-views</h2></div><p>A simple container for multiple views.</p><pxm-views id=\"myViews\"><pxm-view id=\"view1\" title=\"View 1\" class=\"background-color-green\"><p>A simple view container. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><button onclick=\"myViews.next()\">Next View</button></pxm-view><pxm-view id=\"view2\" title=\"View 2\" class=\"background-color-red\"><p>A simple view container. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><button onclick=\"myViews.prev()\">Prev View</button><button onclick=\"myViews.next()\">Next View</button></pxm-view><pxm-view id=\"view3\" title=\"View 3\" class=\"background-color-blue\"><p>A simple view container. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><button onclick=\"myViews.prev()\">Prev View</button><button onclick=\"myViews.next()\">Next View</button></pxm-view></pxm-views></div></div></section></article><script>HTMLImports.whenReady(function(){\n  hljs.configure({\n    tabReplace: '  '\n  })\n  hljs.initHighlightingOnLoad()\n})</script></body></html>");}.call(this,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
}