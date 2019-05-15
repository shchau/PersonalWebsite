import React, { Component } from 'react';
import Asteroid from '../components/Asteroid';

const spawnLocations = [
	['10%', '15%'], ['10%', '45%'], ['15%', '70%'],
	['30%', '40%'], ['30%', '70%'], ['40%', '20%'],
	['50%', '30%'], ['50%', '50%'], ['50%', '80%'],
	['60%', '15%'], ['60%', '40%'], ['60%', '70%'],
	['70%', '40%'], ['70%', '50%'], ['70%', '85%'],
	['80%', '15%'], ['80%', '35%'], ['80%', '70%'] 
];

class PathFindingPage extends Component {	

	constructor(props) {
		super(props);
		this.state = {
		};
		this.generateAsteroids = this.generateAsteroids.bind(this);
	}
	
	generateAsteroids() {
		let possibleIndices = [...Array(spawnLocations.length)].map((_,i) => i);
		let numAsteroids = Math.floor(Math.random() * (spawnLocations.length - 4) + 4 );
		var selectedSpawns = [];
		for (let i = 0; i < numAsteroids; i++){
			let index = Math.floor(Math.random() * possibleIndices.length);
			selectedSpawns.push(possibleIndices[index]);
			possibleIndices.splice(index, 1);
		}
		
		return (selectedSpawns.map(function(index) {
			return(
				<span key={index} style={{position: 'absolute', left: spawnLocations[index][0], top: spawnLocations[index][1],}}>
					<Asteroid/>
				</span>
			
			);
		}));
	
	}

	render() {
		return(	
			<span>
				{this.generateAsteroids()}
			</span>
			)
    }
}

export default PathFindingPage;
