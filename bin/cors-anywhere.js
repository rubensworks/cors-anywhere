#!/usr/bin/env node

var accepts = require('accepts');

// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8080;

var cors_proxy = require('..');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: [], // Don't require any headers
    isValidUrlToBeProxied: function(url) {
        // return url.startsWith('http://google.com');
        var regex = /((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}/;
        return !regex.test(url);
    },
    isValidAcceptHeader: function(req) {
        var validContentTypes = [
          'text/turtle',
          'application/trig',
          'application/n-triples',
          'application/n-quads',
          'application/ld+json',
          'application/json',
          'text/n3',
          'application/rdf+xml',
          'application/xhtml+xml',
          'image/svg+xml',
          'application/xml',
          'text/shaclc',
          'text/shaclc-ext',
          'text/html',
          '*/*',
        ];
        var accept = accepts(req);
        var types = accept.types();
        var valid = true;

        if (types.length === 1 && types[0] === '*/*') {
          return false;
        }

        for (var i = 0; i < types.length; i++) {
            if (!validContentTypes.includes(types[i])) {
                valid = false;
                break;
            }
        }
        return valid;
    },
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});
