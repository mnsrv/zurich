import React, { Component } from 'react'
import classNames from 'classnames'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react'

@observer
export default class Modal extends Component {
  @observable isOpen = false
  @observable content = null

  @action open = (e) => {
    if (e) { e.preventDefault() }

    this.isOpen = true
  }

  @action close = (e) => {
    if (e) { e.preventDefault() }

    this.isOpen = false
    this.content = null
  }

  @action setContent = (content) => {
    this.content = content
  }

  render() {
    const modalClasses = classNames('modal', { 'is-active': this.isOpen })

    return (
      <div className={modalClasses}>
        <div className="modal-background" onClick={this.close} />
        {this.content || null}
      </div>
    )
  }
}
