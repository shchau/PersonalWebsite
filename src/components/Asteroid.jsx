import React, { Component } from 'react';
import posed from 'react-pose';
import MediaQuery from 'react-responsive';
import '../styles/components/Asteroid.css';

const Circle = posed.div({
	small: {
		scale: 1,
		opacity: 0.5,
	},
	
	big: {
		scale: 1.5,
		opacity: 1,
	},
});

class Asteroid extends Component {	

	constructor(props) {
		super(props);
		this.state = {
			circleEntering: true,
		}
	}


	componentDidMount() {
		setTimeout(() => {
			this.setState({ 
				circleEntering: false, 
			});
		}, 0.500);
	}
	
	render() {
		return(	
			<MediaQuery maxDeviceWidth={1224}>
				{(matches) => {
					if (matches) {
						return 	<Circle 
									className="asteroidMini"
									pose={this.state.circleEntering ? "small" : "big"}
								/>;
					} 
					else {
						return <Circle 
									className="asteroid"
									pose={this.state.circleEntering ? "small" : "big"}
								/>;
					}
				}}
			</MediaQuery>
			)
    }
}

export default Asteroid;