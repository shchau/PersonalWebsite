import React, { Component } from 'react';
import Planet from '../components/Planet';

const textsArray = [
	["I'M", "SIMON", "CHAU"],
	["GRADUATING", "FROM", "UNIVERSITY", "OF", "ALBERTA"],
	["SPECIALIZATION", "IN", "COMPUTER", "SCIENCE"],
	["LIFELONG", "LEARNER"],
];

class AboutMePage extends Component {	

	render() {
		return(	
			<Planet textsArray={textsArray} planetClass={"aboutMePlanet"}/>
			)
    }
}

export default AboutMePage;
