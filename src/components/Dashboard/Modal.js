import React, { Component } from 'react'
import classNames from 'classnames'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react'

@observer
export default class Modal extends Component {
  @observable isOpen = false

  @action open = (e) => {
    if (e) { e.preventDefault() }

    this.isOpen = true
  }

  @action close = (e) => {
    if (e) { e.preventDefault() }

    this.isOpen = false
  }

  render() {
    const modalClasses = classNames('modal', { 'is-active': this.isOpen })

    return (
      <div className={modalClasses}>
        <div className="modal-background" onClick={this.close} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Новый бюджет</p>
            <button className="delete" aria-label="close" onClick={this.close} />
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
            <button className="button" onClick={this.close}>Отмена</button>
            <button className="button is-primary">Создать бюджет</button>
          </footer>
        </div>
      </div>
    )
  }
}
