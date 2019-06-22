import React, { Component } from 'react';
import AsteroidField from '../components/AsteroidsPage/AsteroidField';
import RewardModal from '../components/AsteroidsPage/RewardModal';
import { Transition } from 'semantic-ui-react';
import {connect} from 'react-redux';
import '../styles/pages/AsteroidsPage.css';


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
			visible: true,
		};
		this.textFadeAway = this.textFadeAway.bind(this);
	}

	componentDidMount(){
		setTimeout( () => {
			this.setState({
				visible: false,
			});
		}, 4000);
	};
	

	textFadeAway() {
		this.setState({
			visible: false,
		});
	}

	render() {
		return(	
			<span>
			<Transition visible={this.state.visible} animation="scale" duration = {1000}>
				<h1 className="guideText" onClick={this.textFadeAway}>Click the asteroids</h1>
			</Transition>
			
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
