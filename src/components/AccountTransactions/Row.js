import React, { Component } from 'react'

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
            <button className="button is-primary mr" onClick={this.saveCell}>Сохранить</button>
            {id !== 'new' && <button className="button is-danger mr" onClick={this.deleteCell}>Удалить</button>}
            <button className="button" onClick={cancelEdit}>Отменить</button>
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
    const { cancelEdit, create, id } = this.props
    const { date, memo, amount } = this.state

    if (id === 'new') {
      create({ date, memo, amount })
    } else {
      // TODO: update
      console.log({ date, memo, amount })
    }
    cancelEdit()
  }

  deleteCell = () => {
    this.props.transactions.remove(this.props.id)
  }
}
