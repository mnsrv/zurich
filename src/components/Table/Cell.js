import React, { Component } from 'react'

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
    const { row, column } = this.props

    // TODO: render min width for input types
    return (
      <div className="td td_editing">
        <div className="td-editingspan">{row[column.value]}</div>
        <input
          type={column.type}
          autoFocus
          onBlur={this.blurCell}
          defaultValue={row[column.value]}
          className="input"
          ref={node => this[column.value] = node}
        />
      </div>
    )
  }

  renderValue = () => {
    const { row, column } = this.props

    return (
      <div className="td" onClick={this.clickCell}>
        {row[column.value]}
      </div>
    )
  }

  blurCell = () => {
    const { column, editCell, row, updateTransaction } = this.props

    const newValue = this.getNewValueByType(column.type, this[column.value].value)

    const transaction = {
      id: row.id,
      [column.value]: newValue
    }
    if (row[column.value] !== newValue) {
      updateTransaction(transaction)
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
