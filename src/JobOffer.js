import React, { Component } from 'react';
import axios from 'axios';
import local from './local';

class jobOffer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			info: this.props.basicInfo,
			showMore: false,
			showMoreInputs: false
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

	render() {
		var arrayInfoBase = Object.values(this.state.info.info.base);
		var arrayInfoExtended = Object.values(this.state.info.info.extendedInfo);
		var keysBase = Object.keys(this.state.info.info.base);
		var keysExtended = Object.keys(this.state.info.info.extendedInfo);
		var jobs = this.state.info.jobs.postedJobs;

		var inputsBase = keysBase.map((element, pos) => {
			if (element === 'password') {
				element = (
					<li>
						<input
							type="password"
							placeholder="new Password"
							onChange={this.handleChange}
							name={keysBase[pos]}
						/>
					</li>
				);
				return element;
			} else if (element === 'email') {
				element = (
					<li>
						<input type="email" onChange={this.checkUsername} name={keysBase[pos]} placeholder={element} />
					</li>
				);
				return element;
			} else {
				element = (
					<li>
						<input onChange={this.handleChange} name={keysBase[pos]} placeholder={element} />
					</li>
				);
				return element;
			}
		});

		var inputsExtended = keysExtended.map((element, pos) => {
			if (element === 'description') {
				element = (
					<li>
						<textarea
							onChange={this.handleChange}
							placeholder="Tell us something about you!"
							name={keysBase[pos]}
						/>
					</li>
				);
				return element;
			} else if (element === 'birthday') {
				element = (
					<li>
						<input
							onChange={this.handleChange}
							name={keysExtended[pos]}
							placeholder={element}
							type="date"
						/>
					</li>
				);
				return element;
			} else {
				element = (
					<li>
						<input onChange={this.handleChange} name={keysExtended[pos]} placeholder={element} />
					</li>
				);
				return element;
			}
		});

		var arrayInfoBaseMap = arrayInfoBase.map((element, pos) => (element = <li name={keysBase[pos]}>{element}</li>));
		var arrayInfoExtendedMap = arrayInfoExtended.map(
			(element, pos) => (element = <li name={keysExtended[pos]}>{element}</li>)
		);
		var jobsMapped = jobs.map((element) => (element = <li>{element}</li>));

		console.log(this.state);
		console.log(this.props);

		if (this.state.showMore) {
			return (
				<div>
					<ul>{arrayInfoBaseMap}</ul>
					<ul name="extendedInfo">{arrayInfoExtendedMap}</ul>
					<a onClick={this.editProfile}>Edit your profile</a>
					<a onClick={this.handleShowMore}>Hide</a>
				</div>
			);
		} else if (this.state.edit) {
			if (this.state.showMoreInputs) {
				return (
					<div>
						<form onSubmit={this.handleSubmit} method="POST">
							<ul>{inputsBase}</ul>
							<ul>{inputsExtended}</ul>
							<input type="submit" name="submit" value="Apply Changes" />
						</form>
						<div>
							<p>{this.state.error}</p>
							<p>{this.state.success}</p>
						</div>
						<a onClick={this.handleShowMoreInputs}>Hide extended Information</a>
					</div>
				);
			} else {
				return (
					<div>
						<form onSubmit={this.handleSubmit} method="POST">
							<ul>{inputsBase}</ul>
							<input type="submit" name="submit" value="Apply Changes" />
						</form>
						<div>
							<p>{this.state.error}</p>
							<p>{this.state.success}</p>
						</div>
						<a onClick={this.handleShowMoreInputs}>Show extended Information</a>
					</div>
				);
			}
		} else {
			return (
				<div>
					<ul name="NormalInfo">{arrayInfoBaseMap}</ul>
					<div name="jobHistory">{jobsMapped}</div>
					<a onClick={this.handleShowMore}>Show more</a>
					<a onClick={this.editProfile}>Edit your profile</a>
				</div>
			);
		}
	}

	componentDidMount = () => {
		console.log(this.state.info);
	};

	render() {
		var arrayInfoBase = Object.values(this.state.info.info.base);
		var arrayInfoExtended = Object.values(this.state.info.info.extendedInfo);
		var keysBase = Object.keys(this.state.info.info.base);
		var keysExtended = Object.keys(this.state.info.info.extendedInfo);
		var jobs = this.state.info.jobs.postedJobs;

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
							onChange={this.checkUsername}
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
					<strong>{keysExtended[pos]}: </strong>
					{element}
				</div>
			);

			return element;
		});
		var jobsMapped = jobs.map((element) => (element = <li>{element}</li>));

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
									<button className="btn btn-success" name="submit">
										Apply Changes
									</button>
								</div>
								<div className="col-6 text-center pb-2 ">
									<button
										type="button"
										className="btn btn-danger"
										onClick={this.handleShowMoreInputs}
									>
										Hide extended Information
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
									<button className="btn btn-success" name="submit">
										Apply Changes
									</button>
								</div>
								<div className="col-6 text-center pb-2 ">
									<button
										type="button"
										className="btn btn-danger"
										onClick={this.handleShowMoreInputs}
									>
										Show extended Information
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
					<div className="form-row input-group-text" name="NormalInfo">
						{arrayInfoBaseMap}
					</div>
					<div name="jobHistory">{jobsMapped}</div>
					<div className="row mt-3">
						<div className="col-6 text-center pb-2 ">
							<button className="btn btn-success" onClick={this.handleShowMore}>
								Show more
							</button>
						</div>
						<div className="col-6 text-center pb-2 ">
							<button className="btn btn-danger" onClick={this.editProfile}>
								Edit your profile
							</button>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default jobOffer;
