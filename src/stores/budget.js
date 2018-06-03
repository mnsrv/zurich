import { Connect, mix } from 'fronto-connect'

import scopes from './scopes'

class Budget extends Connect {
  namespace = 'v1'
  resource = 'budgets'
}

mix(Budget, scopes.readable)

export default Budget
