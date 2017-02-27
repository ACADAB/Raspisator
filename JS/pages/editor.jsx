import React from "react";
import Class from './class.jsx';
import Grid from './grid.jsx';
import {Col,Row} from 'react-bootstrap';
import * as ClassActions from '../actions/classActions.jsx';
import {Link} from 'react-router';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
//import { default as TouchBackend } from 'react-dnd-touch-backend';
import classStore from '../stores/classStore.jsx';
import { Button, ButtonGroup, Glyphicon, Label, Checkbox, Form, ControlLabel, FormGroup } from 'react-bootstrap'
import {AutoAffix} from 'react-overlays';
import AddPair from './addPair.jsx'
import ComboKeys from 'combokeys';
import { default as ItemPreview } from './classPreview.jsx';
import Switch from 'react-bootstrap-switch';
import SideList from './sideList.jsx';

@DragDropContext(HTML5Backend)
export default class Editor extends(React.Component){
	constructor(props){
		super(props);
		this.notGridded = true;
		this.state={subjects:false};
		classStore.initEmptyProj();
		classStore.highlight = true;
		classStore.loadProject(props.params.id);
		this.handleSwitch = this.handleSwitch.bind(this);
	}

	componentDidMount(){
		this.combos = new ComboKeys(document.documentElement);
		this.combos.bind(['command+s', 'ctrl+s'], (e)=>{
			e.preventDefault();
			ClassActions.save();
			return false;
		});
	}

	componentWillUnmount(){
		this.combos.detach();
	}

	handleSwitch(e,s){
		this.setState({subjects:s});
	}

	handleSwitch(e,s){
		classStore.setAutoSave(s);
	}

	render(){
		return (
			<div className="editor noselect" draggable='false'>
				<Form inline>
					<Link to={"projectPreferences/"+this.props.params.id}>Параметры проекта</Link>
					<Switch onChange={this.handleSwitch} bsSize="mini" defaultValue={classStore.autoSave} wrapperClass="wrapper pull-right"/>
					<ControlLabel className="pull-right">Автосохранение(каждую минуту)</ControlLabel>
				</Form>
				<ButtonGroup className="fixed-buttons">
					<Button className="btn-success save-btn" onClick={ClassActions.save}> Сохранить </ Button>
					<a href={"API/save.php?p_id="+this.props.params.id} download><Button className="btn-success save-btn" onClick={ClassActions.save}> Загрузить </ Button></a>
				</ButtonGroup>
				
				<div className="class-list-container" draggable='false'>
					<SideList parent={this}/>
					
					<Col draggable='false' md={16} xs={16}>
						<Grid/>
					</Col>
					<ItemPreview key="__preview" name="Item" />
				</div>
				
			</div>
			);//
	}
}
