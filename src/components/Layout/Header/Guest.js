import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Guest extends Component {
  render() {
    return (
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/users/sign_in" className="navbar-item">Вход</Link>
          <Link to="/users/sign_up" className="navbar-item">Регистрация</Link>
        </div>
      </div>
    )
  }
}
