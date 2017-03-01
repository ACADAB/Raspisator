import React from "react";
import request from '../API.jsx';
import Project from './project.jsx';
import {Link} from 'react-router';
import {Table} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {hashHistory} from 'react-router';

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
	onButtonClick(proj_id){
		request('copyProject', {id:proj_id}, 'post').then((res)=>{
			hashHistory.push('projectPreferences/'+res.data.project_id+'/params');
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
			<td><Project id = {u.id} 
			name={u.project_name}/></td>
			<td>{this.state.schools[u.school_id]['name']}</td>
			<td>{u.start}</td>
			<td>{u.finish}</td>
			<td><Button type='button' onClick={()=>{this.onButtonClick(u.id)}}>Создать копию</Button>
			</td>
			</tr>
			)
		
		return (
			<div>
				<h1>Ваши проекты:</h1>
				<Table responsive>
					<thead>
					  <tr>
						 <th>Номер</th>
						<th>Название</th>
						<th>Школа</th>
						<th>Начало</th>
						<th>Конец</th>
						<th></th>
					  </tr>
					</thead>
					<tbody>
						{list2}	
					</tbody>
				</Table>
				<Link to="newProject">Новое расписание</Link>
			</div>	
		);
	}
}
