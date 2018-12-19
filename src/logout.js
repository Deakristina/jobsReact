import React, { Component } from 'react';

class logOut extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<input type="button" value="Log Out" onClick={this.props.onClick} />
			</div>
		);
	}
}

export default logOut;
