/** @test {Collection} */
describe('Collection', function() {
  var collection = null;
  beforeEach(function() {
    collection = new px.mobile.Collection.extend({
      url: '/default',
      idField: '_id',
      defaults: {
        _id: 'test-doc1',
        _rev: null,
        name: 'test doc',
        title: 'some document',
        type: 'doc',
        channels: ['*']
      }
    });
  });

  it('should set passed properties on collection', function(done) {
    assert.equal(collection.url, '/default');
    done();
  });

});
