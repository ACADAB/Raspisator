import React from "react";
import request from "../API.jsx";
import {Link} from 'react-router';

export default class Layout extends(React.Component){
	constructor(props){
		super(props);
		this.state = {uname : ''};
	}

	componentWillMount(){
		request('getMyName').then(res=>{
			this.setState({uname:res.data.name})
		})
	}

	render(){
		return (
			<div>
				<h1>Hello, {this.state.uname}</h1>
				<Link to="users">Users </Link>
				<Link to="register">Register </Link>
				<Link to="logout">Logout </Link>
				{this.props.children}
			</div>
			);
	}
}
