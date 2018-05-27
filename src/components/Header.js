import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="container">
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">Главная</Link>
            <Link to="/users/sign_in" className="navbar-item">Войти</Link>
          </div>
        </div>
        </div>
      </nav>
    )
  }
}
