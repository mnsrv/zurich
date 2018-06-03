import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import Budgets from './Budgets/Collection'

@inject('budget')
@observer
export default class Dashboard extends Component {
  componentDidMount() {
    const { budget } = this.props

    budget.findAll()
  }

  render() {
    return (
      <div className="section">
        <Budgets />
      </div>
    )
  }
}
