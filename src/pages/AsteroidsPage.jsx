import React, { Component } from 'react';
import AsteroidField from '../components/AsteroidField';

const spawnLocations = [
	['10', '15'], ['10', '45'], ['15', '70'],
	['30', '40'], ['30', '70'], ['40', '20'],
	['50', '30'], ['50', '50'], ['50', '80'],
	['60', '15'], ['60', '40'], ['60', '70'],
	['70', '40'], ['70', '60'], ['70', '85'],
	['80', '15'], ['85', '35'], ['80', '70'] 
];

function generateAsteroids() {
	let possibleIndices = [...Array(spawnLocations.length)].map((_,i) => i);
	let numAsteroids = Math.floor(Math.random() * (spawnLocations.length - 4) + 4 );
	let selectedSpawns = [];
	for (let i = 0; i < numAsteroids; i++){
		let index = Math.floor(Math.random() * possibleIndices.length);
		selectedSpawns.push(possibleIndices[index]);
		possibleIndices.splice(index, 1);
	};
	return(selectedSpawns);
}

class AsteroidsPage extends Component {	

	constructor(props) {
		super(props);
		this.state = {
			asteroidList: generateAsteroids(),
		};
	}

	render() {
	// New Idea: click each asteroid to destroy them. Fetch info from another site to display
	// something as a reward
		return(	
			<span>
				<AsteroidField asteroidList={this.state.asteroidList}/>
			</span>
			)
    }
}

export default AsteroidsPage;
