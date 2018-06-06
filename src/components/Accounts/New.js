import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
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

    const { endpoint, match } = props
    const { budgetId } = match.params

    extendObservable(this, {
      accounts: new stores.Account(endpoint, `v1/${budgetId}`)
    })
  }

  render() {
    const { close } = this.props

    const buttonClasses = classNames('button', 'is-primary', {
      'is-loading': false
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
              <input className="input" type="text" ref={node => this.name = node} />
            </div>
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
              <input className="input" type="number" ref={node => this.balance = node} />
            </div>
          </div>
        </section>
        <footer className="modal-card-foot buttons is-right">
          <button className="button" onClick={close}>Отмена</button>
          <button className={buttonClasses}>Создать счет</button>
        </footer>
      </form>
    )
  }

  onSubmit = (e) => {
    e.preventDefault()

    // const { budget, settings } = this.props
    // const { modal } = settings.layout
    console.log('name', this.name.value)
    console.log('on_budget', this.on_budget.checked)
    console.log('balance', this.balance.value)

    // budget.create({}, {
    //   budget: {
    //     name: this.name.value,
    //     currency: this.currency.value
    //   }
    // }, {
    //   201: (response) => {
    //     budget.appendToCollection(response.data.budget)
    //     modal.close()
    //   }
    // })
  }
}
