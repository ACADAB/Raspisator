import React from "react";
import schoolStore from '../stores/schoolStore.jsx';

import Teacher from './teacher.jsx';
import Subject from './subject.jsx';
import Grade from './grade.jsx';

import ScrollArea from 'react-scrollbar';

export default class TeachersList extends(React.Component){
	constructor(props){
		super(props);
		this.state = {};
		this.clickSelect = this.clickSelect.bind(this); 
		this.forceUpdate = this.forceUpdate.bind(this);//just in case =)
	}

	clickSelect(e,id){
		let selection = schoolStore.selection[this.props.type].map(a=>a);
		const pos = selection.indexOf(id);
		if (e.ctrlKey || this.props.type == 'grades'){
			if (pos == -1)
				selection.push(id);
			else
				selection.splice(pos,1);
		} else {
			selection = [id];
		}
		schoolStore.setSelection(this.props.type, selection);
		this.setState({});
	}

	render(){
		let items = [];
		switch (this.props.type) {
			case "teachers":
				for (let id in schoolStore.school.teachers){
					const selected = schoolStore.selection[this.props.type].indexOf(id) > -1;
					items.push(
						<Teacher key={id} selected={selected} id={id} onClick={(e)=>{this.clickSelect(e,id)}} selectableKey={id}/>
						);
				}
				break;
			case "subjects":
				for (let id in schoolStore.school.subjects){
					const selected = schoolStore.selection[this.props.type].indexOf(id) > -1;
					items.push(
						<Subject key={id} selected={selected} id={id} onClick={(e)=>{this.clickSelect(e,id)}} selectableKey={id}/>
						);
				}
				break;
			case "grades":
				let grades = []
				for (let id in schoolStore.school.grades){
					grades.push(id);
				}

				grades.sort((a,b)=>{
					const g1 = schoolStore.school.grades[a];
					const g2 = schoolStore.school.grades[b];
					if (parseInt(g1.grade_number) < parseInt(g2.grade_number)) { return true;}
					if (g1.grade_number == g2.grade_number && g1.grade_name < g2.grade_name){ return true;}
					return false;
				});

				items = grades.map((id,index)=>{
					const selected = schoolStore.selection[this.props.type].indexOf(id) > -1;
					return <Grade key={index} selected={selected} id={id} onClick={(e)=>{this.clickSelect(e,id)}} selectableKey={id}/>
				});
				break;

			default:
				console.error('Wrong type!');
				// statements_def
				break;
		}
		
		return (
				<ScrollArea horizontal={false} speed={0.8} smoothScrolling={true} className="class-list">
					<div>
				        {items}
				    </div>
			    </ScrollArea>
			);
	}
}
