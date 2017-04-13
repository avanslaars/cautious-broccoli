import React, {Component} from 'react'
import {StaticRouter} from 'react-router-dom'
import {App} from './App.js'

export class ServerApp extends Component {
  render() {
    return (
      <StaticRouter location={this.props.url} context={{test:'sample context value'}}>
        <App {...this.props.initialState} />
      </StaticRouter>
    )
  }
}
