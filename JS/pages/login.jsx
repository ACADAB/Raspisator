import React from "react";
import FormData from 'react-form-data';
import request from '../API.jsx';
import {Form, Modal, Button, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';
import * as AccountActions from '../actions/accountActions.jsx';
import AccountStore from '../stores/accountStore.jsx';
import renderAlert from './alert.jsx';


const defData = {
			password:"",
			name:""
		};

export default class Login extends(React.Component){
	constructor(props){
		super(props);
		this.state = { showModal: false,  alertMessage: ''};
		this.formData = defData;
		this.updateFormData = FormData.updateFormData.bind(this);
		this.setFormData = FormData.setFormData.bind(this);
		this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.alert = this.alert.bind(this);
	}

	componentWillMount(){
		AccountStore.on('login_success', this.close);
		AccountStore.on('login_fail', this.alert);
	}

	componentWillUnmount(){
		AccountStore.removeListener('login_fail', this.alert );
		AccountStore.removeListener('login_success', this.close );
	}

	alert(isLoggedIn){
		this.setState({showModal: this.state.showModal, alertMessage: 'Неверная пара логин/пароль'});
	}

	handleSubmit(event){
		const dat = this.formData;
		AccountActions.login(dat);	
	}
	close() {
        this.setState({ showModal: false , alertMessage: ''});
        this.formData = Object.create(defData);
    }

    open() {
        this.setState({ showModal: true , alertMessage:''});
    }
	
	
	render(){
		let a =0;
		return (//TODO: rewrite it with react-bootstrap
			<div>
				<Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Вход</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
						<Form horizontal onChange={this.updateFormData} method="POST" acceptCharset="utf-8" >
							<FormGroup>
								<Col sm={5} md={5} componentClass={ControlLabel}>Имя пользователя / E-mail</Col>
								<Col sm={5} md={5}>
									<FormControl type="e-mail" name="name"/>
								</Col>
							</FormGroup>
							<FormGroup>
								<Col sm={5} md={5} componentClass={ControlLabel}>Пароль</Col>
								<Col sm={5} md={5}>
									<FormControl type="password" name="password"/>
								</Col>
							</FormGroup>
							<FormGroup>
								<Col mdOffset={3}>
									<Button bsStyle='success' type='button' className="btn" onClick={e => this.handleSubmit(e)}>OК</Button>
								</Col>
							</FormGroup>
					
						</Form>
						{renderAlert(this.state.alertMessage)}
					</Modal.Body>
                </Modal>
				<br/>
			</div>
			);
	}
}
