import React, { Component } from 'react';
import './App.css'; //NO
import PostJob from './components/PostJob';
import MainNavBar from './MainNavBar'; //TESTING ZONE
import Register from './Register'; //UNDER CONSTRUCTION
// import SearchJob from './SearchJob' //NOT CONSTRUCTED
import Login from './Login'; //NOT CONSTRUCTED
import ProfilePage from './ProfilePage'; //UNDER CONSTRUCTION
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			currentPage: '',
			loggedIn: false
		};
	}

	changeCurrentPage = (e) => {
		this.setState({ currentPage: e });
	};

	render() {
		var router = {
			//FindYourJob: <FindYourJob changePage={this.changeCurrentPage} />,
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
			</div>
		);
	}
}

export default App;
