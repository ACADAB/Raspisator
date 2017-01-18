import React from "react";
import { DragSource } from 'react-dnd';
import ItemTypes from '../ItemTypes.jsx';
import * as ClassActions from '../actions/classActions.jsx';
import classStore from "../stores/classStore.jsx";

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

	render(){
		const { teacher, name, color, amount, isDragging,borderColor, id, connectDragSource} = this.props;
		let isAmount = false;
		if (amount && amount>1)
			isAmount = true;

		const DOMclasses =color + ((borderColor!='')?(' border-' + borderColor):'') + ' class-box class' + ((isDragging && !(isAmount && amount>1))?' dragging': '');

		return connectDragSource(
			<div className={DOMclasses} onClick={this.handleClick}>
				{this.grade}, 
				{this.teacher}, 
				{this.subject}
				{isAmount && ','+(isDragging?(amount-1):amount) }
			</div>
			);
	}
}
