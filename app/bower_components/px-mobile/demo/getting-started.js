function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<!DOCTYPE html><html class=\"pxm\"><head><meta charset=\"utf-8\"><meta name=\"description\" content=\"px-mobile usage docs\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><title>px-mobile</title><!-- Web Application Manifest--><!--link(rel='manifest', href='manifest.json')--><!-- Tile color for Win8--><meta name=\"msapplication-TileColor\" content=\"#333333\"><!-- Add to homescreen for Chrome on Android--><meta name=\"mobile-web-app-capable\" content=\"yes\"><meta name=\"application-name\" content=\"PSK\"><link rel=\"icon\" sizes=\"192x192\" href=\"images/icons/favicon-white-144px.png\"><!-- Add to homescreen for Safari on iOS--><meta name=\"apple-mobile-web-app-capable\" content=\"yes\"><meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\"><meta name=\"apple-mobile-web-app-title\" content=\"Px Mobile Starter Kit\"><link rel=\"apple-touch-icon\" href=\"images/icons/favicon-white-144px.png\"><!-- Tile icon for Win8 (144x144)--><meta name=\"msapplication-TileImage\" content=\"images/icons/favicon-white-144px.png\"><!-- build:css styles/main.css--><!--link(rel='stylesheet', href='styles/main.css')--><!-- endbuild--><!-- build:js bower_components/webcomponentsjs/webcomponents-lite.min.js--><!--script(src='bower_components/webcomponentsjs/webcomponents-lite.js')--><!-- endbuild--><!-- will be replaced with elements/elements.vulcanized.html--><!--link(rel='import', href='elements/elements.html')--><!-- endreplace-->\n<!--Dependencies--><!--script(src='../jspm_packages/system.js')--><!--script(src='../config.js')--><!--script(src='../dist/bundle.js')--><script src=\"../../webcomponentsjs/webcomponents.js\"></script><!--script(src='https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.13/webcomponents.min.js')--><!-- - For px-example component.--><script src=\"../../highlightjs/highlight.pack.min.js\"></script><link rel=\"stylesheet\" href=\"../../highlightjs/styles/github.css\"><link rel=\"import\" href=\"../../polymer/polymer.html\"><link rel=\"import\" href=\"../px-mobile.html\"><link rel=\"import\" href=\"../../dist/elements/pxm-example.html\"><link rel=\"import\" href=\"../px-mobile-theme.html\"><link rel=\"stylesheet\" href=\"docs.css\"><title>px-mobile | Getting Started</title></head><body class=\"docs\"><!--pxm-navbar(title='px-mobile', fixed)--><article class=\"container full-width\"><section class=\"col-12\"><div class=\"hero container full-width\"><div class=\"col-12 text-center\"><h1>Getting Started</h1><p>Once you download px-mobile, here's what you need to do next.</p></div></div><div class=\"container full-width gutters\"><div class=\"col-12\"><h2>Quick Start</h2><p>Here are is a few easy ways to quickly get started, each one appealing to a different skill level and use case. Read through to see what suits your particular needs.</p><h3>Install with Bower</h3><p>Use bower to simplify the installation process, open the terminal and execute the following:</p><pre>$ bower install https://github.build.ge.com/PredixComponents/px-mobile.git --save</pre></div></div></section></article><script>HTMLImports.whenReady(function(){\n  hljs.configure({\n    tabReplace: '  '\n  })\n  hljs.initHighlightingOnLoad()\n})</script></body></html>");;return buf.join("");
}