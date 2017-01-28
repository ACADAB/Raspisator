import React from "react";
import Class from './class.jsx';
import ClassList from './classList.jsx';
import Grid from './grid.jsx';
import {Col,Row} from 'react-bootstrap';
import * as ClassActions from '../actions/classActions.jsx';
import {Link} from 'react-router';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
//import { default as TouchBackend } from 'react-dnd-touch-backend';
import classStore from '../stores/classStore.jsx';
import { Button, ButtonGroup, Glyphicon, Label } from 'react-bootstrap'
import {AutoAffix} from 'react-overlays';
import AddPair from './addPair.jsx'

import { default as ItemPreview } from './classPreview.jsx';

@DragDropContext(HTML5Backend)
export default class Editor extends(React.Component){
	constructor(props){
		super(props);
		classStore.initEmptyProj();
		classStore.loadProject(props.params.id);
	}

	render(){
		return (
			<div className="editor noselect" draggable='false'>
				<Link to={"projectPreferences/"+this.props.params.id}>Параметры проекта</Link>
				
				<ButtonGroup className="fixed-buttons">
					<Button className="btn-success save-btn" onClick={ClassActions.save}> Сохранить </ Button>
					<a href={"API/save.php?p_id="+this.props.params.id} download><Button className="btn-success save-btn" onClick={ClassActions.save}> Загрузить </ Button></a>
				</ButtonGroup>
				
					<div className="class-list-container" draggable='false'>
						<div className="class-list" draggable='false'> 
							<AutoAffix viewportOffsetTop={15} container={this}>
							<div draggable='false' className="class-list margined class-list-fixed">
								<strong className="lessons-header">Уроки</strong>
								<ClassList used="unused" hideVerbose/>
							</div>
						</AutoAffix>
						</div>
						
						<Col draggable='false' md={16} xs={16}>
							<Grid/>
						</Col>
						<ItemPreview key="__preview" name="Item" />
					</div>
				
			</div>
			);//
	}
}
