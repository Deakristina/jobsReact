import React, { Component } from 'react'

class logOut extends Component {
  render() {
    return (
      <div>
          <input type="button" value="Log Out" onClick={this.props.logoutAction}>Log out</input>
      </div>
    )
  }
}

export default logOut
