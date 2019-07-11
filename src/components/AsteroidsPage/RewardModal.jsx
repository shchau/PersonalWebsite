import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as AsteroidFieldActions from '../../actions/AsteroidFieldActions';
import { Image, Modal, TransitionablePortal } from 'semantic-ui-react';
import '../../styles/components/AsteroidsPage/RewardModal.css';

class RewardModal extends Component {	

	constructor(props) {
		super(props);
		this.state = {
			showModal: true,
		};
		this.closeModal = this.closeModal.bind(this);		
	}
	
	
	closeModal() {
		this.setState({
			showModal: !this.state.showModal,
		});
		this.props.closeModalSignal();
	}
	
	render() {		
		const isMobile = window.innerWidth < 768;
		
		let imageSize = "massive";
		if (isMobile) {
			imageSize = "small";
		}
		
		let $Image = (<Image wrapped size={imageSize} alt="" src={require("../../assets/images/noImage.png")}/>);
		if (this.props.wikiImage) {
			$Image = (<Image wrapped size={imageSize} alt="" src={this.props.wikiImage}/>);
		}
		
		return(	
			<TransitionablePortal open={this.state.showModal}  
			transition={{ animation:'fade', duration: 500 }}
			>
				<Modal 
					open={this.state.showModal}
					onClose={this.closeModal}
					closeOnDocumentClick={true}
				>
					<Modal.Header> {this.props.wikiTitle} </Modal.Header>
					<Modal.Content image scrolling>
						{$Image}
						<Modal.Description>
							<p className="wikiContent">{this.props.wikiContent} </p>
						</Modal.Description>	
					</Modal.Content>
				</Modal>
			</TransitionablePortal>
			)
    }
}

const mapStateToProps = state => {
    return {
        showModal: state.AsteroidFieldReducer.showModal,
    }
}

const mapDispatchToProps = dispatch => {
    return {
		closeModalSignal: () => {
            return dispatch(AsteroidFieldActions.closeModal());
        },
    }
}

RewardModal.propTypes = {
	wikiTitle: PropTypes.string.isRequired,
	wikiContent: PropTypes.string,
	wikiImage: PropTypes.string,
	showModal: PropTypes.bool.isRequired,
	closeModalSignal: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(RewardModal);