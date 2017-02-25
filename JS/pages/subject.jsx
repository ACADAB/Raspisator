import React from "react";
import {Link} from 'react-router';
import schoolStore from '../stores/schoolStore.jsx';

export default class Subject extends(React.Component){
	render(){
		const name = schoolStore.school.subjects[this.props.id].name;
		return (
			<div onClick={this.props.onClick} className={"teacher-card padded"+(this.props.selected?' selected':'')}>
				{name}
			</div>
			);
	}
}
