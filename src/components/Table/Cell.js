import React, { Component } from 'react'
import classNames from 'classnames'

import { formatDateForClient } from '../../helpers/date'

export default class Cell extends Component {
  render() {
    const { column, editedCell, row } = this.props
    const isEditing = editedCell === `${row.id}_${column.value}`

    if (isEditing) {
      return this.renderInput()
    }
    return this.renderValue()
  }

  renderInput = () => {
    const { column, row, select } = this.props

    if (column.type === 'select') {
      return (
        <div className="td">
          <select
            defaultValue={row[column.value]}
            onChange={this.blurCell}
            ref={node => this[column.value] = node}
          >
            {select[column.value].map(item => <option key={item.key} value={item.key}>{item.value}</option>)}
          </select>
        </div>
      )
    }

    const className = classNames('input', {
      'td_date': column.type === 'date',
      'tar': column.type === 'number'
    })

    return (
      <div className="td td_editing">
        <div className="td-editingspan">{this.renderValueByType(column, row[column.value])}</div>
        <input
          type={this.getInputType(column.type)}
          autoFocus
          onBlur={this.blurCell}
          defaultValue={row[column.value]}
          className={className}
          ref={node => this[column.value] = node}
        />
      </div>
    )
  }

  getInputType = (type) => {
    if (type === 'number') {
      return 'string'
    }
    return type
  }

  renderValue = () => {
    const { row, column } = this.props

    const className = classNames('td', {
      'td_date': column.type === 'date',
      'tar': column.type === 'number'
    })

    return (
      <div className={className} onClick={this.clickCell}>
        {this.renderValueByType(column, row[column.value])}
      </div>
    )
  }

  renderValueByType = (column, value) => {
    switch (column.type) {
      case 'text':
        return value
      case 'number':
        return Number(value).toLocaleString('ru')
      case 'date':
        return formatDateForClient(value)
      case 'select':
        return this.getValueFromSelect(column.value, value)
      default:
        return ''
    }
  }

  getValueFromSelect = (columnValue, value) => {
    const { select } = this.props

    if (select[columnValue].length > 0) {
      const selectedOption = select[columnValue].find(item => item.key === value)
      return selectedOption.value
    }

    return ''
  }

  blurCell = () => {
    const { column, editCell, row, updateTransaction } = this.props

    const newValue = this.getNewValueByType(column.type, this[column.value].value)

    const params = {
      id: row.id,
      account_id: row.account_id,
    }
    const transaction = {
      [column.value]: newValue
    }
    if (row[column.value] !== newValue) {
      updateTransaction(params, transaction, () => { editCell('') })
    } else {
      editCell('')
    }
  }

  getNewValueByType = (type, value) => {
    switch (type) {
      case 'text':
        return value.toString()
      case 'number':
        return Number(value)
      case 'date':
        return value
      case 'select':
        return Number(value)
      default:
        return ''
    }
  }

  clickCell = () => {
    const { column, editCell, editedCell, row } = this.props
    const editId = `${row.id}_${column.value}`

    if (editedCell) {
      editCell('')
    } else {
      editCell(editId)
    }
  }
}
