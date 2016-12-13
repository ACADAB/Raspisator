import React from "react";
import request from "../API.jsx";
import {Link} from 'react-router';
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
		if (this.state.account.isLoggedIn){
			if (currentPath == undefined) currentPath = 'users';
			return (	
				<div>

					<Grid>
						<Row>
							<h1>Hello, {this.state.account.name}</h1>
							<Navbar>	
								<Nav bsStyle="tabs" activeKey={currentPath} onSelect={this.handleSelect}>
									<NavItem eventKey="home">Home</NavItem>
									<NavItem eventKey="users">Users</NavItem>
									<NavItem eventKey="editor">editor</NavItem>
								</Nav>
								<Nav pullRight onSelect={this.handleSelect}>
									<NavItem eventKey="logout">Logout</NavItem>
								</Nav>
							</Navbar>
					
					

							{this.props.children}
						</Row>
					</Grid>
				</div>
			);
		}
		else{
			if (currentPath ==  undefined) currentPath = 'login';
			return (
				<div>

					<Grid>
						<Row>
							<h1>Hello, {this.state.account.name}</h1>
							<Navbar>	
								<Nav bsStyle="tabs" activeKey={currentPath} onSelect={this.handleSelect}>
									<NavItem eventKey="home">Home</NavItem>
								</Nav>
								<Nav pullRight onSelect={this.handleSelect}>
									<NavItem eventKey="register">Register</NavItem>
									<NavItem eventKey="login">Log in </NavItem>
								</Nav>
							</Navbar>





							{this.props.children}
						</Row>
					</Grid>
				</div>
			);
		}
	}
}
