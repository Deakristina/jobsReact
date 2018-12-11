import React from 'react'

function MainNavBar(props){
    if(props.loggedIn){
        return(
            <div>
                <ul>
                    <li><a onClick={function(){props.changePage('profile')}}>Profile</a></li>
                    <li><a onClick={function(){props.changePage('searchJob')}}>Search Jobs</a></li>
                    <li><a onClick={function(){props.changePage('post')}}>Post Jobs</a></li>
                </ul>
            </div>
        )
    }
    else{
        return(
            <div>
                <ul>
                    <li><a onClick={function(){props.changePage('register')}}>Register</a></li>
                    <li><a onClick={function(){props.changePage('login')}}>Logg In</a></li>
                    <li><a onClick={function(){props.changePage('searchJob')}}>Search Jobs</a></li>
                </ul>
            </div>
        )
    }
}

export default MainNavBar