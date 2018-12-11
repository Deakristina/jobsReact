import React, {Component} from 'react'
import NavProfile from './NavProfile'
import JobSeeker from './JobSeeker'
import Login from './Login'
import JobOffer from './JobOffer'

class ProfilePage extends Component{
    constructor(){
        super()
        this.state = {
            profileMode: "JobSeeker",
            loggedIn: false, //cookie value
            userID: "", //from Database user object
        }

        //State in ProfilePage holds all data
    }
    componentDidMount=()=>{ //Once page mounted fetch data from user profile object MongoDB
        fetch('http://localhost:4000/jobsAPI') //Url to database
        .then((result) => {
            result.json()
        })
        .then((resultFinal) => {
            this.setState({profileInformation: resultFinal})
            console.log(resultFinal) //We put it in state and pass it down as props
        })
        .catch((err) => console.log(err))
    }
    changeProfileSection = (e) => {
        this.setState({profileMode: e})
    }
    render(){
        var profileRouting = {
            jobSeeker: <JobSeeker profileInfo = {this.state.profileInformation}/>,//Same page but without editing
            jobOffer: <JobOffer profileInfo = {this.state.profileInformation}/>,
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