const readable = {
  find() { this.findBy() },
  findBy(parameters) {
    this.setIsLoading(true)
    this.clearSelected()
    this.call({ parameters, type: 'get' }, {
      200: (body) => { this.setSelected(body.data) }
    })
  },
  findAll(parameters) {
    this.setIsLoading(true)
    this.clearCollection()
    this.call({ parameters, type: 'get' }, {
      200: (body) => { this.setCollection(body.data) }
    })
  }
}

const writable = {
  update(parameters, body) {
    this.setIsLoading(true)
    this.call({ parameters, body, type: 'patch' }, {
      200: (response) => { this.setSelected(response.data) }
    })
  },
  create(parameters, body) {
    this.setIsLoading(true)
    this.call({ parameters, body, type: 'post' }, {
      201: (response) => { this.appendToCollection(response.data) }
    })
  },
  delete(parameters) {
    this.setIsLoading(true)
    this.call({ parameters, type: 'delete' }, {
      200: (response) => { this.removeFromCollection(response.body) }
    })
  }
}

export default { readable, writable }
