import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import Modal from './components/Modal'
import GuestRoutes from './components/GuestRoutes'
import Layout from './components/Layout'

@inject('settings', 'user')
@observer
class App extends Component {
  componentWillMount() {
    const { user } = this.props

    user.signIn()
  }

  render() {
    const { user } = this.props
    const { signedIn } = user

    return (
      <div>
        <Modal ref={this.setModal} />

        <Route path="/users" render={props => signedIn ? <Redirect to="/" /> : <GuestRoutes />} />
        <Route render={props => signedIn === false ? <Redirect to="/users/sign_in" /> : <Route component={Layout} />} />
      </div>
    )
  }

  setModal = (node) => {
    const { settings } = this.props

    settings.layout.modal = node
  }
}

export default App
