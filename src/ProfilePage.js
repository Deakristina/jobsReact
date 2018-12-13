import React, {Component} from 'react'
import NavProfile from './NavProfile'
import JobSeeker from './JobSeeker'
import Login from './Login'
import JobOffer from './JobOffer'
import local from './local'

const axios = require('axios')

class ProfilePage extends Component{
    constructor(props){
        super(props)
        this.state = {
            profileMode: "JobSeeker",
            loggedIn: this.props.loggedIn, //cookie value
            userID: "", //from Database user object
        }

        //State in ProfilePage holds all data
    }
    componentDidMount=()=>{ //Once page mounted fetch data from user profile object MongoDB
        axios(`http://${local.ipAddress}:${local.port}/profileInfo?u=${this.props.email}`, { //THIS IP IS INCORRECT
            method: 'get',
            withCredentials: true,
        })
        .then((result) => {
            console.log(result)
            this.setState({profileInfo: result})
        })      
        .catch(err => console.log(err))
    }
    changeProfileSection = (e) => {
        this.setState({profileMode: e})
    }
    render(){
        var profileRouting = {
            jobSeeker: <JobSeeker basicInfo = {this.state.profileInfo}/>,//Same page but without editing
            jobOffer: <JobOffer basicInfo = {this.state.profileInfo}/>,
        }
        if(this.state.loggedIn){
            return(
                /*NavProfile is different from original Nav or LoggedIn Nav*/ 
                <div className="ProfilePage">
                    <NavProfile changeSection = {this.changeProfileSection}/>
                    {this.profileRouting[this.state.profileMode]}
                </div>
            )
        }
        else{
            return(
                <Login/> /**Or login page or w/e */ 
            )
        }
       
    }
}
export default ProfilePage