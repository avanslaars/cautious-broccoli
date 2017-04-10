import ReactDOM from 'react-dom'
import React from 'react'
import {App} from './App.js'

ReactDOM.render(<App {...window.__APP_INITIAL_STATE__}/>, document.getElementById('app'))
