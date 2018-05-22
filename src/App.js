import React, { Component } from 'react'

import Table from './components/Table'

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

export default App
