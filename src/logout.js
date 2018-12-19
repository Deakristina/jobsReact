import React, { Component } from 'react';
import axios from 'axios';
import local from './local';

class logOut extends Component {
	logOut = () => {
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
				<input type="button" value="Log Out" onClick={this.logOut} />
			</div>
		);
	}
}

export default logOut;
