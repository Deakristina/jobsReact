import React, { Component } from 'react';

import LandingPage from './components/LandingPage';
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
			loggedIn: true,
			email: '',
			userID: ''
		};
	}

	setID = (ID) => {
		this.setState({ userID: ID });
	};
	changePageByName = (name) => {
		this.setState({ currentPage: name });
	};
	changePageByEvent = (e) => {
		this.setState({ currentPage: e.target.dataset.page });
	};
	loggedIn = (trigger) => {
		this.setState({ loggedIn: trigger });
	};

	getEmail = (address) => {
		this.setState({ email: address });
	};

	render() {
		var router = {
			home: <LandingPage changePageByEvent={this.changePageByEvent} loggedIn={this.loggedIn} />,
			searchJob: <SearchJob loggedIn={this.loggedIn} userID={this.state.userID} />,
			register: <Register changePageByName={this.changePageByName} loggedIn={this.loggedIn} />,
			login: <Login changePageByName={this.changePageByName} loggedIn={this.loggedIn} email={this.getEmail} />,
			profile: <ProfilePage loggedIn={this.state.loggedIn} email={this.state.email} handleID={this.setID} />,
			postJob: <PostJob loggedIn={this.loggedIn} />
		};
		return (
			<div>
				{router[this.state.currentPage]}

				<MainNavBar changePageByEvent={this.changePageByEvent} loggedIn={this.state.loggedIn} />
			</div>
		);
	}
}

export default App;
