import React, {Component} from 'react'
import axios from 'axios'
import local from './local'

class jobOffer extends Component{
    constructor(props){
        super(props)
        this.state = {
            edit: false,
            info: this.props.basicInfo,
            showMore: false,
        }
    }
    
    handleChange = (e) => {
        var objectData = {}

        objectData[e.target.name] = e.target.value

        this.setState({newData: objectData})
    }

    handleSubmit = () => {
        
        axios(`http://${local.ipAddress}:${local.port}/profileInfo`, {
            method: 'post',
            data: {
                data: this.state.newData,
                email: this.state.email,
            },
            withCredentials: true,
        })
        .then((result) => {
            if(result.status === 200){
                this.setState({success: 'Profile was updated correctly'})
            }
            else{
                this.setState({error: 'Profile was not updated due to an error'})
            } 
        })
        .catch((err) => console.log(err))
    }

    editProfile = () => {
        this.setState({edit: !this.state.edit})
    }

    handleShowMore = () => {
        this.setState({showMore: !this.state.showMore})
    }

    checkUsername = (event) => {
		
        var toCheck = event.target.value
		this.setState({ email: toCheck }, () => {
			
			axios({
				method: 'post',
				url: `http://${local.ipAddress}:${local.port}/checkEmail`,
				data: {
					email: this.state.email
				},
				withCredentials: true
			})
				.then((result) => {
					
					console.log(result)

					if (result.status === 200) {
						this.setState({ userExists: false, error: '' })
					} else {
						this.setState({ userExists: true, error: 'This email is already in use' })
					}
				})
				.catch((err) => {
					
					console.log(err)
				})
		})
	}
    
    componentDidMount = () => {
        console.log(this.state.info)
    }

    render(){

        var arrayInfoBase = Object.values(this.state.info.info.base)
        var arrayInfoExtended = Object.values(this.state.info.info.extendedInfo)
        var keysBase = Object.keys(this.state.info.info.base)
        var keysExtended = Object.keys(this.state.info.info.extendedInfo)
        var jobs = this.state.info.jobs.saved
        
        var inputsBase = keysBase.map((element, pos) => element = <input onChange={this.handleChange} name={keysBase[pos]} placeholder={element}/>)
        var inputsExtended = keysExtended.map((element, pos) => element = <input onChange = {this.handleChange} name = {keysExtended[pos]} placeholder = {element}  />)

        var arrayInfoBaseMap = arrayInfoBase.map((element, pos) => element = <li >{element}</li>)
        var arrayInfoExtendedMap = arrayInfoExtended.map((element, pos) => element = <li >{element}</li>)
        var jobsMapped = jobs.map((element) => element = <li>{element}</li>)

        console.log(this.state)
        console.log(this.props)

   if(this.state.showMore){
        return(
            <div>
                <ul>
                    {arrayInfoBaseMap}
                </ul>
                <ul name='extendedInfo'>
                    {arrayInfoExtendedMap}
                </ul>
                <a onClick={this.editProfile}>Edit your profile</a>
                <a onClick={this.handleShowMore}>Hide</a>
            </div>
        )
    }
    else if(this.state.edit){
        return( 
            <div>
                <ul>
                    <li>
                        <form onSubmit={this.handleSubmit} method='POST'>
                            {inputsBase}
                            {inputsExtended}
                            <input type="submit" name="submit" value="Apply Changes"/>
                        </form>
                    </li>
                    <li>
                        {this.state.error}
                        {this.state.success}
                    </li>
                </ul>
            </div>
        )
    }
    else{
        return(
            <div>
                <ul name='NormalInfo'>
                    {arrayInfoBaseMap}
                </ul>
                <div name='jobHistory'>
                    {jobsMapped}
                </div>
                <a onClick={this.handleShowMore}>Show more</a>
                <a onClick={this.editProfile}>Edit your profile</a>
            </div>
        )
    }    

  }
    

}


export default jobOffer