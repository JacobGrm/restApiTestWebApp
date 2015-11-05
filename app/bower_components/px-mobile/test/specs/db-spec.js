/** @test {DB} */
describe('px.mobile.DB', function() {
  var sandbox = window.sandbox = sinon.sandbox;


  var db = null,
    testAttachmentDoc = 'test-doc-attachment-' + Date.now(),
    successCallback, errorCallback,
    testObj = {
      _id: 'test-' + Date.now(),
      title: 'Test Doc'
    },
    docs = [{
      _id: 'test-doc-1-' + Date.now(),
      name: 'Test Doc 1'
    }, {
      _id: 'test-doc-2-' + Date.now(),
      name: 'Test Doc 2'
    }, {
      _id: 'test-doc-3-' + Date.now(),
      name: 'Test Doc 3'
    }];

  before(function() {
    sandbox.useFakeServer();
    this.server = sinon.fakeServer.create();

    window.db = db = new pxMobile.DB('test', {
      baseUrl: '/default'
    });
  });


  it('should be defined', function() {
    assert.ok(pxMobile.DB);
    assert.ok(px.mobile.DB);
  });

  it('should have methods: allDocs, get, put, post, remove, bulkDocs, getAttachment, saveAttachment', function(done) {
    assert.ok(db.allDocs);
    assert.ok(db.get);
    assert.ok(db.post);
    assert.ok(db.put);
    assert.ok(db.remove);
    assert.ok(db.getAttachment);
    assert.ok(db.saveAttachment);
    done();
  });

  xdescribe('Changes', function() {
    var changes, changeHandlers = {};

    beforeEach(function() {
      changeHandlers.changeHandler = function(done) {
        done();
      };
      changeHandlers.completeHandler = function(done) {
        done();
      };
      changeHandlers.errorHandler = function(done) {
        done();
      };
      changes = db.changes({
          since: 'now',
          live: true,
          interval: 1000,
          include_docs: true
        })
        .on('change', changeHandlers.changeHandler)
        .on('complete', changeHandlers.completeHandler)
        .on('error', changeHandlers.errorHandler);

      //jasmine.clock().install();
    });

    afterEach(function() {
      //jasmine.clock().uninstall();
      changes.cancel();
    });

    /** @test {DB#changes} */
    it('changes() - should request changes and invoke callbacks on events', function(done) {

      //assert.ok(changeHandlers.changeHandler).not.toHaveBeenCalled();

      setTimeout(function() {
        console.warn(changeHandlers.changeHandler);
        assert.ok(changeHandlers.changeHandler);
        done();
      }, 2000);
    });

  });

  /** @test {DB#info} */
  it('info() - should resolve promise on success with database info', function(done) {
    db.info().then(function(resp) {
      assert.equal(resp.status, 200);
      assert.ok(resp.data);
      assert.ok(resp.data.db_name);
      assert.ok(resp.data.update_seq);

      done();
    }, window.failSpec);
  });

  /** @test {DB#bulkDocs} */
  it('bulkDocs(docs) - should resolve promise on success', function(done) {
    db.bulkDocs(docs).then(function(resp) {
      docs = resp.data;
      assert.equal(resp.status, 201);
      assert.equal(resp.data.length, 3);
      done();
    }, window.failSpec);
  });

  /** @test {DB#bulkDocs} */
  it('bulkDocs(docs) - should remove doc if _delete flag is set', function(done) {
    docs.forEach(function(doc) {
      if (doc._rev) {
        doc._deleted = true;
      }
    });
    db.bulkDocs(docs).then(function(resp) {
      docs = resp.data;
      assert.equal(resp.status, 201);
      assert.equal(resp.data.length, 3);
      done();
    }, window.failSpec);
  });

  /** @test {DB#allDocs} */
  it('allDocs(options) - should resolve promise on success', function(done) {
    db.allDocs({
      limit: 5,
      include_docs: true
    }).then(function(resp) {
      assert.equal(resp.status, 200);
      assert.ok(resp.data.rows);
      assert.equal(resp.data.rows.length, 5);
      done();
    }, window.failSpec);
  });


  /** @test {DB#put} */
  it('put(doc) - should resolve promise on success', function(done) {
    db.put(testObj).then(function(resp) {
      assert.equal(resp.status, 201);
      assert.ok(resp.data.rev);
      done();
    });
  });

  /** @test {DB#get} */
  it('get(id) - should resolve promise on success', function(done) {
    db.get(testObj._id).then(function(resp) {
      assert.equal(resp.status, 200);
      assert.ok(resp.data._rev);
      done();
    }, window.failSpec);
  });

  /** @test {DB#remove} */
  it('remove(id, rev) - should resolve promise on success', function(done) {
    db.get(testObj._id).then(function(resp) {
      testObj._rev = resp.data._rev;
      db.remove(testObj._id, testObj._rev).then(function(res) {
        assert.equal(res.status, 200);
        done();
      }, window.failSpec);
    });
  });

  /** @test {DB#post} */
  it('post(doc) - should insert document with generated id and resolve promise on success.', function(done) {
    db.post({
      title: 'New Doc'
    }).then(function(resp) {
      assert.equal(resp.status, 201);
      assert.ok(resp.data.id);
      assert.ok(resp.data.rev);
      done();
    }, window.failSpec);
  });



  /** @test {DB#saveAttachment} */
  it('saveAttachment(id, rev, filename, type, file) - should save file attachment',
    function(done) {
      var aFileParts = ['<a id="a"><b id="b">hey!</b></a>'];
      var myBlob = new Blob(aFileParts, {
        type: 'text/html'
      });
      db.put({
        _id: testAttachmentDoc
      }).then(function(resp) {
        assert.equal(resp.ok, true);
        db.get(testAttachmentDoc).then(function(resp) {
          assert.equal(resp.ok, true);
          db.saveAttachment(resp.data._id, resp.data._rev, 'file.html', myBlob.type,
            myBlob).then(function(resp) {
            assert.equal(resp.ok, true);
            done();
          }, window.failSpec);
        }, window.failSpec);
      }, window.failSpec);

    });

  /** @test {DB#getAttachment} */
  it('getAttachment(id, filename) - should return file attachment', function(done) {
    db.getAttachment(testAttachmentDoc, 'file.html').then(function(resp) {
      assert.equal(resp.ok, true);
      done();
    }, window.failSpec);
  });


});
