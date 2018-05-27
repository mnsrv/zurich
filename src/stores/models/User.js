import { observable, action } from 'mobx'

import navigation from '../../stores/Navigation'
import Api from '../../helpers/api'

class User {
  path = '/sessions'
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
      this.signInFromStorage(store.email)
    } else if (email && password) {
      this.createSession(email, password)
    }
  }

  @action async signInFromStorage(email) {
    const response = await Api.get(this.path)
    const status = await response.status

    if (status === 200) {
      this.email = email
      this.signedIn = true
      this.isLoading = false
    } else {
      this.signOut()
    }
  }

  async createSession(email, password) {
    this.setIsLoading(true)

    const response = await Api.post(this.path, { email, password })
    const status = await response.status

    if (status === 201) {
      const body = await response.json()
      const { user } = body.data

      localStorage.setItem('token', user.authentication_token)
      localStorage.setItem('email', user.email)

      this.setIsLoading(false)
      this.setSignedIn(true, user.email)

      navigation.push('/')
    } else {
      console.log('ERROR')
    }
  }

  @action signOut() {
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    this.email = null
    this.signedIn = false
    this.isLoading = false

    navigation.push('/users/sign_in')
  }
}

export default new User()
