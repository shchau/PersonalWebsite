import React, { Component } from 'react';
import {Route, Switch, BrowserRouter} from "react-router-dom";
import { Sidebar } from "semantic-ui-react";
import SideBar from './components/Sidebar';
import HomePage from './pages/HomePage';
import AboutMePage from './pages/AboutMePage';
import AsteroidsPage from './pages/AsteroidsPage';
import PathFinderPage from './pages/PathFinderPage';
import NotFound from './pages/NotFound';
import './styles/spaceBG/spaceBG.css';
import './App.css';

class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
		}	
		this.handleSidebarVisibility = this.handleSidebarVisibility.bind(this);
		this.closeSidebar = this.closeSidebar.bind(this);
	}

	handleSidebarVisibility() {
		this.setState({
			visible: !this.state.visible,
		});
	}
	
	closeSidebar() {
		if (this.state.visible === true) {
			this.setState({
				visible: false,
			});
		}
	}
	
	render() {
		return (
			<BrowserRouter>
				<SideBar visible={this.state.visible} handleSidebarVisibility={this.handleSidebarVisibility}/>
				<Sidebar.Pusher className="sidebarPusher" dimmed={this.state.visible} onClick={this.closeSidebar}>
					<div className="stars"> </div>
					<div className="twinkling"></div>
					<div className="clouds"></div>
					
					<Switch>
						<Route exact path="/" component={HomePage}/>
						<Route exact path="/Home" component={HomePage}/>
						<Route exact path="/AboutMe" component={AboutMePage}/>
						<Route exact path="/Asteroids" component={AsteroidsPage}/>
						<Route exact path="/PathFinder" component={PathFinderPage}/>
						<Route component={NotFound} />
					</Switch>
					
				</Sidebar.Pusher>
			</BrowserRouter>	
		);
  }
}

export default App;
