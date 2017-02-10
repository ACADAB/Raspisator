import React from "react";
import request from "../API.jsx";
import AccountStore from '../stores/accountStore.jsx';
import Login from './login.jsx'
import Logout from './logout.jsx';

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
		}else if (to === 'logout'){
			this.openLogoutDialog();
		} else
		AccountStore.redirect(to);
	}

	render(){
		
		let currentPath = this.props.routes[this.props.routes.length - 1].path;
		let menu = [];
		let login = [];

		const header = (<Navbar.Header>
							<Navbar.Brand>
								<a class="navbar-brand" href="#/home">Raspisator</a>
							</Navbar.Brand>
							<Navbar.Toggle />
						</Navbar.Header>);

		if (this.state.account.isLoggedIn){
			if (currentPath == undefined) currentPath = 'users';
			menu = [
				<NavItem eventKey="profile" key={0}>Профиль</NavItem>,
				<NavItem eventKey="projects" key={1}>Проекты</NavItem>,
				<NavItem eventKey="schedule" key={2}>Расписание</NavItem>
			];
			login = [
				<NavItem key={0}>Здравствуйте, {this.state.account.name}</NavItem>,
				<NavItem key={1} eventKey="logout">Выйти</NavItem>
			];
		}
		else{
			if (currentPath ==  undefined) currentPath = 'login';
			menu = [];
			login = [
				<NavItem key={0} eventKey="register">Регистрация</NavItem>,
				<NavItem key={1} eventKey="login">Вход </NavItem>
			];
		}

		return (	
				<div>
					<Login ref={(ref)=>{this.loginDialog = ref}}/>
					<Logout ref={(ref)=>{this.logoutDialog = ref}}/>
					<Grid>
						<Row>
							<Navbar>
								{header}
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
