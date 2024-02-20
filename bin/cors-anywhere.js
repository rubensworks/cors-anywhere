#!/usr/bin/env node

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
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});
