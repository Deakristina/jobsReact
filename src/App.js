import React, { Component } from 'react';
import './App.css'; //NO
import PostJob from './PostJob';
import MainNavBar from './MainNavBar'; //TESTING ZONE
import Register from './Register'; //UNDER CONSTRUCTION
// import SearchJob from './SearchJob' //NOT CONSTRUCTED
<<<<<<< HEAD
import Login from './Login' //NOT CONSTRUCTED
import ProfilePage from './ProfilePage' //UNDER CONSTRUCTION
=======
// import Login from './Login' //NOT CONSTRUCTED
import ProfilePage from './ProfilePage'; //UNDER CONSTRUCTION
>>>>>>> 55951701d8094c45c20f6d5cfaa5f6d61e5ecd61

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

<<<<<<< HEAD
  render() {

    var router =  {
      // searchJob: <SearchJob/>, 
      register: <Register/>,
      login: <Login/>,
      profile: <ProfilePage/>,
      //Here the component that renders post job

    }
    return(
      <div>
        <MainNavBar changePage = {this.changeCurrentPage} loggedIn = {true}/>
        {router[this.state.currentPage]}
      </div>
    ) 
    
  }
=======
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
>>>>>>> 55951701d8094c45c20f6d5cfaa5f6d61e5ecd61
}

export default App;
