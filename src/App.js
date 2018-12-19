import React, { Component } from 'react';

import LandingPage from './components/LandingPage'; //WORKS
import PostJob from './components/PostJob'; //WORKS
import MainNavBar from './MainNavBar'; //WORKS.
import Register from './Register'; //WORKS.
import SearchJob from './components/SearchJob'; //WORKS
import Login from './Login'; //WORKS
import ProfilePage from './ProfilePage'; //Only styling left
import logOut from './logout'; //WORKS
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookies';
import axios from 'axios';
import local from './local';

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
			email: ''
		};
	}

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
	componentDidMount = () => {
		debugger;
		axios(`http://${local.ipAddress}:${local.port}/login`, {
			withCredentials: true
		})
			.then((result) => {
				if (result.status === 200) {
					debugger;
					this.setState({ loggedIn: true });
				} else {
					debugger;
					this.changePageByName('login');
				}
			})
			.catch((err) => console.log(err));
	};
	logOut = () => {
		axios(`http://${local.ipAddress}:${local.port}/logout`)
			.then((result) => {
				if (result.status === 200) {
					this.setState({ loggedIn: false });
				} else {
					this.setState({ error: 'There was an error when loggin Out' });
				}
			})
			.catch((err) => console.log(err));
	};

	render() {
		var router = {
			home: <LandingPage changePageByEvent={this.changePageByEvent} loggedIn={this.loggedIn} />,
			searchJob: (
				<SearchJob
					loggedIn={this.state.loggedIn}
					userID={this.state.userID}
					changePageByName={this.changePageByName}
					changePageByEvent={this.changePageByEvent}
				/>
			),
			register: <Register changePageByName={this.changePageByName} loggedIn={this.loggedIn} />,
			login: <Login changePageByName={this.changePageByName} loggedIn={this.loggedIn} email={this.getEmail} />,
			profile: (
				<ProfilePage
					changePageByName={this.changePageByName}
					loggedIn={this.state.loggedIn}
					email={this.state.email}
				/>
			),
			postJob: <PostJob loggedIn={this.loggedIn} />
		};
		return (
			<div>
				{router[this.state.currentPage]}

				<MainNavBar changePageByEvent={this.changePageByEvent} loggedIn={this.state.loggedIn} />
				<LogOut onClick={this.logOut} />
				{this.state.error}
			</div>
		);
	}
}

export default App;
