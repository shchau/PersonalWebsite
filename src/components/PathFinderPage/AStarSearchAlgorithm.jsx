import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as PathFinderActions from '../../actions/PathFinderActions';

// Every node will use the following format
// 
//  gridValues[][] = {int f, int g, int h, int cost, bool visited, bool closed, array parent} 

function node(row,col) {
	this.pos = [row, col];
	this.row = row;
	this.col = col;
	
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.cost = 1;
	this.visited = false;
	this.closed = false;
	this.parent = null;
}


function euclideanDistance(pos1, pos2) {
 return (Math.sqrt( (pos1[0] - pos2[0])**2 + (pos1[1] - pos2[1])**2));
}

class AStarSearchAlgorithm extends Component {	

	constructor(props) {
		super(props);
		let numRows = this.props.grid.length;
		let numCols = this.props.grid[0].length;
		let gridNodes = [];
		
		for (let row = 0; row < numRows; row++) {
			gridNodes[row] = [];
			for (let col = 0; col < numCols; col++) {
				gridNodes[row][col] = new node(row, col); 
			}
		}	

		this.state = {
			gridNodes: gridNodes,
		}
		
		this.beginSearch = this.beginSearch.bind(this);
		this.getNeighbours = this.getNeighbours.bind(this);
	}
	
	componentDidMount() {
		let results = this.beginSearch();
		
		for (let i = 0; i < results.length-1; i++) {
			let pos = [results[i][0], results[i][1]];
			setTimeout(this.props.changeGridCell, 0.500, pos, 3);
		}
		setTimeout(this.props.finishPathFinding, 1.000);		
	}

	beginSearch() {
		let startingNode = new node(this.props.startPos[0], this.props.startPos[1]);
		let openList = [];
		
		startingNode.closed = true;
		openList.push(startingNode);
	
		while (openList.length > 0) {
			let lowestInd = 0;
			for (let i = 0; i < openList.length; i++) {
				if(openList[i].f < openList[lowestInd].f) {
					lowestInd = i;
				}
			}
			
			let currentNode = openList[lowestInd];
			
			if (currentNode.pos.toString() === this.props.endPos.toString()) {
				let curr = currentNode;
				let returnPath = [];
				while (curr.parent) {
					returnPath.push(curr.pos);
					curr = curr.parent;
				}
				return returnPath.reverse();
			}
			
			let index = openList.indexOf(currentNode);
			openList.splice(index, 1);
			currentNode.closed = true;
			
			let neighbours = this.getNeighbours(currentNode);
			
			for (let i = 0; i < neighbours.length; i++) {
				let neighbour = neighbours[i];
				if (neighbour.closed) {
					continue;
				}
				let g = currentNode.g + neighbour.cost;
				
				if (!neighbour.visited || g < neighbour.g) {
					neighbour.visited = true;
					neighbour.parent = currentNode;
					neighbour.h = neighbour.h || euclideanDistance(neighbour.pos, this.props.endPos);
					neighbour.g = g;
					neighbour.f = neighbour.h + neighbour.g;
				}
			
				openList.push(neighbour);
				
				if ((neighbour.pos.toString() !== this.props.endPos.toString()) && (neighbour.pos.toString() !== this.props.startPos.toString())) {
					setTimeout(this.props.changeGridCell, 0.05, neighbour.pos, 2);
				}
			}
		}
		
		// If failed. 
		return [];
	}

	getNeighbours(currentNode) {
		let neighbours = [],
			row = currentNode.row,
			col = currentNode.col;

		// West
		if (this.state.gridNodes[row-1] && this.state.gridNodes[row-1][col]) {
			// Only add to neighbours to check if not an obstacle
			if(this.props.grid[row-1][col] !== -1) {
				neighbours.push(this.state.gridNodes[row-1][col]);
			}
		}
		
		// East
		if (this.state.gridNodes[row+1] && this.state.gridNodes[row+1][col]) {
			if (this.props.grid[row+1][col] !== -1) {
				neighbours.push(this.state.gridNodes[row+1][col]);
			}
		}
		
		// South
		if (this.state.gridNodes[row] && this.state.gridNodes[row][col-1]) {
			if (this.props.grid[row][col-1] !== -1) {
				neighbours.push(this.state.gridNodes[row][col-1]);
			}
		}
	
		// North
		if (this.state.gridNodes[row] && this.state.gridNodes[row][col+1]) {
			if (this.props.grid[row][col+1] !== -1) {	
				neighbours.push(this.state.gridNodes[row][col+1]);
			}
		}

		return neighbours;		
	}

	render() {
		return(
			<span> 
			</span>
		)
    }
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
		
		finishPathFinding: () => {
			return dispatch(PathFinderActions.finishPathFinding());
		},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AStarSearchAlgorithm);