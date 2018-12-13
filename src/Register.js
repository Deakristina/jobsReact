import React, { Component } from 'react';
import Input from './components/input';
import local from './local';

const axios = require('axios');
const port = 5001;
const ip = '10.85.2.141';

class RegisterForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: '',
			name: '',
			surname: '',
			email: ''
		};
	}

	checkUsername = (event) => {
		event.preventDefault();
		var toCheck = event.target.value;
		this.setState({ email: toCheck }, () => {
			axios({
				method: 'post',
				url: `http://${local.ipAddress}:${local.port}/checkEmail`,
				data: {
					email: this.state.email
				},
				withCredentials: true
			})
				.then((result) => {
					console.log(result);

					if (result.status === 200) {
						this.setState({ userExists: false, error: '' });
					} else {
						this.setState({ userExists: true, error: 'This email is already in use' });
					}
				})
				.catch((err) => {
					console.log(err);
				});
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		axios({
			method: 'post',
			url: `http://${local.ipAddress}:${local.port}/register`,
			data: {
				thedata: this.state
			},
			withCredentials: true
		})
			.then((result) => {
				if (result.status === 200) {
					this.props.changePage('profilePage');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	handleChange = (e) => {
		var userObject = {};
		userObject[e.target.name] = e.target.value;

		this.setState(userObject);
	};

	// userExists = (userExists) => {
	//     if(!userExists){
	//         this.setState({errorHandling: "This email is already in use"})
	//         return(
	//             <p>{this.state.errorHandling}</p>
	//         )
	//     }
	// }
	// createUser = () => {
	//     var number = 200;
	//     axios('http://'+ip+':'+port+'/200?number='+number,{withCredentials: true})
	//     .then((result) => {
	//         if(result.status === 200){
	//             this.props.changePage('login')
	//         }
	//     })
	//     .catch(err => console.log(err))
	// }
	render() {
		return (
			<div className="row">
				<div className="col-4"> </div>
				<div className="col-4">
					<div className="container mt-5 register-container">
						<h1 className="login-title text-center mt-3">Register</h1>
						<form onSubmit={this.handleSubmit} className="formulario" method="POST">
							<div className="form-group pt-3">
								<label htmlFor="firstname">First Name: </label>
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
								<label htmlFor="lastname">Last Name: </label>
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
								<label htmlFor="email">Email: </label>
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
								<label htmlFor="phone">Phone: </label>
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
										onClick={this.createUser}
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
		);
	}
}

export default RegisterForm;

/* <div>
                <form onSubmit={this.handleSubmit} className="formulario" method="POST">
                    <ul>
                        <li className="list-item"><label>Name</label><input onChange={this.handleChange} type="text" className="input" name="name" required/></li>
                        <li className="list-item"><label>Surname</label><input onChange={this.handleChange} type="text" className="input" name="surname"/></li>
                        <li className="list-item"><label>Email</label><input type="text" className="input" name="email" onChange={this.checkUsername}/></li>
                        <li className="list-item"><label>Phone</label><input onChange={this.handleChange} type="text" className="input" name="phone"/></li>
                        <li className="list-item"><label>Password</label><input onChange={this.handleChange} type="password" className="input" name="password" required/></li>
                        <li className="list-item"><label>Register</label><input onChange={this.handleChange} type="submit" className="input" value="Register" onClick={this.createUser}/></li>
                        
                    </ul>
                    <p>{this.state.error}</p>
                </form>

            </div> */
