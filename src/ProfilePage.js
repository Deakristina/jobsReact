import React, { Component } from 'react';
import JobSeeker from './JobSeeker';
import JobOffer from './JobOffer';
import local from './local';

const axios = require('axios');

class profilePage extends Component {
	constructor() {
		super();
		this.state = {
			status: '',
			basicInfo: {},
			isOffer: false,
			loggedIn: false
		};
	}

	componentWillMount = () => {
		axios(`http://${local.ipAddress}:${local.port}/profileInfo?isOf=${this.state.isOffer}`, {
			withCredentials: true,
			method: 'get'
		})
			.then((result) => {
				if (result.status === 201) {
					this.props.loggedIn(false);
					this.props.changePageByName('login');
				} else {
					console.log(result);
					this.setState({ basicInfo: result, status: 'JobSeeker' });
				}
			})
			.catch((err) => console.log(err));
	};

	handleProfile = () => {
		if (this.state.status === 'JobSeeker') {
			this.setState({ status: 'JobOffer', isOffer: true });
		} else if (this.state.status === 'JobOffer') {
			this.setState({ status: 'JobSeeker', isOffer: false });
		}
	};

	render() {
		if (this.state.status === 'JobSeeker') {
			return (
				<div className="container seeker-container">
					<div className="title-profile text-center mb-5">Your Profile</div>
					<div className="profile-info">
						<JobSeeker basicInfo={this.state.basicInfo.data} />
					</div>
					<div className="change-profile row mt-3">
						<div className="col-12 text-center pb-2 ">
							<button className="btn btn-primary btn-lg" onClick={this.handleProfile}>
								See your profile as Job Poster
							</button>
						</div>
					</div>
				</div>
			);
		} else if (this.state.status === 'JobOffer') {
			return (
				<div className="container seeker-container">
					<div className="title-profile text-center mb-5">Your Profile</div>
					<div className="profile-info">
						{/* <div className="col-12 text-center pb-2 "> */}
						<JobOffer basicInfo={this.state.basicInfo.data} />
						<div className="col-12 text-center pb-2  mt-3">
							<button className="btn btn-secondary btn-lg" onClick={this.handleProfile}>
								See your profile as Job Seeker
							</button>
						</div>

						{/* </div> */}
					</div>
				</div>
			);
		} else {
			return <div>There was an error. We are working to fix it</div>;
		}
	}
}

export default profilePage;
