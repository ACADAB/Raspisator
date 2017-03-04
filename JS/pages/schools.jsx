import React from "react";
import request from '../API.jsx';
import Project from './project.jsx';
import {Link} from 'react-router';
import {Table, Button} from 'react-bootstrap';

export default class Schools extends(React.Component){
	constructor(props){
		super(props);
		this.state = {schools : {}};
		this.loaded = 0;
	}

	componentWillMount(){
		this.loaded = 0;
		
		request('getMySchools').then((res)=>{
			this.loaded++;
			console.log(res.data);
			this.setState({ schools : res.data });				   
		});
	}
	render(){
		if (this.loaded < 1) return <div></div>;
		

		const schools = this.state.schools.map((school,index)=>
		{
			return (
					<tr key = {index}>
						<td>{school.name}</td>
						<td><Link to={'school/'+school.id}>Подробнее</Link></td>
					</tr>
				);
		})
		return (
			<div>
				<h1 className="inline">Ваши школы:</h1>
				<div className="inline pull-right"><Link to="newSchool"><Button>Новая школа</Button></Link></div>
				<br/><br/>
				<Table responsive>
					<thead>
					  <tr>
						<th>Школа</th>
						<th></th>
					  </tr>
					</thead>
					<tbody>
						{schools}	
					</tbody>
				</Table>
			</div>	
		);
	}
}
