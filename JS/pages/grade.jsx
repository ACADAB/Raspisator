import React from "react";
import {Link} from 'react-router';
import schoolStore from '../stores/schoolStore.jsx';

export default class Grade extends(React.Component){
	render(){
		const grade = schoolStore.school.grades[this.props.id];
		const name = grade.grade_number+grade.grade_name;
		return (
			<div onClick={this.props.onClick} className={"teacher-card padded"+(this.props.selected?' selected':'')}>
				{name}
			</div>
			);
	}
}
