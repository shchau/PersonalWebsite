import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as PathFinderActions from '../../actions/PathFinderActions';
import { Button } from 'semantic-ui-react';
import '../../styles/components/PathFinderPage/PathFindingButton.css';

class PathFindingButton extends Component {	
	
	constructor(props) {
		super(props);
		this.state = {
			buttonText: "START",
			gridCopy: this.props.gridCopy,
		};
		this.startPathFindingOrReset = this.startPathFindingOrReset.bind(this);
	}
	
	startPathFindingOrReset() {	
		if(this.state.buttonText === "START") {
			this.setState({
				buttonText: "RESET",
				gridCopy: this.props.grid,
			});
			
			this.props.startPathFinding();
		}
		
		else if (this.state.buttonText === "RESET") {
			this.props.setGrid(this.state.gridCopy);
			this.props.allowGridChanges();
			this.setState({
				buttonText: "START",
			});
		}
	}
	
	render() {
		let buttonSize = "massive";
		if (window.innerWidth <= 1224) {
			buttonSize = "large";
		}
		
		
		return(	
			<Button className="startButton" 
				inverted 
				size={buttonSize}
				color="blue" 
				active={this.props.start}
				disabled={this.props.start}
				loading={this.props.start}
				onClick={this.startPathFindingOrReset}
			>				
			{this.state.buttonText}
			</Button>
		)
	}
}

const mapStateToProps = state => {
    return {
		start: state.PathFinderReducer.start,
		grid: state.PathFinderReducer.grid,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        startPathFinding: () => {
            return dispatch(PathFinderActions.startPathFinding());
        },
		
		setGrid: (grid) => {
			return dispatch(PathFinderActions.setGrid(grid));
		},
		
		allowGridChanges: () => {
			return dispatch(PathFinderActions.allowGridChanges());
		},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PathFindingButton);