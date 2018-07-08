import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import stores from '../../stores'

import Table from '../Table'
import Spinner from '../Spinner'

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

    // todo: add input type
    const columns = [{
      label: 'Дата',
      value: 'date'
    }, {
      label: 'Заметка',
      value: 'memo'
    }, {
      label: 'Сумма',
      value: 'amount'
    }]

    return (
      <Table
        data={collection}
        columns={columns}
        isAdding={this.state.isAdding}
        createTransaction={this.createTransaction}
        updateTransaction={this.updateTransaction}
        editCell={this.editCell}
        editedCell={this.state.editedCell}
      />
    )
  }

  startAdding = () => {
    this.setState({ isAdding: true })
  }

  editCell = (id) => {
    this.setState({ editedCell: id })
  }
}
