import React, { Component } from 'react'
import { matchPath, withRouter } from 'react-router-dom'
import { extendObservable } from 'mobx'
import { inject, observer } from 'mobx-react'
import classNames from 'classnames'

import stores from '../../stores'

@withRouter
@inject('endpoint')
@observer
export default class NewAccount extends Component {
  constructor(props) {
    super(props)

    const { location, endpoint } = props
    const match = matchPath(location.pathname,{
      path: '/:budgetId/accounts'
    })
    const { budgetId } = match.params

    extendObservable(this, {
      accounts: new stores.Account(endpoint, `v1/${budgetId}`)
    })
  }

  render() {
    const { message } = this.accounts
    const { close } = this.props

    const buttonClasses = classNames('button', 'is-primary', {
      'is-loading': false
    })

    const nameClasses = classNames('input', {
      'is-danger': message && message.name
    })
    const balanceClasses = classNames('input', {
      'is-danger': message && message.balance
    })

    return (
      <form className="modal-card" onSubmit={this.onSubmit}>
        <header className="modal-card-head">
          <p className="modal-card-title">Новый счет</p>
          <button className="delete" aria-label="close" onClick={close} />
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Название</label>
            <div className="control">
              <input className={nameClasses} type="text" ref={node => this.name = node} onChange={this.onChange} />
            </div>
            {message && message.name && <p className="help is-danger">{message.name}</p>}
          </div>
          <div className="field">
            <label className="checkbox">
              <input type="checkbox" ref={node => this.on_budget = node} defaultChecked />
              {` Учитывать в бюджете`}
            </label>
          </div>
          <div className="field">
            <label className="label">Баланс</label>
            <div className="control">
              <input className={balanceClasses} type="number" ref={node => this.balance = node} onChange={this.onChange} />
            </div>
            {message && message.balance && <p className="help is-danger">{message.balance}</p>}
          </div>
        </section>
        <footer className="modal-card-foot buttons is-right">
          <button className="button" onClick={close}>Отмена</button>
          <button className={buttonClasses}>Создать счет</button>
        </footer>
      </form>
    )
  }

  onChange = () => {
    const { message } = this.accounts

    if (message) {
      this.accounts.clearMessage()
    }
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { close } = this.props

    this.accounts.create({}, {
      account: {
        name: this.name.value,
        on_budget: this.on_budget.checked,
        balance: this.balance.value
      }
    }, {
      201: () => {
        close()
      },
      422: (response) => {
        this.accounts.setMessage(response.errors)
      }
    })
  }
}
