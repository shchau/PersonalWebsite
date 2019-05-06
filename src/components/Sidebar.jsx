import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { Button, Icon, Menu, Sidebar } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import '../styles/components/Sidebar.css';

class SideBar extends Component {	

	constructor(props) {
		super(props);
		this.state = {
			visible: false,
		}
		
		this.handleSidebarVisibility = this.handleSidebarVisibility.bind(this);
	
	}

	handleSidebarVisibility() {
		this.setState({
			visible: !this.state.visible,
		});
	}

	render() {
		return( 
			<div>	
					<Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible={this.state.visible} width='thin'>
						<Link to="/Home" >
							<Menu.Item onClick={this.handleSidebarVisibility}>
								<Icon name='home' />
								Home
							</Menu.Item>
						</Link>
						
						<Link to="AboutMe">
							<Menu.Item onClick={this.handleSidebarVisibility}>
								<Icon name='user circle' />
								About
							</Menu.Item>
						</Link>
						
						<Link to="Not Found">
							<Menu.Item onClick={this.handleSidebarVisibility}>
								<Icon name='boxes' />
								TBD
							</Menu.Item>
						</Link>
					</Sidebar>
					<Button.Group className="sidebarVisibilityButtonContainer">
						<Button disabled={this.state.visible} onClick={this.handleSidebarVisibility}>
							Show sidebar
						</Button>
						<Button disabled={!this.state.visible} onClick={this.handleSidebarVisibility}>
							Hide sidebar
						</Button>
					</Button.Group>
			</div>	
		);
	}
}

export default SideBar;