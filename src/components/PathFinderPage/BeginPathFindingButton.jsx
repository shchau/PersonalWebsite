import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as PathFinderActions from '../../actions/PathFinderActions';
import { Button } from 'semantic-ui-react';
import '../../styles/components/PathFinderPage/BeginPathFindingButton.css';

class BeginPathFindingButton extends Component {	
	
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	
	render() {
		return(	
			<Button className="startButton" 
				inverted 
				size="massive" 
				color="blue" 
				active={this.props.start}
				disabled={this.props.start}
				loading={this.props.start}
				onClick={this.props.startPathFinding}
			>				
				START 
			</Button>
		)
	}
}

const mapStateToProps = state => {
    return {
		start: state.PathFinderReducer.start,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        startPathFinding: () => {
            return dispatch(PathFinderActions.startPathFinding());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BeginPathFindingButton);