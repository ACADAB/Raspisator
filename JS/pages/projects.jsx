import React from "react";
import request from '../API.jsx';
import Project from './project.jsx';
import {Link} from 'react-router';

export default class projects extends(React.Component){
	constructor(props){
		super(props);
		this.state = {projects:[]};
	}

	componentWillMount(){
		request('getAllProjects').then(res=>{
			//console.log(res.data);
			this.setState({projects:res.data});
		})
	}

	render(){
		const list = this.state.projects.map(u=>
			<li key={u.id}><Project id = {u.id} 
			name={u.project_name}/></li>
			)
		return (
			<div>
				<h1>Ваши проекты:</h1>
				<ul>
					{list}
				</ul>
				<Link to="newProject">Новый проект</Link>
			</div>
			);
	}
}
