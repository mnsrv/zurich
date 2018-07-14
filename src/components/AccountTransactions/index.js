import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import stores from '../../stores'

import Table from '../Table'
import Spinner from '../Spinner'
import { formatDateForServer } from '../../helpers/date'

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
    const { match } = this.props
    const { accountId } = match.params

    this.accounts.findBy({ id: accountId })
    this.transactions.findAll({ accounts: accountId })
  }

  componentWillReceiveProps(nextProps) {
    const { match } = nextProps
    const { accountId } = match.params

    if (this.props.match.params.accountId !== accountId) {
      this.accounts.findBy({ id: accountId })
      this.transactions.findAll({ accounts: accountId })
    }
  }

  render() {
    const { account } = this.accounts.selected

    if (!account) {
      return null
    }

    // TODO: delete transaction

    return (
      <section className="section">
        <h1 className="title">{account.name}</h1>
        <div className="field is-grouped">
          <button className="button is-small" onClick={this.createEmptyTransaction}>Добавить</button>
        </div>
        {this.renderTable()}
      </section>
    )
  }

  renderTable = () => {
    const { collection } = this.transactions
    const { isLoading } = this.accounts

    if (isLoading) {
      return <Spinner />
    }

    return (
      <Table
        data={collection}
        columns={this.columns}
        updateTransaction={this.updateTransaction}
      />
    )
  }

  createTransaction = (transaction) => {
    const { match } = this.props
    const { accountId } = match.params

    this.transactions.create({ accounts: accountId }, { transaction }, {
      201: (response) => {
        this.transactions.appendToCollection(response.data.transaction)
      }
    })
  }

  updateTransaction = (params, transaction, callback) => {
    const { match } = this.props
    const { accountId } = match.params

    this.transactions.update({ accounts: accountId, id: params.id }, { transaction }, {
      200: (response) => {
        this.transactions.modifyInCollection(response.data.transaction)
        callback()
      }
    })
  }

  getDefaultValueByType = (type) => {
    switch (type) {
      case 'text':
        return ''
      case 'number':
        return 0
      case 'date':
        return formatDateForServer()
      default:
        return ''
    }
  }

  createEmptyTransaction = () => {
    const emptyTransaction = this.columns.reduce((result, item) => {
      result[item.value] = this.getDefaultValueByType(item.type)
      return result
    }, {})
    this.createTransaction(emptyTransaction)
  }
}
