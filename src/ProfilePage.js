import React, { Component } from 'react';
import JobSeeker from './JobSeeker';
import JobOffer from './JobOffer';
import local from './local';

const axios = require('axios');

class profilePage extends Component {
	constructor() {
		super();
		this.state = {
			status: 'JobSeeker',
			basicInfo: {}
		};
	}

	componentDidMount = () => {
		axios(`http://localhost:5000/profileInfo`, {
			//Session of passport
			withCredentials: true,
			method: 'get'
		})
			.then((result) => {
				if (result.status === 201) {
					this.props.changePageByName('login');
				} else {
					console.log(result);
					this.setState({ basicInfo: result, status: 'JobSeeker' }, () => {
						console.log(this.state);
					});
				}
			})
			.catch((err) => console.log(err));
	};

	handleProfile = () => {
		if (this.state.status === 'JobSeeker') {
			this.setState({ status: 'JobOffer' });
		} else if (this.state.status === 'JobOffer') {
			this.setState({ status: 'JobSeeker' });
		}
	};

	render() {
		if (this.state.status === 'JobSeeker') {
			return (
				<div>
					<a onClick={this.handleProfile}>See your profile as Job Poster</a>
					<JobSeeker basicInfo={this.state.basicInfo} />
				</div>
			);
		} else if (this.state.status === 'JobOffer') {
			return (
				<div>
					<a onClick={this.handleProfile}>See your profile as Job Seeker</a>
					<JobOffer basicInfo={this.state.basicInfo} />
				</div>
			);
		} else {
			return <div>Your mom gay</div>;
		}
	}
}

export default profilePage;
