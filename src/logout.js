import React, { Component } from 'react';
import axios from 'axios'
import local from './local'

class logOut extends Component {
	constructor(props) {
		super(props);
  }

  logOutAction = () => {
    debugger;
    axios(`http://${local.ipAddress}:${local.port}/logout`)
      .then((result) => {
        if (result.status === 200) {
          this.setState({ loggedIn: false });
        } else {
          this.setState({ error: 'There was an error when loggin Out' });
        }
      })
      .catch((err) => console.log(err));
  };

	render() {
		return (
			<div>
				<button type="button" value="Log Out" onClick={this.logOutAction} />
			</div>
		);
	}
}



export default logOut;
