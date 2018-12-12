import React, { Component } from 'react'
import axios from 'axios'


class Login extends Component {
  constructor(){
    super()
    this.state = {
      username: "",
      password: "",
      error: "",
    }

  }

  handleSubmit = () => {
    axios({
      method: 'post',
      url: "10.85.2.141:5001",
      data: {
        username: this.state.username,
        password: this.state.password,
      },
      withCredentials: true,
    })
    .then((result) => {
      if(result.status === 200){
        this.props.changePage('searchJob')
      }
      else if ( 300 < result.status < 505){
        this.setState({error: 'Server error'})
      }
      else{
        this.setState({error: "Invalid Credentials"})
      }
    })
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
              <li className="list-item"><input onChange={this.handleChange} type="text" className="input" placeholder="Password" name="password"/></li>
              <li className="list-item"><input type="submit" className="input" value="Logg In"/></li>
            </ul>
            <p>{this.state.error}</p>
        </form>
      </div>
    )
  }
}

export default Login