import React, { Component } from 'react';
import { Helmet } from 'react-helmet'; 
import {connect} from 'react-redux';
import { Transition } from 'semantic-ui-react';

import TutorialScreen from '../components/TutorialScreen';
import GridCell from '../components/PathFinderPage/GridCell.jsx';
import PathFindingButton from '../components/PathFinderPage/PathFindingButton';
import AStarSearchAlgorithm from '../components/PathFinderPage/AStarSearchAlgorithm';

import * as PathFinderActions from '../actions/PathFinderActions';
import '../styles/pages/PathFinderPage.css';

// Grid 
// Legend: 
//  0 -- Open space 
//  1 -- Starting Cell
//  2 -- Explored Cell
//  3 -- Final Path Cell
//  4 -- Ending Cell
// -1 -- Obstacle
//
//	| 0 0 -1 0 0 |
//	| 0 0 -1 0 0 |
// 	| 1 2 -1 2 3 |
//	| 0 2  2 2 0 |
//	| 0 0  0 0 0 |

let numRows,
	numCols,
	numObstacles;

if (window.innerWidth > 768) {
	numRows = 15;
	numCols = 30;
	numObstacles = 30;
}
else {
	numRows = 15;
	numCols = 10;
	numObstacles = 7;
}


const startPos = [Math.floor(numRows/2), 0],
	endPos = [Math.floor(numRows/2)-1, numCols-1];
	
const gridRows = "1fr ".repeat(numRows);
const gridCols = "1fr ".repeat(numCols);

function selectObstacleLocations() {
	let possibleObstacleLocations = [];
	
	for (let i = 0; i < numRows; i++) {
		possibleObstacleLocations[i] = [...Array(numCols)].map((_,i) => i); 
	}
	
	possibleObstacleLocations[startPos[0]].splice(possibleObstacleLocations[startPos[0]].indexOf(startPos[1]), 1);
	possibleObstacleLocations[endPos[0]].splice(possibleObstacleLocations[endPos[0]].indexOf(endPos[1]), 1);	
	
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
			grid: this.generateGrid(),
			displayFailedMessage: false,
			displaySuccessMessage: false,
		};
		this.generateGrid = this.generateGrid.bind(this);
		this.generateGridCells = this.generateGridCells.bind(this);
		this.displayMessage = this.displayMessage.bind(this);
	}
	
	generateGrid() {
		let gridCopy = [],
			obstacles = selectObstacleLocations();
			
		for (let row = 0; row < numRows; row++) {
			gridCopy[row] = []
			for (let col = 0; col < numCols; col++) {
				let position = [row, col];		
				if (obstacles.includes(position.toString())) {
					gridCopy[row][col] = -1;
				}
				else if (position.toString() === startPos.toString()) {
					gridCopy[row][col] = 1;
				}
				else if (position.toString() === endPos.toString()){
					gridCopy[row][col] = 4;
				}
				else {
					gridCopy[row][col] = 0;
				}
			}
		}	

		this.props.setGrid(gridCopy).then(() => {
			this.generateGridCells();
		});
	}

	generateGridCells() {
		let cellID,
			gridItems = [];
		for (let row = 0; row < numRows; row++) {
			for (let col = 0; col < numCols; col++) {
				cellID = row + ' ' + col;
				let position = [row, col];
					gridItems.push(<GridCell cellID={cellID} 
									status={this.props.grid[row][col]} 
									key={cellID}
									position={position}
									>
									</GridCell>);					
			}
		}
		this.setState({
			grid: gridItems,
		});
	}

	displayMessage(messageType) {
		if (messageType === "FAILED") {
			this.setState({
				displayFailedMessage: true,
			});
			setTimeout( function() {
				this.setState({displayFailedMessage: false,});
			}.bind(this), 1000);
		}
		else if (messageType === "SUCCESS") {
			this.setState({
				displaySuccessMessage: true,
			});
			setTimeout( function() {
				this.setState({displaySuccessMessage: false,});
			}.bind(this), 0.500);
		}	
	}

	render() {
		return(	
			<React.Fragment>
				<Helmet>
					<title> Spacey: Path Finder Page </title>
					<meta name="description" content="A visualization for the A* Path Finding Algorithm done in React"></meta>
				</Helmet>
			
				<TutorialScreen 
					message='Click the grid to change between open and obstacle cells, then press Start'
				/>
			
				<grid-container style={{
					gridTemplateColumns: gridCols,
					gridTemplateRows: gridRows,
				}}>
				{this.state.grid}
				</grid-container>
				<PathFindingButton/>
				{this.props.start && 
				<AStarSearchAlgorithm 
					startPos={startPos} 
					endPos={endPos} 
					displayMessage={this.displayMessage}
				/>
				}
				
				<Transition visible={this.state.displayFailedMessage} 
						animation="scale" 
						duration = {1500}>
					<h1 className="failedPathFindingText">
						NO PATH FOUND
					</h1>
				</Transition>

				<Transition visible={this.state.displaySuccessMessage} 
						animation="scale" 
						duration = {1500}>
					<h1 className="successPathFindingText">
						PATH FOUND
					</h1>
				</Transition>
				
			</React.Fragment>
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
        setGrid: (grid) => {
            return dispatch(PathFinderActions.setGrid(grid));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PathFinderPage);