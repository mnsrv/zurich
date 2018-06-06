import { Connect, mix } from 'fronto-connect'

import scopes from './scopes'

class Account extends Connect {
  resource = 'accounts'
}

mix(Account, scopes.readable)
mix(Account, scopes.writable)

export default Account
