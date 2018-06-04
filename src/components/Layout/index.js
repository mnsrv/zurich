import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import Navbar from './Navbar'
import Modal from './Modal'

@inject('settings', 'user')
@observer
export default class Header extends Component {
  componentWillMount() {
    this.props.user.signIn()
  }

  render() {
    const { user } = this.props
    
    if (!user.signedIn) {
      return null
    }

    return (
      <div className="column is-narrow">
        <Navbar />
        <Modal ref={this.setModal} />
      </div>
    )
  }

  setModal = (node) => {
    const { settings } = this.props

    settings.layout.modal = node
  }
}
