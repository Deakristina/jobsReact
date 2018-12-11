import React, { Component } from 'react';
import './App.css'; //NO
import PostJob from './PostJob';
import MainNavBar from './MainNavBar'; //TESTING ZONE
import Register from './Register'; //UNDER CONSTRUCTION
// import SearchJob from './SearchJob' //NOT CONSTRUCTED
// import Login from './Login' //NOT CONSTRUCTED
import ProfilePage from './ProfilePage'; //UNDER CONSTRUCTION

class App extends Component {
	constructor() {
		super();
		this.state = {
			currentPage: 'profile',
			loggedIn: false
		};
	}

	changeCurrentPage = (e) => {
		this.setState({ currentPage: e });
	};

	render() {
		var router = {
			// searchJob: <SearchJob/>,
			register: <Register />,
			// login: <Login/>,
			// profile: <ProfilePage/>,
			postJob: <PostJob />
		};
		return (
			<div>
				<MainNavBar changePage={this.changeCurrentPage} loggedIn={true} />
				{router[this.state.currentPage]}
			</div>
		);
	}
}

export default App;
