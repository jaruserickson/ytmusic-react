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
	
	/*playAudio(previewUrl){
		let audio = new Audio(previewUrl);
		if (!this.state.playing){
			audio.play();
			this.setState({
				playing: true,
				playingUrl: previewUrl,
				audio
			})
		} else {
			if (this.state.playingUrl === previewUrl){
				this.state.audio.pause();
				this.setState({
					playing: false
				})
			} else {
				this.state.audio.pause();
				audio.play();
				this.setState({
					playing: true,
					playingUrl: previewUrl,
					audio
				})
			}
		}
	}*/
	/*
	playVideo(vidId){
		console.log("memes");
		player = new YT.Player('iframe', {
			height:720,
			width:480,
			videoId: vidId,
			events: {
				'onReady' : onPlayerReady,
				'onStateChange' : onPlayerStateChange
			}
		});
	}

	onPlayerReady(event){
		player.setPlaybackQuality("large");
		this.setState({playing: player.get})
	}

	onPlayerStateChange(){

	}*/
	playVideo(vidId){
		console.log("player???");
		document.getElementById('iframe').innerHTML = '<Iframe url="https://youtube.com/watch?v=' + vidId + '" width="720" height="480"/>';
	}

	render() {
		//const { tracks } = this.props; //equiv to tracks = this.props.tracks
		let videos = this.props.videos !== [] ? this.props.videos : [];
		let names = this.props.vidNames !== [] ? this.props.vidNames : [];
		let thumbs = this.props.vidThumbs !== [] ? this.props.vidThumbs : [];
		console.log('synop',videos,names,thumbs);

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