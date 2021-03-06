import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

class ModalPage extends Component {
	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	};

	// triggerFunctions = (e) => {
	// 	//this.props.toggleModal();
	// 	this.props.handleClearForm(e);
	// };

	render() {
		return (
			<div>
				<Modal isOpen={this.props.modal} toggle={this.props.toggleModal} className={this.props.className}>
					<ModalBody className="text-center">You have sucessfully post the job!</ModalBody>
					<ModalFooter>
						<Button color="secondary" onClick={this.props.toggleModal}>
							Close
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default ModalPage;
