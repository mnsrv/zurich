import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { NavLink } from 'react-router-dom'

import stores from '../../stores'
import NewAccount from './New'

@inject('endpoint', 'settings')
@observer
export default class Accounts extends Component {
  constructor(props) {
    super(props)

    const { endpoint, match } = props
    const { budgetId } = match.params

    this.accounts = new stores.Account(endpoint, `v1/${budgetId}`)
  }

  componentDidMount() {
    this.accounts.findAll()
  }

  render() {
    const { collection } = this.accounts
    const { match } = this.props
    const { budgetId } = match.params

    return [
      <p key="title" className="menu-label">Счета</p>,
      <ul key="list" className="menu-list">
        {collection.map(acc => {
          return <li key={acc.id}><NavLink to={`/${budgetId}/accounts/${acc.id}`} activeClassName="is-active">{acc.name}</NavLink></li>
        })}
      </ul>,
      <button key="button" className="button is-small mt" onClick={this.openCreateAccountModal}>Создать счёт</button>
    ]
  }

  openCreateAccountModal = () => {
    const { settings } = this.props
    const { modal } = settings.layout

    modal.setContent(
      <NewAccount
        close={modal.close}
        appendToCollection={this.accounts.appendToCollection}
      />
    )
    modal.open()
  }
}
