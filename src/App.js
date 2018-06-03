import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Layout from './components/Layout'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Budgets from './components/Budgets'
import Transactions from './components/Transactions'

class App extends Component {
  render() {
    return (
      <div className="columns is-gapless">
        <Layout />

        <div className="column">
          <Route path="/budgets" exact component={Budgets} />
          <Route path="/:budgetId/accounts" component={Transactions} />

          <Route path="/users/sign_in" component={Login} />
          <Route path="/users/sign_up" component={Register} />
        </div>
      </div>
    )
  }
}

export default App
