import React from "react";
import FormData from 'react-form-data';
import DatePicker from 'react-bootstrap-date-picker';
import request from '../API.jsx';
import { hashHistory } from 'react-router';
import {Form, FormControl, Button, FormGroup, Col, ControlLabel} from 'react-bootstrap';

export default class NewProject extends(React.Component){
	constructor(props){
		super(props);
		this.formData = {
			p_name:'',
			s_id:-1,
			start:'',
			finish:''
		}
		this.updateFormData = FormData.updateFormData.bind(this);
		this.setFormData = FormData.setFormData.bind(this);
		this.state = {schools:[]};
	}

	componentWillMount(){
		request('getMySchools').then(res=>{this.setState({schools : res.data})});
		
	}

	handleSubmit(event){
		const dat = this.formData;
		console.log(dat);
		request('addProject', dat, 'post').then(res=>{
			console.log(res);
			//hashHistory.push('login');
		}).catch(e=>{console.log(e)});//fix me!
	}

	render(){
		let a =0;

		const schoolOptions = this.state.schools.map((school,index)=>{return (
				<option value={school.id} key={index}>{school.name}</option>
			)});

		return (//TODO: rewrite it with react-bootstrap
			<div>
				<h1>Новый проект</h1>
				<Form onChange={this.updateFormData} method="POST" acceptCharset="utf-8" action="http://localhost/var/www/html/Raspisator/API/register.php">
					<FormGroup>
						<ControlLabel>Название проекта</ControlLabel>
						<FormControl type="text" name="p_name"/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Школа</ControlLabel>
						<FormControl componentClass="select" type="select" name="p_name">
							{schoolOptions}
						</FormControl>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Дата начала</ControlLabel>
						<DatePicker onChange={(e)=>{this.formData.start = e.slice(0,10)}} name='start'/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Дата конца</ControlLabel>
						<DatePicker onChange={(e)=>{this.formData.finish = e.slice(0,10)}} name='finish'/>
					</FormGroup>
					<Button type='button'  onClick={e => this.handleSubmit(e)}>Создать</Button>
				</Form>
			</div>
			);
	}
}
