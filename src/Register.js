import React, {Component} from 'react'
const axios = require('axios')


class RegisterForm extends Component {
    
    checkUsername = (event) => {
        var toCheck = event.target.value
        this.setState({email: toCheck}, () => {
            axios('http://localhost:4000/register')
            .then((result)=> {
                if(result === 418 ){
                    this.setState({userExists: true})
                }
                else{
                    this.setState({userExists: false})
                }
                this.userExists(this.userExists(this.state.userExists))
            })
            .catch(err => console.log(err))
        })
       
    }
    userExists = (userExists) => {
        if(userExists){
            return(
                <p>This email has already been used to create an account</p>
            )
        }
    }
    render(){

        return(
            <div>
                <form action="register" className="formulario" method="POST">
                    <ul>
                        <li className="list-item"><input type="text" className="input" name="name" required/></li>
                        <li className="list-item"><input type="text" className="input" name="surname"/></li>
                        <li className="list-item"><input type="text" className="input" name="email" onChange={this.checkUsername}/></li>
                        <li className="list-item"><input type="text" className="input" name="phone"/></li>
                        <li className="list-item"><input type="password" className="input" name="password" required/></li>
                        <li className="list-item"><input type="submit" className="input" value="Register"/></li>
                    </ul>
                </form>
            </div>
        )
    }
}

export default RegisterForm