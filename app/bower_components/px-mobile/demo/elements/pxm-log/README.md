# px-mobile
This repository contains the web components for PX Mobility.


## Overview
This repository contains many web elements that can be used in your application. The elements are categoriezed as follows:

#### Visual

1. [px-app](/px-app)
9. px-card
10. [pg-card](/pg-card)
8. px-deck
7. [px-view](/px-view)


#### Non Visual

1. [px-collection](/px-collection)
4. [px-db](/px-db)
5. [px-log](/px-log)
6. [px-model](/px-model)

## Getting Started
First clone the repo, execute the following:

```
$ git clone https://github.build.ge.com/pxm/px-mobile
```

Then `cd` into the `px-mobile` folder and execute the following:

```
$ npm install
```

### API Documentation and examples
From the px-mobile directory

```
$ grunt serve
```

This will start a local server and open your default browser to  [http://localhost:8008](http://localhost:8008).

To view individual demos you can visit the `http://localhost:8008/src/{component-name}` page.






## px
The px namespace is a global namespace that is used by this px-mobile. You can test out the API's by opening your developers console and typing px.* to view a list of available objects and methods.





## px.db
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






## px-collection
The `px-collection` element enables developers to query for documents.

###### Example implementation:

```

<dom-module id="collection-list">
  <template>
    <px-collection id="resource-collection"
      base-url="/default"
      params='{"startkey": "resource-a", "endkey": "resource-z", "limit": 10}'
      lastresponse="{{data}}"></px-collection>
   <ol>
     <template is="dom-repeat" items="{{data.rows}}">
       <li><span>{{item.id}}</span> <span>{{item.value.rev}}</span></li>
     </template>
   </ol>
 </template>
 <script>
   Polymer({
     is: 'collection-list'
   });
 </script>
</dom-module>

<collection-list id="sample-collection"></collection-list>
```

> NOTE: For a live demo visit [/px-collection/demo.html](/px-collection/demo.html)


## px-model
The `px-model` element enables developers to use CRUD operations on a model object.


###### Example implementation:

```
<dom-module id="example-model">
  <template>
    <px-model id="model1"
      auto
      key="data-card-my-predix-card"
      last-response="{{data}}"></px-model>
    <dl class="">
      <dt>ID:</dt><dd>{{data._id}}</dd>
      <dt>Description:</dt><dd>{{data.description}}</dd>
    </dl>
  </template>

  <script>
    Polymer({
      is: 'example-model'
    });
  </script>
</dom-module>
```



## pg-card
This `pg-card` element enables legacy Predix Go 14.x cards to run in the world of web components.

###### Example implementation:

```
<dom-module id="demo-pg-card">
	<template>
		<pg-card id="example-pg-card" title="PG-Card" subtitle="A Predix Go web component card.">
			<p>This can be any type of HTML content.</p>
		</pg-card>
	</template>
</dom-module>
<script>
	Polymer({
			is: 'demo-card',
			init: function(){
					// this is where you can do some initialization of your card
			},
			behaviors: [pg.card, px.card]
	});
</script>
```

> NOTE: For a demo visit [/pg-card/demo.html](/pg-card/demo.html)


## px-view
The `px-view` element enables developers to manage multiple `px-deck` and `px-card` elements.

> NOTE: For a demo visit [/px-view/demo.html](/px-view/demo.html)



###### Example implementation:

```
<px-view id="sandbox-view">

  <px-deck id="deck-1">
    <px-card id="card-1">
      deck-1 - card 1
    </px-card>
    <px-card id="card-2">
      deck-1 - card 2
    </px-card>
  </px-deck>

	<px-deck id="deck-2">
    <px-card id="card-3">
      deck-2 - card 3
    </px-card>
    <px-card id="card-4">
      deck-2 - card 4
    </px-card>
  </px-deck>

</px-view>
```
