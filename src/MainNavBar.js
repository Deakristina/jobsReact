// import React from 'react';
import React, { Component } from 'react';
import './App.css';
import { Collapse } from 'reactstrap';

let navStyle = {
	position: 'fixed',
	top: '0',
	width: '100%'
};

class MainNavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			navbarClass: 'collapse navbar-collapse'
		};
	}

	toggle = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	navbarToggle = () => {
		let defaultClass = 'collapse navbar-collapse';
		if (this.state.navbarClass === defaultClass) {
			this.setState({ navbarClass: `${defaultClass} show` });
		} else {
			this.setState({ navbarClass: defaultClass });
		}
	};

	render() {
		let navButtons = (
			<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
				<li className="nav-item active">
					<a className="nav-link" data-page="register" onClick={this.props.changePageByEvent}>
						Register
					</a>
				</li>
				<li className="nav-item active">
					<a className="nav-link" data-page="login" onClick={this.props.changePageByEvent}>
						Log In
					</a>
				</li>
				<li className="nav-item active">
					<a className="nav-link" data-page="searchJob" onClick={this.props.changePageByEvent}>
						Search Job
					</a>
				</li>
			</ul>
		);
		if (this.props.loggedIn) {
			navButtons = (
				<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
					<li className="nav-item active">
						<a className="nav-link" data-page="profile" onClick={this.props.changePageByEvent}>
							Profile
						</a>
					</li>
					<li className="nav-item active">
						<a className="nav-link" data-page="searchJob" onClick={this.props.changePageByEvent}>
							Search Job
						</a>
					</li>
					<li className="nav-item active">
						<a className="nav-link" data-page="postJob" onClick={this.props.changePageByEvent}>
							Post Job
						</a>
					</li>
				</ul>
			);
		}

		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light" style={navStyle}>
				<button
					onClick={this.navbarToggle}
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarTogglerDemo01"
					aria-controls="navbarTogglerDemo01"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div className={this.state.navbarClass} id="navbarTogglerDemo01">
					<a href="#" className="navbar-brand" data-page="home" onClick={this.props.changePageByEvent}>
						MicroJobs
					</a>
					{navButtons}
				</div>
			</nav>
		);
	}
}

export default MainNavBar;
