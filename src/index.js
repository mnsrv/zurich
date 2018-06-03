import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { Router } from 'react-router'
import { api } from 'fronto-api'

import './index.css'
import stores from './stores'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const endpoint = api({
  endpoint: 'http://localhost:4000/',
  header: (h) => {
    h.append('X-User-Email', localStorage.getItem('email'))
    h.append('X-User-Token', localStorage.getItem('token'))
  }
})

const models = {
  budget: new stores.Budget(endpoint)
}

ReactDOM.render(
  <Provider {...stores} {...models}>
    <Router history={stores.navigation.history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
