/* globals document, describe, xdescribe, xit, it, beforeEach, jasmine, expect */
/* jshint camelcase: false*/

describe('px.mobile.Collection', function() {
  var myCollection = null;
  var db = null,
    successCallback, errorCallback,
    testObj = {
      _id: 'test-' + Date.now(),
      title: 'Test Doc'
    };
  beforeEach(function() {
    myCollection = new px.mobile.Collection('myCollection', {
      baseUrl: 'http://localhost:5984/default/_all_docs',
      idField: '_id',
      model: {
        _id: 'test-doc1',
        _rev: null,
        name: 'test doc',
        title: 'some document',
        type: 'doc',
        channels: ['*']
      }
    });
    console.log(myCollection);
  });

  it('should set passed properties on collection', function(done) {
    expect(myCollection.baseUrl).toBe('http://localhost:5984/default/_all_docs');
    done();
  });

  xit('should fetch data and resolve promise on success.', function(done) {
    myCollection.fetch().then(function(resp) {
      expect(resp.status).toBe(200);
      done();
    });
  });

});
