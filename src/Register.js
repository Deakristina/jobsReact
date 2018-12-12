import React, {Component} from 'react'


const axios = require('axios')
const port = 5001
const ip = "10.85.2.141"

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
                url: 'http://'+ip+':'+port+'/checkEmail',
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

    handleSubmit = () => {
        axios({
            method: 'post',
            url: 'http://'+ip+':'+port+'/register',
            data: {
                thedata: this.state
            }
        })
        .then((result) => {
            if(result.status === 200){
                this.props.changePage('profilePage')
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
        
        return(
            <div>
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

            </div>
        )
    }
}

export default RegisterForm