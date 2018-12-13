import React, { Component } from 'react'

export default class NavProfile extends Component {
  render() {
    return (
        <div className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" onClick={function(){this.props.changeProfile('jobSeeker')}}>Your profile when seeking a job</a>
                <a onClick={function(){this.props.changeProfile('jobOffer')}} className="navbar-item">Your profile when offering a job</a>
            </div>
        </div>
    )
  }
}
