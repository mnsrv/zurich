import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

@inject('user')
@observer
export default class Member extends Component {
  render() {
    return (
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">Главная</Link>
          <Link to="/transactions" className="navbar-item">Транзакции</Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">{this.props.user.email}</div>
          <a className="navbar-item" onClick={this.signOut}>Выйти</a>
        </div>
      </div>
    )
  }

  signOut = () => {
    const { user } = this.props

    user.signOut()
  }
}
