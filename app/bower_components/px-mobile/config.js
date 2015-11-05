System.config({
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
    ]
  },
  "paths": {
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js",
    "*": "*.js"
  },
  "bundles": {
    "dist/bundle": [
      "npm:core-js@0.9.18/library/modules/$.fw",
      "npm:core-js@0.9.18/library/modules/$.def",
      "npm:core-js@0.9.18/library/modules/$.get-names",
      "npm:core-js@0.9.18/library/fn/object/create",
      "npm:core-js@0.9.18/library/modules/$.assert",
      "npm:core-js@0.9.18/library/modules/$.ctx",
      "npm:babel-runtime@5.8.25/helpers/class-call-check",
      "npm:core-js@0.9.18/library/fn/object/get-own-property-names",
      "npm:core-js@0.9.18/library/fn/object/define-property",
      "npm:core-js@0.9.18/library/modules/$.shared",
      "npm:core-js@0.9.18/library/modules/$.uid",
      "npm:core-js@0.9.18/library/modules/$.redef",
      "npm:core-js@0.9.18/library/modules/$.keyof",
      "npm:core-js@0.9.18/library/modules/$.enum-keys",
      "npm:babel-runtime@5.8.25/helpers/create-class",
      "npm:core-js@0.9.18/library/modules/$.assign",
      "npm:core-js@0.9.18/library/modules/$.unscope",
      "npm:core-js@0.9.18/library/modules/$.iter",
      "npm:core-js@0.9.18/library/modules/$.iter-define",
      "npm:core-js@0.9.18/library/modules/$.string-at",
      "npm:core-js@0.9.18/library/modules/core.iter-helpers",
      "npm:core-js@0.9.18/library/modules/$.iter-call",
      "npm:core-js@0.9.18/library/modules/$.iter-detect",
      "src/js/pubsub",
      "npm:core-js@0.9.18/library/modules/es6.object.to-string",
      "npm:core-js@0.9.18/library/modules/$.for-of",
      "npm:core-js@0.9.18/library/modules/$.same",
      "npm:core-js@0.9.18/library/modules/$.species",
      "npm:core-js@0.9.18/library/modules/$.invoke",
      "npm:core-js@0.9.18/library/modules/$.dom-create",
      "npm:process@0.10.1/browser",
      "npm:core-js@0.9.18/library/modules/$.mix",
      "src/js/interface",
      "src/js/http",
      "src/js/core",
      "src/js/service-locator",
      "src/js/db",
      "src/js/router",
      "npm:core-js@0.9.18/library/modules/$.collection-strong",
      "npm:core-js@0.9.18/library/modules/$.collection",
      "npm:core-js@0.9.18/library/modules/$.collection-to-json",
      "src/js/page",
      "src/js/pages",
      "src/js/view",
      "npm:core-js@0.9.18/library/modules/$",
      "npm:core-js@0.9.18/library/modules/es6.object.statics-accept-primitives",
      "npm:babel-runtime@5.8.25/core-js/object/create",
      "npm:core-js@0.9.18/library/modules/$.set-proto",
      "npm:babel-runtime@5.8.25/core-js/object/get-own-property-names",
      "npm:babel-runtime@5.8.25/core-js/object/define-property",
      "npm:core-js@0.9.18/library/modules/$.wks",
      "npm:core-js@0.9.18/library/modules/es6.object.assign",
      "npm:core-js@0.9.18/library/modules/es6.array.iterator",
      "npm:core-js@0.9.18/library/modules/es6.string.iterator",
      "npm:core-js@0.9.18/library/modules/es6.array.from",
      "npm:process@0.10.1",
      "src/js/interfaces",
      "src/js/app",
      "npm:core-js@0.9.18/library/modules/es6.map",
      "npm:core-js@0.9.18/library/modules/es7.map.to-json",
      "src/js/views",
      "npm:core-js@0.9.18/library/fn/object/get-own-property-descriptor",
      "npm:core-js@0.9.18/library/modules/es6.object.set-prototype-of",
      "npm:core-js@0.9.18/library/modules/$.cof",
      "npm:core-js@0.9.18/library/fn/object/assign",
      "npm:core-js@0.9.18/library/modules/web.dom.iterable",
      "npm:core-js@0.9.18/library/fn/array/from",
      "github:jspm/nodelibs-process@0.1.1/index",
      "npm:core-js@0.9.18/library/fn/map",
      "npm:babel-runtime@5.8.25/core-js/object/get-own-property-descriptor",
      "npm:core-js@0.9.18/library/fn/object/set-prototype-of",
      "npm:core-js@0.9.18/library/modules/es6.symbol",
      "npm:babel-runtime@5.8.25/core-js/object/assign",
      "npm:core-js@0.9.18/library/fn/get-iterator",
      "npm:babel-runtime@5.8.25/core-js/array/from",
      "github:jspm/nodelibs-process@0.1.1",
      "npm:babel-runtime@5.8.25/core-js/map",
      "npm:babel-runtime@5.8.25/helpers/get",
      "npm:babel-runtime@5.8.25/core-js/object/set-prototype-of",
      "npm:core-js@0.9.18/library/fn/object/get-own-property-symbols",
      "npm:babel-runtime@5.8.25/core-js/get-iterator",
      "npm:core-js@0.9.18/library/modules/$.task",
      "src/js/simple-router",
      "npm:babel-runtime@5.8.25/helpers/inherits",
      "npm:babel-runtime@5.8.25/core-js/object/get-own-property-symbols",
      "src/js/dom",
      "npm:core-js@0.9.18/library/modules/es6.promise",
      "src/js/utils",
      "src/js/log",
      "npm:core-js@0.9.18/library/fn/promise",
      "src/js/base",
      "npm:babel-runtime@5.8.25/core-js/promise",
      "src/js/HTTP",
      "src/js/model",
      "src/js/collection",
      "src/js/main"
    ],
    "demo/bundle": [
      "npm:core-js@0.9.18/library/modules/$.fw",
      "npm:core-js@0.9.18/library/modules/$.def",
      "npm:core-js@0.9.18/library/modules/$.get-names",
      "npm:core-js@0.9.18/library/fn/object/create",
      "npm:core-js@0.9.18/library/modules/$.assert",
      "npm:core-js@0.9.18/library/modules/$.ctx",
      "npm:babel-runtime@5.8.25/helpers/class-call-check",
      "npm:core-js@0.9.18/library/fn/object/get-own-property-names",
      "npm:core-js@0.9.18/library/fn/object/define-property",
      "npm:core-js@0.9.18/library/modules/$.shared",
      "npm:core-js@0.9.18/library/modules/$.uid",
      "npm:core-js@0.9.18/library/modules/$.redef",
      "npm:core-js@0.9.18/library/modules/$.keyof",
      "npm:core-js@0.9.18/library/modules/$.enum-keys",
      "npm:babel-runtime@5.8.25/helpers/create-class",
      "npm:core-js@0.9.18/library/modules/$.assign",
      "npm:core-js@0.9.18/library/modules/$.unscope",
      "npm:core-js@0.9.18/library/modules/$.iter",
      "npm:core-js@0.9.18/library/modules/$.iter-define",
      "npm:core-js@0.9.18/library/modules/$.string-at",
      "npm:core-js@0.9.18/library/modules/core.iter-helpers",
      "npm:core-js@0.9.18/library/modules/$.iter-call",
      "npm:core-js@0.9.18/library/modules/$.iter-detect",
      "src/js/pubsub",
      "npm:core-js@0.9.18/library/modules/es6.object.to-string",
      "npm:core-js@0.9.18/library/modules/$.for-of",
      "npm:core-js@0.9.18/library/modules/$.same",
      "npm:core-js@0.9.18/library/modules/$.species",
      "npm:core-js@0.9.18/library/modules/$.invoke",
      "npm:core-js@0.9.18/library/modules/$.dom-create",
      "npm:process@0.10.1/browser",
      "npm:core-js@0.9.18/library/modules/$.mix",
      "src/js/interface",
      "src/js/http",
      "src/js/core",
      "src/js/service-locator",
      "src/js/db",
      "src/js/router",
      "npm:core-js@0.9.18/library/modules/$.collection-strong",
      "npm:core-js@0.9.18/library/modules/$.collection",
      "npm:core-js@0.9.18/library/modules/$.collection-to-json",
      "src/js/page",
      "src/js/pages",
      "src/js/view",
      "npm:core-js@0.9.18/library/modules/$",
      "npm:core-js@0.9.18/library/modules/es6.object.statics-accept-primitives",
      "npm:babel-runtime@5.8.25/core-js/object/create",
      "npm:core-js@0.9.18/library/modules/$.set-proto",
      "npm:babel-runtime@5.8.25/core-js/object/get-own-property-names",
      "npm:babel-runtime@5.8.25/core-js/object/define-property",
      "npm:core-js@0.9.18/library/modules/$.wks",
      "npm:core-js@0.9.18/library/modules/es6.object.assign",
      "npm:core-js@0.9.18/library/modules/es6.array.iterator",
      "npm:core-js@0.9.18/library/modules/es6.string.iterator",
      "npm:core-js@0.9.18/library/modules/es6.array.from",
      "npm:process@0.10.1",
      "src/js/interfaces",
      "src/js/app",
      "npm:core-js@0.9.18/library/modules/es6.map",
      "npm:core-js@0.9.18/library/modules/es7.map.to-json",
      "src/js/views",
      "npm:core-js@0.9.18/library/fn/object/get-own-property-descriptor",
      "npm:core-js@0.9.18/library/modules/es6.object.set-prototype-of",
      "npm:core-js@0.9.18/library/modules/$.cof",
      "npm:core-js@0.9.18/library/fn/object/assign",
      "npm:core-js@0.9.18/library/modules/web.dom.iterable",
      "npm:core-js@0.9.18/library/fn/array/from",
      "github:jspm/nodelibs-process@0.1.1/index",
      "npm:core-js@0.9.18/library/fn/map",
      "npm:babel-runtime@5.8.25/core-js/object/get-own-property-descriptor",
      "npm:core-js@0.9.18/library/fn/object/set-prototype-of",
      "npm:core-js@0.9.18/library/modules/es6.symbol",
      "npm:babel-runtime@5.8.25/core-js/object/assign",
      "npm:core-js@0.9.18/library/fn/get-iterator",
      "npm:babel-runtime@5.8.25/core-js/array/from",
      "github:jspm/nodelibs-process@0.1.1",
      "npm:babel-runtime@5.8.25/core-js/map",
      "npm:babel-runtime@5.8.25/helpers/get",
      "npm:babel-runtime@5.8.25/core-js/object/set-prototype-of",
      "npm:core-js@0.9.18/library/fn/object/get-own-property-symbols",
      "npm:babel-runtime@5.8.25/core-js/get-iterator",
      "npm:core-js@0.9.18/library/modules/$.task",
      "src/js/simple-router",
      "npm:babel-runtime@5.8.25/helpers/inherits",
      "npm:babel-runtime@5.8.25/core-js/object/get-own-property-symbols",
      "src/js/dom",
      "npm:core-js@0.9.18/library/modules/es6.promise",
      "src/js/utils",
      "src/js/log",
      "npm:core-js@0.9.18/library/fn/promise",
      "src/js/base",
      "npm:babel-runtime@5.8.25/core-js/promise",
      "src/js/HTTP",
      "src/js/model",
      "src/js/collection",
      "src/js/main"
    ]
  },
  "baseUrl": "/"
});

