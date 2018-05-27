import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import Member from './Member'
import Guest from './Guest'

@inject('user')
@observer
export default class Header extends Component {
  componentWillMount() {
    this.props.user.signIn()
  }

  render() {
    const { user } = this.props
    const color = user.signedIn ? 'is-dark' : 'is-light'

    return (
      <nav className={`navbar ${color}`}>
        <div className="container">
          {this.renderGuestOrMember()}
        </div>
      </nav>
    )
  }

  renderGuestOrMember() {
    const { user } = this.props

    if (user.signedIn) {
      return <Member />
    }
    return <Guest />
  }
}
