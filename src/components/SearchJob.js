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
			search: '',
			noResult: false
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
			.post(`${local.ipAddress}:${local.port}/search-job`, {
				withCredentials: true,
				title: data.title,
				location: data.location
			})
			.then((result) => {
				this.setState({ jobs: result.data });
			});
	};

	render() {
		const { data } = this.state;
		console.log(this.state.jobs, this.state.search);
		let jobs;
		if (this.state.jobs.length > 0) {
			jobs = this.state.jobs.map((job, i) => {
				return (
					<ul key={i}>
						<li>{job.info.title}</li>
						<li>{job.location.address}</li>
						<li>{job.info.salary}</li>
					</ul>
				);
			});
		} else if (this.state.jobs.length === 0 && data.title) {
			jobs = <p>No result</p>;
		} else {
			jobs = <React.Fragment />;
		}
		return (
			<div className="container">
				<h3>Find jobs around you</h3>
				<form onSubmit={this.handleSubmit}>
					<div className="form-row mt-5">
						<div className="col-md-6">
							<Input
								name="title"
								value={data.title}
								onChange={this.handleChange}
								type="text"
								placeholder="Search by job title"
							/>
						</div>

						<div className="col-md-6">
							<Input
								name="location"
								value={data.location}
								onChange={this.handleChange}
								type="text"
								placeholder="Search by city or country"
							/>
						</div>
					</div>
					<div className="row mt-4">
						<div className="col-12 text-center">
							<button className="btn btn-primary btn-lg">Search</button>
						</div>
					</div>
				</form>
				<div>{jobs}</div>
			</div>
		);
	}
}

export default SearchJob;
