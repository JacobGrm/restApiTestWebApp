  /** @test {Core} */
  describe('Core', function() {
    var app = new px.mobile.Core();
    it('should..', function(done) {
      done();
    });
    /** @test {Core#start} */
    it('start()', function() {
      assert.ok(app.start, 'Should start');
    });
    /** @test {Core#stop} */
    it('stop()', function() {
      assert.ok(app.stop, 'Should stop');
    });
  });
