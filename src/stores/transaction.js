import { Connect, mix } from 'fronto-connect'

import scopes from './scopes'

class Transaction extends Connect {
  resource = 'transactions'
}

mix(Transaction, scopes.readable)
mix(Transaction, scopes.writable)

export default Transaction
