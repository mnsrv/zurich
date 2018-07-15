import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import stores from '../../stores'

import Table from '../Table'

@inject('endpoint')
@observer
export default class Transactions extends Component {
  constructor(props) {
    super(props)

    const { endpoint, match } = props
    const { budgetId } = match.params

    this.accounts = new stores.Account(endpoint, `v1/${budgetId}`)
    this.transactions = new stores.Transaction(endpoint, `v1/${budgetId}`)

    this.columns = [{
      label: 'Дата',
      value: 'date',
      type: 'date'
    }, {
      label: 'Счёт',
      value: 'account_id',
      type: 'select'
    }, {
      label: 'Заметка',
      value: 'memo',
      type: 'text'
    }, {
      label: 'Сумма',
      value: 'amount',
      type: 'number'
    }]
  }

  componentDidMount() {
    this.accounts.findAll()
    this.transactions.findAll()
  }

  render() {
    return (
      <section className="section">
        <h1 className="title">Все счета</h1>
        {this.renderTable()}
      </section>
    )
  }

  renderTable = () => {
    const { collection: accountsCollection } = this.accounts
    const { collection } = this.transactions
    const select = {
      account_id: accountsCollection.map(this.formatAccountId)
    }

    return (
      <Table
        data={collection}
        columns={this.columns}
        select={select}
        updateTransaction={this.updateTransaction}
        deleteTransaction={this.deleteTransaction}
      />
    )
  }

  formatAccountId = (item) => ({
    key: item.id,
    value: item.name
  })

  updateTransaction = (params, transaction, callback) => {
    this.transactions.update({ accounts: params.account_id, id: params.id }, { transaction }, {
      200: (response) => {
        this.transactions.modifyInCollection(response.data.transaction)
        callback()
      }
    })
  }

  deleteTransaction = (params) => {
    this.transactions.delete({ accounts: params.account_id, id: params.id })
  }
}
