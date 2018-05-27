import React, { Component } from 'react'

export default class New extends Component {
  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Представьтесь</h1>
          <div class="columns">
            <div class="column is-half">
              <form>
                <div className="field">
                  <label className="label">Почта</label>
                  <div className="control">
                    <input className="input" type="email" />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Пароль</label>
                  <div className="control">
                    <input className="input" type="password" />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <button className="button is-primary">Sign In</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
