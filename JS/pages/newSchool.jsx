import React from "react";
import FormData from 'react-form-data';
import request from '../API.jsx';
import { hashHistory } from 'react-router';
import {Form, FormControl, Alert, Button, FormGroup, Col, ControlLabel} from 'react-bootstrap';
import renderAlert from './alert.jsx';


export default class newSchool extends(React.Component){
	constructor(props){
		super(props);
		this.formData = {
			school_name:'',
			lessons_per_day:'',
		}
		this.updateFormData = FormData.updateFormData.bind(this);
		this.setFormData = FormData.setFormData.bind(this);
		this.state = {alertMessage:''};
	}

	//validates data, returns false if it's ok or an error message else 
	validateFormData(data){
		if (data.school_name == '') return 'Вы должны ввести название школы';
		if (data.lessons_per_day == '') return 'Вы должны указать количество уроков в день';
		return false;
	}

	handleSubmit(event){
		const dat = this.formData;
		console.log(dat);
		const validation = this.validateFormData(dat);

		if (validation){
			this.setState({schools:this.state.schools, alertMessage: validation})
		} else 
			request('addSchool', dat, 'post').then(res=>{
				console.log(res);
				hashHistory.push('school/'+res.data.id);
			}).catch(e=>{console.log(e)});//fix me!
	}

	render(){


		return (//TODO: rewrite it with react-bootstrap
			<div>
				<h1>Новая школа</h1>
				<Form onChange={this.updateFormData} method="POST" acceptCharset="utf-8" >
					<FormGroup>
						<ControlLabel>Название школы</ControlLabel>
						<FormControl type="text" name="school_name"/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Уроков в день(максимально)</ControlLabel>
						<FormControl type="number" name="lessons_per_day"/>
					</FormGroup>
					<Button type='button'  onClick={e => this.handleSubmit(e)}>Создать</Button>
					{renderAlert(this.state.alertMessage)}
				</Form>
			</div>
			);
	}
}
