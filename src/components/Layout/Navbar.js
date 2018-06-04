import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

@inject('user')
@observer
export default class Navbar extends Component {
  render() {
    return (
      <aside className="menu menu_between is-fullheight">
        <ul className="menu-list">
          <li><Link to="/budgets">Все бюджеты</Link></li>
          <li><Link to="/accounts">Все аккаунты</Link></li>
        </ul>
        <div class="menu-list">
          <div className="dropdown is-up is-hoverable">
            <div className="dropdown-trigger">
              <a className="is-vertical-center" aria-haspopup="true" aria-controls="dropdown-profile">
                <span>{this.props.user.email}</span>
                <span className="icon is-small">
                  <i className="fas fa-angle-up" aria-hidden="true"></i>
                </span>
              </a>
            </div>
            <div className="dropdown-menu" id="dropdown-profile" role="menu">
              <div className="dropdown-content">
                <a className="dropdown-item" onClick={this.signOut}>Выйти</a>
              </div>
            </div>
          </div>
        </div>
      </aside>
    )
  }

  signOut = () => {
    const { user } = this.props

    user.destroySession()
  }
}
