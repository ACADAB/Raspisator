import React from "react";
import FormData from 'react-form-data';
import DatePicker from 'react-bootstrap-date-picker';
import request from '../API.jsx';
import { hashHistory } from 'react-router';
import {Form, FormControl, Alert, Button, FormGroup, Col, ControlLabel} from 'react-bootstrap';
import renderAlert from './alert.jsx';


export default class NewProject extends(React.Component){
	constructor(props){
		super(props);
		this.formData = {
			p_name:'',
			s_id:-1,
			start:'',
			finish:'',
			lessons_per_day:'',
		}
		this.updateFormData = FormData.updateFormData.bind(this);
		this.setFormData = FormData.setFormData.bind(this);
		this.state = {schools:[], alertMessage:''};
	}

	componentWillMount(){
		request('getMySchools').then(res=>{this.setState({schools : res.data, alertMessage:''})});
		
	}

	//validates data, returns false if it's ok or an error message else 
	validateFormData(data){
		if (data.s_id == "-1") return 'Вы должны выбрать школу';
		if (data.p_name == '') return 'Вы должны выбрать проект';
		if (data.start == '') return 'Вы должны указать дату начала';
		if (data.finish == '') return 'Вы должны указать дату конца';
		if (data.lessons_per_day == '') return 'Вы должны указать количество уроков в день';
		if (Date.parse(data.finish) <= Date.parse(data.start)) return 'Дата конца не может быть раньше даты начала';
		return false;
	}

	handleSubmit(event){
		const dat = this.formData;
		console.log(dat);
		const validation = this.validateFormData(dat);

		if (validation){
			this.setState({schools:this.state.schools, alertMessage: validation})
		} else 
			request('addProject', dat, 'post').then(res=>{
				console.log(res);
				hashHistory.push('projectPreferences/'+res.data.project_id);
			}).catch(e=>{console.log(e)});//fix me!
	}

	render(){
		let a =0;

		const schoolOptions = this.state.schools.map((school,index)=>{return (
				<option value={school.id} key={index}>{school.name}</option>
			)});
		
		return (//TODO: rewrite it with react-bootstrap
			<div>
				<h1>Новый проект расписания</h1>
				<Form onChange={this.updateFormData} method="POST" acceptCharset="utf-8" action="http://localhost/var/www/html/Raspisator/API/register.php">
					<FormGroup>
						<ControlLabel>Название проекта</ControlLabel>
						<FormControl type="text" name="p_name"/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Школа</ControlLabel>
						<FormControl placeholder="select" componentClass="select" type="select" name="s_id">
							<option value="-1">---</option>
							{schoolOptions}
						</FormControl>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Дата начала расписания</ControlLabel>
						<DatePicker value={this.formData.start} dateFormat="DD-MM-YYYY" dayLabels={ ['Вс','Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']} weekStartsOnMonday monthLabels = {['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']} onChange={(e)=>{this.formData.start = e.slice(0,10)}} name='start'/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Дата конца расписания (недельного)</ControlLabel>
						<DatePicker value={this.formData.finish}  dateFormat="DD-MM-YYYY" dayLabels={ ['Вс','Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']} weekStartsOnMonday monthLabels = {['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']} onChange={(e)=>{this.formData.finish = e.slice(0,10)}} name='finish'/>
					</FormGroup>
					<Button type='button'  onClick={e => this.handleSubmit(e)}>Создать</Button>
					{renderAlert(this.state.alertMessage)}
				</Form>
			</div>
			);
	}
}

/*<FormGroup>
						<ControlLabel>Уроков в день(максимально)</ControlLabel>
						<FormControl type="number" name="lessons_per_day"/>
					</FormGroup>*/
