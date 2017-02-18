import React from "react";
import FormData from 'react-form-data';
import request from '../API.jsx';
import renderAlert from './alert.jsx';
import {Form, FormControl, FormGroup, Col, ControlLabel} from 'react-bootstrap';
import * as AccountActions from '../actions/accountActions.jsx';

import { hashHistory } from 'react-router';

import {Button} from 'react-bootstrap';


export default class Register extends(React.Component){
	constructor(props){
		super(props);
		this.formData = {
			umail:"",
			password:"",
			name:"",
			uname:"",
			secpassword:""
		}
		this.updateFormData = FormData.updateFormData.bind(this);
		this.setFormData = FormData.setFormData.bind(this);
		this.setState({alertMessage: ""});
	}
	handleSubmit(event){
		this.setState({alertMessage: ""});
		console.log(this.formData);
		if(this.formData.password != this.formData.secpassword)
		{
			console.log(this.formData);
			this.setState({alertMessage: "Пароли не совпадают"});
			return;
		}
		const dat = this.formData;
		const overlayAlert = {message: 'Регистрация пользователя', wait:true, type: 'warning'};
		const successAlert = {message: 'Пользователь успешно зарегистрирован', wait:false, type: 'success'};
		const errorAlert = {message: 'Ошибка при регистрации пользователя', wait:false, type: 'danger'};
		request('register', dat, 'post', overlayAlert, successAlert, errorAlert).then(res=>{
			console.log(res);
			hashHistory.push('home');
		}).catch(e=>{console.log(e)});//fix me!
	}

	render(){
		let a =0;
		return (//TODO: rewrite it with react-bootstrap
			<div>
				<Form horizontal onChange={this.updateFormData} method="POST" acceptCharset="utf-8" action="http://localhost/var/www/html/Raspisator/API/register.php">
					<FormGroup>
						<Col mdOffset={2}><h1>Регистрация</h1></Col>
					</FormGroup>
					<FormGroup>
						<Col sm={3} md={3} componentClass={ControlLabel}>Эл. почта</Col>
						<Col sm={10} md={3}>
							<FormControl type="e-mail" name="umail"/>
						</Col>
					</FormGroup>
					<FormGroup>
						<Col sm={3} md={3} componentClass={ControlLabel}>Пароль</Col>
						<Col sm={10} md={3}>
							<FormControl type="password" name="password"/>
						</Col>
					</FormGroup>
					<FormGroup>
						<Col sm={3} md={3} componentClass={ControlLabel}>Повторите пароль</Col>
						<Col sm={10} md={3}>
							<FormControl type="password" name="secpassword"/>
						</Col>
					</FormGroup>
					<FormGroup>
						<Col sm={3} md={3} componentClass={ControlLabel}>ФИО или псевдоним</Col>
						<Col sm={10} md={3}>
							<FormControl type="name" name="name"/>
						</Col>
					</FormGroup>
					<FormGroup>
						<Col sm={3} md={3} componentClass={ControlLabel}>Имя пользователя</Col>
						<Col sm={10} md={3}>
							<FormControl type="uesrname" name="uname"/>
						</Col>
					</FormGroup>
					<FormGroup>
						<Col mdOffset={3}>
							<Button bsStyle='success' type='button' className="btn" onClick={e => this.handleSubmit(e)}>OК</Button>
						</Col>
					</FormGroup>
					{renderAlert(this.state.alertMessage)}
				</Form>
				
			</div>
			);
	}
}
