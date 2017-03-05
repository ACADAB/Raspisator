import React from "react";
import { DragSource } from 'react-dnd';
import ItemTypes from '../ItemTypes.jsx';
import * as ClassActions from '../actions/classActions.jsx';
import classStore from "../stores/classStore.jsx";
import {Glyphicon} from 'react-bootstrap';
import {TwitterPicker} from 'react-color';
import cardSource from './cardSource.jsx';

function hasSomeParentTheClass(element, classname, stopOn = undefined) {
	if(element.className == undefined ) return false;
	const classes = element.className.split(' ');
    if ( classes.indexOf(classname)>=0) return true;
    if ( classes.indexOf(stopOn)>=0) return false;
    return element.parentNode && hasSomeParentTheClass(element.parentNode, classname);
}

export default class Class extends(React.Component){
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.addCopy = this.addCopy.bind(this);
		this.removeCopy = this.removeCopy.bind(this);
		this.handleColorChange = this.handleColorChange.bind(this);

		this.grade = undefined;
		this.gradeID = undefined;
		this.subject = undefined;
		this.teacher = undefined;

		const {db_id, subjected} = props;
		this.initInfo(db_id, subjected);
		this.changeAmount = this.changeAmount.bind(this);
	}

	initSubjectInfo(db_id){
		this.subject = classStore.school.subjects[db_id].name;
	}

	initInfo(db_id, subjected){
		if (subjected) this.initSubjectInfo(db_id);
		else {
			const lesson = classStore.projectLessons[db_id];
			const grade = classStore.school.grades[lesson.grade];
			const subject = classStore.school.subjects[lesson.name];
			const teacher = classStore.school.teachers[lesson.teacher];
			this.grade = grade.grade_number + grade.grade_name;
			this.gradeID = lesson.grade;
			this.subject = subject.name;
			this.teacher = (teacher.name.length <= 10 ? teacher.name : (teacher.name.slice(0,10)+'...'));
		}
	}

	addCopy(){
		classStore.addPair(this.gradeID, '', '', this.props.color, this.props.db_id);
	}

	removeCopy(){
		classStore.removeUnused(this.props.db_id);
	}

	changeAmount(e){
		if (e.target.value > this.props.amount){
			for (let i = 0; i < e.target.value - this.props.amount; i++){
				this.addCopy();
			}
		} else {
			for (let i = 0; i < this.props.amount - e.target.value; i++){
				this.removeCopy();
			}
		}
	}

	shouldComponentUpdate(nP, nS){
		const p = this.props;
		if ((nP.db_id !== p.db_id)){
			this.initInfo(nP.db_id, nP.subjected);
		}
		return !((nP.amount === p.amount) && (nP.color === p.color) && (nP.db_id === p.db_id) && (nP.isDragging === p.isDragging) && (nP.renderPicker === p.renderPicker) && (nP.renderCounter === p.renderCounter));
	}

	componentDidMount(){
		var connectDragPreview = this.props.connectDragPreview;
  		var img = new Image();
    	if (connectDragPreview) 
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
		
		/*
		<Glyphicon onClick={this.removeCopy} glyph="chevron-left"/>
		{isDragging?(''+(amount-1)):''+amount }
		
		<Glyphicon onClick={this.addCopy} glyph="chevron-right"/>
		*/
		//<input type="number" value={amount} style={st} /> ADD ME!
		if (buttons)
			return(
				<div className="pull-right counter">
					<input className="count-changer" onChange={this.changeAmount} type="number" onFocus={(e)=>{e.target.select()}} value={isDragging?(''+(amount-1)):''+amount }/>

				</div>
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
		const { teacher, name, hideGrade , color, showAll ,isDragging, amount, subjected, renderPicker, renderCounter,borderColor, id, connectDragSource} = this.props;
		let isAmount = false;
		if (amount && (showAll || amount>1))
			isAmount = true;

		const picker = <div class='picker-container'><TwitterPicker onChangeComplete={(this.handleColorChange)} color={color} /></div>;

		const rgb = parseInt(color.slice(1),16);
		const r = (rgb >> 16) & 255;
	    const g = (rgb >> 8) & 255;
    	const b = rgb & 255;



		const contrast = Math.round((((r * 299) + g * 587) + b * 114) /1000);
		
    
    //console.log('rerender class');

		let style={'backgroundColor':color, 'borderColor':borderColor};

		if (contrast < 140) style['color'] = 'white';

		const DOMclasses = ((borderColor!='')?(' border-' + borderColor):'') + ' class-box class' + ((isDragging && !(isAmount && amount>1))?' dragging': '');
		

		const res = (
			<div className={DOMclasses} style={style} onClick={this.handleClick}>
				<div className="class-text">
					{!subjected && !hideGrade && (this.grade + ',')} 
					{!subjected && (this.teacher + ',')} 
					{this.subject}
				</div>
				{this.renderCounter(renderCounter,isAmount)}
				{renderPicker && picker}
			</div>
			);


		return connectDragSource? connectDragSource(res) : res;
	}
}
