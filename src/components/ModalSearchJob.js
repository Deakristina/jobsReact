import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

class SearchResultModal extends Component {
	state = {
		data: {
			title: '',
			startDate: '',
			duration: '',
			address: '',
			zipCode: '',
			city: '',
			country: '',
			salary: '',
			description: '',
			requirements: []
		}
	};
	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	};

	render() {
		// let jobs = this.state.jobs.map((item, i) => {
		// 	return <li>{item.info.title}</li>;
		// });

		return (
			<div>
				<Modal isOpen={this.props.modal} toggle={this.props.toggleModal} className={this.props.className}>
					<ModalBody className="text-center">check!</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.props.toggleModal}>
							Save
						</Button>{' '}
						<Button color="secondary" onClick={this.props.toggleModal}>
							Back to Search
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default SearchResultModal;
