import React, { Component } from 'react';
import Input from './input';
import axios from 'axios';
import local from '../local';
import Background from './img/course06.jpg';
import ModalSearchResult from './ModalSearchJob';

let searchJobImage = {
	width: '100%',
	height: '100vh',
	backgroundImage: `url(${Background})`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	opacity: 0.5
};

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
			noResult: false,
			showModal: false
		};
	}

	toggleModal = () => {
		this.setState({ showModal: !this.state.showModal });
	};

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
		let jobs;
		if (this.state.jobs.length > 0) {
			jobs = this.state.jobs.map((job, i) => {
				return (
					<div className="job-result d-flex justify-content-between">
						<div>
							<ul className=" p-2" key={i}>
								<li className="job-list">
									<strong>Job Position: </strong> {job.info.title}
								</li>
								<li className="job-list">
									<strong> Job Location: </strong> {job.location.city}, {job.location.country}
								</li>
								<li className="job-list">
									<strong> Salary: </strong> {job.info.salary}
								</li>
							</ul>
						</div>
						<div className="">
							<ModalSearchResult modal={this.state.showModal} toggleModal={this.toggleModal} />
							<button className="btn btn-info mt-2 mr-2" onClick={this.toggleModal}>
								Show Details
							</button>
						</div>
					</div>
				);
			});
		} else if (this.state.jobs.length === 0 && data.title) {
			jobs = <p>No result</p>;
		} else {
			jobs = <React.Fragment />;
		}
		return (
			<div id="home" className="hero-area">
				<div className="bg-image bg-parallax overlay" style={searchJobImage} />
				<div className="home-search-wrapper">
					<div className="container">
						<h1 className="search-title text-center">Find jobs around you</h1>
						<form onSubmit={this.handleSubmit}>
							<div className="form-row ">
								<div className="col-md-6">
									<Input
										name="title"
										label="What position are you looking for?"
										value={data.title}
										onChange={this.handleChange}
										type="text"
										placeholder="Search by position"
									/>
								</div>

								<div className="col-md-6">
									<Input
										name="location"
										label="Where do you want to work?"
										value={data.location}
										onChange={this.handleChange}
										type="text"
										placeholder="Search by city or country"
									/>
								</div>
							</div>
							<div className="row mt-4">
								<div className="col-12 text-center">
									<button className="btn btn-warning btn-lg">Search</button>
								</div>
							</div>
						</form>
						<div className="job-result-container">{jobs}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SearchJob;
