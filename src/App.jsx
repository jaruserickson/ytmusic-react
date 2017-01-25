import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			query: '',
			channel: null,
			uploads: null,
			vidNum: 10,
			branding: null,
			videos: [],
			vidNames: [],
			vidThumbs: [],
			avatar: null,
			subscribers: 0
		}
	}

	search() {
		const YT_KEY = 'AIzaSyBYNVP6pCLRPQs2Grv1j4XX9t7kZGAG-e4';
		const YT_URL = 'https://www.googleapis.com/youtube/v3/search';
		const YT_CHAN_URL = 'https://www.googleapis.com/youtube/v3/channels';
		const YT_PL_URL = 'https://www.googleapis.com/youtube/v3/playlistItems';
		const YT_VID_URL = 'https://www.googleapis.com/youtube/v3/videos';

		//get channel
		if (this.state.query !== ''){
			let FETCH_URL = `${YT_URL}?key=${YT_KEY}&q=${this.state.query}&part=snippet&type=channel`;
			fetch(FETCH_URL, {
				method:'GET'
			})
			.then(response => response.json())
			.then(json => {
				const channel = json.items[0].id.channelId;
				this.setState({channel});
				console.log('channel', this.state.channel);

				//get uploads playlist
				FETCH_URL = `${YT_CHAN_URL}?key=${YT_KEY}&part=contentDetails&id=${channel}`;
				fetch(FETCH_URL, {
					method:'GET'
				})
				.then(response => response.json())
				.then(json => {
					console.log('channel1', json);
					const uploads = json.items[0].contentDetails.relatedPlaylists.uploads;
					this.setState({uploads});
					console.log('uploads', this.state.uploads);

					//fetch uploaded videos as a part of the 
					FETCH_URL = `${YT_PL_URL}?key=${YT_KEY}&part=contentDetails&playlistId=${uploads}&maxResults=${this.state.vidNum}`;
					fetch(FETCH_URL, {
						method:'GET'
					})
					.then(response => response.json())
					.then(json => {
						let videos = [];
						for(let i = 0; i < json.items.length; i++){
							videos[i] = json.items[i].contentDetails.videoId;
						}
						this.setState({videos});
						console.log('videos', videos);

						let vidNames = [];
						let vidThumbs = [];
						//fetch details for each video
						if (videos.length === this.state.vidNum){
							for(let i = 0; i < videos.length; i++){
								FETCH_URL= `${YT_VID_URL}?key=${YT_KEY}&part=snippet&id=${videos[i]}`;
								fetch(FETCH_URL, {
									method:'GET'
								})
								.then(response => response.json())
								.then(json => {
									vidNames[i] = json.items[0].snippet.title;
									vidThumbs[i] = json.items[0].snippet.thumbnails.high.url;
									this.setState({vidNames, vidThumbs});
								});
							}
							//console.log('vidNames/Thumbs', vidNames, vidThumbs);

						}
					})
				});

				//get profile avatar
				FETCH_URL = `${YT_CHAN_URL}?key=${YT_KEY}&part=snippet&id=${channel}`;
				fetch(FETCH_URL, {
					method:'GET'
				})
				.then(response => response.json())
				.then(json => {
					const avatar = json.items[0].snippet.thumbnails.high.url;
					this.setState({avatar});
					console.log('avatar', avatar);
				});

				//get branding for profile.
				FETCH_URL = `${YT_CHAN_URL}?key=${YT_KEY}&part=brandingSettings&id=${channel}`;
				fetch(FETCH_URL, {
					method:'GET'
				})
				.then(response => response.json())
				.then(json => {
					const branding = json.items[0].brandingSettings;
					this.setState({branding});
					console.log('branding', branding);
				});

				//get stats
				FETCH_URL = `${YT_CHAN_URL}?key=${YT_KEY}&part=statistics&id=${channel}`;
				fetch(FETCH_URL, {
					method:'GET'
				})
				.then(response => response.json())
				.then(json => {
					const subscribers = json.items[0].statistics.subscriberCount;
					this.setState({subscribers});
					console.log('subscribers', subscribers);
				})
			});
		} //else
		
	}

	render() {
		return (
			<div className="App">
				<div className="title"><img className="title-img" alt="title" src="see-thru.png"/></div>
				<FormGroup>
					<InputGroup bsSize="large">
						<FormControl 
						type="text"
						placeholder="Search for a Channel"
						value={this.state.query}
						onChange={event => {this.setState({query: event.target.value})}}
						onKeyPress={event => {
							if(event.key ==='Enter'){
								this.search()
							}
						}}
						/>
						<InputGroup.Addon onClick={() => this.search()}>
							<Glyphicon glyph="search"></Glyphicon>
						</InputGroup.Addon>
					</InputGroup>
				</FormGroup>
				{
					this.state.channel !== null
					? <div>
						  <Profile 
							branding={this.state.branding}
							avatar={this.state.avatar}
							subscribers={this.state.subscribers}
						  />
						  <Gallery
						  	videos={this.state.videos}
						  	vidNames={this.state.vidNames}
						  	vidThumbs={this.state.vidThumbs}
						  />
					  </div>
					: <div></div>
				}
			</div>
		)
	}
}

export default App;