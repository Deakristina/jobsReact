import React, { Component } from 'react'
import Input from './components/input'
import local from './local'

const axios = require('axios')

class RegisterForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			error: '',
			name: '',
			surname: '',
			email: ''
		}
	}

	checkUsername = (event) => {
		debugger
		var toCheck = event.target.value
		this.setState({ email: toCheck }, () => {
			debugger
			axios({
				method: 'post',
				url: `${local.ipAddress}:${local.port}/checkEmail`,
				data: {
					email: this.state.email
				},
				withCredentials: true
			})
				.then((result) => {
					debugger
					console.log(result)

					if (result.status === 200) {
						this.setState({ userExists: false, error: '' })
					} else {
						this.setState({ userExists: true, error: 'This email is already in use' })
					}
				})
				.catch((err) => {
					debugger
					console.log(err)
				})
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		axios({
			method: 'post',
			url: `${local.ipAddress}:${local.port}/register`,
			data: {
				thedata: this.state
			}
		})
			.then((result) => {
				if (result.status === 200) {
					console.log(result)
					this.props.changePageByName('login')
					this.props.loggedIn(true)
				} else {
					this.setState({ error: 'There was an error, please try later', userExists: true })
				}
			})
			.catch((err) => console.log(err))
	}
	handleChange = (e) => {
		var userObject = {} //Credits to documentation, and to mom thank for supporting me
		userObject[e.target.name] = e.target.value
		this.setState(userObject)
	}

	render() {
		if (this.state.userExists) {
			return (
				<div className="row">
					<div className="col-4"> </div>
					<div className="col-4">
						<div className="container mt-5 register-container">
							<h1 className="login-title text-center mt-3">Register</h1>
							<form onSubmit={this.handleSubmit} className="formulario" method="POST">
								<div className="form-group pt-3">
									<label htmlFor="firstname">First Name </label>
									<input
										onChange={this.handleChange}
										type="text"
										className="form-control"
										id="firstname"
										name="name"
										required
									/>
								</div>
								<div className="form-group">
									<label htmlFor="lastname">Last Name </label>
									<input
										onChange={this.handleChange}
										type="text"
										className="form-control"
										id="lastname"
										name="surname"
										required
									/>
								</div>
								<div className="form-group">
									<label htmlFor="email">Email </label>
									<input
										onChange={this.checkUsername}
										type="email"
										className="form-control"
										id="email"
										name="email"
										required
									/>
								</div>

								<div className="form-group">
									<label htmlFor="phone">Phone </label>
									<input
										onChange={this.handleChange}
										type="number"
										className="form-control"
										id="phone"
										name="phone"
										required
									/>
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
										required
									/>
								</div>
								<p>{this.state.error}</p>
							</form>
						</div>
					</div>
					<div className="col-4" />
				</div>
			)
		} else {
			return (
				<div className="row">
					<div className="col-4"> </div>
					<div className="col-4">
						<div className="container mt-5 register-container">
							<h1 className="login-title text-center mt-3">Register</h1>
							<form onSubmit={this.handleSubmit} className="formulario" method="POST">
								<div className="form-group pt-3">
									<label htmlFor="firstname">First Name </label>
									<input
										onChange={this.handleChange}
										type="text"
										className="form-control"
										id="firstname"
										name="name"
										required
									/>
								</div>
								<div className="form-group">
									<label htmlFor="lastname">Last Name </label>
									<input
										onChange={this.handleChange}
										type="text"
										className="form-control"
										id="lastname"
										name="surname"
										required
									/>
								</div>
								<div className="form-group">
									<label htmlFor="email">Email </label>
									<input
										onChange={this.checkUsername}
										type="email"
										className="form-control"
										id="email"
										name="email"
										required
									/>
								</div>

								<div className="form-group">
									<label htmlFor="phone">Phone </label>
									<input
										onChange={this.handleChange}
										type="number"
										className="form-control"
										id="phone"
										name="phone"
										required
									/>
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
										required
									/>
								</div>
								<div className="row">
									<div className="col-12 text-center pb-2 ">
										<button
											type="submit"
											onChange={this.handleChange}
											className="btn btn-info btn-block btn-lg"
										>
											Register
										</button>
									</div>
								</div>
								<div error={this.state.error} />
								{/* check error */}
							</form>
						</div>
					</div>
					<div className="col-4" />
				</div>
			)
		}
	}
}

export default RegisterForm
