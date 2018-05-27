import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import Member from './Member'
import Guest from './Guest'

@inject('user')
@observer
export default class Header extends Component {
  render() {
    const { user } = this.props
    const color = user.signedIn ? 'is-dark' : 'is-light'

    return (
      <nav className={`navbar ${color}`}>
        <div className="container">
          <div className="navbar-menu">
            <div className="navbar-start">
              <Link to="/" className="navbar-item">Главная</Link>
            </div>
            <div className="navbar-end">
              {this.renderGuestOrMember()}
            </div>
          </div>
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
