import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Hello World</h1>
          <p className="subtitle">My first website with <strong>Bulma</strong>!</p>
          <nav className="navbar">
            <div className="navbar-menu">
              <div className="navbar-start">
                <Link to="/" className="navbar-item">Home</Link>
                <Link to="/users/sign_in" className="navbar-item">Sign in</Link>
              </div>
            </div>
          </nav>
        </div>
      </section>
    )
  }
}
