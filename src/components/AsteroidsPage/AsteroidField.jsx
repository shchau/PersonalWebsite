import React, { Component } from 'react';
import Asteroid from './Asteroid';

const spawnLocations = [
	['10', '15'], ['10', '45'], ['15', '70'],
	['30', '40'], ['30', '70'], ['40', '20'],
	['50', '30'], ['50', '50'], ['50', '80'],
	['60', '15'], ['60', '45'], ['60', '70'],
	['70', '40'], ['70', '60'], ['70', '85'],
	['80', '15'], ['85', '35'], ['80', '70'] 
];

class AsteroidField extends Component {	

	constructor(props) {
		super(props);
		this.state = {
			displayedAsteroids: this.props.asteroidList,
		};
		this.drawAsteroids = this.drawAsteroids.bind(this);
		this.removeAsteroid = this.removeAsteroid.bind(this);
	}
	
	drawAsteroids() {
		return (this.state.displayedAsteroids.map((index) => {
			let leftPos = spawnLocations[index][0] + "%";
			let topPos = spawnLocations[index][1] + "%";
			let asteroidID = index;
			return(
				<span key={index} style={{position: 'absolute', left: leftPos, top: topPos,}}>
					<Asteroid id={asteroidID} removeAsteroid={this.removeAsteroid} />
				</span>
			
			);
		}));
	
	}

	removeAsteroid(asteroidID) {
		let copyArray = [...this.state.displayedAsteroids];
		let asteroidToRemoveIndex = this.state.displayedAsteroids.indexOf(asteroidID);
		copyArray.splice(asteroidToRemoveIndex, 1);
		this.setState({
			displayedAsteroids: copyArray,
		});
	}

	render() {
	// New Idea: click each asteroid to destroy them. Fetch info from another site to display
	// something as a reward 
		return(	
			<span>
				{[this.drawAsteroids()]}	
			</span>
			)
    }
}

export default AsteroidField;
