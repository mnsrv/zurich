import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('transactions')
@observer
export default class Row extends Component {
  constructor(props) {
    super()

    this.state = {
      date: props.date,
      memo: props.memo,
      amount: props.amount
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isEdited !== this.props.isEdited) {
      this.setState({ date: nextProps.date, memo: nextProps.memo, amount: nextProps.amount })
    }
  }

  render() {
    const { id, isEdited, cancelEdit } = this.props

    if (isEdited) {
      return [
        <tr key={`${id}-form`}>
          {this.renderCell('date', this.state.date, 'text')}
          {this.renderCell('memo', this.state.memo, 'text')}
          {this.renderCell('amount', this.state.amount, 'number')}
        </tr>,
        <tr key={`${id}-submit`}>
          <td colSpan={3} className="td_edit">
            <button className="button is-success mr" onClick={this.saveCell}>Сохранить</button>
            <button className="button is-danger mr" onClick={this.deleteCell}>Удалить</button>
            <button className="button is-light" onClick={cancelEdit}>Отменить</button>
          </td>
        </tr>
      ]
    }

    return (
      <tr>
        {this.renderCell('date', this.state.date, 'text')}
        {this.renderCell('memo', this.state.memo, 'text')}
        {this.renderCell('amount', this.state.amount, 'number')}
      </tr>
    )
  }

  renderCell = (name, value, type) => {
    const { isEdited, onClick } = this.props

    if (isEdited) {
      return (
        <td className="pointer" onClick={onClick}><input className="input" type={type} size="1" value={value} onChange={(e) => { this.onChange(e, name) }} /></td>
      )
    }
    return <td className="pointer td_padding" onClick={onClick}>{value}</td>
  }

  onChange = (e, name) => {
    const newState = {}
    newState[name] = e.target.value
    this.setState(newState)
  }

  saveCell = () => {
    const { saveCell } = this.props
    const { date, memo, amount } = this.state

    saveCell({ date, memo, amount })
  }

  deleteCell = () => {
    this.props.transactions.remove(this.props.id)
  }
}
