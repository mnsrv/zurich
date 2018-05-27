import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import Row from './Row'

@inject('transactions')
@observer
export default class Table extends Component {
  state = {
    isAdding: false,
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
          <div className="field is-grouped">
            <button className="button" onClick={this.startAdding}>Добавить</button>
          </div>
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
              {this.props.transactions.all.map(({ id, ...props }) => (
                <Row
                  key={id.toString()}
                  id={id}
                  {...props}
                  isEdited={id === this.state.editedId}
                  onClick={(e) => this.editCell(id, e)}
                  cancelEdit={this.cancelEdit}
                />
              ))}
            </tbody>
          </table>
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

  doNothing = () => {}
}
