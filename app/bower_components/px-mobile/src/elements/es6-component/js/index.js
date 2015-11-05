'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XElement = (function (_HTMLElement) {
		_inherits(XElement, _HTMLElement);

		function XElement() {
				_classCallCheck(this, XElement);

				_HTMLElement.call(this);
		}

		XElement.prototype.value = function value() {
				var tmpl = document.querySelector('#x-element-template');
				var clone = document.importNode(tmpl.content, true);
				this.createShadowRoot().appendChild(clone);
		};

		// Fires when an instance of the element is created.

		XElement.prototype.createdCallback = function createdCallback() {
				console.log('created', this.attributes, this.id);
				this.value();
		};

		// Fires when an instance was inserted into the document.

		XElement.prototype.attachedCallback = function attachedCallback() {
				console.log('attached', this);
		};

		// Fires when an instance was removed from the document.

		XElement.prototype.detachedCallback = function detachedCallback() {
				console.log('detached', this);
		};

		// Fires when an attribute was added, removed, or updated.

		XElement.prototype.attributeChangedCallback = function attributeChangedCallback(attr, oldVal, newVal) {
				console.log(attr, 'changed', 'from', oldVal, 'to', newVal, this);
		};

		_createClass(XElement, [{
				key: 'html',
				get: function get() {
						return this.body;
				},
				set: function set(val) {
						this.body = val;
				}
		}]);

		return XElement;
})(HTMLElement);

function supportsCustomElements() {
		return 'registerElement' in document;
}

if (supportsCustomElements()) {
		// Good to go!
		document.registerElement('x-element', XElement);
		console.info('Custom elements are supported!');
} else {
		// Use other libraries to create components.
		console.warn('Create custom element with Polyfills');
}