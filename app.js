var Hapi          = require('hapi');
var server        = new Hapi.Server('localhost', 8000);
var Mongoose      = require('mongoose');
var Boom          = require('boom');                                  // HTTP Errors
var Joi           = require('joi');                                   // Validation
var Goals         = require('./models/goal').Goal; // Mongoose ODM

// MongoDB Connection
Mongoose.connect('mongodb://localhost/grude');

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
  path: '/{param*}',
  handler: {
    directory: {
      path: 'public',
      listing: true
    }
  }
});

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply.view('sessions/new', {
      title: 'examples/views/jade/index.js | Hapi ' + Hapi.version,
      message: 'Index - Hello World!'
    });
  }
});

// GET /metas
server.route({
  method: 'GET',
  path: '/goals',
  handler: function (request, reply) {
    Goals.find({}, function (err, events) {
      if (!err) {
        reply(events);
      } else {
        reply(Boom.badImplementation(err)); // 500 error
      }
    });
  }
});

server.start()
