import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header'
import Table from './components/Transactions/Table'
import New from './components/Sessions/New'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Table} />
          <Route path="/users">
            <Route path="/users/sign_in" component={New} />
          </Route>
        </div>
      </Router>
    )
  }
}

export default App
