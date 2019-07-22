import React, { Component } from 'react';
import { Helmet } from 'react-helmet'; 
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
			<div>
			<Helmet>
				<title> Spacey: About Me </title>
				<meta name="description" content="I am Simon Chau, University of Alberta graduate (soon). Click here to find out more..."></meta>
			</Helmet>
			<Planet textsArray={textsArray} planetClass={"aboutMePlanet"}/>
			</div>
			)
    }
}

export default AboutMePage;
