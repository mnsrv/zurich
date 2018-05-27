import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Header from './components/Header'
import Table from './components/Transactions/Table'
import New from './components/Sessions/New'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" />
        <Route path="/transactions" component={Table} />
        <Route path="/users">
          <Route path="/users/sign_in" component={New} />
        </Route>
      </div>
    )
  }
}

export default App
