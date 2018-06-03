import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import NewBudget from './Budgets/New'

@inject('settings')
@observer
export default class Welcome extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="title">Список бюджетов</h1>
        <button className="button is-primary" onClick={this.openModal}>Создать бюджет</button>
      </div>
    )
  }

  openModal = () => {
    const { settings } = this.props

    settings.layout.modal.setContent(<NewBudget close={settings.layout.modal.close} />)
    settings.layout.modal.open()
  }
}
