import React, { Component } from 'react';
import {Route, Switch, BrowserRouter} from "react-router-dom";
import SideBar from './components/Sidebar';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import './styles/pages/spaceBG/spaceBG.css';
import './App.css';

class App extends Component {

	render() {
		return (
			<div>
			<div className="stars"> </div>
			<div className="twinkling"></div>
			<div className="clouds"></div>
				<BrowserRouter>
					<SideBar/>
					<Switch>
						<Route exact path="/" component={HomePage}/>
						<Route exact path="/Home" component={HomePage}/>
						<Route exact path="/PersonalWebsite" component={HomePage}/>
						<Route component={NotFound} />
					</Switch>
				</BrowserRouter>	
			</div>
		);
  }
}

export default App;
