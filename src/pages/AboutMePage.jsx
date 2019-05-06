import React, { Component } from 'react';
import posed from 'react-pose';
import SplitText from 'react-pose-text';
import '../styles/pages/AboutMePage.css';

const textsArray = [
	["I'M", "SIMON", "CHAU"],
	["GRADUATING", "FROM", "UNIVERSITY", "OF", "ALBERTA"],
	["SPECIALIZATION", "IN", "COMPUTER", "SCIENCE"],
	["LIFELONG", "LEARNER"],
];

const Circle = posed.div({
	pressable: true, 
	small: {
		scale: 1,
		opacity: 0.5,
	},
	
	big: {
		scale: 1.5,
		opacity: 1,
	},
	
	press: {
		scale: 1.2,
	}
});


const charPoses = {
	enter: { 
		opacity: 1, 
		y: 0,
		delay: ({ charIndex }) => charIndex *30	 
	},
	
	exit: { 
		opacity: 0,
		y: 20,
	 }, 

};


class AboutMePage extends Component {	

	constructor(props) {
		super(props);
		this.state = {
			circleEntering: true,
			textsArrayIndex: 0,
			changeText: false,
		}
		this.changeAboutMeText = this.changeAboutMeText.bind(this);
	}


	componentDidMount() {
		setTimeout(() => {
			this.setState({ 
				circleEntering: false, 
			});
		}, 0.500);
	}

	changeAboutMeText() {
		if (this.state.textsArrayIndex >= textsArray.length - 1) {
			this.setState({
				textsArrayIndex: 0,
			});
		}
		else {
			this.setState({
				textsArrayIndex: this.state.textsArrayIndex + 1,
			});
		}
	}

	render() {
		let $circleText = 
						textsArray[this.state.textsArrayIndex].map(
						word => 
						(
						<div key={word}>
							<SplitText 
							charPoses={charPoses}
							initialPose="exit" 
							pose="enter"
							className="circleText"
							> 
							{word}
							</SplitText>
						</div>
						)
					);
	
		return(	
			<div className="aboutMeCircleContainer">
				<Circle 
					className="aboutMeCircle"
					pose={this.state.circleEntering ? "small" : "big"}
					onClick={this.changeAboutMeText}
				>
					<div className="circleText"> {$circleText} </div> 
				</Circle>
			</div>
			)
    }
}

export default AboutMePage;
