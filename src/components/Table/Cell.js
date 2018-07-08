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

    return (
      <div className="td td_editing">
        <div className="td-editingspan">{row[column.value]}</div>
        <input
          type="text"
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
    const { column, row, updateTransaction } = this.props

    const transaction = {
      id: row.id,
      [column.value]: this[column.value].value
    }
    // todo: update only if diff
    updateTransaction(transaction)
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
