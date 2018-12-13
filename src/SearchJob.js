import React, { Component } from 'react';
import Input from './components/input';
import axios from 'axios';

class SearchJob extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				title: '',
				location: ''
			},
			search: ''
		};
	}

	//handlechange goes here -- update the state
	handleChange = (e) => {
		// axios.get(`http://localhost:4000/post-job/${e.target.value}`).then((result) => {
		// 	this.setState({ data: result });
		// });
		console.log('check');
	};

	//handlesubmit -- call to the backend
	handleSubmit = () => {
		console.log('submitted');
	};

	render() {
		const { data } = this.state;
		return (
			<div className="container">
				<h3>Find jobs around you</h3>
				<form onSubmit={this.handleSubmit}>
					<Input
						name="title"
						value={data.title}
						onChange={this.handleChange}
						type="text"
						placeholder="Search by job title"
					/>
					<h5 className="text-center">Or</h5>
					<Input
						name="location"
						value={data.location}
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

export default SearchJob;
