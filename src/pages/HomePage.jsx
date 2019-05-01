import React, { Component } from 'react';
import posed from 'react-pose';
import SplitText from 'react-pose-text';
import '../styles/pages/HomePage.css';

const Circle = posed.div({
	pressable: true, 
	small: {
		scale: 1,
		opacity: 0.5,
	},
	
	big: {
		scale: 1.5,
		opacity: 1,
		transition: {
			type: 'spring',
		}
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

class HomePage extends Component {	

	constructor(props) {
		super(props);
		this.state = {
			circleEntering: true,
			changeText: false,
		}
		this.changeWelcomeMessage = this.changeWelcomeMessage.bind(this);
	}


	componentDidMount() {
		setTimeout(() => {
			this.setState({ 
				circleEntering: false, 
			});
		}, 0.500);
	}

	changeWelcomeMessage() {
		this.setState({
			changeText: true,
		});
	}

	render() {
		let $circleText = 
						(<SplitText 
						charPoses={charPoses}
						initialPose="exit" 
						pose="enter"
						className="welcomeText"
						> 
						WELCOME 
						</SplitText>);
						
		if (this.state.changeText) {
			$circleText = 
						["USE", "THE", "SIDEBAR", "TO", "NAVIGATE"].map(
							word =>
								(
								<div className="splitTextSingleWord" key={word}>
									<SplitText 
										charPoses={charPoses} 
										initialPose="exit"
										pose="enter"
									> 
									{word}
									</SplitText>
								</div>
								)
						);
		}
	
		return(	
			<div className="welcomeCircleContainer">
				<Circle 
					className="welcomeCircle"
					pose={this.state.circleEntering ? "small" : "big"}
					onClick={this.changeWelcomeMessage}
				>
					<div className="circleText"> {$circleText} </div> 
				</Circle>
			</div>
			)
    }
}

export default HomePage;
