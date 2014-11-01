var Hapi = require('hapi');
var Appbase = require('appbasejs'); // Appbase nodejs module

// Setting credentials
Appbase.credentials('grude', '1a6c9a10870c37b067f22e5dc68baa3f');

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

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply.view('index', {
      title: 'examples/views/jade/index.js | Hapi ' + Hapi.version,
      message: 'Index - Hello World!'
    });
  }
});

server.route({
  method: 'POST',
  path: '/user',
  handler: function (request, reply) {
    var user = Appbase.ns('user').v(request.payload.email);
    user.setData(request.payload, function(){
      reply.view('index', {
        title: 'examples/views/jade/index.js | Hapi ' + Hapi.version,
        message: 'Index - Hello World!'
      });
    })
  }
});

server.start()
