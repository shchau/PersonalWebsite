import React, { Component } from 'react';
import posed from 'react-pose';
import SplitText from 'react-pose-text';
import '../styles/components/Planet/Planet.css';
import '../styles/components/Planet/PlanetTextures.css';

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
		beforeChildren: true,
		staggerChildren: 2500,
		delay: ({ charIndex }) => charIndex * 75
	},
	
	exit: { 
		opacity: 0,
		y: 20,
	 }, 
};

class Planet extends Component {	

	constructor(props) {
		super(props);
		this.state = {
			circleEntering: true,
			textsArrayIndex: 0, 
		}
		this.changeMessage = this.changeMessage.bind(this);
	}


	componentDidMount() {
		setTimeout(() => {
			this.setState({ 
				circleEntering: false, 
			});
		}, 0.500);
	}
	
	changeMessage() {
		if (this.state.textsArrayIndex >= this.props.textsArray.length - 1) {
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
						this.props.textsArray[this.state.textsArrayIndex].map(
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
			<div className="planetContainer">
				<Circle 
					className={"planet " + this.props.planetClass}
					pose={this.state.circleEntering ? "small" : "big"}
					onClick={this.changeMessage}
				>
					<div className="circleText"> {$circleText} </div> 
				</Circle>
			</div>
			)
    }
}

export default Planet;