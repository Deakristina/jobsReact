import React, {Component} from 'react'
import NavProfile from './NavProfile'
import JobSeeker from './JobSeeker'
import JobOffer from './JobOffer'
import local from './local'

const axios = require('axios')

class profilePage extends Component{
    constructor(){
        super()
        this.state = {
            status: 'jobSeeker',
            basicInfo: {},
        }
        this.basicInfo = {

        }
    }

    componentDidMount = () => {
        axios(`http://${local.ipAdress}:${local.port}/profileInfo`, { //Session of passport
            withCredentials: true,
            method: 'get',
        })
        .then((result) => {
            if(result.status == 201){
                this.props.changePage('login')
            }
            else{
                debugger
                this.basicInfo.data = result.data
            }
        })
        .catch(err => console.log(err))
    }

    handleProfile = (currentPage) => {
        if(this.state.status === currentPage){
            this.setState({status: 'jobOffer'})
           
        }
        else{
            this.setState({status: 'jobSeeker'})
        }
        return this.state.status
    } 
    
    render(){
        if(this.state.status == 'jobSeeker'){
            return( 
                <div>
                    <a onClick={this.handleProfile(this.state.status)}>{this.state.status}</a>
                    <jobSeeker basicInfo = {this.state.basicInfo} jobHistory = {this.state.basicInfo.jobs} />
                </div>
            )       
        }
        else{
            return(
                <div>
                    <a onClick={this.handleProfile(this.state.status)}>{this.state.status}</a>
                    <jobOffer basicInfo = {this.state.basicInfo} jobHistory = {this.state.basicInfo.jobs}/>
                </div>
            )
        }
    }
}

export default profilePage