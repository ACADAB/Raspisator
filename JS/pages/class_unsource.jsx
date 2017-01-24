import React from "react";
import { DragSource } from 'react-dnd';
import ItemTypes from '../ItemTypes.jsx';
import * as ClassActions from '../actions/classActions.jsx';
import classStore from "../stores/classStore.jsx";
import {Glyphicon} from 'react-bootstrap';


export default class ClassUnsource extends(React.Component){
	constructor(props){
		super(props);
		
		const db_id = props.db_id;
			
		const lesson = classStore.projectLessons[db_id];
		const grade = classStore.school.grades[lesson.grade];
		const subject = classStore.school.subjects[lesson.name];
		const teacher = classStore.school.teachers[lesson.teacher];
		this.grade = grade.grade_number + grade.grade_name;
		this.gradeID = lesson.grade;
		this.subject = subject.name;
		this.teacher = teacher.name;
	}


	renderCounter(buttons, isAmount){
		const { amount } = this.props;
		
		
		return(
			<strong className="pull-right">
				{isAmount && (amount) }
			</strong>
			)
	
	}

	render(){
		const { teacher, name, color, showAll, amount, renderCounter,borderColor, id} = this.props;
		let isAmount = false;
		if (amount && (showAll || amount>1))
			isAmount = true;

		const DOMclasses = color + ((borderColor!='')?(' border-' + borderColor):'') + ' class-box class';
		return (
			<div className={DOMclasses}>
				{this.grade}, 
				{this.teacher}, 
				{this.subject}
				
				{this.renderCounter(renderCounter,isAmount)}
			</div>
			);
	}
}
