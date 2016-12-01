import React from "react";
import FormData from 'react-form-data';
import request from '../API.jsx';
import * as AccountActions from '../actions/accountActions.jsx';
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
		return (
			<div>
				<h1>Вход</h1>
				<form onChange={this.updateFormData} method="POST" acceptCharset="utf-8" action="http://localhost/var/www/html/Raspisator/API/register.php">
					<label>Имя пользователя / E-mail</label><br/>
					<input type="e-mail" name="name"/><br/>
					<label>Пароль</label><br/>
					<input type="password" name="password"/><br/>
					<button type='button'  onClick={e => this.handleSubmit(e)}>OК</button>
				</form>
			</div>
			);
	}
}
