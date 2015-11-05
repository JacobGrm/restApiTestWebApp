/** @test {Interface} */
describe('Interface', function() {
  var Interface = new px.mobile.Interface('Interface', ['method1']);

  /** @test {Interface#ensureImplements} */
  it('ensureImplements()', function() {
    assert.ok(px.mobile.Interface.ensureImplements);
  });
});
