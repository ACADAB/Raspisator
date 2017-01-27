import React from "react";
import request from "../API.jsx";
import AccountStore from '../stores/accountStore.jsx';
import Login from './login.jsx'

import OverlayLayout from './overlayLayout.jsx';

import {Nav, NavItem, Grid, Row, Navbar} from 'react-bootstrap';

export default class Layout extends(React.Component){
	constructor(props){
		super(props);
		this.handleSelect = this.handleSelect.bind(this);
		this.state = {
			account: AccountStore.getAccount()
		};
	}



	componentWillMount(){//TODO: add unmount!ee
		AccountStore.on("change", ()=>{
			this.setState({
				account:AccountStore.getAccount()
			});
		});
		AccountStore.updateAccount();
	}

	openLoginDialog(){
		this.loginDialog.open();
	}
	
	openLogoutDialog(){
		this.logoutDialog.open();
	}
	
	handleSelect(to){
		if (to === 'login'){
			this.openLoginDialog();
		} else
		AccountStore.redirect(to);
	}

	render(){
		let currentPath = this.props.routes[this.props.routes.length - 1].path;
		let menu = [];
		let login = [];
		if (this.state.account.isLoggedIn){
			if (currentPath == undefined) currentPath = 'users';
			menu = [
				<NavItem eventKey="Проекты" key={1}>Projects</NavItem>,
				<NavItem eventKey="Расписание" key={2}>Schedule</NavItem>,
				<NavItem eventKey="Личный кабинет" key={3}>Schedule</NavItem>
			];
			login = [
				<NavItem key={0}>Hello, {this.state.account.name}</NavItem>,
				<NavItem key={1} eventKey="Выйти">Logout</NavItem>
			];
		}
		else{
			if (currentPath ==  undefined) currentPath = 'login';
			menu = [];
			login = [
				<NavItem key={0} eventKey="Регистрация">Register</NavItem>,
				<NavItem key={1} eventKey="Логин">Log in </NavItem>
			];
		}

		return (	
				<div>
					<Login ref={(ref)=>{this.loginDialog = ref}}/>
					<Grid>
						<Row>
							<Navbar>
								<a class="navbar-brand" href="#/home">Raspisator</a>
								<Navbar.Collapse>
									<Nav bsStyle="tabs" activeKey={currentPath} onSelect={this.handleSelect}>
										{menu}
									</Nav>
									<Nav pullRight onSelect={this.handleSelect}>
										{login}
									</Nav>
								</Navbar.Collapse>
							</Navbar>
					
					
							<OverlayLayout />
							{this.props.children}
						</Row>
					</Grid>
				</div>
			);
	}
}
