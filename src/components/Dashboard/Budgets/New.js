import React, { Component } from 'react'

export default class NewBudget extends Component {
  render() {
    const { close } = this.props

    return (
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Новый бюджет</p>
          <button className="delete" aria-label="close" onClick={close} />
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Название</label>
            <div className="control">
              <input className="input" type="text" />
            </div>
          </div>
          <div className="field">
            <label className="label">Валюта</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select>
                  <option>Американский доллар – USD</option>
                  <option>Российский рубль – RUB</option>
                </select>
              </div>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot buttons is-right">
          <button className="button" onClick={close}>Отмена</button>
          <button className="button is-primary">Создать бюджет</button>
        </footer>
      </div>
    )
  }
}
