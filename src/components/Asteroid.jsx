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
			exploded: false,
		}
		this.explodeAsteroid = this.explodeAsteroid.bind(this);
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ 
				circleEntering: false, 
			});
		}, 1.000);
	}

	componentDidUpdate() {
		if (this.state.exploded) {
			setTimeout(this.props.removeAsteroid, 100, this.props.id);
		}
	}

	explodeAsteroid() {
		this.setState({
			exploded: true,
		});

	}
	
	render() {
		let asteroidClasses = ["asteroid", "asteroidMini", "explosion", "explosionMini"];
		let selectedAsteroidClass;
		return(	
			<MediaQuery maxDeviceWidth={1224}>
				{(matches) => {
					if (matches) {
						if (this.state.exploded) {
							selectedAsteroidClass = 3;	
						}
						else {
							selectedAsteroidClass = 1;
						}
						return 	<Circle
									id={"asteroid" + this.props.id}
									className={asteroidClasses[selectedAsteroidClass]}
									pose={this.state.circleEntering ? "small" : "big"}
									onClick={this.explodeAsteroid}
								/>;
					} 
					else {
						if (this.state.exploded) {
							selectedAsteroidClass = 2;	
						}
						else {
							selectedAsteroidClass = 0;
						}
						return <Circle 
									id={"asteroid" + this.props.id}
									className={asteroidClasses[selectedAsteroidClass]}
									pose={this.state.circleEntering ? "small" : "big"}
									onClick={this.explodeAsteroid}
								/>;
					}
				}}
			</MediaQuery>
			)
    }
}

export default Asteroid;