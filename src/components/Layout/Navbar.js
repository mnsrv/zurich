import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

@inject('user')
@observer
export default class Navbar extends Component {
  render() {
    return (
      <aside class="menu">
        <ul class="menu-list">
          <li><Link to="/budgets">Все бюджеты</Link></li>
          <li><Link to="/accounts">Все аккаунты</Link></li>
        </ul>
        <p class="menu-label">Профиль</p>
        <ul class="menu-list">
          <li><a>{this.props.user.email}</a></li>
          <li><a onClick={this.signOut}>Выйти</a></li>
        </ul>
      </aside>
    )
  }

  signOut = () => {
    const { user } = this.props

    user.destroySession()
  }
}
