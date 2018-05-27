import { observable, action } from 'mobx'

import Api from '../../helpers/api'

class User {
  @observable isLoading = false
  @observable signedIn = false
  @observable email = null

  @action setIsLoading(status) {
    this.isLoading = status
  }

  @action setSignedIn(status, email) {
    this.signedIn = status
    if (status && email) {
      this.email = email
    }
  }

  signIn(email = null, password = null) {
    const store = {
      authentication_token: localStorage.getItem('token'),
      email: localStorage.getItem('email')
    }

    if (store.email && store.authentication_token) {
      this.signInFromStorage()
    } else if (email, password) {
      this.createSession(email, password)
    }
  }

  @action signInFromStorage() {
    this.email = localStorage.getItem('email')
    this.signedIn = true
    this.isLoading = false
  }

  async createSession(email, password) {
    this.setIsLoading(true)

    const response = await Api.post('/sessions', { email, password })
    const status = await response.status

    if (status === 201) {
      const body = await response.json()
      const { user } = body.data

      localStorage.setItem('token', user.authentication_token)
      localStorage.setItem('email', user.email)

      this.setIsLoading(false)
      this.setSignedIn(true, user.email)
    } else {
      console.log('ERROR')
    }
  }
}

export default new User()
