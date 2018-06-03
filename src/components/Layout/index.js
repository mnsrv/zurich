import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

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
    console.log(this.props)

    return (
      <div className="column is-narrow">
        {user.signedIn ? <Member /> : <Guest />}
        <Modal ref={this.setModal} />
      </div>
    )
  }

  setModal = (node) => {
    const { settings } = this.props

    settings.layout.modal = node
  }
}
