import React, { Component } from 'react';

import LandingPage from './components/landingPage';
import PostJob from './components/PostJob';
import MainNavBar from './MainNavBar'; //WORKS.
import Register from './Register'; //WORKS.
import SearchJob from './components/SearchJob'; //Under construction
import Login from './Login'; //WORKS
import ProfilePage from './ProfilePage'; //UNDER CONSTRUCTION
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookies';

class App extends Component {
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};
	constructor(props) {
		super(props);
		const { cookies } = props;

		this.state = {
			currentPage: 'home',
			loggedIn: false,
			email: '',
			userID: ''
		};
	}

	setID = (ID) => {
		this.setState({ userID: ID });
	};
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
			home: <LandingPage changePage={this.changeCurrentPage} loggedIn={this.loggedIn} />,
			searchJob: (
				<SearchJob changePage={this.changeCurrentPage} loggedIn={this.loggedIn} userID={this.state.userID} />
			),
			register: <Register changePage={this.changeCurrentPage} loggedIn={this.loggedIn} />,
			login: <Login changePage={this.changeCurrentPage} loggedIn={this.loggedIn} email={this.getEmail} />,
			profile: (
				<ProfilePage
					changePage={this.changeCurrentPage}
					loggedIn={this.state.loggedIn}
					email={this.state.email}
					handleID={this.setID}
				/>
			),
			postJob: <PostJob changePage={this.changeCurrentPage} loggedIn={this.loggedIn} />
			//Here the component that renders post job
		};
		return (
			<div>
				{router[this.state.currentPage]}
				{/* <LandingPage /> */}
				<MainNavBar changePage={this.changeCurrentPage} loggedIn={this.state.loggedIn} />
			</div>
		);
	}
}

export default App;
