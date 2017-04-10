import React, {Component} from 'react'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: props.count || 0
    }
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
  }

  increment() {
    this.setState(prev => ({...prev, count: prev.count+1}))
  }

  decrement() {
    this.setState(prev => ({...prev, count: prev.count-1}))
  }

  render() {
    console.log(this.props)
    return (
      <h1>
        {this.props.greeting || 'Hello World'}
        <hr/>
        <button onClick={this.increment}>+</button>
        {this.state.count}
        <button onClick={this.decrement}>-</button>
      </h1>
    )
  }
}
