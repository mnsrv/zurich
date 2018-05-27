import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Guest extends Component {
  render() {
    return (
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">Главная</Link>
        </div>
        <div className="navbar-end">
          <Link to="/users/sign_in" className="navbar-item">Войти</Link>
        </div>
      </div>
    )
  }
}
