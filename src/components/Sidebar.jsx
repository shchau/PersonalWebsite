import React, { Component } from 'react';
import {NavLink, withRouter} from "react-router-dom";
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
						<Menu.Item as={NavLink} to="/Home" onClick={this.handleSidebarVisibility}>
							<Icon name='home' />
							Home
						</Menu.Item>

						<Menu.Item as={NavLink} to="/AboutMe" onClick={this.handleSidebarVisibility}>
							<Icon name='user circle' />
							About
						</Menu.Item>

						<Menu.Item as={NavLink} to="Not Found" onClick={this.handleSidebarVisibility}>
							<Icon name='boxes' />
							404
						</Menu.Item>
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

export default withRouter(SideBar);