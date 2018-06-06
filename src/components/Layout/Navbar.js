import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

@inject('budget', 'user')
@observer
export default class Navbar extends Component {
  componentWillMount() {
    const { budget, match } = this.props
    const { params } = match
    const { budgetId } = params

    budget.findBy({ id: budgetId })
  }

  render() {
    const { user } = this.props
    const { email } = user

    return (
      <aside className="menu menu_between is-fullheight">
        {this.renderMenu()}
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

  renderMenu = () => {
    const { match } = this.props
    const { params } = match
    const { budgetId } = params

    const { budget = {} } = this.props.budget.selected

    return (
      <div>
        <p className="menu-label">{budget.name}</p>
        <ul className="menu-list">
          <li><Link to={`/${budgetId}/accounts`}>Все счета</Link></li>
        </ul>
        <p className="menu-label">Нет счетов</p>
        <ul className="menu-list">
          <li><Link to="/accounts">Создайте счет</Link></li>
        </ul>
      </div>
    )
  }

  signOut = () => {
    const { user } = this.props

    user.destroySession()
  }
}
