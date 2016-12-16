import React from "react";
import Class from './class.jsx';
import ClassList from './classList.jsx';
import Grid from './grid.jsx';
import {Col,Row} from 'react-bootstrap';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import classStore from '../stores/classStore.jsx';

import AddPair from './addPair.jsx'

import { default as ItemPreview } from './classPreview.jsx';

@DragDropContext(HTML5Backend)
export default class Editor extends(React.Component){
	constructor(props){
		super(props);
		classStore.loadLessons(props.params.id);
	}

	render(){
		return (
			<div className="editor">
				<Col md={2} xs={4} className="class-list">
					<AddPair/>
					<ClassList/>
				</Col>
				<Col md={16} xs={16}>
					<Grid/>
				</Col>
				<ItemPreview key="__preview" name="Item" />
			</div>
			);//
	}
}
