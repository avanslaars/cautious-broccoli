import React, {Component} from 'react'
import {Route, Switch, Link} from 'react-router-dom'
import {Card} from './Card'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      count: props.count || 0
    }
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
  }

  componentDidMount () {
    console.log('component mount - called on client, not on server')
  }

  increment () {
    this.setState(prev => ({...prev, count: prev.count + 1}))
  }

  decrement () {
    this.setState(prev => ({...prev, count: prev.count - 1}))
  }

  render () {
    return (
      <div>
        <h1>{this.props.greeting || 'New, New Default'}</h1>
        <Link to='/'>Root</Link>{' '}
        <Link to='/hello'>Hello</Link>{' '}
        <Link to='/cards'>Cards</Link>{' '}
        <Link to='/something/else'>Unhandled Route</Link>{' '}
        <hr />
        <h2>Woohoo - It's a Jesus Zombie Day Miracle</h2>
        <Switch>
          <Route path='/' exact render={() => <h2>Home Page</h2>} />
          <Route path='/hello' render={() => (
            <div>
              <button onClick={this.increment}>+</button>
              {this.state.count}
              <button onClick={this.decrement}>-</button>
            </div>
          )} />
          <Route path='/cards' component={Card} />
          <Route render={() => <h1>404</h1>} />
        </Switch>
      </div>
    )
  }
}
