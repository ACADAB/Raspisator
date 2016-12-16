import React from "react";
import {Link} from 'react-router';


export default class Project extends(React.Component){
	render(){
		return (
			<Link to={"editor/"+this.props.id}>
				{this.props.name}
			</Link>
			);
	}
}
