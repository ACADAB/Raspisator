import React from "react";
import Class from './class.jsx';
import ClassList from './classList.jsx';
import classStore from '../stores/classStore.jsx';
import * as ClassActions from '../actions/classActions.jsx';
import {Link} from 'react-router';
import request from '../API.jsx';

import FormData from 'react-form-data';
import DatePicker from 'react-bootstrap-date-picker';

import {Row, Glyphicon, Form, FormControl, Alert, Button, FormGroup, Col, ControlLabel, ButtonGroup, Tabs, Tab} from 'react-bootstrap';
import renderAlert from './alert.jsx';

import Switch from 'react-bootstrap-switch';

import { hashHistory } from 'react-router';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
//import { default as TouchBackend } from 'react-dnd-touch-backend';

import AddPair from './addPair.jsx'

import { default as ItemPreview } from './classPreview.jsx';

@DragDropContext(HTML5Backend)
export default class ProjectPreferences extends(React.Component){
	constructor(props){
		super(props);
		this.grades = [];
		this.state = {};

		this.formData = {
			p_id:props.params.id,
			p_name:'',
			start:'',
			finish:'',
			lessons_per_day:'',
		}
		this.updateFormData = FormData.updateFormData.bind(this);
		this.setFormData = FormData.setFormData.bind(this);
		this.state = {alertMessage:''};
	}

	componentWillMount(){
		classStore.highlight = false;
		classStore.loadProject(this.props.params.id).then((res)=>{
			//TODO: add the "add" button
			for (let grade in classStore.school.grades){
				this.grades.push(grade);
			}
			this.grades.sort((a,b)=>{
				const g1 = classStore.school.grades[a];
				const g2 = classStore.school.grades[b];
				//console.log(a,g1,b,g2 ,parseInt(g1.grade_number) > parseInt(g2.grade_number));
				return parseInt(g1.grade_number) > parseInt(g2.grade_number);
			});
			this.formData = {
				p_id:this.formData.p_id,
				p_name:res.project.project_name,
				start:res.project.start,
				finish:res.project.finish,
				lessons_per_day:res.project.lessons_per_day
			};
			this.forceUpdate();
		}).then(()=>{classStore.loadAllLessons(classStore.schoolID)});
	}

	//validates data, returns false if it's ok or an error message else 
	validateFormData(data){
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
			this.setState({alertMessage: validation})
		} else 
			request('editProject', dat, 'post').then(res=>{
				console.log(res);
			}).catch(e=>{console.log(e)});//fix me!
	}

	handleSwitch(e,s){
		classStore.setAutoSave(s);
	}


	render(){

		const gradeLists = this.grades.map(gradeId=>
			<div className="class-list margined grey" key={gradeId}>
				<h1>{classStore.getGradeName(gradeId)}</h1>
				<ClassList used="all" grade={gradeId} />
			</div>
		);
		return (
			<div>
				<Tabs defaultActiveKey={1} id="project-settings-tabs">
					<Tab eventKey={1}  title="Количество уроков">
						<Form inline>
							<p style={{display:"inline"}}>Укажите количество уроков у каждого класса. Исспользуйте <Glyphicon glyph="chevron-left"/> и <Glyphicon glyph="chevron-right"/> для изменения количества пар и кликайте по урокам для изменения цвета </p>	
							<Switch onChange={this.handleSwitch} bsSize="mini" defaultValue={classStore.autoSave} wrapperClass="wrapper pull-right"/>
							<ControlLabel className="pull-right">Автосохранение(каждую минуту)</ControlLabel>
							
						</Form>
						<div className="class-list-container">
							{gradeLists}
							<ItemPreview key="__preview" name="Item" />
						</div>
						<ButtonGroup className="fixed-buttons">
							<Button className="save-btn btn-success" onClick={(e)=>{ClassActions.save(); hashHistory.push('editor/'+this.props.params.id);}}> Сохранить </ Button>
						</ButtonGroup>
					</Tab>
					<Tab eventKey={2} title="Параметры проекта">
						<h1>Параметры расписания</h1>
						<Form onChange={this.updateFormData} method="POST" acceptCharset="utf-8" action="http://localhost/var/www/html/Raspisator/API/register.php">
							<FormGroup>
								<ControlLabel>Название проекта</ControlLabel>
								<FormControl value={this.formData.p_name} type="text" name="p_name" onChange={(e)=>{this.formData.p_name = e.target.value; this.forceUpdate()}}/>
							</FormGroup>
							<FormGroup>
								<ControlLabel>Дата начала расписания</ControlLabel>
								<DatePicker value={this.formData.start} dateFormat="DD-MM-YYYY" dayLabels={ ['Вс','Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']} monthLabels = {['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']} onChange={(e)=>{this.formData.start = e.slice(0,10)}} name='start'/>
							</FormGroup>
							<FormGroup>
								<ControlLabel>Дата конца расписания (недельного)</ControlLabel>
								<DatePicker value={this.formData.finish}  dateFormat="DD-MM-YYYY" dayLabels={ ['Вс','Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']} monthLabels = {['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']} onChange={(e)=>{this.formData.finish = e.slice(0,10)}} name='finish'/>
							</FormGroup>
							<FormGroup>
								<ControlLabel>Уроков в день(максимально)</ControlLabel>
								<FormControl type="number" onChange={(e)=>{this.formData.lessons_per_day = e.target.value; this.forceUpdate()}} value={this.formData.lessons_per_day}  name="lessons_per_day"/>
							</FormGroup>
							<Button type='button'  onClick={e => this.handleSubmit(e)}>Изменить</Button>
							{renderAlert(this.state.alertMessage)}
						</Form>
					</Tab>
				</Tabs>
				<Link to={"editor/"+this.props.params.id}>Редактирование расписания</Link>
			</div>
			);//
	}
}
