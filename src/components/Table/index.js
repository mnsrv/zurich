import React, { Component } from 'react'
import classNames from 'classnames'

import Cell from './Cell'

export default class Table extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editedCell: ''
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  render() {
    const { data } = this.props

    return (
      <div className="table">
        <div className="thead">
          {this.renderHeadRow()}
        </div>
        <div className="tbody">
          {data.sort((a, b) => new Date(b.date) - new Date(a.date)).map(this.renderRow)}
        </div>
      </div>
    )
  }

  renderHeadRow = () => {
    const { columns } = this.props

    return (
      <div className="tr">
        <div />
        {columns.map(column => {
          const className = classNames('th', {
            'tar': column.type === 'number'
          })

          return <div key={column.value} className={className}>{column.label}</div>
        })}
      </div>
    )
  }

  renderRow = (row) => {
    const { columns, select, updateTransaction } = this.props
    const { editedCell } = this.state

    return (
      <div className="tr" key={row.id}>
        <button className="button tr_delete" onClick={this.deleteRow(row)}>
          <span className="icon is-small">
            <i className="fas fa-times" />
          </span>
        </button>
        {columns.map(column => (
          <Cell
            key={column.value}
            row={row}
            column={column}
            select={select}
            editCell={this.editCell}
            editedCell={editedCell}
            updateTransaction={updateTransaction}
          />
        ))}
      </div>
    )
  }

  deleteRow = (row) => () => {
    const { deleteTransaction } = this.props

    const confirmed = window.confirm(`Удалить транзакцию #${row.id}`);
    if (confirmed) {
      deleteTransaction({ account_id: row.account_id, id: row.id })
    }
  }

  editCell = (id) => {
    this.setState({ editedCell: id })
  }

  escFunction = (event) => {
    if (event.keyCode === 27) {
      this.editCell('')
    }
  }
}
