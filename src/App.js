import React, { Component } from 'react';

const data = [
  { id: '3', date: '20.05.2018', memo: 'Пекарня', amount: 250 },
  { id: '2', date: '19.05.2018', memo: 'Магнит', amount: 730 },
  { id: '1', date: '01.04.2018', memo: 'Мосцветорг', amount: 1500 }
]

class Table extends Component {
  state = {
    editedId: ''
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Дата</th>
                <th>Заметка</th>
                <th>Сумма</th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ id, ...props }) => (
                <Row key={id} {...props} isEdited={id === this.state.editedId} onClick={(e) => this.editCell(id, e)} cancelEdit={this.cancelEdit} saveCell={this.saveCell} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    )
  }

  editCell = (id) => {
    this.setState({ editedId: id })
  }

  cancelEdit = () => {
    this.setState({ editedId: '' })
  }

  saveCell = (newCell) => {
    const cellIndex = data.findIndex(item => item.id === this.state.editedId)
    data[cellIndex] = { ...data[cellIndex], ...newCell }
    this.setState({ editedId: '' })
  }
}

class Row extends Component {
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
            <button className="button is-danger" onClick={cancelEdit}>Отменить</button>
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
}

class App extends Component {
  render() {
    return [
      <section key="header" className="section">
        <div className="container">
          <h1 className="title">Hello World</h1>
          <p className="subtitle">My first website with <strong>Bulma</strong>!</p>
        </div>
      </section>,
      <Table key="table" />
    ]
  }
}

export default App;
