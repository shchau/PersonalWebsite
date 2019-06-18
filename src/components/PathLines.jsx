import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import {connect} from 'react-redux';

class PathLines extends Component {	

	constructor(props) {
		super(props);
		this.state = {
		}
	}
	
	render() {
		return(	
			<MediaQuery maxDeviceWidth={1224}>
				{(matches) => {
					if (matches) {
						return <SvgLines animate={4000} duration={6000}>
									<svg viewBox="0 0 100 100" width="100%" height="100%">
										<path d={this.props.drawInstructions} 
										style={{stroke:"blue", strokeWidth: 0.1}}
										fill="none"
										/>
									</svg>
								</SvgLines>
					} 
					else {
						return <SvgLines animate={4000} duration={6000}>
									<svg viewBox="0 0 100 100" width="100%" height="100%">
										<path d={this.props.drawInstructions} 
										style={{stroke:"blue", strokeWidth: 0.2}}
										fill="none"
										/>
									</svg>
								</SvgLines>
					}
				}}
			</MediaQuery>
			)
    }
}

const mapStateToProps = state => {	
    return {
		drawInstructions: state.pathFinderReducer.drawInstructions,
    }
};

export default connect(mapStateToProps)(PathLines);