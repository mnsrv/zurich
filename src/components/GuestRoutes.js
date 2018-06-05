import React from 'react'
import { Route } from 'react-router-dom'

import Login from './Auth/Login'
import Register from './Auth/Register'

const GuestRoutes = () => [
  <Route key="login" path="/users/sign_in" component={Login} />,
  <Route key="register" path="/users/sign_up" component={Register} />
]

export default GuestRoutes
