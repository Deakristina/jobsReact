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

export default JobOffer