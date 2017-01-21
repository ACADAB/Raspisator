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
import { Button, Glyphicon } from 'react-bootstrap'

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
			<div className="editor">
				<Link to={"projectPreferences/"+this.props.params.id}>Параметры проекта</Link>
				<Button className="btn-success save-btn" onClick={ClassActions.save}> Save </ Button>
				<div className="class-list-container">
					<div className="class-list margined">
						<AddPair/>
						<ClassList used="unused" hideVerbose/>
					</div>
					<Col md={16} xs={16}>
						<Grid/>
					</Col>
					<ItemPreview key="__preview" name="Item" />
				</div>
			</div>
			);//
	}
}
