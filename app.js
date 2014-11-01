var Hapi = require('hapi');
var server = new Hapi.Server('localhost', 8000, { cors: true });

server.views({
  engines: {
    jade: require('jade')
  },
  path: __dirname + '/views',
  compileOptions: {
      pretty: true
  }
});
