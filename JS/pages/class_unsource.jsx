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
		this.teacher = (teacher.name.length <= 10 ? teacher.name : (teacher.name.slice(0,10)+'...'));
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

		const rgb = parseInt(color.slice(1),16);
		const r = (rgb >> 16) & 255;
	    const g = (rgb >> 8) & 255;
    	const b = rgb & 255;



		const contrast = Math.round((((r * 299) + g * 587) + b * 114) /1000);
		
    
    //console.log(o);

		let style={'backgroundColor':color, 'borderColor':borderColor};

		if (contrast < 140) style['color'] = 'white';


		const DOMclasses =((borderColor!='')?(' border-' + borderColor):'') + ' class-box class';
		return (
			<div style={style} className={DOMclasses}>
				{this.grade}, 
				{this.teacher}, 
				{this.subject}
				
				{this.renderCounter(renderCounter,isAmount)}
			</div>
			);
	}
}
