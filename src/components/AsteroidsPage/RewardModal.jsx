import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as AsteroidFieldActions from '../../actions/AsteroidFieldActions';
import { Image, Modal, TransitionablePortal } from 'semantic-ui-react';
import HTTPFetchUtils from '../../utils/HTTPFetchUtils.js';
import '../../styles/components/RewardModal.css';

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


class RewardModal extends Component {	

	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			wikiTitle: "Wikipedia Fetch Failed",
			wikiImage: "",
			wikiContent: "Oh god don't be the rate limit",
		};
		this.closeModal = this.closeModal.bind(this);		
	}
	
	componentDidMount() {
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
									});
									this.setState({
										wikiTitle: wikiTitle,
										wikiContent: wikiContent,
										showModal: true,
									});
								});
							}
							else {
								// Fetch failed. Use default values.
								console.log(httpResponse);
								this.setState({
									showModal: true,
								})
							}
		});		
	}
	
	closeModal() {
		this.setState({
			showModal: !this.state.showModal,
		});
		this.props.closeModalSignal();
	}
	
	render() {		
		const isMobile = window.innerWidth < 768;
		
		let imageSize = "massive";
		if (isMobile) {
			imageSize = "small";
		}
		
		let $Image = (<Image wrapped size={imageSize} alt="" src={require("../../assets/images/noImage.png")}/>);
		if (this.state.wikiImage) {
			$Image = (<Image wrapped size={imageSize} alt="" src={this.state.wikiImage}/>);
		}
		
		return(	
			<TransitionablePortal open={this.state.showModal}  
			transition={{ animation:'fade', duration: 500 }}
			>
				<Modal 
					open={this.state.showModal}
					onClose={this.closeModal}
					closeOnDocumentClick={true}
				>
					<Modal.Header> {this.state.wikiTitle} </Modal.Header>
					<Modal.Content image scrolling>
						{$Image}
						<Modal.Description>
							<p className="wikiContent">{this.state.wikiContent} </p>
						</Modal.Description>	
					</Modal.Content>
				</Modal>
			</TransitionablePortal>
			)
    }
}

const mapStateToProps = state => {
    return {
        showModal: state.AsteroidFieldReducer.showModal,
    }
}

const mapDispatchToProps = dispatch => {
    return {
		closeModalSignal: () => {
            return dispatch(AsteroidFieldActions.closeModal());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RewardModal);