import React, { Component } from 'react';
import './App.css';

var Iframe = require("react-iframe");

class Gallery extends Component {
	constructor(props){
		super(props);
		this.state = {
			playingUrl: '',
			video: null,
			playing: false
		}
	}

	playVideo(vidId){
		const YT_VID_URL = 'https://www.googleapis.com/youtube/v3/videos';
		const YT_KEY = 'AIzaSyBYNVP6pCLRPQs2Grv1j4XX9t7kZGAG-e4';
		console.log("play");
		/*let FETCH_URL = `${YT_VID_URL}?key=${YT_KEY}&id=${vidId}&part=contentDetails`;

		//need a better way to go to the next video lmao (just use vanilla calls from the old ytmusic)
		fetch(FETCH_URL, {
			method: 'GET'
		})
		.then(response => response.json())
		.then(json => {
			let videos = this.props.videos !== [] ? this.props.videos : [];
			let time = json.items[0].contentDetails.duration;
			let theTime = time.substring(2,time.length).split("M");
			let mins = theTime[0];
			let secs = theTime[1].split("S")[0];
			console.log('time', 'mins', mins, 'secs', secs);*/
			document.getElementById('iframe').innerHTML = '<Iframe src="https://youtube.com/embed/' + vidId + '?autoplay=1&showinfo=0&controls=0" width="426" height="240"/>';
			/*setTimeout(function(){
				if (videos.indexOf(vidId) !== videos.length - 1){
					this.playVideo(videos[videos.indexOf(vidId) + 1]);
				}else{
					this.playVideo(videos[0]);
				}
			}, mins*60*1000 + secs*1000);
		});*/
		
	}

	render() {
		let videos = this.props.videos !== [] ? this.props.videos : [];
		let names = this.props.vidNames !== [] ? this.props.vidNames : [];
		let thumbs = this.props.vidThumbs !== [] ? this.props.vidThumbs : [];

		return (
			<div>
				{videos.map((video, i) => {
					const vidImgURL = thumbs[i];
					const vidName = names[i];
					return (
						<div
							key={i}
							className="vid-thumb"
							onClick={() => this.playVideo(video)}
						>
							<img src={vidImgURL}
								className="vid-thumb-img"
								alt="vid-thumb"/>
							<div className="vid-play">
								<div className="vid-play-inner">
									{
										this.state.playing ? <span>| |</span> : <span>&#9654;</span>
									}
								</div>
							</div>
							<p className="vid-text">
							{vidName}
							</p> 
						</div>
					)
				})}
				<div id="iframe">
				</div>
			</div>
		)
	}
}

export default Gallery;