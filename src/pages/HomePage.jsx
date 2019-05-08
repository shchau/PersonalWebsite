import React, { Component } from 'react';
import Planet from '../components/Planet';

const textsArray = [
	["WELCOME"],
	["USE", "THE", "SIDEBAR", "TO", "NAVIGATE"],
	["THIS", "IS", "GOING", "TO", "LOOP"],
];

class HomePage extends Component {	
	render() {
		return(	
			<Planet textsArray={textsArray} planetClass={"homePagePlanet"}/>
		)
	}
}

export default HomePage;
