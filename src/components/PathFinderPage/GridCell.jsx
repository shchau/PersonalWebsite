import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import '../../styles/components/PathFinderPage/GridCell.css';

const statuses = {
	"0": {'backgroundColor': 'white'}, 		// unsearched
	"1": {'backgroundColor': 'lightgreen'}, // startingCell
	"2": {'backgroundColor': 'lightgreen'}, // searching
	"3": {'backgroundColor': 'red'}, 		// endingCell
	"-1": {'backgroundColor': 'gray'}, 		// obstacle
}

class GridCell extends Component {	

	constructor(props) {
		super(props);
		this.state = {
		}
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		// Only re-render if this grid cell was changed. 
		let row = this.props.cellID.substring(0,2),
			col = this.props.cellID.slice(-2);
			
		if(nextProps.grid[row][col] !== this.props.grid[row][col]) {
			return (true);
		}
		else {
			return (false);
		}
	}
	
	render() {
		let row = Number(this.props.cellID.substring(0,2)),
			col = Number(this.props.cellID.slice(-2));
		
		if(this.props.grid.length > 1) {
			return(	
				<grid-item 
					id={this.props.cellID} 
					key={this.props.cellID}
					style={statuses[this.props.grid[row][col]]}
				>
				</grid-item>
			)
		}
    }
}

const mapStateToProps = state => {
    return {
        grid: state.PathFinderReducer.grid,
    }
}

GridCell.propTypes = {
	cellID: PropTypes.string.isRequired,
	grid: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, null)(GridCell);