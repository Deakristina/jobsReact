import React, { Component } from 'react'

class JobOffer extends Component {
    
    constructor(){
        super()
        this.state = {
            editProfile: false,
        }
    }
    
    render() { //If true return form
        if(this.state.editProfile){
            return (
                <div>
                    
                </div>
              )
        } 
        else{ //history Posts
            return(
                <div>

                </div>
            )
        }  
    
  }
}

export default JobOffer