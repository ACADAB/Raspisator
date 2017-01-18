import React from "react";
import Class from './class.jsx';
import ClassList from './classList.jsx';
import classStore from '../stores/classStore.jsx';
import {Col,Row} from 'react-bootstrap';
import * as ClassActions from '../actions/classActions.jsx';


import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
//import { default as TouchBackend } from 'react-dnd-touch-backend';
import { Button } from 'react-bootstrap'

import AddPair from './addPair.jsx'

import { default as ItemPreview } from './classPreview.jsx';

@DragDropContext(HTML5Backend)
export default class ProjectPreferences extends(React.Component){
	constructor(props){
		super(props);
		this.grades = [];
		this.state = {};
		classStore.loadProject(props.params.id).then(()=>{
			//TODO: add the "add" button
			for (let grade in classStore.school.grades){
				this.grades.push(grade);
			}
			this.setState({});
		}).then(()=>{classStore.loadAllLessons(classStore.schoolID)});
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
				<div className="grid-wrapper">
					{gradeLists}
					<ItemPreview key="__preview" name="Item" />
				</div>
				<Button className="pull-right" onClick={ClassActions.save}> Save </ Button>
			</div>
			);//
	}
}
