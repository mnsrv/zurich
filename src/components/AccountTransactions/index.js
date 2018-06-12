import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import stores from '../../stores'

import Row from './Row'
import Spinner from '../Spinner'

@inject('endpoint')
@observer
export default class Transactions extends Component {
  constructor(props) {
    super(props)

    const { endpoint, match } = props
    const { accountId, budgetId } = match.params

    this.accounts = new stores.Account(endpoint, `v1/${budgetId}`)

    this.state = {
      isAdding: false,
      editedId: ''
    }
  }

  componentDidMount() {
    const { budget, match } = this.props
    const { params } = match
    const { accountId } = params

    this.accounts.findBy({ id: accountId })
  }

  render() {
    const { account } = this.accounts.selected
    
    if (!account) {
      return null
    }

    return (
      <section className="section">
        <div className="container">
          <h1 className="title">{account.name}</h1>
          <div className="field is-grouped">
            <button className="button" onClick={this.startAdding}>Добавить</button>
          </div>
          {this.renderTable()}
        </div>
      </section>
    )
  }

  renderAdding = () => {
    if (!this.state.isAdding) {
      return null
    }
    const newCell = {
      date: '',
      memo: '',
      amount: 0
    }
    return (
      <Row
        key="new"
        id="new"
        {...newCell}
        isEdited={true}
        onClick={this.doNothing}
        cancelEdit={this.cancelAdding}
      />
    )
  }

  renderTable = () => {
    const { isLoading } = this.accounts

    if (isLoading) {
      return <Spinner />
    }

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Заметка</th>
            <th>Сумма</th>
          </tr>
        </thead>
        <tbody>
          {this.renderAdding()}
          {this.renderRows()}
        </tbody>
      </table>
    )
  }

  renderRows = () => {
    const { account } = this.accounts.selected

    return account.transactions.map(({ id, ...props }) => (
      <Row
        key={id.toString()}
        id={id}
        {...props}
        create={() => { console.log('TODO: create') }}
        isEdited={id === this.state.editedId}
        onClick={(e) => this.editCell(id, e)}
        cancelEdit={this.cancelEdit}
      />
    ))
  }

  startAdding = () => {
    this.setState({ isAdding: true })
  }

  cancelAdding = () => {
    this.setState({ isAdding: false })
  }

  editCell = (id) => {
    this.setState({ editedId: id })
  }

  cancelEdit = () => {
    this.setState({ editedId: '' })
  }

  doNothing = () => { }
}
