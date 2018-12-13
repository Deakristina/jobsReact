import React, {Component} from 'react'
import local from './local'

const axios = require('axios')


class RegisterForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            error: "",
            name: "",
            surname: "",
            email: "",
            
        }
    }
    
    checkUsername = (event) => {
        var toCheck = event.target.value
        this.setState({email: toCheck}, () => {
            axios({
                method: 'post',
                url: `http://${local.ipAddress}:${local.port}/checkEmail`,
                data: {
                    email: this.state.email
                },
                withCredentials: true
            })
            .then((result) => {
                console.log(result)
        
                if(result.status === 200){
                    this.setState({userExists: false, error: ''})
                }
                else{
                    this.setState({userExists: true, error: 'This email is already in use'})
                }
                
            })
            .catch(err => {
        
                console.log(err)
            })
        })
       
    }

    handleSubmit = (e) => {
        e.preventDefault()
        axios({
            method: 'post',
            url: `http://${local.ipAddress}:${local.port}/register`,
            data: {
                thedata: this.state
            }
        })
        .then((result) => {
            if(result.status === 200){
                console.log(result)
                this.props.changePage('login')
            }
            else{
               this.setState({error: "There was an error, please try later"})
            }
        })
        .catch((err) => console.log(err))
    }
    handleChange = (e) => {

        var userObject = {}
        userObject[e.target.name] = e.target.value

        this.setState(userObject)
    }

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
    render(){
        if(this.state.userExists){
          return(<div>
                    <form onSubmit={this.handleSubmit} className="formulario" method="POST">
                        <ul>
                            <li className="list-item"><label>Name</label><input onChange={this.handleChange} type="text" className="input" name="name" required/></li>
                            <li className="list-item"><label>Surname</label><input onChange={this.handleChange} type="text" className="input" name="surname"/></li>
                            <li className="list-item"><label>Email</label><input type="text" className="input" name="email" onChange={this.checkUsername} required/></li>
                            <li className="list-item"><label>Phone</label><input onChange={this.handleChange} type="text" className="input" name="phone"/></li>
                            <li className="list-item"><label>Password</label><input onChange={this.handleChange} type="password" className="input" name="password" pattern=".{6,}[A-Za-z]"required/></li>
                        </ul>
                        <p>{this.state.error}</p>
                    </form>

                </div>
            )
        }
        else{
            return(
                <div>
                    <form onSubmit={this.handleSubmit} className="formulario" method="POST">
                        <ul>
                            <li className="list-item"><label>Name</label><input onChange={this.handleChange} type="text" className="input" name="name" required/></li>
                            <li className="list-item"><label>Surname</label><input onChange={this.handleChange} type="text" className="input" name="surname"/></li>
                            <li className="list-item"><label>Email</label><input type="text" className="input" name="email" onChange={this.checkUsername} required/></li>
                            <li className="list-item"><label>Phone</label><input onChange={this.handleChange} type="text" className="input" name="phone"/></li>
                            <li className="list-item"><label>Password</label><input onChange={this.handleChange} type="password" className="input" name="password" required/></li>
                            <li className="list-item"><label>Register</label><input onChange={this.handleChange} type="submit" className="input" value="Register" onClick={this.createUser}/></li>
                            
                        </ul>
                        <p>{this.state.error}</p>
                    </form>

                </div>
            )
        }
    }
}

export default RegisterForm