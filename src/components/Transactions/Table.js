import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import Row from './Row'

@inject('transactions')
@observer
export default class Table extends Component {
  state = {
    editedId: ''
  }

  componentWillMount() {
    this.props.transactions.fetchAll()
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Транзакции</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Дата</th>
                <th>Заметка</th>
                <th>Сумма</th>
              </tr>
            </thead>
            <tbody>
              {this.props.transactions.all.map(({ id, ...props }) => (
                <Row
                  key={id.toString()}
                  id={id}
                  {...props}
                  isEdited={id === this.state.editedId}
                  onClick={(e) => this.editCell(id, e)}
                  cancelEdit={this.cancelEdit}
                  saveCell={this.saveCell}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    )
  }

  editCell = (id) => {
    this.setState({ editedId: id })
  }

  cancelEdit = () => {
    this.setState({ editedId: '' })
  }

  saveCell = (newCell) => {
    console.log(newCell)
    // const cellIndex = this.state.transactions.findIndex(item => item.id === this.state.editedId)
    // const newTransactions = [...this.state.transactions]
    // newTransactions[cellIndex] = { ...this.state.transactions[cellIndex], ...newCell }
    // this.setState({ editedId: '', transactions: newTransactions })
  }
}
