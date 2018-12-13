import React, { Component } from 'react';

import LandingPage from './components/LandingPage';
import PostJob from './components/PostJob';
import MainNavBar from './MainNavBar'; //TESTING ZONE
import Register from './Register'; //UNDER CONSTRUCTION
// import SearchJob from './SearchJob' //NOT CONSTRUCTED
import Login from './Login'; //NOT CONSTRUCTED
import ProfilePage from './ProfilePage'; //UNDER CONSTRUCTION
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'; //NO`

class App extends Component {
	constructor() {
		super();
		this.state = {
			currentPage: 'home',
			loggedIn: false
		};
	}

	changeCurrentPage = (e) => {
		this.setState({ currentPage: e });
	};

	render() {
		var router = {
			home: <LandingPage changePage={this.changeCurrentPage} />,
			// searchJob: <SearchJob/>,
			register: <Register changePage={this.changeCurrentPage} />,
			login: <Login changePage={this.changeCurrentPage} />,

			profile: <ProfilePage />,
			postJob: <PostJob changePage={this.changeCurrentPage} />
		};
		return (
			<div>
				<MainNavBar changePage={this.changeCurrentPage} />
				{router[this.state.currentPage]}
				{/* <LandingPage /> */}
			</div>
		);
	}
}

export default App;
