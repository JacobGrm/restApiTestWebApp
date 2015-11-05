/** @test {ServiceLocator} */
describe('Service Locator', function() {
  var app = new px.mobile.App();
  app.services.register('mySerivce', {
    myMethod: function() {}
  });


  it("should resolve service", function(done) {
    assert.ok(app.services.resolve('mySerivce').myMethod);
    done();
  });

});
