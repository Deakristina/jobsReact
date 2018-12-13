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

	handleChange = ({ currentTarget: input }) => {
		const data = { ...this.state.data };
		data[input.name] = input.value;
		this.setState({ data });
	};

	//handlesubmit -- call to the backend
	handleSubmit = (e) => {
		e.preventDefault();
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

					<Input
						name="location"
						value={data.location}
						onChange={this.handleChange}
						type="text"
						placeholder="Search by location"
					/>
					<div className="row">
						<div className="col-12 text-center">
							<button className="btn btn-primary">Search</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default SearchJob;
