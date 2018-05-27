import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Guest extends Component {
  render() {
    return (
      <Link to="/users/sign_in" className="navbar-item">Войти</Link>
    )
  }
}
