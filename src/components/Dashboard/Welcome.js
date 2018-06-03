import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('settings')
@observer
export default class Welcome extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="title">Список бюджетов</h1>
        <button className="button is-primary" onClick={this.openModal}>Создать бюджет</button>
      </div>
    )
  }

  openModal = () => {
    const { settings } = this.props

    settings.layout.modal.setContent(
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Новый бюджет</p>
          <button className="delete" aria-label="close" onClick={settings.layout.modal.close} />
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
          <button className="button" onClick={settings.layout.modal.close}>Отмена</button>
          <button className="button is-primary">Создать бюджет</button>
        </footer>
      </div>
    )
    settings.layout.modal.open()
  }
}
