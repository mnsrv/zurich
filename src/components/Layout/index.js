import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import Member from './Header/Member'
import Guest from './Header/Guest'
import Modal from './Modal'

@inject('settings', 'user')
@observer
export default class Header extends Component {
  componentWillMount() {
    this.props.user.signIn()
  }

  render() {
    const { user } = this.props

    return (
      <div>
        <nav className={`navbar ${user.signedIn ? 'is-primary' : 'is-dark'}`}>
          <div className="container">
            {user.signedIn ? <Member /> : <Guest />}
          </div>
        </nav>

        <Modal ref={this.setModal} />
      </div>
    )
  }

  setModal = (node) => {
    const { settings } = this.props

    settings.layout.modal = node
  }
}
