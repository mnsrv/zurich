import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link, NavLink } from 'react-router-dom'

import Accounts from '../Accounts'

@inject('budget', 'user')
@observer
export default class Navbar extends Component {
  componentDidMount() {
    const { budget, match } = this.props
    const { params } = match
    const { budgetId } = params

    budget.findBy({ id: budgetId })
  }

  render() {
    const { match, user } = this.props
    const { email } = user
    const { params } = match
    const { budgetId } = params

    const { budget = {} } = this.props.budget.selected

    return (
      <aside className="menu menu_between is-fullheight">
        <div>
          <p className="menu-label">{budget.name}</p>
          <ul className="menu-list">
            <li><NavLink exact to={`/${budgetId}/accounts`} activeClassName="is-active">Все счета</NavLink></li>
          </ul>
          <Accounts match={match} />
        </div>
        <div className="menu-list">
          <div className="dropdown is-up is-hoverable">
            <div className="dropdown-trigger">
              <a className="is-vertical-center" aria-haspopup="true" aria-controls="dropdown-profile">
                <span>{email}</span>
                <span className="icon is-small">
                  <i className="fas fa-angle-up" aria-hidden="true"></i>
                </span>
              </a>
            </div>
            <div className="dropdown-menu" id="dropdown-profile" role="menu">
              <div className="dropdown-content">
                <Link className="dropdown-item" to="/budgets">Все бюджеты</Link>
                <hr className="dropdown-divider" />
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
