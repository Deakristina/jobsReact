import React, { Component } from 'react';
import JobSeeker from './JobSeeker';
import JobOffer from './JobOffer';
import local from './local';

const axios = require('axios');

class profilePage extends Component {
	constructor() {
		super();
		this.state = {
			status: 'JobSeeker',
            basicInfo: {},
            isOffer: false,
            loggedIn: false
		};
	}

    componentDidMount = () => {
        axios(`http://${local.ipAddress}:${local.port}/profileInfo?isOf=${this.state.isOffer}`, { //Session of passport
            withCredentials: true,
            method: 'get',
        
        })
        .then((result) => {
            debugger
            if(result.status === 201){
                this.props.loggedIn(false)
                debugger
                this.props.changePage('login')
            }
            else{
                debugger
                console.log(result)
                this.setState({basicInfo: result, status: 'JobOffer'}, () => {
                    console.log(this.state.basicInfo.data)
                    this.setState({status: 'JobOffer'})
                })
            }
        })
        .catch(err => console.log(err))
    }

    handleProfile = () => {
        if(this.state.status === 'JobSeeker'){
            this.setState({status: 'JobOffer', isOffer: true})
          
           
        }
        else if(this.state.status === 'JobOffer'){
            this.setState({status: 'JobSeeker', isOffer: false})
            
        }
        
    } 
    
    render(){
        if(this.state.status === 'JobSeeker'){
            return( 
                <div>
                    <a onClick={this.handleProfile}>See your profile as Job Poster</a>
                    <JobSeeker basicInfo = {this.state.basicInfo}/>
                </div>
            )       
        }
        else if(this.state.status === "JobOffer"){
            return(
                <div>
                    <a onClick={this.handleProfile}>See your profile as Job Seeker</a>
                    <JobOffer basicInfo = {this.state.basicInfo.data}/>
                </div>
            )
        }
        else{
            return(
                <div>There was an error. We are working to fix it</div>
            )
        }
    }
}

export default profilePage;
