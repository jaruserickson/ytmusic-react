import React, { Component } from 'react';
import './App.css';

class Profile extends Component{
	render() {
		let branding = {channel: {title: '', description: ''}, image: {bannerImageUrl: ''}};
		branding = this.props.branding !== null ? this.props.branding : branding;

		let avatar = '';
		avatar = this.props.avatar !== null ? this.props.avatar : avatar;

		let subs = 0;
		subs = this.props.subscribers !== null ? this.props.subscribers : subs;

		return(
			<div className="fullprofile">
			<img alt="banner" className="banner" src={branding.image.bannerImageUrl}/>
			<div className="profile">
				<img alt="Profile" className="profile-img" src={avatar}/>
				<div className="profile-info">
					<div className="profile-name">{branding.channel.title}</div>
					<div className="profile-subscribers">{subs} subscribers</div>
					<div className="profile-desc">{branding.channel.description}</div>
				</div>
			</div>
			</div>
		)
	}
}

export default Profile;