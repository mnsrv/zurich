import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Navbar from './Navbar'
import Budgets from '../Budgets'
import Transactions from '../Transactions'

export default class Layout extends Component {
  render() {
    return (
      <div className="columns is-gapless">
        <div className="column is-narrow">
          <Navbar />
        </div>
        <div className="column">
          <Route exact path="/budgets" component={Budgets} />
          <Route path="/:budgetId/accounts" component={Transactions} />
        </div>
      </div>
    )
  }
}
