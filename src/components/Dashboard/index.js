import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import Spinner from '../Spinner'
import Welcome from './Welcome'
import Budgets from './Budgets/Collection'

@inject('budget')
@observer
export default class Dashboard extends Component {
  componentDidMount() {
    const { budget } = this.props

    budget.findAll()
  }

  render() {
    const { collection, isLoading } = this.props.budget

    return (
      <div className="section">
        {this.renderDashboard()}
      </div>
    )
  }

  renderDashboard = () => {
    const { collection, isLoading } = this.props.budget

    if (isLoading) {
      return (
        <div className="container">
          <Spinner />
        </div>
      )
    }
    if (collection.length === 0) {
      return <Welcome />
    }
    return <Budgets />
  }
}
