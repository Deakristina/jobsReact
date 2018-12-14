import React, { Component } from 'react';
import Input from './input';
import axios from 'axios';
import local from '../local';

class SearchJob extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				title: '',
				location: ''
			},
			jobs: [],
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
		const { data } = this.state;
		e.preventDefault();
		axios
			.post(`${local.apiURL}/search-job`, {
				withCredentials: true,
				title: data.title,
				location: data.location
			})
			.then((result) => {
				this.setState({ jobs: result.data });
			});
		console.log('submitted');
	};

	render() {
		const { data } = this.state;
		console.log(this.state.jobs);
		let jobs = this.state.jobs.map((job, i) => {
			return (
				<ul key={i}>
					<li>{job.info.title}</li>
					<li>{job.location.adress}</li>
					<li>{job.info.salary}</li>
				</ul>
			);
		});
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
						placeholder="Search by city or country"
					/>
					<div className="row">
						<div className="col-12 text-center">
							<button className="btn btn-primary">Search</button>
						</div>
					</div>
				</form>
				<div>{jobs}</div>
			</div>
		);
	}
}

export default SearchJob;
