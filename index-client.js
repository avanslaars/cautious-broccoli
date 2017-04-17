import ReactDOM from 'react-dom'
import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import App from './components/App.js'

// ReactDOM.render(
//   <BrowserRouter>
//     <App {...window.__APP_INITIAL_STATE__} />
//   </BrowserRouter>, document.getElementById('app'))

const render = (Component) => {
  ReactDOM.render(
    <BrowserRouter>
      <AppContainer>
        <Component />
      </AppContainer>
    </BrowserRouter>,
    document.getElementById('app')
  )
}

render(App)

// Hot Module Replacement API
if (module.hot) {
  console.log('hot')
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default
    render(NextApp)
  })
}