System.config({
  "meta": {
    "src/js/*": {
      "format": "global"
    }
  }
});

System.config({
  "map": {
    "babel": "npm:babel-core@5.8.25",
    "babel-core": "npm:babel-core@5.8.25",
    "babel-runtime": "npm:babel-runtime@5.8.25",
    "core-js": "npm:core-js@0.9.18",
    "fetch": "github:github/fetch@0.9.0",
    "sass.js": "npm:sass.js@0.9.2",
    "webcomponents": "npm:webcomponents@0.1.4",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.5.0"
    },
    "github:jspm/nodelibs-constants@0.1.0": {
      "constants-browserify": "npm:constants-browserify@0.0.1"
    },
    "github:jspm/nodelibs-crypto@0.1.0": {
      "crypto-browserify": "npm:crypto-browserify@3.10.0"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-http@1.7.1": {
      "Base64": "npm:Base64@0.2.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-string_decoder@0.1.0": {
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "npm:CSSselect@0.4.1": {
      "CSSwhat": "npm:CSSwhat@0.4.7",
      "domutils": "npm:domutils@1.4.3"
    },
    "npm:CSSwhat@0.4.7": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:amdefine@1.0.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "module": "github:jspm/nodelibs-module@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:asn1.js@2.2.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "bn.js": "npm:bn.js@2.2.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:async@0.2.10": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:atob@1.1.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:babel-runtime@5.8.25": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:browserify-aes@1.0.5": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "buffer-xor": "npm:buffer-xor@1.0.3",
      "cipher-base": "npm:cipher-base@1.0.1",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:browserify-cipher@1.0.0": {
      "browserify-aes": "npm:browserify-aes@1.0.5",
      "browserify-des": "npm:browserify-des@1.0.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.0"
    },
    "npm:browserify-des@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "cipher-base": "npm:cipher-base@1.0.1",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "des.js": "npm:des.js@1.0.0",
      "inherits": "npm:inherits@2.0.1"
    },
    "npm:browserify-rsa@2.0.1": {
      "bn.js": "npm:bn.js@2.2.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "constants": "github:jspm/nodelibs-constants@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "randombytes": "npm:randombytes@2.0.1"
    },
    "npm:browserify-sign@3.0.8": {
      "bn.js": "npm:bn.js@2.2.0",
      "browserify-rsa": "npm:browserify-rsa@2.0.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "create-hmac": "npm:create-hmac@1.1.4",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "elliptic": "npm:elliptic@3.1.0",
      "inherits": "npm:inherits@2.0.1",
      "parse-asn1": "npm:parse-asn1@3.0.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:buffer-xor@1.0.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:buffer@3.5.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "ieee754": "npm:ieee754@1.1.6",
      "is-array": "npm:is-array@1.0.1"
    },
    "npm:cheerio@0.17.0": {
      "CSSselect": "npm:CSSselect@0.4.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "dom-serializer": "npm:dom-serializer@0.0.1",
      "entities": "npm:entities@1.1.1",
      "htmlparser2": "npm:htmlparser2@3.7.3",
      "lodash": "npm:lodash@2.4.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:cipher-base@1.0.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "github:jspm/nodelibs-string_decoder@0.1.0"
    },
    "npm:constants-browserify@0.0.1": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:core-js@0.9.18": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:core-util-is@1.0.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:create-ecdh@2.0.1": {
      "bn.js": "npm:bn.js@2.2.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "elliptic": "npm:elliptic@3.1.0"
    },
    "npm:create-hash@1.1.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "cipher-base": "npm:cipher-base@1.0.1",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "ripemd160": "npm:ripemd160@1.0.1",
      "sha.js": "npm:sha.js@2.4.4"
    },
    "npm:create-hmac@1.1.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:crypto-browserify@3.10.0": {
      "browserify-cipher": "npm:browserify-cipher@1.0.0",
      "browserify-sign": "npm:browserify-sign@3.0.8",
      "create-ecdh": "npm:create-ecdh@2.0.1",
      "create-hash": "npm:create-hash@1.1.2",
      "create-hmac": "npm:create-hmac@1.1.4",
      "diffie-hellman": "npm:diffie-hellman@3.0.2",
      "inherits": "npm:inherits@2.0.1",
      "pbkdf2": "npm:pbkdf2@3.0.4",
      "public-encrypt": "npm:public-encrypt@2.0.1",
      "randombytes": "npm:randombytes@2.0.1"
    },
    "npm:css@2.1.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "source-map": "npm:source-map@0.1.43",
      "source-map-resolve": "npm:source-map-resolve@0.3.1",
      "urix": "npm:urix@0.1.0"
    },
    "npm:des.js@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
    },
    "npm:diffie-hellman@3.0.2": {
      "bn.js": "npm:bn.js@2.2.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "miller-rabin": "npm:miller-rabin@2.0.1",
      "randombytes": "npm:randombytes@2.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:dom-serializer@0.0.1": {
      "domelementtype": "npm:domelementtype@1.1.3",
      "entities": "npm:entities@1.1.1"
    },
    "npm:domhandler@2.2.1": {
      "domelementtype": "npm:domelementtype@1.1.3"
    },
    "npm:domutils@1.4.3": {
      "domelementtype": "npm:domelementtype@1.1.3"
    },
    "npm:domutils@1.5.1": {
      "dom-serializer": "npm:dom-serializer@0.0.1",
      "domelementtype": "npm:domelementtype@1.1.3"
    },
    "npm:elliptic@3.1.0": {
      "bn.js": "npm:bn.js@2.2.0",
      "brorand": "npm:brorand@1.0.5",
      "hash.js": "npm:hash.js@1.0.3",
      "inherits": "npm:inherits@2.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:entities@1.0.0": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:entities@1.1.1": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:es6-promise@1.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:evp_bytestokey@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0"
    },
    "npm:glob@4.0.5": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "graceful-fs": "npm:graceful-fs@3.0.8",
      "inherits": "npm:inherits@2.0.1",
      "minimatch": "npm:minimatch@1.0.0",
      "once": "npm:once@1.3.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:graceful-fs@3.0.8": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "constants": "github:jspm/nodelibs-constants@0.1.0",
      "module": "github:jspm/nodelibs-module@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:handlebars@2.0.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "optimist": "npm:optimist@0.3.7",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "uglify-js": "npm:uglify-js@2.3.6"
    },
    "npm:hash.js@1.0.3": {
      "inherits": "npm:inherits@2.0.1"
    },
    "npm:htmlparser2@3.7.3": {
      "domelementtype": "npm:domelementtype@1.1.3",
      "domhandler": "npm:domhandler@2.2.1",
      "domutils": "npm:domutils@1.5.1",
      "entities": "npm:entities@1.0.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "readable-stream": "npm:readable-stream@1.1.13",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:lodash@2.4.1": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:miller-rabin@2.0.1": {
      "bn.js": "npm:bn.js@2.2.0",
      "brorand": "npm:brorand@1.0.5"
    },
    "npm:minimatch@1.0.0": {
      "lru-cache": "npm:lru-cache@2.7.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "sigmund": "npm:sigmund@1.0.1"
    },
    "npm:once@1.3.2": {
      "wrappy": "npm:wrappy@1.0.1"
    },
    "npm:optimist@0.3.7": {
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "wordwrap": "npm:wordwrap@0.0.3"
    },
    "npm:parse-asn1@3.0.2": {
      "asn1.js": "npm:asn1.js@2.2.1",
      "browserify-aes": "npm:browserify-aes@1.0.5",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
      "pbkdf2": "npm:pbkdf2@3.0.4",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:pbkdf2@3.0.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "create-hmac": "npm:create-hmac@1.1.4",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:public-encrypt@2.0.1": {
      "bn.js": "npm:bn.js@2.2.0",
      "browserify-rsa": "npm:browserify-rsa@2.0.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "parse-asn1": "npm:parse-asn1@3.0.2",
      "randombytes": "npm:randombytes@2.0.1"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:randombytes@2.0.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:readable-stream@1.1.13": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:ripemd160@1.0.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:sass.js@0.9.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:sha.js@2.4.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:sigmund@1.0.1": {
      "http": "github:jspm/nodelibs-http@1.7.1",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:source-map-resolve@0.3.1": {
      "atob": "npm:atob@1.1.2",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "resolve-url": "npm:resolve-url@0.2.1",
      "source-map-url": "npm:source-map-url@0.3.0",
      "urix": "npm:urix@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0"
    },
    "npm:source-map@0.1.43": {
      "amdefine": "npm:amdefine@1.0.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.13"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:uglify-js@2.3.6": {
      "async": "npm:async@0.2.10",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "optimist": "npm:optimist@0.3.7",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "source-map": "npm:source-map@0.1.43",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:urix@0.1.0": {
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    },
    "npm:webcomponents@0.1.4": {
      "cheerio": "npm:cheerio@0.17.0",
      "css": "npm:css@2.1.0",
      "es6-promise": "npm:es6-promise@1.0.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "glob": "npm:glob@4.0.5",
      "handlebars": "npm:handlebars@2.0.0",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "lodash": "npm:lodash@2.4.1",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    }
  }
});

