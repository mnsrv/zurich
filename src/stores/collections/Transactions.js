import { observable, action } from 'mobx'

import Api from '../../helpers/api'

class Transactions {
  path = '/transactions'
  @observable all = []
  @observable isLoading = false

  @action setIsLoading(status) {
    this.isLoading = status
  }

  @action async fetchAll() {
    this.setIsLoading(true)
    const response = await Api.get(this.path)
    const status = await response.status

    if (status === 200) {
      const json = await response.json()
      this.all = json.data
    }
    this.setIsLoading(false)
  }

  @action async add(data) {
    const response = await Api.post(this.path, data)
    const status = await response.status

    if (status === 201) {
      this.fetchAll()
    }
  }

  @action find(transactionId) {
    return this.all.slice().find(item => item.id === transactionId)
  }

  @action async remove(transactionId) {
    this.isLoading = true
    const response = await Api.delete(`${this.path}/${transactionId}`)
    const status = await response.status

    if (status === 200) {
      this.isLoading = false
      this.fetchAll()
    }
  }
}

export default new Transactions()
