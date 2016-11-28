import React from "react";

export default class User extends(React.Component){
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				{this.props.user_id}, 
				{this.props.user_email}, 
				{this.props.user_name}, 
				{this.props.name}
			</div>
			);
	}
}
