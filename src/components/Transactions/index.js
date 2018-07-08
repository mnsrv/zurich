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

    this.transactions = new stores.Transaction(endpoint, `v1/${budgetId}`)

    // TODO: select accounts
    // TODO: render account name instead of id
    this.columns = [{
      label: 'Дата',
      value: 'date',
      type: 'date'
    }, {
      label: 'Счёт',
      value: 'account_id',
      type: 'text'
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
    const { collection } = this.transactions

    return (
      <Table
        data={collection}
        columns={this.columns}
        updateTransaction={this.updateTransaction}
      />
    )
  }

  updateTransaction = (transaction, callback) => {
    this.transactions.update({ accounts: transaction.account_id, id: transaction.id }, { transaction }, {
      200: (response) => {
        this.transactions.modifyInCollection(response.data.transaction)
        callback()
      }
    })
  }
}
