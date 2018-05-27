import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

@inject('user')
@observer
export default class Member extends Component {
  render() {
    return (
      <Link to="/users/sign_in" className="navbar-item">{this.props.user.email}</Link>
    )
  }
}
