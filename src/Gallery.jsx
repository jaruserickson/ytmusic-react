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
		console.log("play");
		document.getElementById('iframe').innerHTML = '<Iframe src="https://youtube.com/embed/' + vidId + '?autoplay=1" width="426" height="240"/>';
	}

	render() {
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