import React from 'react';
import './App.css';

let navStyle = {
	position: 'fixed',
	top: '0',
	width: '100%'
};

function MainNavBar(props) {
	if (props.loggedIn) {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light" style={navStyle}>
				<button
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
				<div className="collapse navbar-collapse" id="navbarTogglerDemo01">
					<a
						className="navbar-brand"
						onClick={function() {
							props.changePage('home');
						}}
					>
						FindYourJob
					</a>
					<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
						<li className="nav-item active">
							<a
								className="nav-link"
								onClick={function() {
									props.changePage('profile');
								}}
							>
								Profile
							</a>
						</li>
						<li className="nav-item active">
							<a
								className="nav-link"
								onClick={function() {
									props.changePage('searchJob');
								}}
							>
								Search Job
							</a>
						</li>
						<li className="nav-item active">
							<a
								className="nav-link"
								onClick={function() {
									props.changePage('postJob');
								}}
							>
								Post Job
							</a>
						</li>
					</ul>
				</div>
			</nav>
		);
	} else {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light" style={navStyle}>
				<button
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
				<div className="collapse navbar-collapse" id="navbarTogglerDemo01">
					<a
						className="navbar-brand"
						onClick={function() {
							props.changePage('home');
						}}
					>
						FindYourJob
					</a>
					<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
						<li className="nav-item active">
							<a
								className="nav-link"
								onClick={function() {
									props.changePage('register');
								}}
							>
								Register
							</a>
						</li>
						<li className="nav-item active">
							<a
								className="nav-link"
								onClick={function() {
									props.changePage('login');
								}}
							>
								Log in
							</a>
						</li>
						<li className="nav-item active">
							<a
								className="nav-link"
								onClick={function() {
									props.changePage('searchJob');
								}}
							>
								Search Job
							</a>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default MainNavBar;
