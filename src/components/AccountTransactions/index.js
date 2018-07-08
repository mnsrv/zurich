import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import stores from '../../stores'

import Table from '../Table'
import Spinner from '../Spinner'
import { formatDate } from '../../helpers/date'

@inject('endpoint')
@observer
export default class Transactions extends Component {
  constructor(props) {
    super(props)

    const { endpoint, match } = props
    const { budgetId } = match.params

    this.accounts = new stores.Account(endpoint, `v1/${budgetId}`)
    this.transactions = new stores.Transaction(endpoint, `v1/${budgetId}`)

    this.state = {
      isAdding: false,
      editedCell: ''
    }

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
          <button className="button is-small" onClick={this.startAdding}>Добавить</button>
        </div>
        {this.renderTable()}
      </section>
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

  updateTransaction = (transaction) => {
    const { match } = this.props
    const { accountId } = match.params

    this.transactions.update({ accounts: accountId, id: transaction.id }, { transaction }, {
      200: (response) => {
        this.transactions.modifyInCollection(response.data.transaction)
        this.editCell('')
      }
    })
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
        isAdding={this.state.isAdding}
        createTransaction={this.createTransaction}
        updateTransaction={this.updateTransaction}
        editCell={this.editCell}
        editedCell={this.state.editedCell}
      />
    )
  }

  getDefaultValueByType = (type) => {
    switch (type) {
      case 'text':
        return ''
      case 'number':
        return 0
      case 'date':
        return formatDate()
      default:
        return ''
    }
  }

  startAdding = () => {
    const emptyTransaction = this.columns.reduce((result, item) => {
      result[item.value] = this.getDefaultValueByType(item.type)
      return result
    }, {})
    this.createTransaction(emptyTransaction)
  }

  editCell = (id) => {
    this.setState({ editedCell: id })
  }
}
