import React from "react";
import request from '../API.jsx'
import * as AccountActions from '../actions/accountActions.jsx';
import {Link, hashHistory} from 'react-router';


export default class Logout extends(React.Component){
	constructor(props){
		super(props);
		//this.mixins = [Router.Navigation]
	}
	
	logout(){
		AccountActions.logout();
	}

	goBack(){
		hashHistory.goBack();
	}

	render(){
		return (
			<div>
				<h1>Are you sure you want to log out?</h1>
				<button onClick={this.logout.bind(this)}>Log out!</button>
				<button onClick={this.goBack.bind(this)}>no</button>
			</div>
			);

	}
}
