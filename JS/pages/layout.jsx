import React from "react";
import request from "../API.jsx";
import {Link} from 'react-router';
import AccountStore from '../stores/accountStore.jsx';

export default class Layout extends(React.Component){
	constructor(props){
		super(props);
		this.state = {
			account: AccountStore.getAccount()
		};
	}

	componentWillMount(){
		AccountStore.on("change", ()=>{
			this.setState({
				account:AccountStore.getAccount()
			});
		});
		AccountStore.updateAccount();
	}

	render(){
		if (this.state.account.isLoggedIn)
			return (
				<div>
					<h1>Hello, {this.state.account.name}</h1>
					<Link to="users">Users </Link>
					<Link to="logout">Logout </Link>
					{this.props.children}
				</div>
			);
		else
			return (
				<div>
					<h1>Hello, {this.state.account.name}</h1>
					<Link to="register">Register </Link>
					<Link to="login">Log in </Link>
					{this.props.children}
				</div>
			);
	}
}
