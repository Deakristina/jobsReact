import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import '../App.css';
import local from '../local';

class SearchResultModal extends Component {
	state = {
		jobData: null
	};
	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	};

	componentDidMount() {
		axios.get(`${local.ipAddress}:${local.port}/get-job/${this.props.jobId}`).then((result) => {
			this.setState({ jobData: result.data });
		});
	}

	save = () => {
		console.log('I SAVED!');

		this.props.changePageByName('home');
	};

	render() {
		let jobDetails = <div>Loading..</div>;
		if (this.state.jobData) {
			let job = this.state.jobData;
			jobDetails = <div>{job.location.city}</div>;
		}

		return (
			<div>
				<Modal isOpen={this.props.modal} className={this.props.className}>
					<ModalBody className="text-center">{jobDetails}</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.save}>
							Save
						</Button>{' '}
						<Button color="secondary" onClick={this.props.hideModal}>
							Back to Search
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default SearchResultModal;
