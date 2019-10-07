import React, { Component } from 'react';
import { Dimmer } from 'semantic-ui-react';
import '../styles/components/TutorialScreen.css';

class TutorialScreen extends Component {	

	constructor(props) {
		super(props);
		this.state = { 
			active: true,
		}
		this.handleHide = this.handleHide.bind(this);
	}
	
	handleHide() {
		this.setState({
			active: false,
		});
	}
	
	render() {
		return(	
			<Dimmer 
				active={this.state.active} 
				onClickOutside={this.handleHide}
				onClick={this.handleHide}
				className='tutorialText'
			>
				{this.props.message}
			</Dimmer>
			)
    }
}

export default TutorialScreen;