import React, { Component } from 'react'

import Modal from './Modal'

export default class Welcome extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="title">Бюджет</h1>
        <button className="button is-primary" onClick={this.openModal}>Создать бюджет</button>
        <Modal ref={this.refModal} />
      </div>
    )
  }

  refModal = (node) => {
    this.modal = node
  }

  openModal = () => {
    this.modal.open()
  }

  modal
}
