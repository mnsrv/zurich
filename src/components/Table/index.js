import React, { Component } from 'react'
import classNames from 'classnames'

export default class GalleonTable extends Component {
  render() {
    const { columns, data } = this.props

    return (
      <div className="table is-fullwidth">
        <div className="thead">
          <div className="tr">
            {columns.map(column => <div key={column.value} className="th">{column.label}</div>)}
          </div>
        </div>
        <div className="tbody">
          {this.renderAdding()}
          {data.map(row => (
            <div className="tr" key={row.id}>
              {columns.map(column => <div key={column.value} className="td">{row[column.value]}</div>)}
            </div>
          ))}
        </div>
      </div>
    )
  }

  renderAdding = () => {
    const { columns, isAdding } = this.props

    if (!isAdding) {
      return null
    }

    return [
      <div key="add" className="tr is-selected">
        {columns.map(column => (
          <div key={column.value} className="td is-adding">
            <input className="input" type="text" ref={node => this[column.value] = node} />
          </div>
        ))}
      </div>,
      <div key="add-actions" className="tr is-selected">
        {columns.map((column, index) => (
          <div key={column.value} className={classNames('td', { 'action-buttons-container': index === columns.length - 1 })}>
            {index === columns.length - 1 ? (
              <div className="buttons action-buttons">
                <button className="button" onClick={this.cancel}>Отмена</button>
                <button className="button is-primary" onClick={this.save}>Сохранить</button>
              </div>
            ) : '   '}
          </div>
        ))}
      </div>
    ]
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
