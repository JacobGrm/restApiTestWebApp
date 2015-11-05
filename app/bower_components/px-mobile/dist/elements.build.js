window.px = window.px || {};
window.px.mobile = window.px.mobile || {};
px.mobile.behaviors = px.mobile.behaviors || {};
px.mobile.behaviors = px.mobile.behaviors || {};
px.mobile.behaviors.app = {
properties: {
title: {
type: String,
value: 'My App'
},
config: {
type: Object,
value: {}
},
session: {
type: Object,
value: {}
},
db: {
type: Object,
value: {}
},
routes: {
type: Object,
value: {}
},
modules: {
type: Object,
value: {}
},
history: {
type: Object,
value: {}
},
views: {
type: Object,
value: {}
},
pages: {
type: Object,
value: {}
},
collections: {
type: Object,
value: {}
},
models: {
type: Object,
value: {}
},
templates: {
type: Object,
value: {}
},
mainView: {
type: Object,
value: {}
},
currentView: {
type: Object,
value: {}
}
},
created: function () {
var logger = new px.mobile.Logger(this.tagName + '#' + this.id, { colors: { debug: 'color:red' } });
px.mobile.utils.addMixin(logger, this);
this.logApi(this.id, 'created');
},
ready: function () {
this.logApi(this.id, 'ready');
this._initViews();
},
attached: function () {
var _this = this;
this.logApi(this.id, 'attached');
_this.db = Polymer.dom(this).querySelector('px-db');
_this.mainView = Polymer.dom(this).querySelector('px-views');
_this.router = Polymer.dom(this).querySelector('px-router');
var _pages = Polymer.dom(this).querySelectorAll('px-page');
if (_pages) {
_pages.forEach(function (page) {
_this.pages[page.id] = page;
_this.logApi('indexing page', page.id);
});
}
this.CollectionsList = Polymer.dom(this).querySelectorAll('px-collection');
this.ViewList = Polymer.dom(this).querySelectorAll('px-view');
this.ViewsList = Polymer.dom(this).querySelectorAll('px-views');
this.PagesList = Polymer.dom(this).querySelectorAll('px-page');
var _models = Polymer.dom(this).querySelectorAll('px-model');
if (_models) {
_models.forEach(function (model) {
_this.models[model.id] = model;
});
}
var _collections = Polymer.dom(this).querySelectorAll('px-collection');
if (_collections) {
_collections.forEach(function (col) {
_this.collections[col.id] = col;
});
}
this.fire('px-app-ready', this);
},
_getAndSet: function (key, value) {
var _this = this;
var _items = Polymer.dom(this).querySelectorAll(key);
if (_items && _items.length) {
_items.forEach(function (item) {
_this.logApi('_getAndSet', key);
});
}
},
detached: function () {
console.warn('px-app detached!', this);
},
_initViews: function () {
var _this = this;
var views = Polymer.dom(this).querySelectorAll('px-view');
views.forEach(function (view) {
_this.addView(view);
_this.logApi('_initViews', view);
});
},
changeView: function (view, options) {
this.getCurrentView().active = false;
px.mobile.dom('#' + this.getCurrentView().id).find('article').addClass('previous');
px.mobile.dom('#' + this.getCurrentView().id).find('nav').addClass('previous');
document.getElementById(view).active = true;
px.mobile.dom('#' + view).find('article').addClass('current');
px.mobile.dom('#' + view).find('nav').addClass('current');
},
addView: function (view) {
if (!view.id) {
throw new Error('Must provide an ID for the view!');
}
this.views[view.id] = view;
},
getCurrentView: function () {
for (var view in this.views) {
if (document.getElementById(view).active) {
return document.getElementById(view);
}
}
},
loadView: function (url) {
},
changeView: function (name) {
console.warn('change view to ', name);
},
logout: function () {
window.location.reload();
}
};
var px = window.px || {};
px.log = {};
;
;
window.px = window.px || {};
function ontouch(el, callback) {
var touchsurface = el, dir, swipeType, startX, startY, distX, distY, dist = 0, threshold = 150, restraint = 100, allowedTime = 500, elapsedTime, startTime;
var handletouch = callback || function (evt, dir, phase, swipetype, distance) {
console.warn('handleTouch', evt, dir, phase, swipetype, distance);
};
var onTouchStart = function (e) {
var touchobj = e.changedTouches[0];
dir = 'none';
swipeType = 'none';
startX = touchobj.pageX;
startY = touchobj.pageY;
var startTime = new Date().getTime();
handletouch(e, 'none', 'start', swipeType, 0);
e.preventDefault();
};
var onTouchMove = function (e) {
var touchobj = e.changedTouches[0];
distX = touchobj.pageX - startX;
distY = touchobj.pageY - startY;
if (Math.abs(distX) > Math.abs(distY)) {
dir = distX < 0 ? 'left' : 'right';
handletouch(e, dir, 'move', swipeType, distX);
} else {
dir = distY < 0 ? 'up' : 'down';
handletouch(e, dir, 'move', swipeType, distY);
}
e.preventDefault();
};
var onTouchEnd = function (e) {
var touchobj = e.changedTouches[0];
elapsedTime = new Date().getTime() - startTime;
if (elapsedTime <= allowedTime) {
if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
swipeType = dir;
} else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
swipeType = dir;
}
}
handletouch(e, dir, 'end', swipeType, dir === 'left' || dir === 'right' ? distX : distY);
e.preventDefault();
};
touchsurface.addEventListener('touchstart', onTouchStart, false);
touchsurface.addEventListener('touchmove', onTouchMove, false);
touchsurface.addEventListener('touchend', onTouchEnd, false);
touchsurface.addEventListener('dragstart', onTouchStart, false);
touchsurface.addEventListener('drag', onTouchMove, false);
touchsurface.addEventListener('dragend', onTouchEnd, false);
}
var ViewEventsBehavior = {};
ViewEventsBehavior.attached = function () {
console.warn('ViewEventsBehavior attached');
};
px.mobile.behaviors = px.mobile.behaviors || {};
px.mobile.behaviors.ViewEventsBehavior = ViewEventsBehavior;
var transitions = [
{
leave: 'moveToLeft',
enter: 'moveFromRight'
},
{
leave: 'moveToRight',
enter: 'moveFromLeft'
},
{
leave: 'moveToBottom',
enter: 'moveFromTop'
},
{
leave: 'fade',
enter: 'moveFromRight ontop'
},
{
leave: 'fade',
enter: 'moveFromLeft ontop'
},
{
leave: 'fade',
enter: 'moveFromBottom ontop'
},
{
leave: 'fade',
enter: 'moveFromTop ontop'
},
{
leave: 'moveToLeftFade',
enter: 'moveFromRightFade'
},
{
leave: 'moveToRightFade',
enter: 'moveFromLeftFade'
},
{
leave: 'moveToTopFade',
enter: 'moveFromBottomFade'
},
{
leave: 'moveToBottomFade',
enter: 'moveFromTopFade'
},
{
leave: 'moveToLeftEasing ontop',
enter: 'moveFromRight'
},
{
leave: 'moveToRightEasing ontop',
enter: 'moveFromLeft'
},
{
leave: 'moveToTopEasing ontop',
enter: 'moveFromBottom'
},
{
leave: 'moveToBottomEasing ontop',
enter: 'moveFromTop'
},
{
leave: 'scaleDown',
enter: 'moveFromRight ontop'
},
{
leave: 'scaleDown',
enter: 'moveFromLeft ontop'
},
{
leave: 'scaleDown',
enter: 'moveFromBottom ontop'
},
{
leave: 'scaleDown',
enter: 'moveFromTop ontop'
},
{
leave: 'scaleDown',
enter: 'scaleUpDown delay300'
},
{
leave: 'scaleDownUp',
enter: 'scaleUp delay300'
},
{
leave: 'moveToLeft ontop',
enter: 'scaleUp'
},
{
leave: 'moveToRight ontop',
enter: 'scaleUp'
},
{
leave: 'moveToTop ontop',
enter: 'scaleUp'
},
{
leave: 'moveToBottom ontop',
enter: 'scaleUp'
},
{
leave: 'scaleDownCenter',
enter: 'scaleUpCenter delay400'
},
{
leave: 'rotateRightSideFirst',
enter: 'moveFromRight delay20 ontop'
},
{
leave: 'rotateLeftSideFirst',
enter: 'moveFromLeft delay20 ontop'
},
{
leave: 'rotateTopSideFirst',
enter: 'moveFromTop delay20 ontop'
},
{
leave: 'rotateBottomSideFirst',
enter: 'moveFromBottom delay20 ontop'
},
{
leave: 'flipOutRight',
enter: 'flipInLeft delay500'
},
{
leave: 'flipOutLeft',
enter: 'flipInRight delay500'
},
{
leave: 'flipOutTop',
enter: 'flipInBottom delay500'
},
{
leave: 'flipOutBottom',
enter: 'flipInTop delay500'
},
{
leave: 'rotateFall ontop',
enter: 'scaleUp'
},
{
leave: 'rotateOutNewspaper',
enter: 'rotateInNewspaper delay500'
},
{
leave: 'rotatePushLeft',
enter: 'moveFromRight'
},
{
leave: 'rotatePushRight',
enter: 'moveFromLeft'
},
{
leave: 'rotatePushTop',
enter: 'moveFromBottom'
},
{
leave: 'rotatePushBottom',
enter: 'moveFromTop'
},
{
leave: 'rotatePushLeft',
enter: 'rotatePullRight delay180'
},
{
leave: 'rotatePushRight',
enter: 'rotatePullLeft delay180'
},
{
leave: 'rotatePushTop',
enter: 'rotatePullBottom delay180'
},
{
leave: 'rotatePushBottom',
enter: 'rotatePullTop delay180'
},
{
leave: 'rotateFoldLeft',
enter: 'moveFromRightFade'
},
{
leave: 'rotateFoldRight',
enter: 'moveFromLeftFade'
},
{
leave: 'rotateFoldTop',
enter: 'moveFromBottomFade'
},
{
leave: 'rotateFoldBottom',
enter: 'moveFromTopFade'
},
{
leave: 'moveToRightFade',
enter: 'rotateUnfoldLeft'
},
{
leave: 'moveToLeftFade',
enter: 'rotateUnfoldRight'
},
{
leave: 'moveToBottomFade',
enter: 'rotateUnfoldTop'
},
{
leave: 'moveToTopFade',
enter: 'rotateUnfoldBottom'
},
{
leave: 'rotateRoomLeftOut ontop',
enter: 'rotateRoomLeftIn'
},
{
leave: 'rotateRoomRightOut ontop',
enter: 'rotateRoomRightIn'
},
{
leave: 'rotateRoomTopOut ontop',
enter: 'rotateRoomTopIn'
},
{
leave: 'rotateRoomBottomOut ontop',
enter: 'rotateRoomBottomIn'
},
{
leave: 'rotateCubeLeftOut ontop',
enter: 'rotateCubeLeftIn'
},
{
leave: 'rotateCubeRightOut ontop',
enter: 'rotateCubeRightIn'
},
{
leave: 'rotateCubeTopOut ontop',
enter: 'rotateCubeTopIn'
},
{
leave: 'rotateCubeBottomOut ontop',
enter: 'rotateCubeBottomIn'
},
{
leave: 'rotateCarouselLeftOut ontop',
enter: 'rotateCarouselLeftIn'
},
{
leave: 'rotateCarouselRightOut ontop',
enter: 'rotateCarouselRightIn'
},
{
leave: 'rotateCarouselTopOut ontop',
enter: 'rotateCarouselTopIn'
},
{
leave: 'rotateCarouselBottomOut ontop',
enter: 'rotateCarouselBottomIn'
},
{
leave: 'rotateSidesOut',
enter: 'rotateSidesIn delay200'
},
{
leave: 'rotateSlideOut',
enter: 'rotateSlideIn'
}
].reverse();
function ViewTransitions() {
var startElement = 0, animEndEventName = '', animEndEventNames = {
'WebkitAnimation': 'webkitAnimationEnd',
'OAnimation': 'oAnimationEnd',
'msAnimation': 'MSAnimationEnd',
'animation': 'animationend'
};
function getTransitionPrefix() {
var v = [
'Moz',
'Webkit',
'Khtml',
'O',
'ms'
];
var b = document.body || document.documentElement;
var s = b.style;
var p = 'animation';
if (typeof s[p] === 'string') {
return 'animation';
}
p = p.charAt(0).toUpperCase() + p.substr(1);
for (var i = 0; i < v.length; i++) {
if (typeof s[v[i] + p] === 'string') {
return v[i] + p;
}
}
return false;
}
animEndEventName = animEndEventNames[getTransitionPrefix()];
function init(selected) {
startElement = selected;
console.warn('ViewTransitions.init', selected);
var views = document.querySelectorAll('pxm-view');
views.each(function (el) {
console.log(el);
el.attr('data-originalClassList', el.attr('class'));
});
document.querySelectorAll('pxm-views').each(function (el) {
el.attr('data-current', '0');
el.attr('data-isAnimating', 'false');
});
views[selected].removeClass('next');
}
function animate(options) {
var el = options.current;
var wrapper = el.parent();
var inClass = formatClass(el.inTrans);
var outClass = formatClass(el.outTrans);
var currPage = options.current;
var nextPage = options.next;
var endCurrPage = false;
var endNextPage = false;
if (wrapper.attr('data-isAnimating') === 'true') {
console.log(wrapper, wrapper.attr('data-isAnimating'));
return false;
}
outClass.forEach(function (c) {
currPage.addClass(c);
console.warn('adding class', c);
});
currPage.addEventListener(animEndEventName, function () {
console.warn(animEndEventName, 'finished - removing handler');
currPage.off(animEndEventName);
endCurrPage = true;
if (endNextPage) {
onEndAnimation(currPage, nextPage, el);
}
});
inClass.forEach(function (c) {
nextPage.addClass(c);
});
nextPage.addEventListener(animEndEventName, function () {
console.warn('Adding event listener to nextPage');
nextPage.off(animEndEventName);
endNextPage = true;
if (endCurrPage) {
onEndAnimation(currPage, nextPage, el);
if (options.callback) {
options.callback(currPage, nextPage);
}
}
});
console.warn('animate element', options, animEndEventName, inClass, outClass);
console.warn('wrapper', wrapper);
}
function formatClass(str) {
var classes = str.split(' ');
var output = [];
for (var i = 0; i < classes.length; i++) {
output.push('pt-page-' + classes[i]);
}
return output;
}
function onEndAnimation($outpage, $inpage, block) {
resetPage($outpage, $inpage);
$outpage.trigger('animation.out.complete');
$inpage.trigger('animation.in.complete');
block.attr('data-isAnimating', 'false');
console.warn('onEndAnimation');
}
function resetPage($outpage, $inpage) {
$outpage.attr('class', $outpage.attr('data-originalClassList'));
$inpage.attr('class', $inpage.attr('data-originalClassList') + ' et-page-current');
console.warn('resetPage');
}
return {
init: init,
animate: animate
};
};
px.mobile.behaviors = px.mobile.behaviors || {};
px.mobile.behaviors.ViewsBehavior = {
created: function () {
var logger = new px.mobile.Logger(this.tagName + '-behavior', { colors: { debug: 'color:violet;' } });
px.mobile.utils.addMixin(logger, this);
this.logApi(this.id, 'created');
this.ViewMap = {};
this.ViewList = [];
},
ready: function () {
this.addClass('et-wrapper');
this.logApi(this.id, 'ready');
},
attached: function () {
this.logApi('attached', this.id + ' - ' + this.selected);
if (!this.id) {
throw 'Views' + this.tagName + ' cannot be created without an id!';
}
this._initViews();
this.ViewTransitions = new ViewTransitions();
this.ViewTransitions.init(this.selected);
this.trigger('ready', this);
},
_initViews: function () {
var self = this;
this.logApi('_initViews', this);
var len = this.children.length;
for (var i = 0; i < len; i++) {
self._addView(this.children[i]);
}
this.currentView = this.children[this.selected];
this.gotoIndex(this.selected);
},
_initRouter: function () {
var Router = new px.mobile.SimpleRouter('simple', {});
for (var route in this.routes) {
Router.add(route, function () {
alert(arguments);
});
}
Router.listen();
this.router = Router;
},
_addView: function (View) {
View.attr('index', this.ViewList.length.toString());
this.ViewList.push(View);
View.addClass('et-page');
View.addClass('next');
this.ViewMap[View.id] = View;
this.views[View.id] = View;
this.routes[View.route] = View;
this.logApi('_addView', View.id);
},
getViewIndex: function (indexOrId) {
if (this.ViewList[indexOrId]) {
return this.ViewList[indexOrId];
} else if (this.ViewMap[indexOrId]) {
return this.ViewMap[indexOrId];
}
},
getCurrentView: function () {
return px.mobile.dom('#' + this.id).find('.current');
},
appendView: function (obj) {
var view = new px.mobile.View('view', obj);
view.id = 'view-' + this.views.length + 1;
this.ViewList.push(view);
this.appendChild(view.element);
this._addView(view.element);
},
_clearCurrent: function () {
this.logApi('_clearCurrent');
var _views = Polymer.dom(this).querySelectorAll('pxm-view');
if (_views) {
_views.forEach(function (view) {
view.removeClass('current');
});
}
},
loadView: function (url) {
console.warn('Load', url);
var _this = this, html = '';
var view = '';
this.importHref(url, function (e) {
html = e.target.import.body.innerHTML;
_this.logApi('inject pxm-view html', _this.id);
view = _this.html(html);
_this.append(view);
}, function (e) {
this.logApi('Error loading view', e);
});
},
_setCurrent: function (index, oldIndex) {
this.logApi('_setCurrent', index);
var prevView = this.children[oldIndex];
var currentView = this.children[index];
var nextView = this.children[index + 1];
this.currentView = currentView;
if (prevView) {
this._previousView = oldIndex;
prevView.removeClass('next');
prevView.addClass('previous');
prevView.removeClass('et-page-current');
}
if (nextView) {
nextView.removeClass('previous');
nextView.addClass('next');
nextView.removeClass('current');
nextView.removeClass('et-page-current');
}
if (currentView) {
this._currentView = index;
currentView.addClass('et-page-current');
currentView.removeClass('next');
currentView.removeClass('previous');
}
if (currentView && currentView.inTrans) {
this.logApi('Current View transition', currentView.inTrans, currentView.outTrans);
}
if (prevView && prevView.outTrans) {
this.logApi('Prev View transition', prevView.inTrans, prevView.outTrans);
}
},
resetViews: function () {
this.ViewList.forEach(function (view) {
view.addClass('next');
view.removeClass('previous');
});
this.ViewList[this.selected].addClass('et-page-current');
this.selected = 0;
this.current();
},
updateHash: function () {
window.location.hash = '#' + this.currentView.route;
},
_setPrevNextClasses: function () {
var current = this.selected;
var prev = this.selected - 1;
var next = this.selected + 1;
var len = this.children.length;
for (var i = 0; i < len; i++) {
if (i === prev) {
this.children[i].addClass('previous');
} else {
this.children[i].addClass('next');
}
}
},
gotoView: function (id) {
var index = 0;
if (this.ViewMap[id]) {
index = this.ViewList.indexOf(this.ViewMap[id]);
}
this.selected = index;
this.logApi('gotoview', id);
},
goto: function (indexOrId) {
this.logApi('goto', indexOrId);
if (this.ViewMap[indexOrId]) {
this.gotoView(indexOrId);
return this.ViewMap[indexOrId];
} else if (this.ViewList[indexOrId]) {
this.gotoIndex(indexOrId);
return this.ViewList[indexOrId];
} else {
throw new Error('px.mobile.behaviors.ViewsBehavior.goto - could not find view ' + indexOrId);
}
},
gotoIndex: function (index) {
this.logApi('gotoIndex', index);
this.selected = index;
},
current: function () {
this.gotoIndex(this.selected);
this.logApi('current', this.selected);
},
next: function () {
if (this.selected >= this.ViewList.length - 1) {
if (this.loop) {
this.resetViews();
} else {
this.current();
}
} else {
this.gotoIndex(this.selected + 1);
}
},
prev: function () {
if (this.selected <= 0) {
this.current();
} else {
this.gotoIndex(this.selected - 1);
}
},
removeTransition: function (index) {
var view = this.ViewList[index];
view.content.css('transition', 'none');
},
doTransition: function (index) {
var view = this.ViewList[index];
var position = view.position();
view.css('transition', 'all 400ms ease').css('transform', 'translate3d(' + -1 * position.left + 'px, 0, 0)');
}
};
window.px = window.px || {};
px.view = {};
var pxRouterBehavior = {
properties: {},
refreshPage: function () {
},
loadPage: function (url) {
},
loadContent: function (content) {
},
reloadPage: function (url) {
},
reloadContent: function (content) {
},
reloadPreviousPage: function (url) {
},
reloadPreviousContent: function (content) {
}
};
;
px.mobile.behaviors = px.mobile.behaviors || {};
px.collection = {
properties: {
models: {
type: Array,
value: []
},
params: {
type: Object,
notify: true,
reflectToAttribute: true,
observer: '_paramsChanged'
},
baseUrl: { type: String },
lastResponse: {
type: Object,
readonly: true,
notify: true,
value: {}
},
auto: { type: Boolean },
debounceDuration: {
type: Number,
value: 25
},
db: { type: Object },
items: {
type: Object,
value: {}
}
},
created: function () {
this.models = [];
var logger = new px.mobile.Logger(this.localName);
px.mobile.utils.addMixin(logger, this);
this.logApi('1. created', this.id);
},
ready: function () {
this.logApi('2. ready', this.id);
},
attached: function () {
var self = this;
if (!this.id) {
throw 'Model ' + this.tagName + ' cannot be created without an id!';
}
this.logApi('3. attached', this.id);
},
fetch: function (params) {
this.logApi('fetch', params);
var self = this;
if (!self.db) {
self.db = new px.mobile.DB(this.id, { baseUrl: self.baseUrl });
}
self.debounce('fetch', function () {
self.db.allDocs(params).then(function (resp) {
self.lastResponse = resp.data;
self.items = resp.data.rows;
});
}, self.debounceDuration);
},
addModels: function (data) {
var self = this;
self.models = [];
data.forEach(function (row) {
console.log('add model', row);
self.add(row.doc || row);
});
},
add: function (doc) {
var _model = new px.mobile.Model(doc._id || doc.id, { data: doc });
this.models.push(_model);
console.log('adding', model);
},
remove: function (model) {
if (type(model) === 'string') {
console.warn('Find by _id', model);
}
if (type(model) === 'number') {
console.warn('Find by index', model);
return this.items.splice(1, model);
}
if (type(model) === 'object') {
console.warn('Find by model', model);
return this.items.splice(1, this.items.indexOf(model));
}
},
find: function (options) {
this.items.filter(function (item) {
return true;
});
},
toJSON: function () {
return JSON.stringify(this.items);
},
_paramsChanged: function (newParams, oldParams) {
this.logApi('_paramsChanged', newParams);
var params = newParams || {};
if (this.params instanceof String) {
try {
params = JSON.parse(this.deserialize(this.params, String));
this.fetch(params);
} catch (e) {
console.error('[INFO] - INVALID JSON params - sending anyway', params);
}
} else {
params = this.deserialize(this.params, Object);
this.fetch(params);
}
},
computeBaseUrl: function (url) {
console.warn('FInd parent url', this.parent.baseUrl);
console.log('computing base url', url);
if (url) {
return url;
}
}
};
var transitions = [
{
leave: 'moveToLeft',
enter: 'moveFromRight'
},
{
leave: 'moveToRight',
enter: 'moveFromLeft'
},
{
leave: 'moveToBottom',
enter: 'moveFromTop'
},
{
leave: 'fade',
enter: 'moveFromRight ontop'
},
{
leave: 'fade',
enter: 'moveFromLeft ontop'
},
{
leave: 'fade',
enter: 'moveFromBottom ontop'
},
{
leave: 'fade',
enter: 'moveFromTop ontop'
},
{
leave: 'moveToLeftFade',
enter: 'moveFromRightFade'
},
{
leave: 'moveToRightFade',
enter: 'moveFromLeftFade'
},
{
leave: 'moveToTopFade',
enter: 'moveFromBottomFade'
},
{
leave: 'moveToBottomFade',
enter: 'moveFromTopFade'
},
{
leave: 'moveToLeftEasing ontop',
enter: 'moveFromRight'
},
{
leave: 'moveToRightEasing ontop',
enter: 'moveFromLeft'
},
{
leave: 'moveToTopEasing ontop',
enter: 'moveFromBottom'
},
{
leave: 'moveToBottomEasing ontop',
enter: 'moveFromTop'
},
{
leave: 'scaleDown',
enter: 'moveFromRight ontop'
},
{
leave: 'scaleDown',
enter: 'moveFromLeft ontop'
},
{
leave: 'scaleDown',
enter: 'moveFromBottom ontop'
},
{
leave: 'scaleDown',
enter: 'moveFromTop ontop'
},
{
leave: 'scaleDown',
enter: 'scaleUpDown delay300'
},
{
leave: 'scaleDownUp',
enter: 'scaleUp delay300'
},
{
leave: 'moveToLeft ontop',
enter: 'scaleUp'
},
{
leave: 'moveToRight ontop',
enter: 'scaleUp'
},
{
leave: 'moveToTop ontop',
enter: 'scaleUp'
},
{
leave: 'moveToBottom ontop',
enter: 'scaleUp'
},
{
leave: 'scaleDownCenter',
enter: 'scaleUpCenter delay400'
},
{
leave: 'rotateRightSideFirst',
enter: 'moveFromRight delay20 ontop'
},
{
leave: 'rotateLeftSideFirst',
enter: 'moveFromLeft delay20 ontop'
},
{
leave: 'rotateTopSideFirst',
enter: 'moveFromTop delay20 ontop'
},
{
leave: 'rotateBottomSideFirst',
enter: 'moveFromBottom delay20 ontop'
},
{
leave: 'flipOutRight',
enter: 'flipInLeft delay500'
},
{
leave: 'flipOutLeft',
enter: 'flipInRight delay500'
},
{
leave: 'flipOutTop',
enter: 'flipInBottom delay500'
},
{
leave: 'flipOutBottom',
enter: 'flipInTop delay500'
},
{
leave: 'rotateFall ontop',
enter: 'scaleUp'
},
{
leave: 'rotateOutNewspaper',
enter: 'rotateInNewspaper delay500'
},
{
leave: 'rotatePushLeft',
enter: 'moveFromRight'
},
{
leave: 'rotatePushRight',
enter: 'moveFromLeft'
},
{
leave: 'rotatePushTop',
enter: 'moveFromBottom'
},
{
leave: 'rotatePushBottom',
enter: 'moveFromTop'
},
{
leave: 'rotatePushLeft',
enter: 'rotatePullRight delay180'
},
{
leave: 'rotatePushRight',
enter: 'rotatePullLeft delay180'
},
{
leave: 'rotatePushTop',
enter: 'rotatePullBottom delay180'
},
{
leave: 'rotatePushBottom',
enter: 'rotatePullTop delay180'
},
{
leave: 'rotateFoldLeft',
enter: 'moveFromRightFade'
},
{
leave: 'rotateFoldRight',
enter: 'moveFromLeftFade'
},
{
leave: 'rotateFoldTop',
enter: 'moveFromBottomFade'
},
{
leave: 'rotateFoldBottom',
enter: 'moveFromTopFade'
},
{
leave: 'moveToRightFade',
enter: 'rotateUnfoldLeft'
},
{
leave: 'moveToLeftFade',
enter: 'rotateUnfoldRight'
},
{
leave: 'moveToBottomFade',
enter: 'rotateUnfoldTop'
},
{
leave: 'moveToTopFade',
enter: 'rotateUnfoldBottom'
},
{
leave: 'rotateRoomLeftOut ontop',
enter: 'rotateRoomLeftIn'
},
{
leave: 'rotateRoomRightOut ontop',
enter: 'rotateRoomRightIn'
},
{
leave: 'rotateRoomTopOut ontop',
enter: 'rotateRoomTopIn'
},
{
leave: 'rotateRoomBottomOut ontop',
enter: 'rotateRoomBottomIn'
},
{
leave: 'rotateCubeLeftOut ontop',
enter: 'rotateCubeLeftIn'
},
{
leave: 'rotateCubeRightOut ontop',
enter: 'rotateCubeRightIn'
},
{
leave: 'rotateCubeTopOut ontop',
enter: 'rotateCubeTopIn'
},
{
leave: 'rotateCubeBottomOut ontop',
enter: 'rotateCubeBottomIn'
},
{
leave: 'rotateCarouselLeftOut ontop',
enter: 'rotateCarouselLeftIn'
},
{
leave: 'rotateCarouselRightOut ontop',
enter: 'rotateCarouselRightIn'
},
{
leave: 'rotateCarouselTopOut ontop',
enter: 'rotateCarouselTopIn'
},
{
leave: 'rotateCarouselBottomOut ontop',
enter: 'rotateCarouselBottomIn'
},
{
leave: 'rotateSidesOut',
enter: 'rotateSidesIn delay200'
},
{
leave: 'rotateSlideOut',
enter: 'rotateSlideIn'
}
].reverse();
function ViewTransitions() {
var startElement = 0, animEndEventName = '', animEndEventNames = {
'WebkitAnimation': 'webkitAnimationEnd',
'OAnimation': 'oAnimationEnd',
'msAnimation': 'MSAnimationEnd',
'animation': 'animationend'
};
function getTransitionPrefix() {
var v = [
'Moz',
'Webkit',
'Khtml',
'O',
'ms'
];
var b = document.body || document.documentElement;
var s = b.style;
var p = 'animation';
if (typeof s[p] === 'string') {
return 'animation';
}
p = p.charAt(0).toUpperCase() + p.substr(1);
for (var i = 0; i < v.length; i++) {
if (typeof s[v[i] + p] === 'string') {
return v[i] + p;
}
}
return false;
}
animEndEventName = animEndEventNames[getTransitionPrefix()];
function init(selected) {
startElement = selected;
console.warn('ViewTransitions.init', selected);
var views = document.querySelectorAll('pxm-view');
views.each(function (el) {
console.log(el);
el.attr('data-originalClassList', el.attr('class'));
});
document.querySelectorAll('pxm-views').each(function (el) {
el.attr('data-current', '0');
el.attr('data-isAnimating', 'false');
});
views[selected].removeClass('next');
}
function animate(options) {
var el = options.current;
var wrapper = el.parent();
var inClass = formatClass(el.inTrans);
var outClass = formatClass(el.outTrans);
var currPage = options.current;
var nextPage = options.next;
var endCurrPage = false;
var endNextPage = false;
if (wrapper.attr('data-isAnimating') === 'true') {
console.log(wrapper, wrapper.attr('data-isAnimating'));
return false;
}
outClass.forEach(function (c) {
currPage.addClass(c);
console.warn('adding class', c);
});
currPage.addEventListener(animEndEventName, function () {
console.warn(animEndEventName, 'finished - removing handler');
currPage.off(animEndEventName);
endCurrPage = true;
if (endNextPage) {
onEndAnimation(currPage, nextPage, el);
}
});
inClass.forEach(function (c) {
nextPage.addClass(c);
});
nextPage.addEventListener(animEndEventName, function () {
console.warn('Adding event listener to nextPage');
nextPage.off(animEndEventName);
endNextPage = true;
if (endCurrPage) {
onEndAnimation(currPage, nextPage, el);
if (options.callback) {
options.callback(currPage, nextPage);
}
}
});
console.warn('animate element', options, animEndEventName, inClass, outClass);
console.warn('wrapper', wrapper);
}
function formatClass(str) {
var classes = str.split(' ');
var output = [];
for (var i = 0; i < classes.length; i++) {
output.push('pt-page-' + classes[i]);
}
return output;
}
function onEndAnimation($outpage, $inpage, block) {
resetPage($outpage, $inpage);
$outpage.trigger('animation.out.complete');
$inpage.trigger('animation.in.complete');
block.attr('data-isAnimating', 'false');
console.warn('onEndAnimation');
}
function resetPage($outpage, $inpage) {
$outpage.attr('class', $outpage.attr('data-originalClassList'));
$inpage.attr('class', $inpage.attr('data-originalClassList') + ' et-page-current');
console.warn('resetPage');
}
return {
init: init,
animate: animate
};
};
window.px = window.px || {};
px.list = {
created: function () {
console.warn(this.tagName, 'behaviors created');
}
};
(function (win) {
var PERMISSION_DEFAULT = 'default', PERMISSION_GRANTED = 'granted', PERMISSION_DENIED = 'denied', PERMISSION = [
PERMISSION_GRANTED,
PERMISSION_DEFAULT,
PERMISSION_DENIED
], defaultSetting = {
pageVisibility: false,
autoClose: 0
}, empty = {}, emptyString = '', isSupported = function () {
var isSupported = false;
try {
isSupported = !!(win.Notification || win.webkitNotifications || navigator.mozNotification || win.external && win.external.msIsSiteMode() !== undefined);
} catch (e) {
}
return isSupported;
}(), ieVerification = Math.floor(Math.random() * 10 + 1), isFunction = function (value) {
return value && value.constructor === Function;
}, isString = function (value) {
return value && value.constructor === String;
}, isObject = function (value) {
return value && value.constructor === Object;
}, mixin = function (target, source) {
var name, s;
for (name in source) {
s = source[name];
if (!(name in target) || target[name] !== s && (!(name in empty) || empty[name] !== s)) {
target[name] = s;
}
}
return target;
}, noop = function () {
}, settings = defaultSetting;
function getNotification(title, options) {
var notification;
if (win.Notification) {
notification = new win.Notification(title, {
icon: isString(options.icon) ? options.icon : options.icon.x32,
body: options.body || emptyString,
tag: options.tag || emptyString
});
} else if (win.webkitNotifications) {
notification = win.webkitNotifications.createNotification(options.icon, title, options.body);
notification.show();
} else if (navigator.mozNotification) {
notification = navigator.mozNotification.createNotification(title, options.body, options.icon);
notification.show();
} else if (win.external && win.external.msIsSiteMode()) {
win.external.msSiteModeClearIconOverlay();
win.external.msSiteModeSetIconOverlay(isString(options.icon) ? options.icon : options.icon.x16, title);
win.external.msSiteModeActivate();
notification = { 'ieVerification': ieVerification + 1 };
}
return notification;
}
function getWrapper(notification) {
return {
close: function () {
if (notification) {
if (notification.close) {
notification.close();
} else if (win.external && win.external.msIsSiteMode()) {
if (notification.ieVerification === ieVerification) {
win.external.msSiteModeClearIconOverlay();
}
}
}
}
};
}
function requestPermission(callback) {
if (!isSupported) {
return;
}
var callbackFunction = isFunction(callback) ? callback : noop;
if (win.webkitNotifications && win.webkitNotifications.checkPermission) {
win.webkitNotifications.requestPermission(callbackFunction);
} else if (win.Notification && win.Notification.requestPermission) {
win.Notification.requestPermission(callbackFunction);
}
}
function permissionLevel() {
var permission;
if (!isSupported) {
return;
}
if (win.Notification && win.Notification.permissionLevel) {
permission = win.Notification.permissionLevel();
} else if (win.webkitNotifications && win.webkitNotifications.checkPermission) {
permission = PERMISSION[win.webkitNotifications.checkPermission()];
} else if (navigator.mozNotification) {
permission = PERMISSION_GRANTED;
} else if (win.Notification && win.Notification.permission) {
permission = win.Notification.permission;
} else if (win.external && win.external.msIsSiteMode() !== undefined) {
permission = win.external.msIsSiteMode() ? PERMISSION_GRANTED : PERMISSION_DEFAULT;
}
return permission;
}
function config(params) {
if (params && isObject(params)) {
mixin(settings, params);
}
return settings;
}
function isDocumentHidden() {
return settings.pageVisibility ? document.hidden || document.msHidden || document.mozHidden || document.webkitHidden : true;
}
function createNotification(title, options) {
var notification, notificationWrapper;
if (isSupported && isDocumentHidden() && isString(title) && (options && (isString(options.icon) || isObject(options.icon))) && permissionLevel() === PERMISSION_GRANTED) {
notification = getNotification(title, options);
}
notificationWrapper = getWrapper(notification);
if (settings.autoClose && notification && !notification.ieVerification && notification.addEventListener) {
notification.addEventListener('show', function () {
var notification = notificationWrapper;
win.setTimeout(function () {
notification.close();
}, settings.autoClose);
});
}
return notificationWrapper;
}
win.notify = {
PERMISSION_DEFAULT: PERMISSION_DEFAULT,
PERMISSION_GRANTED: PERMISSION_GRANTED,
PERMISSION_DENIED: PERMISSION_DENIED,
isSupported: isSupported,
config: config,
createNotification: createNotification,
permissionLevel: permissionLevel,
requestPermission: requestPermission
};
if (isFunction(Object.seal)) {
Object.seal(win.notify);
}
}(window));
Polymer({
behaviors: [px.mobile.behaviors.app],
is: 'pxm-app'
});
Polymer({
is: 'px-router',
properties: {
routes: {
type: Object,
value: {}
},
router: {
type: Object,
value: {}
}
},
behaviors: [pxRouterBehavior],
created: function () {
console.warn(this.tagName, 'created', this);
},
created: function () {
var logger = new px.mobile.Logger(this.tagName, { colors: { debug: 'color:blueviolet;' } });
this.router = new px.mobile.Router(this.tagName, {});
px.mobile.utils.addMixin(logger, this);
this.logApi(this.id, 'created');
},
ready: function () {
this.logApi(this.id, 'ready');
},
attached: function () {
this.logApi('attached', this.id + ' - ' + this.selected);
if (!this.id) {
throw 'Router' + this.tagName + ' cannot be created without an id!';
}
}
});
Polymer({
is: 'pxm-db',
behaviors: [px.mobile.DB],
properties: {
baseUrl: {
type: String,
value: 'http://localhost:5984/default'
},
lastResponse: {
type: Object,
notify: true,
value: {}
},
adapter: {
type: Object,
value: {}
}
},
ready: function () {
if (!this.baseUrl) {
throw Error(this.tagName + ' cannot be created without a base-url!');
}
var logger = new px.mobile.Logger(this.tagName + '#' + this.id, { colors: { debug: 'color:blue' } });
px.mobile.utils.addMixin(logger, this);
this.logApi(this.id, 'ready');
this.fire('pxm-db-ready');
},
attached: function () {
if (!this.id) {
throw Error(this.tagName + ' cannot be created without an id!');
}
var adapter = new px.mobile.DB(this.id, { baseUrl: this.baseUrl });
this.adapter = adapter;
px.mobile.utils.addMixin(adapter, this);
this.logApi(this.id, 'attached');
}
});
Polymer({
is: 'pxm-collection',
behaviors: [
px.log,
px.collection
],
properties: {
baseUrl: { type: String },
lastResponse: {
type: Object,
readonly: true,
notify: true,
value: {}
},
auto: { type: Boolean },
debounceDuration: {
type: Number,
value: 25
},
db: {
type: Object,
value: {}
},
items: {
type: Object,
value: {}
},
models: {
type: Array,
value: []
},
params: {
type: Object,
notify: true,
reflectToAttribute: true,
observer: '_paramsChanged'
}
},
created: function () {
this.models = [];
var logger = new px.mobile.Logger(this.tagName);
px.mobile.utils.addMixin(logger, this);
this.logApi('1. created', this.id);
},
ready: function () {
this.logApi('2. ready', this.id);
},
attached: function () {
if (!this.id) {
throw 'Model ' + this.tagName + ' cannot be created without an id!';
}
this.logApi('3. attached', this.id);
},
fetch: function (params) {
this.logApi('fetch', params);
var self = this;
if (!self.db.name) {
self.db = new px.mobile.DB('', { baseUrl: self.baseUrl });
}
self.debounce('fetch', function () {
self.db.allDocs(params).then(function (resp) {
self.lastResponse = resp.data;
self.items = resp.data.rows;
});
}, self.debounceDuration);
},
addModels: function (data) {
var self = this;
self.models = [];
data.forEach(function (row) {
console.log('add model', row);
self.add(row.doc || row);
});
},
add: function (doc) {
var _model = new px.mobile.Model(doc._id || doc.id, { data: doc });
this.models.push(_model);
console.log('adding', model);
},
remove: function (model) {
if (type(model) === 'string') {
console.warn('Find by _id', model);
}
if (type(model) === 'number') {
console.warn('Find by index', model);
return this.items.splice(1, model);
}
if (type(model) === 'object') {
console.warn('Find by model', model);
return this.items.splice(1, this.items.indexOf(model));
}
},
find: function (options) {
this.items.filter(function (item) {
return true;
});
},
toJSON: function () {
return JSON.stringify(this.items);
},
_paramsChanged: function (newParams, oldParams) {
this.logApi('_paramsChanged', newParams);
var params = newParams || {};
if (this.params instanceof String) {
try {
params = JSON.parse(this.deserialize(this.params, String));
this.fetch(params);
} catch (e) {
console.error('[INFO] - INVALID JSON params - sending anyway', params);
}
} else {
params = this.deserialize(this.params, Object);
this.fetch(params);
}
},
computeBaseUrl: function (url) {
console.warn('FInd parent url', this.parent.baseUrl);
console.log('computing base url', url);
if (url) {
return url;
}
}
});
Polymer({
is: 'pxm-log',
properties: {
title: {
type: String,
value: 'List Title'
},
subtitle: {
type: String,
value: 'List Sub-Title'
},
text: {
type: String,
value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in arcu non augue mollis fermentum. Curabitur sit amet vestibulum orci, vitae laoreet felis.'
}
},
created: function () {
console.warn(this.tagName, 'created');
},
handleClick: function (e) {
this.fire('px-list-item:handleClick', e);
}
});
Polymer({
is: 'pxm-model',
properties: {
baseUrl: {
type: String,
value: '/default'
},
auto: {
type: Boolean,
value: false
},
debounceDuration: {
type: Number,
value: 0
},
key: {
type: String,
notify: true,
observer: 'keyChanged'
},
data: {
type: Object,
notify: true,
value: {}
},
model: {
type: Object,
notify: true,
value: {}
}
},
created: function () {
px.mobile.utils.addMixin(new px.mobile.Logger('px-model'), this);
console.log(this);
this.info('created!');
},
ready: function () {
this.info('ready!');
},
attached: function () {
if (!this.id) {
throw 'Model ' + this.tagName + ' cannot be created without an id!';
}
this.model = new px.mobile.Model(this.key, { baseUrl: this.baseUrl });
this.info('attached!');
},
fetch: function (params) {
var self = this;
if (!this.model.id) {
this.model = new px.mobile.Model(this.key, { baseUrl: this.baseUrl });
}
self.debounce('fetch', function () {
self.model.fetch().then(function (resp) {
self.data = resp.data;
});
}, self.debounceDuration);
},
keyChanged: function (newKey, oldKey) {
console.warn('keyChanged', newKey);
if (newKey) {
if (this.auto) {
this.fetch();
}
}
}
});
Polymer({
is: 'pxm-pages',
properties: {
title: {
type: String,
value: 'Predix Mobile Page'
},
selected: {
type: Number,
reflectToAttribute: true,
notify: true,
observer: '_setCurrent',
value: 0
},
currentPage: {
type: Object,
value: {}
},
context: {
type: Object,
value: {}
},
pages: { type: Array },
PageList: { type: Array },
selectedIndex: { type: Number },
routes: {
type: Object,
value: {}
},
in: { type: String },
out: { type: String },
loop: {
type: Boolean,
value: false
}
},
emit: function (event, data) {
console.warn('emit:event', event, data);
return px.mobile.dom('*body').trigger('page:' + event, data);
},
on: function (event, cb) {
console.warn('on:event', event, cb);
return px.mobile.dom('*body').on('page:' + event, cb);
},
created: function () {
var logger = new px.mobile.Logger(this.tagName, { colors: { debug: 'color:blue' } });
px.mobile.utils.addMixin(logger, this);
this.logApi(this.id, 'created');
this.PageMap = {};
this.PageList = [];
},
ready: function () {
this.logApi(this.id, 'ready');
},
attached: function () {
this.logApi('attached', this.id + ' - ' + this.selected);
if (!this.id) {
throw 'pages' + this.tagName + ' cannot be created without an id!';
}
this._initpages();
this.gotoIndex(this.selected);
this.addClass('et-wrapper');
},
_initpages: function () {
var self = this;
this.logApi('_initpages', this);
var pages = Polymer.dom(this).querySelectorAll('pxm-page');
var len = pages.length;
for (var i = 0; i < len; i++) {
this.logApi('page', pages[i]);
self._addPage(pages[i]);
}
this.fire('pxm-pages-ready');
},
showPage: function (index) {
this.logApi('showPage', index);
this.PageList[this.selected].toggleClass('et-page-current');
this.selected = index;
this.PageList[this.selected].child()[0].toggleClass('et-page-current');
},
hidePage: function (index) {
this.logApi('hidePage', index);
this.toggleClass('hidden', true, this);
},
updatePage: function (page) {
console.warn('INFO', 'update Page', this.id);
this.logApi('updatePage', page);
},
_addPage: function (Page) {
this.emit('add', Page);
Page.attr('index', this.PageList.length.toString());
this.PageList.push(Page);
Page.addClass('et-page');
Page.addClass('next');
this.PageMap[Page.id] = Page;
if (Page.route) {
this.routes[Page.route] = Page.id;
}
this.logApi('_addPage', Page);
},
_clearCurrent: function () {
this.logApi('_clearCurrent');
var _pages = Polymer.dom(this).querySelectorAll('pxm-page');
if (_pages) {
_pages.forEach(function (Page) {
Page.removeClass('current');
});
}
},
_setCurrent: function (index, oldIndex) {
this.logApi('_setCurrent', index);
var prevPage = this.children[oldIndex];
var currPage = this.children[index];
this.emit('change', currPage);
if (prevPage) {
prevPage.removeClass('current');
prevPage.removeClass('et-page-current');
prevPage.addClass('previous');
}
if (currPage) {
currPage.removeClass('next');
currPage.addClass('current');
currPage.addClass('et-page-current');
}
},
changePage: function (indexOrId) {
this.emit('change', indexOrId);
this.logApi('changePage', indexOrId);
this._clearCurrent();
if (this.PageList[indexOrId]) {
this._setCurrent(indexOrId);
} else if (this.PageMap[indexOrId]) {
this._setCurrent(this.PageList.indexOf(this.PageMap[indexOrId]));
}
},
reset: function (reverse) {
var _pages = this.children;
var len = this.children.length;
for (var i = 0; i < len; i++) {
this.children[i].removeClass('current');
if (reverse) {
this.children[i].addClass('previous');
this.children[i].removeClass('next');
} else {
this.children[i].addClass('next');
this.children[i].removeClass('previous');
}
}
this.children[this.selected].removeClass('next');
if (reverse) {
this.selected = this.PageList.length - 1;
} else {
this.selected = this.selected - (this.PageList.length - 1);
}
this.current();
},
goto: function (indexOrId) {
var page = this.PageMap[indexOrId] || this.PageList[indexOrId] | {};
if (page) {
this.gotoPage(indexOrId);
window.location.hash = page.route;
return page;
}
},
gotoPage: function (id) {
var index = 0;
if (this.PageMap[id]) {
index = this.PageList.indexOf(this.PageMap[id]);
}
this.selected = index;
this.logApi('gotoPage', id, index);
},
gotoIndex: function (index) {
this.logApi('gotoIndex', index);
this.children[index].removeClass('previous');
this.children[index].removeClass('next');
this.selected = index;
},
current: function () {
this.logApi('current', this.selected);
this.gotoIndex(this.selected);
},
next: function () {
this.logApi('next', this.selected);
if (this.selected >= this.PageList.length - 1) {
if (this.loop) {
this.reset();
} else {
this.current();
}
} else {
this.gotoIndex(this.selected + 1);
}
},
prev: function () {
if (this.selected <= 0) {
if (this.loop) {
this.reset(true);
} else {
this.current();
}
} else {
this.gotoIndex(this.selected - 1);
}
},
removeTransition: function (index) {
var page = this.PageList[index];
page.content.css('transition', 'none');
},
doTransition: function (index) {
var page = this.PageList[index];
var position = page.position();
page.css('transition', 'all 400ms ease').css('transform', 'translate3d(' + -1 * position.left + 'px, 0, 0)');
},
change: function (name) {
return this.goto(name);
},
load: function (url) {
},
getActivePage: function () {
return this.PageList[this.selected];
},
addPage: function (obj) {
}
});
Polymer({
is: 'pxm-page',
properties: {
title: {
type: String,
value: null
},
backText: {
type: String,
value: null
},
backLink: {
type: String,
value: null
},
href: {
type: String,
notify: true,
value: null,
observer: '_tmplChanged'
},
active: {
type: Boolean,
value: false
},
dialog: {
type: Boolean,
value: false
},
query: { type: Object },
context: { type: Object },
view: { type: Object },
fromPage: { type: Object },
route: { type: String },
url: { type: String },
container: { type: String }
},
created: function () {
var logger = new px.mobile.Logger(this.tagName, { colors: { debug: 'color:orange' } });
px.mobile.utils.addMixin(logger, this);
this.logApi('created', this.id);
px.mobile.PubSub.emit('page:' + this.id + ':init', this);
},
ready: function () {
this.logApi('ready', this.id);
if (this.dialog) {
this.toggleClass('dialog');
}
px.mobile.PubSub.emit('page:' + this.id + ':ready', this);
},
show: function () {
this.logApi('show view', this.id);
this.toggleClass('current', false, this);
},
hide: function () {
this.logApi('hide view', this.id);
this.toggleClass('hidden', true, this);
},
update: function () {
this.logApi('update view', this.id);
},
currentView: function () {
this.logApi('current view', this.id);
this.child()[0].toggleClass('current', true, this);
},
nextView: function () {
this.logApi('next view', this.id);
this.toggleClass('next', true, this);
},
previousView: function () {
this.logApi('previous view', this.id);
this.toggleClass('previous', true, this);
},
contextChanged: function (newContext, oldContext) {
this.logApi('contextChanged', newContext, oldContext);
},
_tmplChanged: function (newVal, oldVal) {
var _this = this, html = '';
if (newVal) {
this.logApi(this.id, 'Load remote html', newVal);
this.importHref(newVal, function (e) {
html = e.target.import.body.innerHTML;
_this.logApi('inject html', _this.id);
_this.logApi('inject px-view html', _this.id);
_this.html(html);
}, function (e) {
_this.logApi('Error loading page', e);
});
}
},
showMenu: function () {
px.mobile.dom('px-app').toggleClass('show-menu');
},
open: function () {
if (this.dialog) {
this.toggleClass('open');
}
},
close: function () {
if (this.dialog) {
this.toggleClass('open');
}
}
});
Polymer({
is: 'pxm-navbar',
properties: {
title: { type: String },
viewContainer: { type: String },
showMenuBtn: {
type: Boolean,
value: true
},
back: {
type: Boolean,
value: false
},
fixed: {
type: Boolean,
value: false
},
open: {
type: Boolean,
value: false
},
views: {
type: Object,
value: {}
},
dynamicNavbar: {
type: Boolean,
value: false
},
menu: {
type: Array,
value: [
{
id: 'home',
title: 'Home',
icon: 'fa fa-lg fa-home',
href: '#',
view: 'home-view'
},
{
id: 'dashboard',
title: 'Dashboard',
icon: 'fa fa-lg fa-dashboard',
href: '#/dashboard',
view: 'dashboard-view'
}
]
}
},
created: function () {
},
attached: function () {
if (this.viewContainer) {
this.views = document.getElementById(this.viewContainer);
}
},
handleMenuClick: function (e) {
console.warn('menu-click', e);
this.toggleMenu();
return false;
},
toggleMenu: function () {
this.fire('toggle-menu', this);
var container = document.getElementById(this.viewContainer);
this.views = container;
if (this.open) {
this.transform('translate(0, 0)', this.$.navbar);
this.transform('translate(-125%, 0)', this.$.menu);
this.transform('translate(0, 0)', container);
} else {
this.transform('translate(30%, 0)', this.$.navbar);
this.transform('translate(0, 0)', this.$.menu);
this.transform('translate(30%, 0)', container);
}
this.open = !this.open;
},
handleMenuSelect: function (e) {
var model = e.model;
console.warn('handleMenuSelect', e, model.item);
this.fire('click', model.item);
if (this.views && this.views.goto) {
this.views.goto(model.item.view);
}
}
});
Polymer({
is: 'pxm-view',
created: function () {
if (!this.inTrans) {
this.inTrans = 'moveFromRight';
this.outTrans = 'moveToLeft';
}
},
attached: function () {
this.fire('pxm-view-ready', this);
},
handleTrack: function (e) {
switch (e.detail.state) {
case 'start':
this.message = 'Tracking started!';
break;
case 'track':
this.message = 'Tracking in progress... ' + e.detail.x + ', ' + e.detail.y;
break;
case 'end':
this.message = 'Tracking ended!';
break;
}
},
properties: {
title: {
type: String,
value: 'View Title'
},
route: { type: String },
autoload: { type: Boolean },
href: {
type: String,
notify: true,
value: null,
observer: '_hrefChanged'
},
inTrans: {
type: String,
value: 'moveFromRight'
},
outTrans: {
type: String,
value: 'moveToLeft'
},
params: { type: Object },
history: { type: Array },
contentCache: { type: Object },
url: { type: String },
pagesContainer: { type: Object },
activePage: { type: Object },
main: { type: Boolean },
dynamicNavbar: { type: Boolean },
router: { type: Object }
},
_hrefChanged: function (newVal, oldVal) {
var _this = this;
var content = Polymer.dom(_this.root).querySelector('content');
if (newVal) {
this.debounce('injectHtml', function () {
console.warn(this.id, 'Load remote html', newVal);
_this.loadHtml(newVal);
}, 1000);
}
},
loadHtml: function (url) {
var _this = this, html = '';
this.importHref(url, function (e) {
html = e.target.import.body.innerHTML;
console.warn('inject px-view html', _this.id);
_this.html(html);
}, function (e) {
console.error('Error loading view', e);
});
},
created: function () {
var logger = new px.mobile.Logger(this.tagName + '-behavior', { colors: { debug: 'color:cadetblue;' } });
px.mobile.utils.addMixin(logger, this);
},
ready: function () {
this.logApi('ready', this.id);
},
hideNavbar: function () {
this.logApi('hideNavbar', this.id);
},
showNavbar: function () {
this.logApi('showNavbar', this.id);
},
hideToolbar: function () {
this.logApi('hideToolbar', this.id);
},
showToolbar: function () {
this.logApi('showToolbar', this.id);
},
destroy: function () {
}
});
Polymer({
is: 'pxm-toolbar',
properties: {
routes: {
type: Object,
value: {}
},
fixed: {
type: Boolean,
value: false
}
},
created: function () {
console.warn(this.tagName, 'created', this);
},
ready: function () {
console.warn(this.tagName, 'ready', this);
if (this.fixed) {
this.toggleClass('position-fixed');
}
},
attached: function () {
console.warn(this.tagName, 'attached', this);
}
});
Polymer({
is: 'pxm-views',
behaviors: [
px.mobile.behaviors.ViewsBehavior,
px.mobile.behaviors.ViewEventsBehavior
],
properties: {
title: {
type: String,
value: 'Predix Mobile View'
},
selected: {
type: Number,
reflectToAttribute: true,
notify: true,
observer: '_setCurrent',
value: 0
},
context: {
type: Object,
value: {}
},
ViewTransitions: {
type: Object,
value: {}
},
views: {
type: Object,
value: {}
},
routes: {
type: Object,
value: {}
},
in: { type: String },
out: { type: String },
selectedClassname: {
type: String,
value: 'et-page-current'
},
loop: {
type: Boolean,
value: true
},
autoRouter: {
type: Boolean,
value: false
},
routerId: { type: String }
}
});
Polymer({
is: 'pxm-list-item',
properties: {
title: {
type: String,
value: 'List Title'
},
image: { type: String },
subtitle: {
type: String,
value: 'List Sub-Title'
},
text: {
type: String,
value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in arcu non augue mollis fermentum. Curabitur sit amet vestibulum orci, vitae laoreet felis.'
}
},
created: function () {
console.warn(this.tagName, 'created');
},
handleClick: function (e) {
this.fire('px-list-item:handleClick', e);
}
});
Polymer({
is: 'pxm-list',
behaviors: [px.list],
properties: {
data: {
type: Array,
value: [
{ title: 'List item 1' },
{
title: 'List item 2',
subtitle: 'Some subtitle'
},
{
title: 'List item 3',
subtitle: 'Some subtitle',
text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
},
{
title: 'List item 4',
subtitle: 'Some subtitle',
text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
image: 'http://placehold.it/80'
}
]
}
},
created: function () {
console.warn(this.tagName, 'created');
},
_clearSelected: function () {
var children = this.$$('li');
console.warn('_clearSelected', children);
},
handleClick: function (event) {
this._clearSelected();
var el = Polymer.dom(event).localTarget;
console.warn('click', el);
el.toggleClass('selected');
this.fire('px-item-click', event);
}
});
var win = window, statusClass = {}, isIE = false;
statusClass[notify.PERMISSION_DEFAULT] = 'alert';
statusClass[notify.PERMISSION_GRANTED] = 'alert alert-success';
statusClass[notify.PERMISSION_DENIED] = 'alert alert-error';
Polymer({
is: 'pxm-notifications',
properties: {
title: {
type: String,
value: 'px notifications'
},
message: {
type: String,
value: 'px notifications',
reflectToAttribute: true
},
status: {
type: String,
value: 'px notifications',
reflectToAttribute: true
},
permissionLevel: {
type: String,
value: 'default',
reflectToAttribute: true
},
permissionsGranted: {
type: String,
reflectToAttribute: true
},
isSupported: {
type: Boolean,
value: false
},
notification: {
type: Object,
value: {
title: 'Sample Notification',
body: 'This is the body of a desktop notification!',
icon: 'http://placehold.it/100'
}
},
messages: {
type: Object,
value: {
'default': 'Click to allow displaying desktop notifications.',
'granted': 'Desktop notifications enabled.',
'notPinned': 'Pin current page in the taskbar in order to receive notifications',
'notSupported': 'Desktop Notifications not supported! Check supported browsers table and projects GitHub page.'
}
}
},
created: function () {
console.warn('INFO', this.tagName, 'created');
},
ready: function () {
console.warn('INFO', this.tagName, 'ready');
},
attached: function () {
console.warn('INFO', this.tagName, 'attached');
this.isSupported = notify.isSupported;
this.permissionLevel = notify.permissionLevel();
this.permissionsGranted = this.permissionLevel === notify.PERMISSION_GRANTED;
try {
isIE = win.external && win.external.msIsSiteMode() !== undefined;
} catch (e) {
}
this.messages[notify.PERMISSION_DENIED] = 'Desktop notifications disabled.';
this.status = this.isSupported ? statusClass[this.permissionLevel] : statusClass[notify.PERMISSION_DENIED];
this.message = this.isSupported ? isIE ? this.messages.notPinned : this.messages[this.permissionLevel] : this.messages.notSupported;
},
requestPermission: function () {
var _this = this;
console.warn('INFO', 'requestPermission');
if (this.permissionLevel === notify.PERMISSION_DEFAULT) {
notify.requestPermission(function () {
_this.permissionLevel = notify.permissionLevel();
_this.permissionsGranted = notify.PERMISSION_GRANTED;
});
}
},
showNotification: function () {
var options = {};
options.icon = this.notification.icon;
options.body = this.notification.body;
console.warn('INFO', 'showNotification', options);
notify.createNotification(this.notification.title, options);
}
});
Polymer({
is: 'pxm-card',
properties: {
title: { type: String },
name: {
type: String,
value: 'John Doe'
},
avatar: {
type: String,
value: 'images/avatar.png'
},
date: {
type: String,
value: 'Monday at 3:47 PM'
},
image: { type: String },
facebook: {
type: Boolean,
value: false
}
}
});
Polymer({
is: 'pxm-modal',
properties: {
title: {
type: String,
value: 'Dialog Title'
},
color: {
type: String,
value: 'bare'
},
iconLeft: { type: String },
iconRight: { type: String },
open: { type: Boolean }
},
created: function () {
var logger = new px.mobile.Logger(this.tagName, { colors: { debug: 'color:orange' } });
px.mobile.utils.addMixin(logger, this);
this.logApi('created', this.id);
},
toggleDialog: function () {
var openIcon = 'fa fa-2x fa-check-circle';
var closeIcon = 'fa fa-2x fa-times-circle';
this.$.dialog.toggleClass('closed', this.$.dialog.hasClass('closed'));
this.$.dialogBtn.icon = this.$.dialog.hasClass('closed') ? openIcon : closeIcon;
},
open: function () {
this.$.dialog.removeClass('closed');
},
close: function () {
this.$.dialog.addClass('closed');
},
toggle: function () {
if (this.open) {
this.close();
} else {
this.open();
}
}
});
Polymer({ is: 'pxm-sidemenu' });