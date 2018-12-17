import React, { Component } from 'react';
import ModalPage from './ModalPostJob';
import Input from './input';
import axios from 'axios';
import '../App.css';
import local from '../local';
import Background from './img/course06.jpg';

let postJobImage = {
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

class PostJob extends Component {
	state = {
		data: {
			title: '',
			startDate: '',
			duration: '',
			address: '',
			zipCode: '',
			city: '',
			country: '',
			salary: '',
			description: '',
			requirements: [],
			showModal: false
		},
		errors: {}
	};
	validate = () => {
		const errors = {};
		const { data } = this.state;
		if (data.title.trim() === '') errors.title = 'Title is required';
		if (data.duration.trim() === '') errors.duration = 'Duration is required';
		if (data.requirements.length === 0) errors.requirements = 'Requirements is required';
		if (data.address.trim() === '') errors.address = 'Address is required';
		return Object.keys(errors).length === 0 ? null : errors;
	};
	handleSubmit = (e) => {
		const { data } = this.state;

		e.preventDefault();
		const errors = this.validate();

		this.setState({ errors: errors || {} });

		if (errors) {
			return;
		}
		//call the server
		axios
			.post(`${local.ipAddress}:${local.port}/post-job`, {
				withCredentials: true,
				title: data.title,
				startDate: data.startDate,
				duration: data.duration,
				address: data.address,
				zipCode: data.zipCode,
				city: data.city,
				country: data.country,
				requirements: data.requirements,
				salary: data.salary,
				description: data.description
			})
			.then((result) => {
				this.setState({ showModal: true });
				console.log(result);
			})
			.catch((error) => {
				console.log('errrorrrrr');
			});
	};

	handleClearForm = () => {
		this.setState({
			data: {
				title: '',
				startDate: '',
				duration: '',
				address: '',
				zipCode: '',
				city: '',
				country: '',
				salary: '',
				description: '',
				requirements: ''
			}
		});
	};

	toggleModal = () => {
		this.handleClearForm();
		this.setState({ showModal: !this.state.showModal });
	};
	validateProperty = ({ name, value }) => {
		if (name === 'title') {
			if (value.trim() === '') return 'Title is required';
		}
		if (name === 'duration') {
			if (value.trim() === '') return 'Duration is required';
		}
		if (name === 'requirements') {
			if (value.length === 0) return 'Requirements is required';
		}
		if (name === 'address') {
			if (value.trim() === '') return 'Address is required';
		}
	};
	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];
		const data = { ...this.state.data };
		data[input.name] = input.value;
		this.setState({ data, errors });
	};
	render() {
		const { data, errors } = this.state;
		return (
			<div id="home" className="hero-area" style={postJobImage}>
				<div className="bg-image bg-parallax overlay" style={opacityDiv}>
					<div className="container post-container">
						<h1 className="text-center post-title pt-1">Post your Job Vacancy</h1>
						<form onSubmit={this.handleSubmit}>
							<Input
								name="title"
								value={data.title}
								label="Title"
								onChange={this.handleChange}
								type="text"
								error={errors.title}
								placeholder="e.g: Waitress"
							/>
							<div className="form-row">
								<div className="col-md-6">
									<Input
										name="startDate"
										value={data.startDate}
										label="Start Date"
										onChange={this.handleChange}
										type="date"
										error={errors.startDate}
										placeholder="e.g: 2hours/day"
									/>
								</div>

								<div className="col-md-6">
									<Input
										name="duration"
										value={data.duration}
										label="Duration"
										onChange={this.handleChange}
										type="text"
										error={errors.duration}
										placeholder="e.g: 2hours/day"
									/>
								</div>
							</div>

							<Input
								name="address"
								value={data.address}
								label="Address"
								onChange={this.handleChange}
								type="text"
								error={errors.address}
								placeholder="1234 Main St"
							/>
							<div className="form-row">
								<div className="col-md-4">
									<Input
										name="zipCode"
										value={data.zipCode}
										label="Post Code"
										onChange={this.handleChange}
										type="text"
										error={errors.zipCode}
										placeholder="Zip Code"
									/>
								</div>
								<div className="col-md-4">
									<Input
										name="city"
										value={data.city}
										label="City"
										onChange={this.handleChange}
										type="text"
										error={errors.city}
										placeholder="City"
									/>
								</div>
								<div className="col-md-4">
									<Input
										name="country"
										value={data.country}
										label="Country"
										onChange={this.handleChange}
										type="text"
										error={errors.country}
										placeholder="Country"
									/>
								</div>
							</div>
							<Input
								name="salary"
								value={data.salary}
								label="Salary"
								onChange={this.handleChange}
								type="text"
								placeholder="e.g: €15/hour"
							/>
							<Input
								name="requirements"
								value={data.requirements}
								label="Requirements"
								onChange={this.handleChange}
								type="text"
								error={errors.requirements}
								placeholder="Provide the minimum requirement(s)"
							/>
							<div className="form-group">
								<label htmlFor="description">Description</label>
								<textarea
									value={data.description}
									onChange={this.handleChange}
									id="description"
									name="description"
									type="text"
									className="form-control"
									placeholder="Describe the job"
								/>
							</div>
							<div className="row mt-4 mb-4">
								<div className="col-12 text-center">
									<button className="btn btn-warning btn-lg">Submit</button>
								</div>
							</div>
						</form>
						<ModalPage
							modal={this.state.showModal}
							toggleModal={this.toggleModal}
							handleClearForm={this.handleClearForm}
						/>
					</div>
				</div>
			</div>
		);
	}
}
export default PostJob;
