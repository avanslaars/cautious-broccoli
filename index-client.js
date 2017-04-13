import ReactDOM from 'react-dom'
import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {App} from './components/App.js'

ReactDOM.render(
  <BrowserRouter>
    <App {...window.__APP_INITIAL_STATE__}/>
  </BrowserRouter>, document.getElementById('app'))
