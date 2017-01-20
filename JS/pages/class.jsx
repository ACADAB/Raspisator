import React from "react";
import { DragSource } from 'react-dnd';
import ItemTypes from '../ItemTypes.jsx';
import * as ClassActions from '../actions/classActions.jsx';
import classStore from "../stores/classStore.jsx";
import {Glyphicon} from 'react-bootstrap';


const cardSource = {
	canDrag(props){
		return !props.notDraggable
	},
	beginDrag(props) {
		ClassActions.startEditMode(props.id);
		return {
	      id: props.id,
	      index: props.index,
	    };
 	},
 	endDrag(props) {
 		classStore.stopEditing();
 	}
};

@DragSource(ItemTypes.CLASS, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview()
}))
export default class Class extends(React.Component){
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);

		const db_id = props.db_id;
			
		const lesson = classStore.projectLessons[db_id];
		const grade = classStore.school.grades[lesson.grade];
		const subject = classStore.school.subjects[lesson.name];
		const teacher = classStore.school.teachers[lesson.teacher];
		this.grade = grade.grade_number + grade.grade_name;
		this.subject = subject.name;
		this.teacher = teacher.name;
	}

	componentDidMount(){
		var connectDragPreview = this.props.connectDragPreview;
  		var img = new Image();
    	connectDragPreview(img);
	}

	handleClick(){
		if (!classStore.editing) this.startEditing();
	}

	startEditing(){
		cardSource.beginDrag(this.props);
	}


	renderCounter(buttons){
		const { amount, showAll,isDragging } = this.props;
		let isAmount = false;
		if (amount && (showAll || amount>1))
			isAmount = true;
		if (buttons)
			return(
				<div>
					<Glyphicon onClick={e=>{console.log(e)}} glyph="chevron-left"/>
					{isAmount && (isDragging?(amount-1):amount) }
					<Glyphicon onClick={e=>{console.log(e)}} glyph="chevron-right"/>
				</div>
			)
		else {
			return(
				<div>
					{isAmount && ','+(isDragging?(amount-1):amount) }
				</div>
				)
		}
	}

	render(){
		const { teacher, name, color ,isDragging,  renderCounter,borderColor, id, connectDragSource} = this.props;
		const DOMclasses =color + ((borderColor!='')?(' border-' + borderColor):'') + ' class-box class' + ((isDragging && !(isAmount && amount>1))?' dragging': '');
		return connectDragSource(
			<div className={DOMclasses} onClick={this.handleClick}>
				{this.grade}, 
				{this.teacher}, 
				{this.subject}
				
				{this.renderCounter(renderCounter)}
			</div>
			);
	}
}
