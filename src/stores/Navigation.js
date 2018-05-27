import { createBrowserHistory } from 'history'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'

const browserHistory = createBrowserHistory()
const routingStore = new RouterStore()

syncHistoryWithStore(browserHistory, routingStore)

export default routingStore
