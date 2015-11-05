/** @test {BaseClass} */
describe('BaseClass', function() {
  var myClass = new px.mobile.BaseClass('BaseClass');

  /** @test {BaseClass#constructor} */
  it('constructor()', function() {
    assert.ok(myClass, 'Should ..');
  });
});
