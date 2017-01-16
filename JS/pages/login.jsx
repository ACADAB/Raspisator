import React from "react";
import FormData from 'react-form-data';
import request from '../API.jsx';
import {Form, FormControl, FormGroup, Col, ControlLabel} from 'react-bootstrap';
import * as AccountActions from '../actions/accountActions.jsx';

import {Button} from 'react-bootstrap';

export default class Login extends(React.Component){
	constructor(props){
		super(props);
		this.formData = {
			password:"",
			name:""
		}
		this.updateFormData = FormData.updateFormData.bind(this);
		this.setFormData = FormData.setFormData.bind(this);
	}
	handleSubmit(event){
		const dat = this.formData;
		AccountActions.login(dat);		
	}

	render(){
		let a =0;
		return (//TODO: rewrite it with react-bootstrap
			<div>
				
				<Form horizontal onChange={this.updateFormData} method="POST" acceptCharset="utf-8" action="http://localhost/var/www/html/Raspisator/API/register.php">
					<FormGroup>
						<Col mdOffset={2}><h1>Вход</h1></Col>
					</FormGroup>
					<FormGroup>
						<Col sm={3} md={3} componentClass={ControlLabel}>Имя пользователя / E-mail</Col>
						<Col sm={10} md={3}>
							<FormControl type="e-mail" name="name"/>
						</Col>
					</FormGroup>
					<FormGroup>
						<Col sm={3} md={3} componentClass={ControlLabel}>Пароль</Col>
						<Col sm={10} md={3}>
							<FormControl type="password" name="password"/>
						</Col>
					</FormGroup>
					<FormGroup>
						<Col mdOffset={3}>
							<Button bsStyle='success' type='button' className="btn" pullRight={true} onClick={e => this.handleSubmit(e)}>OК</Button>
						</Col>
					</FormGroup>
					
				</Form>
			</div>
			);
	}
}
