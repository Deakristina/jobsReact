import React, { Component } from 'react'
import axios from 'axios';

class JobOffer extends Component {
    
    constructor(){
        super()
        this.state = {
            editProfile: false,
        }
    }

    componentDidMount = () =>{
        var id = //cookie here with id 
        axios('http://localhost:4000/profileInfo?id='+id, {
            method: 'GET'
        })
        .then((result) => {
            this.setState({profileInfo: result})
        })
        .catch((err) => console.log(err))
    }
    
    render() { //If true return form

        var info = this.state.profileInfo 

        var userPosts = info.jobsPosted.map((element) => { //Map all projects
            element = <li>{element}</li>
        })

        if(this.state.editProfile){  //Posts cannot be edited from here
            return (
                <div>
                    
                </div>
            )
        } 
        else{ //Here info of what people see in the offers and offers created
            return(
                <div>
                    <ul class="list offerer">
                        <li className="list-item"><label>Name</label>{info.name}</li>
                        <li className="list-item"><label></label>{info.email}</li>
                        <li className="list-item"><label></label>{info.phone}</li>
                    </ul>
                    <div>
                        <ul>
                            {userPosts}
                        </ul>
                    </div>
                </div>
            )
        }  
    
  }
}

export default JobOffer