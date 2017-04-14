import React, {Component} from 'react'
import {get} from 'axios'

export class Card extends Component {
  constructor(props){
    super(props)
    this.state = {
      cards: [],
      isLoading: true
    }
  }

  componentDidMount() {
    get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(deck => get(`https://deckofcardsapi.com/api/deck/${deck.data.deck_id}/draw/?count=2`))
      .then(res => this.setState({cards: res.data.cards, isLoading: false}))
  }

  render() {
    return (
      <div>
        <h1>Cards</h1>
        {this.state.isLoading ? <h3>Loading...</h3> : (
          <ul>
            {this.state.cards.map(c => <li key={c.code}>{c.code}</li>)}
          </ul>
        )}
      </div>
    )
  }
}
