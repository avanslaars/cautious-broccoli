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

const plugins = [
  {register: inert},
  {register: vision}
]

if (process.env.NODE_ENV === 'development') {
  const H2o2 = require('h2o2')
  plugins.push({register: H2o2})
}

const genericHandler = function (request, reply) {
  const AppEl = React.createFactory(ServerApp)
  const initialState = {greeting: 'From the server with Handlebars', count: 1}
  const url = request.url.path
  const reactApp = ReactDOMServer.renderToString(AppEl({initialState, url}))
  reply.view('index', { message: `Entry Point: ${url}`, reactApp, initialState: JSON.stringify(initialState) })
}

// server.route([{
//   method: 'GET',
//   path: '/{param*}',
//   handler: genericHandler
// }])
//
// server.route({
//   method: 'GET',
//   path: '/assets/{param*}',
//   handler: {
//     directory: {
//       path: 'build'
//     }
//   }
// })

// Start the server
server.register(plugins, function (err) {
  if (err) {
    console.error('stuff broke')
    return
  }

  server.views({
    engines: {
      html: handlebars
    },
    relativeTo: __dirname,
    path: 'templates'
  })

  server.route([{
    method: 'GET',
    path: '/{param*}',
    handler: genericHandler
  }])

  if (process.env.NODE_ENV === 'development') {
    server.route({
      method: 'GET',
      path: '/assets/{param*}',
      handler: {
        proxy: {
          host: 'localhost',
          port: 8080,
          passThrough: true
        }
      }
    })
      // Proxy webpack assets requests to webpack-dev-server
      // Note: in development webpack bundles are served from memory, not filesystem
    server.route([{
      method: 'GET',
      path: '/assets/', // this includes HMR patches, not just webpack bundle files
      handler: {
        proxy: {
          host: 'localhost',
          port: 8080,
          passThrough: true
        }
      }
    }, {
      method: 'GET',
      path: '/__webpack_hmr', // this includes HMR patches, not just webpack bundle files
      handler: {
        proxy: {
          host: 'localhost',
          port: 8080,
          passThrough: true
        }
      }
    }])
  } else {
    server.route({
      method: 'GET',
      path: '/assets/{param*}',
      handler: {
        directory: {
          path: 'build'
        }
      }
    })
  }

  server.start((err) => {
    if (err) {
      throw err
    }
    console.log(process.env.NODE_ENV)
    console.log('Server running at:', server.info.uri)
  })
})
// Promise.all([visionReg, inertReg])
//   .then(function () {
//     server.start((err) => {
//       if (err) {
//         throw err
//       }
//       console.log('Server running at:', server.info.uri)
//     })
//   })
