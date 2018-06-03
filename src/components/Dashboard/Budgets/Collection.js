import React, { Component } from 'react'
import classNames from 'classnames'
import { inject, observer } from 'mobx-react'

import NewBudget from './New'

@inject('budget', 'settings')
@observer
export default class Budgets extends Component {
  render() {
    const { budget } = this.props
    const { collection } = budget

    return (
      <div className="container">
        <h1 className="title">Список бюджетов</h1>
        <button className="button" onClick={this.openModal}>Создать бюджет</button>

        <div className="buttons mt">
          {collection.map(this.renderBudget)}
        </div>
      </div>
    )
  }

  renderBudget = (item) => {
    console.log(item)
    const iconClasses = classNames('fas', {
      'fa-dollar-sign': item.currency === 'USD',
      'fa-ruble-sign': item.currency === 'RUB'
    })

    return (
      <button key={item.id} className="button is-primary is-outlined">
        <span className="icon">
          <i className={iconClasses} />
        </span>
        <span>{item.name}</span>
      </button>
    )
  }

  openModal = () => {
    const { settings } = this.props
    const { modal } = settings.layout

    modal.setContent(<NewBudget close={modal.close} />)
    modal.open()
  }
}
