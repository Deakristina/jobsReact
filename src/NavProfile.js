import React from 'react'


function navBar (props) {
    return(
        <nav>
            <div className="navbar-brand">
                <a onClick={props.changeProfile('jobSeeker')} className="navbar-item">Your profile when seeking a job</a>
                <a onClick={props.changeProfile('jobOffer')} className="navbar-item">Your profile when offering a job</a>
            </div>
        </nav>
        
    )
}

export default navBar