import React, { Component } from 'react'
import classNames from 'classnames'

import Cell from './Cell'

export default class GalleonTable extends Component {
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
          {this.renderAddRow()}
          {data.sort((a, b) => new Date(b.date) - new Date(a.date)).map(this.renderRow)}
        </div>
      </div>
    )
  }

  renderHeadRow = () => {
    const { columns } = this.props

    return (
      <div className="tr">
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
    const { columns, editCell, editedCell, updateTransaction } = this.props

    return (
      <div className="tr" key={row.id}>
        {columns.map(column => (
          <Cell
            key={column.value}
            row={row}
            column={column}
            editCell={editCell}
            editedCell={editedCell}
            updateTransaction={updateTransaction}
          />
        ))}
      </div>
    )
  }

  renderAddRow = () => {
    const { columns, isAdding } = this.props

    if (!isAdding) {
      return null
    }

    return (
      <div className="tr">
        {columns.map(column => {
          return (
            <div key={column.value} className="td">
              <input className="input" type="text" ref={node => this[column.value] = node} />
            </div>
          )
        })}
      </div>
    )
  }

  save = () => {
    const { columns, createTransaction } = this.props

    const transaction = columns.reduce((result, item, index, array) => {
      result[item.value] = this[item.value].value
      return result
    }, {})

    createTransaction(transaction)
  }

  escFunction = (event) => {
    const { editCell } = this.props

    if (event.keyCode === 27) {
      editCell('')
    }
  }
}
