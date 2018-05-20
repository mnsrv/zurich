import React, { Component } from 'react';

const data = [
  { id: '3', date: '20.05.2018', memo: 'Пекарня', amount: 250 },
  { id: '2', date: '19.05.2018', memo: 'Магнит', amount: 730 },
  { id: '1', date: '01.04.2018', memo: 'Мосцветорг', amount: 1500 }
]

const Row = ({ id, date, memo, amount }) => (
  <tr key={id}>
    <td>{date}</td>
    <td>{memo}</td>
    <td>{amount}</td>
  </tr>
)

class App extends Component {
  render() {
    return [
      <section key="header" className="section">
        <div className="container">
          <h1 className="title">Hello World</h1>
          <p className="subtitle">My first website with <strong>Bulma</strong>!</p>
        </div>
      </section>,
      <section key="table" className="section">
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
              {data.map(({ id, ...props }) => <Row key={id} {...props} />)}
            </tbody>
          </table>
        </div>
      </section>
    ]
  }
}

export default App;
