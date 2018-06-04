import React, { Component } from 'react'
import classNames from 'classnames'
import { inject, observer } from 'mobx-react'
import { Link, Redirect } from 'react-router-dom'

@inject('user')
@observer
export default class Login extends Component {
  render() {
    const { user } = this.props
    const { isLoading, signedIn } = user

    if (this.props.user.signedIn) {
      return <Redirect to="/" />
    }

    const buttonClasses = classNames('button', 'is-primary', {
      'is-loading': isLoading
    })

    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-one-third is-offset-one-third">
              <h1 className="title has-text-centered">Вход</h1>
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
                <div className="field is-grouped">
                  <div className="control">
                    <button className={buttonClasses}>Войти</button>
                  </div>
                  <div className="control">
                    <Link to="/users/sign_up" className="button is-text">Регистрация</Link>
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

    user.signIn(this.email.value, this.password.value)
  }
}
