import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as PathFinderActions from '../../actions/PathFinderActions';
import PropTypes from 'prop-types';
import '../../styles/components/PathFinderPage/GridCell.css';

const statuses = {
	"0": {'backgroundColor': 'white'}, 			// unsearched
	"1": {'backgroundColor': 'lightgreen'}, 	// startingCell
	"2": {'backgroundColor': 'lightblue'}, 		// searching
	"3": {'backgroundColor': 'red'}, 			// endingCell
	"-1": {'backgroundColor': 'darkslategrey'}, // obstacle
}

class GridCell extends Component {	

	constructor(props) {
		super(props);
		this.state = {
		}
		this.changeBetweenFreeAndObstacle = this.changeBetweenFreeAndObstacle.bind(this);
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		let row = this.props.position[0],
			col = this.props.position[1];
		if(nextProps.grid[row][col] !== this.props.grid[row][col]) {
			return (true);
		}
		else {
			return (false);
		}
	}
	
	changeBetweenFreeAndObstacle(){
		let row = this.props.position[0],
			col = this.props.position[1];
		if (this.props.grid[row][col] === 0) {
			this.props.changeGridCell(this.props.position, -1);
		}
		else if (this.props.grid[row][col] === -1) {
			this.props.changeGridCell(this.props.position, 0);
		}
		console.log("Changed");
	}
	
	render() {
		let row = this.props.position[0],
			col = this.props.position[1];
		
		return(	
			<grid-item
				id={this.props.cellID}
				key={this.props.cellID}
				style={statuses[this.props.grid[row][col]]}
				onClick={this.changeBetweenFreeAndObstacle}
			>
			</grid-item>
		)
    }
}

GridCell.propTypes = {
	cellID: PropTypes.string.isRequired,
	status: PropTypes.number.isRequired,
}

const mapStateToProps = state => {
    return {
        grid: state.PathFinderReducer.grid,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeGridCell: (position, newValue) => {
            return dispatch(PathFinderActions.changeGridCell(position, newValue));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GridCell);