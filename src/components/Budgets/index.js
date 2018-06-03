import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { inject, observer } from 'mobx-react'

import NewBudget from './New'

@inject('budget', 'settings')
@observer
export default class Dashboard extends Component {
  componentDidMount() {
    const { budget } = this.props

    budget.findAll()
  }

  render() {
    const { budget } = this.props
    const { collection } = budget

    return (
      <div className="section">
        <div className="container">
          <h1 className="title">Список бюджетов</h1>
          <button className="button" onClick={this.openModal}>Создать бюджет</button>

          <div className="buttons mt">
            {collection.reverse().map(this.renderBudget)}
          </div>
        </div>
      </div>
    )
  }

  renderBudget = (item) => {
    const iconClasses = classNames('fas', {
      'fa-dollar-sign': item.currency === 'USD',
      'fa-ruble-sign': item.currency === 'RUB'
    })

    return (
      <Link key={item.id} to={`/${item.slug}/accounts`} className="button is-primary is-outlined">
        <span className="icon">
          <i className={iconClasses} />
        </span>
        <span>{item.name}</span>
      </Link>
    )
  }

  openModal = () => {
    const { settings } = this.props
    const { modal } = settings.layout

    modal.setContent(<NewBudget close={modal.close} />)
    modal.open()
  }
}
