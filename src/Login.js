import React, { Component } from 'react';
import axios from 'axios';
import local from './local';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			error: ''
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();

		axios({
			method: 'post',
			url: `http://${local.ipAddress}:${local.port}/login`,
			data: {
				username: this.state.username,
				password: this.state.password
			},
			withCredentials: true
		})
			.then((result) => {
				if (result.status === 200) {
					this.props.changePageByName('searchJob');
					this.props.loggedIn(true);
				}
				else if (result.status === 201) {
					this.setState({ error: 'Invalid Credentials' });
				} 
				else if(result.status === 204){
					this.props.changePageByName('profilePage')
				}
				else {
					this.props.changePageByName('home');
				}
			})
			.catch((err) => console.log(err));
	};

	handleChange = (e) => {
		if (e.target.name === 'username') {
			this.setState({ username: e.target.value });
		} else {
			this.setState({ password: e.target.value });
		}
	};

	render() {
		return (
			<div className="row">
				<div className="col-md-4" />
				<div className="col-md-4">
					<div className="container mt-5 login-container">
						<h1 className="login-title text-center mt-3">Log In</h1>
						<form onSubmit={this.handleSubmit} method="POST">
							<div className="form-group pt-3">
								<label htmlFor="Email">Email address</label>
								<input
									onChange={this.handleChange}
									type="email"
									className="form-control"
									placeholder="e.g: example@email.com"
									name="username"
									id="Email1"
									aria-describedby="emailHelp"
								/>
								<small id="emailHelp" className="form-text text-muted">
									We'll never share your email with anyone else.
								</small>
							</div>
							<div className="form-group ">
								<label htmlFor="password">Password</label>
								<input
									onChange={this.handleChange}
									id="password"
									type="password"
									className="form-control"
									placeholder="Password"
									name="password"
								/>
							</div>
							<div className="row">
								<div className="col-12 text-center pb-2 ">
									<button type="submit" className="btn btn-info btn-block btn-lg">
										Log In
									</button>
									<p>{this.state.error}</p>
								</div>
							</div>
							<div className="registration-footnote text-center pt-2 pb-2">
								<span>
									Don't have an account yet?
									<a className="registration-link" href="/register">
										Register here
									</a>
								</span>
							</div>
						</form>
						<p>{this.state.error}</p>
					</div>
				</div>
				<div className="col-md-4" />
			</div>
		);
	}
}

export default Login;
