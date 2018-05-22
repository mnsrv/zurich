import { observable } from 'mobx'

class Transactions {
  @observable all = [
    { id: '3', date: '20.05.2018', memo: 'Пекарня', amount: 250 },
    { id: '2', date: '19.05.2018', memo: 'Магнит', amount: 730 },
    { id: '1', date: '01.04.2018', memo: 'Мосцветорг', amount: 1500 }
  ]
}

export default new Transactions()
