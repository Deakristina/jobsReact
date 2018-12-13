import React, { Component } from 'react'
import axios from 'axios'
import local from './local'

class Login extends Component {
  constructor(){
    super()
    this.state = {
      username: "",
      password: "",
      error: "",
    }

  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.username, this.state.password)
    debugger
    axios({
      method: 'post',
      url: `http://${local.ipAddress}:${local.port}/login`,
      data: {
        username: this.state.name,
        password: this.state.password,
      },
      withCredentials: true,
    })
    .then((result) => {
      debugger
      if(result.status === 200){  
        debugger
        this.props.email(this.state.username)
        this.props.changePage('searchJob')
        this.props.loggedIn(true)
      }
      if (result.status === 201){
        debugger
        this.setState({error: 'Invalid Credentials'})
      }
      else{
        this.props.changePage('home')
      }
     
    })
    .catch(err => console.log(err))
  }

  handleChange = (e) => {
    if(e.target.name === "username"){
      this.setState({name: e.target.value})
    } 
    else{
      this.setState({password: e.target.value})
    }
    
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} method="POST">
            <ul className="list">
              <li className="list-item"><input onChange={this.handleChange} type="text" className="input" placeholder="Email eg: example@email.com" name="username"/></li>
              <li className="list-item"><input onChange={this.handleChange} type="password" className="input" placeholder="Password" name="password"/></li>
              <li className="list-item"><input type="submit" className="input" value="Logg In"/></li>
            </ul>
            <p>{this.state.error}</p>
        </form>
      </div>
    )
  }
}

export default Login