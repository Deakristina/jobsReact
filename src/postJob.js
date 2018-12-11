import './App.css';
import React, { Component } from 'react';
import Input from './components/input';
class PostJob extends Component {
	state = {
		data: {
			title: '',
			duration: '',
			location: '',
			salary: '',
			description: '',
			requirements: []
		},
		errors: {}
	};
	validate = () => {
		const errors = {};
		const { data } = this.state;
		if (data.title.trim() === '') errors.title = 'Title is required';
		if (data.duration.trim() === '') errors.duration = 'Duration is required';
		if (data.requirements.length === 0) errors.requirements = 'Requirements is required';
		if (data.location.trim() === '') errors.location = 'Location is required';
		if (data.description.trim() === '') errors.description = 'Description is required';
		return Object.keys(errors).length === 0 ? null : errors;
	};
	handleSubmit = (e) => {
		e.preventDefault();
		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;
		//call the server
		console.log('check');
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
		if (name === 'location') {
			if (value.trim() === '') return 'Location is required';
		}
		if (name === 'description') {
			if (value.trim() === '') return 'Description is required';
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
			<div>
				<h1>Post your vacancy!</h1>
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
					<Input
						name="duration"
						value={data.duration}
						label="Duration"
						onChange={this.handleChange}
						type="text"
						error={errors.duration}
						placeholder="e.g: 2hours/day"
					/>
					<Input
						name="location"
						value={data.location}
						label="Location"
						onChange={this.handleChange}
						type="text"
						error={errors.location}
						placeholder="1234 Main St"
					/>
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
					<button className="btn btn-primary">Submit</button>
				</form>
			</div>
		);
	}
}
export default PostJob;
