import React, {Component} from 'react'
import {StaticRouter} from 'react-router-dom'
import {App} from './components/App.js'

const context = {}
export class ServerApp extends Component {
  render() {
    return (
      <StaticRouter location={this.props.url} context={context}>
        <App {...this.props.initialState} />
      </StaticRouter>
    )
  }
}
