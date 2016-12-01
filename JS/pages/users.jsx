import React from "react";
import request from '../API.jsx';
import User from './user.jsx';

export default class Users extends(React.Component){
	constructor(props){
		super(props);
		this.state = {users:[]};
	}

	componentWillMount(){
		request('allUsers').then(res=>{
			//console.log(res.data);
			this.setState({users:res.data});
		})
	}

	render(){
		const list = this.state.users.map(u=>
			<li key={u.user_id}><User user_id = {u.user_id} 
			user_email = {u.user_email} 
			user_name={u.user_name}
			name = {u.name}/></li>
			)
		return (
			<div>
				<h1>There will be users</h1>
				{list}
			</div>
			);
	}
}
