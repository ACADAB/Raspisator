import React from "react";

import request from '../API.jsx'
import * as AccountActions from '../actions/accountActions.jsx';
import {Link, hashHistory} from 'react-router';
import {Button} from 'react-bootstrap';

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
				<Button bsStyle='danger' onClick={this.logout.bind(this)}>Log out!</Button>
				<Button onClick={this.goBack.bind(this)}>no</Button>
			</div>
			);

	}
}
