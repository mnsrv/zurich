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

    return (
      <nav className={`navbar ${user.signedIn ? 'is-primary' : 'is-dark'}`}>
        <div className="container">
          {user.signedIn ? <Member /> : <Guest />}
        </div>
      </nav>
    )
  }
}
