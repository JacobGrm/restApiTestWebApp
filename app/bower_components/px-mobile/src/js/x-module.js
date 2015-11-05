class CustomFramework {
		constructor() {
				console.warn('CustomFramework');
		}
		static extend(prototype, api) {
				if (prototype && api) {
						Object.getOwnPropertyNames(api).forEach(function(n) {
								var pd = Object.getOwnPropertyDescriptor(prototype, n);
								if (pd) {
										Object.defineProperty(n, api, prototype);
								}
						}, this);
				}
				return prototype || api;
		}
}
/*
 This is a xModule element like Polymer's dom-module element.
 It enables you to register a new custom element component.
*/
class XModule extends HTMLElement {
		constructor() {
				super()
				console.warn('New custom element!');
				return document.createElement('x-module')
				this.register(this.id)
		}

	  register(id){
			this.id = id || this.tagName;
		}

		value() {
				//1st node is always a template
				this.tmpl = this.children[0];
				//2nd node is always a script
				this.script = this.children[1];
				let clone = document.importNode(this.tmpl.content, true);
				this.createShadowRoot().appendChild(clone);
		}

		createdCallback() {
				console.log('created', this.children, this.id)
						this.value()
		}

		attachedCallback() {
				console.log('attached', this);
		}

		detachedCallback() {
				console.log('detached', this);
		}

		attributeChangedCallback(attr, oldVal, newVal) {
				console.log(attr, 'from', oldVal, 'to', newVal, this);
		}
}

document.registerElement('x-module', XModule);

//Define custom element that wilus to create custom elements.
//document.registerElement('custom-element', CustomElement);
var JSInput = function(){};
CustomFramework.extend(JSInput.prototype, XModule)

console.log(JSInput);
