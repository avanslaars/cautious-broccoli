'use strict'

const Hapi = require('hapi')
const vision = require('vision')
const inert = require('inert')
const handlebars = require('handlebars')
const ReactDOMServer = require('react-dom/server')
const React = require('react')
const {ServerApp} = require('./compiled_components/app')

const server = new Hapi.Server()

server.connection({
  host: 'localhost',
  port: 8000
})

const visionReg = server.register(vision, (err) => {
  if (err) {
    throw err
  }
  server.views({
    engines: {
      html: handlebars
    },
    relativeTo: __dirname,
    path: 'templates'
  })
})

const inertReg = server.register(inert)

const genericHandler = function (request, reply) {
  const AppEl = React.createFactory(ServerApp)
  const initialState = {greeting: 'From the server with Handlebars', count: 1}
  const url = request.url.path
  const reactApp = ReactDOMServer.renderToString(AppEl({initialState, url}))
  reply.view('index', { message: `Entry Point: ${url}`, reactApp, initialState: JSON.stringify(initialState) })
}

server.route([{
  method: 'GET',
  path: '/{param*}',
  handler: genericHandler
}])

server.route({
  method: 'GET',
  path: '/assets/{param*}',
  handler: {
    directory: {
      path: 'build'
    }
  }
})

// Start the server
Promise.all([visionReg, inertReg])
  .then(function () {
    server.start((err) => {
      if (err) {
        throw err
      }
      console.log('Server running at:', server.info.uri)
    })
  })
