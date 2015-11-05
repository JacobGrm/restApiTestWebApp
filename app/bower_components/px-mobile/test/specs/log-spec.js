/** @test {Logger} */
describe('px.mobile.Logger', function() {
  it('should be defined', function() {
    expect(px.mobile.Logger);
  });
  describe('new px.mobile.log()', function() {
    var logger = null;
    beforeEach(function() {
      logger = new px.mobile.Logger('jasmine');

    });
    it('should have methods: info, warn, debug, error', function(done) {
      assert.ok(logger.info);
      assert.ok(logger.warn);
      assert.ok(logger.debug);
      assert.ok(logger.error);
      done();
    });
    it('info() - should log info to console', function(done) {
      logger.info('test');
      assert.ok(logger.log);
      done();
    });
    it('warn() - should log warn to console', function(done) {
      logger.warn('test');
      assert.ok(logger.log);
      done();
    });
    it('debug() - should log debug to console', function(done) {
      logger.debug('test');
      assert.ok(logger.log);
      done();
    });
    it('error() - should log error to console', function(done) {
      logger.error('test');
      assert.ok(logger.log);
      done();
    });
  });
});
