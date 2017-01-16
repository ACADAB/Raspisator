import React from "react";
import request from "../API.jsx";
import AccountStore from '../stores/accountStore.jsx';

import {Nav, NavItem, Grid, Row, Navbar} from 'react-bootstrap';

export default class Layout extends(React.Component){
	constructor(props){
		super(props);
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

	handleSelect(to){
		AccountStore.redirect(to);
	}

	render(){
		let currentPath = this.props.routes[this.props.routes.length - 1].path;
		let header = (<Navbar.Header>
							<Navbar.Brand>
								Raspisator
							</Navbar.Brand>
							<Navbar.Toggle />
						</Navbar.Header>);
		let menu = [];
		let login = [];
		if (this.state.account.isLoggedIn){
			if (currentPath == undefined) currentPath = 'users';
			menu = [
				<NavItem eventKey="home" key={0}>Home</NavItem>,
				<NavItem eventKey="projects" key={1}>Projects</NavItem>
			];
			login = [
				<NavItem key={0}>Hello, {this.state.account.name}</NavItem>,
				<NavItem key={1} eventKey="logout">Logout</NavItem>
			];
		}
		else{
			if (currentPath ==  undefined) currentPath = 'login';
			menu = [
				<NavItem key={0} eventKey="home">Home</NavItem>
			];
			login = [
				<NavItem key={0} eventKey="register">Register</NavItem>,
				<NavItem key={1} eventKey="login">Log in </NavItem>
			];
		}

		return (	
				<div>

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
					
					

							{this.props.children}
						</Row>
					</Grid>
				</div>
			);
	}
}
