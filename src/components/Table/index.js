import React, { Component } from 'react'
import classNames from 'classnames'

export default class GalleonTable extends Component {
  render() {
    const { data } = this.props

    return (
      <div className="table is-fullwidth">
        <div className="thead">
          {this.renderHeadRow()}
        </div>
        <div className="tbody">
          {this.renderAddingRows()}
          {data.map(this.renderRow)}
        </div>
      </div>
    )
  }

  renderHeadRow = () => {
    const { columns } = this.props

    return (
      <div className="tr">
        {columns.map(column => {
          const cellClassName = classNames('th', { [`th-${column.value}`]: true })

          return <div key={column.value} className={cellClassName}>{column.label}</div>
        })}
      </div>
    )
  }

  renderRow = (row) => {
    const { columns, selectedId, selectRow } = this.props

    const rowClassName = classNames('tr', {
      'is-selected': row.id === selectedId
    })

    return (
      <div className={rowClassName} key={row.id} onClick={() => selectRow(row.id)}>
        {columns.map(column => {
          const cellClassName = classNames('td', { [`td-${column.value}`]: true })

          if (column.value === 'checkbox') {
            return (
              <div key={column.value} className={cellClassName}>
                <input type="checkbox" checked={row.id === selectedId} onChange={() => this.toggleSelection(row.id)} />
              </div>
            )
          }

          return <div key={column.value} className={cellClassName}>{row[column.value]}</div>
        })}
      </div>
    )
  }

  renderAddRow = () => {
    const { columns } = this.props

    return (
      <div className="tr is-selected" key="add">
        {columns.map(column => (
          <div key={column.value} className="td is-adding">
            <input className="input" type="text" ref={node => this[column.value] = node} />
          </div>
        ))}
      </div>
    )
  }

  renderAddActionsRow = () => {
    const { columns } = this.props

    return (
      <div key="add-actions" className="tr is-selected">
        {columns.map((column, index) => {
          const isLast = index === columns.length - 1
          const className = classNames('td', {
            'action-buttons-container': isLast
          })

          return (
            <div key={column.value} className={className}>
              {isLast
                ? (
                  <div className="action-buttons">
                    <button className="button" onClick={this.cancel}>Отмена</button>
                    <button className="button is-primary is-inverted is-outlined" onClick={this.save}>Сохранить</button>
                  </div>
                )
                : '   '}
            </div>
          )
        })}
      </div>
    )
  }

  renderAddingRows = () => {
    const { isAdding } = this.props

    if (!isAdding) {
      return null
    }

    return [
      this.renderAddRow(),
      this.renderAddActionsRow()
    ]
  }

  toggleSelection = (id) => {
    const { selectedId, cancelSelect, selectRow } = this.props

    if (id === selectedId) {
      cancelSelect()
    } else {
      selectRow(id)
    }
  }

  save = () => {
    const { columns, cancelAdding, createTransaction } = this.props

    const transaction = columns.reduce((result, item, index, array) => {
      result[item.value] = this[item.value].value
      return result
    }, {})

    createTransaction(transaction)
    cancelAdding()
  }

  cancel = () => {
    const { cancelAdding } = this.props

    cancelAdding()
  }
}
