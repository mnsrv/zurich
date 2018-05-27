import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'

@inject('user')
@observer
export default class New extends Component {
  render() {
    if (this.props.user.signedIn) {
      return <Redirect to="/" />
    }
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Представьтесь</h1>
          <div className="columns">
            <div className="column is-one-third">
              <form onSubmit={this.submitForm}>
                <div className="field">
                  <label className="label">Почта</label>
                  <div className="control">
                    <input
                      ref={node => { this.email = node }}
                      className="input"
                      type="email"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Пароль</label>
                  <div className="control">
                    <input
                      ref={node => { this.password = node }}
                      className="input"
                      type="password"
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <button className="button is-primary">Это я</button>
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

    const { user } = this.props

    user.createSession(this.email.value, this.password.value)
  }
}
