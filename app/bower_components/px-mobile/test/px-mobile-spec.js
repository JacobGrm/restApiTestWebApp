/* globals document, describe, xdescribe, xit, it, beforeEach, jasmine, expect */
/* jshint camelcase: false*/
describe('px', function() {

  var db = null,
    successCallback, errorCallback,
    testObj = {
      _id: 'test-' + Date.now(),
      title: 'Test Doc'
    };
  var app = {};

  app = new px.mobile.App();
  db = new px.mobile.DB('db1', {
    baseUrl: '/predixgo'
  });

  it('should be defined', function() {
    expect(px).toBeDefined();
  });


  // TODO: PX - MOBILE
  describe('px.mobile', function() {

    it('should be defined', function() {
      expect(px.mobile).toBeDefined();
    });
    it('should be ES6 version', function() {
      expect(px.mobile.version).toBe('es6');
    });

    // TODO: App
    describe('px.mobile.App', function() {
      beforeEach(function() {
        console.warn('App', app);
      });

      it('should be defined', function() {
        expect(app).toBeDefined();
      });
      it('should register a service', function() {
        app.services.register('db', db);
        expect(app.services.resolve('db')).toBeDefined();
      });
    });



    // TODO: PX-MOBILE-LOG
    describe('px.mobile.log', function() {
      it('should be defined', function() {
        expect(px.mobile.Logger).toBeDefined();
      });
      describe('new px.mobile.log()', function() {
        var logger = null;
        beforeEach(function() {
          logger = new px.mobile.Logger('jasmine');
          logger.log = jasmine.createSpy('log');
        });
        it('should have methods: info, warn, debug, error', function(done) {
          expect(logger.info).toBeDefined();
          expect(logger.warn).toBeDefined();
          expect(logger.debug).toBeDefined();
          expect(logger.error).toBeDefined();
          done();
        });
        it('info() - should log info to console', function(done) {
          logger.info('test');
          expect(logger.log).toHaveBeenCalled();
          done();
        });
        it('warn() - should log warn to console', function(done) {
          logger.warn('test');
          expect(logger.log).toHaveBeenCalled();
          done();
        });
        it('debug() - should log debug to console', function(done) {
          logger.debug('test');
          expect(logger.log).toHaveBeenCalled();
          done();
        });
        it('error() - should log error to console', function(done) {
          logger.error('test');
          expect(logger.log).toHaveBeenCalled();
          done();
        });
      });
    });



    // TODO: PX-MOBILE-UTILS
    describe('px.mobile.utils', function() {
      it('should be defined', function() {
        expect(px.mobile.utils).toBeDefined();
      });
      it('extend(o1, o2) - should copy all properties from right to left.', function(done) {
        var obj1 = {
          name: 'jonnie'
        };
        var obj2 = {
          age: 28
        };
        var result = px.mobile.utils.extend(obj1, obj2);
        expect(result.age).toBe(28);
        expect(result.name).toBe('jonnie');
        done();
      });

      it('mix - should mix (x) objects into one', function(done) {
        var cake = px.mobile.utils.mix({
          eggs: 2,
          large: true
        }, {
          butter: 1,
          salted: true
        }, {
          flour: '3 cups'
        }, {
          sugar: 'sure!'
        });
        expect(cake.eggs).toBe(2);
        expect(cake.salted).toBe(true);
        expect(cake.flour).toBe('3 cups');
        done();
      });
    });



    describe('px.mobile.Base', function() {
      it('should extend passed object as class', function(done) {
        var MyClass = px.mobile.Base.extend({
          method1: function() {
            console.log('do this');
          }
        });
        var myInstance = new MyClass();
        expect(myInstance.method1).toBeDefined();
        done();
      });
    });



    // TODO: px.mobile.dom
    describe('px.mobile.dom', function() {
      describe('Element extensions', function() {
        var el = null;
        beforeEach(function() {
          el = px.mobile.dom('#sandbox');
        });
        it('Element.addClass(className) - should add the class to the element.', function() {
          el.addClass('testing');
          expect(el.className).toContain('testing');
        });
        it('Element.removeClass(className) - should remove the class to the element.', function() {
          el.removeClass('testing');
          expect(el.className).not.toContain('testing');
        });
        it('Element.toggleClass(className) - should add/remove class from element', function() {
          el.toggleClass('sandbox');
          expect(el.className).toContain('sandbox');
          el.toggleClass('sandbox');
          expect(el.className).not.toContain('sandbox');
        });
        it('Element.hasClass(className) - should add the class to the element.', function() {
          el.addClass('testing');
          expect(el.hasClass('testing')).toBe(true);
          el.removeClass('testing');
          expect(el.hasClass('testing')).toBe(false);
        });

        it('Element.attr(name, value) - should get/set the attribute on the element.', function() {
          el.attr('title', 'Test Element');
          expect(el.attr('title')).toBe('Test Element');
        });

        it('Element.html() - should get/set the html in the element.', function() {
          el.html('<h1>Sandbox</h1>');
          expect(el.html()).toContain('<h1>Sandbox</h1>');
        });
        it('Element.text() - should get/set the text content in the element.', function() {
          expect(el.text()).toContain('Sandbox');
        });
      });

      it('dom.extend({}, obj1, obj2) - should return extended object.', function() {
        var obj = {};
        var obj1 = {
          version: '1.0'
        };
        var obj2 = {
          debug: true
        };
        px.mobile.dom.extend(obj, obj1, obj2);

        expect(obj.version).toBeDefined();
        expect(obj.debug).toBeDefined();
      });
      it('dom.extend({}, obj1, obj2) - should return extended nested object.', function() {
        var obj = {};
        var obj1 = {
          version: '1.0',
          session: {
            user: {
              username: 'jonnie'
            }
          }
        };
        var obj2 = {
          debug: true,
          auth: {
            login: function() {},
            logout: function() {}
          }
        };
        px.mobile.dom.extend(obj, obj1, obj2);

        expect(obj.version).toBeDefined();
        expect(obj.debug).toBeDefined();
        expect(obj.session).toBeDefined();
        expect(obj.session.user.username).toBeDefined();
        expect(obj.auth.login).toBeDefined();
        expect(obj.auth.logout).toBeDefined();
      });
    });



    // TODO: px.mobbile.views

    describe('px.mobile.views', function() {
      it('shold be defined', function() {
        expect(px.mobile.View).toBeDefined();
        expect(px.mobile.Views).toBeDefined();
      });
      describe('Views', function() {
        var appViews = null;
        var exampleViews = [{
          id: 'view0',
          title: 'view 0'
        }, {
          id: 'view1',
          title: 'view 1'
        }, {
          id: 'view2',
          title: 'view 2'
        }, {
          id: 'view3',
          title: 'view 3'
        }, {
          id: 'view4',
          title: 'view 4'
        }, {
          id: 'view5',
          title: 'view 5'
        }];

        beforeEach(function() {
          appViews = new px.mobile.Views({
            id: 'appjsViews',
            selected: '0',
            views: exampleViews
          });
        });

        it('should select the correct view', function() {
          expect(appViews.getSelectedIndex()).toBe(0);
          appViews.selectView('view1');
          expect(appViews.getSelectedIndex()).toBe(1);
          expect(appViews.selected).toBe(1);
        });

        it('nextView() - should select next view and not loop.', function() {
          expect(appViews.getSelectedIndex()).toBe(0);
          expect(appViews.nextView()).toBe(1);
          expect(appViews.nextView()).toBe(2);
          expect(appViews.nextView()).toBe(3);
          expect(appViews.nextView()).toBe(4);
          expect(appViews.nextView()).toBe(5);
          expect(appViews.nextView()).toBe(0);
          expect(appViews.nextView()).toBe(1);
        });

        it('prevView() - should select the prev view.', function() {
          expect(appViews.nextView()).toBe(1);
          expect(appViews.nextView()).toBe(2);
          expect(appViews.nextView()).toBe(3);
          expect(appViews.nextView()).toBe(4);
          expect(appViews.nextView()).toBe(5);
          expect(appViews.prevView()).toBe(4);
          expect(appViews.prevView()).toBe(3);
          expect(appViews.prevView()).toBe(2);
          expect(appViews.prevView()).toBe(1);
          expect(appViews.prevView()).toBe(0);
          expect(appViews.prevView()).toBe(0);
          expect(appViews.prevView()).not.toBe(-1);

        });

      });
    });

    describe('px.mobile.Router', function() {
      var myRouter = null,
        routeCallback,
        routeHandlers = {};
      routeCallback = jasmine.createSpy('route');
      routeHandlers.homeRoute = jasmine.createSpy('homeRoute');
      routeHandlers.aboutRoute = jasmine.createSpy('aboutRoute');
      routeHandlers.listRoute = jasmine.createSpy('listRoute');
      routeHandlers.detailRoute = jasmine.createSpy('detailRoute');
      myRouter = new px.mobile.Router('app', {
        routes: {
          '/': routeHandlers.homeRoute,
          '/about': routeHandlers.aboutRoute,
          '/users': routeHandlers.listRoute,
          '/users/:action/:id': routeHandlers.detailRoute
        }
      });
      myRouter.start();

      beforeEach(function() {

      });

      it('should be defined', function(done) {
        expect(px.mobile.Router).toBeDefined();
        done();
      });

      it('should have routes defined', function(done) {
        window.myRouter = myRouter;
        expect(myRouter.routes).toBeDefined();
        done();
      });

      it('on(route, cb) - invokes route when matched', function(done) {
        myRouter.on('/about', function(req, res) {
          expect(req).toBeDefined();
          expect(res).toBeDefined();
          done();
        });
        myRouter.navigate('/about');
      });


      it('on("/users/:action/:id", callback) - should invoke callback if route matches', function(done) {
        myRouter.on('/users/:action/:id', function(req, res) {
          console.warn('callback', req, res);
          expect(req).toBeDefined();
          expect(res).toBeDefined();
          expect(req.url).toBe(window.location.origin + '/users/edit/99');
          expect(req.pathname).toBe('/users/edit/99');
          expect(req.params.action).toBe('edit');
          expect(req.params.id).toBe('99');
          done();
        });

        myRouter.navigate('/users/edit/99', {
          data: testObj
        });
      });


      xit('should resolve route once resolve property is resolved', function(done) {
        var app = new px.mobile.App();

        app.services.register('router', new px.mobile.Router('default', {
          routes: {
            '/users': {
              callback: function(req, res) {
                expect(req.users).toBeDefined();
                done();
                console.warn('route callback', req, res);
              },
              resolve: {
                users: function() {
                  return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                      resolve({});
                    }, 1000);
                  });
                }
              }
            }
          }
        }));
        app.services.resolve('router').navigate('/users');
      });

      it(' when(route) - should resolve promise when hash matches', function(done) {
        app.services.resolve('router').when('/users').then(function(req, res) {
          expect(res).toBeDefined();
          expect(req).toBeDefined();
          done();
        });
        app.services.resolve('router').navigate('/users');
      });
    });


  });
});
