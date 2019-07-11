import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import '../../styles/components/PathFinderPage/BeginPathFindingButton.css';

class BeginPathFindingButton extends Component {	
	
	constructor(props) {
		super(props);
		this.state = {
			pathFindingStarted: false,
		};
		
		this.startPathFinding = this.startPathFinding.bind(this);
	}
	
	
	startPathFinding() {
		this.setState({
			pathFindingStarted: true,
		});
	}
	
	render() {
		return(	
			<Button className="startButton" 
				inverted 
				size="massive" 
				color="blue" 
				active={this.state.pathFindingStarted}
				disabled={this.state.pathFindingStarted}
				loading={this.state.pathFindingStarted}
				onClick={this.startPathFinding}
			>				
				START 
			</Button>
		)
	}
}

export default BeginPathFindingButton;