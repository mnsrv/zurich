import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('budget')
@observer
export default class NewBudget extends Component {
  render() {
    const { close } = this.props

    return (
      <form className="modal-card" onSubmit={this.onSubmit}>
        <header className="modal-card-head">
          <p className="modal-card-title">Новый бюджет</p>
          <button className="delete" aria-label="close" onClick={close} />
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Название</label>
            <div className="control">
              <input className="input" type="text" ref={node => this.name = node} />
            </div>
          </div>
          <div className="field">
            <label className="label">Валюта</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select ref={node => this.currency = node} defaultValue="RUB">
                  <option value="RUB">Российский рубль – RUB</option>
                  <option value="USD">Американский доллар – USD</option>
                </select>
              </div>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot buttons is-right">
          <button className="button" onClick={close}>Отмена</button>
          <button className="button is-primary">Создать бюджет</button>
        </footer>
      </form>
    )
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { budget } = this.props

    budget.create({}, {
      budget: {
        name: this.name.value,
        currency: this.currency.value
      }
    })
  }
}
