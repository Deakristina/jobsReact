import React, { Component } from 'react';
import Background from './img/shake.jpg';
import IconQUick from './img/time.png';
import IconSignal from './img/signal.png';
import IconCommunity from './img/community.png';

let sectionStyle = {
	width: '100%',
	height: '100vh',
	backgroundImage: `url(${Background})`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover'
};

let iconQUick = {
	backgroundImage: `url(${IconQUick})`,
	backgroundRepeat: 'no-repeat'
};

let iconSignal = {
	backgroundImage: `url(${IconSignal})`,
	backgroundRepeat: 'no-repeat'
};

let iconCommunity = {
	backgroundImage: `url(${IconCommunity})`,
	backgroundRepeat: 'no-repeat'
};

class LandingPage extends Component {
	render() {
		return (
			<div>
				<div id="home" className="hero-area">
					{/* <!-- Backgound Image --> */}
					<div className="bg-image bg-parallax overlay" style={sectionStyle} />
					{/* <!-- /Backgound Image --> */}

					<div className="home-wrapper">
						<div className="container">
							<div className="row">
								<div className="col-md-8">
									<h1 className="white-text">Find MicroJobs Around You</h1>
									<p className="lead white-text">Make more money. Earn more freedom</p>
									<button
										className="main-button icon-button btn btn-light"
										data-page="searchJob"
										onClick={this.props.changePageByEvent}
									>
										Find Job now
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="row mb-4 section-why">
					<div className="section-header text-center col-12">
						<h2 className="feature-text">Why Find A Job</h2>
						<p className="lead">Libris vivendo eloquentiam ex ius, nec id splendide abhorreant.</p>
					</div>
				</div>

				<div className="container section-icons">
					<div className="row">
						<div className="col-md-4">
							<div className="feature">
								<div className="feature-content " style={iconQUick}>
									<h4 className="feature-text">Quick & Easy</h4>
									<p>
										Ceteros fuisset mei no, soleat epicurei adipiscing ne vis. Et his suas veniam
										nominati.
									</p>
								</div>
							</div>
						</div>

						<div className="col-md-4">
							<div className="feature">
								<div className="feature-content" style={iconSignal}>
									<h4 className="feature-text">Jobs closest to you</h4>
									<p>
										Ceteros fuisset mei no, soleat epicurei adipiscing ne vis. Et his suas veniam
										nominati.
									</p>
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="feature">
								{/* <i className="feature-icon fa fa-comments" /> */}
								<div className="feature-content" style={iconCommunity}>
									<h4 className="feature-text">Community</h4>
									<p>
										Ceteros fuisset mei no, soleat epicurei adipiscing ne vis. Et his suas veniam
										nominati.
									</p>
								</div>
							</div>
						</div>
						{/* <!-- /feature --> */}
					</div>
				</div>

				<div className="row">
					<div className="col-md-12 footer-box footer-copyright pt-5 pb-5 text-center">
						<span className="footer-text">
							| &copy; Copyright 2018. All Rights Reserved by Find Your Job. |
							<i className="fa fa-heart-o" aria-hidden="true" />
						</span>
					</div>
				</div>
			</div>
		);
	}
}

export default LandingPage;
