import React, { Component } from 'react'

import Modal from './Modal'

export default class Welcome extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="title">Бюджет</h1>
        <button className="button is-primary">Создать бюджет</button>
      </div>
    )
  }
}
