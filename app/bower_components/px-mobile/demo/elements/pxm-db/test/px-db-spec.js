/* globals document, describe, xdescribe, xit, it, beforeEach, jasmine, expect */
/* jshint camelcase: false*/
describe('px.db - web component', function() {
  var db, successCallback, errorCallback,
    testDoc = {
      _id: 'test-doc-' + Date.now(),
      _rev: null,
      name: 'test document'
    },
    testLocalDoc = {
      _id: '_local/test-doc-' + Date.now(),
      _rev: null,
      name: 'test document'
    };

  beforeEach(function() {
    db = document.getElementById('db').db;
    db.baseUrl = '/default';
    successCallback = jasmine.createSpy('success');
    errorCallback = jasmine.createSpy('error');
  });


  // TODO:
  xdescribe('Server - APIs that operate at the server level', function() {
    it('GET - /', function() {
      //
    });
    it('GET - /_active_tasks', function() {
      //
    });
    it('GET - /_all_dbs', function() {
      //
    });
    it('POST - /_replicate', function() {
      //
    });
    it('GET - /_session', function() {
      //
    });
    it('GET - /_uuids', function() {
      //
    });

  });

  // TODO:
  describe('Database - APIs that operate on databases', function() {

    xit('PUT - /{db} - should create a database', function() {
      //
    });

    it('GET - /{db} - should get database info', function(done) {
      db.info().then(function(resp) {
        expect(resp.ok).toBe(true);
        expect(resp.status).toBe(200);
        done();
      }, done);
    });

    xit('DELETE - /{db} - should remove a database', function() {
      //
    });

    it('GET - /{db}/_all_docs - should fetch all documents', function(done) {
      db.allDocs({
        include_docs: true,
        limit: 5
      }).then(function(resp) {
        expect(resp.ok).toBe(true);
        expect(resp.status).toBe(200);
        expect(resp.data.update_seq).toBeDefined();
        expect(resp.data.rows).toBeDefined();
        expect(resp.data.total_rows).toBeDefined();
        //expect(resp.rows.length).toBe(5);
        done();
      });
    });
    xit('POST - /{db}/_all_docs - should return documents that match keys', function() {

    });
    xit('POST - /{db}/_bulk_docs', function() {
      //
    });
    xit('GET - /{db}/_changes', function() {
      //
    });
    xit('POST - /{db}/_compact', function() {
      //
    });
    xit('POST - /{db}/_purge', function() {
      //
    });
    xit('POST - /{db}/_temp_view', function() {
      //
    });
  });

  // TODO:
  describe('Documents - APIs that operate on documents', function() {

    it('POST - /{db} - create document with generated _id', function(done) {
      db.post({
        title: 'Test Doc'
      }).then(function(resp) {
        expect(resp.ok).toBe(true);
        expect(resp.status).toBe(201);
        expect(resp.data.id).toBeDefined();
        expect(resp.data.rev).toBeDefined();
        done();
      });
    });

    it('PUT - /{db}/{doc} - create document by _id', function(done) {
      db.put(testDoc).then(function(resp) {
        expect(resp.ok).toBe(true);
        expect(resp.status).toBe(201);
        expect(resp.data.id).toBeDefined();
        expect(resp.data.rev).toBeDefined();
        done();
      });
    });

    it('GET - /{db}/{doc} - get document by _id', function(done) {
      db.get(testDoc._id).then(function(resp) {
        expect(resp.ok).toBe(true);
        expect(resp.status).toBe(200);
        expect(resp.data._id).toBeDefined();
        expect(resp.data._rev).toBeDefined();
        done();
      }, done);
    });

    it('DELETE - /{db}/{doc} - remove document by _id', function(done) {
      db.get(testDoc._id).then(function(resp) {
        expect(resp.status).toBe(200);
        expect(resp.data._id).toBeDefined();
        expect(resp.data._rev).toBeDefined();
        db.remove(resp.data._id, resp.data._rev).then(function(res) {
          expect(res.ok).toBe(true);
          done();
        }, done);
      }, done);

    });

    xit('PUT - /{db}/{doc}/{attachment}', function() {
      //
    });
    xit('GET - /{db}/{doc}/{attachment}', function() {
      //
    });
    xit('DELETE - /{db}/{doc}/{attachment}', function() {
      //
    });
  });

  // TODO:
  describe('Local Document - APIs that operate on local documents', function() {
    it('PUT - /{db}/{local-doc-id}', function(done) {
      db.put(testLocalDoc).then(function(resp) {
        expect(resp.ok).toBe(true);
        expect(resp.status).toBe(201);
        expect(resp.data.id).toBeDefined();
        expect(resp.data.rev).toBeDefined();
        done();
      }, done);
    });
    it('GET - /{db}/{local-doc-id}', function(done) {
      db.get(testLocalDoc._id).then(function(resp) {
        expect(resp.ok).toBe(true);
        expect(resp.status).toBe(200);
        expect(resp.data._id).toBeDefined();
        expect(resp.data._rev).toBeDefined();
        done();
      }, done);
    });
    it('DELETE - /{db}/{local-doc-id}', function(done) {
      db.get(testLocalDoc._id).then(function(resp) {
        expect(resp.status).toBe(200);
        expect(resp.data._id).toBeDefined();
        expect(resp.data._rev).toBeDefined();
        db.remove(resp.data._id, resp.data._rev).then(function(res) {
          expect(res.ok).toBe(true);
          done();
        }, done);
      });
    });
  });


  // TODO:
  xdescribe('Design Document - APIs that operate on design documents', function() {
    it('PUT - /{db}/{design-doc-id}', function() {
      //
    });
    it('GET - /{db}/{design-doc-id}', function() {
      //
    });
    it('DELETE - /{db}/{design-doc-id}', function() {
      //
    });

    it('PUT - /{db}/{design-doc-id}/{attachment}', function() {
      //
    });
    it('GET - /{db}/{design-doc-id}/{attachment}', function() {
      //
    });
    it('DELETE - /{db}/{design-doc-id}/{attachment}', function() {
      //
    });

    it('GET - /{db}/{design-doc-id}/_view/{view-name}', function() {
      //
    });
    it('POST - /{db}/{design-doc-id}/_view/{view-name}', function() {
      //
    });

  });



});
