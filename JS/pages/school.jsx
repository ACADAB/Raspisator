import React from "react";
import {Link} from 'react-router';
import request from '../API.jsx';

import {Row, Col, ButtonGroup, Button} from 'react-bootstrap';

import { hashHistory } from 'react-router';
import schoolStore from '../stores/schoolStore.jsx';
import TeachersList from './teachersList.jsx';

export default class School extends(React.Component){
	constructor(props){
		super(props);
		this.forceUpdate = this.forceUpdate.bind(this);//just in case =)
	}

	componentWillMount(){
		schoolStore.init(this.props.params.id);
		schoolStore.on('change', this.forceUpdate);
	}


	componentWillUnmount(){
		schoolStore.removeListener('change', this.forceUpdate );
	}

	render(){

		return (
				<Row>
					<ButtonGroup className="fixed-buttons">
						<Button className="save-btn btn-success" onClick={(e)=>{schoolStore.save();}}> Сохранить </ Button>
					</ButtonGroup>
					<Col md={4}>
						<h2>Учителя</h2>
						<TeachersList type="teachers"/>
					</Col>
					<Col md={4}>
						<h2>Предметы</h2>
						<TeachersList type="subjects"/>
					</Col>
					<Col md={4}>
						<h2>Классы</h2>
						<TeachersList type="grades"/>
					</Col>
				</Row>
			);
	}
}
