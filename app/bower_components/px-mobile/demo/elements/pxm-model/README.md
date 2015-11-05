# px-model




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
</dom-module>```
