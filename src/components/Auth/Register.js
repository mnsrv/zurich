import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'

@inject('user')
@observer
export default class Register extends Component {
  render() {
    if (this.props.user.signedIn) {
      return <Redirect to="/" />
    }
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Регистрация</h1>
          <div className="columns">
            <div className="column is-one-third">
              <form onSubmit={this.submitForm}>
                <div className="field">
                  <div className="control">
                    <input
                      ref={node => { this.email = node }}
                      className="input"
                      type="email"
                      placeholder="Почта"
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      ref={node => { this.password = node }}
                      className="input"
                      type="password"
                      placeholder="Пароль"
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      ref={node => { this.repeatPassword = node }}
                      className="input"
                      type="password"
                      placeholder="Повторите пароль"
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <button className="button is-primary">Регистрация</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }

  submitForm = (e) => {
    e.preventDefault()
  }
}
