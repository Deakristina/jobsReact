import React, { Component } from 'react';
import axios from 'axios';
import local from './local';

class jobSeeker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			info: this.props.basicInfo,
			showMore: false,
			showMoreInputs: false,
			jobNames: [],
		};
	
	}

	handleChange = (e) => {
		var objectData = {};
		objectData[e.target.name] = e.target.value;
		this.setState({ newData: objectData });
	};

	handleSubmit = () => {
		axios(`http://${local.ipAddress}:${local.port}/profileInfo`, {
			method: 'post',
			data: {
				data: this.state.newData,
				email: this.state.email
			},
			withCredentials: true
		})
			.then((result) => {
				if (result.status === 200) {
					this.setState({ success: 'Profile was updated correctly' });
				} else {
					this.setState({ error: 'Profile was not updated due to an error' });
				}
			})
			.catch((err) => console.log(err));
	};

	editProfile = () => {
		this.setState({ edit: !this.state.edit });
	};

	handleShowMore = () => {
		this.setState({ showMore: !this.state.showMore });
	};

	checkUsername = (event) => {
		var toCheck = event.target.value;
		this.setState({ email: toCheck }, () => {
			axios({
				method: 'post',
				url: `http://10.85.5.220:5000/checkEmail`,
				data: {
					email: this.state.email
				},
				withCredentials: true
			})
				.then((result) => {
					console.log(result);

					if (result.status === 200) {
						this.setState({ userExists: false, error: '' });
					} else {
						this.setState({ userExists: true, error: 'This email is already in use' });
					}
				})
				.catch((err) => {
					console.log(err);	
				});
		});
	};
	handleShowMoreInputs = () => {
		this.setState({ showMoreInputs: !this.state.showMoreInputs });
	};

	componentWillMount = () => {
		console.log(this.state.info)
		var jobs = this.state.info.jobs.saved;
		debugger
		jobs.forEach((element) => {
			debugger
			axios(`http://10.85.5.220:5000/post-job?id=${element}`)
				.then((result) => {
					debugger
					if(result.data === ""){
						var allJobs = [...this.state.jobNames]
						this.setState({jobNames: allJobs})
					}
					else{
						var allJobs = [...this.state.jobNames]
						allJobs.push(result.data.info.title)
						this.setState({jobNames: allJobs})
						
					}
				})
				.catch((err) => console.log(err));
		});
	};

	render() {
		var arrayInfoBase = Object.values(this.state.info.info.base);
		var arrayInfoExtended = Object.values(this.state.info.info.extendedInfo);
		var keysBase = Object.keys(this.state.info.info.base);
		var keysExtended = Object.keys(this.state.info.info.extendedInfo);
		var jobs = this.state.jobNames

		var inputsBase = keysBase.map((element, pos) => {
			if (element === 'password') {
				element = (
					<div>
						<input
							className="col-md-12 form-control"
							type="password"
							placeholder="new Password"
							onChange={this.handleChange}
							name={keysBase[pos]}
						/>
					</div>
				);
				return element;
			} else if (element === 'email') {
				element = (
					<div>
						<input
							className="col-md-12 form-control"
							type="email"
							onChange={this.handleChange}
							name={keysBase[pos]}
							placeholder={element}
						/>
					</div>
				);
				return element;
			} else {
				element = (
					<div>
						<input
							className="col-md-12 form-control"
							onChange={this.handleChange}
							name={keysBase[pos]}
							placeholder={element}
						/>
					</div>
				);
				return element;
			}
		});

		var inputsExtended = keysExtended.map((element, pos) => {
			if (element === 'description') {
				element = (
					<div>
						<textarea
							className="col-md-12 form-control"
							onChange={this.handleChange}
							placeholder="Tell us something about you!"
							name={keysBase[pos]}
						/>
					</div>
				);
				return element;
			} else if (element === 'birthday') {
				element = (
					<div>
						<input
							className="col-md-12 form-control"
							onChange={this.handleChange}
							name={keysExtended[pos]}
							placeholder={element}
							type="date"
						/>
					</div>
				);
				return element;
			} else {
				element = (
					<div>
						<input
							className="col-md-12 form-control"
							onChange={this.handleChange}
							name={keysExtended[pos]}
							placeholder={element}
						/>
					</div>
				);
				return element;
			}
		});

		var arrayInfoBaseMap = arrayInfoBase.map((element, pos) => {
			element = (
				<div className="col-md-12 form-control" name={keysBase[pos]}>
					<strong>{keysBase[pos]}: </strong> {element}
				</div>
			);
			return element;
		});
		var arrayInfoExtendedMap = arrayInfoExtended.map((element, pos) => {
			element = (
				<div className="col-md-12 form-control" name={keysExtended[pos]}>
					<strong>{keysExtended[pos]}: </strong> {element}
				</div>
			);
			return element;
		});
		var jobsMapped = jobs.map((element) => {
			if(element === "Error"){
				element =  <li>You have not saved any jobs.</li>
				return element
			}
			else{
				element = <li>{element}</li>
				return element
			}
		})

		if (this.state.showMore) {
			return (
				<div>
					<div className="form-row input-group-text">{arrayInfoBaseMap}</div>
					<div name="extendedInfo" className="form-row input-group-text">
						{arrayInfoExtendedMap}
					</div>

					<div className="row mt-3">
						<div className="col-6 text-center pb-2 ">
							<button className="btn btn-info" onClick={this.handleShowMore}>
								Show Less
							</button>
						</div>

						<div className="col-6 text-center pb-2 ">
							<button className="btn btn-danger" onClick={this.editProfile}>
								Edit profile
							</button>
						</div>
					</div>
				</div>
			);
		} else if (this.state.edit) {
			if (this.state.showMoreInputs) {
				return (
					<div>
						<form onSubmit={this.handleSubmit} method="POST">
							<div>{inputsBase}</div>
							<div>{inputsExtended}</div>
							<div className="row mt-3">
								<div className="col-6 text-center pb-2 ">
									<button name="submit" className="btn btn-success">
										Apply Changes
									</button>
								</div>
								<div className="col-6 text-center pb-2 ">
									<button
										type="button"
										className="btn btn-danger"
										onClick={this.handleShowMoreInputs}
									>
										Hide Information
									</button>
								</div>
							</div>
						</form>
						<div>
							<p>{this.state.error}</p>
							<p>{this.state.success}</p>
						</div>
					</div>
				);
			} else {
				return (
					<div>
						<form onSubmit={this.handleSubmit} method="POST">
							<div>{inputsBase}</div>
							<div className="row mt-3">
								<div className="col-6 text-center pb-2 ">
									<button name="submit" className="btn btn-success">
										Apply Changes
									</button>
								</div>
								<div className="col-6 text-center pb-2 ">
									<button className="btn btn-info" onClick={this.handleShowMoreInputs}>
										More Information
									</button>
								</div>
							</div>
						</form>
						<div>
							<p>{this.state.error}</p>
							<p>{this.state.success}</p>
						</div>
					</div>
				);
			}
		} else {
			return (
				<div>
					<div name="NormalInfo" className="form-row input-group-text">
						{arrayInfoBaseMap}
					</div>
					<div className="row mt-3">
						<div className="col-6 text-center pb-2 ">
							<button className="btn btn-success btn-lg" onClick={this.handleShowMore}>
								Show more
							</button>
						</div>
						<div className="col-6 text-center pb-2 ">
							<button className="btn btn-danger btn-lg" onClick={this.editProfile}>
								Edit profile
							</button>
						</div>
					</div>

					<div className="title-profile mt-5">Your Saved Jobs</div>
					<div name="jobHistory">{jobsMapped}</div>
				</div>
			);
		}
	}
}

export default jobSeeker;
