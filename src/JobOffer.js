import React, { Component } from 'react'
import axios from 'axios'

class JobOffer extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            editProfile: false,
            info: this.props.basicInfo
        }
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