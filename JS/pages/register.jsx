import React from "react";
import FormData from 'react-form-data';
import request from '../API.jsx';


export default class Register extends(React.Component){
	constructor(props){
		super(props);
		this.formData = {
			umail:"",
			password:"",
			name:"",
			uname:""
		}
		this.updateFormData = FormData.updateFormData.bind(this);
		this.setFormData = FormData.setFormData.bind(this);
	}
	handleSubmit(event){
		const dat = this.formData;
		request('register', dat, 'post').then(res=>{
			alert("Success!");
		}).catch(e=>alert("This Login/ e-mail is already taken!"));
	}

	render(){
		let a =0;
		return (
			<div>
				<h1>Регистрация</h1>
				<form onChange={this.updateFormData} method="POST" acceptCharset="utf-8" action="http://localhost/var/www/html/Raspisator/API/register.php">
					<label>E-mail</label><br/>
					<input type="e-mail" name="umail"/><br/>
					<label>Password</label><br/>
					<input type="password" name="password"/><br/>
					<label>Name</label><br/>
					<input type="name" name="name"/><br/>
					<label>User name</label><br/>
					<input type="uesrname" name="uname"/><br/>
					<button type='button'  onClick={e => this.handleSubmit(e)}>OК</button>
				</form>
			</div>
			);
	}
}
