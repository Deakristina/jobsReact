import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import axios from 'axios';
import local from './local';
import ScrollableAnchor from 'react-scrollable-anchor';

let navStyle = {
	position: 'fixed',
	top: '0',
	width: '100%'
};

class MainNavBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false
		};
	}
	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
<<<<<<< HEAD

	}
	logOutAction = (changeAPP) => {
		debugger;
=======
	};
	logOutAction = () => {
>>>>>>> 516748f1e8565048cf996cdd501b7109fe9aa3fd
		axios(`http://${local.ipAddress}:${local.port}/logout`, {
			withCredentials: true
		})
<<<<<<< HEAD
		  .then((result) => {
			debugger
			if (result.status === 200) {
				debugger
				this.props.setLoggedIn(false)
			} else {
				this.setState({ error: 'There was an error when loggin Out' });
			}
		  })
		  .catch((err) => console.log(err));
	  };
=======
			.then((result) => {
				if (result.status === 200) {
					this.props.setLoggedIn(false);
					this.props.isOpen(true);
					this.props.toggle();
				} else {
					this.setState({ error: 'There was an error when loggin Out' });
				}
			})
			.catch((err) => console.log(err));
	};
>>>>>>> 516748f1e8565048cf996cdd501b7109fe9aa3fd

	render() {
		let navButtons = (
			<ScrollableAnchor id="homepage">
				<Nav className="ml-auto h5 text-nav" navbar>
					<NavItem>
						<NavLink
							className=" text-nav"
							href="/#section1"
							data-page="home"
							onClick={this.props.changePageByEvent}
						>
							Why MicroJobs
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink className=" text-nav" data-page="register" onClick={this.props.changePageByEvent}>
							Register
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink className=" text-nav" data-page="login" onClick={this.props.changePageByEvent}>
							Login
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink className=" text-nav" data-page="searchJob" onClick={this.props.changePageByEvent}>
							Search Job
						</NavLink>
					</NavItem>
				</Nav>
			</ScrollableAnchor>
		);
		if (this.props.loggedIn) {
			navButtons = (
				<Nav className="ml-auto h5" navbar>
					<NavItem>
						<NavLink className=" text-nav" data-page="profile" onClick={this.props.changePageByEvent}>
							Profile
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink className=" text-nav" data-page="postJob" onClick={this.props.changePageByEvent}>
							Post Job
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink className=" text-nav" data-page="searchJob" onClick={this.props.changePageByEvent}>
							Search Job
						</NavLink>
					</NavItem>
					<NavItem>
<<<<<<< HEAD
						<NavLink className=" text-nav" data-page="login" onClick={() => {
							this.logOutAction()
							this.props.changePageByName('login')
						}}>
=======
						<NavLink
							className=" text-nav"
							data-page="login"
							onClick={() => {
								this.logOutAction();
								this.props.changePageByName('home');

								this.props.successAlert();
							}}
						>
							{/* <SuccessAlert /> */}
>>>>>>> 516748f1e8565048cf996cdd501b7109fe9aa3fd
							Log Out
						</NavLink>
					</NavItem>
				</Nav>
			);
		}
		return (
			<div style={navStyle}>
				<Navbar className="light" light expand="md">
					<NavbarBrand href="/" className="text-nav brand">
						MicroJobs
					</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						{navButtons}
					</Collapse>
				</Navbar>
			</div>
		);
	}
}

export default MainNavBar;
