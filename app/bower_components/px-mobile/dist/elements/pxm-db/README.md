# px.db
The `px.db` element enables developers to access Couchbase Lite methods (when running in a Predix Go container).

> **NOTE:** During development a `json-proxy` module is used and maps requests from the specified paths in the `Gruntfile.js`.

### Overview
The `px.db` element was created to help web developers build applications that work as well offline as they do online.

It enables applications to store data locally while offline,
then synchronize it with the CouchDB API and compatible services when the application is back online,
keeping the user's data in sync no matter where they next login.

```
var db = new px.db('/cblite');

db.put({
  _id: 'test-doc-' + Date.now(),
  name: 'Jonnie',
  age: 28
});

var feed = db.changes()
.on('change', function(change) {
  console.log('Ch-Ch-Changes', change);
})
.on('complete', function(info){console.warn(info);})
.on('error', function(err){console.error(err);});

//feed.cancel();
db.replicate.to('http://example.com/mydb');
```

### Usage
There are two ways to use px.db;

1. You can add the element to your web page and invoke methods by getting ahold of the element by ID
2. You can create a new instance in JavaScript and invoke those instance methods.

###### In HTML:

```
<px-db id="db1"
	base-url="/predixgo"
	onerror="handleError"
	lastresponse="{{data}}"></px-db>
```

```
var db = document.querySelector('#db1').db;
db.get('sync-user1').then(function(resp){
  resp.json().then(function(json){
    console.log(json);
  });
});
```


###### In JavaScript:

```
var db = new px.db('/predixgo');
db.get('sync-user1').then(function(resp){
  resp.json().then(function(json){
    console.log(json);
  });
});
```



### Methods
The following examples provides a way to perform CRUD operations on model.

###### Create database instance:

```
var db = new px.db('/predixgo');
```

###### Create a document:

```
var doc = {
	_id: 'test-doc1',
	name: 'New Doc'
};
db.put(doc).then(function(resp){
	console.log(resp);
}).catch(function(err){
	console.warn(err);
});
```

###### Get document:

```
db.get('test-doc1').then(function(data){
	console.log(data);
	doc = data;
}).catch(function(err){
	console.warn(err);
});
```


###### Update document:

```
doc.name = 'Updated doc1';
db.put(doc).then(function(resp){
	console.log(resp);
}).catch(function(err){
	console.warn(err);
});
```

###### Delete document:

```
db.remove(doc).then(function(resp){
	console.log(resp);
}).catch(function(err){
	console.warn(err);
});
```

###### Get attachment:

```
db.getAttachment('data-card-my-predix-card', 'my-predix-card_1.1.9.zip').then(function(resp){
	console.log(resp); //Blob
}).catch(function(err){
	console.warn(err);
});
```

> NOTE: For a demo visit [/px-db/demo.html](/px-db/demo.html)






