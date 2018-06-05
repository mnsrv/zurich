import { observable, action } from 'mobx'

import Api from '../../helpers/api'

class User {
  sessions = '/sessions'
  users = '/users'
  @observable isLoading = false
  @observable signedIn = null
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

  async create(email, password, password_confirmation) {
    this.setIsLoading(true)

    const response = await Api.post(this.users, { user: { email, password, password_confirmation }})
    const status = await response.status

    if (status === 200) {
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

  signIn(email = null, password = null) {
    const store = {
      authentication_token: localStorage.getItem('token'),
      email: localStorage.getItem('email')
    }

    if (store.email && store.authentication_token) {
      this.signInFromStorage(store.email)
    } else if (email && password) {
      this.createSession(email, password)
    } else {
      this.signOut()
    }
  }

  @action async signInFromStorage(email) {
    this.setIsLoading(true)
    const response = await Api.get(this.sessions)
    const status = await response.status

    if (status === 200) {
      this.setIsLoading(false)
      this.setSignedIn(true, email)
    } else {
      this.signOut()
    }
  }

  async createSession(email, password) {
    this.setIsLoading(true)

    const response = await Api.post(this.sessions, { email, password })
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

  async destroySession() {
    this.setIsLoading(true)

    const response = await Api.delete(this.sessions)
    const status = await response.status

    if (status === 200) {
      this.setIsLoading(false)
      this.signOut()
    }
  }

  @action signOut() {
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    this.email = null
    this.signedIn = false
    this.isLoading = false
  }
}

export default new User()
