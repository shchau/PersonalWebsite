import React, { Component } from 'react';
import SvgLines from 'react-mt-svg-lines';
import Asteroid from '../components/Asteroid';
import {connect} from 'react-redux';
import * as PathFinderActions from "../actions/pathFinderActions";
import '../styles/pages/PathFinderPage.css';


const spawnLocations = [
	['10', '15'], ['10', '45'], ['15', '70'],
	['30', '40'], ['30', '70'], ['40', '20'],
	['50', '30'], ['50', '50'], ['50', '80'],
	['60', '15'], ['60', '40'], ['60', '70'],
	['70', '40'], ['70', '60'], ['70', '85'],
	['80', '15'], ['85', '35'], ['90', '70'] 
];

var numAsteroids;

class PathFindingPage extends Component {	

	constructor(props) {
		super(props);
		this.state = {
		};
		this.generateAsteroids = this.generateAsteroids.bind(this);
		this.drawPath = this.drawPath.bind(this);
		this.beginPathFinder = this.beginPathFinder.bind(this);
	}
	
	generateAsteroids() {
		let possibleIndices = [...Array(spawnLocations.length)].map((_,i) => i);
		numAsteroids = Math.floor(Math.random() * (spawnLocations.length - 4) + 4 );
		var selectedSpawns = [];
		for (let i = 0; i < numAsteroids; i++){
			let index = Math.floor(Math.random() * possibleIndices.length);
			selectedSpawns.push(possibleIndices[index]);
			possibleIndices.splice(index, 1);
		}
		
		return (selectedSpawns.map((index) => {
			let leftPos = spawnLocations[index][0] + "%";
			let topPos = spawnLocations[index][1] + "%";
			let asteroidID = "asteroid" + index
			return(
				<span key={index} style={{position: 'absolute', left: leftPos, top: topPos,}}>
					<Asteroid id={asteroidID} beginPathFinder={this.beginPathFinder} />
				</span>
			
			);
		}));
	
	}


	generateFixedAsteroids() {
		let selectedSpawns = [0, 17, 5, 10];
		return (selectedSpawns.map((index) => {
			let leftPos = spawnLocations[index][0] + "%";
			let topPos = spawnLocations[index][1] + "%";
			let asteroidID = "asteroid" + index;
			return(
				<span key={index} style={{position: 'absolute', left: leftPos, top: topPos,}}>
					<Asteroid id={asteroidID} beginPathFinder={this.beginPathFinder} />
				</span>
			
			);
		}));	
	}

	drawPath(drawInstructions) {
		return(
			<div className="lineContainer">
				<SvgLines animate={4000} duration={6000}>
					<svg viewBox="0 0 100 100" width="100%" height="100%">
						<path d={drawInstructions} 
						style={{stroke:"blue", strokeWidth: 0.2}}
						fill="none"
						/>
					</svg>
				</SvgLines>
			</div>
		);
	}


	beginPathFinder(index) {
		// Begin path finding algorithm starting from spawnLocation at the selected index 
		
		// Call drawPath given order returned by path finding algorithm 
		//let drawInstructions = "M " + x1 + ", " + (y1-10) + " L " + x2 + ", " + (y2/2-5);
		// REDUX time lol
		this.props.setStartingPoint(index.slice(-1));
		let drawInstructions = "M 40, 10 L 90, 35";
		this.props.setDrawInstructions(drawInstructions);
	}

	render() {
	// Need to prevent call of generateAsteroids once path is made, OR
	// don't allow user to select starting point for path finder.
		return(	
			<span className="pathFinderPage">
				{this.generateFixedAsteroids()}	
			</span>
			)
    }
}

const mapStateToProps = state => {	
    return {
		startingPoint: state.pathFinderReducer.startingPoint,
		drawInstructions: state.pathFinderReducer.drawInstructions,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setStartingPoint: (index) => {
        	return dispatch(PathFinderActions.setStartingPoint(index));
        },
		
		setDrawInstructions: (drawInstructions) => {
			return dispatch(PathFinderActions.setDrawInstructions(drawInstructions));
		},
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(PathFindingPage);
