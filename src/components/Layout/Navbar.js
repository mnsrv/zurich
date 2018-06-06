import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

@inject('budget', 'user')
@observer
export default class Navbar extends Component {
  componentDidMount() {
    const { budget } = this.props

    budget.findAll()
  }

  render() {
    const { match } = this.props
    const { params } = match

    return (
      <aside className="menu menu_between is-fullheight">
        {params.budgetId ? this.renderBudget() : this.renderOther()}
        <div className="menu-list">
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

  renderOther = () => {
    const { budget } = this.props
    const { collection } = budget

    if (collection.length === 0) {
      return <div />
    }
    return (
      <div>
        <p className="menu-label">Выберите бюджет</p>
        <ul className="menu-list">
          {collection.map(item => <li key={item.id}><Link to={`/${item.slug}/accounts`}>{item.name}</Link></li>)}
        </ul>
      </div>
    )
  }

  renderBudget = () => {
    return (
      <div>
        <p className="menu-label">Меню</p>
        <ul className="menu-list">
          <li><Link to="/budgets">Все бюджеты</Link></li>
          <li><Link to="/accounts">Все счета</Link></li>
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
