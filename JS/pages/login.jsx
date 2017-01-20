import React from "react";
import FormData from 'react-form-data';
import request from '../API.jsx';
import {Form, Modal, Button, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';
import * as AccountActions from '../actions/accountActions.jsx';


export default class Login extends(React.Component){
	constructor(props){
		super(props);
		this.state = { showModal: false };
		this.formData = {
			password:"",
			name:""
		}
		this.updateFormData = FormData.updateFormData.bind(this);
		this.setFormData = FormData.setFormData.bind(this);
		this.close = this.close.bind(this);
        this.open = this.open.bind(this);
	}
	handleSubmit(event){
		const dat = this.formData;
		AccountActions.login(dat);	
	}
	close() {
        this.setState({ showModal: false });
        this.formData = Object.create(defClass);
    }

    open() {
        this.setState({ showModal: true });
    }
	
	
	render(){
		let a =0;
		return (//TODO: rewrite it with react-bootstrap
			<div>
				<Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Lesson</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
						<Form horizontal onChange={this.updateFormData} method="POST" acceptCharset="utf-8" action="http://localhost/var/www/html/Raspisator/API/register.php">
							<FormGroup>
								<Col mdOffset={2}><h1>Вход</h1></Col>
							</FormGroup>
							<FormGroup>
								<Col sm={3} md={3} componentClass={ControlLabel}>Имя пользователя / E-mail</Col>
								<Col sm={10} md={3}>
									<FormControl type="e-mail" name="name"/>
								</Col>
							</FormGroup>
							<FormGroup>
								<Col sm={3} md={3} componentClass={ControlLabel}>Пароль</Col>
								<Col sm={10} md={3}>
									<FormControl type="password" name="password"/>
								</Col>
							</FormGroup>
							<FormGroup>
								<Col mdOffset={3}>
									<Button bsStyle='success' type='button' className="btn" onClick={e => this.handleSubmit(e)}>OК</Button>
								</Col>
							</FormGroup>
					
						</Form>
					</Modal.Body>
                </Modal>
				<br/>
			</div>
			);
	}
}
