import React, { Component } from 'react';

import LandingPage from './components/LandingPage';
import PostJob from './components/PostJob';
import MainNavBar from './MainNavBar'; //TESTING ZONE
import Register from './Register'; //UNDER CONSTRUCTION
import SearchJob from './SearchJob'; //NOT CONSTRUCTED
import Login from './Login'; //NOT CONSTRUCTED
import ProfilePage from './ProfilePage'; //UNDER CONSTRUCTION
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'; //NO`

class App extends Component {
	constructor() {
		super();
		this.state = {
			currentPage: '',
			loggedIn: false,
			email: ''
		};
	}

	changeCurrentPage = (e) => {
		this.setState({ currentPage: e });
	};
	loggedIn = (trigger) => {
		this.setState({ loggedIn: trigger });
	};

	getEmail = (adress) => {
		this.setState({ email: adress });
	};

	render() {
		var router = {
			searchJob: <SearchJob changePage={this.changeCurrentPage} loggedIn={this.loggedIn} />,
			register: <Register changePage={this.changeCurrentPage} loggedIn={this.loggedIn} />,
			login: <Login changePage={this.changeCurrentPage} loggedIn={this.loggedIn} email={this.getEmail} />,
			profile: (
				<ProfilePage
					changePage={this.changeCurrentPage}
					loggedIn={this.state.loggedIn}
					email={this.state.email}
				/>
			),
			postJob: <PostJob changePage={this.changeCurrentPage} loggedIn={this.loggedIn} />
			//Here the component that renders post job
		};
		return (
			<div>
				<MainNavBar changePage={this.changeCurrentPage} loggedIn={this.state.loggedIn} />
				{router[this.state.currentPage]}
				{/* <LandingPage /> */}
			</div>
		);
	}
}

export default App;
