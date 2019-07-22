import React, { Component } from 'react';
import {NavLink, withRouter} from "react-router-dom";
import { Button, Icon, Menu, Sidebar } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import '../styles/components/Sidebar.css';

class SideBar extends Component {	

	render() {
		return( 
			<React.Fragment>	
					<Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible={this.props.visible} width='thin'>
						<Menu.Item as={NavLink} to="/Home" onClick={this.props.handleSidebarVisibility}>
							<Icon name='home' />
							Home
						</Menu.Item>

						<Menu.Item as={NavLink} to="/AboutMe" onClick={this.props.handleSidebarVisibility}>
							<Icon name='user circle' />
							About
						</Menu.Item>
						
						<Menu.Item as={NavLink} to="/Asteroids" onClick={this.props.handleSidebarVisibility}>
							<Icon name='circle' />
							Asteroid Field
						</Menu.Item>
						
						<Menu.Item as={NavLink} to="/PathFinder" onClick={this.props.handleSidebarVisibility}>
							<Icon name='grid layout' />
							Path Finder
						</Menu.Item>						
						
						<Menu.Item as={NavLink} to="NotFound" onClick={this.props.handleSidebarVisibility}>
							<Icon name='boxes' />
							404
						</Menu.Item>
						
					</Sidebar>
					<Button.Group className="sidebarVisibilityButtonContainer">
						<Button disabled={this.props.visible} onClick={this.props.handleSidebarVisibility}>
							Show sidebar
						</Button>
						<Button disabled={!this.props.visible} onClick={this.props.handleSidebarVisibility}>
							Hide sidebar
						</Button>
					</Button.Group>
			</React.Fragment>	
		);
	}
}

export default withRouter(SideBar);