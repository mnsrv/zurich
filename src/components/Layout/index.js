import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import BudgetsNavbar from './BudgetsNavbar'
import Navbar from './Navbar'
import Budgets from '../Budgets'
import Accounts from '../Accounts'
import AllTransactions from '../Transactions'
import AccountTransactions from '../AccountTransactions'

export default class Layout extends Component {
  render() {
    return (
      <div className="columns is-gapless">
        <div className="column is-narrow">
          <Route exact path="/budgets" component={BudgetsNavbar} />
          <Route path="/:budgetId/accounts" component={Navbar} />
        </div>
        <div className="column">
          <Route exact path="/budgets" component={Budgets} />
          <Route exact path="/:budgetId/accounts" component={AllTransactions} />
          <Route exact path="/:budgetId/accounts/:accountId" component={AccountTransactions} />
        </div>
      </div>
    )
  }
}
