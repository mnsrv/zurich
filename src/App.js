import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Layout from './components/Layout'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Dashboard from './components/Dashboard'
import Table from './components/Transactions/Table'

class App extends Component {
  render() {
    return (
      <div>
        <Layout />

        <Route path="/" exact component={Dashboard} />
        <Route path="/transactions" component={Table} />

        <Route path="/users/sign_in" component={Login} />
        <Route path="/users/sign_up" component={Register} />
      </div>
    )
  }
}

export default App
