import React from "react";
import request from '../API.jsx';
import Project from './project.jsx';
import {Link} from 'react-router';
import {Table} from 'react-bootstrap';

export default class projects extends(React.Component){
	constructor(props){
		super(props);
		this.state = {projects:[], schools : {}};
		this.loaded = 0;
	}

	componentWillMount(){
		this.loaded = 0;
		request('getAllProjects').then(res=>{
			//console.log(res.data);
			this.loaded++;
			this.setState({projects:res.data,schools: this.state.schools});
		})
		request('getAllSchools').then((res)=>{
			this.loaded++;
			this.setState({projects:this.state.projects, schools : res.data })	;				   
		});
	}
	render(){
		if (this.loaded < 2) return <div></div>;
		const list = this.state.projects.map(u=>
			<li key={u.id}><Project id = {u.id} 
			name={u.project_name}/></li>
			);
		
		const list2 = this.state.projects.map((u,index)=>
			<tr key = {index}><td>{index+1}</td>
			<td>{u.project_name}</td>
			<td>{this.state.schools[u.school_id]['name']}</td>
			<td>{u.start}</td>
			<td>{u.finish}</td></tr>
			)
		
		return (
			<div>
				<div>
					<Table responsive>
						<thead>
						  <tr>
							 <th>Номер</th>
							<th>Название</th>
							<th>Школа</th>
							<th>Начало</th>
							<th>Конец</th>
						  </tr>
						</thead>
						<tbody>
							{list2}	
						</tbody>
  					</Table>
				</div>
				<div>
					<h1>Ваши проекты:</h1>
					<ul>
						{list}
					</ul>
					<Link to="newProject">Новое расписание</Link>
				</div>
			</div>	
		);
	}
}
