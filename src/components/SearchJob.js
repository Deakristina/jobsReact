import React, { Component } from 'react';
import Input from './input';
import axios from 'axios';
import local from '../local';
import { Alert } from 'reactstrap';
import Background from './img/course06.jpg';
import ModalSearchResult from './ModalSearchJob';

let searchJobImage = {
	width: '100%',
	height: '100vh',
	backgroundImage: `url(${Background})`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover'
};

let opacityDiv = {
	background: 'rgba(255,255,255,0.5)',
	height: '100vh',
	overflow: 'auto'
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
			showModal: false,

			jobId: ''
		};
	}

	toggleModal = () => {
		this.setState({ showModal: !this.state.showModal });
	};

	handleChange = ({ currentTarget: input }) => {
		const data = { ...this.state.data };
		data[input.name] = input.value;
		this.setState({ data, noResult: false });
	};

	//handlesubmit -- call to the backend
	handleSubmit = (e) => {
		const { data } = this.state;
		e.preventDefault();
		axios
			.post(`http://${local.ipAddress}:${local.port}/search-job`, {
				withCredentials: true,
				title: data.title,
				location: data.location
			})
			.then((result) => {
				this.setState({
					jobs: result.data,
					noResult: result.data.length === 0
				});
			});
	};

	handleShowModal = (e) => {
		this.setState({
			showModal: true,
			jobId: e.target.dataset.jobid
		});
	};

	handleHideModal = () => {
		this.setState({
			showModal: false
		});
	};

	render() {
		const { data } = this.state;
		console.log(this.props.loggedIn);
		let modal = '';
		if (this.state.showModal) {
			modal = (
				<ModalSearchResult
					modal={true}
					hideModal={this.handleHideModal}
					jobId={this.state.jobId}
					changePageByName={this.props.changePageByName}
				/>
			);
		}

		let jobs;
		if (this.state.jobs.length > 0) {
			jobs = this.state.jobs.map((job, i) => {
				let detailButton = (
					<button className="btn btn-primary mt-2 mr-2" data-jobid={job._id} onClick={this.handleShowModal}>
						Show Details
					</button>
				);
				if (!this.props.loggedIn) {
					detailButton = (
						<button
							className="btn btn-primary mt-2 mr-2"
							data-page="login"
							onClick={this.props.changePageByEvent}
						>
							Log In
						</button>
					);
				}
				return (
					<div key={i} className="job-result d-flex justify-content-between mt-4">
						<div>
							<ul className=" p-2">
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
						<div className="">{detailButton}</div>
					</div>
				);
			});
		} else if (this.state.noResult) {
			jobs = <p className="job-result no-result text-center mt-5">No result</p>;
		} else {
			jobs = <React.Fragment />;
		}
		return (
			<div id="home" className="hero-area" style={searchJobImage}>
				<div className="bg-image bg-parallax overlay" style={opacityDiv}>
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
										<button className="btn btn-primary btn-lg">Search</button>
									</div>
								</div>
							</form>
							<div className="job-result-container">{jobs}</div>
						</div>
					</div>
				</div>
				{modal}
			</div>
		);
	}
}

export default SearchJob;
