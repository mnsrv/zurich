import React, { Component } from 'react'
// import { inject, observer } from 'mobx-react'

import Table from '../Table'
// import stores from '../../stores'

// @inject('endpoint')
// @observer
export default class Budget extends Component {
  constructor(props) {
    super(props)

  //   const { endpoint, match } = props
  //   const { budgetId } = match.params

  //   this.accounts = new stores.Account(endpoint, `v1/${budgetId}`)
  //   this.transactions = new stores.Transaction(endpoint, `v1/${budgetId}`)

    this.columns = [{
      label: 'Категория',
      value: 'category',
      type: 'text'
    }, {
      label: 'Запланировано',
      value: 'budgeted',
      type: 'number'
    }, {
      label: 'Потрачено',
      value: 'activity',
      type: 'number'
    }, {
      label: 'Доступно',
      value: 'available',
      type: 'number'
    }]
  }

  // componentDidMount() {
  //   const { match } = this.props
  //   const { accountId } = match.params

  //   this.accounts.findBy({ id: accountId })
  //   this.transactions.findAll({ accounts: accountId })
  // }

  // componentWillReceiveProps(nextProps) {
  //   const { match } = nextProps
  //   const { accountId } = match.params

  //   if (this.props.match.params.accountId !== accountId) {
  //     this.accounts.findBy({ id: accountId })
  //     this.transactions.findAll({ accounts: accountId })
  //   }
  // }

  render() {
    return (
      <section className="section">
        <h1 className="title">Бюджет</h1>
        <div className="field is-grouped">
          <button className="button is-small" onClick={this.createEmptyTransaction}>Добавить группу категорий</button>
        </div>
        {this.renderTable()}
      </section>
    )
  }

  createEmptyTransaction = () => {

  }

  renderTable = () => {
    const data = []

    return (
      <Table
        data={data}
        columns={this.columns}
      />
    )
  }
}
