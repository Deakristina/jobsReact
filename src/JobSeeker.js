import React, { Component } from 'react'
import axios from 'axios';
import local from './local'


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
            info: this.props.basicInfo,
            editProfile: false,
            data: {

            }
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

    handleChange = (e) => {
        var objectData = {}
        objectData[e.target.name] = e.target.value

        this.setState({data: objectData})
    }

    handleSubmit = () => {
        axios(`http://${local.ipAddress}:${local.port}/update?e=${this.state.info._id}`)
        .then((result) => {
            this.setState({error: 'Profile was updated.'})
        })
        .catch((err) =>  console.log(err))
    }

    render() {

        var basicInfo = []
        var extendedInfo = []

        for (var key in this.state.info.info.base){
            basicInfo.push(key)
        }
        for(var element in this.state.info.info.extendedInfo){
            extendedInfo.push(element)
        }

        var basicInfoMapped = basicInfo.map((element) => element = <li className="list-item">{element}</li>)
        var extendedInfoMapped = extendedInfo.map((element) => element = <li className="list-item">{element}</li>)
        var basicInfoInputs = basicInfo.map((element, pos) => element = <input onChange={this.handleChange} name={pos} value={element}/>)
        var extendedInfoInputs = extendedInfo.map((element, pos) => element = <input onChange={this.handleChange} name={pos} value= {element}/> )


        if(this.state.editProfile){  //Posts cannot be edited from here
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        {basicInfoInputs}
                        {extendedInfoInputs}
                        <input type="submit" value="Save"/>
                    </form>
                </div>
            )
        } 
        else{ //Here info of what people see in the offers and offers created
            return(
                <div>
                    <ul>
                        {basicInfoMapped}
                        {extendedInfoMapped}
                    </ul>
                </div>
            )
        }  

  }
}

export default JobSeeker
