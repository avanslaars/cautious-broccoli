import React, {Component} from 'react'
import {get} from 'axios'

export class Card extends Component {
  constructor(props){
    super(props)
    this.state = {
      cards: []
    }
  }
  componentDidMount() {
    get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(deck => get(`https://deckofcardsapi.com/api/deck/${deck.data.deck_id}/draw/?count=2`))
      .then(res => this.setState({cards: res.data.cards}))
  }

  render() {
    return (
      <div>
        <h1>Cards</h1>
        <ul>
          {this.state.cards.map(c => <li>{c.code}</li>)}
        </ul>
      </div>
    )
  }
}
