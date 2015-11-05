HTMLImports.whenReady(function(){
	var app = window.app = new px.mobile.App('myApp', {
		debug: true,
		el: '#myApp',
		viewContainer: document.getElementById('appViews'),
		navbar: document.getElementById('appNavbar'),
		session: {
			user: null
		},
		templateData: {
			menu: [{
				id: 'about',
				title: 'About',
				icon: 'fa fa-g fa-home',
				href: '#/',
				view: 'aboutView'
			}, {
				id: 'dashboard',
				title: 'Dashboard',
				icon: 'fa fa-g fa-dashboard',
				href: '#/dashboard',
				view: 'dashboardView'
			}, {
				id: 'cards',
				title: 'Cards',
				icon: 'fa fa-g fa-th',
				href: '#/cards',
				view: 'cardsView'
			}, {
				id: 'components',
				title: 'Components',
				icon: 'fa fa-g fa-bar-chart',
				href: '#/components',
				view: 'componentsView'
			}]
		},
		router: new px.mobile.SimpleRouter('test', {
			mode: 'hash',
			routes: {
				'/': function() {
					console.log('default route');
				},
				'/dashboard/': function() {
					console.log('dashboard route');
				},
				'/about/': function() {
					console.log('about route');
				}
			}
		})
	});



	var pubsub = new px.mobile.PubSub('emPubSub');
	var db = new px.mobile.DB('emDB', {
		baseUrl: 'http://pmapi/cdb/predixgo'
	});
	var http = new px.mobile.HTTP('emHTTP', {
		baseUrl: '/'
	});

	app.services.register('db', db);
	app.services.register('http', http);
	app.services.register('pubsub', pubsub);

});
