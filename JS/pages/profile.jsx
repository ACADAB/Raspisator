import React from "react";
import request from '../API.jsx';
import Project from './project.jsx';
import {Link} from 'react-router';
import {ControlLabel} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import FormData from 'react-form-data';
import ButtonToolbar from 'react-bootstrap'
import {Button, Form, Col} from 'react-bootstrap'

export default class profile extends(React.Component){
	constructor(props){
		super(props);
		this.state = {projects:[], schools : {}};
		this.loaded = 0;
		this.formData = {
			oldpass:"",
			newpass:""
		}
		this.updateFormData = FormData.updateFormData.bind(this);
		this.setFormData = FormData.setFormData.bind(this);
	}

	handleSubmit(event){
		const dat = this.formData;
		const overlayAlert = {message: 'Меняем пароль', wait:true, type: 'warning'};
		const successAlert = {message: 'Пароль изменен', wait:false, type: 'success'};
		const errorAlert = {message: 'Неверный пароль', wait:false, type: 'danger'};
		console.log(dat)
		request('changePass', dat, 'post', overlayAlert, successAlert, errorAlert).then(res=>{
			console.log(res);
			//hashHistory.push('');
		}).catch(e=>{console.log(e)});//fix me!
	}
		
	componentWillMount(){	}
	render(){
		return (
			<div>
				<h1>Сменить пароль</h1>
				<Col md = {4}>
					<Form onChange = {this.updateFormData}> 
						<ControlLabel>Старый пароль</ControlLabel>
						<FormControl
						   type="password"
						   value={this.state.value}
						   placeholder=""     
						   name = "oldpass" 
						/>
						<ControlLabel>Новый пароль</ControlLabel>
						<FormControl
						   type="password"
						   value={this.state.value}
						   placeholder=""
						   name = "newpass"
						/>
						<br/>
						<Button bsStyle='success' type='button' onClick={e => this.handleSubmit(e)}>Применить</Button>
					</Form>
				</Col>
			</div>	
		);
	}
}
