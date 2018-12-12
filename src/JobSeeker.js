import React, { Component } from 'react'

class JobSeeker extends Component {
    /** 
     * Basically seeker POSTS information to the database with his priorities 
     * User POSTS on submit data about his life, info, aptitudes etc
     * Server sends them to database so they can be treated later
     * 
     * ProfileInfo should already have some info from register page which originally created the object user
     * with less information, here you can expand it
     * 
     * If the profile wnats to be edited a different component is loaded in this component
     * The default component is without editing, the editing one loads a DOM full with inputs
     * which later go to the database to be used by other components. 
     * 
     * Should have-> 
     *  - Email
     *  - Name
     *  - Surname
     *  - Preferences(?)
     *  - Latest job
     *  - Education
     *  - About him
     *  - TItles
     *  - Winnings.
     *  - Expected pay
     *  - And more 
    */
    constructor(props){
        super(props)
        this.state = {
            seekerProfileInfo: this.props.profileInfo,
            editProfile: false,
        }   
    }

    //POST REQUEST METHODS HERE TO PUT THE THINGS IN THE DATABASE. 
    changeEditStatus = () => {
        if(this.state.editProfile){
            this.setState({editProfile: false})
        }
        else{
            this.setState({editProfile: true})
        }
        
    }

    render() {
        if(this.state.editProfile){
            return(
                <div>
                    <a onClick={this.changeEditStatus}></a>
                    <form action="changeProfile" method="POST">
                        <img src={this.state.profileInfo.image}></img>
                        <ul className="list" name="UserInfo">
                            <li className="listItem"><label></label></li>
                            <li className="listItem"><label></label></li>
                            <li className="listItem"><label></label></li>
                        </ul>    
                    </form>        
                </div>
            )
        }
        else{
            //Else view info, they both have the same structure one with inputs, the other with sections. 
            return (
                <div>
                    <a onClick={this.changeEditStatus}></a>
                    <section>
                        <img src={this.state.profileInfo}></img>
                    </section>
                    <section>
                        <ul className="list" name="UserInfo">
                            <li className="listItem"><label></label></li>
                            <li className="listItem"><label></label></li>
                            <li className="listItem"><label></label></li>
                        </ul>    
                    </section>        
                </div>
            )
        }
  }
}

export default JobSeeker
