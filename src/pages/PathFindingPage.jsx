import React, { Component } from 'react';
import Asteroid from '../components/Asteroid';

class PathFindingPage extends Component {	

	constructor(props) {
		super(props);
		this.state = {
			asteroidList: [],
		}
	}

	render() {
		return(	
			<Asteroid/>
			)
    }
}

export default PathFindingPage;
