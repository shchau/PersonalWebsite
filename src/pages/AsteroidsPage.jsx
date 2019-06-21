import React, { Component } from 'react';
import AsteroidField from '../components/AsteroidsPage/AsteroidField';
import RewardModal from '../components/AsteroidsPage/RewardModal';
import {connect} from 'react-redux';


function generateAsteroids() {
	let numSpawnLocations = 18;
	let maxNumAsteroids = 10;
	
	let possibleSpawnLocations = [...Array(numSpawnLocations)].map((_,i) => i);
	let numAsteroids = Math.floor(Math.random() * (maxNumAsteroids - 4) + 4 );
	let selectedSpawns = [];
	for (let i = 0; i < numAsteroids; i++){
		let index = Math.floor(Math.random() * possibleSpawnLocations.length);
		selectedSpawns.push(possibleSpawnLocations[index]);
		possibleSpawnLocations.splice(index, 1);
	};
	return(selectedSpawns);
}

class AsteroidsPage extends Component {	

	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return(	
			<span>
			
			{this.props.showModal
			?
			<RewardModal/> 
			:
			<AsteroidField asteroidList={generateAsteroids()}/>
			}
			
			</span>
			)
    }
}

const mapStateToProps = state => {
    return {
        showModal: state.AsteroidFieldReducer.showModal,
    }
}

export default connect(mapStateToProps, null)(AsteroidsPage);
