import React, { Component } from 'react';
import Input from './components/input';
import axios from 'axios';

class SearchProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				title: '',
				location: ''
			}
		};
	}

	//handlechange goes here -- update the state
	handleChange = () => {
		console.log('changed');
	};

	//handlesubmit -- call to the backend
	render() {
		const { data } = this.state;
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit}>
					<Input
						name="title"
						value={data.title}
						// label="Location"
						onChange={this.handleChange}
						type="text"
						placeholder="Search by job title"
					/>
					<Input
						name="location"
						value={data.location}
						// label="Location"
						onChange={this.handleChange}
						type="text"
						placeholder="Search by location"
					/>
				</form>
				<div className="row">
					<div className="col-12 text-center">
						<button className="btn btn-primary">Search</button>
					</div>
				</div>
			</div>
		);
	}
}

export default SearchProfile;
