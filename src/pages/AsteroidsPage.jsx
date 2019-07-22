import React, { Component } from 'react';
import { Helmet } from 'react-helmet'; 
import AsteroidField from '../components/AsteroidsPage/AsteroidField';
import RewardModal from '../components/AsteroidsPage/RewardModal';
import { Transition } from 'semantic-ui-react';
import {connect} from 'react-redux';
import HTTPFetchUtils from '../utils/HTTPFetchUtils.js';
import '../styles/pages/AsteroidsPage.css';


function generateAsteroids() {
	let numSpawnLocations = 18;
	let maxNumAsteroids = 10;
	
	let possibleSpawnLocations = [...Array(numSpawnLocations)].map((_,i) => i);
	let numAsteroids = Math.floor(Math.random() * (maxNumAsteroids - 4) + 4 );
	let selectedSpawns = [];
	for (let i = 0; i < numAsteroids; i++){
		let index = Math.floor(Math.random() * possibleSpawnLocations.length);
		selectedSpawns.push(possibleSpawnLocations[index]);
		possibleSpawnLocations.splice(index, 1);
	};
	return(selectedSpawns);
}

function stripHTML(html) {
	let doc = new DOMParser().parseFromString(html, 'text/html');
	return doc.body.textContent || "";
}

const randomWikiPagePath = "https://en.wikipedia.org/w/api.php?format=json" 
			+ "&action=query"
			+ "&generator=random"
			+ "&rvprop=content"
			+ "&grnnamespace=0"
			+ "&grnlimit=1"
			+ "&prop=extracts"
			+ "&exchars=500"
			+ "&origin=*";


class AsteroidsPage extends Component {	

	constructor(props) {
		super(props);
		this.state = {
			visible: true,
			wikiTitle: "",
			wikiImage: "",
			wikiContent: "",
		};
		this.textFadeAway = this.textFadeAway.bind(this);
		this.grabWikipediaPage = this.grabWikipediaPage.bind(this);
	}

	componentDidMount(){
		setTimeout( () => {
			this.setState({
				visible: false,
			});
		}, 2000);
		this.grabWikipediaPage();
	};
	
	
	componentDidUpdate(prevProps) {
		if (this.props.showModal === false && prevProps.showModal === true) {
			this.grabWikipediaPage();
		}
	}
	
	grabWikipediaPage() {
		this.setState({
			wikiTitle: "",
			wikiImage: "",
			wikiContent: "",
		});
		HTTPFetchUtils.getRequest(randomWikiPagePath).then( (httpResponse) => {
							if (httpResponse.status === 200) {
								httpResponse.json().then( (results) => {
									let keys = Object.keys(results.query.pages);
									let wikiPage = results.query.pages[keys[0]];
									let wikiTitle = stripHTML(wikiPage.title);
									let wikiContent = stripHTML(wikiPage.extract);


									let urlImgEndpoint = "https://en.wikipedia.org/w/api.php?format=json" 
														+ "&action=query"
														+ "&titles=" + wikiPage.title
														+ "&rvprop=content"
														+ "&grnnamespace=0"
														+ "&grnlimit=1"
														+ "&prop=pageimages"
														+ "&pithumbsize=900"
														+ "&origin=*";
									
									HTTPFetchUtils.getRequest(urlImgEndpoint).then( (httpResponse) => {
														if (httpResponse.status === 200) {
															httpResponse.json().then( (results) => {
																let keys = Object.keys(results.query.pages);
																let wikiPage = results.query.pages[keys[0]];

																if(wikiPage.thumbnail) {
																	let wikiImage = wikiPage.thumbnail.source;
																	this.setState({
																		wikiImage: wikiImage,
																	});
																}
															});
														}
														else {
															// Request for image failed 
															console.log(httpResponse);
														}
									}).then( () => {
									this.setState({
										wikiTitle: wikiTitle,
										wikiContent: wikiContent,
									});
									});
								});
							}
							else {
								console.log(httpResponse);
							}
		});	
	}
	
	textFadeAway() {
		this.setState({
			visible: false,
		});
	}

	render() {
		return(	
			<span>
			<Helmet>
				<title> Spacey: Asteroids Page </title>
				<meta name="description" content="Clicking on each asteroid brings up a random Wikipedia article's title, desc, and content"></meta>
			</Helmet>
			
			<Transition visible={this.state.visible} animation="scale" duration = {1000}>
				<h1 className="guideText" onClick={this.textFadeAway}>Click the asteroids</h1>
			</Transition>
			
			{this.props.showModal
			?
			<RewardModal 
				wikiTitle={this.state.wikiTitle} 
				wikiImage={this.state.wikiImage} 
				wikiContent={this.state.wikiContent} 
			/> 
			:
			<AsteroidField asteroidList={generateAsteroids()}/>
			}
			
			<span className="hidden">
				<img src={this.state.wikiImage} alt=''/>
				<img src={require("../assets/images/asteroidTexture.jpg")} alt=''/>	
				<img src={require("../assets/images/explosion.png")} alt=''/>
			</span>
			
			</span>
			)
    }
}

const mapStateToProps = state => {
    return {
        showModal: state.AsteroidFieldReducer.showModal,
    }
}

export default connect(mapStateToProps, null)(AsteroidsPage);
