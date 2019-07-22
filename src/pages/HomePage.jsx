import React, { Component } from 'react';
import { Helmet } from 'react-helmet'; 
import Planet from '../components/Planet';

const textsArray = [
	["WELCOME"],
	["USE", "THE", "SIDEBAR", "TO", "NAVIGATE"],
	["THIS", "IS", "GOING", "TO", "LOOP"],
];

class HomePage extends Component {	
	render() {
		return(	
			<div>
				<Helmet>
					<title> Spacey: Home Page </title>
					<meta name="description" content="If you're seeing this, you're probably someone who knows what they're doing. "></meta>
				</Helmet>
				<Planet textsArray={textsArray} planetClass={"homePagePlanet"}/>
			</div>
		)
	}
}

export default HomePage;
