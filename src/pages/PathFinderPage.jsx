import React, { Component } from 'react';
import {connect} from 'react-redux';
import GridCell from '../components/PathFinderPage/GridCell.jsx';
import BeginPathFindingButton from '../components/PathFinderPage/BeginPathFindingButton';
import * as PathFinderActions from '../actions/PathFinderActions';
import '../styles/pages/PathFinderPage.css';

// Grid 
// Legend: 
//  0 -- Open space 
//  1 -- Starting Cell
//  2 -- Explored Cell
//  3 -- Ending Cell
// -1 -- Obstacle
//
//	| 0 0 -1 0 0 |
//	| 0 0 -1 0 0 |
// 	| 1 2 -1 2 3 |
//	| 0 2  2 2 0 |
//	| 0 0  0 0 0 |


const numRows = 15,
	numCols = 30,
	numObstacles = 25,
	startPos = [Math.floor(numRows/2), 0],
	endPos = [Math.floor(numRows/2)-1, numCols-1];
	
const gridRows = "1fr ".repeat(numRows);
const gridCols = "1fr ".repeat(numCols);

let gridCopy = [];

function generateGridCells() {
	let gridItems = [],
		obstacles = selectObstacleLocations(),
		cellID;
	
	for (let row = 0; row < numRows; row++) {
		gridCopy[row] = []
		for (let col = 0; col < numCols; col++) {
			cellID = row + ' ' + col;
			if (obstacles.includes([row, col].toString())) {
				gridItems.push(<GridCell cellID={cellID} 
								status={-1} 
								key={cellID}>
								</GridCell>);
				gridCopy[row][col] = -1;
			}
			else if ([row,col].toString() === startPos.toString()) {
				gridItems.push(<GridCell cellID={cellID} 
								status={1}
								key={cellID}>
								</GridCell>);
				gridCopy[row][col] = 1;
			}
			else if ([row, col].toString() === endPos.toString()){
				gridItems.push(<GridCell cellID={cellID} 
								status={3}
								key={cellID}>
								</GridCell>);
				gridCopy[row][col] = 3;
			}
			else {
				gridItems.push(<GridCell cellID={cellID} status={2} key={cellID}></GridCell>);
				gridCopy[row][col] = 0;
			}
		}
	}
	return(
		gridItems
	);
}

function selectObstacleLocations() {
	let possibleObstacleLocations = [];
	
	for (let i = 0; i < numRows; i++) {
		possibleObstacleLocations[i] = [...Array(numCols)].map((_,i) => i); 
	}
	
	possibleObstacleLocations[startPos[0]].splice(possibleObstacleLocations[startPos[0]].indexOf(startPos[1]), 1);
	possibleObstacleLocations[endPos[0]].splice(possibleObstacleLocations[endPos[0]].indexOf(endPos[1]), 1);	
	
	// This is a bug in Chrome that will likely not be fixed. So we have to do this
	// to see the correct values in the possibleObstacleLocations array.
	//console.log("pOL", JSON.parse(JSON.stringify(possibleObstacleLocations)));
	
	let selectedObstacleLocations = [];
	let currentNumObstacles = 0;
	while (currentNumObstacles < numObstacles) {
		let randomRowIndex = Math.floor(Math.random() * (possibleObstacleLocations.length));
		let randomColIndex = Math.floor(Math.random() * (possibleObstacleLocations[randomRowIndex].length));
		
		
		if (possibleObstacleLocations[randomRowIndex][randomColIndex] !== -1) {
			let selectedCol = possibleObstacleLocations[randomRowIndex][randomColIndex];
			selectedObstacleLocations.push([randomRowIndex, selectedCol].toString());
			possibleObstacleLocations[randomRowIndex][randomColIndex] = -1;
		}
		currentNumObstacles ++;
	};
	
	
	return (selectedObstacleLocations);
}


class PathFinderPage extends Component {	
	
	constructor(props) {
		super(props);
		this.state = {
			grid: generateGridCells(),
		};
		this.props.setGrid(gridCopy);
	}
	
	render() {
		return(	
			<span>
				<grid-container style={{
					gridTemplateColumns: gridCols,
					gridTemplateRows: gridRows,
				}}>
				{this.state.grid}
				</grid-container>
				<BeginPathFindingButton/>
			</span>
		)
	}
}

const mapDispatchToProps = dispatch => {
    return {
        setGrid: (grid) => {
            return dispatch(PathFinderActions.setGrid(grid));
        }
    }
}

export default connect(null, mapDispatchToProps)(PathFinderPage);