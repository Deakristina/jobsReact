import React, { Component } from 'react';
import Background from './img/shake.jpg';

let sectionStyle = {
	width: '100%',
	height: '100%',
	backgroundImage: `url(${Background})`
};

class LandingPage extends Component {
	render() {
		return (
			<div id="home" className="hero-area">
				{/* <!-- Backgound Image --> */}
				<div className="bg-image bg-parallax overlay" style={sectionStyle} />
				{/* <!-- /Backgound Image --> */}

				<div className="home-wrapper">
					<div className="container">
						<div className="row">
							<div className="col-md-8">
								<h1 className="white-text">Find Jobs Around You</h1>
								<p className="lead white-text">Make more money. Earn more freedom</p>
								<a className="main-button icon-button" href="/searchJob">
									Get Started!
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default LandingPage;
