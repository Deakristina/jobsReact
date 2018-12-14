import React from 'react'


function navBar (props) {
    return(
        
            <div className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" onClick={props.changeProfile('jobSeeker')}>Your profile when seeking a job</a>
                    <a onClick={props.changeProfile('jobOffer')} className="navbar-item">Your profile when offering a job</a>
                </div>
            </div>
        
    )
}

export default navBar