'use strict';

const Hapi = require('hapi')
const vision = require('vision')
const inert = require('inert')
const handlebars = require('handlebars')
const ReactDOMServer = require('react-dom/server')
const React = require('react')
const {App} = require('./components/components')

// Create a server with a host and port
const server = new Hapi.Server()

server.connection({
    host: 'localhost',
    port: 8000
});

const visionReg = server.register(vision, (err) => {
    server.views({
        engines: {
            html: handlebars
        },
        relativeTo: __dirname,
        path: 'templates'
    });
});

const inertReg = server.register(inert)

// Add the route
// server.route({
//     method: 'GET',
//     path:'/hello',
//     handler: function (request, reply) {
//         const AppEl = React.createFactory(App)
//         return reply(ReactDOMServer.renderToString(AppEl({greeting:'From The Server M-Fer!!'})));
//     }
// })

server.route({
    method: 'GET',
    path:'/hello',
    handler: function(request, reply) {
      const AppEl = React.createFactory(App)
      const initialState = {greeting:'From the server with Handlebars', count: 1}
      const reactApp = ReactDOMServer.renderToString(AppEl(initialState))
      reply.view('hello', { message: 'My home page', reactApp, initialState: JSON.stringify(initialState) });
    }
})

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'dist'
        }
    }
})

// Start the server
Promise.all([visionReg, inertReg])
  .then(function() {
    server.start((err) => {

      if (err) {
        throw err;
      }
      console.log('Server running at:', server.info.uri);
    })
  })
