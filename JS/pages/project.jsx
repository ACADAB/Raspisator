import React from "react";
import {Link} from 'react-router';


export default class Project extends(React.Component){
	render(){
		return (
			<Link to={"project/"+this.props.id+'/editor'}>
				{this.props.name}
			</Link>
			);
	}
}
