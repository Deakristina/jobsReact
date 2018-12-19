import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import '../App.css';
import local from '../local';

class SearchResultModal extends Component {
	state = {
		jobData: null,
		nestedModal: false,
		closeAll: false
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	};

	toggleNested = () => {
		this.setState({
			nestedModal: !this.state.nestedModal,
			closeAll: false
		});
	};

	hideAll = () => {
		this.setState({
			nestedModal: false,
			closeAll: true
		});
		this.props.hideModal();
	};

	componentDidMount() {
		axios
			.get(`http://${local.ipAddress}:${local.port}/get-job/${this.props.jobId}`, { withCredentials: true })
			.then((result) => {
				this.setState({ jobData: result.data });
			});
	}

	save = () => {
		axios.post(`http://${local.ipAddress}:${local.port}/save-job`, {
			withCredentials: true,
			jobId: this.state.jobData._id
			// 	// userId: '5c17ad5153dc7bc50f3361df'
		});
		this.toggleNested();
	};

	render() {
		let jobDetails = <div>Loading..</div>;
		if (this.state.jobData) {
			let job = this.state.jobData;

			if (job.info.description === '') {
				jobDetails = (
					<div>
						<ul className=" p-2">
							<li className="job-list modal-list">
								<strong>Job Position: </strong> {job.info.title}
							</li>
							<li className="job-list modal-list">
								<strong>Location: </strong> {job.location.address}, {job.location.zipCode}
							</li>
							<li className="job-list modal-list">
								{job.location.city}, {job.location.country}
							</li>
							<li className="job-list modal-list">
								<strong>Salary: </strong> {job.info.salary}
							</li>
							<li className="job-list modal-list">
								<strong>Date: </strong> {job.info.startDate.slice(0, 10)}
							</li>
							<li className="job-list modal-list">
								<strong>Duration: </strong> {job.info.duration}
							</li>
							<li className="job-list modal-list">
								<strong>Requirements: </strong> {job.info.requirements}
							</li>

							<li className="job-list modal-list">
								<strong>Description: </strong> -
							</li>
						</ul>
					</div>
				);
			} else {
				jobDetails = (
					<div>
						<ul className=" p-2">
							<h3>Job Information</h3>
							<li className="job-list modal-list">
								<strong>Job Position: </strong> {job.info.title}
							</li>
							<li className="job-list modal-list">
								<strong>Location: </strong> {job.location.address}, {job.location.zipCode},
								{job.location.city}, {job.location.country}
							</li>

							<li className="job-list modal-list">
								<strong>Salary: </strong> {job.info.salary}
							</li>
							<li className="job-list modal-list">
								<strong>Date: </strong> {job.info.startDate.slice(0, 10)}
							</li>
							<li className="job-list modal-list">
								<strong>Duration: </strong> {job.info.duration}
							</li>
							<li className="job-list modal-list">
								<strong>Requirements: </strong> {job.info.requirements}
							</li>

							<li className="job-list modal-list">
								<strong>Description: </strong> {job.info.description}
							</li>
						</ul>
					</div>
				);
			}
		}

		return (
			<div>
				<Modal isOpen={this.props.modal} className={this.props.className}>
					<ModalBody className="text-center">{jobDetails}</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.save}>
							Save
						</Button>

						<Modal
							isOpen={this.state.nestedModal}
							toggle={this.toggleNested}
							onClosed={this.state.closeAll ? this.toggle : undefined}
						>
							<ModalBody>You have successfully saved this job!</ModalBody>
							<ModalFooter>
								<Button color="secondary" onClick={this.hideAll}>
									Close
								</Button>
							</ModalFooter>
						</Modal>

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
