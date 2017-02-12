import React from "react";
import FormData from 'react-form-data';
import DatePicker from 'react-bootstrap-date-picker';
import request from '../API.jsx';
import { hashHistory } from 'react-router';
import {Form, FormControl, Alert, ButtonGroup ,Button, FormGroup, Col, Row, ControlLabel} from 'react-bootstrap';
import renderAlert from './alert.jsx';
import ScheduleGrid from './scheduleGrid.jsx';
import scheduleStore from '../stores/scheduleStore.jsx';

export default class NewProject extends(React.Component){
	constructor(props){
		super(props);
		this.formData = {
			s_id:-1,
			start:'',
			finish:'',
			t_id:-1
		}
		this.firstChanged = {
			s_id:false,
			start:false,
			finish:false	
		}
		this.updateFormData = FormData.updateFormData.bind(this);
		this.setFormData = FormData.setFormData.bind(this);
		this.state = {schools:[],teachers:[], alertMessage:''};
	}

	componentWillMount(){
		scheduleStore.getSchools().then(res=>{this.setState({schools : res.data, alertMessage:''})});
		
	}

	//validates data, returns false if it's ok or an error message else 
	validateFormData(data){
		if (!(this.firstChanged.s_id && this.firstChanged.start && this.firstChanged.finish)) return '';
		if (data.s_id == "-1") return 'Вы должны выбрать школу';
		if (data.start == '') return 'Вы должны указать дату начала';
		if (data.finish == '') return 'Вы должны указать дату конца';
		if (Date.parse(data.finish) <= Date.parse(data.start)) return 'Вы дата конца не может быть раньше даты начала';
		
		return false;
	}

	handleSubmit(event){
		const dat = this.formData;
		console.log(dat);
		const validation = this.validateFormData(dat);
		if (dat.s_id != -1) {
			scheduleStore.getSchoolTeachers(dat.s_id).then((res)=>{this.setState({schools:this.state.schools, teachers:res,alertMessage:this.state.schools})});
		} else {
			this.setState({schools:this.state.schools, teachers:res,alertMessage:this.state.schools});
		}
		if (validation !== false){
			this.setState({schools:this.state.schools, teachers:this.state.teachers, alertMessage: validation})
		} else {
			scheduleStore.setDates(dat.start, dat.finish, dat.s_id, dat.t_id);
			this.setState({schools:this.state.schools, teachers:this.state.teachers, alertMessage:''});
		}
	}

	render(){
		let a =0;

		const dayLabels = ['Вс','Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
		const monthLabels = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

		const schoolOptions = this.state.schools.map((school,index)=>{return (
				<option value={school.id} key={index}>{school.name}</option>
			)});


		const teacherOptions = this.state.teachers.map((teacher,index)=>{return (
				<option value={teacher.user_id} key={index}>{teacher.name}</option>
			)});


		return (
			<div>
				<h1>Личное расписание</h1>
				<Row>
					<Form onChange={this.updateFormData} method="POST" acceptCharset="utf-8" action="http://localhost/var/www/html/Raspisator/API/register.php">
						<Col md={4} xs={10}>
							<FormGroup>
								<ControlLabel>Школа</ControlLabel>
								<FormControl placeholder="select" value={this.formData.s_id} componentClass="select" onChange={(e)=> {this.firstChanged.s_id = true; setTimeout(()=>{this.handleSubmit(e)},100) }} type="select" name="s_id">
									<option value="-1">---</option>
									{schoolOptions}
								</FormControl>
							</FormGroup>
							{ teacherOptions.length > 0 && (
									<FormGroup>
										<ControlLabel>Преподаватель</ControlLabel>
										<FormControl placeholder="select" value={this.formData.t_id} componentClass="select" onChange={(e)=> {this.firstChanged.s_id = true; setTimeout(()=>{this.handleSubmit(e)},100) }} type="select" name="t_id">
											<option value="-1">---</option>
											{teacherOptions}
										</FormControl>
									</FormGroup>
								)
							}
						</Col>
						<Col md={4} xs={10}>
							<FormGroup>
								<ControlLabel>Дата начала расписания</ControlLabel>
								<DatePicker value={this.formData.start} dateFormat="DD-MM-YYYY" dayLabels={ dayLabels} monthLabels = {monthLabels} onChange={(e)=>{this.firstChanged.start = true;this.formData.start = e.slice(0,10); this.handleSubmit(undefined)}} name='start'/>
							</FormGroup>
						</Col>
						<Col md={4} xs={10}>
							<FormGroup>
								<ControlLabel>Дата конца расписания</ControlLabel>
					-			<DatePicker dateFormat="DD-MM-YYYY" dayLabels={ dayLabels} value={this.formData.finish} monthLabels = {monthLabels} onChange={(e)=>{this.firstChanged.finish = true;this.formData.finish = e.slice(0,10); this.handleSubmit(undefined)}} name='finish'/>
							</FormGroup>
						</Col>
						{renderAlert(this.state.alertMessage)}
					</Form>
				</Row>
				<ScheduleGrid />
				<ButtonGroup className="fixed-buttons">
					<Button className="btn-success save-btn" onClick={()=>scheduleStore.save()}> Сохранить </ Button>
				</ButtonGroup>

			</div>
			);
	}
}
