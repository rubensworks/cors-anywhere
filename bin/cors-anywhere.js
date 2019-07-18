#!/usr/bin/env node

// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8080;

var cors_proxy = require('..');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: [], // Don't require any headers
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});
