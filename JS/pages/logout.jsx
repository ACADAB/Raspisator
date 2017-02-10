import React from "react";

import request from '../API.jsx'
import * as AccountActions from '../actions/accountActions.jsx';
import {Link, hashHistory} from 'react-router';
import FormData from 'react-form-data';
import {Form, Modal, Button, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';
import AccountStore from '../stores/accountStore.jsx';
import renderAlert from './alert.jsx';


export default class Logout extends(React.Component){
	constructor(props){
		super(props);
		//this.mixins = [Router.Navigation]
		//this.state = { showModal: false,  alertMessage: ''};
		//this.formData = defData;
		//this.close = this.close.bind(this);
        //this.open = this.open.bind(this);
        //this.alert = this.alert.bind(this);
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
				<Modal.Dialog>
					<Modal.Header>
						<h1>Вы точно хотите выйти?</h1>
					</Modal.Header>
					<Modal.Footer>
						<Button bsStyle='danger' onClick={this.logout.bind(this)}>Выход!</Button>
						<Button onClick={this.goBack.bind(this)}>нет</Button>
					</Modal.Footer>
				</Modal.Dialog>
			</div>
			);

	}
}