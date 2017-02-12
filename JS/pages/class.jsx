import React from "react";
import { DragSource } from 'react-dnd';
import ItemTypes from '../ItemTypes.jsx';
import * as ClassActions from '../actions/classActions.jsx';
import classStore from "../stores/classStore.jsx";
import {Glyphicon} from 'react-bootstrap';
import {TwitterPicker} from 'react-color';

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

function hasSomeParentTheClass(element, classname, stopOn = undefined) {
	if(element.className == undefined ) return false;
	const classes = element.className.split(' ');
    if ( classes.indexOf(classname)>=0) return true;
    if ( classes.indexOf(stopOn)>=0) return false;
    return element.parentNode && hasSomeParentTheClass(element.parentNode, classname);
}

@DragSource(ItemTypes.CLASS, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview()
}))
export default class Class extends(React.Component){
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.addCopy = this.addCopy.bind(this);
		this.removeCopy = this.removeCopy.bind(this);
		
		const db_id = props.db_id;
		this.initInfo(db_id);
		this.handleColorChange = this.handleColorChange.bind(this);
	}

	initInfo(db_id){
		const lesson = classStore.projectLessons[db_id];
		const grade = classStore.school.grades[lesson.grade];
		const subject = classStore.school.subjects[lesson.name];
		const teacher = classStore.school.teachers[lesson.teacher];
		this.grade = grade.grade_number + grade.grade_name;
		this.gradeID = lesson.grade;
		this.subject = subject.name;
		this.teacher = (teacher.name.length <= 10 ? teacher.name : (teacher.name.slice(0,10)+'...'));
		
	}

	addCopy(){
		classStore.addPair(this.gradeID, '', '', this.props.color, this.props.db_id);
	}

	removeCopy(){
		classStore.removeUnused(this.props.db_id);
	}

	shouldComponentUpdate(nP, nS){
		const p = this.props;
		if ((nP.db_id !== p.db_id)){
			this.initInfo(nP.db_id);
		}
		return !((nP.amount === p.amount) && (nP.color === p.color) && (nP.db_id === p.db_id) && (nP.isDragging === p.isDragging) && (nP.renderPicker === p.renderPicker) && (nP.renderCounter === p.renderCounter));
	}

	componentDidMount(){
		var connectDragPreview = this.props.connectDragPreview;
  		var img = new Image();
    	connectDragPreview(img);
	}

	handleClick(e){
		if (hasSomeParentTheClass(e.target,'twitter-picker') || hasSomeParentTheClass(e.target,'counter')) return;
		if ((!classStore.editing || this.props.renderCounter )&& !this.props.renderPicker) this.startEditing();
		if (this.props.renderPicker) classStore.stopEditing();

	}

	startEditing(){
		cardSource.beginDrag(this.props);
	}

	handleColorChange(color){
		classStore.setColor(this.props.db_id, color.hex);
	}

	renderCounter(buttons, isAmount){
		const { amount,isDragging } = this.props;
		
		if (buttons)
			return(
				<strong className="pull-right counter">
					<Glyphicon onClick={this.removeCopy} glyph="chevron-left"/>
					{isDragging?(''+(amount-1)):''+amount }
					<Glyphicon onClick={this.addCopy} glyph="chevron-right"/>
				</strong>
			)
		else {
			return(
				<strong className="pull-right">
					{isAmount && (isDragging?(amount-1):amount) }
				</strong>
				)
		}
	}

	render(){
		const { teacher, name, hideGrade , color, showAll ,isDragging, amount, renderPicker, renderCounter,borderColor, id, connectDragSource} = this.props;
		let isAmount = false;
		if (amount && (showAll || amount>1))
			isAmount = true;

		const picker = <TwitterPicker onChangeComplete={(this.handleColorChange)} color={color} />;

		const rgb = parseInt(color.slice(1),16);
		const r = (rgb >> 16) & 255;
	    const g = (rgb >> 8) & 255;
    	const b = rgb & 255;



		const contrast = Math.round((((r * 299) + g * 587) + b * 114) /1000);
		
    
    //console.log('rerender class');

		let style={'backgroundColor':color, 'borderColor':borderColor};

		if (contrast < 140) style['color'] = 'white';

		const DOMclasses = ((borderColor!='')?(' border-' + borderColor):'') + ' class-box class' + ((isDragging && !(isAmount && amount>1))?' dragging': '');
		return connectDragSource(
			<div className={DOMclasses} style={style} onClick={this.handleClick}>
				{!hideGrade && (this.grade + ',')} 
				{this.teacher}, 
				{this.subject}
				{this.renderCounter(renderCounter,isAmount)}
				{renderPicker && picker}
			</div>
			);
	}
}
